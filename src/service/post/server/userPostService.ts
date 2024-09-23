import { useQuery } from '@tanstack/react-query';

import queryOptions from '@/service/post/server/queries';
import { SimplePost } from '@/model/post';

export function usePosts() {
  return useQuery<SimplePost[]>(queryOptions.all());
}
