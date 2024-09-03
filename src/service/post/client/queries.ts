import * as PostService from '@/service/post/client/PostService';
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
};

export default queryOptions;
