import { z } from 'zod';
import {
  TmsCurrencyEnum,
  TmsExpenseStatusEnum,
  TmsExpenseTypeEnum,
} from '@/db/types';

export const tmsExpenseSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  tripId: z
    .uuid({ message: 'Invalid UUID format for trip ID' })
    .optional()
    .nullable(),
  type: z
    .enum(TmsExpenseTypeEnum, { message: 'Invalid expense type' })
    .optional()
    .nullable(),
  status: z
    .enum(TmsExpenseStatusEnum, { message: 'Invalid expense status' })
    .optional()
    .nullable(),
  description: z.string().optional().nullable(),
  expenseDate: z.date().optional().nullable(),
  amount: z.coerce
    .number({ message: 'Amount must be a number' })
    .min(0, { error: 'Amount must be at least 0' })
    .max(1000000, { error: 'Amount must be at most 1,000,000' }),
  currency: z
    .enum(TmsCurrencyEnum, { message: 'Invalid currency type' })
    .optional()
    .nullable(),
  driverId: z
    .uuid({ message: 'Invalid UUID format for driver ID' })
    .optional()
    .nullable(),
  fuelQuantity: z.number().int().nullable().optional(),
  odometerReading: z.number().int().nullable().optional(),
  receiptUrl: z
    .string({ message: 'Receipt URL must be a string' })
    .optional()
    .nullable(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional()
    .nullable(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional()
    .nullable(),
});

export type TmsExpense = z.infer<typeof tmsExpenseSchema>;

export const tmsExpenseInsertSchema = tmsExpenseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsExpenseUpdateSchema = tmsExpenseInsertSchema.partial();
