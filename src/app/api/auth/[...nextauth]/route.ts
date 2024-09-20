import { authOptions } from '@/app/auth';
import NextAuth from 'next-auth';

// NextAuth 핸들러 생성
const handler = NextAuth(authOptions);

// 각 HTTP 메서드를 명시적으로 내보냄
export { handler as GET, handler as POST };
