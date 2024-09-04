export async function getUser() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/api-proxy?endpoint=me`,
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
