import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/auth';
import { getPost } from '@/service/sanity/post';

type Context = {
  params: { id: string };
};

export async function GET(request: NextRequest, context: Context) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json(
      { message: 'Authentication Error' },
      { status: 401 },
    );
  }

  return getPost(context.params.id) //
    .then((data) => NextResponse.json(data));
}
