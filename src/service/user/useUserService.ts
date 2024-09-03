import { useQuery } from '@tanstack/react-query';
import queryOptions from './queries';

export function useUsers() {
  return useQuery(queryOptions.all());
}
