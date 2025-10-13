import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  crmContactInsertSchema,
  crmContactSchema,
  crmContactUpdateSchema,
} from '@/schemas/crm/contacts';

export const paginateContactContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(crmContactSchema),
        sort: sortTransformer(crmContactSchema),
      }),
    ),
  )
  .output(z.array(crmContactSchema));

export const rangeContactContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(crmContactSchema),
        sort: sortTransformer(crmContactSchema),
      }),
    ),
  )
  .output(z.array(crmContactSchema));

export const inContactContract = oc
  .input(z.array(z.uuid()).nonempty().nonempty())
  .output(z.array(crmContactSchema));

export const createContactContract = oc
  .input(crmContactInsertSchema)
  .output(crmContactSchema);

export const updateContactContract = oc
  .input(z.object({ id: z.uuid(), value: crmContactUpdateSchema }))
  .output(crmContactSchema);

export const deleteContactContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
