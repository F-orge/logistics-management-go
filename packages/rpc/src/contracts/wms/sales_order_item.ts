import { oc } from "@orpc/contract";
import { SalesOrderItemRepository } from "@packages/db/repositories/wms";
import { SalesOrderItemSchema } from "@packages/db/schemas/wms/sales_order_item";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateSalesOrderItemContract = oc.input(SalesOrderItemRepository.schemas.paginateOptionSchema).output(SalesOrderItemSchema.array());

export const RangeSalesOrderItemContract = oc.input(SalesOrderItemRepository.schemas.rangeOptionSchema).output(SalesOrderItemSchema.array());

export const AnySalesOrderItemContract = oc.input(z.uuid().array()).output(SalesOrderItemSchema.array());

export const InsertSalesOrderItemContract = oc.input(SalesOrderItemRepository.schemas.InsertSchema).output(SalesOrderItemSchema);

export const InsertManySalesOrderItemContract = oc.input(SalesOrderItemRepository.schemas.InsertSchema.array()).output(SalesOrderItemSchema.array());

export const UpdateSalesOrderItemContract = oc.input(z.object({id: z.uuid(), value: SalesOrderItemRepository.schemas.UpdateSchema})).output(SalesOrderItemSchema);

export const RemoveSalesOrderItemContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
