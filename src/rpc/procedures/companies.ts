import { z } from 'zod/v4';
import { authenticatedProcedures, router } from '..';
import { TRPCError } from '@trpc/server';

export const companySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  type: z.enum(['customer', 'supplier', 'carrier', 'internal']),
  address: z.string().optional(),
  contactEmail: z.email().optional(),
  contactPhone: z.string().optional(),
  primaryContactPerson: z.uuid().optional(),
  created: z.date(),
  updated: z.date(),
});

export const companyRouter = router({
  create: authenticatedProcedures
    .input(companySchema.omit({ id: true, created: true, updated: true }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const newCompany = await db
        .insertInto('companies')
        .defaultValues()
        .values(input)
        .returningAll()
        .executeTakeFirst();

      if (!newCompany) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      return await companySchema.parseAsync(newCompany);
    }),
  list: authenticatedProcedures
    .input(
      z.object({
        page: z.number().min(0).default(0).catch(0),
        limit: z.number().min(10).default(10).catch(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const companies = await db
        .selectFrom('companies')
        .selectAll()
        .offset(input.page)
        .limit(input.limit)
        .execute();

      return await z.array(companySchema).parseAsync(companies);
    }),
  view: authenticatedProcedures
    .input(z.object({ id: z.uuid() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      const company = await db
        .selectFrom('companies')
        .selectAll()
        .where('id', '=', input.id)
        .executeTakeFirst();

      if (!company) throw new TRPCError({ code: 'NOT_FOUND' });

      return await companySchema.parseAsync(company);
    }),
  update: authenticatedProcedures
    .input(
      companySchema
        .omit({ created: true, updated: true })
        .partial()
        .required({ id: true }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const { id, ...restInput } = input;

      const updatedCompany = await db
        .updateTable('companies')
        .set(restInput)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();

      if (!updatedCompany)
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      return await companySchema.parseAsync(updatedCompany);
    }),
  delete: authenticatedProcedures
    .input(z.object({ id: z.uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const deletedCompany = await db
        .deleteFrom('companies')
        .where('id', '=', input.id)
        .executeTakeFirst();

      if (deletedCompany.numDeletedRows !== 1n)
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

      return deletedCompany;
    }),
});
