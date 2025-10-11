import { implement } from '@orpc/server';
import * as billingContracts from '@/orpc/contracts/billing/account_transaction';
import { AccountTransactionRepository } from '@/repositories/billing/accountTransactions';
import { HonoVariables } from '@/server';

export const paginateAccountTransaction = implement(
  billingContracts.paginateAccountTransactionContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new AccountTransactionRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeAccountTransaction = implement(
  billingContracts.rangeAccountTransactionContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new AccountTransactionRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inAccountTransaction = implement(
  billingContracts.inAccountTransactionContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new AccountTransactionRepository(context.db);

    return repo.in(input).execute();
  });

export const createAccountTransaction = implement(
  billingContracts.createAccountTransactionContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new AccountTransactionRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateAccountTransaction = implement(
  billingContracts.updateAccountTransactionContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new AccountTransactionRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteAccountTransaction = implement(
  billingContracts.deleteAccountTransactionContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new AccountTransactionRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
