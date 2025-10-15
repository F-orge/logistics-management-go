import { oc } from "@orpc/contract";
import { InventoryBatchRepository } from "@packages/db/repositories/wms";
import { InventoryBatchSchema } from "@packages/db/schemas/wms/inventory_batch";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateInventoryBatchContract = oc.input(InventoryBatchRepository.schemas.paginateOptionSchema).output(InventoryBatchSchema.array());

export const RangeInventoryBatchContract = oc.input(InventoryBatchRepository.schemas.rangeOptionSchema).output(InventoryBatchSchema.array());

export const AnyInventoryBatchContract = oc.input(z.uuid().array()).output(InventoryBatchSchema.array());

export const InsertInventoryBatchContract = oc.input(InventoryBatchRepository.schemas.InsertSchema).output(InventoryBatchSchema);

export const InsertManyInventoryBatchContract = oc.input(InventoryBatchRepository.schemas.InsertSchema.array()).output(InventoryBatchSchema.array());

export const UpdateInventoryBatchContract = oc.input(z.object({id: z.uuid(), value: InventoryBatchRepository.schemas.UpdateSchema})).output(InventoryBatchSchema);

export const RemoveInventoryBatchContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
