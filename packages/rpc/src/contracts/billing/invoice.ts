import { oc } from "@orpc/contract";
import { InvoiceLineItemRepository, InvoiceRepository } from "@packages/db/repositories/billing";
import { UserSchema } from "@packages/db/schemas/auth/user";
import { InvoiceSchema } from "@packages/db/schemas/billing/invoice";
import { InvoiceLineItemSchema } from "@packages/db/schemas/billing/invoice_line_item";
import { QuoteSchema } from "@packages/db/schemas/billing/quote";
import { CompanySchema } from "@packages/db/schemas/crm/companies";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = InvoiceSchema.extend({
  client:CompanySchema,
  createdByUser:UserSchema.optional(),
  quote:QuoteSchema.optional(),
  items:InvoiceLineItemSchema.array()
})

export const PaginateInvoiceContract = oc.input(InvoiceRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeInvoiceContract = oc.input(InvoiceRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyInvoiceContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertInvoiceContract = oc.input(InvoiceRepository.schemas.InsertSchema.extend({items:InvoiceLineItemRepository.schemas.InsertSchema.array()})).output(OutputSchema);

export const InsertManyInvoiceContract = oc.input(InvoiceRepository.schemas.InsertSchema.extend({items:InvoiceLineItemRepository.schemas.InsertSchema.array()}).array()).output(OutputSchema.array());

export const UpdateInvoiceContract = oc.input(z.object({id: z.uuid(), value: InvoiceRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveInvoiceContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));

export const InsertInvoiceLineItemContract = oc.input(InvoiceLineItemRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyInvoiceLineItemContract = oc.input(InvoiceLineItemRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateInvoiceLineItemContract = oc.input(z.object({id: z.uuid(), value: InvoiceLineItemRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveInvoiceLineItemContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
