import { z } from 'zod';

export const DriverLocationSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  driverId: z.uuid({ message: 'Invalid UUID format for driver ID' }),
  latitude: z.coerce
    .number({ message: 'Latitude must be a number' })
    .min(-90, { error: 'Latitude must be at least -90' })
    .max(90, { error: 'Latitude must be at most 90' }),
  longitude: z.coerce
    .number({ message: 'Longitude must be a number' })
    .min(-180, { error: 'Longitude must be at least -180' })
    .max(180, { error: 'Longitude must be at most 180' }),
  timestamp: z
    .date({ message: 'Invalid date format for timestamp' })
    .optional()
    .nullable(),
  accuracy: z.coerce
    .number({ message: 'Accuracy must be a number' })
    .min(0, { message: 'Accuracy must be at least 0' })
    .optional()
    .nullable(),
  altitude: z.coerce
    .number({ message: 'Altitude must be a number' })
    .optional()
    .nullable(),
  heading: z.coerce
    .number({ message: 'Heading must be a number' })
    .min(0, { message: 'Heading must be at least 0' })
    .max(359, { message: 'Heading must be at most 359' })
    .optional()
    .nullable(),
  speedKmh: z.coerce
    .number({ message: 'Speed in Kmh must be a number' })
    .min(0, { message: 'Speed in Kmh must be at least 0' })
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

