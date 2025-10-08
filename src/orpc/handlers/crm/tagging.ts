import { implement } from '@orpc/server';
import * as crmContracts from '@/orpc/contracts/crm';
import { HonoVariables } from '@/server';
import { TaggingRepository } from '@/repositories/crm/tagging';

export const paginateTagging = implement(crmContracts.paginateTaggingContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaggingRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeTagging = implement(crmContracts.rangeTaggingContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaggingRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inTagging = implement(crmContracts.inTaggingContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaggingRepository(context.db);

    return repo.in(input).execute();
  });

export const createTagging = implement(crmContracts.createTaggingContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaggingRepository(context.db);

    return repo.create(input).execute() as any;
  });

export const updateTagging = implement(crmContracts.updateTaggingContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaggingRepository(context.db);

    return repo.update(input.id, input.value).execute() as any;
  });

export const deleteTagging = implement(crmContracts.deleteTaggingContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TaggingRepository(context.db);

    return repo.delete(input).execute() as any;
  });
