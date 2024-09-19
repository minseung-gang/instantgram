import { getUserForProfile } from '@/service/sanity/user';
import React from 'react';
import UserProfile from '@/components/UserProfile';
import { notFound } from 'next/navigation';
import { getDehydratedQuery, Hydrate } from '@/utils/react-query';
import queryOptions from '@/service/user/server/queries';
import UserPosts from '@/components/UserPosts';

type Props = {
  params: {
    username: string;
  };
};

export default async function Userpage({ params: { username } }: Props) {
  //유저 프로필 데이터 페칭
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="py-8 px-4 max-w-[935px] w-full flex flex-col">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </div>
  );
}
