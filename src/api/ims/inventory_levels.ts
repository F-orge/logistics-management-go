import { implement, ORPCError } from '@orpc/server';
import { eq } from 'drizzle-orm';
import * as inventoryLevelContracts from '@/contracts/ims/inventory_levels';
import { inventoryLevels } from '@/db/schemas';

export const create = implement(inventoryLevelContracts.create)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .insert(inventoryLevels)
      .values({ ...input })
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Unable to create inventory level',
      });
    return result[0]!;
  });

export const list = implement(inventoryLevelContracts.list)
  .$context<GlobalVariables>()
  .handler(async ({ context }) => {
    const results = await context.db.select().from(inventoryLevels).execute();
    return results;
  });

export const view = implement(inventoryLevelContracts.view)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .select()
      .from(inventoryLevels)
      .where(eq(inventoryLevels.id, input))
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return result[0];
  });

export const update = implement(inventoryLevelContracts.update)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .update(inventoryLevels)
      .set(input.value)
      .where(eq(inventoryLevels.id, input.id))
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return result[0];
  });

export const remove = implement(inventoryLevelContracts.remove)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .delete(inventoryLevels)
      .where(eq(inventoryLevels.id, input))
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return { success: true };
  });
