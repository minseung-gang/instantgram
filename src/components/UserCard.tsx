import { SearchUser } from '@/model/user';
import Link from 'next/link';
import React from 'react';
import Avatar from './Avatar';

type Props = {
  user: SearchUser;
};

export default function UserCard({ user: { name, username, image } }: Props) {
  return (
    <Link
      className="flex px-5 py-[8px] gap-x-3 items-center hover:bg-gray-100"
      href={`/user/${username}`}
    >
      {image && <Avatar image={image} size="medium" />}
      <div className="flex flex-col">
        <p className="text-sm">{username}</p>
        <p className="text-sm font-semibold">{name}</p>
      </div>
    </Link>
  );
}
