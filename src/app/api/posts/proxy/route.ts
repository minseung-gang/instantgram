import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('프록시');
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json(
      { message: 'Missing id parameter' },
      { status: 400 },
    );
  }

  const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: 'GET',
    headers: {
      Cookie: cookies().toString(),
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: 'Failed to fetch post' },
      { status: 500 },
    );
  }

  const data = await response.json();
  console.log(data, '프록시 리턴');
  return NextResponse.json(data);
}
