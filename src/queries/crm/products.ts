import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createCrmProduct,
  removeCrmProduct,
  selectCrmProduct,
  updateCrmProduct,
} from '@/actions/crm/products';
import {
  crmProductInsertSchema,
  crmProductSchema,
  crmProductUpdateSchema,
} from '@/schemas/crm/products';

export const crmProductQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.products', page, perPage],
    queryFn: () =>
      selectCrmProduct({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmProductCreateMutationOption = mutationOptions<
  z.infer<typeof crmProductSchema>,
  void,
  z.infer<typeof crmProductInsertSchema>
>({
  mutationFn: (value) => createCrmProduct({ data: value }),
});

export const crmProductUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmProductSchema>,
    void,
    z.infer<typeof crmProductUpdateSchema>
  >({
    mutationFn: (value) => updateCrmProduct({ data: { id, value } }),
  });

export const crmProductRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmProduct({ data: { id } }),
});