import React from 'react';
import HeartIcon from '../icons/HeartIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import SmileIcon from '../icons/SmileIcon';

type Props = {
  likes: string[];
  username: string;
  text?: string;
};

export default function ActionBar({ likes, username, text }: Props) {
  return (
    <>
      <div className="flex justify-between my-3 ">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="py-1">
        {likes?.length > 1 ? (
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
