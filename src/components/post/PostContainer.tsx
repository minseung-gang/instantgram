import { getDehydratedQuery, Hydrate } from '@/utils/react-query';
import React from 'react';
import PostList from './PostList';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth';
import { cookies } from 'next/headers';
import postQueryOptions from '@/service/post/server/queries';
import userQueryOptions from '@/service/user/server/queries';

export default async function PostContainer() {
  const postQuery = await getDehydratedQuery(postQueryOptions.all());
  const userQuery = await getDehydratedQuery(userQueryOptions.all());
  const session = await getServerSession(authOptions);

  const user = session?.user?.username || '';
  return (
    <Hydrate state={{ queries: [postQuery, userQuery] }}>
      <PostList />
    </Hydrate>
  );
}
