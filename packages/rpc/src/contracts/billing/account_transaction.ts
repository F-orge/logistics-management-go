import { oc } from "@orpc/contract";
import { AccountTransactionRepository } from "@packages/db/repositories/billing";
import { UserSchema } from "@packages/db/schemas/auth/user";
import { AccountTransactionSchema } from "@packages/db/schemas/billing/account_transaction";
import { ClientAccountSchema } from "@packages/db/schemas/billing/client_account";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = AccountTransactionSchema.extend({
  clientAccount:ClientAccountSchema,
  processedByUser:UserSchema.optional(),
})

export const PaginateAccountTransactionContract = oc.input(AccountTransactionRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeAccountTransactionContract = oc.input(AccountTransactionRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyAccountTransactionContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertAccountTransactionContract = oc.input(AccountTransactionRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyAccountTransactionContract = oc.input(AccountTransactionRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateAccountTransactionContract = oc.input(z.object({id: z.uuid(), value: AccountTransactionRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveAccountTransactionContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
