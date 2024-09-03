'use client';

import { SimplePost } from '@/model/post';
import Image from 'next/image';
import React, { useState } from 'react';
import { parseDate } from '@/utils/date';
import ActionBar from './ActionBar';
import SmileIcon from '../icons/SmileIcon';
import ModalPortal from '../ModalPortal';
import PostModal from '@/components/ui/post/PostModal';
import PostDetail from '@/components/ui/post/PostDetail';
import PostUserAvartar from './PostUserAvartar';
import useModal from '@/hooks/useModal';

type Props = {
  post: SimplePost;
};
export default function PostListCard({ post }: Props) {
  const { userImage, username, image, createdAt, likes, text, comments } = post;
  const { isOpen, openModal, closeModal } = useModal();

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
      <ActionBar likes={likes} username={username} text={text} />

      {comments > 1 ? (
        <p
          className="text-sm text-gray-400 mt-1"
          role="button"
          onClick={openModal}
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
      {isOpen && (
        <ModalPortal>
          <PostModal onClose={closeModal}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
