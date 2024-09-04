import { DetailUser } from '@/model/user';
import * as UserService from '@/service/user/UserService';

const queryKeys = {
  all: ['users'] as const,
  search: ['user'] as const,
};

const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: async () => await UserService.getUser(),
  }),
  search: (keyword: string) => ({
    queryKey: queryKeys.search,
    queryFn: async () => await UserService.serachUser(keyword),
  }),
};

export default queryOptions;
