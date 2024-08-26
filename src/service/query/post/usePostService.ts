import { useQuery } from '@tanstack/react-query';

import queryOptions from '@/service/query/post/queries';

export function usePosts() {
  return useQuery(queryOptions.all());
}

export function usePost({ PostId }: { PostId: number }) {
  return useQuery(queryOptions.detail(PostId));
}

export function useComments({ PostId }: { PostId: number }) {
  return useQuery(queryOptions.comments(PostId));
}

export function useComment({
  postId,
  commentId,
}: {
  postId: number;
  commentId: number;
}) {
  return useQuery(queryOptions.comment({ postId, commentId }));
}
