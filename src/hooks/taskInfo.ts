import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { pb } from '../../lib/pocketbase';
import type {
  DepartmentsRecord,
  OrdersRecord,
  ShipmentsRecord,
  TasksResponse,
  UsersRecord,
} from '../../lib/pocketbase.gen';
import * as React from 'react';

export const useTasks = () => {
  const [page, setPage] = React.useState<number>(1);
  const [filterQuery, setFilterQuery] = React.useState<string>('');

  return {
    ...useQuery({
      queryKey: ['useTasks', page, filterQuery],
      queryFn: () =>
        pb.collection('tasks').getList<
          TasksResponse<{
            assignees: UsersRecord[];
            assigner: UsersRecord;
            department?: DepartmentsRecord;
            order_ref?: OrdersRecord;
            related_shipment?: ShipmentsRecord;
          }>
        >(page, 10, {
          expand: 'assignees,assigner,department,order_ref,related_shipment',
          filter: filterQuery,
        }),
      placeholderData: keepPreviousData,
    }),
    paginateControls: {
      page,
      setPage,
    },
    filterControl: {
      filterQuery,
      setFilterQuery,
    },
  };
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: ['useTask', id],
    queryFn: () =>
      pb.collection('tasks').getOne<
        TasksResponse<{
          assignees: UsersRecord[];
          assigner: UsersRecord;
          department?: DepartmentsRecord;
          order_ref?: OrdersRecord;
          related_shipment?: ShipmentsRecord;
        }>
      >(id, {
        expand: 'assignees,assigner,department,order_ref,related_shipment',
      }),
  });
};

export const useTaskKPI = () => {
  return useQuery({
    queryKey: ['useTaskKPI'],
    queryFn: () => pb.collection('tasksKPI').getOne('1'),
  });
};
