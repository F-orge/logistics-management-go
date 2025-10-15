import { oc } from "@orpc/contract";
import { CaseRepository } from "@packages/db/repositories/crm";
import { UserSchema } from "@packages/db/schemas/auth/user";
import { CaseSchema } from "@packages/db/schemas/crm/cases";
import { ContactSchema } from "@packages/db/schemas/crm/contacts";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = CaseSchema.extend({
  contact:ContactSchema.optional(),
  owner:UserSchema
});

export const PaginateCaseContract = oc.input(CaseRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeCaseContract = oc.input(CaseRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyCaseContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertCaseContract = oc.input(CaseRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyCaseContract = oc.input(CaseRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateCaseContract = oc.input(z.object({id: z.uuid(), value: CaseRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveCaseContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
