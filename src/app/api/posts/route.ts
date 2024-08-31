import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { getUser } from '@/service/sanity/user';
import { NextResponse } from 'next/server';
import { getFollowingPostsOf } from '@/service/sanity/post';

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log('세션', session);
  const user = session?.user;

  if (!user) {
    return NextResponse.json(
      { message: 'Authentication Error' },
      { status: 401 },
    );
  }

  try {
    const postData = await getFollowingPostsOf(user.username);

    return NextResponse.json(postData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch user' },
      { status: 500 },
    );
  }
}
