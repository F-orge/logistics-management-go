/**
 * Generated Zod schema for lms_packages (from src/pocketbase/types.ts)
 */
import { z } from 'zod';
import { LmsPackagesTypeOptions } from '../../types';

export const packagesSchema = z.object({
  created: z.iso.datetime().optional(),
  declared_value: z.number().optional(),
  description: z.string().optional(),
  height: z.number().optional(),
  id: z.string(),
  length: z.number().optional(),
  package_number: z.string(),
  shipment: z.string(),
  type: z.enum(LmsPackagesTypeOptions),
  updated: z.iso.datetime().optional(),
  weight: z.number().optional(),
});

export type Packages = z.infer<typeof packagesSchema>;
