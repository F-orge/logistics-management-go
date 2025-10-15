import { oc } from "@orpc/contract";
import { PickBatchRepository } from "@packages/db/repositories/wms";
import { PickBatchSchema } from "@packages/db/schemas/wms/pick_batch";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginatePickBatchContract = oc.input(PickBatchRepository.schemas.paginateOptionSchema).output(PickBatchSchema.array());

export const RangePickBatchContract = oc.input(PickBatchRepository.schemas.rangeOptionSchema).output(PickBatchSchema.array());

export const AnyPickBatchContract = oc.input(z.uuid().array()).output(PickBatchSchema.array());

export const InsertPickBatchContract = oc.input(PickBatchRepository.schemas.InsertSchema).output(PickBatchSchema);

export const InsertManyPickBatchContract = oc.input(PickBatchRepository.schemas.InsertSchema.array()).output(PickBatchSchema.array());

export const UpdatePickBatchContract = oc.input(z.object({id: z.uuid(), value: PickBatchRepository.schemas.UpdateSchema})).output(PickBatchSchema);

export const RemovePickBatchContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
