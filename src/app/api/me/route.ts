import { getUser } from '@/service/sanity/user';
import { NextResponse } from 'next/server';
import { withSessionUser } from '@/utils/session';

export async function GET() {
  return withSessionUser(async (user) => {
    try {
      const userData = await getUser(user.username);

      return NextResponse.json(userData, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: 'Failed to fetch user' },
        { status: 500 },
      );
    }
  });
}
