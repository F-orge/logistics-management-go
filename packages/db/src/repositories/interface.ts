import type { DeleteResult, Kysely } from "kysely";
import { ZodObject, type ZodRawShape, z } from "zod";
import type { DB } from "@/db.types";

export const ComparisonOperatorSchema = z.enum([
  '=',
  '==',
  '!=',
  '<>',
  '>',
  '>=',
  '<',
  '<=',
  'in',
  'not in',
  'is',
  'is not',
  'like',
  'not like',
  'match',
  'ilike',
  'not ilike',
  '@>',
  '<@',
  '^@',
  '&&',
  '?',
  '?&',
  '?|',
  '!<',
  '!>',
  '<=>',
  '!~',
  '~',
  '~*',
  '!~*',
  '@@',
  '@@@',
  '!!',
  '<->',
  'regexp',
  'is distinct from',
  'is not distinct from',
]);

export const OrderByDirectionSchema = z.enum(['asc', 'desc']);

export const repositoryFactory = <Schema extends ZodRawShape,Table extends keyof DB>(table:Table,schema:ZodObject<Schema>) => {
  
  const paginateOptionSchema = z.object({
    page:z.number().optional().default(1),
    perPage:z.number().optional().default(10),
    filters:z.object({
      column:schema.keyof(),
      operator:ComparisonOperatorSchema,
      value: z.unknown().refine((value) => value !== undefined, {
        message: 'Value cannot be undefined',
      })
    }).array().optional(),
    sort:z.object({
      column:schema.keyof(),
      order:OrderByDirectionSchema
    }).array().optional()
  })

  const rangeOptionSchema = z.object({
    from:z.date(),
    to:z.date(),
    filters:z.object({
      column:schema.keyof(),
      operator:ComparisonOperatorSchema,
      value: z.unknown().refine((value) => value !== undefined, {
        message: 'Value cannot be undefined',
      })
    }).array().optional(),
    sort:z.object({
      column:schema.keyof(),
      order:OrderByDirectionSchema
    }).array().optional()
  })

  const InsertSchema = schema.omit({id:true,createdAt:true,updatedAt:true})

  const UpdateSchema = InsertSchema.partial()

  const fns = (kysely:Kysely<DB>) => {

  const paginate = async (options:z.infer<typeof paginateOptionSchema>):Promise<Array<z.infer<typeof schema>>> => {

    let query = kysely.selectFrom(table as any).selectAll();

    if (options.perPage) query = query.limit(options.perPage);

    if (options.page && options.perPage) query = query.offset((options.page - 1) * options.perPage);

    for (const sortCol of options.sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order);
    }

    for (const filterCol of options.filters || []) {
      query = query.where(
        filterCol.column,
        filterCol.operator,
        filterCol.value as any,
      );
    }

    return query.execute() as any
  }

  const range = async (options:z.infer<typeof rangeOptionSchema>):Promise<Array<z.infer<typeof schema>>> => {
    let query = kysely
      .selectFrom(table as any)
      .selectAll()
      .where('createdAt', '>=', options.from)
      .where('createdAt', '<=', options.to);

    for (const sortCol of options.sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order);
    }

    for (const filterCol of options.filters || []) {
      query = query.where(
        filterCol.column,
        filterCol.operator,
        filterCol.value as any,
      );
    }

    return query.execute() as any
  }

  const insert = async (value:z.infer<typeof InsertSchema>): Promise<z.infer<typeof schema>> => {
    return await kysely.insertInto(table as any).values(value).returningAll().executeTakeFirstOrThrow() as any
  }

  const insertMany = async (values:z.infer<typeof InsertSchema>[]): Promise<Array<z.infer<typeof schema>>> => {
    return await kysely.insertInto(table as any).values(values).returningAll().execute() as any
  }

  const update = async (id:string,value:z.infer<typeof UpdateSchema>): Promise<z.infer<typeof schema>> => {
    return await kysely.updateTable(table as any).set(value).where('id','=',id).returningAll().executeTakeFirstOrThrow() as any
  }

  const remove = async (id:string): Promise<DeleteResult> => {
    return await kysely.deleteFrom(table as any).where('id','=',id).executeTakeFirstOrThrow()
  }
    return {paginate,range,insert,insertMany,update,remove}
  }
  
  return {fns,schemas:{paginateOptionSchema,rangeOptionSchema,InsertSchema,UpdateSchema}}
}