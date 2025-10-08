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

export class TagRepository implements GenericRepository<'crm.tags'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.tags'> | undefined,
    filter?: FilterConfig<'crm.tags'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.tags',
    { createdAt: Date | null; id: string; name: string; updatedAt: Date | null }
  > {
    let query = this.db.selectFrom('crm.tags').selectAll();

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
    sort?: SortConfig<'crm.tags'> | undefined,
    filter?: FilterConfig<'crm.tags'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.tags',
    { createdAt: Date | null; id: string; name: string; updatedAt: Date | null }
  > {
    let query = this.db
      .selectFrom('crm.tags')
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
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'crm.tags',
    { createdAt: Date | null; id: string; name: string; updatedAt: Date | null }
  > {
    return this.db.selectFrom('crm.tags').selectAll().where('id', 'in', values);
  }
  create(
    value: { name: string } & {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'crm.tags',
    { createdAt: Date | null; id: string; name: string; updatedAt: Date | null }
  > {
    return this.db.insertInto('crm.tags').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      name?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.tags',
    'crm.tags',
    { createdAt: Date | null; id: string; name: string; updatedAt: Date | null }
  > {
    return this.db
      .updateTable('crm.tags')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'crm.tags', DeleteResult> {
    return this.db.deleteFrom('crm.tags').where('id', '=', id);
  }
}

export class CrmTagRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.tags'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.tags', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.tags')
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

    if (search) builder = builder.where('crm.tags.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.tags']>) {
    return this.db.insertInto('crm.tags').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.tags']>[]) {
    return this.db.insertInto('crm.tags').values(values).returningAll();
  }

  update(
    id: DB['crm.tags']['id']['__update__'],
    value: Updateable<DB['crm.tags']>,
  ) {
    return this.db
      .updateTable('crm.tags')
      .set(value)
      .where('crm.tags.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.tags']['id']['__update__']) {
    return this.db.deleteFrom('crm.tags').where('crm.tags.id', '=', id);
  }
}
