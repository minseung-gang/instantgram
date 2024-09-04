import { useQuery } from '@tanstack/react-query';
import queryOptions from './queries';

export function useUsers() {
  return useQuery(queryOptions.all());
}

export function useSearchUsers(keyword: string) {
  return useQuery(queryOptions.search(keyword));
}
