import { oc } from "@orpc/contract";
import { InventoryBatchRepository } from "@packages/db/repositories/wms";
import { InventoryBatchSchema } from "@packages/db/schemas/wms/inventory_batch";
import { ProductSchema } from "@packages/db/schemas/wms/product";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = InventoryBatchSchema.extend({
  product:ProductSchema
})

export const PaginateInventoryBatchContract = oc.input(InventoryBatchRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeInventoryBatchContract = oc.input(InventoryBatchRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyInventoryBatchContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertInventoryBatchContract = oc.input(InventoryBatchRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyInventoryBatchContract = oc.input(InventoryBatchRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateInventoryBatchContract = oc.input(z.object({id: z.uuid(), value: InventoryBatchRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveInventoryBatchContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
