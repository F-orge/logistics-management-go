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

export class InventoryBatchRepository
  implements GenericRepository<'wms.inventoryBatches'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.inventoryBatches'> | undefined,
    filter?: FilterConfig<'wms.inventoryBatches'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.inventoryBatches',
    {
      batchNumber: string;
      createdAt: Date | null;
      expirationDate: Date | null;
      id: string;
      productId: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('wms.inventoryBatches').selectAll();

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
    sort?: SortConfig<'wms.inventoryBatches'> | undefined,
    filter?: FilterConfig<'wms.inventoryBatches'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.inventoryBatches',
    {
      batchNumber: string;
      createdAt: Date | null;
      expirationDate: Date | null;
      id: string;
      productId: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('wms.inventoryBatches')
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
    'wms.inventoryBatches',
    {
      batchNumber: string;
      createdAt: Date | null;
      expirationDate: Date | null;
      id: string;
      productId: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('wms.inventoryBatches')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { batchNumber: string; productId: string } & {
      createdAt?: string | Date | null | undefined;
      expirationDate?: string | Date | null | undefined;
      id?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.inventoryBatches',
    {
      batchNumber: string;
      createdAt: Date | null;
      expirationDate: Date | null;
      id: string;
      productId: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .insertInto('wms.inventoryBatches')
      .values(value)
      .returningAll();
  }
  update(
    id: string,
    value: {
      batchNumber?: string | undefined;
      createdAt?: string | Date | null | undefined;
      expirationDate?: string | Date | null | undefined;
      id?: string | undefined;
      productId?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.inventoryBatches',
    'wms.inventoryBatches',
    {
      batchNumber: string;
      createdAt: Date | null;
      expirationDate: Date | null;
      id: string;
      productId: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('wms.inventoryBatches')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'wms.inventoryBatches', DeleteResult> {
    return this.db.deleteFrom('wms.inventoryBatches').where('id', '=', id);
  }
}

export class WmsInventoryBatchRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.inventoryBatches'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.inventoryBatches', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.inventoryBatches')
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
      builder = builder.where('wms.inventoryBatches.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.inventoryBatches']>) {
    return this.db
      .insertInto('wms.inventoryBatches')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.inventoryBatches']>[]) {
    return this.db
      .insertInto('wms.inventoryBatches')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.inventoryBatches']['id']['__update__'],
    value: Updateable<DB['wms.inventoryBatches']>,
  ) {
    return this.db
      .updateTable('wms.inventoryBatches')
      .set(value)
      .where('wms.inventoryBatches.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.inventoryBatches']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.inventoryBatches')
      .where('wms.inventoryBatches.id', '=', id);
  }
}
