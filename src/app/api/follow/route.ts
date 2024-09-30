import { authOptions } from '@/app/auth';
import { dislikePost, likePost } from '@/service/sanity/post';
import { follow, unfollow } from '@/service/sanity/user';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  try {
    const { id: targetId, follow: isFollow } = await req.json();

    if (!targetId || isFollow === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = isFollow ? follow : unfollow;
    const result = await request(user.id, targetId);

    return NextResponse.json(result);
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server Error', error }), {
      status: 500,
    });
  }
}
