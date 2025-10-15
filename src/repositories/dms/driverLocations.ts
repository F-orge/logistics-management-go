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
import type { DB } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class DriverLocationRepository implements GenericRepository<'dms.driverLocations'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'dms.driverLocations'> | undefined,
    filter?: FilterConfig<'dms.driverLocations'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'dms.driverLocations',
    {
      accuracy: number | null
      altitude: number | null
      createdAt: Date | null
      driverId: string
      heading: number | null
      id: string
      latitude: number
      longitude: number
      speedKmh: number | null
      timestamp: Date | null
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('dms.driverLocations').selectAll()

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
    sort?: SortConfig<'dms.driverLocations'> | undefined,
    filter?: FilterConfig<'dms.driverLocations'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'dms.driverLocations',
    {
      accuracy: number | null
      altitude: number | null
      createdAt: Date | null
      driverId: string
      heading: number | null
      id: string
      latitude: number
      longitude: number
      speedKmh: number | null
      timestamp: Date | null
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('dms.driverLocations')
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
    'dms.driverLocations',
    {
      accuracy: number | null
      altitude: number | null
      createdAt: Date | null
      driverId: string
      heading: number | null
      id: string
      latitude: number
      longitude: number
      speedKmh: number | null
      timestamp: Date | null
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('dms.driverLocations').selectAll().where('id', 'in', values)
  }
  create(
    value: { driverId: string; latitude: number; longitude: number } & {
      accuracy?: number | null | undefined
      altitude?: number | null | undefined
      createdAt?: string | Date | null | undefined
      heading?: number | null | undefined
      id?: string | undefined
      speedKmh?: number | null | undefined
      timestamp?: string | Date | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'dms.driverLocations',
    {
      accuracy: number | null
      altitude: number | null
      createdAt: Date | null
      driverId: string
      heading: number | null
      id: string
      latitude: number
      longitude: number
      speedKmh: number | null
      timestamp: Date | null
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('dms.driverLocations').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      accuracy?: number | null | undefined
      altitude?: number | null | undefined
      createdAt?: string | Date | null | undefined
      driverId?: string | undefined
      heading?: number | null | undefined
      id?: string | undefined
      latitude?: number | undefined
      longitude?: number | undefined
      speedKmh?: number | null | undefined
      timestamp?: string | Date | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'dms.driverLocations',
    'dms.driverLocations',
    {
      accuracy: number | null
      altitude: number | null
      createdAt: Date | null
      driverId: string
      heading: number | null
      id: string
      latitude: number
      longitude: number
      speedKmh: number | null
      timestamp: Date | null
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('dms.driverLocations').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'dms.driverLocations', DeleteResult> {
    return this.db.deleteFrom('dms.driverLocations').where('id', '=', id)
  }
}

export class DmsDriverLocationRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.driverLocations'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.driverLocations', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.driverLocations')
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

    if (search) builder = builder.where('dms.driverLocations.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['dms.driverLocations']>) {
    return this.db.insertInto('dms.driverLocations').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['dms.driverLocations']>[]) {
    return this.db.insertInto('dms.driverLocations').values(values).returningAll()
  }

  update(
    id: DB['dms.driverLocations']['id']['__update__'],
    value: Updateable<DB['dms.driverLocations']>,
  ) {
    return this.db
      .updateTable('dms.driverLocations')
      .set(value)
      .where('dms.driverLocations.id', '=', id)
      .returningAll()
  }

  delete(id: DB['dms.driverLocations']['id']['__update__']) {
    return this.db.deleteFrom('dms.driverLocations').where('dms.driverLocations.id', '=', id)
  }
}
