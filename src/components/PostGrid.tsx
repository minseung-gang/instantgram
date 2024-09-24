import { useUserPost } from '@/service/user/client/useUserService';
import React from 'react';
import { ClipLoader } from 'react-spinners';
import PostGridCard from './PostGridCard';

type Props = {
  username: string;
  query: string;
};

export default function PostGrid({ username, query }: Props) {
  const { data: posts, isLoading, error } = useUserPost(username, query);

  return (
    <div className="w-full text-center">
      {isLoading && <ClipLoader />}

      <ul className="w-full grid grid-cols-3 gap-1">
        {posts &&
          posts.map((post, idx) => (
            <li key={post.id} className="aspect-square relative">
              <PostGridCard post={post} priority={idx < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
