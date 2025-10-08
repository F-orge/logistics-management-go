import z, { ZodAny, ZodObject, ZodRawShape } from 'zod';
import { crmCompanySchema } from '@/schemas/crm/companies';

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

export const paginateTransformer = () =>
  z.object({
    page: z.number().default(1).optional(),
    perPage: z.number().default(10).optional(),
  });

export const filterTransformer = <T extends ZodRawShape>(
  schema: ZodObject<T>,
) => {
  return z
    .object({
      column: schema.keyof(),
      operator: ComparisonOperatorSchema,
      value: z.unknown(),
    })
    .array()
    .optional();
};

export const sortTransformer = <T extends ZodRawShape>(
  schema: ZodObject<T>,
) => {
  return z
    .object({
      column: schema.keyof(),
      order: OrderByDirectionSchema,
    })
    .array()
    .optional();
};
