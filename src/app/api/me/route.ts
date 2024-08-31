import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getUser } from '@/service/sanity/user';
import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json(
      { message: 'Authentication Error' },
      { status: 401 },
    );
  }

  try {
    const userData = await getUser(user.username);

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch user' },
      { status: 500 },
    );
  }
}
