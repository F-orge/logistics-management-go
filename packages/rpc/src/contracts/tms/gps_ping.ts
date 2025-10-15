import { oc } from "@orpc/contract";
import { GpsPingRepository } from "@packages/db/repositories/tms";
import { GpsPingSchema } from "@packages/db/schemas/tms/gps_ping";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateGpsPingContract = oc.input(GpsPingRepository.schemas.paginateOptionSchema).output(GpsPingSchema.array());

export const RangeGpsPingContract = oc.input(GpsPingRepository.schemas.rangeOptionSchema).output(GpsPingSchema.array());

export const AnyGpsPingContract = oc.input(z.uuid().array()).output(GpsPingSchema.array());

export const InsertGpsPingContract = oc.input(GpsPingRepository.schemas.InsertSchema).output(GpsPingSchema);

export const InsertManyGpsPingContract = oc.input(GpsPingRepository.schemas.InsertSchema.array()).output(GpsPingSchema.array());

export const UpdateGpsPingContract = oc.input(z.object({id: z.uuid(), value: GpsPingRepository.schemas.UpdateSchema})).output(GpsPingSchema);

export const RemoveGpsPingContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
