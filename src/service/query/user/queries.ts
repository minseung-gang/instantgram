import { DetailUser } from '@/model/user';
import * as UserService from '@/service/query/user/UserService';

const queryKeys = {
  all: ['user'] as const,
};

const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: async () => await UserService.getUser(),
  }),
};

export default queryOptions;
