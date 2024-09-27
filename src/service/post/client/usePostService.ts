import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import queryOptions from '@/service/post/client/queries';

export function useDetailPost({ postId }: { postId: string }) {
  return useQuery(queryOptions.detail(postId));
}

export function useLikePost(postId: string, currentUser: string) {
  const queryClient = useQueryClient();
  return useMutation(queryOptions.like(queryClient, postId, currentUser));
}

export function useComments(postId: string) {
  const queryClient = useQueryClient();
  return useMutation(queryOptions.comment(queryClient, postId));
}
