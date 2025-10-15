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
import type { DB, TmsVehicleStatusEnum } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class VehicleRepository implements GenericRepository<'tms.vehicles'> {
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.vehicles'> | undefined,
    filter?: FilterConfig<'tms.vehicles'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.vehicles',
    {
      capacityVolume: number | null
      capacityWeight: number | null
      createdAt: Date | null
      id: string
      model: string | null
      registrationNumber: string
      status: TmsVehicleStatusEnum | null
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('tms.vehicles').selectAll()

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
    sort?: SortConfig<'tms.vehicles'> | undefined,
    filter?: FilterConfig<'tms.vehicles'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.vehicles',
    {
      capacityVolume: number | null
      capacityWeight: number | null
      createdAt: Date | null
      id: string
      model: string | null
      registrationNumber: string
      status: TmsVehicleStatusEnum | null
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('tms.vehicles')
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
    'tms.vehicles',
    {
      capacityVolume: number | null
      capacityWeight: number | null
      createdAt: Date | null
      id: string
      model: string | null
      registrationNumber: string
      status: TmsVehicleStatusEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('tms.vehicles').selectAll().where('id', 'in', values)
  }
  create(
    value: { registrationNumber: string } & {
      capacityVolume?: number | null | undefined
      capacityWeight?: number | null | undefined
      createdAt?: string | Date | null | undefined
      id?: string | undefined
      model?: string | null | undefined
      status?: TmsVehicleStatusEnum | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'tms.vehicles',
    {
      capacityVolume: number | null
      capacityWeight: number | null
      createdAt: Date | null
      id: string
      model: string | null
      registrationNumber: string
      status: TmsVehicleStatusEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('tms.vehicles').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      capacityVolume?: number | null | undefined
      capacityWeight?: number | null | undefined
      createdAt?: string | Date | null | undefined
      id?: string | undefined
      model?: string | null | undefined
      registrationNumber?: string | undefined
      status?: TmsVehicleStatusEnum | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.vehicles',
    'tms.vehicles',
    {
      capacityVolume: number | null
      capacityWeight: number | null
      createdAt: Date | null
      id: string
      model: string | null
      registrationNumber: string
      status: TmsVehicleStatusEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('tms.vehicles').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'tms.vehicles', DeleteResult> {
    return this.db.deleteFrom('tms.vehicles').where('id', '=', id)
  }
}

export class TmsVehicleRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.vehicles'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.vehicles', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.vehicles')
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

    if (search) builder = builder.where('tms.vehicles.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['tms.vehicles']>) {
    return this.db.insertInto('tms.vehicles').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['tms.vehicles']>[]) {
    return this.db.insertInto('tms.vehicles').values(values).returningAll()
  }

  update(id: DB['tms.vehicles']['id']['__update__'], value: Updateable<DB['tms.vehicles']>) {
    return this.db
      .updateTable('tms.vehicles')
      .set(value)
      .where('tms.vehicles.id', '=', id)
      .returningAll()
  }

  delete(id: DB['tms.vehicles']['id']['__update__']) {
    return this.db.deleteFrom('tms.vehicles').where('tms.vehicles.id', '=', id)
  }
}
