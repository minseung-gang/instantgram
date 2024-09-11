import { getDehydratedQuery, Hydrate } from '@/utils/react-query';
import React from 'react';
import PostList from './PostList';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { cookies } from 'next/headers';

async function getPosts() {
  try {
    const response = await fetch(`http://localhost:3000/api/posts`, {
      method: 'GET',
      headers: {
        Cookie: cookies().toString(),
      },
    });

    const data = await response.json();

    return data;
  } catch {
    throw new Error('Failed to fetch post');
  }
}

export default async function PostContainer() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Authentication required</div>;
  }
  const { queryFn, queryKey } = {
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  };
  const query = await getDehydratedQuery({ queryKey, queryFn });

  return (
    <Hydrate state={{ queries: [query] }}>
      <PostList />
    </Hydrate>
  );
}
