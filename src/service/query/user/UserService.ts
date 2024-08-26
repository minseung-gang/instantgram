import { DetailUser } from '@/model/user';
import { headers } from 'next/headers';

export async function getUser() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/api-proxy?endpoint=me`,
      {
        method: 'GET',
      },
    );

    const data = await response.json();

    return data;
  } catch {
    throw new Error('Failed to fetch user');
  }
  //기본적으로 fetch를 사용할때 쿠키는 보안상의 이유로 서버 측 페치 호출에서 전달되지 않기때문에 headers를 전달해줘야 한다.
}
