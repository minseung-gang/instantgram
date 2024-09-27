import React, { FormEvent, useState } from 'react';
import SmileIcon from '@/components/ui/icons/SmileIcon';

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState('');
  const buttonDisabled = comment.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment('');
  };
  return (
    <form className="flex items-center py-2 pr-4 border-t border-gray-200">
      <div className="px-4 py-2">
        <SmileIcon />
      </div>
      <input
        className="w-full outline-none text-sm placeholder:text-gray-500"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글 달기..."
      />
      <button
        disabled={buttonDisabled}
        className={`min-w-fit text-sm font-bold ${buttonDisabled ? 'text-blue-300' : 'text-blue-500'}`}
        onClick={handleSubmit}
      >
        게시
      </button>
    </form>
  );
}
