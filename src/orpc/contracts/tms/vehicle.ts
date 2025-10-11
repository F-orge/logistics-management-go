import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsVehicleInsertSchema,
  tmsVehicleSchema,
  tmsVehicleUpdateSchema,
} from '@/schemas/tms/vehicle';

export const paginateVehicleContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsVehicleSchema),
        sort: sortTransformer(tmsVehicleSchema),
      }),
    ),
  )
  .output(z.array(tmsVehicleSchema));

export const rangeVehicleContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsVehicleSchema),
        sort: sortTransformer(tmsVehicleSchema),
      }),
    ),
  )
  .output(z.array(tmsVehicleSchema));

export const inVehicleContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsVehicleSchema));

export const createVehicleContract = oc
  .input(tmsVehicleInsertSchema)
  .output(tmsVehicleSchema);

export const updateVehicleContract = oc
  .input(z.object({ id: z.uuid(), value: tmsVehicleUpdateSchema }))
  .output(tmsVehicleSchema);

export const deleteVehicleContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
