import { oc } from "@orpc/contract";
import { TaskItemRepository } from "@packages/db/repositories/wms";
import { TaskItemSchema } from "@packages/db/schemas/wms/task_item";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateTaskItemContract = oc.input(TaskItemRepository.schemas.paginateOptionSchema).output(TaskItemSchema.array());

export const RangeTaskItemContract = oc.input(TaskItemRepository.schemas.rangeOptionSchema).output(TaskItemSchema.array());

export const AnyTaskItemContract = oc.input(z.uuid().array()).output(TaskItemSchema.array());

export const InsertTaskItemContract = oc.input(TaskItemRepository.schemas.InsertSchema).output(TaskItemSchema);

export const InsertManyTaskItemContract = oc.input(TaskItemRepository.schemas.InsertSchema.array()).output(TaskItemSchema.array());

export const UpdateTaskItemContract = oc.input(z.object({id: z.uuid(), value: TaskItemRepository.schemas.UpdateSchema})).output(TaskItemSchema);

export const RemoveTaskItemContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
