import { oc } from "@orpc/contract";
import { InvoiceLineItemRepository } from "@packages/db/repositories/billing";
import { InvoiceLineItemSchema } from "@packages/db/schemas/billing/invoice_line_item";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateInvoiceLineItemContract = oc.input(InvoiceLineItemRepository.schemas.paginateOptionSchema).output(InvoiceLineItemSchema.array());

export const RangeInvoiceLineItemContract = oc.input(InvoiceLineItemRepository.schemas.rangeOptionSchema).output(InvoiceLineItemSchema.array());

export const AnyInvoiceLineItemContract = oc.input(z.uuid().array()).output(InvoiceLineItemSchema.array());

export const InsertInvoiceLineItemContract = oc.input(InvoiceLineItemRepository.schemas.InsertSchema).output(InvoiceLineItemSchema);

export const InsertManyInvoiceLineItemContract = oc.input(InvoiceLineItemRepository.schemas.InsertSchema.array()).output(InvoiceLineItemSchema.array());

export const UpdateInvoiceLineItemContract = oc.input(z.object({id: z.uuid(), value: InvoiceLineItemRepository.schemas.UpdateSchema})).output(InvoiceLineItemSchema);

export const RemoveInvoiceLineItemContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
