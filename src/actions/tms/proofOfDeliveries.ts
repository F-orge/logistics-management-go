import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsProofOfDeliveryRepository } from '@/repositories/tms/proofOfDeliveries';
import {
  tmsProofOfDeliveryInsertSchema,
  tmsProofOfDeliverySchema,
  tmsProofOfDeliveryUpdateSchema,
} from '@/schemas/tms/proof_of_delivery';

export const selectTmsProofOfDelivery = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsProofOfDeliverySchema))
  .handler(async ({ data }) => {
    const repo = new TmsProofOfDeliveryRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.proofOfDeliveries'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.proofOfDeliveries', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsProofOfDeliverySchema.array().parseAsync(result);
  });

export const createTmsProofOfDelivery = createServerFn({ method: 'POST' })
  .inputValidator(tmsProofOfDeliveryInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsProofOfDeliveryRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsProofOfDeliverySchema.parseAsync(result);
  });

export const updateTmsProofOfDelivery = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({ id: z.uuid(), value: tmsProofOfDeliveryUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const repo = new TmsProofOfDeliveryRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsProofOfDeliverySchema.parseAsync(result);
  });

export const removeTmsProofOfDelivery = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsProofOfDeliveryRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
