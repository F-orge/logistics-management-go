import { useQuery } from '@tanstack/react-query';
import { pb } from '../../lib/pocketbase';
import type {
  CompaniesRecord,
  DepartmentsRecord,
  UsersResponse,
} from '../../lib/pocketbase.gen';

export const useUserRecord = () => {
  return useQuery({
    queryKey: ['userRecord'],
    queryFn: () =>
      pb.collection('users').getOne<
        UsersResponse<{
          department?: DepartmentsRecord;
          company?: CompaniesRecord;
        }>
      >(pb.authStore.record?.id || '', { expand: 'department,company' }),
  });
};
