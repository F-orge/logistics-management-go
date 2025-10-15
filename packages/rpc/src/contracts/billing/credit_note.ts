import { oc } from "@orpc/contract";
import { CreditNoteRepository } from "@packages/db/repositories/billing";
import { CreditNoteSchema } from "@packages/db/schemas/billing/credit_note";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateCreditNoteContract = oc.input(CreditNoteRepository.schemas.paginateOptionSchema).output(CreditNoteSchema.array());

export const RangeCreditNoteContract = oc.input(CreditNoteRepository.schemas.rangeOptionSchema).output(CreditNoteSchema.array());

export const AnyCreditNoteContract = oc.input(z.uuid().array()).output(CreditNoteSchema.array());

export const InsertCreditNoteContract = oc.input(CreditNoteRepository.schemas.InsertSchema).output(CreditNoteSchema);

export const InsertManyCreditNoteContract = oc.input(CreditNoteRepository.schemas.InsertSchema.array()).output(CreditNoteSchema.array());

export const UpdateCreditNoteContract = oc.input(z.object({id: z.uuid(), value: CreditNoteRepository.schemas.UpdateSchema})).output(CreditNoteSchema);

export const RemoveCreditNoteContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
