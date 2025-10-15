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
import type { DB, TmsProofTypeEnum } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class ProofOfDeliveryRepository implements GenericRepository<'tms.proofOfDeliveries'> {
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.proofOfDeliveries'> | undefined,
    filter?: FilterConfig<'tms.proofOfDeliveries'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.proofOfDeliveries',
    {
      createdAt: Date | null
      filePath: string | null
      id: string
      latitude: number | null
      longitude: number | null
      timestamp: Date
      tripStopId: string
      type: TmsProofTypeEnum | null
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('tms.proofOfDeliveries').selectAll()

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
    sort?: SortConfig<'tms.proofOfDeliveries'> | undefined,
    filter?: FilterConfig<'tms.proofOfDeliveries'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.proofOfDeliveries',
    {
      createdAt: Date | null
      filePath: string | null
      id: string
      latitude: number | null
      longitude: number | null
      timestamp: Date
      tripStopId: string
      type: TmsProofTypeEnum | null
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('tms.proofOfDeliveries')
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
    'tms.proofOfDeliveries',
    {
      createdAt: Date | null
      filePath: string | null
      id: string
      latitude: number | null
      longitude: number | null
      timestamp: Date
      tripStopId: string
      type: TmsProofTypeEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('tms.proofOfDeliveries').selectAll().where('id', 'in', values)
  }
  create(
    value: { tripStopId: string } & {
      createdAt?: string | Date | null | undefined
      filePath?: string | null | undefined
      id?: string | undefined
      latitude?: number | null | undefined
      longitude?: number | null | undefined
      timestamp?: string | Date | undefined
      type?: TmsProofTypeEnum | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'tms.proofOfDeliveries',
    {
      createdAt: Date | null
      filePath: string | null
      id: string
      latitude: number | null
      longitude: number | null
      timestamp: Date
      tripStopId: string
      type: TmsProofTypeEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('tms.proofOfDeliveries').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined
      filePath?: string | null | undefined
      id?: string | undefined
      latitude?: number | null | undefined
      longitude?: number | null | undefined
      timestamp?: string | Date | undefined
      tripStopId?: string | undefined
      type?: TmsProofTypeEnum | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.proofOfDeliveries',
    'tms.proofOfDeliveries',
    {
      createdAt: Date | null
      filePath: string | null
      id: string
      latitude: number | null
      longitude: number | null
      timestamp: Date
      tripStopId: string
      type: TmsProofTypeEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db
      .updateTable('tms.proofOfDeliveries')
      .set(value)
      .where('id', '=', id)
      .returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'tms.proofOfDeliveries', DeleteResult> {
    return this.db.deleteFrom('tms.proofOfDeliveries').where('id', '=', id)
  }
}

export class TmsProofOfDeliveryRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.proofOfDeliveries'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.proofOfDeliveries', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.proofOfDeliveries')
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

    if (search) builder = builder.where('tms.proofOfDeliveries.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['tms.proofOfDeliveries']>) {
    return this.db.insertInto('tms.proofOfDeliveries').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['tms.proofOfDeliveries']>[]) {
    return this.db.insertInto('tms.proofOfDeliveries').values(values).returningAll()
  }

  update(
    id: DB['tms.proofOfDeliveries']['id']['__update__'],
    value: Updateable<DB['tms.proofOfDeliveries']>,
  ) {
    return this.db
      .updateTable('tms.proofOfDeliveries')
      .set(value)
      .where('tms.proofOfDeliveries.id', '=', id)
      .returningAll()
  }

  delete(id: DB['tms.proofOfDeliveries']['id']['__update__']) {
    return this.db.deleteFrom('tms.proofOfDeliveries').where('tms.proofOfDeliveries.id', '=', id)
  }
}
