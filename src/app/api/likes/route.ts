import { authOptions } from '@/app/auth';
import { dislikePost, likePost } from '@/service/sanity/post';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  try {
    const { id, like } = await req.json();

    if (!id || like === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = like ? dislikePost : likePost;
    const result = await request(id, user.id);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/likes:', error);
    return new Response(JSON.stringify({ message: 'Server Error', error }), {
      status: 500,
    });
  }
}