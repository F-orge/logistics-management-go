import { createServerFn, createServerOnlyFn } from '@tanstack/react-start';
import { asc, desc, SelectedFields, sql } from 'drizzle-orm';
import { PgSelect, PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import z, { ZodEnum } from 'zod';

export const serverAction = createServerFn();

export function drizzleZodTransformer<T extends PgSelect>(
  qb: T,
  options: z.infer<ReturnType<typeof selectServerQueryValidator>>,
) {
  let query = qb
    .limit(options.perPage)
    .offset((options.page - 1) * options.perPage);

  // sort
  for (const sortVal of options.sort || []) {
    if (sortVal.order === 'asc') {
      query = query.orderBy(asc(sql`${sortVal.field}`));
    } else {
      query = query.orderBy(desc(sql`${sortVal.field}`));
    }
  }

  return query;
}

export function toDrizzleFields<T extends PgTableWithColumns<any>>(
  table: T,
  options: z.infer<ReturnType<typeof selectServerQueryValidator>>['fields'],
) {
  let fieldObj: T['_']['columns'] = {};

  for (const field of options || []) {
    fieldObj[field] = table._.columns[field];
  }

  return fieldObj ? fieldObj : null;
}

export const selectServerQueryValidator = createServerOnlyFn(
  (table: PgTableWithColumns<any>) => {
    const tableSchema = createSelectSchema(table);

    return z.object({
      page: z.number().min(1).default(1).catch(1),
      perPage: z.number().min(10).default(10).catch(10),
      sort: z
        .array(
          z.object({
            field: tableSchema.keyof(),
            order: z.enum(['asc', 'desc']),
          }),
        )
        .optional(),
      fields: z.array(tableSchema.keyof()).optional(),
    });
  },
);
