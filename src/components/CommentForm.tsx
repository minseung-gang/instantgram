import React from 'react';
import SmileIcon from '@/components/ui/icons/SmileIcon';

export default function CommentForm() {
  return (
    <form className="flex items-center">
      <input
        className="w-full border-none outline-none mt-2 pb-2 text-sm"
        type="text"
        placeholder="댓글 달기..."
      />
      <SmileIcon />
    </form>
  );
}
