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
import type { BillingSyncStatusEnum, DB } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class AccountingSyncLogRepository implements GenericRepository<'billing.accountingSyncLog'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'billing.accountingSyncLog'> | undefined,
    filter?: FilterConfig<'billing.accountingSyncLog'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.accountingSyncLog',
    {
      id: string
      createdAt: Date | null
      updatedAt: Date | null
      errorMessage: string | null
      externalId: string | null
      externalSystem: string
      lastSyncAt: Date | null
      nextRetryAt: Date | null
      recordId: string
      recordType: string
      requestPayload: string | null
      responsePayload: string | null
      retryCount: number | null
      status: BillingSyncStatusEnum | null
    }
  > {
    let query = this.db.selectFrom('billing.accountingSyncLog').selectAll()

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
    sort?: SortConfig<'billing.accountingSyncLog'> | undefined,
    filter?: FilterConfig<'billing.accountingSyncLog'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.accountingSyncLog',
    {
      id: string
      createdAt: Date | null
      updatedAt: Date | null
      errorMessage: string | null
      externalId: string | null
      externalSystem: string
      lastSyncAt: Date | null
      nextRetryAt: Date | null
      recordId: string
      recordType: string
      requestPayload: string | null
      responsePayload: string | null
      retryCount: number | null
      status: BillingSyncStatusEnum | null
    }
  > {
    let query = this.db
      .selectFrom('billing.accountingSyncLog')
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
    'billing.accountingSyncLog',
    {
      id: string
      createdAt: Date | null
      updatedAt: Date | null
      errorMessage: string | null
      externalId: string | null
      externalSystem: string
      lastSyncAt: Date | null
      nextRetryAt: Date | null
      recordId: string
      recordType: string
      requestPayload: string | null
      responsePayload: string | null
      retryCount: number | null
      status: BillingSyncStatusEnum | null
    }
  > {
    return this.db.selectFrom('billing.accountingSyncLog').selectAll().where('id', 'in', values)
  }
  create(
    value: { externalSystem: string; recordId: string; recordType: string } & {
      id?: string | undefined
      createdAt?: string | Date | null | undefined
      updatedAt?: string | Date | null | undefined
      errorMessage?: string | null | undefined
      externalId?: string | null | undefined
      lastSyncAt?: string | Date | null | undefined
      nextRetryAt?: string | Date | null | undefined
      requestPayload?: string | null | undefined
      responsePayload?: string | null | undefined
      retryCount?: number | null | undefined
      status?: BillingSyncStatusEnum | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'billing.accountingSyncLog',
    {
      id: string
      createdAt: Date | null
      updatedAt: Date | null
      errorMessage: string | null
      externalId: string | null
      externalSystem: string
      lastSyncAt: Date | null
      nextRetryAt: Date | null
      recordId: string
      recordType: string
      requestPayload: string | null
      responsePayload: string | null
      retryCount: number | null
      status: BillingSyncStatusEnum | null
    }
  > {
    return this.db.insertInto('billing.accountingSyncLog').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      id?: string | undefined
      createdAt?: string | Date | null | undefined
      updatedAt?: string | Date | null | undefined
      errorMessage?: string | null | undefined
      externalId?: string | null | undefined
      externalSystem?: string | undefined
      lastSyncAt?: string | Date | null | undefined
      nextRetryAt?: string | Date | null | undefined
      recordId?: string | undefined
      recordType?: string | undefined
      requestPayload?: string | null | undefined
      responsePayload?: string | null | undefined
      retryCount?: number | null | undefined
      status?: BillingSyncStatusEnum | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'billing.accountingSyncLog',
    'billing.accountingSyncLog',
    {
      id: string
      createdAt: Date | null
      updatedAt: Date | null
      errorMessage: string | null
      externalId: string | null
      externalSystem: string
      lastSyncAt: Date | null
      nextRetryAt: Date | null
      recordId: string
      recordType: string
      requestPayload: string | null
      responsePayload: string | null
      retryCount: number | null
      status: BillingSyncStatusEnum | null
    }
  > {
    return this.db
      .updateTable('billing.accountingSyncLog')
      .set(value)
      .where('id', '=', id)
      .returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'billing.accountingSyncLog', DeleteResult> {
    return this.db.deleteFrom('billing.accountingSyncLog').where('id', '=', id)
  }
}

export class BillingAccountingSyncLogRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.accountingSyncLog'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.accountingSyncLog', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.accountingSyncLog')
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

    if (search) builder = builder.where('billing.accountingSyncLog.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['billing.accountingSyncLog']>) {
    return this.db.insertInto('billing.accountingSyncLog').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['billing.accountingSyncLog']>[]) {
    return this.db.insertInto('billing.accountingSyncLog').values(values).returningAll()
  }

  update(
    id: DB['billing.accountingSyncLog']['id']['__update__'],
    value: Updateable<DB['billing.accountingSyncLog']>,
  ) {
    return this.db
      .updateTable('billing.accountingSyncLog')
      .set(value)
      .where('billing.accountingSyncLog.id', '=', id)
      .returningAll()
  }

  delete(id: DB['billing.accountingSyncLog']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.accountingSyncLog')
      .where('billing.accountingSyncLog.id', '=', id)
  }
}
