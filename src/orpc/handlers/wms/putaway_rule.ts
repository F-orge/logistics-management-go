import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/putaway_rule';
import { PutawayRuleRepository } from '@/repositories/wms/putawayRules';
import { HonoVariables } from '@/server';

export const paginatePutawayRule = implement(
  wmsContracts.paginatePutawayRuleContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PutawayRuleRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangePutawayRule = implement(wmsContracts.rangePutawayRuleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PutawayRuleRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inPutawayRule = implement(wmsContracts.inPutawayRuleContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PutawayRuleRepository(context.db);

    return repo.in(input).execute();
  });

export const createPutawayRule = implement(
  wmsContracts.createPutawayRuleContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PutawayRuleRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updatePutawayRule = implement(
  wmsContracts.updatePutawayRuleContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PutawayRuleRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deletePutawayRule = implement(
  wmsContracts.deletePutawayRuleContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new PutawayRuleRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
