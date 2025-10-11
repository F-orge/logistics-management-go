import { z } from 'zod';

export const tmsRouteSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  tripId: z.uuid({ message: 'Invalid UUID format for trip ID' }),
  optimizedRouteData: z
    .string({ message: 'Optimized route data must be a string' })
    .min(1, { error: 'Optimized route data cannot be empty' })
    .max(4096, {
      error: 'Optimized route data must be at most 4096 characters',
    })
    .optional()
    .nullable(),
  totalDistance: z
    .number({ message: 'Total distance must be a number' })
    .min(0, { message: 'Total distance must be at least 0' })
    .optional()
    .nullable(),
  totalDuration: z
    .number({ message: 'Total duration must be a number' })
    .min(0, { message: 'Total duration must be at least 0' })
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

export type TmsRoute = z.infer<typeof tmsRouteSchema>;

export const tmsRouteInsertSchema = tmsRouteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsRouteUpdateSchema = tmsRouteInsertSchema.partial();
