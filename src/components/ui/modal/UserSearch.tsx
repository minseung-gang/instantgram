'use client';

import { useSearchUsers } from '@/service/user/useUserService';
import React, { useState, FormEvent, useRef, useEffect } from 'react';
import ModalPortal from '../ModalPortal';
import useModalAnimation from '@/hooks/useModalAnimation';
import { ClipLoader } from 'react-spinners';
import { SearchUser } from '@/model/user';
import { IoCloseCircle } from 'react-icons/io5';
import { useSearchQuery } from '@/hooks/useSearchArticle';
import SearchSkeleton from '../SearchSkeleton';
import Image from 'next/image';
import Avatar from '@/components/Avatar';
import UserCard from '@/components/UserCard';
import useDebounce from '@/hooks/useDebounce';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UserSearch({ isOpen, onClose }: Props) {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);
  const { users, isLoading, isFetching, error } =
    useSearchQuery(debouncedKeyword);
  const { visible, startAnimation } = useModalAnimation(isOpen);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        e.stopPropagation();
        onClose(); // 모달 닫기
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!visible) {
    return null;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  // 안쪽 클릭 시 이벤트 전파 방지
  const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // 아이콘 클릭 시 포커스 해제 방지 및 키워드 초기화
  const handleIconClick = (e: React.MouseEvent) => {
    setKeyword(''); // 키워드 초기화
    inputRef.current?.focus(); // 포커스 유지
  };

  return (
    <ModalPortal>
      <div
        className={`fixed left-[89px] top-0  w-[350px] h-full bg-opacity-50 z-1 transition-transform duration-500 transform ${
          startAnimation ? 'translate-x-0' : '-translate-x-full'
        }`}
        ref={modalRef}
      >
        <div
          className="flex flex-col absolute top-0 left-0 w-full h-full bg-white rounded-tr-3xl rounded-br-2xl shadow-[5px_0px_30px_-10px_rgba(0,0,0,0.2)]"
          onClick={handleInsideClick}
        >
          <div className="px-4 pt-5 pb-6">
            <span className="text-2xl font-semibold">검색</span>
          </div>

          <form onSubmit={onSubmit} className="px-4 pb-4">
            <div className="relative flex items-center py-2 px-3 bg-gray-100 rounded-md">
              <input
                className="w-full bg-transparent text-gray-400 text-sm placeholder:font-light placeholder:text-gray-300 outline-none"
                type="text"
                autoFocus
                placeholder="검색"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />

              {isLoading || isFetching ? (
                <div className="w-5 h-5">
                  <ClipLoader color="gray" size={15} />
                </div>
              ) : (
                keyword.length > 0 && (
                  <IoCloseCircle
                    className="w-5 h-5 text-gray-300 cursor-pointer"
                    onClick={(e) => handleIconClick(e)}
                  />
                )
              )}
            </div>
          </form>

          {isLoading || isFetching ? (
            <div className="flex flex-col w-full h-full py-4 px-5">
              {Array.from({ length: 15 }).map((_, index) => (
                <SearchSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="flex h-full">
              {(!isLoading && !error && keyword === '') ||
              users?.length === 0 ? (
                <div className="flex flex-grow  flex-col py-4 border-t border-gray-300">
                  <p className="py-2 px-4 font-semibold">최근 검색 항목</p>
                  <div className="flex flex-grow justify-center items-center ">
                    <p className="text-sm font-semibold">찾는 사용자가 없음</p>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col flex-grow items-center ">
                  <ul className="w-full flex flex-col flex-grow h-full">
                    {users &&
                      users.map((user: SearchUser) => (
                        <li key={user.username}>
                          <UserCard user={user} />
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ModalPortal>
  );
}
