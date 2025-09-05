import { implement, ORPCError } from '@orpc/server';
import * as campaignContracts from '@/contracts/crm/campaigns';
import { campaigns } from '@/db/schemas';

export const create = implement(campaignContracts.create)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .insert(campaigns)
      .values({
        ...input,
      })
      .returning()
      .execute();

    if (!result.length)
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Unable to create campaign',
      });

    return result[0]!;
  });

export const list = implement(campaignContracts.list)
  .$context<GlobalVariables>()
  .handler(async ({ context }) => {
    const results = await context.db.select().from(campaigns).execute();

    return results;
  });
