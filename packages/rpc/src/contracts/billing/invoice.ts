import { oc } from "@orpc/contract";
import { InvoiceRepository } from "@packages/db/repositories/billing";
import { InvoiceSchema } from "@packages/db/schemas/billing/invoice";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateInvoiceContract = oc.input(InvoiceRepository.schemas.paginateOptionSchema).output(InvoiceSchema.array());

export const RangeInvoiceContract = oc.input(InvoiceRepository.schemas.rangeOptionSchema).output(InvoiceSchema.array());

export const AnyInvoiceContract = oc.input(z.uuid().array()).output(InvoiceSchema.array());

export const InsertInvoiceContract = oc.input(InvoiceRepository.schemas.InsertSchema).output(InvoiceSchema);

export const InsertManyInvoiceContract = oc.input(InvoiceRepository.schemas.InsertSchema.array()).output(InvoiceSchema.array());

export const UpdateInvoiceContract = oc.input(z.object({id: z.uuid(), value: InvoiceRepository.schemas.UpdateSchema})).output(InvoiceSchema);

export const RemoveInvoiceContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
