import { oc } from "@orpc/contract";
import { InventoryStockRepository } from "@packages/db/repositories/wms";
import { InventoryStockSchema } from "@packages/db/schemas/wms/inventory_stock";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateInventoryStockContract = oc.input(InventoryStockRepository.schemas.paginateOptionSchema).output(InventoryStockSchema.array());

export const RangeInventoryStockContract = oc.input(InventoryStockRepository.schemas.rangeOptionSchema).output(InventoryStockSchema.array());

export const AnyInventoryStockContract = oc.input(z.uuid().array()).output(InventoryStockSchema.array());

export const InsertInventoryStockContract = oc.input(InventoryStockRepository.schemas.InsertSchema).output(InventoryStockSchema);

export const InsertManyInventoryStockContract = oc.input(InventoryStockRepository.schemas.InsertSchema.array()).output(InventoryStockSchema.array());

export const UpdateInventoryStockContract = oc.input(z.object({id: z.uuid(), value: InventoryStockRepository.schemas.UpdateSchema})).output(InventoryStockSchema);

export const RemoveInventoryStockContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
