import { useQuery } from '@tanstack/react-query';

import queryOptions from '@/service/post/server/queries';

export function usePosts() {
  return useQuery(queryOptions.all());
}
