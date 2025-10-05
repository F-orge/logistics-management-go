import { z } from 'zod';
import { TmsExpenseStatusEnum, TmsExpenseTypeEnum } from '@/db/types';

export const tmsExpenseSchema = z.object({
  id: z.uuid(),
  tripId: z.uuid().nullable(),
  type: z.enum(TmsExpenseTypeEnum).nullable(),
  status: z.enum(TmsExpenseStatusEnum).nullable(),
  amount: z.coerce
    .number()
    .min(0, { error: 'Amount must be at least 0' })
    .max(1000000, { error: 'Amount must be at most 1,000,000' }),
  notes: z
    .string()
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .nullable(),
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
