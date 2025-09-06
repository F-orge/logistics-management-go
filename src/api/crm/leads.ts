import { implement, ORPCError } from '@orpc/server';
import * as leadContracts from '@/contracts/crm/leads';
import { leads } from '@/db/schemas';
import { eq } from 'drizzle-orm';

export const create = implement(leadContracts.create)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .insert(leads)
      .values({
        ...input,
      })
      .returning()
      .execute();

    if (!result.length)
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Unable to create lead',
      });

    return result[0]!;
  });

export const list = implement(leadContracts.list)
  .$context<GlobalVariables>()
  .handler(async ({ context }) => {
    const results = await context.db.select().from(leads).execute();
    return results;
  });

export const view = implement(leadContracts.view)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .select()
      .from(leads)
      .where(eq(leads.id, input))
      .execute();

    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });

    return result[0];
  });

export const update = implement(leadContracts.update)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .update(leads)
      .set(input.value)
      .where(eq(leads.id, input.id))
      .returning()
      .execute();

    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });

    return result[0];
  });

export const remove = implement(leadContracts.remove)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .delete(leads)
      .where(eq(leads.id, input))
      .returning()
      .execute();

    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });

    return { success: true };
  });
