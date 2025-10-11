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

export class RouteRepository implements GenericRepository<'tms.routes'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.routes'> | undefined,
    filter?: FilterConfig<'tms.routes'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.routes',
    {
      createdAt: Date | null;
      id: string;
      optimizedRouteData: string | null;
      totalDistance: number | null;
      totalDuration: number | null;
      tripId: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('tms.routes').selectAll();

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
    sort?: SortConfig<'tms.routes'> | undefined,
    filter?: FilterConfig<'tms.routes'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.routes',
    {
      createdAt: Date | null;
      id: string;
      optimizedRouteData: string | null;
      totalDistance: number | null;
      totalDuration: number | null;
      tripId: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('tms.routes')
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
    'tms.routes',
    {
      createdAt: Date | null;
      id: string;
      optimizedRouteData: string | null;
      totalDistance: number | null;
      totalDuration: number | null;
      tripId: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('tms.routes')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { tripId: string } & {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      optimizedRouteData?: string | null | undefined;
      totalDistance?: number | null | undefined;
      totalDuration?: number | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'tms.routes',
    {
      createdAt: Date | null;
      id: string;
      optimizedRouteData: string | null;
      totalDistance: number | null;
      totalDuration: number | null;
      tripId: string;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('tms.routes').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      optimizedRouteData?: string | null | undefined;
      totalDistance?: number | null | undefined;
      totalDuration?: number | null | undefined;
      tripId?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.routes',
    'tms.routes',
    {
      createdAt: Date | null;
      id: string;
      optimizedRouteData: string | null;
      totalDistance: number | null;
      totalDuration: number | null;
      tripId: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('tms.routes')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'tms.routes', DeleteResult> {
    return this.db.deleteFrom('tms.routes').where('id', '=', id);
  }
}

export class TmsRouteRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.routes'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.routes', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.routes')
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

    if (search) builder = builder.where('tms.routes.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.routes']>) {
    return this.db.insertInto('tms.routes').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.routes']>[]) {
    return this.db.insertInto('tms.routes').values(values).returningAll();
  }

  update(
    id: DB['tms.routes']['id']['__update__'],
    value: Updateable<DB['tms.routes']>,
  ) {
    return this.db
      .updateTable('tms.routes')
      .set(value)
      .where('tms.routes.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.routes']['id']['__update__']) {
    return this.db.deleteFrom('tms.routes').where('tms.routes.id', '=', id);
  }
}
