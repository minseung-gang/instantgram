'use client';

import { SimplePost } from '@/model/post';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import ActionBar from '../ActionBar';
import SmileIcon from '../ui/icons/SmileIcon';
import ModalPortal from '../ui/ModalPortal';
import PostModal from '@/components/post/PostModal';
import PostDetail from '@/components/post/PostDetail';
import PostUserAvartar from './PostUserAvartar';
import { useComments } from '@/service/post/client/usePostService';

type Props = {
  post: SimplePost;
};
export default function PostListCard({ post }: Props) {
  const { id, userImage, username, image, createdAt, comments } = post;
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState('');
  const { mutate: postComment } = useComments(id);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    postComment(comment);
    setComment('');
  };
  return (
    <article>
      <PostUserAvartar
        image={userImage}
        username={username}
        createdAt={createdAt}
      />
      <Image
        src={image}
        alt={`photo by ${username}`}
        className="w-full object-cover aspect-square pt-3"
        width={500}
        height={500}
        priority
      />
      <ActionBar post={post} />

      {comments > 1 ? (
        <p
          className="text-sm text-gray-400 mt-1"
          role="button"
          onClick={() => setOpenModal(true)}
        >
          댓글 {comments}개 모두 보기
        </p>
      ) : null}
      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          className="w-full border-none outline-none mt-2 pb-2 text-sm"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글 달기..."
        />
        {comment.length > 0 && (
          <div
            className="text-sm min-w-fit mx-3 font-semibold text-[#0095F6]"
            onClick={handleSubmit}
          >
            게시
          </div>
        )}
        <SmileIcon size="small" />
      </form>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
