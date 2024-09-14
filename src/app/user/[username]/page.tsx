import { getUserForProfile } from '@/service/sanity/user';
import React from 'react';
import UserProfile from '@/components/UserProfile';
import { notFound } from 'next/navigation';
import { getDehydratedQuery, Hydrate } from '@/utils/react-query';
import queryOptions from '@/service/user/server/queries';

type Props = {
  params: {
    username: string;
  };
};

export default async function Userpage({ params: { username } }: Props) {
  const user = await getUserForProfile(username);
  const button = [
    { title: '게시물' },
    {
      title: '릴스',
    },
    { title: '태그됨' },
  ];
  const { queryKey, queryFn } = queryOptions.all();
  const query = await getDehydratedQuery({ queryKey, queryFn });
  if (!user) {
    notFound();
  }

  return (
    <Hydrate state={{ queries: [query] }}>
      <div className="py-8 px-4">
        <UserProfile user={user} />
        <div className="border-t border-gray-200">
          <div className="flex justify-center gap-x-12">
            {button.map(({ title }, idx) => (
              <div key={idx} className="leading-[52px]">
                <span className="text-xs">{title}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-flow-col">
            <div className="w-[300px] aspect-square">d</div>
            <div className="w-[300px] aspect-square">d</div>
            <div className="w-[300px] aspect-square">d</div>
          </div>
        </div>
      </div>
    </Hydrate>
  );
}
