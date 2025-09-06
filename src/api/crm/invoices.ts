import { implement, ORPCError } from '@orpc/server';
import * as invoiceContracts from '@/contracts/crm/invoices';
import { invoices } from '@/db/schemas';
import { eq } from 'drizzle-orm';

export const create = implement(invoiceContracts.create)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .insert(invoices)
      .values({ ...input })
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Unable to create invoice',
      });
    return result[0]!;
  });

export const list = implement(invoiceContracts.list)
  .$context<GlobalVariables>()
  .handler(async ({ context }) => {
    const results = await context.db.select().from(invoices).execute();
    return results;
  });

export const view = implement(invoiceContracts.view)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .select()
      .from(invoices)
      .where(eq(invoices.id, input))
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return result[0];
  });

export const update = implement(invoiceContracts.update)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .update(invoices)
      .set(input.value)
      .where(eq(invoices.id, input.id))
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return result[0];
  });

export const remove = implement(invoiceContracts.remove)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .delete(invoices)
      .where(eq(invoices.id, input))
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return { success: true };
  });
