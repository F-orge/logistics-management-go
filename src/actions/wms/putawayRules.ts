import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { WmsPutawayRuleRepository } from '@/repositories/wms/putawayRules';
import {
  wmsPutawayRuleInsertSchema,
  wmsPutawayRuleSchema,
  wmsPutawayRuleUpdateSchema,
} from '@/schemas/wms/putaway_rule';

export const selectWmsPutawayRules = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(wmsPutawayRuleSchema))
  .handler(async ({ data }) => {
    const putawayRuleRepository = new WmsPutawayRuleRepository(kyselyDb);

    const result = await putawayRuleRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'wms.putawayRules'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'wms.putawayRules', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return wmsPutawayRuleSchema.array().parseAsync(result);
  });

export const createWmsPutawayRule = createServerFn({
  method: 'POST',
})
  .inputValidator(wmsPutawayRuleInsertSchema)
  .handler(async ({ data }) => {
    const putawayRuleRepository = new WmsPutawayRuleRepository(kyselyDb);

    const result = await putawayRuleRepository.create(data).executeTakeFirst();

    return wmsPutawayRuleSchema.parseAsync(result);
  });

export const updateWmsPutawayRule = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: wmsPutawayRuleUpdateSchema }))
  .handler(async ({ data }) => {
    const putawayRuleRepository = new WmsPutawayRuleRepository(kyselyDb);

    const result = await putawayRuleRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return wmsPutawayRuleSchema.parseAsync(result);
  });

export const removeWmsPutawayRule = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const putawayRuleRepository = new WmsPutawayRuleRepository(kyselyDb);

    const result = await putawayRuleRepository.delete(data.id).executeTakeFirst();

    return result;
  });
