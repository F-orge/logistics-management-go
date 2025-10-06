import { z } from 'zod';

export const tmsRouteSchema = z.object({
  id: z.uuid(),
  tripId: z.uuid(),
  optimizeRouteData: z.string().nullable(),
  totalDistance: z.number().nullable(),
  totalDuration: z.number().nullable(),
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
