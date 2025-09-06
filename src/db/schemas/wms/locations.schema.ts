// Zod schema for wms_locations
import { createSelectSchema } from 'drizzle-zod';
import { locations } from './locations.sql';

export const locationSchema = createSelectSchema(locations);

export const insertLocationSchema = locationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateLocationSchema = insertLocationSchema.partial();
