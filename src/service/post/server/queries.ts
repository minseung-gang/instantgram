import * as PostService from '@/service/post/server/PostService';
export const queryKeys = {
  all: ['posts'] as const,
};

const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: () => PostService.getPosts(),
  }),
};

export default queryOptions;
