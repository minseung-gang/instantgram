'use client';

import React from 'react';
import Avatar from './Avatar';
import { User } from '@/model/user';
import Link from 'next/link';
import { useDetailPost } from '@/service/post/client/usePostService';

type Props = {
  user: User;
};

export default function UserSidebar({ user }: Props) {
  const { username, name, image } = user;

  return (
    <div className="pl-10 below-xl:hidden">
      <div className="flex items-center gap-x-2 mt-8 px-3">
        <Link href={`/user/${name}`}>
          <Avatar image={image} size="small" />
        </Link>
        <div>
          <Link href={`/user/${name}`}>
            <p className="text-sm font-semibold leading-4">{username}</p>
          </Link>
          <p className="text-sm text-gray-500 leading-4">{name}</p>
        </div>
      </div>
    </div>
  );
}
