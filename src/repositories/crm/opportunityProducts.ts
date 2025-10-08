import {
  DeleteQueryBuilder,
  DeleteResult,
  Insertable,
  InsertQueryBuilder,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  SelectQueryBuilder,
  Updateable,
  UpdateQueryBuilder,
} from 'kysely';
import { DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class OpportunityProductRepository
  implements GenericRepository<'crm.opportunityProducts'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.opportunityProducts'> | undefined,
    filter?: FilterConfig<'crm.opportunityProducts'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.opportunityProducts',
    { id: string; opportunityId: string; productId: string; quantity: number }
  > {
    let query = this.db.selectFrom('crm.opportunityProducts').selectAll();

    if (limit) query = query.limit(limit);

    if (page && limit) query = query.offset((page - 1) * limit);

    for (const sortCol of sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order);
    }

    for (const filterCol of filter || []) {
      query = query.where(
        filterCol.column,
        filterCol.operation,
        filterCol.value,
      );
    }

    return query;
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'crm.opportunityProducts'> | undefined,
    filter?: FilterConfig<'crm.opportunityProducts'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.opportunityProducts',
    { id: string; opportunityId: string; productId: string; quantity: number }
  > {
    throw new Error('Cannot be implemented since this is a sub table');
  }
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'crm.opportunityProducts',
    { id: string; opportunityId: string; productId: string; quantity: number }
  > {
    return this.db
      .selectFrom('crm.opportunityProducts')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { opportunityId: string; productId: string; quantity: number } & {
      id?: string | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'crm.opportunityProducts',
    { id: string; opportunityId: string; productId: string; quantity: number }
  > {
    return this.db
      .insertInto('crm.opportunityProducts')
      .values(value)
      .returningAll();
  }
  update(
    id: string,
    value: {
      id?: string | undefined;
      opportunityId?: string | undefined;
      productId?: string | undefined;
      quantity?: number | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.opportunityProducts',
    'crm.opportunityProducts',
    { id: string; opportunityId: string; productId: string; quantity: number }
  > {
    return this.db
      .updateTable('crm.opportunityProducts')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'crm.opportunityProducts', DeleteResult> {
    return this.db.deleteFrom('crm.opportunityProducts').where('id', '=', id);
  }
}

export class CrmOpportunityProductRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.opportunityProducts'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.opportunityProducts', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.opportunityProducts')
      .limit(perPage)
      .offset((page - 1) * perPage);

    if (fields) {
      builder = builder.select(fields);
    } else {
      builder = builder.selectAll();
    }

    // sort
    for (const field of sort || []) {
      builder = builder.orderBy(field.field, field.order);
    }

    if (search)
      builder = builder.where(
        'crm.opportunityProducts.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['crm.opportunityProducts']>) {
    return this.db
      .insertInto('crm.opportunityProducts')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['crm.opportunityProducts']>[]) {
    return this.db
      .insertInto('crm.opportunityProducts')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['crm.opportunityProducts']['id']['__update__'],
    value: Updateable<DB['crm.opportunityProducts']>,
  ) {
    return this.db
      .updateTable('crm.opportunityProducts')
      .set(value)
      .where('crm.opportunityProducts.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.opportunityProducts']['id']['__update__']) {
    return this.db
      .deleteFrom('crm.opportunityProducts')
      .where('crm.opportunityProducts.id', '=', id);
  }
}
