import React from 'react';

type ColorButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  size?: 'small' | 'big';
  className: string;
};

export default function CustomButton({
  onClick,
  className,
  size = 'small',
  children,
}: ColorButtonProps) {
  return (
    <button
      className={`w-full flex items-center border rounded-md shadow-sm h-[40px] ${className} ${size === 'big' ? 'p-4 text-2xl' : 'p-2 text-base'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
