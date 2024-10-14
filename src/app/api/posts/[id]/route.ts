import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/auth';
import { getPost } from '@/service/sanity/post';
import { withSessionUser } from '@/utils/session';

type Context = {
  params: { id: string };
};

export async function GET(context: Context) {
  return withSessionUser(async () => {
    const response = await getPost(context.params.id); //
    return NextResponse.json(response);
  });
}
