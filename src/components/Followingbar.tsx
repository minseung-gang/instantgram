'use client';

import React from 'react';
import { useUsers } from '@/service/user/server/useUserService';
import CarouselBar from './ui/CarouselBar';
import Link from 'next/link';
import { SimpleUser } from '@/model/user';
import Avatar from './Avatar';
import { ClipLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';

async function fetchUsers() {
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

export default function Followingbar() {
  const { data, isLoading: loading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  const users = data?.following ? [...data?.following] : [];

  return (
    <section className="w-full flex justify-center items-center p-4 my-4 rounded-lg min-h-[90px] overflow-x-auto">
      {loading ? (
        <ClipLoader size={20} color="pink" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <CarouselBar>
          {users.map(({ image, username }: SimpleUser) => (
            <Link
              key={username}
              href={`/user/${username}`}
              className="flex flex-col items-center w-20"
            >
              <Avatar image={image} highlight />
              <p className="text-xs w-full text-center text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </CarouselBar>
      )}
    </section>
  );
}
