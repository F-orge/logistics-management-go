import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  billingSurchargeInsertSchema,
  billingSurchargeSchema,
  billingSurchargeUpdateSchema,
} from '@/schemas/billing/surcharge';

export const paginateSurchargeContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(billingSurchargeSchema),
        sort: sortTransformer(billingSurchargeSchema),
      }),
    ),
  )
  .output(z.array(billingSurchargeSchema));

export const rangeSurchargeContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(billingSurchargeSchema),
        sort: sortTransformer(billingSurchargeSchema),
      }),
    ),
  )
  .output(z.array(billingSurchargeSchema));

export const inSurchargeContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(billingSurchargeSchema));

export const createSurchargeContract = oc
  .input(billingSurchargeInsertSchema)
  .output(billingSurchargeSchema);

export const updateSurchargeContract = oc
  .input(z.object({ id: z.uuid(), value: billingSurchargeUpdateSchema }))
  .output(billingSurchargeSchema);

export const deleteSurchargeContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
