import { implement, ORPCError } from '@orpc/server';
import { eq } from 'drizzle-orm';
import * as interactionContracts from '@/contracts/crm/interactions';
import { interactions } from '@/db/schemas';

export const create = implement(interactionContracts.create)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .insert(interactions)
      .values({ ...input })
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Unable to create interaction',
      });
    return result[0]!;
  });

export const list = implement(interactionContracts.list)
  .$context<GlobalVariables>()
  .handler(async ({ context }) => {
    const results = await context.db.select().from(interactions).execute();
    return results;
  });

export const view = implement(interactionContracts.view)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .select()
      .from(interactions)
      .where(eq(interactions.id, input))
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return result[0];
  });
