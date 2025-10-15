import { oc } from "@orpc/contract";
import { GeofenceEventRepository, GeofenceRepository } from "@packages/db/repositories/tms";
import { GeofenceSchema } from "@packages/db/schemas/tms/geofence";
import { GeofenceEventSchema } from "@packages/db/schemas/tms/geofence_event";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = GeofenceSchema.extend({
  events:GeofenceEventSchema.array()
})

export const PaginateGeofenceContract = oc.input(GeofenceRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeGeofenceContract = oc.input(GeofenceRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyGeofenceContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertGeofenceContract = oc.input(GeofenceRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyGeofenceContract = oc.input(GeofenceRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateGeofenceContract = oc.input(z.object({id: z.uuid(), value: GeofenceRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveGeofenceContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));

export const InsertGeofenceEventContract = oc.input(GeofenceEventRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyGeofenceEventContract = oc.input(GeofenceEventRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateGeofenceEventContract = oc.input(z.object({id: z.uuid(), value: GeofenceEventRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveGeofenceEventContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
