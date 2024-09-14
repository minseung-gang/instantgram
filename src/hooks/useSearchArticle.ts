import { useSearchUsers } from '@/service/user/client/useUserService';
import { useEffect } from 'react';

export const useSearchQuery = (keyword: string) => {
  const {
    data: users,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useSearchUsers(keyword);

  useEffect(() => {
    if (keyword !== '') {
      refetch();
    }
  }, [keyword]);
  return { users, isLoading, isFetching, error, refetch };
};
