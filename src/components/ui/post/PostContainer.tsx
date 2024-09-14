import { getDehydratedQuery, Hydrate } from '@/utils/react-query';
import React from 'react';
import PostList from './PostList';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { cookies } from 'next/headers';
import queryOptions from '@/service/post/server/queries';

export default async function PostContainer() {
  const { queryFn, queryKey } = queryOptions.all();

  const query = await getDehydratedQuery({ queryKey, queryFn });

  return (
    <Hydrate state={{ queries: [query] }}>
      <PostList />
    </Hydrate>
  );
}
