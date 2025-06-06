import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Check if the request is for the dashboard route
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Get the access_token cookie
    const accessToken = request.cookies.get('access_token');
    const refreshToken = request.cookies.get('refresh_token');

    if(accessToken) {
      return response;
    }
    
    // If the access_token cookie doesn't exist, redirect to the home page
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      const res = await fetch(new URL(`/api/v1/refresh?refresh_token=${ refreshToken?.value }`, request.url), {
        method: 'POST',
      })
      // console.log(response)
      if (!res.ok) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      const tokenData = await res.json();

      // console.log('tokenData___', tokenData)

      if(tokenData?.user) {
        response.cookies.set('user', JSON.stringify(tokenData?.user), {
          // httpOnly: true,
          maxAge: 604800, // 7 days in seconds (7 * 24 * 60 * 60)
          path: '/',
        });
      }

      if(tokenData?.access_token){
        response.cookies.set('access_token', tokenData.access_token, {
          httpOnly: true,
          path: '/',
          maxAge: 3600, 
        })
      }

      if (tokenData?.refresh_token) {
        response.cookies.set('refresh_token', data.refresh_token, {
          httpOnly: true,
          path: '/',
          maxAge: 604800, // 7 days in seconds (7 * 24 * 60 * 60)
        })
      }

      return response;
    } catch (error) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  // Continue with the request if the access_token exists or if it's not a dashboard route
  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/v1/items',
    '/api/v1/statements',
  ],
};