import { oc } from "@orpc/contract";
import { InventoryStockRepository } from "@packages/db/repositories/wms";
import { InventoryBatchSchema } from "@packages/db/schemas/wms/inventory_batch";
import { InventoryStockSchema } from "@packages/db/schemas/wms/inventory_stock";
import { LocationSchema } from "@packages/db/schemas/wms/location";
import { ProductSchema } from "@packages/db/schemas/wms/product";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = InventoryStockSchema.extend({
  product:ProductSchema,
  location:LocationSchema,
  batch:InventoryBatchSchema.optional()
})

export const PaginateInventoryStockContract = oc.input(InventoryStockRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeInventoryStockContract = oc.input(InventoryStockRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyInventoryStockContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertInventoryStockContract = oc.input(InventoryStockRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyInventoryStockContract = oc.input(InventoryStockRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateInventoryStockContract = oc.input(z.object({id: z.uuid(), value: InventoryStockRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveInventoryStockContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
