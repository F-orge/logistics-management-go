import { implement } from '@orpc/server';
import * as crmContracts from '@/orpc/contracts/crm';
import { NotificationRepository } from '@/repositories/crm/notifications';
import { HonoVariables } from '@/server';

export const paginateNotification = implement(
  crmContracts.paginateNotificationContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new NotificationRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeNotification = implement(
  crmContracts.rangeNotificationContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new NotificationRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inNotification = implement(crmContracts.inNotificationContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new NotificationRepository(context.db);

    return repo.in(input).execute();
  });

export const createNotification = implement(
  crmContracts.createNotificationContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new NotificationRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateNotification = implement(
  crmContracts.updateNotificationContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new NotificationRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteNotification = implement(
  crmContracts.deleteNotificationContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new NotificationRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
