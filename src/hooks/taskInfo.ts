import { useQuery } from '@tanstack/react-query';
import { pb } from '../../lib/pocketbase';
import type {
  DepartmentsRecord,
  OrdersRecord,
  ShipmentsRecord,
  TasksResponse,
  UsersRecord,
} from '../../lib/pocketbase.gen';

export const useTasks = () => {
  return useQuery({
    queryKey: ['useTasks'],
    queryFn: () =>
      pb.collection('tasks').getFullList<
        TasksResponse<{
          assignees: UsersRecord[];
          assigner: UsersRecord;
          department?: DepartmentsRecord;
          order_ref?: OrdersRecord;
          related_shipment?: ShipmentsRecord;
        }>
      >({
        expand: 'assignees,assigner,department,order_ref,related_shipment',
      }),
  });
};
