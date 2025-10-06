import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmContactRepository } from '@/repositories/crm/contacts';
import {
  crmContactSchema,
  crmContactInsertSchema,
  crmContactUpdateSchema,
} from '@/schemas/crm/contacts';
import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';

export const selectCrmContact = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmContactSchema))
  .handler(async ({ data }) => {
    const contactRepository = new CrmContactRepository(kyselyDb);

    const result = await contactRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'crm.contacts'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.contacts', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmContactSchema.array().parseAsync(result);
  });

export const createCrmContact = createServerFn({
  method: 'POST',
})
  .inputValidator(crmContactInsertSchema)
  .handler(async ({ data }) => {
    const contactRepository = new CrmContactRepository(kyselyDb);

    const result = await contactRepository.create(data).executeTakeFirst();

    return crmContactSchema.parseAsync(result);
  });

export const updateCrmContact = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: crmContactUpdateSchema }))
  .handler(async ({ data }) => {
    const contactRepository = new CrmContactRepository(kyselyDb);

    const result = await contactRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return crmContactSchema.parseAsync(result);
  });

export const removeCrmContact = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const contactRepository = new CrmContactRepository(kyselyDb);

    const result = await contactRepository.delete(data.id).executeTakeFirst();

    return result;
  });
