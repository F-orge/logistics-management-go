import { implement } from '@orpc/server';
import * as wmsContracts from '@/orpc/contracts/wms';
import { WmsPackageRepository } from '@/repositories/wms/packages';
import { HonoVariables } from '@/server';

export const paginatePackage = implement(wmsContracts.paginatePackageContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsPackageRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangePackage = implement(wmsContracts.rangePackageContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsPackageRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inPackage = implement(wmsContracts.inPackageContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsPackageRepository(context.db);

    return repo.in(input).execute();
  });

export const createPackage = implement(wmsContracts.createPackageContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsPackageRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updatePackage = implement(
  wmsContracts.updatePackageContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsPackageRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deletePackage = implement(
  wmsContracts.deletePackageContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new WmsPackageRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
