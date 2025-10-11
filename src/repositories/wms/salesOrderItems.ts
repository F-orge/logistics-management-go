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

export class SalesOrderItemRepository
  implements GenericRepository<'wms.salesOrderItems'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.salesOrderItems'> | undefined,
    filter?: FilterConfig<'wms.salesOrderItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.salesOrderItems',
    {
      createdAt: Date | null;
      id: string;
      productId: string;
      quantityOrdered: number;
      salesOrderId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'wms.salesOrderItems'> | undefined,
    filter?: FilterConfig<'wms.salesOrderItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.salesOrderItems',
    {
      createdAt: Date | null;
      id: string;
      productId: string;
      quantityOrdered: number;
      salesOrderId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'wms.salesOrderItems',
    {
      createdAt: Date | null;
      id: string;
      productId: string;
      quantityOrdered: number;
      salesOrderId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  create(
    value: {
      productId: string;
      quantityOrdered: number;
      salesOrderId: string;
    } & {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.salesOrderItems',
    {
      createdAt: Date | null;
      id: string;
      productId: string;
      quantityOrdered: number;
      salesOrderId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      productId?: string | undefined;
      quantityOrdered?: number | undefined;
      salesOrderId?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.salesOrderItems',
    'wms.salesOrderItems',
    {
      createdAt: Date | null;
      id: string;
      productId: string;
      quantityOrdered: number;
      salesOrderId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'wms.salesOrderItems', DeleteResult> {
    throw new Error('Method not implemented.');
  }
}

export class WmsSalesOrderItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.salesOrderItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.salesOrderItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.salesOrderItems')
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
      builder = builder.where('wms.salesOrderItems.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.salesOrderItems']>) {
    return this.db
      .insertInto('wms.salesOrderItems')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.salesOrderItems']>[]) {
    return this.db
      .insertInto('wms.salesOrderItems')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.salesOrderItems']['id']['__update__'],
    value: Updateable<DB['wms.salesOrderItems']>,
  ) {
    return this.db
      .updateTable('wms.salesOrderItems')
      .set(value)
      .where('wms.salesOrderItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.salesOrderItems']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.salesOrderItems')
      .where('wms.salesOrderItems.id', '=', id);
  }
}
