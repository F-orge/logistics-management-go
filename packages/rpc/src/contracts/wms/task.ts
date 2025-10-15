import { oc } from "@orpc/contract";
import { TaskItemRepository, TaskRepository } from "@packages/db/repositories/wms";
import { UserSchema } from "@packages/db/schemas/auth/user";
import { PickBatchSchema } from "@packages/db/schemas/wms/pick_batch";
import { TaskSchema } from "@packages/db/schemas/wms/task";
import { TaskItemSchema } from "@packages/db/schemas/wms/task_item";
import { WarehouseSchema } from "@packages/db/schemas/wms/warehouse";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = TaskSchema.extend({
  warehouse:WarehouseSchema,
  user:UserSchema.optional(),
  pickBatch:PickBatchSchema.optional(),
  items:TaskItemSchema.array()
})

export const PaginateTaskContract = oc.input(TaskRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeTaskContract = oc.input(TaskRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyTaskContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertTaskContract = oc.input(TaskRepository.schemas.InsertSchema.extend({items:TaskItemRepository.schemas.InsertSchema.array()})).output(OutputSchema);

export const InsertManyTaskContract = oc.input(TaskRepository.schemas.InsertSchema.extend({items:TaskItemRepository.schemas.InsertSchema.array()}).array()).output(OutputSchema.array());

export const UpdateTaskContract = oc.input(z.object({id: z.uuid(), value: TaskRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveTaskContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));

export const InsertTaskItemContract = oc.input(TaskItemRepository.schemas.InsertSchema).output(TaskItemSchema);

export const InsertManyTaskItemContract = oc.input(TaskItemRepository.schemas.InsertSchema.array()).output(TaskItemSchema.array());

export const UpdateTaskItemContract = oc.input(z.object({id: z.uuid(), value: TaskItemRepository.schemas.UpdateSchema})).output(TaskItemSchema);

export const RemoveTaskItemContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
