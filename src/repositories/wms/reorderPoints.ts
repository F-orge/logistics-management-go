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

export class ReorderPointRepository
  implements GenericRepository<'wms.reorderPoints'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.reorderPoints'> | undefined,
    filter?: FilterConfig<'wms.reorderPoints'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.reorderPoints',
    {
      createdAt: Date | null;
      id: string;
      productId: string;
      threshold: number;
      updatedAt: Date | null;
      warehouseId: string;
    }
  > {
    let query = this.db.selectFrom('wms.reorderPoints').selectAll();

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
    sort?: SortConfig<'wms.reorderPoints'> | undefined,
    filter?: FilterConfig<'wms.reorderPoints'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.reorderPoints',
    {
      createdAt: Date | null;
      id: string;
      productId: string;
      threshold: number;
      updatedAt: Date | null;
      warehouseId: string;
    }
  > {
    let query = this.db
      .selectFrom('wms.reorderPoints')
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
    'wms.reorderPoints',
    {
      createdAt: Date | null;
      id: string;
      productId: string;
      threshold: number;
      updatedAt: Date | null;
      warehouseId: string;
    }
  > {
    return this.db
      .selectFrom('wms.reorderPoints')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { productId: string; threshold: number; warehouseId: string } & {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.reorderPoints',
    {
      createdAt: Date | null;
      id: string;
      productId: string;
      threshold: number;
      updatedAt: Date | null;
      warehouseId: string;
    }
  > {
    return this.db.insertInto('wms.reorderPoints').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      productId?: string | undefined;
      threshold?: number | undefined;
      updatedAt?: string | Date | null | undefined;
      warehouseId?: string | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.reorderPoints',
    'wms.reorderPoints',
    {
      createdAt: Date | null;
      id: string;
      productId: string;
      threshold: number;
      updatedAt: Date | null;
      warehouseId: string;
    }
  > {
    return this.db
      .updateTable('wms.reorderPoints')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'wms.reorderPoints', DeleteResult> {
    return this.db.deleteFrom('wms.reorderPoints').where('id', '=', id);
  }
}

export class WmsReorderPointRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.reorderPoints'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.reorderPoints', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.reorderPoints')
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
      builder = builder.where('wms.reorderPoints.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.reorderPoints']>) {
    return this.db.insertInto('wms.reorderPoints').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.reorderPoints']>[]) {
    return this.db
      .insertInto('wms.reorderPoints')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.reorderPoints']['id']['__update__'],
    value: Updateable<DB['wms.reorderPoints']>,
  ) {
    return this.db
      .updateTable('wms.reorderPoints')
      .set(value)
      .where('wms.reorderPoints.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.reorderPoints']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.reorderPoints')
      .where('wms.reorderPoints.id', '=', id);
  }
}
