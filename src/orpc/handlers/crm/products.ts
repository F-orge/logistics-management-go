import { implement } from '@orpc/server';
import * as crmContracts from '@/orpc/contracts/crm';
import { HonoVariables } from '@/server';
import { ProductRepository } from '@/repositories/crm/products';

export const paginateProduct = implement(crmContracts.paginateProductContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProductRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeProduct = implement(crmContracts.rangeProductContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProductRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inProduct = implement(crmContracts.inProductContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProductRepository(context.db);

    return repo.in(input).execute();
  });

export const createProduct = implement(crmContracts.createProductContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProductRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateProduct = implement(crmContracts.updateProductContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProductRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteProduct = implement(crmContracts.deleteProductContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProductRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
