import { HomeUser } from '@/model/user';
import * as userService from '@/service/user/client/UserService';

const queryKeys = {
  search: (keyword: string) => ['user', keyword] as const,
  post: () => ['userPost'] as const,
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
    queryKey: ['userPost', username, tab],
    queryFn: async () => await userService.getUserPost(username, tab),
  }),
};

export default queryOptions;
