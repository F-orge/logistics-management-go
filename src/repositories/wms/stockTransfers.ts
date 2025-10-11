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
import { DB, WmsStockTransferStatusEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class StockTransferRepository
  implements GenericRepository<'wms.stockTransfers'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.stockTransfers'> | undefined,
    filter?: FilterConfig<'wms.stockTransfers'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.stockTransfers',
    {
      createdAt: Date | null;
      destinationWarehouseId: string;
      id: string;
      productId: string;
      quantity: number;
      sourceWarehouseId: string;
      status: WmsStockTransferStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'wms.stockTransfers'> | undefined,
    filter?: FilterConfig<'wms.stockTransfers'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.stockTransfers',
    {
      createdAt: Date | null;
      destinationWarehouseId: string;
      id: string;
      productId: string;
      quantity: number;
      sourceWarehouseId: string;
      status: WmsStockTransferStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'wms.stockTransfers',
    {
      createdAt: Date | null;
      destinationWarehouseId: string;
      id: string;
      productId: string;
      quantity: number;
      sourceWarehouseId: string;
      status: WmsStockTransferStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  create(
    value: {
      destinationWarehouseId: string;
      productId: string;
      quantity: number;
      sourceWarehouseId: string;
    } & {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      status?: WmsStockTransferStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.stockTransfers',
    {
      createdAt: Date | null;
      destinationWarehouseId: string;
      id: string;
      productId: string;
      quantity: number;
      sourceWarehouseId: string;
      status: WmsStockTransferStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      destinationWarehouseId?: string | undefined;
      id?: string | undefined;
      productId?: string | undefined;
      quantity?: number | undefined;
      sourceWarehouseId?: string | undefined;
      status?: WmsStockTransferStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.stockTransfers',
    'wms.stockTransfers',
    {
      createdAt: Date | null;
      destinationWarehouseId: string;
      id: string;
      productId: string;
      quantity: number;
      sourceWarehouseId: string;
      status: WmsStockTransferStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'wms.stockTransfers', DeleteResult> {
    throw new Error('Method not implemented.');
  }
}

export class WmsStockTransferRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.stockTransfers'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.stockTransfers', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.stockTransfers')
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
      builder = builder.where('wms.stockTransfers.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.stockTransfers']>) {
    return this.db
      .insertInto('wms.stockTransfers')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.stockTransfers']>[]) {
    return this.db
      .insertInto('wms.stockTransfers')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.stockTransfers']['id']['__update__'],
    value: Updateable<DB['wms.stockTransfers']>,
  ) {
    return this.db
      .updateTable('wms.stockTransfers')
      .set(value)
      .where('wms.stockTransfers.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.stockTransfers']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.stockTransfers')
      .where('wms.stockTransfers.id', '=', id);
  }
}
