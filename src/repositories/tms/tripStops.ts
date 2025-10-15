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
import type { DB, TmsTripStopStatusEnum } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class TripStopRepository implements GenericRepository<'tms.tripStops'> {
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.tripStops'> | undefined,
    filter?: FilterConfig<'tms.tripStops'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.tripStops',
    {
      actualArrivalTime: Date | null
      actualDepartureTime: Date | null
      address: string | null
      createdAt: Date | null
      estimatedArrivalTime: Date | null
      estimatedDepartureTime: Date | null
      id: string
      sequence: number
      shipmentId: string | null
      status: TmsTripStopStatusEnum | null
      tripId: string
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('tms.tripStops').selectAll()

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
    sort?: SortConfig<'tms.tripStops'> | undefined,
    filter?: FilterConfig<'tms.tripStops'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.tripStops',
    {
      actualArrivalTime: Date | null
      actualDepartureTime: Date | null
      address: string | null
      createdAt: Date | null
      estimatedArrivalTime: Date | null
      estimatedDepartureTime: Date | null
      id: string
      sequence: number
      shipmentId: string | null
      status: TmsTripStopStatusEnum | null
      tripId: string
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('tms.tripStops')
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
    'tms.tripStops',
    {
      actualArrivalTime: Date | null
      actualDepartureTime: Date | null
      address: string | null
      createdAt: Date | null
      estimatedArrivalTime: Date | null
      estimatedDepartureTime: Date | null
      id: string
      sequence: number
      shipmentId: string | null
      status: TmsTripStopStatusEnum | null
      tripId: string
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('tms.tripStops').selectAll().where('id', 'in', values)
  }
  create(
    value: { sequence: number; tripId: string } & {
      actualArrivalTime?: string | Date | null | undefined
      actualDepartureTime?: string | Date | null | undefined
      address?: string | null | undefined
      createdAt?: string | Date | null | undefined
      estimatedArrivalTime?: string | Date | null | undefined
      estimatedDepartureTime?: string | Date | null | undefined
      id?: string | undefined
      shipmentId?: string | null | undefined
      status?: TmsTripStopStatusEnum | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'tms.tripStops',
    {
      actualArrivalTime: Date | null
      actualDepartureTime: Date | null
      address: string | null
      createdAt: Date | null
      estimatedArrivalTime: Date | null
      estimatedDepartureTime: Date | null
      id: string
      sequence: number
      shipmentId: string | null
      status: TmsTripStopStatusEnum | null
      tripId: string
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('tms.tripStops').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      actualArrivalTime?: string | Date | null | undefined
      actualDepartureTime?: string | Date | null | undefined
      address?: string | null | undefined
      createdAt?: string | Date | null | undefined
      estimatedArrivalTime?: string | Date | null | undefined
      estimatedDepartureTime?: string | Date | null | undefined
      id?: string | undefined
      sequence?: number | undefined
      shipmentId?: string | null | undefined
      status?: TmsTripStopStatusEnum | null | undefined
      tripId?: string | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.tripStops',
    'tms.tripStops',
    {
      actualArrivalTime: Date | null
      actualDepartureTime: Date | null
      address: string | null
      createdAt: Date | null
      estimatedArrivalTime: Date | null
      estimatedDepartureTime: Date | null
      id: string
      sequence: number
      shipmentId: string | null
      status: TmsTripStopStatusEnum | null
      tripId: string
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('tms.tripStops').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'tms.tripStops', DeleteResult> {
    return this.db.deleteFrom('tms.tripStops').where('id', '=', id)
  }
}

export class TmsTripStopRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.tripStops'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.tripStops', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.tripStops')
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

    if (search) builder = builder.where('tms.tripStops.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['tms.tripStops']>) {
    return this.db.insertInto('tms.tripStops').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['tms.tripStops']>[]) {
    return this.db.insertInto('tms.tripStops').values(values).returningAll()
  }

  update(id: DB['tms.tripStops']['id']['__update__'], value: Updateable<DB['tms.tripStops']>) {
    return this.db
      .updateTable('tms.tripStops')
      .set(value)
      .where('tms.tripStops.id', '=', id)
      .returningAll()
  }

  delete(id: DB['tms.tripStops']['id']['__update__']) {
    return this.db.deleteFrom('tms.tripStops').where('tms.tripStops.id', '=', id)
  }
}
