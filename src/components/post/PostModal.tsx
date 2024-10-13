import React from 'react';
import CloseIcon from '../ui/icons/CloseIcon';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  onDragEnter?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
};

export default function PostModal({
  onClose,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  children,
}: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-[9999] bg-neutral-900/70"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <button
        className="fixed right-5 top-5 text-white"
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      {children}
    </section>
  );
}
