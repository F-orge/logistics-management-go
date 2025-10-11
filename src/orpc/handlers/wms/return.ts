import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms/return';
import { ReturnRepository } from '@/repositories/wms/returns';
import { HonoVariables } from '@/server';

export const paginateReturn = implement(wmsContracts.paginateReturnContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReturnRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeReturn = implement(wmsContracts.rangeReturnContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReturnRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inReturn = implement(wmsContracts.inReturnContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReturnRepository(context.db);

    return repo.in(input).execute();
  });

export const createReturn = implement(wmsContracts.createReturnContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReturnRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateReturn = implement(wmsContracts.updateReturnContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReturnRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteReturn = implement(wmsContracts.deleteReturnContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ReturnRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
