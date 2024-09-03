'use client';

import React from 'react';

type AvatarSize = 'small' | 'medium' | 'large';
type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'large',
  highlight = false,
}: Props) {
  return (
    <div className={getContainerClassName(size, highlight)}>
      <img
        className={`bg-white rounded-full object-cover ${getImageClassName(size, highlight)}`}
        alt="user profile"
        src={image ?? undefined}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerClassName(size: AvatarSize, highlight: boolean): string {
  const baseClass = 'rounded-full flex justify-center items-center min-w-fit';
  const highlightClass = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const sizeClass = getSizeClass(size, 'container');

  return `${baseClass} ${highlightClass} ${sizeClass}`.trim();
}

function getImageClassName(size: AvatarSize, highlight: boolean): string {
  const baseClass = 'bg-white rounded-full object-cover';
  const sizeClass = getSizeClass(size, 'image');
  const paddingClass = highlight ? getPaddingClass(size) : '';

  return `${baseClass} ${sizeClass} ${paddingClass}`.trim();
}

function getSizeClass(size: AvatarSize, type: 'container' | 'image'): string {
  const sizeMap = {
    small: { container: 'w-[36px] h-[36px]', image: 'w-[36px] h-[36px]' },
    medium: { container: 'w-11 h-11', image: 'w-[40px] h-[40px]' },
    large: { container: 'w-[68px] h-[68px]', image: 'w-16 h-16' },
  };

  return sizeMap[size][type];
}

function getPaddingClass(size: AvatarSize): string {
  const paddingMap = {
    small: 'p-[0.1rem]',
    medium: 'p-[0.2rem]',
    large: 'p-[3px]',
  };

  return paddingMap[size];
}
