import { SimplePost } from '@/model/post';
import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

export async function getDetailPost(postId: string) {
  try {
    console.log(postId, '게시물아이디');
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'GET',
    });
    console.log('게시물 아이디', postId);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error('Failed to fetch post');
  }
}

export async function updateLike(like: boolean, id: string) {
  try {
    const response = await fetch(`/api/likes`, {
      method: 'PUT',
      body: JSON.stringify({ like, id }),
    });

    return response.json();
  } catch (err) {
    throw console.log(err, 'Falled to update like');
  }
}

export async function OptimisticLike(
  queryClient: QueryClient,
  postId: string,
  currentUser: string,
  liked: boolean,
  queryKey: string[],
) {
  // 좋아요가 눌린 상태를 즉시 업데이트

  queryClient.cancelQueries({ queryKey: queryKey });

  const previousPosts = queryClient.getQueryData<SimplePost[]>(queryKey);

  if (previousPosts) {
    const updatedPosts = previousPosts.map((post) => {
      if (post.id === postId) {
        const likes = post.likes || []; // 좋아요가 없을 시 빈배열 처리

        return {
          ...post,
          likes: liked
            ? likes.filter((username) => username !== currentUser) // 좋아요 삭제
            : [...likes, currentUser], // 좋아요 추가
        };
      }
      return post;
    });

    queryClient.setQueryData(queryKey, updatedPosts);
  }

  return { previousPosts };
}

export async function addComment(comment: string, id: string) {
  try {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ id, comment }),
    });

    return response.json();
  } catch (err) {
    throw console.log(err, 'Falled to update like');
  }
}

export async function optimisticComment(
  queryClient: QueryClient,
  postId: string,
) {
  // 북마크 눌린 상태를 즉시 업데이트
  await queryClient.cancelQueries({ queryKey: ['posts'] });

  const previousPosts = queryClient.getQueryData<SimplePost[]>(['posts']);

  if (previousPosts) {
    const updatedPosts = previousPosts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
        };
      }
      return post;
    });
    queryClient.setQueryData(['posts'], updatedPosts);
    console.log('업데이트 게시물', updatedPosts);
  }
  return { previousPosts };
}

export async function uploadPost(formData: FormData) {
  try {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: formData,
    });

    return response.json();
  } catch (err) {
    throw console.log(err, 'Falled to upload post');
  }
}
