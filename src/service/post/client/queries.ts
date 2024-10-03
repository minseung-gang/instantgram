import { SimplePost } from '@/model/post';
import * as PostService from '@/service/post/client/PostService';
import { QueryClient } from '@tanstack/react-query';

export const queryKeys = {
  all: ['posts'] as const,
  detail: (postId: string) => [postId] as const,
};

const queryOptions = {
  detail: (postId: string) => ({
    queryKey: queryKeys.detail(postId),
    queryFn: () => PostService.getDetailPost(postId),
    staleTime: 0,
    cacheTime: 0,
  }),

  comment: (queryClient: QueryClient, postId: string) => ({
    mutationFn: async (comment: string) =>
      await PostService.addComment(comment, postId),
    onMutate: async () =>
      await PostService.OptimisticComment(queryClient, postId),
    Error: (context: { previousPosts: SimplePost[] | undefined }) => {
      // 오류 발생 시 원래 상태로 복구
      queryClient.setQueryData(['posts'], context.previousPosts);
    },

    onSettled: () => {
      // 서버 응답 후 최신 데이터 가져오기 (이 부분에서 무효화 후 데이터 fetch)
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.refetchQueries({ queryKey: [postId] });
    },
  }),

  like: (
    queryClient: QueryClient,
    postId: string,
    username: string,
    queryKey: string[],
  ) => ({
    mutationFn: async (liked: boolean) =>
      await PostService.updateLike(liked, postId),

    onMutate: async (liked: boolean) =>
      await PostService.OptimisticLike(
        queryClient,
        postId,
        username,
        liked,
        queryKey,
      ),

    onError: (context: { previousPosts: SimplePost[] }) => {
      // 오류 발생 시 원래 상태로 복구
      console.log('오류');
      queryClient.setQueryData(queryKey, context.previousPosts);
    },

    onSetteld: () => {
      console.log('키키');
      // 서버 응답 후 최신 데이터 가져오기 (이 부분에서 무효화 후 데이터 fetch)
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  }),
};

export default queryOptions;
