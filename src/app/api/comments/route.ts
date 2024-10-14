import { addComment } from '@/service/sanity/post';
import { withSessionUser } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    try {
      const { id, comment } = await req.json();

      if (!id || comment == null) {
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
  });
}
