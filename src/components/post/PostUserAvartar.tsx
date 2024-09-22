import Avatar from '@/components/Avatar';
import { parseDate } from '@/utils/date';
import React from 'react';

type Props = {
  image: string;
  username: string;
  createdAt?: string;
};

export default function PostUserAvartar({ image, username, createdAt }: Props) {
  return (
    <div className="flex items-center pl-1">
      <Avatar image={image} size="small" />
      <div className="flex gap-x-1 items-center">
        <span className="text-gray-900 font-semibold text-sm ml-3">
          {username}
        </span>
        {createdAt && (
          <>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500 tracking-tight">
              {parseDate(createdAt)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
