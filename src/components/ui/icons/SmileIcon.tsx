import React from 'react';
import { GoSmiley } from 'react-icons/go';

type Props = {
  size?: 'small' | 'normal';
};

export default function SmileIcon({ size = 'normal' }: Props) {
  return (
    <GoSmiley
      className={`${size == 'small' ? 'w-[14px] h-[14px] text-gray-400' : 'w-6 h-6'} min-w-fit`}
    />
  );
}
