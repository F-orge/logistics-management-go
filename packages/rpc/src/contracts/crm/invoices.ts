import { oc } from "@orpc/contract";
import { InvoiceItemRepository, InvoiceRepository } from "@packages/db/repositories/crm";
import { InvoiceItemSchema } from "@packages/db/schemas/crm/invoice_items";
import { InvoiceSchema } from "@packages/db/schemas/crm/invoices";
import { OpportunitySchema } from "@packages/db/schemas/crm/opportunities";
import { ProductSchema } from "@packages/db/schemas/crm/products";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = InvoiceSchema.extend({
  opportunity:OpportunitySchema.optional(),
  items:InvoiceItemSchema.extend({
    product:ProductSchema
  }).array()
})

export const PaginateInvoiceContract = oc.input(InvoiceRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeInvoiceContract = oc.input(InvoiceRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyInvoiceContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertInvoiceContract = oc.input(InvoiceRepository.schemas.InsertSchema.extend({items:InvoiceItemRepository.schemas.InsertSchema.array()})).output(OutputSchema);

export const InsertManyInvoiceContract = oc.input(InvoiceRepository.schemas.InsertSchema.extend({items:InvoiceItemRepository.schemas.InsertSchema.array()}).array()).output(OutputSchema.array());

export const UpdateInvoiceContract = oc.input(z.object({id: z.uuid(), value: InvoiceRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveInvoiceContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));

export const InsertInvoiceItemContract = oc.input(InvoiceItemRepository.schemas.InsertSchema.extend({items:InvoiceItemSchema.array()})).output(OutputSchema);

export const InsertManyInvoiceItemContract = oc.input(InvoiceItemRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateInvoiceItemContract = oc.input(z.object({id: z.uuid(), value: InvoiceItemRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveInvoiceItemContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
