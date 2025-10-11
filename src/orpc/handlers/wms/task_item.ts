import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/task_item';
import { TaskItemRepository } from '@/repositories/wms/taskItems';
import { HonoVariables } from '@/server';

export const paginateTaskItem = implement(wmsContracts.paginateTaskItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaskItemRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeTaskItem = implement(wmsContracts.rangeTaskItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaskItemRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inTaskItem = implement(wmsContracts.inTaskItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaskItemRepository(context.db);

    return repo.in(input).execute();
  });

export const createTaskItem = implement(wmsContracts.createTaskItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaskItemRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateTaskItem = implement(wmsContracts.updateTaskItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaskItemRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteTaskItem = implement(wmsContracts.deleteTaskItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaskItemRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
