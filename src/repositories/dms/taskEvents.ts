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
import { DB, DmsTaskEventStatusEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class TaskEventRepository implements GenericRepository<'dms.taskEvents'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'dms.taskEvents'> | undefined,
    filter?: FilterConfig<'dms.taskEvents'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'dms.taskEvents',
    {
      createdAt: Date | null;
      deliveryTaskId: string;
      id: string;
      latitude: number | null;
      longitude: number | null;
      notes: string | null;
      reason: string | null;
      status: DmsTaskEventStatusEnum;
      timestamp: Date | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('dms.taskEvents').selectAll();

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
    sort?: SortConfig<'dms.taskEvents'> | undefined,
    filter?: FilterConfig<'dms.taskEvents'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'dms.taskEvents',
    {
      createdAt: Date | null;
      deliveryTaskId: string;
      id: string;
      latitude: number | null;
      longitude: number | null;
      notes: string | null;
      reason: string | null;
      status: DmsTaskEventStatusEnum;
      timestamp: Date | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('dms.taskEvents')
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
    'dms.taskEvents',
    {
      createdAt: Date | null;
      deliveryTaskId: string;
      id: string;
      latitude: number | null;
      longitude: number | null;
      notes: string | null;
      reason: string | null;
      status: DmsTaskEventStatusEnum;
      timestamp: Date | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('dms.taskEvents')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { deliveryTaskId: string; status: DmsTaskEventStatusEnum } & {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      latitude?: number | null | undefined;
      longitude?: number | null | undefined;
      notes?: string | null | undefined;
      reason?: string | null | undefined;
      timestamp?: string | Date | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'dms.taskEvents',
    {
      createdAt: Date | null;
      deliveryTaskId: string;
      id: string;
      latitude: number | null;
      longitude: number | null;
      notes: string | null;
      reason: string | null;
      status: DmsTaskEventStatusEnum;
      timestamp: Date | null;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('dms.taskEvents').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      deliveryTaskId?: string | undefined;
      id?: string | undefined;
      latitude?: number | null | undefined;
      longitude?: number | null | undefined;
      notes?: string | null | undefined;
      reason?: string | null | undefined;
      status?: DmsTaskEventStatusEnum | undefined;
      timestamp?: string | Date | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'dms.taskEvents',
    'dms.taskEvents',
    {
      createdAt: Date | null;
      deliveryTaskId: string;
      id: string;
      latitude: number | null;
      longitude: number | null;
      notes: string | null;
      reason: string | null;
      status: DmsTaskEventStatusEnum;
      timestamp: Date | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('dms.taskEvents')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'dms.taskEvents', DeleteResult> {
    return this.db.deleteFrom('dms.taskEvents').where('id', '=', id);
  }
}

export class DmsTaskEventRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.taskEvents'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.taskEvents', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.taskEvents')
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
      builder = builder.where('dms.taskEvents.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['dms.taskEvents']>) {
    return this.db.insertInto('dms.taskEvents').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['dms.taskEvents']>[]) {
    return this.db.insertInto('dms.taskEvents').values(values).returningAll();
  }

  update(
    id: DB['dms.taskEvents']['id']['__update__'],
    value: Updateable<DB['dms.taskEvents']>,
  ) {
    return this.db
      .updateTable('dms.taskEvents')
      .set(value)
      .where('dms.taskEvents.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.taskEvents']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.taskEvents')
      .where('dms.taskEvents.id', '=', id);
  }
}
