import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log('세션', session);

    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
      return NextResponse.json(
        { message: 'Missing endpoint parameter' },
        { status: 400 },
      );
    }

    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/${endpoint}`,
      {
        method: 'GET',
        headers: {
          Cookie: cookies().toString(),
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch user' },
      { status: 500 },
    );
  }
}
