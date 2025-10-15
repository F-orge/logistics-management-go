import { oc } from "@orpc/contract";
import { PutawayRuleRepository } from "@packages/db/repositories/wms";
import { ProductSchema } from "@packages/db/schemas/wms/product";
import { PutawayRuleSchema } from "@packages/db/schemas/wms/putaway_rule";
import { WarehouseSchema } from "@packages/db/schemas/wms/warehouse";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = PutawayRuleSchema.extend({
  product:ProductSchema,
  warehouse:WarehouseSchema
})

export const PaginatePutawayRuleContract = oc.input(PutawayRuleRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangePutawayRuleContract = oc.input(PutawayRuleRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyPutawayRuleContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertPutawayRuleContract = oc.input(PutawayRuleRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyPutawayRuleContract = oc.input(PutawayRuleRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdatePutawayRuleContract = oc.input(z.object({id: z.uuid(), value: PutawayRuleRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemovePutawayRuleContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
