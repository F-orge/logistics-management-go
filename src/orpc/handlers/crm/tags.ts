import { implement } from '@orpc/server';
import * as crmContracts from '@/orpc/contracts/crm';
import { HonoVariables } from '@/server';
import { TagRepository } from '@/repositories/crm/tags';

export const paginateTag = implement(crmContracts.paginateTagContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TagRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeTag = implement(crmContracts.rangeTagContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TagRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inTag = implement(crmContracts.inTagContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TagRepository(context.db);

    return repo.in(input).execute();
  });

export const createTag = implement(crmContracts.createTagContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TagRepository(context.db);

    return repo.create(input).execute() as any;
  });

export const updateTag = implement(crmContracts.updateTagContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TagRepository(context.db);

    return repo.update(input.id, input.value).execute() as any;
  });

export const deleteTag = implement(crmContracts.deleteTagContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new TagRepository(context.db);

    return repo.delete(input).execute() as any;
  });
