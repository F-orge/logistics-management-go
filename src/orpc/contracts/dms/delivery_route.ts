import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  dmsDeliveryRouteInsertSchema,
  dmsDeliveryRouteSchema,
  dmsDeliveryRouteUpdateSchema,
} from '@/schemas/dms/delivery_route';

export const paginateDeliveryRouteContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(dmsDeliveryRouteSchema),
        sort: sortTransformer(dmsDeliveryRouteSchema),
      }),
    ),
  )
  .output(z.array(dmsDeliveryRouteSchema));

export const rangeDeliveryRouteContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(dmsDeliveryRouteSchema),
        sort: sortTransformer(dmsDeliveryRouteSchema),
      }),
    ),
  )
  .output(z.array(dmsDeliveryRouteSchema));

export const inDeliveryRouteContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(dmsDeliveryRouteSchema));

export const createDeliveryRouteContract = oc
  .input(dmsDeliveryRouteInsertSchema)
  .output(dmsDeliveryRouteSchema);

export const updateDeliveryRouteContract = oc
  .input(z.object({ id: z.uuid(), value: dmsDeliveryRouteUpdateSchema }))
  .output(dmsDeliveryRouteSchema);

export const deleteDeliveryRouteContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
