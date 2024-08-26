import { DetailUser } from '@/model/user';
import * as PostService from '@/service/query/post/PostService';
import { QueryClient } from '@tanstack/react-query';

export const queryKeys = {
  all: ['posts'] as const,

  detail: (postId: number) => [...queryKeys.all, postId] as const,

  detailComments: (postId: number) =>
    [...queryKeys.detail(postId), 'comments'] as const,

  detailComment: ({
    postId,
    commentId,
  }: {
    postId: number;
    commentId: number;
  }) => [...queryKeys.detailComments(postId), commentId] as const,
};

const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: () => PostService.getPosts(),
  }),

  detail: (postId: number) => ({
    queryKey: queryKeys.detail(postId),

    queryFn: () => PostService.getPost(postId),
  }),

  comments: (postId: number) => ({
    queryKey: queryKeys.detailComments(postId),

    queryFn: () => PostService.getComments(postId),
  }),

  comment: ({ postId, commentId }: { postId: number; commentId: number }) => ({
    queryKey: queryKeys.detailComment({ postId, commentId }),

    queryFn: () => PostService.getComment({ postId, commentId }),
  }),
};

export default queryOptions;
