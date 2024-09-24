import { SimplePost } from '@/model/post';
import * as PostService from '@/service/post/client/PostService';
import { QueryClient } from '@tanstack/react-query';

export const queryKeys = {
  all: ['posts'] as const,

  detail: (postId: string) => [postId] as const,

  detailComments: (postId: string) =>
    [...queryKeys.detail(postId), 'comments'] as const,

  detailComment: ({
    postId,
    commentId,
  }: {
    postId: string;
    commentId: number;
  }) => [...queryKeys.detailComments(postId), commentId] as const,
};

const queryOptions = {
  detail: (postId: string) => ({
    queryKey: queryKeys.detail(postId),
    queryFn: () => PostService.getDetailPost(postId),
  }),

  comments: (postId: string) => ({
    queryKey: queryKeys.detailComments(postId),
    queryFn: () => PostService.getComments(postId),
  }),

  comment: ({ postId, commentId }: { postId: string; commentId: number }) => ({
    queryKey: queryKeys.detailComment({ postId, commentId }),

    queryFn: () => PostService.getComment({ postId, commentId }),
  }),

  like: (queryClient: QueryClient, postId: string, currentUser: string) => ({
    mutationFn: async (liked: boolean) =>
      await PostService.updateLike(liked, postId),

    onMutate: async (liked: boolean) =>
      await PostService.OptimisticLike(queryClient, postId, currentUser, liked),

    onError: (context: { previousPosts: SimplePost[] | undefined }) => {
      // 오류 발생 시 원래 상태로 복구
      queryClient.setQueryData(['posts'], context.previousPosts);
    },

    onSettled: () => {
      // 서버 응답 후 최신 데이터 가져오기 (이 부분에서 무효화 후 데이터 fetch)
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  }),
};

export default queryOptions;
