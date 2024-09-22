import { SimplePost } from '@/model/post';
import { useDetailPost } from '@/service/post/client/usePostService';
import Image from 'next/image';
import React from 'react';
import ActionBar from '../ActionBar';
import Avatar from '@/components/Avatar';
import { parseDate } from '@/utils/date';
import PostUserAvartar from './PostUserAvartar';
import SmileIcon from '../ui/icons/SmileIcon';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes, text } = post;

  const { data, isLoading: loading } = useDetailPost({ postId: id });
  const comments = data?.comments;

  return (
    <section className="py-[30px] w-full h-full max-w-[1200px] grid  grid-cols-[60%,40%]">
      <div className="relative">
        {loading ? (
          <div className="bg-gray-200 w-full h-full " />
        ) : (
          <Image
            src={image}
            alt={`photo by ${username}`}
            className="object-cover"
            fill
            sizes="650px"
            priority
          />
        )}
      </div>
      {loading ? (
        <div className="bg-white w-full h-full " />
      ) : (
        <div className="bg-white  flex flex-col">
          <div className="flex items-center gap-x-5 px-4 py-3 border-b border-gray-100">
            <PostUserAvartar image={userImage} username={username} />
          </div>
          <div className="px-4 py-4 h-full flex flex-col flex-grow">
            <div className="flex-grow overflow-scroll">
              <ul className="flex flex-col gap-y-5">
                {comments &&
                  comments.map(
                    (
                      { image, username: commentUsername, comment }: any,
                      index: number,
                    ) => (
                      <li key={index} className="flex gap-x-4">
                        <Avatar image={image} size="small" />
                        <span className="inline-block leading-3">
                          <span className="text-sm/[14px] mr-1 font-semibold">
                            {commentUsername}
                          </span>
                          <span className="text-sm tracking-tight ">
                            {comment}
                          </span>
                        </span>
                      </li>
                    ),
                  )}
              </ul>
            </div>
            <ActionBar post={post} />
            <p className="text-xs text-gray-500">{parseDate(createdAt)}</p>
          </div>
          <form className="flex items-center py-2 pr-4 border-t border-gray-200">
            <div className="px-4 py-2">
              <SmileIcon />
            </div>
            <input
              className="w-full outline-none text-sm placeholder:text-gray-500"
              type="text"
              placeholder="댓글 달기..."
            />
            <button className="min-w-fit text-sm font-bold text-blue-400">
              게시
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
