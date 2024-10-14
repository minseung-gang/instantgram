import { dislikePost, likePost } from '@/service/sanity/post';
import { withSessionUser } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    try {
      const { id, like } = await req.json();

      const request = like ? dislikePost : likePost;
      const result = await request(id, user.id);

      return NextResponse.json(result);
    } catch (error) {
      console.error('Error in /api/likes:', error);
      return new Response(JSON.stringify({ message: 'Server Error', error }), {
        status: 500,
      });
    }
  });
}
