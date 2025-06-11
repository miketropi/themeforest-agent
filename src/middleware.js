import { NextResponse } from 'next/server';

async function refreshAccessToken(request, refreshToken, response) {
  try {
    const res = await fetch(new URL(`/api/v1/refresh`, request.url), {
      method: 'POST',
      headers: {
        'Cookie': `refresh_token=${refreshToken?.value}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include', 
    });
    
    if (!res.ok) {
      return null; // Indicates refresh failed
    }
    
    return response;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null; // Indicates refresh failed
  }
}

export async function middleware(request) {
  // Check if the request is for protected routes
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  
  // Define protected routes
  // const isProtectedRoute = pathname.startsWith('/dashboard') || 
  //                         pathname === '/api/v1/items' || 
  //                         pathname === '/api/v1/statements';

  const isProtectedRoute = pathname.startsWith('/dashboard')

  if (isProtectedRoute) {
    // Get the access_token cookie
    const accessToken = request.cookies.get('access_token');
    const refreshToken = request.cookies.get('refresh_token');

    if (accessToken) {
      return response;
    }
    
    // If the access_token cookie doesn't exist, redirect to the home page
    if (!refreshToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Try to refresh the access token
    const refreshResult = await refreshAccessToken(request, refreshToken, response);
    
    if (!refreshResult) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    return refreshResult;
  }
  
  // Continue with the request if the access_token exists or if it's not a protected route
  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};