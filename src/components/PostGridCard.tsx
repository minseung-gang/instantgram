import { SimplePost } from '@/model/post';
import Image from 'next/image';
import React, { useState } from 'react';
import ModalPortal from './ui/ModalPortal';
import PostModal from './post/PostModal';
import PostDetail from './post/PostDetail';
import { signIn, useSession } from 'next-auth/react';
import { CacheKeyContext } from '@/context/CacheKeyContext';

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
  const { image, username } = post;
  const [openModal, setOpenModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: session } = useSession();

  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }
    setOpenModal(true);
  };
  return (
    <CacheKeyContext.Provider
      value={{ postsKey: ['userPost', session?.user?.username ?? '', 'saved'] }}
    >
      <div
        className={`relative w-full h-full ${isLoaded ? 'block' : 'hidden'}`}
      >
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          fill
          sizes="650px"
          priority={priority}
          onLoadingComplete={() => setIsLoaded(true)} // 이미지 로딩 완료 시
          onClick={handleOpenPost}
        />
      </div>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </CacheKeyContext.Provider>
  );
}
