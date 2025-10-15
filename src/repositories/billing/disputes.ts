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
import type { BillingDisputeStatusEnum, DB } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class DisputeRepository implements GenericRepository<'billing.disputes'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'billing.disputes'> | undefined,
    filter?: FilterConfig<'billing.disputes'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.disputes',
    {
      clientId: string
      createdAt: Date | null
      disputedAmount: string | null
      id: string
      lineItemId: string
      reason: string
      resolutionNotes: string | null
      resolvedAt: Date | null
      resolvedByUserId: string | null
      status: BillingDisputeStatusEnum | null
      submittedAt: Date | null
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('billing.disputes').selectAll()

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
    sort?: SortConfig<'billing.disputes'> | undefined,
    filter?: FilterConfig<'billing.disputes'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.disputes',
    {
      clientId: string
      createdAt: Date | null
      disputedAmount: string | null
      id: string
      lineItemId: string
      reason: string
      resolutionNotes: string | null
      resolvedAt: Date | null
      resolvedByUserId: string | null
      status: BillingDisputeStatusEnum | null
      submittedAt: Date | null
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('billing.disputes')
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
    'billing.disputes',
    {
      clientId: string
      createdAt: Date | null
      disputedAmount: string | null
      id: string
      lineItemId: string
      reason: string
      resolutionNotes: string | null
      resolvedAt: Date | null
      resolvedByUserId: string | null
      status: BillingDisputeStatusEnum | null
      submittedAt: Date | null
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('billing.disputes').selectAll().where('id', 'in', values)
  }
  create(
    value: { clientId: string; lineItemId: string; reason: string } & {
      createdAt?: string | Date | null | undefined
      disputedAmount?: string | number | null | undefined
      id?: string | undefined
      resolutionNotes?: string | null | undefined
      resolvedAt?: string | Date | null | undefined
      resolvedByUserId?: string | null | undefined
      status?: BillingDisputeStatusEnum | null | undefined
      submittedAt?: string | Date | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'billing.disputes',
    {
      clientId: string
      createdAt: Date | null
      disputedAmount: string | null
      id: string
      lineItemId: string
      reason: string
      resolutionNotes: string | null
      resolvedAt: Date | null
      resolvedByUserId: string | null
      status: BillingDisputeStatusEnum | null
      submittedAt: Date | null
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('billing.disputes').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      clientId?: string | undefined
      createdAt?: string | Date | null | undefined
      disputedAmount?: string | number | null | undefined
      id?: string | undefined
      lineItemId?: string | undefined
      reason?: string | undefined
      resolutionNotes?: string | null | undefined
      resolvedAt?: string | Date | null | undefined
      resolvedByUserId?: string | null | undefined
      status?: BillingDisputeStatusEnum | null | undefined
      submittedAt?: string | Date | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'billing.disputes',
    'billing.disputes',
    {
      clientId: string
      createdAt: Date | null
      disputedAmount: string | null
      id: string
      lineItemId: string
      reason: string
      resolutionNotes: string | null
      resolvedAt: Date | null
      resolvedByUserId: string | null
      status: BillingDisputeStatusEnum | null
      submittedAt: Date | null
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('billing.disputes').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'billing.disputes', DeleteResult> {
    return this.db.deleteFrom('billing.disputes').where('id', '=', id)
  }
}

export class BillingDisputeRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.disputes'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.disputes', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.disputes')
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

    if (search) builder = builder.where('billing.disputes.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['billing.disputes']>) {
    return this.db.insertInto('billing.disputes').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['billing.disputes']>[]) {
    return this.db.insertInto('billing.disputes').values(values).returningAll()
  }

  update(
    id: DB['billing.disputes']['id']['__update__'],
    value: Updateable<DB['billing.disputes']>,
  ) {
    return this.db
      .updateTable('billing.disputes')
      .set(value)
      .where('billing.disputes.id', '=', id)
      .returningAll()
  }

  delete(id: DB['billing.disputes']['id']['__update__']) {
    return this.db.deleteFrom('billing.disputes').where('billing.disputes.id', '=', id)
  }
}
