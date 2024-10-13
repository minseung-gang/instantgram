'use client';

import revalidateProfileUser from '@/utils/user';
import { HomeUser, ProfileUser } from '@/model/user';
import { useFollow } from '@/service/user/client/useUserService';
import { useQuery } from '@tanstack/react-query';
import { startTransition, useState, useTransition } from 'react';

import { ClipLoader } from 'react-spinners';
import Button from './ui/Button';

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
  const { id, username } = user;
  const { data: loggedInUser } = useQuery<HomeUser>({
    queryKey: ['users'],
    queryFn: async () => fetchUser(),
    staleTime: 0,
  });

  const showButton = loggedInUser && loggedInUser?.username !== username;
  const following =
    loggedInUser &&
    loggedInUser?.following?.find((item) => item.username === username);
  const text = following ? '팔로잉' : '팔로우';
  const disabled = text === '팔로잉';
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;
  const { mutate: toggleFollow } = useFollow(id, username);

  const handleFollow = async () => {
    setIsFetching(true);
    toggleFollow(!following, {
      onSettled: () => {
        setIsFetching(false);
        startTransition(() => {
          revalidateProfileUser(username);
        });
      },
      onError: () => {
        setIsFetching(false); // 에러 발생 시 로딩 상태 해제
      },
    });
  };

  return (
    <>
      {showButton && (
        <div className="relative">
          <Button
            className={`relative px-4 py-[6px] ${disabled ? 'bg-gray-200' : 'bg-[#0095F6]'} ${disabled ? 'black' : 'text-white'} rounded-md text-sm font-semibold`}
            onClick={handleFollow}
            disabled={isUpdating}
            isLoading={isUpdating}
            text={text}
          />
          {isUpdating && (
            <div className="absolute z-20 inset-0 flex justify-center items-center">
              <ClipLoader
                className={`!w-4 !h-4 `}
                color={disabled ? 'gray' : 'white'}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
