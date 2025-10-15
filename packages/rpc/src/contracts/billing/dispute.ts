import { oc } from "@orpc/contract";
import { DisputeRepository } from "@packages/db/repositories/billing";
import { DisputeSchema } from "@packages/db/schemas/billing/dispute";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateDisputeContract = oc.input(DisputeRepository.schemas.paginateOptionSchema).output(DisputeSchema.array());

export const RangeDisputeContract = oc.input(DisputeRepository.schemas.rangeOptionSchema).output(DisputeSchema.array());

export const AnyDisputeContract = oc.input(z.uuid().array()).output(DisputeSchema.array());

export const InsertDisputeContract = oc.input(DisputeRepository.schemas.InsertSchema).output(DisputeSchema);

export const InsertManyDisputeContract = oc.input(DisputeRepository.schemas.InsertSchema.array()).output(DisputeSchema.array());

export const UpdateDisputeContract = oc.input(z.object({id: z.uuid(), value: DisputeRepository.schemas.UpdateSchema})).output(DisputeSchema);

export const RemoveDisputeContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
