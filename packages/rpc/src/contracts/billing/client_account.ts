import { oc } from "@orpc/contract";
import { ClientAccountRepository } from "@packages/db/repositories/billing";
import { ClientAccountSchema } from "@packages/db/schemas/billing/client_account";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateClientAccountContract = oc.input(ClientAccountRepository.schemas.paginateOptionSchema).output(ClientAccountSchema.array());

export const RangeClientAccountContract = oc.input(ClientAccountRepository.schemas.rangeOptionSchema).output(ClientAccountSchema.array());

export const AnyClientAccountContract = oc.input(z.uuid().array()).output(ClientAccountSchema.array());

export const InsertClientAccountContract = oc.input(ClientAccountRepository.schemas.InsertSchema).output(ClientAccountSchema);

export const InsertManyClientAccountContract = oc.input(ClientAccountRepository.schemas.InsertSchema.array()).output(ClientAccountSchema.array());

export const UpdateClientAccountContract = oc.input(z.object({id: z.uuid(), value: ClientAccountRepository.schemas.UpdateSchema})).output(ClientAccountSchema);

export const RemoveClientAccountContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
