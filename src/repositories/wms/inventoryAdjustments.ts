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
import { DB, WmsInventoryAdjustmentReasonEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class InventoryAdjustmentRepository
  implements GenericRepository<'wms.inventoryAdjustments'>
{
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.inventoryAdjustments'> | undefined,
    filter?: FilterConfig<'wms.inventoryAdjustments'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.inventoryAdjustments',
    {
      createdAt: Date | null;
      id: string;
      notes: string | null;
      productId: string;
      quantityChange: number;
      reason: WmsInventoryAdjustmentReasonEnum | null;
      updatedAt: Date | null;
      userId: string;
      warehouseId: string;
    }
  > {
    throw new Error('Method not implemented.');
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'wms.inventoryAdjustments'> | undefined,
    filter?: FilterConfig<'wms.inventoryAdjustments'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.inventoryAdjustments',
    {
      createdAt: Date | null;
      id: string;
      notes: string | null;
      productId: string;
      quantityChange: number;
      reason: WmsInventoryAdjustmentReasonEnum | null;
      updatedAt: Date | null;
      userId: string;
      warehouseId: string;
    }
  > {
    throw new Error('Method not implemented.');
  }
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'wms.inventoryAdjustments',
    {
      createdAt: Date | null;
      id: string;
      notes: string | null;
      productId: string;
      quantityChange: number;
      reason: WmsInventoryAdjustmentReasonEnum | null;
      updatedAt: Date | null;
      userId: string;
      warehouseId: string;
    }
  > {
    throw new Error('Method not implemented.');
  }
  create(
    value: {
      productId: string;
      quantityChange: number;
      userId: string;
      warehouseId: string;
    } & {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      notes?: string | null | undefined;
      reason?: WmsInventoryAdjustmentReasonEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.inventoryAdjustments',
    {
      createdAt: Date | null;
      id: string;
      notes: string | null;
      productId: string;
      quantityChange: number;
      reason: WmsInventoryAdjustmentReasonEnum | null;
      updatedAt: Date | null;
      userId: string;
      warehouseId: string;
    }
  > {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      notes?: string | null | undefined;
      productId?: string | undefined;
      quantityChange?: number | undefined;
      reason?: WmsInventoryAdjustmentReasonEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
      userId?: string | undefined;
      warehouseId?: string | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.inventoryAdjustments',
    'wms.inventoryAdjustments',
    {
      createdAt: Date | null;
      id: string;
      notes: string | null;
      productId: string;
      quantityChange: number;
      reason: WmsInventoryAdjustmentReasonEnum | null;
      updatedAt: Date | null;
      userId: string;
      warehouseId: string;
    }
  > {
    throw new Error('Method not implemented.');
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'wms.inventoryAdjustments', DeleteResult> {
    throw new Error('Method not implemented.');
  }
}

export class WmsInventoryAdjustmentRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.inventoryAdjustments'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.inventoryAdjustments', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.inventoryAdjustments')
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
      builder = builder.where(
        'wms.inventoryAdjustments.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['wms.inventoryAdjustments']>) {
    return this.db
      .insertInto('wms.inventoryAdjustments')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.inventoryAdjustments']>[]) {
    return this.db
      .insertInto('wms.inventoryAdjustments')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.inventoryAdjustments']['id']['__update__'],
    value: Updateable<DB['wms.inventoryAdjustments']>,
  ) {
    return this.db
      .updateTable('wms.inventoryAdjustments')
      .set(value)
      .where('wms.inventoryAdjustments.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.inventoryAdjustments']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.inventoryAdjustments')
      .where('wms.inventoryAdjustments.id', '=', id);
  }
}
