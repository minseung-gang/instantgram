import { cookies } from 'next/headers';

export async function getPosts() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/api-proxy?endpoint=posts`,
      {
        method: 'GET',
        headers: {
          Cookie: cookies().toString(),
        },
      },
    );

    const data = await response.json();

    return data;
  } catch {
    throw new Error('Failed to fetch post');
  }
}
