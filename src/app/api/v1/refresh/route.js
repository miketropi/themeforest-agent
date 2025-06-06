import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const refresh_token = searchParams.get('refresh_token');
    console.log(refresh_token)
    if (!refresh_token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
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

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const tokenData = await response.json();

    if(tokenData.access_token){
      // get me
      const user = await fetch(`${ process.env.NEXT_PUBLIC_TF_APP_REDIRECT_URI }/api/v1/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${ tokenData.access_token }`
        },
      }).then((res) => res.json());

      return NextResponse.json({
        success: true,
        user,
        access_token: tokenData.access_token,
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