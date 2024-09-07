import { useSearchUsers } from '@/service/user/useUserService';
import React, { useState, FormEvent, useRef, useEffect } from 'react';
import ModalPortal from '../ModalPortal';
import useModalAnimation from '@/hooks/useModalAnimation';
import { ClipLoader, FadeLoader } from 'react-spinners';
import { ProfileUser } from '@/model/user';
import { IoCloseCircle } from 'react-icons/io5';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UserSearch({ isOpen, onClose }: Props) {
  const [keyword, setKeyword] = useState('');
  const { data: users, isLoading, error } = useSearchUsers(keyword);
  const { visible, startAnimation } = useModalAnimation(isOpen);
  const [isFocused, setIsFocused] = useState(false); // Focus 상태 관리 추가
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // 모달 외부 클릭 감지 핸들러
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        onClose(); // 모달 닫기
      }
    };

    // 이벤트 리스너 등록
    document.addEventListener('mousedown', handleOutsideClick);

    // 이벤트 리스너 해제
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
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
    e.preventDefault();
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
          className="flex flex-col absolute top-0 left-0 w-full h-full bg-white py-6 px-5 rounded-tr-3xl rounded-br-2xl shadow-[5px_0px_30px_-10px_rgba(0,0,0,0.2)]"
          onClick={handleInsideClick}
        >
          <div className="pb-6">
            <span className="text-2xl font-semibold">검색</span>
          </div>
          <form onSubmit={onSubmit}>
            <div className="relative flex items-center py-2 px-3 bg-gray-100 rounded-md">
              <input
                className="w-full bg-transparent text-gray-400 text-sm placeholder:font-light placeholder:text-gray-300 outline-none"
                type="text"
                autoFocus
                placeholder="검색"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onFocus={() => setIsFocused(true)} // 포커스 상태 설정
                onBlur={() => setIsFocused(false)} // 포커스 해제 시 상태 업데이트
              />

              {isLoading ? (
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

          <div className="flex items-center justify-center flex-grow py-4">
            {(!isLoading && !error && keyword === '') ||
            users?.length == undefined ? (
              <p>찾는 사용자가 없음</p>
            ) : (
              <ul>
                {users &&
                  users.map((user: ProfileUser) => (
                    <li key={user.username}>
                      <p>{user.username}</p>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
