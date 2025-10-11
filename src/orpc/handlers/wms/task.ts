import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms';
import { WmsTaskRepository } from '@/repositories/wms/tasks';
import { HonoVariables } from '@/server';

export const paginateTask = implement(wmsContracts.paginateTaskContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsTaskRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeTask = implement(wmsContracts.rangeTaskContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsTaskRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inTask = implement(wmsContracts.inTaskContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsTaskRepository(context.db);

    return repo.in(input).execute();
  });

export const createTask = implement(wmsContracts.createTaskContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsTaskRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateTask = implement(
  wmsContracts.updateTaskContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsTaskRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteTask = implement(
  wmsContracts.deleteTaskContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsTaskRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
