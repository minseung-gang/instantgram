import * as postService from '@/service/post/server/PostService';
export const queryKeys = {
  all: ['posts'] as const,
};

const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: async () => await postService.getPosts(),
    keepPreviousData: true,
  }),
};

export default queryOptions;
