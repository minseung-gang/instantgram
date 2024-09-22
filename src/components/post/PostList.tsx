'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { GridLoader } from 'react-spinners';
import PostListCard from './PostListCard';
import { SimplePost } from '@/model/post';

async function fetchPosts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/posts`,
    {
      method: 'GET',
    },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export default function PostList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (error) {
    return <div>Error loading posts: {error.message}</div>;
  }

  return (
    <section>
      {isLoading && (
        <div>
          <GridLoader color="red" />
        </div>
      )}
      {data && (
        <ul className="flex flex-col gap-y-8 items-center">
          {data?.map((post: SimplePost, idx: number) => (
            <li
              key={post.id}
              className={`py-3 ${idx !== data.length - 1 ? 'border-b border-gray-300' : ''} w-[min(470px,100%)]`}
            >
              <PostListCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
