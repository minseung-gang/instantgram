import { addUser } from '@/service/sanity/user';
import NextAuth, { NextAuthOptions } from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: 'jwt', // JWT 세션을 사용하여 세션을 관리
  },
  callbacks: {
    async signIn({ user: { id, name, image, email } }) {
      if (!email) {
        return false;
      }
      addUser({
        id,
        name: name || '',
        image,
        email,
        username: email.split('@')[0],
      });
      return true;
    },
    async jwt({ token, account }) {
      // 사용자 로그인 시 JWT 토큰에 accessToken을 추가
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
        };
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
