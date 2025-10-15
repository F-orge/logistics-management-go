import { oc } from "@orpc/contract";
import { PickBatchItemRepository, PickBatchRepository } from "@packages/db/repositories/wms";
import { UserSchema } from "@packages/db/schemas/auth/user";
import { PickBatchSchema } from "@packages/db/schemas/wms/pick_batch";
import { PickBatchItemSchema } from "@packages/db/schemas/wms/pick_batch_item";
import { WarehouseSchema } from "@packages/db/schemas/wms/warehouse";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = PickBatchSchema.extend({
  warehouse:WarehouseSchema,
  assignedUser:UserSchema.optional(),
  items:PickBatchItemSchema
})

export const PaginatePickBatchContract = oc.input(PickBatchRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangePickBatchContract = oc.input(PickBatchRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyPickBatchContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertPickBatchContract = oc.input(PickBatchRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyPickBatchContract = oc.input(PickBatchRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdatePickBatchContract = oc.input(z.object({id: z.uuid(), value: PickBatchRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemovePickBatchContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));

export const InsertPickBatchItemContract = oc.input(PickBatchItemRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyPickBatchItemContract = oc.input(PickBatchItemRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdatePickBatchItemContract = oc.input(z.object({id: z.uuid(), value: PickBatchItemRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemovePickBatchItemContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
