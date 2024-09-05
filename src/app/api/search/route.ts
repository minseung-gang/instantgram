import { serachUsers } from '@/service/sanity/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return serachUsers().then((data) => NextResponse.json(data));
}
