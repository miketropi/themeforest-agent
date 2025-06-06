import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const response1 = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/v1/market/private/user/username.json`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const { username } = await response1.json();

    const response2 = await fetch(`${ process.env.NEXT_PUBLIC_API_URL }/v1/market/private/user/account.json`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const { surname, ...user } = await response2.json();
    // console.log('/me', user);
    return NextResponse.json({ username, ...user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
