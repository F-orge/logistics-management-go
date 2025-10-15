import type {
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
} from 'kysely'
import type { DB, TmsTripStatusEnum } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class TripRepository implements GenericRepository<'tms.trips'> {
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.trips'> | undefined,
    filter?: FilterConfig<'tms.trips'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.trips',
    {
      createdAt: Date | null
      driverId: string | null
      id: string
      status: TmsTripStatusEnum | null
      updatedAt: Date | null
      vehicleId: string | null
    }
  > {
    let query = this.db.selectFrom('tms.trips').selectAll()

    if (limit) query = query.limit(limit)

    if (page && limit) query = query.offset((page - 1) * limit)

    for (const sortCol of sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order)
    }

    for (const filterCol of filter || []) {
      query = query.where(filterCol.column, filterCol.operation, filterCol.value)
    }

    return query
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'tms.trips'> | undefined,
    filter?: FilterConfig<'tms.trips'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.trips',
    {
      createdAt: Date | null
      driverId: string | null
      id: string
      status: TmsTripStatusEnum | null
      updatedAt: Date | null
      vehicleId: string | null
    }
  > {
    let query = this.db
      .selectFrom('tms.trips')
      .selectAll()
      .where('createdAt', '>=', from)
      .where('createdAt', '<=', to)

    for (const sortCol of sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order)
    }

    for (const filterCol of filter || []) {
      query = query.where(filterCol.column, filterCol.operation, filterCol.value)
    }

    return query
  }
  in(values: string[]): SelectQueryBuilder<
    DB,
    'tms.trips',
    {
      createdAt: Date | null
      driverId: string | null
      id: string
      status: TmsTripStatusEnum | null
      updatedAt: Date | null
      vehicleId: string | null
    }
  > {
    return this.db.selectFrom('tms.trips').selectAll().where('id', 'in', values)
  }
  create(
    value: {} & {
      createdAt?: string | Date | null | undefined
      driverId?: string | null | undefined
      id?: string | undefined
      status?: TmsTripStatusEnum | null | undefined
      updatedAt?: string | Date | null | undefined
      vehicleId?: string | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'tms.trips',
    {
      createdAt: Date | null
      driverId: string | null
      id: string
      status: TmsTripStatusEnum | null
      updatedAt: Date | null
      vehicleId: string | null
    }
  > {
    return this.db.insertInto('tms.trips').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined
      driverId?: string | null | undefined
      id?: string | undefined
      status?: TmsTripStatusEnum | null | undefined
      updatedAt?: string | Date | null | undefined
      vehicleId?: string | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.trips',
    'tms.trips',
    {
      createdAt: Date | null
      driverId: string | null
      id: string
      status: TmsTripStatusEnum | null
      updatedAt: Date | null
      vehicleId: string | null
    }
  > {
    return this.db.updateTable('tms.trips').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'tms.trips', DeleteResult> {
    return this.db.deleteFrom('tms.trips').where('id', '=', id)
  }
}

export class TmsTripRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.trips'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.trips', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.trips')
      .limit(perPage)
      .offset((page - 1) * perPage)

    if (fields) {
      builder = builder.select(fields)
    } else {
      builder = builder.selectAll()
    }

    // sort
    for (const field of sort || []) {
      builder = builder.orderBy(field.field, field.order)
    }

    if (search) builder = builder.where('tms.trips.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['tms.trips']>) {
    return this.db.insertInto('tms.trips').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['tms.trips']>[]) {
    return this.db.insertInto('tms.trips').values(values).returningAll()
  }

  update(id: DB['tms.trips']['id']['__update__'], value: Updateable<DB['tms.trips']>) {
    return this.db.updateTable('tms.trips').set(value).where('tms.trips.id', '=', id).returningAll()
  }

  delete(id: DB['tms.trips']['id']['__update__']) {
    return this.db.deleteFrom('tms.trips').where('tms.trips.id', '=', id)
  }
}
