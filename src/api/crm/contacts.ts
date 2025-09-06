import { implement, ORPCError } from '@orpc/server';
import * as contactContracts from '@/contracts/crm/contacts';
import { contacts } from '@/db/schemas';
import { eq } from 'drizzle-orm';

export const create = implement(contactContracts.create)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .insert(contacts)
      .values({ ...input })
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Unable to create contact',
      });
    return result[0]!;
  });

export const list = implement(contactContracts.list)
  .$context<GlobalVariables>()
  .handler(async ({ context }) => {
    const results = await context.db.select().from(contacts).execute();
    return results;
  });

export const view = implement(contactContracts.view)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .select()
      .from(contacts)
      .where(eq(contacts.id, input))
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return result[0];
  });

export const update = implement(contactContracts.update)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .update(contacts)
      .set(input.value)
      .where(eq(contacts.id, input.id))
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return result[0];
  });

export const remove = implement(contactContracts.remove)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .delete(contacts)
      .where(eq(contacts.id, input))
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return { success: true };
  });
