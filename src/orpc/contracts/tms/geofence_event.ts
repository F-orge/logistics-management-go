import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsGeofenceEventInsertSchema,
  tmsGeofenceEventSchema,
  tmsGeofenceEventUpdateSchema,
} from '@/schemas/tms/geofence_event';

export const paginateGeofenceEventContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsGeofenceEventSchema),
        sort: sortTransformer(tmsGeofenceEventSchema),
      }),
    ),
  )
  .output(z.array(tmsGeofenceEventSchema));

export const rangeGeofenceEventContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsGeofenceEventSchema),
        sort: sortTransformer(tmsGeofenceEventSchema),
      }),
    ),
  )
  .output(z.array(tmsGeofenceEventSchema));

export const inGeofenceEventContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsGeofenceEventSchema));

export const createGeofenceEventContract = oc
  .input(tmsGeofenceEventInsertSchema)
  .output(tmsGeofenceEventSchema);

export const updateGeofenceEventContract = oc
  .input(z.object({ id: z.uuid(), value: tmsGeofenceEventUpdateSchema }))
  .output(tmsGeofenceEventSchema);

export const deleteGeofenceEventContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
