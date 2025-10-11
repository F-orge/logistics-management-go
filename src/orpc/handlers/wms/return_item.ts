import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/return_item';
import { ReturnItemRepository } from '@/repositories/wms/returnItems';
import { HonoVariables } from '@/server';

export const paginateReturnItem = implement(
  wmsContracts.paginateReturnItemContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReturnItemRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeReturnItem = implement(wmsContracts.rangeReturnItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReturnItemRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inReturnItem = implement(wmsContracts.inReturnItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReturnItemRepository(context.db);

    return repo.in(input).execute();
  });

export const createReturnItem = implement(wmsContracts.createReturnItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReturnItemRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateReturnItem = implement(wmsContracts.updateReturnItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReturnItemRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteReturnItem = implement(wmsContracts.deleteReturnItemContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReturnItemRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
