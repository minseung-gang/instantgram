'use client';

import { SimplePost } from '@/model/post';
import Image from 'next/image';
import React, { useState } from 'react';
import ActionBar from '../ActionBar';
import SmileIcon from '../ui/icons/SmileIcon';
import ModalPortal from '../ui/ModalPortal';
import PostModal from '@/components/post/PostModal';
import PostDetail from '@/components/post/PostDetail';
import PostUserAvartar from './PostUserAvartar';
import useModal from '@/hooks/useModal';

type Props = {
  post: SimplePost;
};
export default function PostListCard({ post }: Props) {
  const { userImage, username, image, createdAt, likes, text, comments } = post;
  const [openModal, setOpenModal] = useState(false);

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
      <form className="flex items-center">
        <input
          className="w-full border-none outline-none mt-2 pb-2 text-sm"
          type="text"
          placeholder="댓글 달기..."
        />
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
