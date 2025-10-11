import { implement } from '@orpc/server';
import * as crmContracts from '@/orpc/contracts/crm';
import { InteractionRepository } from '@/repositories/crm/interactions';
import { HonoVariables } from '@/server';

export const paginateInteraction = implement(
  crmContracts.paginateInteractionContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InteractionRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeInteraction = implement(crmContracts.rangeInteractionContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InteractionRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inInteraction = implement(crmContracts.inInteractionContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InteractionRepository(context.db);

    return repo.in(input).execute();
  });

export const createInteraction = implement(
  crmContracts.createInteractionContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InteractionRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateInteraction = implement(
  crmContracts.updateInteractionContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InteractionRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteInteraction = implement(
  crmContracts.deleteInteractionContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new InteractionRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
