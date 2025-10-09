import { z } from 'zod';
import { WmsLocationTypeEnum } from '@/db/types';

export const wmsPutawayRuleSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  productId: z.uuid({ message: 'Invalid UUID format for product ID' }),
  warehouseId: z.uuid({ message: 'Invalid UUID format for warehouse ID' }),
  priority: z
    .number({ message: 'Priority must be a number' })
    .int({ message: 'Priority must be an integer' })
    .min(0, { error: 'Priority must be at least 0' })
    .max(1000, { error: 'Priority must be at most 1000' }),
  clientId: z
    .uuid({ message: 'Invalid UUID format for client ID' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  isActive: z
    .boolean({ message: 'Is active must be a boolean' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  locationType: z
    .enum(WmsLocationTypeEnum, { message: 'Invalid location type' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  maxQuantity: z
    .number({ message: 'Maximum quantity must be a number' })
    .int({ message: 'Maximum quantity must be an integer' })
    .min(0, { error: 'Maximum quantity must be at least 0' })
    .max(1000000, { error: 'Maximum quantity must be at most 1,000,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  minQuantity: z
    .number({ message: 'Minimum quantity must be a number' })
    .int({ message: 'Minimum quantity must be an integer' })
    .min(0, { error: 'Minimum quantity must be at least 0' })
    .max(1000000, { error: 'Minimum quantity must be at most 1,000,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  preferredLocationId: z
    .uuid({ message: 'Invalid UUID format for preferred location ID' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  requiresHazmatApproval: z
    .boolean({ message: 'Requires hazmat approval must be a boolean' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  requiresTemperatureControl: z
    .boolean({ message: 'Requires temperature control must be a boolean' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  volumeThreshold: z
    .number({ message: 'Volume threshold must be a number' })
    .min(0, { error: 'Volume threshold must be at least 0' })
    .max(100000, { error: 'Volume threshold must be at most 100,000' })
    .optional()
    .nullable()
    .optional()
    .nullable(),
  weightThreshold: z
    .number({ message: 'Weight threshold must be a number' })
    .min(0, { error: 'Weight threshold must be at least 0' })
    .max(100000, { error: 'Weight threshold must be at most 100,000' })
    .optional()
    .nullable()
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

export type WmsPutawayRule = z.infer<typeof wmsPutawayRuleSchema>;

export const wmsPutawayRuleInsertSchema = wmsPutawayRuleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const wmsPutawayRuleUpdateSchema = wmsPutawayRuleInsertSchema.partial();
