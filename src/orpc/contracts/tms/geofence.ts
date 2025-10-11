import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsGeofenceInsertSchema,
  tmsGeofenceSchema,
  tmsGeofenceUpdateSchema,
} from '@/schemas/tms/geofence';

export const paginateGeofenceContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsGeofenceSchema),
        sort: sortTransformer(tmsGeofenceSchema),
      }),
    ),
  )
  .output(z.array(tmsGeofenceSchema));

export const rangeGeofenceContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsGeofenceSchema),
        sort: sortTransformer(tmsGeofenceSchema),
      }),
    ),
  )
  .output(z.array(tmsGeofenceSchema));

export const inGeofenceContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsGeofenceSchema));

export const createGeofenceContract = oc
  .input(tmsGeofenceInsertSchema)
  .output(tmsGeofenceSchema);

export const updateGeofenceContract = oc
  .input(z.object({ id: z.uuid(), value: tmsGeofenceUpdateSchema }))
  .output(tmsGeofenceSchema);

export const deleteGeofenceContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
