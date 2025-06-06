import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const cookies = cookieHeader ? cookieHeader.split('; ') : [];
    const cookieMap = new Map();
    cookies.forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookieMap.set(name, value);
    });
    
    const access_token = cookieMap.get('access_token');
    
    if (!access_token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const response = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/v3/market/user/statement`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    const data = await response.json();
    console.log(data)
    return NextResponse.json(
      data,
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}