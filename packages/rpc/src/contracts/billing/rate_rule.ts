import { oc } from "@orpc/contract";
import { RateRuleRepository } from "@packages/db/repositories/billing";
import { RateRuleSchema } from "@packages/db/schemas/billing/rate_rule";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateRateRuleContract = oc.input(RateRuleRepository.schemas.paginateOptionSchema).output(RateRuleSchema.array());

export const RangeRateRuleContract = oc.input(RateRuleRepository.schemas.rangeOptionSchema).output(RateRuleSchema.array());

export const AnyRateRuleContract = oc.input(z.uuid().array()).output(RateRuleSchema.array());

export const InsertRateRuleContract = oc.input(RateRuleRepository.schemas.InsertSchema).output(RateRuleSchema);

export const InsertManyRateRuleContract = oc.input(RateRuleRepository.schemas.InsertSchema.array()).output(RateRuleSchema.array());

export const UpdateRateRuleContract = oc.input(z.object({id: z.uuid(), value: RateRuleRepository.schemas.UpdateSchema})).output(RateRuleSchema);

export const RemoveRateRuleContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
