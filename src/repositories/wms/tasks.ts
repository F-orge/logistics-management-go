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
import { DB, WmsTaskStatusEnum, WmsTaskTypeEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class TaskRepository implements GenericRepository<'wms.tasks'> {
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.tasks'> | undefined,
    filter?: FilterConfig<'wms.tasks'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.tasks',
    {
      actualDuration: number | null;
      createdAt: Date | null;
      durationSeconds: number | null;
      endTime: Date | null;
      estimatedDuration: number | null;
      id: string;
      instructions: string | null;
      notes: string | null;
      pickBatchId: string | null;
      priority: number | null;
      sourceEntityId: string | null;
      sourceEntityType: string | null;
      startTime: Date | null;
      status: WmsTaskStatusEnum | null;
      taskNumber: string;
      type: WmsTaskTypeEnum;
      updatedAt: Date | null;
      userId: string | null;
      warehouseId: string;
    }
  > {
    let query = this.db.selectFrom('wms.tasks').selectAll();

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
    sort?: SortConfig<'wms.tasks'> | undefined,
    filter?: FilterConfig<'wms.tasks'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.tasks',
    {
      actualDuration: number | null;
      createdAt: Date | null;
      durationSeconds: number | null;
      endTime: Date | null;
      estimatedDuration: number | null;
      id: string;
      instructions: string | null;
      notes: string | null;
      pickBatchId: string | null;
      priority: number | null;
      sourceEntityId: string | null;
      sourceEntityType: string | null;
      startTime: Date | null;
      status: WmsTaskStatusEnum | null;
      taskNumber: string;
      type: WmsTaskTypeEnum;
      updatedAt: Date | null;
      userId: string | null;
      warehouseId: string;
    }
  > {
    let query = this.db
      .selectFrom('wms.tasks')
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
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'wms.tasks',
    {
      actualDuration: number | null;
      createdAt: Date | null;
      durationSeconds: number | null;
      endTime: Date | null;
      estimatedDuration: number | null;
      id: string;
      instructions: string | null;
      notes: string | null;
      pickBatchId: string | null;
      priority: number | null;
      sourceEntityId: string | null;
      sourceEntityType: string | null;
      startTime: Date | null;
      status: WmsTaskStatusEnum | null;
      taskNumber: string;
      type: WmsTaskTypeEnum;
      updatedAt: Date | null;
      userId: string | null;
      warehouseId: string;
    }
  > {
    return this.db
      .selectFrom('wms.tasks')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      taskNumber: string;
      type: WmsTaskTypeEnum;
      warehouseId: string;
    } & {
      actualDuration?: number | null | undefined;
      createdAt?: string | Date | null | undefined;
      durationSeconds?: number | null | undefined;
      endTime?: string | Date | null | undefined;
      estimatedDuration?: number | null | undefined;
      id?: string | undefined;
      instructions?: string | null | undefined;
      notes?: string | null | undefined;
      pickBatchId?: string | null | undefined;
      priority?: number | null | undefined;
      sourceEntityId?: string | null | undefined;
      sourceEntityType?: string | null | undefined;
      startTime?: string | Date | null | undefined;
      status?: WmsTaskStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
      userId?: string | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.tasks',
    {
      actualDuration: number | null;
      createdAt: Date | null;
      durationSeconds: number | null;
      endTime: Date | null;
      estimatedDuration: number | null;
      id: string;
      instructions: string | null;
      notes: string | null;
      pickBatchId: string | null;
      priority: number | null;
      sourceEntityId: string | null;
      sourceEntityType: string | null;
      startTime: Date | null;
      status: WmsTaskStatusEnum | null;
      taskNumber: string;
      type: WmsTaskTypeEnum;
      updatedAt: Date | null;
      userId: string | null;
      warehouseId: string;
    }
  > {
    return this.db.insertInto('wms.tasks').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      actualDuration?: number | null | undefined;
      createdAt?: string | Date | null | undefined;
      durationSeconds?: number | null | undefined;
      endTime?: string | Date | null | undefined;
      estimatedDuration?: number | null | undefined;
      id?: string | undefined;
      instructions?: string | null | undefined;
      notes?: string | null | undefined;
      pickBatchId?: string | null | undefined;
      priority?: number | null | undefined;
      sourceEntityId?: string | null | undefined;
      sourceEntityType?: string | null | undefined;
      startTime?: string | Date | null | undefined;
      status?: WmsTaskStatusEnum | null | undefined;
      taskNumber?: string | undefined;
      type?: WmsTaskTypeEnum | undefined;
      updatedAt?: string | Date | null | undefined;
      userId?: string | null | undefined;
      warehouseId?: string | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.tasks',
    'wms.tasks',
    {
      actualDuration: number | null;
      createdAt: Date | null;
      durationSeconds: number | null;
      endTime: Date | null;
      estimatedDuration: number | null;
      id: string;
      instructions: string | null;
      notes: string | null;
      pickBatchId: string | null;
      priority: number | null;
      sourceEntityId: string | null;
      sourceEntityType: string | null;
      startTime: Date | null;
      status: WmsTaskStatusEnum | null;
      taskNumber: string;
      type: WmsTaskTypeEnum;
      updatedAt: Date | null;
      userId: string | null;
      warehouseId: string;
    }
  > {
    return this.db
      .updateTable('wms.tasks')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.tasks', DeleteResult> {
    return this.db.deleteFrom('wms.tasks').where('id', '=', id);
  }
}

export class WmsTaskRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.tasks'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.tasks', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.tasks')
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

    if (search) builder = builder.where('wms.tasks.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.tasks']>) {
    return this.db.insertInto('wms.tasks').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.tasks']>[]) {
    return this.db.insertInto('wms.tasks').values(values).returningAll();
  }

  update(
    id: DB['wms.tasks']['id']['__update__'],
    value: Updateable<DB['wms.tasks']>,
  ) {
    return this.db
      .updateTable('wms.tasks')
      .set(value)
      .where('wms.tasks.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.tasks']['id']['__update__']) {
    return this.db.deleteFrom('wms.tasks').where('wms.tasks.id', '=', id);
  }
}
