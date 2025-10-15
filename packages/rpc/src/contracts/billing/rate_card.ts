import { oc } from "@orpc/contract";
import { RateCardRepository } from "@packages/db/repositories/billing";
import { RateCardSchema } from "@packages/db/schemas/billing/rate_card";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateRateCardContract = oc.input(RateCardRepository.schemas.paginateOptionSchema).output(RateCardSchema.array());

export const RangeRateCardContract = oc.input(RateCardRepository.schemas.rangeOptionSchema).output(RateCardSchema.array());

export const AnyRateCardContract = oc.input(z.uuid().array()).output(RateCardSchema.array());

export const InsertRateCardContract = oc.input(RateCardRepository.schemas.InsertSchema).output(RateCardSchema);

export const InsertManyRateCardContract = oc.input(RateCardRepository.schemas.InsertSchema.array()).output(RateCardSchema.array());

export const UpdateRateCardContract = oc.input(z.object({id: z.uuid(), value: RateCardRepository.schemas.UpdateSchema})).output(RateCardSchema);

export const RemoveRateCardContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
