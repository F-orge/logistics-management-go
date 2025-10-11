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
import { DB, TmsGeofenceEventTypeEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class GeofenceEventRepository
  implements GenericRepository<'tms.geofenceEvents'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.geofenceEvents'> | undefined,
    filter?: FilterConfig<'tms.geofenceEvents'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.geofenceEvents',
    {
      eventType: TmsGeofenceEventTypeEnum;
      geofenceId: string;
      id: string;
      timestamp: Date;
      vehicleId: string;
    }
  > {
    let query = this.db.selectFrom('tms.geofenceEvents').selectAll();

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
    sort?: SortConfig<'tms.geofenceEvents'> | undefined,
    filter?: FilterConfig<'tms.geofenceEvents'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.geofenceEvents',
    {
      eventType: TmsGeofenceEventTypeEnum;
      geofenceId: string;
      id: string;
      timestamp: Date;
      vehicleId: string;
    }
  > {
    let query = this.db
      .selectFrom('tms.geofenceEvents')
      .selectAll()
      .where('timestamp', '>=', from)
      .where('timestamp', '<=', to);

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
    'tms.geofenceEvents',
    {
      eventType: TmsGeofenceEventTypeEnum;
      geofenceId: string;
      id: string;
      timestamp: Date;
      vehicleId: string;
    }
  > {
    return this.db
      .selectFrom('tms.geofenceEvents')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      eventType: TmsGeofenceEventTypeEnum;
      geofenceId: string;
      vehicleId: string;
    } & { id?: string | undefined; timestamp?: string | Date | undefined },
  ): InsertQueryBuilder<
    DB,
    'tms.geofenceEvents',
    {
      eventType: TmsGeofenceEventTypeEnum;
      geofenceId: string;
      id: string;
      timestamp: Date;
      vehicleId: string;
    }
  > {
    return this.db.insertInto('tms.geofenceEvents').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      eventType?: TmsGeofenceEventTypeEnum | undefined;
      geofenceId?: string | undefined;
      id?: string | undefined;
      timestamp?: string | Date | undefined;
      vehicleId?: string | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.geofenceEvents',
    'tms.geofenceEvents',
    {
      eventType: TmsGeofenceEventTypeEnum;
      geofenceId: string;
      id: string;
      timestamp: Date;
      vehicleId: string;
    }
  > {
    return this.db
      .updateTable('tms.geofenceEvents')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'tms.geofenceEvents', DeleteResult> {
    return this.db.deleteFrom('tms.geofenceEvents').where('id', '=', id);
  }
}

export class TmsGeofenceEventRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.geofenceEvents'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.geofenceEvents', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.geofenceEvents')
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
      builder = builder.where('tms.geofenceEvents.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.geofenceEvents']>) {
    return this.db
      .insertInto('tms.geofenceEvents')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['tms.geofenceEvents']>[]) {
    return this.db
      .insertInto('tms.geofenceEvents')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['tms.geofenceEvents']['id']['__update__'],
    value: Updateable<DB['tms.geofenceEvents']>,
  ) {
    return this.db
      .updateTable('tms.geofenceEvents')
      .set(value)
      .where('tms.geofenceEvents.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.geofenceEvents']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.geofenceEvents')
      .where('tms.geofenceEvents.id', '=', id);
  }
}
