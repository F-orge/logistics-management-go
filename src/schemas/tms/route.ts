import { z } from 'zod';

export const tmsRouteSchema = z.object({
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

export type TmsRoute = z.infer<typeof tmsRouteSchema>;

export const tmsRouteInsertSchema = tmsRouteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsRouteUpdateSchema = tmsRouteInsertSchema.partial();
