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

export class BinThresholdRepository
  implements GenericRepository<'wms.binThresholds'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.binThresholds'> | undefined,
    filter?: FilterConfig<'wms.binThresholds'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.binThresholds',
    {
      alertThreshold: number | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      locationId: string;
      maxQuantity: number;
      minQuantity: number;
      productId: string;
      reorderQuantity: number | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('wms.binThresholds').selectAll();

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
    sort?: SortConfig<'wms.binThresholds'> | undefined,
    filter?: FilterConfig<'wms.binThresholds'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.binThresholds',
    {
      alertThreshold: number | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      locationId: string;
      maxQuantity: number;
      minQuantity: number;
      productId: string;
      reorderQuantity: number | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('wms.binThresholds')
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
    'wms.binThresholds',
    {
      alertThreshold: number | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      locationId: string;
      maxQuantity: number;
      minQuantity: number;
      productId: string;
      reorderQuantity: number | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('wms.binThresholds')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { locationId: string; maxQuantity: number; productId: string } & {
      alertThreshold?: number | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      minQuantity?: number | undefined;
      reorderQuantity?: number | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.binThresholds',
    {
      alertThreshold: number | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      locationId: string;
      maxQuantity: number;
      minQuantity: number;
      productId: string;
      reorderQuantity: number | null;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('wms.binThresholds').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      alertThreshold?: number | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      locationId?: string | undefined;
      maxQuantity?: number | undefined;
      minQuantity?: number | undefined;
      productId?: string | undefined;
      reorderQuantity?: number | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.binThresholds',
    'wms.binThresholds',
    {
      alertThreshold: number | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      locationId: string;
      maxQuantity: number;
      minQuantity: number;
      productId: string;
      reorderQuantity: number | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('wms.binThresholds')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'wms.binThresholds', DeleteResult> {
    return this.db.deleteFrom('wms.binThresholds').where('id', '=', id);
  }
}

export class WmsBinThresholdRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.binThresholds'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.binThresholds', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.binThresholds')
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
      builder = builder.where('wms.binThresholds.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.binThresholds']>) {
    return this.db.insertInto('wms.binThresholds').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.binThresholds']>[]) {
    return this.db
      .insertInto('wms.binThresholds')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.binThresholds']['id']['__update__'],
    value: Updateable<DB['wms.binThresholds']>,
  ) {
    return this.db
      .updateTable('wms.binThresholds')
      .set(value)
      .where('wms.binThresholds.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.binThresholds']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.binThresholds')
      .where('wms.binThresholds.id', '=', id);
  }
}
