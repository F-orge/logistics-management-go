import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createWmsReturn,
  removeWmsReturn,
  selectWmsReturns,
  updateWmsReturn,
} from '@/actions/wms/returns';
import {
  wmsReturnInsertSchema,
  wmsReturnSchema,
  wmsReturnUpdateSchema,
} from '@/schemas/wms/return';

export const wmsReturnQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.returns', page, perPage],
    queryFn: () =>
      selectWmsReturns({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsReturnCreateMutationOption = mutationOptions<
  z.infer<typeof wmsReturnSchema>,
  void,
  z.infer<typeof wmsReturnInsertSchema>
>({
  mutationFn: (value) => createWmsReturn({ data: value }),
});

export const wmsReturnUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsReturnSchema>,
    void,
    z.infer<typeof wmsReturnUpdateSchema>
  >({
    mutationFn: (value) => updateWmsReturn({ data: { id, value } }),
  });

export const wmsReturnRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsReturn({ data: { id } }),
});
