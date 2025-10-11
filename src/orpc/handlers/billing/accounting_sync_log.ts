import { implement } from '@orpc/server';
import * as billingContracts from '@/orpc/contracts/billing/accounting_sync_log';
import { AccountingSyncLogRepository } from '@/repositories/billing/accountingSyncLogs';
import { HonoVariables } from '@/server';

export const paginateAccountingSyncLog = implement(
  billingContracts.paginateAccountingSyncLogContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new AccountingSyncLogRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeAccountingSyncLog = implement(
  billingContracts.rangeAccountingSyncLogContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new AccountingSyncLogRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inAccountingSyncLog = implement(
  billingContracts.inAccountingSyncLogContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new AccountingSyncLogRepository(context.db);

    return repo.in(input).execute();
  });

export const createAccountingSyncLog = implement(
  billingContracts.createAccountingSyncLogContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new AccountingSyncLogRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateAccountingSyncLog = implement(
  billingContracts.updateAccountingSyncLogContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new AccountingSyncLogRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteAccountingSyncLog = implement(
  billingContracts.deleteAccountingSyncLogContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new AccountingSyncLogRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
