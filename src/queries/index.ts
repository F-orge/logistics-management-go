import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { ClientResponseError, type RecordOptions } from 'pocketbase';
import { toast } from 'sonner';
import { string } from 'zod';
import { pb } from '../../lib/pocketbase';
import type { Collections } from '../../lib/pocketbase.gen';

export const listRecordsQuery = <T>(
  collection: Collections | string,
  paginateOption: { page?: number; perPage?: number },
  options?: RecordOptions,
) =>
  queryOptions({
    queryKey: [collection, paginateOption],
    queryFn: () =>
      pb
        .collection(collection)
        .getList<T>(paginateOption.page, paginateOption.perPage, options),
    enabled: !!paginateOption.page || !!paginateOption.perPage,
    placeholderData: keepPreviousData,
  });

export const viewRecordsQuery = <T>(
  collection: Collections,
  id?: string,
  options?: RecordOptions,
) =>
  queryOptions({
    queryKey: [collection, id, options],
    queryFn: ({ queryKey }) => {
      const [collection, id, options] = queryKey;
      return pb
        .collection(collection as string)
        .getOne<T>(id as string, options as RecordOptions);
    },
    enabled: !!id,
  });

export const useMutateCreateRecord = <T>(
  collection: Collections,
  options?: RecordOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload?:
        | {
            [key: string]: unknown;
          }
        | FormData,
    ) => pb.collection(collection).create<T>(payload, options),
    onSuccess: () => {
      toast(`Collection \`${collection.toString()}\` updated successfully`);
      queryClient.invalidateQueries({ queryKey: [collection] });
    },
    onError: (err) => {
      if (err instanceof ClientResponseError) {
        toast(err.status, { description: err.message });
        return;
      }
      toast(err.message);
    },
  });
};

export const useMutateUpdateRecord = <T>(
  collection: Collections,
  id?: string,
  options?: RecordOptions,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      payload?:
        | {
            [key: string]: unknown;
          }
        | FormData,
    ) => pb.collection(collection).update<T>(id || '', payload, options),
    onSuccess: () => {
      toast(`Collection \`${collection.toString()}\` updated successfully`);
      queryClient.invalidateQueries({ queryKey: [collection] });
    },
    onError: (err) => {
      if (err instanceof ClientResponseError) {
        toast(err.status, { description: err.message });
        return;
      }
      toast(err.message);
    },
  });
};

export const useMutateRemoveRecord = (
  collection: Collections,
  id?: string,
  options?: RecordOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => pb.collection(collection).delete(id || '', options),
    onSuccess: () => {
      toast(`Collection \`${collection.toString()}\` removed successfully`);
      queryClient.invalidateQueries({ queryKey: [collection] });
    },
    onError: (err) => {
      if (err instanceof ClientResponseError) {
        toast(err.status, { description: err.message });
        return;
      }
      toast(err.message);
    },
  });
};
