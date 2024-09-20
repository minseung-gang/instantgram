'use client';

import { ProfileUser } from '@/model/user';

import React, { useState } from 'react';
import PostIcon from './ui/icons/PostIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import HeartIcon from './ui/icons/HeartIcon';
import PostGrid from './PostGrid';
import queryOptions from '@/service/user/client/queries';

type Props = {
  user: ProfileUser;
};
const tabs = [
  { type: 'posts', icon: <PostIcon />, label: '게시물' },
  {
    type: 'saved',
    icon: <BookmarkIcon className="w-3 h-3" />,
    label: '저장됨',
  },
  { type: 'liked', icon: <HeartIcon className="w-3 h-3" />, label: '좋아요' },
];
export default function UserPosts({ user: { username } }: Props) {
  // /api/users/$${username}/posts
  // /api/users/$${username}/liked
  // /api/users/$${username}/bookmarks
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section className="border-t border-gray-200 flex flex-col flex-grow">
      <ul className="grid grid-cols-3">
        {tabs.map(({ label, type, icon }) => (
          <li
            key={label}
            className={`flex justify-center items-center h-[52px] ${query == type ? 'text-black' : 'text-gray-500'} cursor-pointer`}
            onClick={() => setQuery(type)}
          >
            <span>{icon}</span>
            <span
              className={`${query == type ? 'font-semibold' : ''} text-xs ml-2`}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
      <PostGrid username={username} query={query} />
    </section>
  );
}
