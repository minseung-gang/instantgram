'use client';

import React, { useRef } from 'react';
import NewIcon from '../ui/icons/NewIcon';
import SearchIcon from '../ui/icons/SearchIcon';
import HomeIcon from '../ui/icons/HomeIcon';
import InstaIcon from '../ui/icons/InstaIcon';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import LogoutIcon from '../ui/icons/LogoutIcon';
import useModal from '@/hooks/useModal';
import NewPost from '../ui/modal/NewPost';
import UserSearch from '../ui/modal/UserSearch';

export default function Navbar() {
  const { modalState, openModal, closeModal, toggleModal } = useModal();

  return (
    <header className="sticky top-0 py-8 px-4 h-[100vh] flex flex-col items-center bg-white border-r z-50">
      <InstaIcon />
      <NewPost
        isOpen={modalState.newPost.isOpen}
        onClose={() => toggleModal('newPost')}
      />
      <UserSearch
        isOpen={modalState.search.isOpen}
        onClose={() => toggleModal('search')}
      />
      <nav className="flex flex-col h-full justify-between items-center">
        <div className="flex flex-col gap-y-3">
          <Link
            href="/"
            className="p-3 hover:bg-gray-100 rounded-lg"
            scroll={false}
          >
            <HomeIcon />
          </Link>
          <button
            className="p-3 hover:bg-gray-100 rounded-lg"
            onClick={() => toggleModal('search')}
          >
            <SearchIcon />
          </button>
          <button
            className="p-3 hover:bg-gray-100 rounded-lg"
            onClick={() => closeModal('newPost')}
          >
            <NewIcon />
          </button>
        </div>
        <LogoutIcon onClick={() => signOut()} />
      </nav>
    </header>
  );
}
