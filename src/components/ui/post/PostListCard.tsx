import Avatar from '@/components/Avatar';
import { SimplePost } from '@/model/post';
import Image from 'next/image';
import React from 'react';
import { parseDate } from '@/utils/date';
import CommentForm from '../CommentForm';
import ActionBar from './ActionBar';

type Props = {
  post: SimplePost;
};
export default function PostListCard({ post }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  console.log('라잌', likes);
  return (
    <article>
      <div className="flex items-center pb-3 pl-1">
        <Avatar image={userImage} size="small" highlight />
        <div className="flex gap-x-1 items-center">
          <span className="text-gray-900 font-semibold text-sm ml-2">
            {username}
          </span>
          <span className="text-sm text-gray-500">•</span>
          <span className="text-sm text-gray-500 tracking-tight">
            {parseDate(createdAt)}
          </span>
        </div>
      </div>
      <Image
        src={image}
        alt={`photo by ${username}`}
        className="w-full object-cover aspect-square"
        width={500}
        height={500}
        priority
      />
      <ActionBar likes={likes} username={username} text={text} />
      <CommentForm />
    </article>
  );
}
