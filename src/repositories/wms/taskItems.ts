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
import { DB, WmsTaskItemStatusEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class TaskItemRepository implements GenericRepository<'wms.taskItems'> {
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.taskItems'> | undefined,
    filter?: FilterConfig<'wms.taskItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.taskItems',
    {
      batchId: string | null;
      completedAt: Date | null;
      createdAt: Date | null;
      destinationLocationId: string | null;
      expiryDate: Date | null;
      id: string;
      lotNumber: string | null;
      notes: string | null;
      productId: string;
      quantityCompleted: number;
      quantityRemaining: number | null;
      quantityRequired: number;
      serialNumbers: string[] | null;
      sourceLocationId: string | null;
      status: WmsTaskItemStatusEnum | null;
      taskId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'wms.taskItems'> | undefined,
    filter?: FilterConfig<'wms.taskItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.taskItems',
    {
      batchId: string | null;
      completedAt: Date | null;
      createdAt: Date | null;
      destinationLocationId: string | null;
      expiryDate: Date | null;
      id: string;
      lotNumber: string | null;
      notes: string | null;
      productId: string;
      quantityCompleted: number;
      quantityRemaining: number | null;
      quantityRequired: number;
      serialNumbers: string[] | null;
      sourceLocationId: string | null;
      status: WmsTaskItemStatusEnum | null;
      taskId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'wms.taskItems',
    {
      batchId: string | null;
      completedAt: Date | null;
      createdAt: Date | null;
      destinationLocationId: string | null;
      expiryDate: Date | null;
      id: string;
      lotNumber: string | null;
      notes: string | null;
      productId: string;
      quantityCompleted: number;
      quantityRemaining: number | null;
      quantityRequired: number;
      serialNumbers: string[] | null;
      sourceLocationId: string | null;
      status: WmsTaskItemStatusEnum | null;
      taskId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  create(
    value: { productId: string; quantityRequired: number; taskId: string } & {
      batchId?: string | null | undefined;
      completedAt?: string | Date | null | undefined;
      createdAt?: string | Date | null | undefined;
      destinationLocationId?: string | null | undefined;
      expiryDate?: string | Date | null | undefined;
      id?: string | undefined;
      lotNumber?: string | null | undefined;
      notes?: string | null | undefined;
      quantityCompleted?: number | undefined;
      quantityRemaining?: number | null | undefined;
      serialNumbers?: string[] | null | undefined;
      sourceLocationId?: string | null | undefined;
      status?: WmsTaskItemStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.taskItems',
    {
      batchId: string | null;
      completedAt: Date | null;
      createdAt: Date | null;
      destinationLocationId: string | null;
      expiryDate: Date | null;
      id: string;
      lotNumber: string | null;
      notes: string | null;
      productId: string;
      quantityCompleted: number;
      quantityRemaining: number | null;
      quantityRequired: number;
      serialNumbers: string[] | null;
      sourceLocationId: string | null;
      status: WmsTaskItemStatusEnum | null;
      taskId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    value: {
      batchId?: string | null | undefined;
      completedAt?: string | Date | null | undefined;
      createdAt?: string | Date | null | undefined;
      destinationLocationId?: string | null | undefined;
      expiryDate?: string | Date | null | undefined;
      id?: string | undefined;
      lotNumber?: string | null | undefined;
      notes?: string | null | undefined;
      productId?: string | undefined;
      quantityCompleted?: number | undefined;
      quantityRemaining?: number | null | undefined;
      quantityRequired?: number | undefined;
      serialNumbers?: string[] | null | undefined;
      sourceLocationId?: string | null | undefined;
      status?: WmsTaskItemStatusEnum | null | undefined;
      taskId?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.taskItems',
    'wms.taskItems',
    {
      batchId: string | null;
      completedAt: Date | null;
      createdAt: Date | null;
      destinationLocationId: string | null;
      expiryDate: Date | null;
      id: string;
      lotNumber: string | null;
      notes: string | null;
      productId: string;
      quantityCompleted: number;
      quantityRemaining: number | null;
      quantityRequired: number;
      serialNumbers: string[] | null;
      sourceLocationId: string | null;
      status: WmsTaskItemStatusEnum | null;
      taskId: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.taskItems', DeleteResult> {
    throw new Error('Method not implemented.');
  }
}

export class WmsTaskItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.taskItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.taskItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.taskItems')
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
      builder = builder.where('wms.taskItems.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.taskItems']>) {
    return this.db.insertInto('wms.taskItems').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.taskItems']>[]) {
    return this.db.insertInto('wms.taskItems').values(values).returningAll();
  }

  update(
    id: DB['wms.taskItems']['id']['__update__'],
    value: Updateable<DB['wms.taskItems']>,
  ) {
    return this.db
      .updateTable('wms.taskItems')
      .set(value)
      .where('wms.taskItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.taskItems']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.taskItems')
      .where('wms.taskItems.id', '=', id);
  }
}
