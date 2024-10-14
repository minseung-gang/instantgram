import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth';
import { getUser } from '@/service/sanity/user';
import { NextRequest, NextResponse } from 'next/server';
import { createPost, getFollowingPostsOf } from '@/service/sanity/post';

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
    const postData = await getFollowingPostsOf(user.username);

    return NextResponse.json(postData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch user' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    return NextResponse.json(
      { message: 'Authentication Error' },
      { status: 401 },
    );
  }

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
}
