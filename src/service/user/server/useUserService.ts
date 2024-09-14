import { useQuery } from '@tanstack/react-query';
import queryOptions from './queries';
import { HomeUser } from '@/model/user';

export function useUsers() {
  return useQuery<HomeUser>(queryOptions.all());
}
