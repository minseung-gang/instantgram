`use client`;

import React from 'react';
import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import { SimplePost } from '@/model/post';
import { useLikePost } from '@/service/post/client/usePostService';
import { useBookMark } from '@/service/user/client/useUserService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCacheKeys } from '@/app/context/CacheKeyContext';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
};

async function fetchUser() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/me`,
    {
      method: 'GET',
    },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export default function ActionBar({ post, children }: Props) {
  const { id, likes, username, text } = post;
  const queryClient = useQueryClient();
  const cacheKeys = useCacheKeys();

  const { data: user } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUser,
  });

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks?.includes(id) ?? false;

  const likeMutation = useLikePost(
    queryClient,
    id,
    user?.username,
    cacheKeys.postsKey,
  );
  const bookmarkMutation = useBookMark(queryClient, id, username);

  const handleLike = () => {
    user && likeMutation.mutate(liked);
  };
  const handleBookamrk = () => {
    user && bookmarkMutation.mutate(bookmarked);
  };

  return (
    <>
      <div className="flex justify-between my-3 ">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookamrk}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div>
        {likes?.length >= 1 ? (
          <span className="text-sm mb-2 flex">
            <p className="text-sm font-semibold">{likes[0]}</p>님&nbsp;
            <p className="text-sm font-semibold">여러명</p>이 좋아합니다.
          </span>
        ) : (
          <span className="text-sm mb-2 flex">
            가장 먼저&nbsp;
            <p className="text-sm font-semibold" role="button">
              좋아요
            </p>
            를 눌러보세요
          </span>
        )}
        {text && (
          <p className="text-sm">
            <span className="font-semibold text-sm mr-1">{username}</span>
            {text}
          </p>
        )}
      </div>
      {children}
    </>
  );
}
