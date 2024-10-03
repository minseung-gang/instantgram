import { createContext, useContext } from 'react';
type CacheKeysValue = {
  postsKey: string | string[];
};
export const CacheKeyContext = createContext<CacheKeysValue>({
  postsKey: 'posts',
});

export const useCacheKeys = () => useContext(CacheKeyContext);
