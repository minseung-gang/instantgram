'use client';

import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { useSession } from 'next-auth/react';
import { MoonLoader } from 'react-spinners';

type ClientOnlyProps = {
  children: ReactNode;
};

export default function ClientOnly({ children }: ClientOnlyProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <main className="w-full h-[100vh] flex justify-center items-center">
        <MoonLoader color="#c978b5" />
      </main>
    );
  }

  return (
    <div className="w-full h-[100vh] flex items-center">
      {session && <Navbar />}
      {children}
    </div>
  );
}
