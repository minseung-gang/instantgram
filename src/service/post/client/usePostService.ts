import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import queryOptions from '@/service/post/client/queries';

export function useDetailPost({ postId }: { postId: string }) {
  return useQuery(queryOptions.detail(postId));
}

export function useLikePost(
  queryClient: QueryClient,
  postId: string,
  username: string,
  cacheKey: string | string[],
) {
  const queryKey = Array.isArray(cacheKey) ? cacheKey : [cacheKey];
  return useMutation(
    queryOptions.like(queryClient, postId, username, queryKey),
  );
}

export function useComments(postId: string) {
  const queryClient = useQueryClient();
  return useMutation(queryOptions.comment(queryClient, postId));
}

export function useUploadPost(
  queryClient: QueryClient,
  onSuccessCallback?: () => void,
) {
  return useMutation(queryOptions.upload(queryClient, onSuccessCallback));
}
