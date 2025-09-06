import { implement, ORPCError } from '@orpc/server';
import * as companyContracts from '@/contracts/crm/companies';
import { companies } from '@/db/schemas';
import { eq } from 'drizzle-orm';

export const create = implement(companyContracts.create)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .insert(companies)
      .values({ ...input })
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Unable to create company',
      });
    return result[0]!;
  });

export const list = implement(companyContracts.list)
  .$context<GlobalVariables>()
  .handler(async ({ context }) => {
    const results = await context.db.select().from(companies).execute();
    return results;
  });

export const view = implement(companyContracts.view)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .select()
      .from(companies)
      .where(eq(companies.id, input))
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return result[0];
  });

export const update = implement(companyContracts.update)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .update(companies)
      .set(input.value)
      .where(eq(companies.id, input.id))
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return result[0];
  });

export const remove = implement(companyContracts.remove)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .delete(companies)
      .where(eq(companies.id, input))
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return { success: true };
  });
