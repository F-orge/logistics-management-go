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

export class GpsPingRepository implements GenericRepository<'tms.gpsPings'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.gpsPings'> | undefined,
    filter?: FilterConfig<'tms.gpsPings'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.gpsPings',
    {
      id: string;
      latitude: number;
      longitude: number;
      timestamp: Date;
      vehicleId: string;
    }
  > {
    let query = this.db.selectFrom('tms.gpsPings').selectAll();

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
    sort?: SortConfig<'tms.gpsPings'> | undefined,
    filter?: FilterConfig<'tms.gpsPings'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.gpsPings',
    {
      id: string;
      latitude: number;
      longitude: number;
      timestamp: Date;
      vehicleId: string;
    }
  > {
    let query = this.db
      .selectFrom('tms.gpsPings')
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
    'tms.gpsPings',
    {
      id: string;
      latitude: number;
      longitude: number;
      timestamp: Date;
      vehicleId: string;
    }
  > {
    return this.db
      .selectFrom('tms.gpsPings')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { latitude: number; longitude: number; vehicleId: string } & {
      id?: string | undefined;
      timestamp?: string | Date | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'tms.gpsPings',
    {
      id: string;
      latitude: number;
      longitude: number;
      timestamp: Date;
      vehicleId: string;
    }
  > {
    return this.db.insertInto('tms.gpsPings').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      id?: string | undefined;
      latitude?: number | undefined;
      longitude?: number | undefined;
      timestamp?: string | Date | undefined;
      vehicleId?: string | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.gpsPings',
    'tms.gpsPings',
    {
      id: string;
      latitude: number;
      longitude: number;
      timestamp: Date;
      vehicleId: string;
    }
  > {
    return this.db
      .updateTable('tms.gpsPings')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'tms.gpsPings', DeleteResult> {
    return this.db.deleteFrom('tms.gpsPings').where('id', '=', id);
  }
}

export class TmsGpsPingRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.gpsPings'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.gpsPings', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.gpsPings')
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
      builder = builder.where('tms.gpsPings.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.gpsPings']>) {
    return this.db.insertInto('tms.gpsPings').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.gpsPings']>[]) {
    return this.db.insertInto('tms.gpsPings').values(values).returningAll();
  }

  update(
    id: DB['tms.gpsPings']['id']['__update__'],
    value: Updateable<DB['tms.gpsPings']>,
  ) {
    return this.db
      .updateTable('tms.gpsPings')
      .set(value)
      .where('tms.gpsPings.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.gpsPings']['id']['__update__']) {
    return this.db.deleteFrom('tms.gpsPings').where('tms.gpsPings.id', '=', id);
  }
}
