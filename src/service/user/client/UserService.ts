import { cookies } from 'next/headers';

export async function serachUser(keyword: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/search/${keyword}`,
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    return data;
  } catch {
    throw new Error('Failed to search user');
  }
}
