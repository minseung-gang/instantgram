import queryOptions from '@/service/query/post/queries';
import { getDehydratedQuery, Hydrate } from '@/utils/react-query';
import React from 'react';
import PostList from './PostList';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function PostContainer() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Authentication required</div>;
  }
  const { queryFn, queryKey } = queryOptions.all();
  const query = await getDehydratedQuery({ queryKey, queryFn });

  return (
    <Hydrate state={{ queries: [query] }}>
      <PostList />
    </Hydrate>
  );
}
