import { z } from 'zod';

export const tmsRouteSchema = z.object({
  id: z.uuid(),
  name: z
    .string()
    .min(1, { error: 'Route name is required' })
    .max(255, { error: 'Route name must be at most 255 characters' }),
  origin: z
    .string()
    .min(1, { error: 'Origin is required' })
    .max(255, { error: 'Origin must be at most 255 characters' }),
  destination: z
    .string()
    .min(1, { error: 'Destination is required' })
    .max(255, { error: 'Destination must be at most 255 characters' }),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsRoute = z.infer<typeof tmsRouteSchema>;

export const tmsRouteInsertSchema = tmsRouteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsRouteUpdateSchema = tmsRouteInsertSchema.partial();
