import { implement, ORPCError } from '@orpc/server';
import { eq } from 'drizzle-orm';
import * as caseContracts from '@/contracts/crm/cases';
import { cases } from '@/db/schemas';

export const create = implement(caseContracts.create)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .insert(cases)
      .values({
        ...input,
      })
      .returning()
      .execute();

    if (!result.length)
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Unable to create case',
      });

    return result[0]!;
  });

export const list = implement(caseContracts.list)
  .$context<GlobalVariables>()
  .handler(async ({ context }) => {
    const results = await context.db.select().from(cases).execute();
    return results;
  });

export const view = implement(caseContracts.view)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .select()
      .from(cases)
      .where(eq(cases.id, input))
      .execute();

    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });

    return result[0];
  });

export const update = implement(caseContracts.update)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .update(cases)
      .set(input.value)
      .where(eq(cases.id, input.id))
      .returning()
      .execute();

    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });

    return result[0];
  });

export const remove = implement(caseContracts.remove)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .delete(cases)
      .where(eq(cases.id, input))
      .returning()
      .execute();

    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });

    return { success: true };
  });
