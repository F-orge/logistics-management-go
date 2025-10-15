import { oc } from "@orpc/contract";
import { TaskRepository } from "@packages/db/repositories/wms";
import { TaskSchema } from "@packages/db/schemas/wms/task";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateTaskContract = oc.input(TaskRepository.schemas.paginateOptionSchema).output(TaskSchema.array());

export const RangeTaskContract = oc.input(TaskRepository.schemas.rangeOptionSchema).output(TaskSchema.array());

export const AnyTaskContract = oc.input(z.uuid().array()).output(TaskSchema.array());

export const InsertTaskContract = oc.input(TaskRepository.schemas.InsertSchema).output(TaskSchema);

export const InsertManyTaskContract = oc.input(TaskRepository.schemas.InsertSchema.array()).output(TaskSchema.array());

export const UpdateTaskContract = oc.input(z.object({id: z.uuid(), value: TaskRepository.schemas.UpdateSchema})).output(TaskSchema);

export const RemoveTaskContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
