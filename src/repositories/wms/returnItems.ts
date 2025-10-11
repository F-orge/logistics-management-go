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
import { DB, WmsReturnItemConditionEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class ReturnItemRepository
  implements GenericRepository<'wms.returnItems'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.returnItems'> | undefined,
    filter?: FilterConfig<'wms.returnItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.returnItems',
    {
      condition: WmsReturnItemConditionEnum | null;
      createdAt: Date | null;
      id: string;
      productId: string;
      quantityExpected: number;
      quantityReceived: number | null;
      quantityVariance: number | null;
      returnId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'wms.returnItems'> | undefined,
    filter?: FilterConfig<'wms.returnItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.returnItems',
    {
      condition: WmsReturnItemConditionEnum | null;
      createdAt: Date | null;
      id: string;
      productId: string;
      quantityExpected: number;
      quantityReceived: number | null;
      quantityVariance: number | null;
      returnId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'wms.returnItems',
    {
      condition: WmsReturnItemConditionEnum | null;
      createdAt: Date | null;
      id: string;
      productId: string;
      quantityExpected: number;
      quantityReceived: number | null;
      quantityVariance: number | null;
      returnId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  create(
    value: { productId: string; quantityExpected: number; returnId: string } & {
      condition?: WmsReturnItemConditionEnum | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      quantityReceived?: number | null | undefined;
      quantityVariance?: number | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.returnItems',
    {
      condition: WmsReturnItemConditionEnum | null;
      createdAt: Date | null;
      id: string;
      productId: string;
      quantityExpected: number;
      quantityReceived: number | null;
      quantityVariance: number | null;
      returnId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    value: {
      condition?: WmsReturnItemConditionEnum | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      productId?: string | undefined;
      quantityExpected?: number | undefined;
      quantityReceived?: number | null | undefined;
      quantityVariance?: number | null | undefined;
      returnId?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.returnItems',
    'wms.returnItems',
    {
      condition: WmsReturnItemConditionEnum | null;
      createdAt: Date | null;
      id: string;
      productId: string;
      quantityExpected: number;
      quantityReceived: number | null;
      quantityVariance: number | null;
      returnId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.returnItems', DeleteResult> {
    throw new Error('Method not implemented.');
  }
}

export class WmsReturnItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.returnItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.returnItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.returnItems')
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
      builder = builder.where('wms.returnItems.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.returnItems']>) {
    return this.db.insertInto('wms.returnItems').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.returnItems']>[]) {
    return this.db.insertInto('wms.returnItems').values(values).returningAll();
  }

  update(
    id: DB['wms.returnItems']['id']['__update__'],
    value: Updateable<DB['wms.returnItems']>,
  ) {
    return this.db
      .updateTable('wms.returnItems')
      .set(value)
      .where('wms.returnItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.returnItems']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.returnItems')
      .where('wms.returnItems.id', '=', id);
  }
}
