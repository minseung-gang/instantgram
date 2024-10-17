import { HomeUser } from '@/model/user';
import * as userService from '@/service/user/client/UserService';
import { QueryClient } from '@tanstack/react-query';

const queryKeys = {
  search: (keyword: string) => ['user', keyword] as const,
  post: (username: string, tab: string) => ['userPost', username, tab] as const,
};

const queryOptions = {
  search: (keyword: string) => ({
    queryKey: queryKeys.search(keyword),
    queryFn: async () => await userService.serachUser(keyword),
    enabled: !!keyword,
    staleTime: 0, // 데이터가 즉시 구식으로 간주됨
    cacheTime: 0, // 캐싱된 데이터가 즉시 사라짐
    refetchOnMount: true,
  }),
  post: (username: string, tab: string) => ({
    queryKey: queryKeys.post(username, tab),
    queryFn: async () => await userService.getUserPost(username, tab),
    cacheTime: 0,
    staleTime: 0,
    placeholderData: [],
  }),
  bookmark: (queryClient: QueryClient, postId: string) => ({
    mutationFn: async (bookmark: boolean) =>
      await userService.updateBookmark(postId, bookmark),

    onMutate: async (bookmark: boolean) =>
      await userService.OptimisticBookmark(queryClient, postId, bookmark),

    onError: (context: { previousUser: HomeUser | undefined }) => {
      // 오류 발생 시 원래 상태로 복구
      queryClient.setQueryData(['users'], context.previousUser);
    },

    onSettled: () => {
      // 서버 응답 후 최신 데이터 가져오기 (이 부분에서 무효화 후 데이터 fetch)

      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  }),
  follow: (queryClient: QueryClient, targetId: string) => ({
    mutationFn: async (isFollow: boolean) => {
      return await userService.updateFollow(targetId, isFollow);
    },

    onError: (context: { previousUser: HomeUser | undefined }) => {
      // 오류 발생 시 원래 상태로 복구

      queryClient.setQueryData(['users'], context.previousUser);
    },
  }),
};

export default queryOptions;
