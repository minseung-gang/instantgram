'use client';

import { HomeUser, ProfileUser } from '@/model/user';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React from 'react';

type Props = {
  user: ProfileUser;
};

async function fetchUser() {
  const response = await fetch('/api/me', {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { data: loggedInUser } = useQuery<HomeUser>({
    queryKey: ['users'],
    queryFn: async () => fetchUser(),
  });

  const showButton = loggedInUser && loggedInUser?.username !== username;
  const following =
    loggedInUser &&
    loggedInUser?.following?.find((item) => item.username == username);
  const text = following ? '팔로우' : '팔로잉';

  return (
    <>
      {showButton && (
        <button
          className={`px-4 py-[6px] ${following ? 'bg-[#0095F6]' : 'bg-gray-200'} ${following ? 'text-white' : 'black'} rounded-md text-sm font-semibold`}
        >
          {text}
        </button>
      )}
    </>
  );
}
