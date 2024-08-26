import React from 'react';
import HeartIcon from '../icons/HeartIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import SmileIcon from '../icons/SmileIcon';

type Props = {
  likes: string[];
  username: string;
  text: string;
};

export default function ActionBar({ likes, username, text }: Props) {
  return (
    <>
      <div className="flex justify-between my-3 px-2">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="px-2 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        <p className="text-sm">
          <span className="font-semibold text-sm mr-1">{username}</span>
          {text}
        </p>
      </div>
    </>
  );
}
