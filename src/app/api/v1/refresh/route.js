import { NextResponse } from "next/server";
import { cookies } from 'next/headers';


export async function POST(request) {  
  try {

    // get refresh_token from cookie
    const cookieHeader = request.headers.get('cookie');
    const __cookies = cookieHeader ? cookieHeader.split('; ') : [];
    const cookieMap = new Map();
    __cookies.forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookieMap.set(name, value);
    });
    
    const refresh_token = cookieMap.get('refresh_token');
    console.log('__refresh_token', refresh_token)

    if (!refresh_token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        refresh_token,
        "grant_type": "refresh_token",
        "client_id": process.env.NEXT_PUBLIC_TF_APP_CLIENT_ID,
        "client_secret": process.env.NEXT_PUBLIC_TF_APP_CLIENT_SECRET,
      }),
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const tokenData = await res.json();
    console.log('__tokenData?.access_token', tokenData?.access_token)
    if(tokenData?.access_token){
      const cookieStore = await cookies();

      // set access_token to cookie
      cookieStore.set('access_token', tokenData.access_token, {
        httpOnly: true,
        path: '/',
        maxAge: 3600,
      });

      // console.log('set access_token to cookie completed')

      // get me
      const user = await fetch(`${ process.env.NEXT_PUBLIC_TF_APP_REDIRECT_URI }/api/v1/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${ tokenData.access_token }`
        },
      }).then((res) => res.json());

      // console.log('__user', user)
      // set user to cookie
      cookieStore.set('user', JSON.stringify(user), {
        maxAge: 604800, // 7 days in seconds (7 * 24 * 60 * 60)
        path: '/',
      });

      return NextResponse.json({
        success: true,
      })
    }

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}