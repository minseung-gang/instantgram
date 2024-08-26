'use client';

import React from 'react';
import NewIcon from '../ui/icons/NewIcon';
import SearchIcon from '../ui/icons/SearchIcon';
import HomeIcon from '../ui/icons/HomeIcon';
import InstaIcon from '../ui/icons/InstaIcon';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import LogoutIcon from '../ui/icons/LogoutIcon';

const menu = [
  {
    icon: <HomeIcon />,
    href: '/',
  },
  {
    icon: <SearchIcon />,
    href: '/search',
  },
  {
    icon: <NewIcon />,
    href: '/i/flow/upload',
  },
];

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 py-8 px-4 h-[100vh] flex flex-col items-center bg-wthie border-r">
      <InstaIcon />
      <nav className="flex flex-col h-full justify-between items-center">
        <div className="flex flex-col gap-y-3">
          {menu.map((item, idx) => {
            return (
              <Link
                key={idx}
                href={item.href}
                className="p-3 hover:bg-gray-100 rounded-lg"
                scroll={false}
              >
                {item.icon}
              </Link>
            );
          })}
        </div>
        {session && <LogoutIcon onClick={() => signOut()} />}
      </nav>
    </header>
  );
}
