import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  dmsCustomerTrackingLinkInsertSchema,
  dmsCustomerTrackingLinkSchema,
  dmsCustomerTrackingLinkUpdateSchema,
} from '@/schemas/dms/customer_tracking_link';

export const paginateCustomerTrackingLinkContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(dmsCustomerTrackingLinkSchema),
        sort: sortTransformer(dmsCustomerTrackingLinkSchema),
      }),
    ),
  )
  .output(z.array(dmsCustomerTrackingLinkSchema));

export const rangeCustomerTrackingLinkContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(dmsCustomerTrackingLinkSchema),
        sort: sortTransformer(dmsCustomerTrackingLinkSchema),
      }),
    ),
  )
  .output(z.array(dmsCustomerTrackingLinkSchema));

export const inCustomerTrackingLinkContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(dmsCustomerTrackingLinkSchema));

export const createCustomerTrackingLinkContract = oc
  .input(dmsCustomerTrackingLinkInsertSchema)
  .output(dmsCustomerTrackingLinkSchema);

export const updateCustomerTrackingLinkContract = oc
  .input(z.object({ id: z.uuid(), value: dmsCustomerTrackingLinkUpdateSchema }))
  .output(dmsCustomerTrackingLinkSchema);

export const deleteCustomerTrackingLinkContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
