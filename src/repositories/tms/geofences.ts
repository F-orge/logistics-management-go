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

export class GeofenceRepository implements GenericRepository<'tms.geofences'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.geofences'> | undefined,
    filter?: FilterConfig<'tms.geofences'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.geofences',
    {
      coordinates: string | null;
      createdAt: Date | null;
      id: string;
      name: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('tms.geofences').selectAll();

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
    sort?: SortConfig<'tms.geofences'> | undefined,
    filter?: FilterConfig<'tms.geofences'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.geofences',
    {
      coordinates: string | null;
      createdAt: Date | null;
      id: string;
      name: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('tms.geofences')
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
    'tms.geofences',
    {
      coordinates: string | null;
      createdAt: Date | null;
      id: string;
      name: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('tms.geofences')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { name: string } & {
      coordinates?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'tms.geofences',
    {
      coordinates: string | null;
      createdAt: Date | null;
      id: string;
      name: string;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('tms.geofences').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      coordinates?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      name?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.geofences',
    'tms.geofences',
    {
      coordinates: string | null;
      createdAt: Date | null;
      id: string;
      name: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('tms.geofences')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'tms.geofences', DeleteResult> {
    return this.db.deleteFrom('tms.geofences').where('id', '=', id);
  }
}

export class TmsGeofenceRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.geofences'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.geofences', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.geofences')
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
      builder = builder.where('tms.geofences.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.geofences']>) {
    return this.db.insertInto('tms.geofences').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.geofences']>[]) {
    return this.db.insertInto('tms.geofences').values(values).returningAll();
  }

  update(
    id: DB['tms.geofences']['id']['__update__'],
    value: Updateable<DB['tms.geofences']>,
  ) {
    return this.db
      .updateTable('tms.geofences')
      .set(value)
      .where('tms.geofences.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.geofences']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.geofences')
      .where('tms.geofences.id', '=', id);
  }
}
