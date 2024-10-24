import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import AuthProvider from '@/context/AuthProvider';
import ReactQueryProviders from '../components/commons/ReactQueryProvider';
import Navbar from '@/components/commons/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { redirect } from 'next/navigation';

type Props = { children: ReactNode };

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Intantgram',
    template: 'Instantgram | %s',
  },
  description: 'Instantgram Photos',
};

export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ko" className={`${openSans.className}`}>
      <body className="w-full flex overflow-auto">
        <AuthProvider>
          <ReactQueryProviders>
            {session && <Navbar />}
            <main className="w-full flex justify-center h-full overflow-scroll">
              {children}
            </main>
          </ReactQueryProviders>
        </AuthProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
