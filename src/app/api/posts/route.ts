import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth';
import { NextRequest, NextResponse } from 'next/server';
import { createPost, getFollowingPostsOf } from '@/service/sanity/post';
import { withSessionUser } from '@/utils/session';

export async function GET() {
  return withSessionUser(async (user) => {
    try {
      const postData = await getFollowingPostsOf(user.username);

      return NextResponse.json(postData, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: 'Failed to fetch user' },
        { status: 500 },
      );
    }
  });
}

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    try {
      const form = req.formData();
      const text = (await form).get('text')?.toString() ?? '';
      const file = (await form).get('file') as Blob;

      if (!file) {
        return new Response('Bad Request', { status: 400 });
      }
      const response = await createPost(user.id, text, file);
      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: 'Failed to fetch user' },
        { status: 500 },
      );
    }
  });
}
