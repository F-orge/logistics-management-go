import { implement } from '@orpc/server';
import * as dmsContracts from '@/orpc/contracts/dms/task_event';
import { TaskEventRepository } from '@/repositories/dms/taskEvents';
import { HonoVariables } from '@/server';

export const paginateTaskEvent = implement(
  dmsContracts.paginateTaskEventContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaskEventRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeTaskEvent = implement(dmsContracts.rangeTaskEventContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaskEventRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inTaskEvent = implement(dmsContracts.inTaskEventContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaskEventRepository(context.db);

    return repo.in(input).execute();
  });

export const createTaskEvent = implement(dmsContracts.createTaskEventContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaskEventRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateTaskEvent = implement(dmsContracts.updateTaskEventContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaskEventRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteTaskEvent = implement(dmsContracts.deleteTaskEventContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaskEventRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
