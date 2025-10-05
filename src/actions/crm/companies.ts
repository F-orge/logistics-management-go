import { createServerFn } from '@tanstack/react-start';
import { DrizzleError, DrizzleQueryError, eq } from 'drizzle-orm';
import z from 'zod';
import { db } from '@/db';
import { crmCompanies } from '@/db/schemas';
import {
  selectCompanySchema,
  updateCompanySchema,
} from '@/db/schemas/crm/companies';
import { selectSchema } from '@/lib/utils';

export const selectCompanies = createServerFn({ method: 'GET' })
  .inputValidator(selectSchema(selectCompanySchema.keyof()))
  .handler(async ({ context, data }) => {
    return await db
      .select()
      .from(crmCompanies)
      .limit(data.perPage)
      .offset((data.page - 1) * data.perPage)
      .execute();
  });

export const editCompany = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string(), payload: updateCompanySchema }))
  .handler(async ({ data }) => {
    return await db
      .update(crmCompanies)
      .set(data.payload)
      .where(eq(crmCompanies.id, data.id))
      .returning()
      .execute()[0];
  });

export const removeCompany = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    try {
      return await db
        .delete(crmCompanies)
        .where(eq(crmCompanies.id, data.id))
        .execute();
    } catch (e) {
      if (e instanceof DrizzleQueryError) {
        throw new Error(e.cause?.message);
      }
    }
  });
