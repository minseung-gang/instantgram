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
