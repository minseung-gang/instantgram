import {
  useMutation,
  useQuery,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';

import queryOptions from '@/service/post/client/queries';

export function useDetailPost({ postId }: { postId: string }) {
  return useQuery(queryOptions.detail(postId));
}

export function useComments({ postId }: { postId: string }) {
  return useQuery(queryOptions.comments(postId));
}

export function useComment({
  postId,
  commentId,
}: {
  postId: string;
  commentId: number;
}) {
  return useQuery(queryOptions.comment({ postId, commentId }));
}

export function useLikePost(postId: string, currentUser: string) {
  const queryClient = useQueryClient();
  return useMutation(queryOptions.like(queryClient, postId, currentUser));
}
