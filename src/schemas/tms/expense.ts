import { z } from 'zod';
import { TmsExpenseStatusEnum, TmsExpenseTypeEnum } from '@/db/types';

export const tmsExpenseSchema = z.object({
  id: z.string(),
  tripId: z.uuid().nullable(),
  type: z.enum(TmsExpenseTypeEnum).nullable(),
  status: z.enum(TmsExpenseStatusEnum).nullable(),
  amount: z.coerce.number(),
  notes: z.string().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsExpense = z.infer<typeof tmsExpenseSchema>;

export const tmsExpenseInsertSchema = tmsExpenseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsExpenseUpdateSchema = tmsExpenseInsertSchema.partial();
