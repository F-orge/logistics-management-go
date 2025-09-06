import { implement, ORPCError } from '@orpc/server';
import { eq } from 'drizzle-orm';
import * as opportunityContracts from '@/contracts/crm/opportunities';
import { opportunities } from '@/db/schemas';

export const create = implement(opportunityContracts.create)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .insert(opportunities)
      .values({
        ...input,
        expectedCloseDate: input.expectedCloseDate?.toDateString(),
      })
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Unable to create opportunity',
      });
    return result[0]!;
  });

export const list = implement(opportunityContracts.list)
  .$context<GlobalVariables>()
  .handler(async ({ context }) => {
    const results = await context.db.select().from(opportunities).execute();
    return results;
  });

export const view = implement(opportunityContracts.view)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .select()
      .from(opportunities)
      .where(eq(opportunities.id, input))
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return result[0];
  });

export const update = implement(opportunityContracts.update)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .update(opportunities)
      .set({
        ...input.value,
        expectedCloseDate: input.value.expectedCloseDate?.toDateString(),
      })
      .where(eq(opportunities.id, input.id))
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return result[0];
  });

export const remove = implement(opportunityContracts.remove)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .delete(opportunities)
      .where(eq(opportunities.id, input))
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return { success: true };
  });
