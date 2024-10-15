import { serachUsers } from '@/service/sanity/user';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return serachUsers().then((data) => NextResponse.json(data));
}
