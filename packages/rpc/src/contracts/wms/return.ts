import { oc } from "@orpc/contract";
import { ReturnRepository } from "@packages/db/repositories/wms";
import { ReturnSchema } from "@packages/db/schemas/wms/return";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateReturnContract = oc.input(ReturnRepository.schemas.paginateOptionSchema).output(ReturnSchema.array());

export const RangeReturnContract = oc.input(ReturnRepository.schemas.rangeOptionSchema).output(ReturnSchema.array());

export const AnyReturnContract = oc.input(z.uuid().array()).output(ReturnSchema.array());

export const InsertReturnContract = oc.input(ReturnRepository.schemas.InsertSchema).output(ReturnSchema);

export const InsertManyReturnContract = oc.input(ReturnRepository.schemas.InsertSchema.array()).output(ReturnSchema.array());

export const UpdateReturnContract = oc.input(z.object({id: z.uuid(), value: ReturnRepository.schemas.UpdateSchema})).output(ReturnSchema);

export const RemoveReturnContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
