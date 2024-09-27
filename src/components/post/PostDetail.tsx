import { SimplePost } from '@/model/post';
import {
  useComments,
  useDetailPost,
} from '@/service/post/client/usePostService';
import Image from 'next/image';
import React from 'react';
import ActionBar from '../ActionBar';
import Avatar from '@/components/Avatar';
import { parseDate } from '@/utils/date';
import PostUserAvartar from './PostUserAvartar';

import CommentForm from '../CommentForm';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt } = post;
  const { data, isLoading: loading } = useDetailPost({ postId: id });
  const comments = data?.comments;
  const { mutate: postComment } = useComments(id);
  const handlePostComment = (comment: string) => {
    postComment(comment);
  };
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
            <ul className="flex flex-col gap-y-5 flex-grow overflow-scroll">
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
            <ActionBar post={post}>
              <p className="text-xs text-gray-500">{parseDate(createdAt)}</p>
            </ActionBar>
          </div>
          <CommentForm onPostComment={handlePostComment} />
        </div>
      )}
    </section>
  );
}
