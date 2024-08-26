import { cookies, headers } from 'next/headers';

export async function getPosts() {
  try {
    const response = await fetch(`http://localhost:3000/api/posts`, {
      method: 'GET',
      headers: {
        Cookie: cookies().toString(),
      },
    });

    const data = await response.json();

    return data;
  } catch {
    throw new Error('Failed to fetch post');
  }
}

export function getPost(postId: number) {
  return fetch(`/api/post/${postId}`);
}

export function getComments(postId: number) {
  return fetch(`/api/${postId}/comments`);
}

export function getComment({
  postId,
  commentId,
}: {
  postId: number;
  commentId: number;
}) {
  return fetch(`/api/${postId}/comments/${commentId}`);
}
