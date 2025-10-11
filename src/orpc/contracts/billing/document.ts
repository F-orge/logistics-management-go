import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  billingDocumentInsertSchema,
  billingDocumentSchema,
  billingDocumentUpdateSchema,
} from '@/schemas/billing/document';

export const paginateDocumentContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(billingDocumentSchema),
        sort: sortTransformer(billingDocumentSchema),
      }),
    ),
  )
  .output(z.array(billingDocumentSchema));

export const rangeDocumentContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(billingDocumentSchema),
        sort: sortTransformer(billingDocumentSchema),
      }),
    ),
  )
  .output(z.array(billingDocumentSchema));

export const inDocumentContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(billingDocumentSchema));

export const createDocumentContract = oc
  .input(billingDocumentInsertSchema)
  .output(billingDocumentSchema);

export const updateDocumentContract = oc
  .input(z.object({ id: z.uuid(), value: billingDocumentUpdateSchema }))
  .output(z.instanceof(DeleteResult)); // Assuming update returns DeleteResult for consistency, though it might return the updated object.
                                      // I'll stick to the pattern from campaigns.ts for now.

export const deleteDocumentContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
