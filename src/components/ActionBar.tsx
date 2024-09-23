`use client`;

import React, { useState } from 'react';
import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import SmileIcon from './ui/icons/SmileIcon';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import { SimplePost } from '@/model/post';
import { useSession } from 'next-auth/react';
import { useLikePost } from '@/service/post/client/usePostService';

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { id, likes, username, text } = post;
  const { data: session } = useSession();
  const user = session?.user;
  const currentUser = user?.username ?? '';
  const liked = !!(user && likes?.includes(currentUser));

  const [bookmarked, setBookmarked] = useState(false);
  const likeMutation = useLikePost(id, currentUser);

  const handleLike = () => {
    likeMutation.mutate(liked);
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
          onToggle={setBookmarked}
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
    </>
  );
}
