import { oc } from "@orpc/contract";
import { PaymentRepository } from "@packages/db/repositories/billing";
import { UserSchema } from "@packages/db/schemas/auth/user";
import { InvoiceSchema } from "@packages/db/schemas/billing/invoice";
import { InvoiceLineItemSchema } from "@packages/db/schemas/billing/invoice_line_item";
import { PaymentSchema } from "@packages/db/schemas/billing/payment";
import { CompanySchema } from "@packages/db/schemas/crm/companies";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = PaymentSchema.extend({
  invoice:InvoiceSchema.extend({
    client:CompanySchema,
    createdByUser:UserSchema,
    items:InvoiceLineItemSchema.array()
  }),
  processedByUser:UserSchema,
})

export const PaginatePaymentContract = oc.input(PaymentRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangePaymentContract = oc.input(PaymentRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyPaymentContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertPaymentContract = oc.input(PaymentRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyPaymentContract = oc.input(PaymentRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdatePaymentContract = oc.input(z.object({id: z.uuid(), value: PaymentRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemovePaymentContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
