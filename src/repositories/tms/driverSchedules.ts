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
import { DB, TmsDriverScheduleReasonEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class DriverScheduleRepository
  implements GenericRepository<'tms.driverSchedules'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.driverSchedules'> | undefined,
    filter?: FilterConfig<'tms.driverSchedules'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.driverSchedules',
    {
      createdAt: Date | null;
      driverId: string;
      endDate: Date;
      id: string;
      reason: TmsDriverScheduleReasonEnum | null;
      startDate: Date;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('tms.driverSchedules').selectAll();

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
    sort?: SortConfig<'tms.driverSchedules'> | undefined,
    filter?: FilterConfig<'tms.driverSchedules'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.driverSchedules',
    {
      createdAt: Date | null;
      driverId: string;
      endDate: Date;
      id: string;
      reason: TmsDriverScheduleReasonEnum | null;
      startDate: Date;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('tms.driverSchedules')
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
    'tms.driverSchedules',
    {
      createdAt: Date | null;
      driverId: string;
      endDate: Date;
      id: string;
      reason: TmsDriverScheduleReasonEnum | null;
      startDate: Date;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('tms.driverSchedules')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      driverId: string;
      endDate: string | Date;
      startDate: string | Date;
    } & {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      reason?: TmsDriverScheduleReasonEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'tms.driverSchedules',
    {
      createdAt: Date | null;
      driverId: string;
      endDate: Date;
      id: string;
      reason: TmsDriverScheduleReasonEnum | null;
      startDate: Date;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('tms.driverSchedules').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      driverId?: string | undefined;
      endDate?: string | Date | undefined;
      id?: string | undefined;
      reason?: TmsDriverScheduleReasonEnum | null | undefined;
      startDate?: string | Date | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.driverSchedules',
    'tms.driverSchedules',
    {
      createdAt: Date | null;
      driverId: string;
      endDate: Date;
      id: string;
      reason: TmsDriverScheduleReasonEnum | null;
      startDate: Date;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('tms.driverSchedules')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'tms.driverSchedules', DeleteResult> {
    return this.db.deleteFrom('tms.driverSchedules').where('id', '=', id);
  }
}

export class TmsDriverScheduleRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.driverSchedules'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.driverSchedules', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.driverSchedules')
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
      builder = builder.where('tms.driverSchedules.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.driverSchedules']>) {
    return this.db
      .insertInto('tms.driverSchedules')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['tms.driverSchedules']>[]) {
    return this.db
      .insertInto('tms.driverSchedules')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['tms.driverSchedules']['id']['__update__'],
    value: Updateable<DB['tms.driverSchedules']>,
  ) {
    return this.db
      .updateTable('tms.driverSchedules')
      .set(value)
      .where('tms.driverSchedules.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.driverSchedules']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.driverSchedules')
      .where('tms.driverSchedules.id', '=', id);
  }
}
