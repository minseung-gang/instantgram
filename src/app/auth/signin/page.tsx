import React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth';
import { redirect } from 'next/navigation';
import Signin from '@/components/auth/Signin';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: 'Instantgram에 회원가입 및 로그인하기',
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SigninPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};
  return (
    <div className="w-full h-[100vh] flex items-center justify-center ">
      <div className="w-full flex flex-col items-center gap-y-10 p-10 max-w-[350px] border border-gray-200 rounded-sm">
        <Image
          src="/images/instagram-logo.png"
          alt="인스타 로고"
          width={200}
          height={50}
        />
        <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
      </div>
    </div>
  );
}
