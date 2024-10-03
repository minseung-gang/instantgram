'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import CustomButton from '@/components/ui/CustomButton';

type SigninProps = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: SigninProps) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <CustomButton
          key={name}
          className={`${id}`}
          onClick={() => signIn(id, { callbackUrl })}
        >
          <Image
            src={`/images/${id}.png`}
            alt={name}
            width={30}
            height={30}
            priority
          />
          <span className={`${id}-text w-full`}>Sign in with {id}</span>
        </CustomButton>
      ))}
    </>
  );
}
