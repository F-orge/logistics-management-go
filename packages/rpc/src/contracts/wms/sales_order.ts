import { oc } from "@orpc/contract";
import {
  SalesOrderItemRepository,
  SalesOrderRepository,
} from "@packages/db/repositories/wms";
import { CompanySchema } from "@packages/db/schemas/crm/companies";
import { OpportunitySchema } from "@packages/db/schemas/crm/opportunities";
import { ProductSchema } from "@packages/db/schemas/wms/product";
import { SalesOrderSchema } from "@packages/db/schemas/wms/sales_order";
import { SalesOrderItemSchema } from "@packages/db/schemas/wms/sales_order_item";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = SalesOrderSchema.extend({
  client: CompanySchema,
  opportunity: OpportunitySchema.optional(),
  items: SalesOrderItemSchema.extend({ product: ProductSchema }).array(),
});

export const PaginateSalesOrderContract = oc
  .input(SalesOrderRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array());

export const RangeSalesOrderContract = oc
  .input(SalesOrderRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array());

export const AnySalesOrderContract = oc
  .input(z.uuid().array())
  .output(OutputSchema.array());

export const InsertSalesOrderContract = oc
  .input(
    SalesOrderRepository.schemas.InsertSchema.extend({
      items: SalesOrderItemRepository.schemas.InsertSchema.array(),
    })
  )
  .output(OutputSchema);

export const InsertManySalesOrderContract = oc
  .input(
    SalesOrderRepository.schemas.InsertSchema.extend({
      items: SalesOrderItemRepository.schemas.InsertSchema.array(),
    }).array()
  )
  .output(OutputSchema.array());

export const UpdateSalesOrderContract = oc
  .input(
    z.object({ id: z.uuid(), value: SalesOrderRepository.schemas.UpdateSchema })
  )
  .output(OutputSchema);

export const RemoveSalesOrderContract = oc
  .input(z.uuid())
  .output(
    z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString())
  );

export const InsertSalesOrderItemContract = oc
  .input(SalesOrderItemRepository.schemas.InsertSchema)
  .output(OutputSchema);

export const InsertManySalesOrderItemContract = oc
  .input(SalesOrderItemRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array());

export const UpdateSalesOrderItemContract = oc
  .input(
    z.object({
      id: z.uuid(),
      value: SalesOrderItemRepository.schemas.UpdateSchema,
    })
  )
  .output(OutputSchema);

export const RemoveSalesOrderItemContract = oc
  .input(z.uuid())
  .output(
    z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString())
  );
