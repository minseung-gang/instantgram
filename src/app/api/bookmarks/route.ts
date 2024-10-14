import { addBookmark, removeBookmark } from '@/service/sanity/user';
import { withSessionUser } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
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
  });
}
