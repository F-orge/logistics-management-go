import type { RecordListOptions, RecordModel } from "pocketbase";
import React, { useCallback } from "react";
import { Collections } from "@/lib/pb.types";
import { usePocketBase } from "./context";

/**
 * Hook for creating records in a PocketBase collection
 */
export function useCreateRecord<T extends RecordModel>(
  collection: Collections
) {
  const { pb } = usePocketBase();

  const create = useCallback(
    async (data: Omit<T, "id" | "created" | "updated">) => {
      const record = await pb.collection(collection).create<T>(data);
      return record;
    },
    [pb, collection]
  );

  return { create };
}

/**
 * Hook for updating records in a PocketBase collection
 */
export function useUpdateRecord<T extends RecordModel>(
  collection: Collections
) {
  const { pb } = usePocketBase();

  const update = useCallback(
    async (
      id: string,
      data: Partial<Omit<T, "id" | "created" | "updated">>
    ) => {
      const record = await pb.collection(collection).update<T>(id, data);
      return record;
    },
    [pb, collection]
  );

  return { update };
}

/**
 * Hook for deleting records from a PocketBase collection
 */
export function useDeleteRecord(collection: Collections) {
  const { pb } = usePocketBase();

  const deleteRecord = useCallback(
    async (id: string) => {
      await pb.collection(collection).delete(id);
    },
    [pb, collection]
  );

  return { deleteRecord };
}

/**
 * Hook for fetching a single record from a PocketBase collection
 */
export function useFetchRecord<T extends RecordModel>(
  collection: Collections,
  id: string | null,
  options?: { queryParams?: Record<string, unknown> }
) {
  const { pb } = usePocketBase();
  const [data, setData] = React.useState<T | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (!id) {
      setData(null);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const record = await pb
          .collection(collection)
          .getOne<T>(id, options?.queryParams);
        setData(record);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pb, collection, id, options?.queryParams]);

  return { data, isLoading, error };
}

/**
 * Hook for fetching multiple records from a PocketBase collection
 */
export function useFetchRecords<T extends RecordModel>(
  collection: Collections,
  options?: RecordListOptions
) {
  const { pb } = usePocketBase();
  const [data, setData] = React.useState<T[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const refetch = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const records = await pb
        .collection(collection)
        .getList<T>(options?.page ?? 1, options?.perPage ?? 50, {
          ...options,
        });
      setData(records.items);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [pb, collection, options?.queryParams, options?.skip, options?.limit]);

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, error, refetch };
}

/**
 * Hook for subscribing to real-time changes in a PocketBase collection
 */
export function useSubscribeCollection<T extends RecordModel>(
  collection: string,
  onMessage: (data: { action: string; record: T }) => void
) {
  const { pb } = usePocketBase();

  React.useEffect(() => {
    const unsubscribe = pb.collection(collection).subscribe("*", (event) => {
      onMessage({
        action: event.action,
        record: event.record as T,
      });
    });

    return () => {
      unsubscribe.then((unsub) => unsub?.());
    };
  }, [pb, collection, onMessage]);
}

/**
 * Hook for subscribing to real-time changes of a specific record
 */
export function useSubscribeRecord<T extends RecordModel>(
  collection: string,
  id: string,
  onMessage: (data: { action: string; record: T }) => void
) {
  const { pb } = usePocketBase();

  React.useEffect(() => {
    const unsubscribe = pb.collection(collection).subscribe<T>(id, (event) => {
      onMessage({
        action: event.action,
        record: event.record,
      });
    });

    return () => {
      unsubscribe.then((unsub) => unsub?.());
    };
  }, [pb, collection, id, onMessage]);
}
