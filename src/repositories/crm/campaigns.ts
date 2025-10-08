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

export class CampaignRepository implements GenericRepository<'crm.campaigns'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.campaigns'> | undefined,
    filter?: FilterConfig<'crm.campaigns'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.campaigns',
    {
      budget: string | null;
      createdAt: Date | null;
      endDate: Date | null;
      id: string;
      name: string;
      startDate: Date | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('crm.campaigns').selectAll();

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
    sort?: SortConfig<'crm.campaigns'> | undefined,
    filter?: FilterConfig<'crm.campaigns'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.campaigns',
    {
      budget: string | null;
      createdAt: Date | null;
      endDate: Date | null;
      id: string;
      name: string;
      startDate: Date | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('crm.campaigns')
      .selectAll()
      .where('createdAt', '>=', from)
      .where('createdAt', '<=', to);

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
  in(values: string[]): SelectQueryBuilder<
    DB,
    'crm.campaigns',
    {
      budget: string | null;
      createdAt: Date | null;
      endDate: Date | null;
      id: string;
      name: string;
      startDate: Date | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('crm.campaigns')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { name: string } & {
      budget?: string | number | null | undefined;
      createdAt?: string | Date | null | undefined;
      endDate?: string | Date | null | undefined;
      id?: string | undefined;
      startDate?: string | Date | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'crm.campaigns',
    {
      budget: string | null;
      createdAt: Date | null;
      endDate: Date | null;
      id: string;
      name: string;
      startDate: Date | null;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('crm.campaigns').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      budget?: string | number | null | undefined;
      createdAt?: string | Date | null | undefined;
      endDate?: string | Date | null | undefined;
      id?: string | undefined;
      name?: string | undefined;
      startDate?: string | Date | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.campaigns',
    'crm.campaigns',
    {
      budget: string | null;
      createdAt: Date | null;
      endDate: Date | null;
      id: string;
      name: string;
      startDate: Date | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('crm.campaigns')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'crm.campaigns', DeleteResult> {
    return this.db.deleteFrom('crm.campaigns').where('id', '=', id);
  }
}

export class CrmCampaignRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.campaigns'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.campaigns', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.campaigns')
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
      builder = builder.where('crm.campaigns.name', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.campaigns']>) {
    return this.db.insertInto('crm.campaigns').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.campaigns']>[]) {
    return this.db.insertInto('crm.campaigns').values(values).returningAll();
  }

  update(
    id: DB['crm.campaigns']['id']['__update__'],
    value: Updateable<DB['crm.campaigns']>,
  ) {
    return this.db
      .updateTable('crm.campaigns')
      .set(value)
      .where('crm.campaigns.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.campaigns']['id']['__update__']) {
    return this.db
      .deleteFrom('crm.campaigns')
      .where('crm.campaigns.id', '=', id);
  }
}
