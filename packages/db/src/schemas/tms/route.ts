import { z } from 'zod';

export const RouteSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  tripId: z.uuid({ message: 'Invalid UUID format for trip ID' }),
  optimizedRouteData: z.string().nullable().optional(),
  totalDistance: z.coerce.number().nullable().optional(),
  totalDuration: z.coerce.number().nullable().optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional()
    .nullable(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional()
    .nullable(),
});

export type TmsRoute = z.infer<typeof RouteSchema>;

export const RouteInsertSchema = RouteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const RouteUpdateSchema = RouteInsertSchema.partial();
