import { oc } from "@orpc/contract";
import { StockTransferRepository } from "@packages/db/repositories/wms";
import { StockTransferSchema } from "@packages/db/schemas/wms/stock_transfer";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateStockTransferContract = oc.input(StockTransferRepository.schemas.paginateOptionSchema).output(StockTransferSchema.array());

export const RangeStockTransferContract = oc.input(StockTransferRepository.schemas.rangeOptionSchema).output(StockTransferSchema.array());

export const AnyStockTransferContract = oc.input(z.uuid().array()).output(StockTransferSchema.array());

export const InsertStockTransferContract = oc.input(StockTransferRepository.schemas.InsertSchema).output(StockTransferSchema);

export const InsertManyStockTransferContract = oc.input(StockTransferRepository.schemas.InsertSchema.array()).output(StockTransferSchema.array());

export const UpdateStockTransferContract = oc.input(z.object({id: z.uuid(), value: StockTransferRepository.schemas.UpdateSchema})).output(StockTransferSchema);

export const RemoveStockTransferContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
