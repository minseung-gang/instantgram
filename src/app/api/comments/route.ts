import { authOptions } from '@/app/auth';
import { addComment, dislikePost, likePost } from '@/service/sanity/post';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  try {
    const { id, comment } = await req.json();

    if (!id || comment === undefined) {
      return new Response('Bad Request', { status: 400 });
    }
    const result = await addComment(id, user.id, comment);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/likes:', error);
    return new Response(JSON.stringify({ message: 'Server Error', error }), {
      status: 500,
    });
  }
}
