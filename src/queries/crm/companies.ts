import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import {
  createCrmCompany,
  removeCrmCompany,
  selectCrmCompany,
  updateCrmCompany,
} from '@/actions/crm/companies';
import {
  crmCompanyInsertSchema,
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

export const crmCompanyCreateMutationOption = mutationOptions<
  z.infer<typeof crmCompanySchema>,
  void,
  z.infer<typeof crmCompanyInsertSchema>
>({
  mutationFn: (value) => createCrmCompany({ data: value }),
});

export const crmCompanyUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmCompanySchema>,
    void,
    z.infer<typeof crmCompanyUpdateSchema>
  >({
    mutationFn: (value) => updateCrmCompany({ data: { id, value } }),
  });

import { DeleteResult } from 'kysely';

export const crmCompanyRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmCompany({ data: { id } }),
});