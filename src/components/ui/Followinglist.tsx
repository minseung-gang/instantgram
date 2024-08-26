'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Avatar from '@/components/Avatar';
import CarouselBar from './CarouselBar';
import { SimpleUser } from '@/model/user';
import { useUsers } from '@/service/query/user/useUserService';

 
export default function FollowingList( ) {
  const { data,isLoading} = useUsers();

  if (!data) {
    return <p>You don`t have following</p>;
  }

  console.log('프롭스', data);
    
  return (
        <div>dd</div>
   /*  <CarouselBar>
      {initialData.map(({ image, username }: SimpleUser) => (
        <Link
          key={username}
          href={`/user/${username}`}
          className="flex flex-col items-center w-20"
        >
          <Avatar image={image} highlight />
          <p className="text-xs">{username}</p>
        </Link>
      ))}
    </CarouselBar> */
  );
}
