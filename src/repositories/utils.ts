import z, { ZodAny, type ZodObject, type ZodRawShape } from 'zod'
import { crmCompanySchema } from '@/schemas/crm/companies'

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
])

export const OrderByDirectionSchema = z.enum(['asc', 'desc'])

export const paginateTransformer = () =>
  z.object({
    page: z.number().nonnegative().default(1).catch(1),
    perPage: z.number().nonnegative().default(10).catch(10),
  })

export const filterTransformer = <T extends ZodRawShape>(schema: ZodObject<T>) => {
  return z
    .object({
      column: schema.keyof(),
      operation: ComparisonOperatorSchema,
      value: z.unknown().refine((value) => value !== undefined, {
        message: 'Value cannot be undefined',
      }),
    })
    .array()
    .optional()
    .default([])
}

export const sortTransformer = <T extends ZodRawShape>(schema: ZodObject<T>) => {
  return z
    .object({
      column: schema.keyof(),
      order: OrderByDirectionSchema,
    })
    .array()
    .optional()
}
