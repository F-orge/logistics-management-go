import { implement } from '@orpc/server';
import * as billingContracts from '@/orpc/contracts/billing/client_account';
import { ClientAccountRepository } from '@/repositories/billing/clientAccounts';
import { HonoVariables } from '@/server';

export const paginateClientAccount = implement(
  billingContracts.paginateClientAccountContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ClientAccountRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeClientAccount = implement(
  billingContracts.rangeClientAccountContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ClientAccountRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inClientAccount = implement(
  billingContracts.inClientAccountContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ClientAccountRepository(context.db);

    return repo.in(input).execute();
  });

export const createClientAccount = implement(
  billingContracts.createClientAccountContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ClientAccountRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateClientAccount = implement(
  billingContracts.updateClientAccountContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ClientAccountRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteClientAccount = implement(
  billingContracts.deleteClientAccountContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ClientAccountRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
