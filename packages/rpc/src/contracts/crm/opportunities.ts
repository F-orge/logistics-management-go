import { oc } from "@orpc/contract";
import { OpportunityRepository } from "@packages/db/repositories/crm";
import { UserSchema } from "@packages/db/schemas/auth/user";
import { CampaignSchema } from "@packages/db/schemas/crm/campaigns";
import { CompanySchema } from "@packages/db/schemas/crm/companies";
import { ContactSchema } from "@packages/db/schemas/crm/contacts";
import { OpportunitySchema } from "@packages/db/schemas/crm/opportunities";
import { ProductSchema } from "@packages/db/schemas/crm/products";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = OpportunitySchema.extend({
  owner:UserSchema,
  campaign:CampaignSchema.optional(),
  company:CompanySchema.optional(),
  contact:ContactSchema.optional(),
  products:ProductSchema.array()
})

export const PaginateOpportunityContract = oc.input(OpportunityRepository.schemas.paginateOptionSchema).output(OpportunitySchema.array());

export const RangeOpportunityContract = oc.input(OpportunityRepository.schemas.rangeOptionSchema).output(OpportunitySchema.array());

export const AnyOpportunityContract = oc.input(z.uuid().array()).output(OpportunitySchema.array());

export const InsertOpportunityContract = oc.input(OpportunityRepository.schemas.InsertSchema).output(OpportunitySchema);

export const InsertManyOpportunityContract = oc.input(OpportunityRepository.schemas.InsertSchema.array()).output(OpportunitySchema.array());

export const UpdateOpportunityContract = oc.input(z.object({id: z.uuid(), value: OpportunityRepository.schemas.UpdateSchema})).output(OpportunitySchema);

export const RemoveOpportunityContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
