import { createServerFn } from '@tanstack/react-start';
import {
  DrizzleError,
  DrizzleQueryError,
  eq,
  getTableColumns,
} from 'drizzle-orm';
import z from 'zod';
import { db } from '@/db';
import { crmCompanies } from '@/db/schemas';
import {
  selectCompanySchema,
  updateCompanySchema,
} from '@/db/schemas/crm/companies';
import {
  drizzleZodTransformer,
  selectServerQueryValidator,
  toDrizzleFields,
} from '@/lib/server-utils';

export const selectCompanies = createServerFn({ method: 'GET' })
  .inputValidator(selectServerQueryValidator(crmCompanies))
  .handler(async ({ context, data }) => {
    // Determine selected fields in a type-safe way
    const fields = toDrizzleFields(crmCompanies, data.fields);

    // Build the base query with selected fields (or all if none specified)
    let query = db
      .select(fields || getTableColumns(crmCompanies))
      .from(crmCompanies)
      .$dynamic();

    // Apply Zod validation and transformation (type-safe)
    query = drizzleZodTransformer(query, data);

    // Add pagination in a type-safe manner
    query = query.limit(data.perPage).offset((data.page - 1) * data.perPage);

    // Execute and return results, inferring the correct type from Drizzle
    return await query.execute();
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
