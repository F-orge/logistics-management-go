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

export class SupplierRepository implements GenericRepository<'wms.suppliers'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.suppliers'> | undefined,
    filter?: FilterConfig<'wms.suppliers'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.suppliers',
    {
      contactPerson: string | null;
      createdAt: Date | null;
      email: string | null;
      id: string;
      name: string;
      phoneNumber: string | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('wms.suppliers').selectAll();

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
    sort?: SortConfig<'wms.suppliers'> | undefined,
    filter?: FilterConfig<'wms.suppliers'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.suppliers',
    {
      contactPerson: string | null;
      createdAt: Date | null;
      email: string | null;
      id: string;
      name: string;
      phoneNumber: string | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('wms.suppliers')
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
    'wms.suppliers',
    {
      contactPerson: string | null;
      createdAt: Date | null;
      email: string | null;
      id: string;
      name: string;
      phoneNumber: string | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('wms.suppliers')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { name: string } & {
      contactPerson?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      email?: string | null | undefined;
      id?: string | undefined;
      phoneNumber?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.suppliers',
    {
      contactPerson: string | null;
      createdAt: Date | null;
      email: string | null;
      id: string;
      name: string;
      phoneNumber: string | null;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('wms.suppliers').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      contactPerson?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      email?: string | null | undefined;
      id?: string | undefined;
      name?: string | undefined;
      phoneNumber?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.suppliers',
    'wms.suppliers',
    {
      contactPerson: string | null;
      createdAt: Date | null;
      email: string | null;
      id: string;
      name: string;
      phoneNumber: string | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('wms.suppliers')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.suppliers', DeleteResult> {
    return this.db.deleteFrom('wms.suppliers').where('id', '=', id);
  }
}

export class WmsSupplierRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.suppliers'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.suppliers', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.suppliers')
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
      builder = builder.where('wms.suppliers.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.suppliers']>) {
    return this.db.insertInto('wms.suppliers').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.suppliers']>[]) {
    return this.db.insertInto('wms.suppliers').values(values).returningAll();
  }

  update(
    id: DB['wms.suppliers']['id']['__update__'],
    value: Updateable<DB['wms.suppliers']>,
  ) {
    return this.db
      .updateTable('wms.suppliers')
      .set(value)
      .where('wms.suppliers.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.suppliers']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.suppliers')
      .where('wms.suppliers.id', '=', id);
  }
}
