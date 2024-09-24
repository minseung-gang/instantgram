import { authOptions } from '@/app/auth';
import { dislikePost, likePost } from '@/service/sanity/post';
import { addBookmark, removeBookmark } from '@/service/sanity/user';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  try {
    const { id, bookmark } = await req.json();

    if (!id || bookmark === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = bookmark ? removeBookmark : addBookmark;
    const result = await request(user.id, id);

    return NextResponse.json(result);
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server Error', error }), {
      status: 500,
    });
  }
}
