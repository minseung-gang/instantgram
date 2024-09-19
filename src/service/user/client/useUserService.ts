import { useQuery } from '@tanstack/react-query';
import queryOptions from './queries';
import { SimplePost } from '@/model/post';

export function useSearchUsers(keyword: string) {
  return useQuery(queryOptions.search(keyword));
}
export function useUserPost(username: string, tab: string) {
  return useQuery<SimplePost[]>(queryOptions.post(username, tab));
}
