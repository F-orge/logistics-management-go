import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { insertCampaignSchema, updateCampaignSchema } from '@/db/schemas';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmCampaignRepository } from '@/repositories/crm/campaigns';
import { crmCampaignSchema } from '@/schemas/crm/campaigns';

export const selectCrmCampaign = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmCampaignSchema))
  .handler(async ({ data }) => {
    const repo = new CrmCampaignRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'crm.campaigns'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.campaigns', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmCampaignSchema.array().parseAsync(result);
  });

export const createCrmCampaign = createServerFn({ method: 'POST' })
  .inputValidator(insertCampaignSchema)
  .handler(async ({ data }) => {
    const repo = new CrmCampaignRepository(kyselyDb);
    const result = await repo.create(data).executeTakeFirst();
    return crmCampaignSchema.parseAsync(result);
  });

export const updateCrmCampaign = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: updateCampaignSchema }))
  .handler(async ({ data }) => {
    const repo = new CrmCampaignRepository(kyselyDb);
    const result = await repo.update(data.id, data.value).executeTakeFirst();
    return crmCampaignSchema.parseAsync(result);
  });

export const removeCrmCampaign = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new CrmCampaignRepository(kyselyDb);
    const result = await repo.delete(data.id).executeTakeFirst();
    return result;
  });
// Server actions for CRM campaigns will follow the contacts.ts pattern.
