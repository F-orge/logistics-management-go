import { implement, ORPCError } from '@orpc/server';
import { eq } from 'drizzle-orm';
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

export const view = implement(campaignContracts.view)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .select()
      .from(campaigns)
      .where(eq(campaigns.id, input))
      .execute();

    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });

    return result[0];
  });

export const update = implement(campaignContracts.update)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .update(campaigns)
      .set(input.value)
      .where(eq(campaigns.id, input.id))
      .returning()
      .execute();

    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });

    return result[0];
  });

export const remove = implement(campaignContracts.remove)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .delete(campaigns)
      .where(eq(campaigns.id, input))
      .returning()
      .execute();

    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });

    return { success: true };
  });
