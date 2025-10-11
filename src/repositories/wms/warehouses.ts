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

export class WarehouseRepository
  implements GenericRepository<'wms.warehouses'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.warehouses'> | undefined,
    filter?: FilterConfig<'wms.warehouses'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.warehouses',
    {
      address: string | null;
      city: string | null;
      contactEmail: string | null;
      contactPerson: string | null;
      contactPhone: string | null;
      country: string | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      name: string;
      postalCode: string | null;
      state: string | null;
      timezone: string | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('wms.warehouses').selectAll();

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
    sort?: SortConfig<'wms.warehouses'> | undefined,
    filter?: FilterConfig<'wms.warehouses'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.warehouses',
    {
      address: string | null;
      city: string | null;
      contactEmail: string | null;
      contactPerson: string | null;
      contactPhone: string | null;
      country: string | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      name: string;
      postalCode: string | null;
      state: string | null;
      timezone: string | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('wms.warehouses')
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
    'wms.warehouses',
    {
      address: string | null;
      city: string | null;
      contactEmail: string | null;
      contactPerson: string | null;
      contactPhone: string | null;
      country: string | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      name: string;
      postalCode: string | null;
      state: string | null;
      timezone: string | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('wms.warehouses')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { name: string } & {
      address?: string | null | undefined;
      city?: string | null | undefined;
      contactEmail?: string | null | undefined;
      contactPerson?: string | null | undefined;
      contactPhone?: string | null | undefined;
      country?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      postalCode?: string | null | undefined;
      state?: string | null | undefined;
      timezone?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.warehouses',
    {
      address: string | null;
      city: string | null;
      contactEmail: string | null;
      contactPerson: string | null;
      contactPhone: string | null;
      country: string | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      name: string;
      postalCode: string | null;
      state: string | null;
      timezone: string | null;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('wms.warehouses').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      address?: string | null | undefined;
      city?: string | null | undefined;
      contactEmail?: string | null | undefined;
      contactPerson?: string | null | undefined;
      contactPhone?: string | null | undefined;
      country?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      name?: string | undefined;
      postalCode?: string | null | undefined;
      state?: string | null | undefined;
      timezone?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.warehouses',
    'wms.warehouses',
    {
      address: string | null;
      city: string | null;
      contactEmail: string | null;
      contactPerson: string | null;
      contactPhone: string | null;
      country: string | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      name: string;
      postalCode: string | null;
      state: string | null;
      timezone: string | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('wms.warehouses')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.warehouses', DeleteResult> {
    return this.db.deleteFrom('wms.warehouses').where('id', '=', id);
  }
}

export class WmsWarehouseRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.warehouses'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.warehouses', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.warehouses')
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
      builder = builder.where('wms.warehouses.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.warehouses']>) {
    return this.db.insertInto('wms.warehouses').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.warehouses']>[]) {
    return this.db.insertInto('wms.warehouses').values(values).returningAll();
  }

  update(
    id: DB['wms.warehouses']['id']['__update__'],
    value: Updateable<DB['wms.warehouses']>,
  ) {
    return this.db
      .updateTable('wms.warehouses')
      .set(value)
      .where('wms.warehouses.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.warehouses']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.warehouses')
      .where('wms.warehouses.id', '=', id);
  }
}
