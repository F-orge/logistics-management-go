import { oc } from "@orpc/contract";
import { ReturnItemRepository } from "@packages/db/repositories/wms";
import { ReturnItemSchema } from "@packages/db/schemas/wms/return_item";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateReturnItemContract = oc.input(ReturnItemRepository.schemas.paginateOptionSchema).output(ReturnItemSchema.array());

export const RangeReturnItemContract = oc.input(ReturnItemRepository.schemas.rangeOptionSchema).output(ReturnItemSchema.array());

export const AnyReturnItemContract = oc.input(z.uuid().array()).output(ReturnItemSchema.array());

export const InsertReturnItemContract = oc.input(ReturnItemRepository.schemas.InsertSchema).output(ReturnItemSchema);

export const InsertManyReturnItemContract = oc.input(ReturnItemRepository.schemas.InsertSchema.array()).output(ReturnItemSchema.array());

export const UpdateReturnItemContract = oc.input(z.object({id: z.uuid(), value: ReturnItemRepository.schemas.UpdateSchema})).output(ReturnItemSchema);

export const RemoveReturnItemContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
