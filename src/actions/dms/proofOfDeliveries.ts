import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsProofOfDeliveryRepository } from '@/repositories/dms/proofOfDeliveries';
import {
  dmsProofOfDeliverySchema,
  dmsProofOfDeliveryInsertSchema,
  dmsProofOfDeliveryUpdateSchema,
} from '@/schemas/dms/proof_of_delivery';

export const selectDmsProofOfDelivery = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsProofOfDeliverySchema))
  .handler(async ({ data }) => {
    const repository = new DmsProofOfDeliveryRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'dms.proofOfDeliveries'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.proofOfDeliveries', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsProofOfDeliverySchema.array().parseAsync(result);
  });

export const createDmsProofOfDelivery = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsProofOfDeliveryInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsProofOfDeliveryRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsProofOfDeliverySchema.parseAsync(result);
  });

export const updateDmsProofOfDelivery = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: dmsProofOfDeliveryUpdateSchema }))
  .handler(async ({ data }) => {
    const repository = new DmsProofOfDeliveryRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)
      .executeTakeFirst();

    return dmsProofOfDeliverySchema.parseAsync(result);
  });

export const removeDmsProofOfDelivery = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsProofOfDeliveryRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
