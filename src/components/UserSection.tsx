import React from 'react';
import Avatar from './Avatar';
import { AuthUser } from '@/model/user';

export default function UserSection({ user }: { user?: AuthUser }) {
  return (
    <div className="h-16 flex items-center gap-x-2  px-3">
      <Avatar size="small" image={user?.image} />
      <span className="text-sm font-semibold leading-4">{user?.username}</span>
    </div>
  );
}
