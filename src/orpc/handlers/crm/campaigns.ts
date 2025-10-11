import { implement } from '@orpc/server';
import * as crmContracts from '@/orpc/contracts/crm';
import { CampaignRepository } from '@/repositories/crm/campaigns';
import { HonoVariables } from '@/server';

export const paginateCampaign = implement(crmContracts.paginateCampaignContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CampaignRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeCampaign = implement(crmContracts.rangeCampaignContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CampaignRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inCampaign = implement(crmContracts.inCampaignContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CampaignRepository(context.db);

    return repo.in(input).execute();
  });

export const createCampaign = implement(crmContracts.createCampaignContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CampaignRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateCampaign = implement(crmContracts.updateCampaignContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CampaignRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteCampaign = implement(crmContracts.deleteCampaignContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CampaignRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
