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
import { DB, DmsDeliveryRouteStatusEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class DeliveryRouteRepository
  implements GenericRepository<'dms.deliveryRoutes'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'dms.deliveryRoutes'> | undefined,
    filter?: FilterConfig<'dms.deliveryRoutes'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'dms.deliveryRoutes',
    {
      actualDurationMinutes: number | null;
      completedAt: Date | null;
      createdAt: Date | null;
      driverId: string;
      estimatedDurationMinutes: number | null;
      id: string;
      optimizedRouteData: string | null;
      routeDate: Date;
      startedAt: Date | null;
      status: DmsDeliveryRouteStatusEnum | null;
      totalDistanceKm: number | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('dms.deliveryRoutes').selectAll();

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
    sort?: SortConfig<'dms.deliveryRoutes'> | undefined,
    filter?: FilterConfig<'dms.deliveryRoutes'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'dms.deliveryRoutes',
    {
      actualDurationMinutes: number | null;
      completedAt: Date | null;
      createdAt: Date | null;
      driverId: string;
      estimatedDurationMinutes: number | null;
      id: string;
      optimizedRouteData: string | null;
      routeDate: Date;
      startedAt: Date | null;
      status: DmsDeliveryRouteStatusEnum | null;
      totalDistanceKm: number | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('dms.deliveryRoutes')
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
    'dms.deliveryRoutes',
    {
      actualDurationMinutes: number | null;
      completedAt: Date | null;
      createdAt: Date | null;
      driverId: string;
      estimatedDurationMinutes: number | null;
      id: string;
      optimizedRouteData: string | null;
      routeDate: Date;
      startedAt: Date | null;
      status: DmsDeliveryRouteStatusEnum | null;
      totalDistanceKm: number | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('dms.deliveryRoutes')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { driverId: string; routeDate: string | Date } & {
      actualDurationMinutes?: number | null | undefined;
      completedAt?: string | Date | null | undefined;
      createdAt?: string | Date | null | undefined;
      estimatedDurationMinutes?: number | null | undefined;
      id?: string | undefined;
      optimizedRouteData?: string | null | undefined;
      startedAt?: string | Date | null | undefined;
      status?: DmsDeliveryRouteStatusEnum | null | undefined;
      totalDistanceKm?: number | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'dms.deliveryRoutes',
    {
      actualDurationMinutes: number | null;
      completedAt: Date | null;
      createdAt: Date | null;
      driverId: string;
      estimatedDurationMinutes: number | null;
      id: string;
      optimizedRouteData: string | null;
      routeDate: Date;
      startedAt: Date | null;
      status: DmsDeliveryRouteStatusEnum | null;
      totalDistanceKm: number | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .insertInto('dms.deliveryRoutes')
      .values(value)
      .returningAll();
  }
  update(
    id: string,
    value: {
      actualDurationMinutes?: number | null | undefined;
      completedAt?: string | Date | null | undefined;
      createdAt?: string | Date | null | undefined;
      driverId?: string | undefined;
      estimatedDurationMinutes?: number | null | undefined;
      id?: string | undefined;
      optimizedRouteData?: string | null | undefined;
      routeDate?: string | Date | undefined;
      startedAt?: string | Date | null | undefined;
      status?: DmsDeliveryRouteStatusEnum | null | undefined;
      totalDistanceKm?: number | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'dms.deliveryRoutes',
    'dms.deliveryRoutes',
    {
      actualDurationMinutes: number | null;
      completedAt: Date | null;
      createdAt: Date | null;
      driverId: string;
      estimatedDurationMinutes: number | null;
      id: string;
      optimizedRouteData: string | null;
      routeDate: Date;
      startedAt: Date | null;
      status: DmsDeliveryRouteStatusEnum | null;
      totalDistanceKm: number | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('dms.deliveryRoutes')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'dms.deliveryRoutes', DeleteResult> {
    return this.db.deleteFrom('dms.deliveryRoutes').where('id', '=', id);
  }
}

export class DmsDeliveryRouteRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.deliveryRoutes'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.deliveryRoutes', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.deliveryRoutes')
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
      builder = builder.where('dms.deliveryRoutes.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['dms.deliveryRoutes']>) {
    return this.db
      .insertInto('dms.deliveryRoutes')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['dms.deliveryRoutes']>[]) {
    return this.db
      .insertInto('dms.deliveryRoutes')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['dms.deliveryRoutes']['id']['__update__'],
    value: Updateable<DB['dms.deliveryRoutes']>,
  ) {
    return this.db
      .updateTable('dms.deliveryRoutes')
      .set(value)
      .where('dms.deliveryRoutes.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.deliveryRoutes']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.deliveryRoutes')
      .where('dms.deliveryRoutes.id', '=', id);
  }
}
