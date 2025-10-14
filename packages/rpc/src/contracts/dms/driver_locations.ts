import { oc } from "@orpc/contract";
import { DriverLocationRepository } from "@packages/db/repositories/dms";
import { DriverLocationSchema } from "@packages/db/schemas/dms/driver_location";
import { DriverSchema } from "@packages/db/schemas/tms/driver";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = DriverLocationSchema.extend({
  driver:DriverSchema
})

export const PaginateDriverLocationContract = oc.input(DriverLocationRepository.schemas.paginateOptionSchema).output(DriverLocationSchema.array());

export const RangeDriverLocationContract = oc.input(DriverLocationRepository.schemas.rangeOptionSchema).output(DriverLocationSchema.array());

export const AnyDriverLocationContract = oc.input(z.uuid().array()).output(DriverLocationSchema.array());

export const InsertDriverLocationContract = oc.input(DriverLocationRepository.schemas.InsertSchema).output(DriverLocationSchema);

export const InsertManyDriverLocationContract = oc.input(DriverLocationRepository.schemas.InsertSchema.array()).output(DriverLocationSchema.array());

export const UpdateDriverLocationContract = oc.input(z.object({id: z.uuid(), value: DriverLocationRepository.schemas.UpdateSchema})).output(DriverLocationSchema);

export const RemoveDriverLocationContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));