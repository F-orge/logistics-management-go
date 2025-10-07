import { z } from 'zod';
import { TmsExpenseStatusEnum, TmsExpenseTypeEnum } from '@/db/types';

export const tmsExpenseSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  tripId: z.uuid({ message: 'Invalid UUID format for trip ID' }).optional(),
  type: z
    .enum(TmsExpenseTypeEnum, { message: 'Invalid expense type' })
    .optional(),
  status: z
    .enum(TmsExpenseStatusEnum, { message: 'Invalid expense status' })
    .optional(),
  amount: z.coerce
    .number({ message: 'Amount must be a number' })
    .min(0, { error: 'Amount must be at least 0' })
    .max(1000000, { error: 'Amount must be at most 1,000,000' }),
  notes: z
    .string({ message: 'Notes must be a string' })
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type TmsExpense = z.infer<typeof tmsExpenseSchema>;

export const tmsExpenseInsertSchema = tmsExpenseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsExpenseUpdateSchema = tmsExpenseInsertSchema.partial();
