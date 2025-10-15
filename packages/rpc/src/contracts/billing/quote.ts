import { oc } from "@orpc/contract";
import { QuoteRepository } from "@packages/db/repositories/billing";
import { QuoteSchema } from "@packages/db/schemas/billing/quote";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateQuoteContract = oc.input(QuoteRepository.schemas.paginateOptionSchema).output(QuoteSchema.array());

export const RangeQuoteContract = oc.input(QuoteRepository.schemas.rangeOptionSchema).output(QuoteSchema.array());

export const AnyQuoteContract = oc.input(z.uuid().array()).output(QuoteSchema.array());

export const InsertQuoteContract = oc.input(QuoteRepository.schemas.InsertSchema).output(QuoteSchema);

export const InsertManyQuoteContract = oc.input(QuoteRepository.schemas.InsertSchema.array()).output(QuoteSchema.array());

export const UpdateQuoteContract = oc.input(z.object({id: z.uuid(), value: QuoteRepository.schemas.UpdateSchema})).output(QuoteSchema);

export const RemoveQuoteContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
