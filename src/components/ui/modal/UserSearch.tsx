'use client';

import { useSearchUsers } from '@/service/user/useUserService';
import React, { useState, useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UserSearch({ isOpen, onClose }: Props) {
  const [keyword, setKeyword] = useState('');
  const { data, isLoading, error } = useSearchUsers(keyword);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  console.log(data, '유저검색');
  return (
    <div
      className={`fixed ${isOpen ? 'left-0' : '-left-full'} top-0 w-[400px] h-full transition-all duration-300 bg-white`}
    >
      검색
    </div>
  );
}
