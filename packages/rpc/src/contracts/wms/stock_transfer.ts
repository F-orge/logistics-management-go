import { oc } from "@orpc/contract";
import { StockTransferRepository } from "@packages/db/repositories/wms";
import { ProductSchema } from "@packages/db/schemas/wms/product";
import { StockTransferSchema } from "@packages/db/schemas/wms/stock_transfer";
import { WarehouseSchema } from "@packages/db/schemas/wms/warehouse";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = StockTransferSchema.extend({
  sourceWarehouse:WarehouseSchema,
  destinationWarehouse:WarehouseSchema,
  product:ProductSchema,
})

export const PaginateStockTransferContract = oc.input(StockTransferRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeStockTransferContract = oc.input(StockTransferRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyStockTransferContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertStockTransferContract = oc.input(StockTransferRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyStockTransferContract = oc.input(StockTransferRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateStockTransferContract = oc.input(z.object({id: z.uuid(), value: StockTransferRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveStockTransferContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
