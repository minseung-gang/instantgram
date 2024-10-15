'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

type AuthType = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthType) {
  return <SessionProvider>{children}</SessionProvider>;
}
