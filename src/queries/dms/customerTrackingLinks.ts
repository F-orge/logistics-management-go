import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createDmsCustomerTrackingLink,
  removeDmsCustomerTrackingLink,
  selectDmsCustomerTrackingLink,
  updateDmsCustomerTrackingLink,
} from '@/actions/dms/customerTrackingLinks';
import {
  dmsCustomerTrackingLinkInsertSchema,
  dmsCustomerTrackingLinkSchema,
  dmsCustomerTrackingLinkUpdateSchema,
} from '@/schemas/dms/customer_tracking_link';

export const dmsCustomerTrackingLinkQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['dms.customerTrackingLinks', page, perPage],
    queryFn: () =>
      selectDmsCustomerTrackingLink({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const dmsCustomerTrackingLinkCreateMutationOption = mutationOptions<
  z.infer<typeof dmsCustomerTrackingLinkSchema>,
  void,
  z.infer<typeof dmsCustomerTrackingLinkInsertSchema>
>({
  mutationFn: (value) => createDmsCustomerTrackingLink({ data: value }),
});

export const dmsCustomerTrackingLinkUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof dmsCustomerTrackingLinkSchema>,
    void,
    z.infer<typeof dmsCustomerTrackingLinkUpdateSchema>
  >({
    mutationFn: (value) => updateDmsCustomerTrackingLink({ data: { id, value } }),
  });

export const dmsCustomerTrackingLinkRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeDmsCustomerTrackingLink({ data: { id } }),
});