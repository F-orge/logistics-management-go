import { oc } from "@orpc/contract";
import { AccountTransactionRepository } from "@packages/db/repositories/billing";
import { AccountTransactionSchema } from "@packages/db/schemas/billing/account_transaction";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateAccountTransactionContract = oc.input(AccountTransactionRepository.schemas.paginateOptionSchema).output(AccountTransactionSchema.array());

export const RangeAccountTransactionContract = oc.input(AccountTransactionRepository.schemas.rangeOptionSchema).output(AccountTransactionSchema.array());

export const AnyAccountTransactionContract = oc.input(z.uuid().array()).output(AccountTransactionSchema.array());

export const InsertAccountTransactionContract = oc.input(AccountTransactionRepository.schemas.InsertSchema).output(AccountTransactionSchema);

export const InsertManyAccountTransactionContract = oc.input(AccountTransactionRepository.schemas.InsertSchema.array()).output(AccountTransactionSchema.array());

export const UpdateAccountTransactionContract = oc.input(z.object({id: z.uuid(), value: AccountTransactionRepository.schemas.UpdateSchema})).output(AccountTransactionSchema);

export const RemoveAccountTransactionContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
