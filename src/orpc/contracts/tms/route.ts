import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsRouteInsertSchema,
  tmsRouteSchema,
  tmsRouteUpdateSchema,
} from '@/schemas/tms/route';

export const paginateRouteContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsRouteSchema),
        sort: sortTransformer(tmsRouteSchema),
      }),
    ),
  )
  .output(z.array(tmsRouteSchema));

export const rangeRouteContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsRouteSchema),
        sort: sortTransformer(tmsRouteSchema),
      }),
    ),
  )
  .output(z.array(tmsRouteSchema));

export const inRouteContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsRouteSchema));

export const createRouteContract = oc
  .input(tmsRouteInsertSchema)
  .output(tmsRouteSchema);

export const updateRouteContract = oc
  .input(z.object({ id: z.uuid(), value: tmsRouteUpdateSchema }))
  .output(tmsRouteSchema);

export const deleteRouteContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
