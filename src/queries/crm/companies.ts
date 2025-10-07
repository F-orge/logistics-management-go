import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { selectCrmCompany, updateCrmCompany } from '@/actions/crm/companies';
import {
  crmCompanySchema,
  crmCompanyUpdateSchema,
} from '@/schemas/crm/companies';

export const crmCompanyQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.companies', page, perPage],
    queryFn: () =>
      selectCrmCompany({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmCompanyUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmCompanySchema>,
    void,
    z.infer<typeof crmCompanyUpdateSchema>
  >({
    mutationFn: (value) => updateCrmCompany({ data: { id, value } }),
  });
