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
import { DB, TmsDriverStatusEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class DriverRepository implements GenericRepository<'tms.drivers'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.drivers'> | undefined,
    filter?: FilterConfig<'tms.drivers'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.drivers',
    {
      createdAt: Date | null;
      id: string;
      licenseExpiryDate: Date | null;
      licenseNumber: string;
      status: TmsDriverStatusEnum | null;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    let query = this.db.selectFrom('tms.drivers').selectAll();

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
    sort?: SortConfig<'tms.drivers'> | undefined,
    filter?: FilterConfig<'tms.drivers'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.drivers',
    {
      createdAt: Date | null;
      id: string;
      licenseExpiryDate: Date | null;
      licenseNumber: string;
      status: TmsDriverStatusEnum | null;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    let query = this.db
      .selectFrom('tms.drivers')
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
    'tms.drivers',
    {
      createdAt: Date | null;
      id: string;
      licenseExpiryDate: Date | null;
      licenseNumber: string;
      status: TmsDriverStatusEnum | null;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    return this.db
      .selectFrom('tms.drivers')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { licenseNumber: string; userId: string } & {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      licenseExpiryDate?: string | Date | null | undefined;
      status?: TmsDriverStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'tms.drivers',
    {
      createdAt: Date | null;
      id: string;
      licenseExpiryDate: Date | null;
      licenseNumber: string;
      status: TmsDriverStatusEnum | null;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    return this.db.insertInto('tms.drivers').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      licenseExpiryDate?: string | Date | null | undefined;
      licenseNumber?: string | undefined;
      status?: TmsDriverStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
      userId?: string | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.drivers',
    'tms.drivers',
    {
      createdAt: Date | null;
      id: string;
      licenseExpiryDate: Date | null;
      licenseNumber: string;
      status: TmsDriverStatusEnum | null;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    return this.db
      .updateTable('tms.drivers')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'tms.drivers', DeleteResult> {
    return this.db.deleteFrom('tms.drivers').where('id', '=', id);
  }
}

export class TmsDriverRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.drivers'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.drivers', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.drivers')
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
      builder = builder.where('tms.drivers.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.drivers']>) {
    return this.db.insertInto('tms.drivers').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.drivers']>[]) {
    return this.db.insertInto('tms.drivers').values(values).returningAll();
  }

  update(
    id: DB['tms.drivers']['id']['__update__'],
    value: Updateable<DB['tms.drivers']>,
  ) {
    return this.db
      .updateTable('tms.drivers')
      .set(value)
      .where('tms.drivers.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.drivers']['id']['__update__']) {
    return this.db.deleteFrom('tms.drivers').where('tms.drivers.id', '=', id);
  }
}
