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

export async function getUserPost(username: string, tab: string) {
  console.log('username', username, 'tab', tab);
  try {
    const response = await fetch(
      ` ${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/${username}/${tab}`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();

    return data;
  } catch {
    throw new Error('Failed to fetch user');
  }
}
