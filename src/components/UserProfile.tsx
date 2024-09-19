import { ProfileUser } from '@/model/user';
import React from 'react';
import FollowButton from './FollowButton';
import { getDehydratedQuery, Hydrate } from '@/utils/react-query';
import queryOptions from '@/service/user/server/queries';
import Avatar from './Avatar';

type Props = {
  user: ProfileUser;
};

export default async function UserProfile({ user }: Props) {
  const { image, username, name, followers, following, posts } = user;

  const info = [
    { title: '게시물', data: posts },
    { title: '팔로워', data: followers },
    { title: '팔로우', data: following },
  ];

  // 마이 프로필 데이터 프리페칭
  const { queryKey, queryFn } = queryOptions.all();
  const query = await getDehydratedQuery({ queryKey, queryFn });

  return (
    <Hydrate state={{ queries: [query] }}>
      <section className="grid grid-rows-4 grid-cols-[1fr_2fr] grid-flow-col h-fit gap-x-[80px]">
        <section className="row-span-3 flex justify-centermr-4 justify-center">
          <Avatar size="extraLarge" image={image} />
        </section>
        <section className="col-span-2 flex items-center">
          <h2 className="mr-5 text-lg">{username}</h2>
          <FollowButton user={user} />
        </section>
        <section className="col-span-2 flex items-center">
          {info.map(({ title, data }, idx) => (
            <div key={idx} className="mr-8">
              {title}
              <span className="font-semibold ml-2">{data}</span>
            </div>
          ))}
        </section>
        <p className="col-span-2 flex items-center text-sm font-semibold">
          {name}
        </p>
        <section className="col-start-1 row-start-4 col-span-4" />
      </section>
    </Hydrate>
  );
}
