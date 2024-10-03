import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import queryOptions from './queries';
import { SimplePost } from '@/model/post';

export function useSearchUsers(keyword: string) {
  return useQuery(queryOptions.search(keyword));
}
export function useUserPost(username: string, tab: string) {
  return useQuery<SimplePost[]>(queryOptions.post(username, tab));
}

export function useBookMark(
  queryClient: QueryClient,
  postId: string,
  username: string,
) {
  return useMutation(queryOptions.bookmark(queryClient, postId, username));
}

export function useFollow(targetId: string, username: string) {
  const queryClient = useQueryClient();
  return useMutation(queryOptions.follow(queryClient, targetId, username));
}
