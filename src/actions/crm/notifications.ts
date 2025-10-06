import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import {
  insertNotificationSchema,
  updateNotificationSchema,
} from '@/db/schemas';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmNotificationRepository } from '@/repositories/crm/notifications';
import { crmNotificationSchema } from '@/schemas/crm/notifications';

export const selectCrmNotification = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmNotificationSchema))
  .handler(async ({ data }) => {
    const repo = new CrmNotificationRepository(kyselyDb);
    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'crm.notifications'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.notifications', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmNotificationSchema.array().parseAsync(result);
  });

export const createCrmNotification = createServerFn({ method: 'POST' })
  .inputValidator(insertNotificationSchema)
  .handler(async ({ data }) => {
    const repo = new CrmNotificationRepository(kyselyDb);
    const result = await repo.create(data).executeTakeFirst();
    return crmNotificationSchema.parseAsync(result);
  });

export const updateCrmNotification = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: updateNotificationSchema }))
  .handler(async ({ data }) => {
    const repo = new CrmNotificationRepository(kyselyDb);
    const result = await repo.update(data.id, data.value).executeTakeFirst();
    return crmNotificationSchema.parseAsync(result);
  });

export const removeCrmNotification = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new CrmNotificationRepository(kyselyDb);
    const result = await repo.delete(data.id).executeTakeFirst();
    return result;
  });
// Server actions for CRM notifications will follow the contacts.ts pattern.
