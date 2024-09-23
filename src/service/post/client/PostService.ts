import { SimplePost } from '@/model/post';
import { QueryClient } from '@tanstack/react-query';

export async function getDetailPost(postId: string) {
  try {
    const response = await fetch(`/api/posts/proxy?postId=${postId}`, {
      method: 'GET',
    });

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

export function getComments(postId: string) {
  return fetch(`/api/${postId}/comments`);
}

export function getComment({
  postId,
  commentId,
}: {
  postId: string;
  commentId: number;
}) {
  return fetch(`/api/${postId}/comments/${commentId}`);
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

export async function OptimisticLikeUpdate(
  queryClient: QueryClient,
  postId: string,
  currentUser: string,
) {
  return async (liked: boolean) => {
    // 좋아요가 눌린 상태를 즉시 업데이트
    await queryClient.cancelQueries({ queryKey: ['posts'] });

    const previousPosts = queryClient.getQueryData<SimplePost[]>(['posts']);

    if (previousPosts) {
      const updatedPosts = previousPosts.map((post) => {
        if (post.id === postId) {
          const likes = post.likes || []; // 좋아요가 없을 시 빈 배열 처리
          return {
            ...post,
            likes: liked
              ? likes.filter((username) => username !== currentUser) // 좋아요 삭제
              : [...likes, currentUser], // 좋아요 추가
          };
        }
        return post;
      });

      queryClient.setQueryData(['posts'], updatedPosts);
    }

    return { previousPosts }; //오류가 발생했을 때 원래의 상태로 복구하기 위해서 백업 데이터를 반환
  };
}
