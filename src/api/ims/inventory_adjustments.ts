import { implement, ORPCError } from '@orpc/server';
import { eq } from 'drizzle-orm';
import * as inventoryAdjustmentContracts from '@/contracts/ims/inventory_adjustments';
import { inventoryAdjustments } from '@/db/schemas';

export const create = implement(inventoryAdjustmentContracts.create)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .insert(inventoryAdjustments)
      .values({ ...input })
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Unable to create inventory adjustment',
      });
    return result[0]!;
  });

export const list = implement(inventoryAdjustmentContracts.list)
  .$context<GlobalVariables>()
  .handler(async ({ context }) => {
    const results = await context.db
      .select()
      .from(inventoryAdjustments)
      .execute();
    return results;
  });

export const view = implement(inventoryAdjustmentContracts.view)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .select()
      .from(inventoryAdjustments)
      .where(eq(inventoryAdjustments.id, input))
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return result[0];
  });

export const update = implement(inventoryAdjustmentContracts.update)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .update(inventoryAdjustments)
      .set(input.value)
      .where(eq(inventoryAdjustments.id, input.id))
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return result[0];
  });

export const remove = implement(inventoryAdjustmentContracts.remove)
  .$context<GlobalVariables>()
  .handler(async ({ input, context }) => {
    const result = await context.db
      .delete(inventoryAdjustments)
      .where(eq(inventoryAdjustments.id, input))
      .returning()
      .execute();
    if (!result.length)
      throw new ORPCError('NOT_FOUND', { message: 'resource not found' });
    return { success: true };
  });
