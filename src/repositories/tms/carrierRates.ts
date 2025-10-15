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
import type { DB, TmsCarrierRateUnitEnum } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class CarrierRateRepository implements GenericRepository<'tms.carrierRates'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.carrierRates'> | undefined,
    filter?: FilterConfig<'tms.carrierRates'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.carrierRates',
    {
      carrierId: string
      createdAt: Date | null
      destination: string | null
      id: string
      origin: string | null
      rate: string
      serviceType: string | null
      unit: TmsCarrierRateUnitEnum | null
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('tms.carrierRates').selectAll()

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
    sort?: SortConfig<'tms.carrierRates'> | undefined,
    filter?: FilterConfig<'tms.carrierRates'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.carrierRates',
    {
      carrierId: string
      createdAt: Date | null
      destination: string | null
      id: string
      origin: string | null
      rate: string
      serviceType: string | null
      unit: TmsCarrierRateUnitEnum | null
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('tms.carrierRates')
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
    'tms.carrierRates',
    {
      carrierId: string
      createdAt: Date | null
      destination: string | null
      id: string
      origin: string | null
      rate: string
      serviceType: string | null
      unit: TmsCarrierRateUnitEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('tms.carrierRates').selectAll().where('id', 'in', values)
  }
  create(
    value: { carrierId: string; rate: string | number } & {
      createdAt?: string | Date | null | undefined
      destination?: string | null | undefined
      id?: string | undefined
      origin?: string | null | undefined
      serviceType?: string | null | undefined
      unit?: TmsCarrierRateUnitEnum | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'tms.carrierRates',
    {
      carrierId: string
      createdAt: Date | null
      destination: string | null
      id: string
      origin: string | null
      rate: string
      serviceType: string | null
      unit: TmsCarrierRateUnitEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('tms.carrierRates').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      carrierId?: string | undefined
      createdAt?: string | Date | null | undefined
      destination?: string | null | undefined
      id?: string | undefined
      origin?: string | null | undefined
      rate?: string | number | undefined
      serviceType?: string | null | undefined
      unit?: TmsCarrierRateUnitEnum | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.carrierRates',
    'tms.carrierRates',
    {
      carrierId: string
      createdAt: Date | null
      destination: string | null
      id: string
      origin: string | null
      rate: string
      serviceType: string | null
      unit: TmsCarrierRateUnitEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('tms.carrierRates').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'tms.carrierRates', DeleteResult> {
    return this.db.deleteFrom('tms.carrierRates').where('id', '=', id)
  }
}

export class TmsCarrierRateRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.carrierRates'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.carrierRates', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.carrierRates')
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

    if (search) builder = builder.where('tms.carrierRates.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['tms.carrierRates']>) {
    return this.db.insertInto('tms.carrierRates').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['tms.carrierRates']>[]) {
    return this.db.insertInto('tms.carrierRates').values(values).returningAll()
  }

  update(
    id: DB['tms.carrierRates']['id']['__update__'],
    value: Updateable<DB['tms.carrierRates']>,
  ) {
    return this.db
      .updateTable('tms.carrierRates')
      .set(value)
      .where('tms.carrierRates.id', '=', id)
      .returningAll()
  }

  delete(id: DB['tms.carrierRates']['id']['__update__']) {
    return this.db.deleteFrom('tms.carrierRates').where('tms.carrierRates.id', '=', id)
  }
}
