import { HomeUser } from '@/model/user';
import { QueryClient } from '@tanstack/react-query';

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

export async function updateBookmark(postId: string, bookmark: boolean) {
  try {
    const response = await fetch(`/api/bookmarks`, {
      method: 'PUT',
      body: JSON.stringify({ id: postId, bookmark }),
    });

    return response.json();
  } catch (err) {
    throw console.log(err, 'Falled to update bookmark');
  }
}

export async function OptimisticBookmark(
  queryClient: QueryClient,
  postId: string,
  bookmarked: boolean,
) {
  // 북마크 눌린 상태를 즉시 업데이트
  await queryClient.cancelQueries({ queryKey: ['users'] });

  const previousUser = queryClient.getQueryData<HomeUser>(['users']);

  if (previousUser) {
    const updatedUser = {
      ...previousUser,
      bookmarks: bookmarked
        ? previousUser.bookmarks.filter((b) => b !== postId)
        : [...previousUser.bookmarks, postId],
    };
    queryClient.setQueryData(['users'], updatedUser);
  }
  return { previousUser };
}
