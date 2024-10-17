import * as userService from '@/service/user/server/UserService';

const queryKeys = {
  all: ['users'] as const,
  search: (keyword: string) => ['user', keyword] as const,
};

const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: async () => await userService.getUser(),
    keepPreviousData: true,
  }),
};

export default queryOptions;
