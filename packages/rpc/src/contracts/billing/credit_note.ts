import { oc } from "@orpc/contract";
import { CreditNoteRepository } from "@packages/db/repositories/billing";
import { UserSchema } from "@packages/db/schemas/auth/user";
import { CreditNoteSchema } from "@packages/db/schemas/billing/credit_note";
import { DisputeSchema } from "@packages/db/schemas/billing/dispute";
import { InvoiceSchema } from "@packages/db/schemas/billing/invoice";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = CreditNoteSchema.extend({
  createdByUser:UserSchema.optional(),
  dispute:DisputeSchema.optional(),
  invoice:InvoiceSchema
})

export const PaginateCreditNoteContract = oc.input(CreditNoteRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeCreditNoteContract = oc.input(CreditNoteRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyCreditNoteContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertCreditNoteContract = oc.input(CreditNoteRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyCreditNoteContract = oc.input(CreditNoteRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateCreditNoteContract = oc.input(z.object({id: z.uuid(), value: CreditNoteRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveCreditNoteContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
