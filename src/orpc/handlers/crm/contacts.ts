import { implement } from '@orpc/server';
import * as crmContracts from '@/orpc/contracts/crm';
import { HonoVariables } from '@/server';
import { ContactRepository } from '@/repositories/crm/contacts';

export const paginateContact = implement(crmContracts.paginateContactContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ContactRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeContact = implement(crmContracts.rangeContactContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ContactRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inContact = implement(crmContracts.inContactContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ContactRepository(context.db);

    return repo.in(input).execute();
  });

export const createContact = implement(crmContracts.createContactContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ContactRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateContact = implement(crmContracts.updateContactContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ContactRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteContact = implement(crmContracts.deleteContactContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ContactRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
