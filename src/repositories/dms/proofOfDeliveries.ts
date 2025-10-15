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
import type { DB, DmsProofOfDeliveryTypeEnum } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class ProofOfDeliveryRepository implements GenericRepository<'dms.proofOfDeliveries'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'dms.proofOfDeliveries'> | undefined,
    filter?: FilterConfig<'dms.proofOfDeliveries'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'dms.proofOfDeliveries',
    {
      createdAt: Date | null
      deliveryTaskId: string
      filePath: string | null
      id: string
      latitude: number | null
      longitude: number | null
      recipientName: string | null
      signatureData: string | null
      timestamp: Date | null
      type: DmsProofOfDeliveryTypeEnum
      updatedAt: Date | null
      verificationCode: string | null
    }
  > {
    let query = this.db.selectFrom('dms.proofOfDeliveries').selectAll()

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
    sort?: SortConfig<'dms.proofOfDeliveries'> | undefined,
    filter?: FilterConfig<'dms.proofOfDeliveries'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'dms.proofOfDeliveries',
    {
      createdAt: Date | null
      deliveryTaskId: string
      filePath: string | null
      id: string
      latitude: number | null
      longitude: number | null
      recipientName: string | null
      signatureData: string | null
      timestamp: Date | null
      type: DmsProofOfDeliveryTypeEnum
      updatedAt: Date | null
      verificationCode: string | null
    }
  > {
    let query = this.db
      .selectFrom('dms.proofOfDeliveries')
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
    'dms.proofOfDeliveries',
    {
      createdAt: Date | null
      deliveryTaskId: string
      filePath: string | null
      id: string
      latitude: number | null
      longitude: number | null
      recipientName: string | null
      signatureData: string | null
      timestamp: Date | null
      type: DmsProofOfDeliveryTypeEnum
      updatedAt: Date | null
      verificationCode: string | null
    }
  > {
    return this.db.selectFrom('dms.proofOfDeliveries').selectAll().where('id', 'in', values)
  }
  create(
    value: { deliveryTaskId: string; type: DmsProofOfDeliveryTypeEnum } & {
      createdAt?: string | Date | null | undefined
      filePath?: string | null | undefined
      id?: string | undefined
      latitude?: number | null | undefined
      longitude?: number | null | undefined
      recipientName?: string | null | undefined
      signatureData?: string | null | undefined
      timestamp?: string | Date | null | undefined
      updatedAt?: string | Date | null | undefined
      verificationCode?: string | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'dms.proofOfDeliveries',
    {
      createdAt: Date | null
      deliveryTaskId: string
      filePath: string | null
      id: string
      latitude: number | null
      longitude: number | null
      recipientName: string | null
      signatureData: string | null
      timestamp: Date | null
      type: DmsProofOfDeliveryTypeEnum
      updatedAt: Date | null
      verificationCode: string | null
    }
  > {
    return this.db.insertInto('dms.proofOfDeliveries').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined
      deliveryTaskId?: string | undefined
      filePath?: string | null | undefined
      id?: string | undefined
      latitude?: number | null | undefined
      longitude?: number | null | undefined
      recipientName?: string | null | undefined
      signatureData?: string | null | undefined
      timestamp?: string | Date | null | undefined
      type?: DmsProofOfDeliveryTypeEnum | undefined
      updatedAt?: string | Date | null | undefined
      verificationCode?: string | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'dms.proofOfDeliveries',
    'dms.proofOfDeliveries',
    {
      createdAt: Date | null
      deliveryTaskId: string
      filePath: string | null
      id: string
      latitude: number | null
      longitude: number | null
      recipientName: string | null
      signatureData: string | null
      timestamp: Date | null
      type: DmsProofOfDeliveryTypeEnum
      updatedAt: Date | null
      verificationCode: string | null
    }
  > {
    return this.db
      .updateTable('dms.proofOfDeliveries')
      .set(value)
      .where('id', '=', id)
      .returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'dms.proofOfDeliveries', DeleteResult> {
    return this.db.deleteFrom('dms.proofOfDeliveries').where('id', '=', id)
  }
}

export class DmsProofOfDeliveryRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.proofOfDeliveries'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.proofOfDeliveries', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.proofOfDeliveries')
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

    if (search) builder = builder.where('dms.proofOfDeliveries.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['dms.proofOfDeliveries']>) {
    return this.db.insertInto('dms.proofOfDeliveries').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['dms.proofOfDeliveries']>[]) {
    return this.db.insertInto('dms.proofOfDeliveries').values(values).returningAll()
  }

  update(
    id: DB['dms.proofOfDeliveries']['id']['__update__'],
    value: Updateable<DB['dms.proofOfDeliveries']>,
  ) {
    return this.db
      .updateTable('dms.proofOfDeliveries')
      .set(value)
      .where('dms.proofOfDeliveries.id', '=', id)
      .returningAll()
  }

  delete(id: DB['dms.proofOfDeliveries']['id']['__update__']) {
    return this.db.deleteFrom('dms.proofOfDeliveries').where('dms.proofOfDeliveries.id', '=', id)
  }
}
