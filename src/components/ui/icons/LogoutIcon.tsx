import React from 'react';
import { RxExit } from 'react-icons/rx';

type Props = {
  onClick: () => void;
};

export default function LogoutIcon({ onClick }: Props) {
  return (
    <RxExit
      className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform duration-100 ease-in-out transform"
      onClick={onClick}
    />
  );
}
