// app/api/auth/callback/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  // Handle the code received from Envato authorizati
  if (!code) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const endPoint = `${ process.env.NEXT_PUBLIC_API_URL }/token`;
  // console.log('_____',{
  //   endPoint,
  //   "grant_type": "authorization_code",
  //   "code": code,
  //   "client_id": process.env.NEXT_PUBLIC_TF_APP_CLIENT_ID,
  //   "client_secret": process.env.NEXT_PUBLIC_TF_APP_CLIENT_SECRET,
  // });
  const response = await fetch(endPoint, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded' 
    },
    body: new URLSearchParams({
      "grant_type": "authorization_code",
      "code": code,
      "client_id": process.env.NEXT_PUBLIC_TF_APP_CLIENT_ID,
      "client_secret": process.env.NEXT_PUBLIC_TF_APP_CLIENT_SECRET,
    })
  });

  const tokenData = await response.json();
  console.log('_____',tokenData);

  if (tokenData?.access_token) {

    // set cookies
    const cookieStore = cookies();
    cookieStore.set('access_token', tokenData.access_token, {
      httpOnly: true,
      maxAge: 3600,
      path: '/',
    });
    cookieStore.set('refresh_token', tokenData.refresh_token, {
      httpOnly: true,
      maxAge: 604800, // 7 days in seconds (7 * 24 * 60 * 60)
      path: '/',
    });

    // get me
    const meResponse = await fetch(`${ process.env.NEXT_PUBLIC_TF_APP_REDIRECT_URI }/api/v1/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ tokenData.access_token }`
      },
    }).then((res) => res.json());
    
    cookieStore.set('user', JSON.stringify(meResponse), {
      // httpOnly: true,
      maxAge: 604800, // 7 days in seconds (7 * 24 * 60 * 60)
      path: '/',
    });

    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.redirect(new URL('/', request.url));
}
