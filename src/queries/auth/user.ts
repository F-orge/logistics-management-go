import { queryOptions } from '@tanstack/react-query';
import { orpcClient } from '@/orpc/client';

export const inUser = (options: string[]) =>
  queryOptions({
    queryKey: ['auth.user', options],
    queryFn: () => orpcClient.auth.inUser(options),
    enabled: !!options,
  });
