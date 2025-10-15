import { oc } from "@orpc/contract";
import { SalesOrderRepository } from "@packages/db/repositories/wms";
import { SalesOrderSchema } from "@packages/db/schemas/wms/sales_order";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateSalesOrderContract = oc.input(SalesOrderRepository.schemas.paginateOptionSchema).output(SalesOrderSchema.array());

export const RangeSalesOrderContract = oc.input(SalesOrderRepository.schemas.rangeOptionSchema).output(SalesOrderSchema.array());

export const AnySalesOrderContract = oc.input(z.uuid().array()).output(SalesOrderSchema.array());

export const InsertSalesOrderContract = oc.input(SalesOrderRepository.schemas.InsertSchema).output(SalesOrderSchema);

export const InsertManySalesOrderContract = oc.input(SalesOrderRepository.schemas.InsertSchema.array()).output(SalesOrderSchema.array());

export const UpdateSalesOrderContract = oc.input(z.object({id: z.uuid(), value: SalesOrderRepository.schemas.UpdateSchema})).output(SalesOrderSchema);

export const RemoveSalesOrderContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
