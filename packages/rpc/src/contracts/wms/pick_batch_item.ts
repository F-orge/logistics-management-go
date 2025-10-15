import { oc } from "@orpc/contract";
import { PickBatchItemRepository } from "@packages/db/repositories/wms";
import { PickBatchItemSchema } from "@packages/db/schemas/wms/pick_batch_item";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginatePickBatchItemContract = oc.input(PickBatchItemRepository.schemas.paginateOptionSchema).output(PickBatchItemSchema.array());

export const RangePickBatchItemContract = oc.input(PickBatchItemRepository.schemas.rangeOptionSchema).output(PickBatchItemSchema.array());

export const AnyPickBatchItemContract = oc.input(z.uuid().array()).output(PickBatchItemSchema.array());

export const InsertPickBatchItemContract = oc.input(PickBatchItemRepository.schemas.InsertSchema).output(PickBatchItemSchema);

export const InsertManyPickBatchItemContract = oc.input(PickBatchItemRepository.schemas.InsertSchema.array()).output(PickBatchItemSchema.array());

export const UpdatePickBatchItemContract = oc.input(z.object({id: z.uuid(), value: PickBatchItemRepository.schemas.UpdateSchema})).output(PickBatchItemSchema);

export const RemovePickBatchItemContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
