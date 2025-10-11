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
import { DB, WmsPickBatchStatusEnum, WmsPickStrategyEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class PickBatchRepository
  implements GenericRepository<'wms.pickBatches'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.pickBatches'> | undefined,
    filter?: FilterConfig<'wms.pickBatches'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.pickBatches',
    {
      actualDuration: number | null;
      assignedUserId: string | null;
      batchNumber: string;
      completedAt: Date | null;
      completedItems: number | null;
      createdAt: Date | null;
      estimatedDuration: number | null;
      id: string;
      priority: number | null;
      startedAt: Date | null;
      status: WmsPickBatchStatusEnum | null;
      strategy: WmsPickStrategyEnum;
      totalItems: number | null;
      updatedAt: Date | null;
      warehouseId: string;
      waveId: string | null;
      zoneRestrictions: string[] | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'wms.pickBatches'> | undefined,
    filter?: FilterConfig<'wms.pickBatches'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.pickBatches',
    {
      actualDuration: number | null;
      assignedUserId: string | null;
      batchNumber: string;
      completedAt: Date | null;
      completedItems: number | null;
      createdAt: Date | null;
      estimatedDuration: number | null;
      id: string;
      priority: number | null;
      startedAt: Date | null;
      status: WmsPickBatchStatusEnum | null;
      strategy: WmsPickStrategyEnum;
      totalItems: number | null;
      updatedAt: Date | null;
      warehouseId: string;
      waveId: string | null;
      zoneRestrictions: string[] | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'wms.pickBatches',
    {
      actualDuration: number | null;
      assignedUserId: string | null;
      batchNumber: string;
      completedAt: Date | null;
      completedItems: number | null;
      createdAt: Date | null;
      estimatedDuration: number | null;
      id: string;
      priority: number | null;
      startedAt: Date | null;
      status: WmsPickBatchStatusEnum | null;
      strategy: WmsPickStrategyEnum;
      totalItems: number | null;
      updatedAt: Date | null;
      warehouseId: string;
      waveId: string | null;
      zoneRestrictions: string[] | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  create(
    value: {
      batchNumber: string;
      strategy: WmsPickStrategyEnum;
      warehouseId: string;
    } & {
      actualDuration?: number | null | undefined;
      assignedUserId?: string | null | undefined;
      completedAt?: string | Date | null | undefined;
      completedItems?: number | null | undefined;
      createdAt?: string | Date | null | undefined;
      estimatedDuration?: number | null | undefined;
      id?: string | undefined;
      priority?: number | null | undefined;
      startedAt?: string | Date | null | undefined;
      status?: WmsPickBatchStatusEnum | null | undefined;
      totalItems?: number | null | undefined;
      updatedAt?: string | Date | null | undefined;
      waveId?: string | null | undefined;
      zoneRestrictions?: string[] | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.pickBatches',
    {
      actualDuration: number | null;
      assignedUserId: string | null;
      batchNumber: string;
      completedAt: Date | null;
      completedItems: number | null;
      createdAt: Date | null;
      estimatedDuration: number | null;
      id: string;
      priority: number | null;
      startedAt: Date | null;
      status: WmsPickBatchStatusEnum | null;
      strategy: WmsPickStrategyEnum;
      totalItems: number | null;
      updatedAt: Date | null;
      warehouseId: string;
      waveId: string | null;
      zoneRestrictions: string[] | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    value: {
      actualDuration?: number | null | undefined;
      assignedUserId?: string | null | undefined;
      batchNumber?: string | undefined;
      completedAt?: string | Date | null | undefined;
      completedItems?: number | null | undefined;
      createdAt?: string | Date | null | undefined;
      estimatedDuration?: number | null | undefined;
      id?: string | undefined;
      priority?: number | null | undefined;
      startedAt?: string | Date | null | undefined;
      status?: WmsPickBatchStatusEnum | null | undefined;
      strategy?: WmsPickStrategyEnum | undefined;
      totalItems?: number | null | undefined;
      updatedAt?: string | Date | null | undefined;
      warehouseId?: string | undefined;
      waveId?: string | null | undefined;
      zoneRestrictions?: string[] | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.pickBatches',
    'wms.pickBatches',
    {
      actualDuration: number | null;
      assignedUserId: string | null;
      batchNumber: string;
      completedAt: Date | null;
      completedItems: number | null;
      createdAt: Date | null;
      estimatedDuration: number | null;
      id: string;
      priority: number | null;
      startedAt: Date | null;
      status: WmsPickBatchStatusEnum | null;
      strategy: WmsPickStrategyEnum;
      totalItems: number | null;
      updatedAt: Date | null;
      warehouseId: string;
      waveId: string | null;
      zoneRestrictions: string[] | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.pickBatches', DeleteResult> {
    throw new Error('Method not implemented.');
  }
}

export class WmsPickBatchRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.pickBatches'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.pickBatches', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.pickBatches')
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
      builder = builder.where('wms.pickBatches.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.pickBatches']>) {
    return this.db.insertInto('wms.pickBatches').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.pickBatches']>[]) {
    return this.db.insertInto('wms.pickBatches').values(values).returningAll();
  }

  update(
    id: DB['wms.pickBatches']['id']['__update__'],
    value: Updateable<DB['wms.pickBatches']>,
  ) {
    return this.db
      .updateTable('wms.pickBatches')
      .set(value)
      .where('wms.pickBatches.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.pickBatches']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.pickBatches')
      .where('wms.pickBatches.id', '=', id);
  }
}
