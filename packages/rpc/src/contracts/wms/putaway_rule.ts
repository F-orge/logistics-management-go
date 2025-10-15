import { oc } from "@orpc/contract";
import { PutawayRuleRepository } from "@packages/db/repositories/wms";
import { PutawayRuleSchema } from "@packages/db/schemas/wms/putaway_rule";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginatePutawayRuleContract = oc.input(PutawayRuleRepository.schemas.paginateOptionSchema).output(PutawayRuleSchema.array());

export const RangePutawayRuleContract = oc.input(PutawayRuleRepository.schemas.rangeOptionSchema).output(PutawayRuleSchema.array());

export const AnyPutawayRuleContract = oc.input(z.uuid().array()).output(PutawayRuleSchema.array());

export const InsertPutawayRuleContract = oc.input(PutawayRuleRepository.schemas.InsertSchema).output(PutawayRuleSchema);

export const InsertManyPutawayRuleContract = oc.input(PutawayRuleRepository.schemas.InsertSchema.array()).output(PutawayRuleSchema.array());

export const UpdatePutawayRuleContract = oc.input(z.object({id: z.uuid(), value: PutawayRuleRepository.schemas.UpdateSchema})).output(PutawayRuleSchema);

export const RemovePutawayRuleContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
