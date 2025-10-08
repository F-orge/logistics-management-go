import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  crmCaseInsertSchema,
  crmCaseSchema,
  crmCaseUpdateSchema,
} from '@/schemas/crm/cases';

export const paginateCaseContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(crmCaseSchema),
        sort: sortTransformer(crmCaseSchema),
      }),
    ),
  )
  .output(z.array(crmCaseSchema));

export const rangeCaseContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(crmCaseSchema),
        sort: sortTransformer(crmCaseSchema),
      }),
    ),
  )
  .output(z.array(crmCaseSchema));

export const inCaseContract = oc
  .input(z.array(z.uuid()))
  .output(z.array(crmCaseSchema));

export const createCaseContract = oc
  .input(crmCaseInsertSchema)
  .output(crmCaseSchema);

export const updateCaseContract = oc
  .input(z.object({ id: z.uuid(), value: crmCaseUpdateSchema }))
  .output(crmCaseSchema);

export const deleteCaseContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
