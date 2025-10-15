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

export class ClientAccountRepository implements GenericRepository<'billing.clientAccounts'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'billing.clientAccounts'> | undefined,
    filter?: FilterConfig<'billing.clientAccounts'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.clientAccounts',
    {
      availableCredit: string | null
      clientId: string
      createdAt: Date | null
      creditLimit: string | null
      currency: string | null
      id: string
      isCreditApproved: boolean | null
      lastPaymentDate: Date | null
      paymentTermsDays: number | null
      updatedAt: Date | null
      walletBalance: string | null
    }
  > {
    let query = this.db.selectFrom('billing.clientAccounts').selectAll()

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
    sort?: SortConfig<'billing.clientAccounts'> | undefined,
    filter?: FilterConfig<'billing.clientAccounts'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.clientAccounts',
    {
      availableCredit: string | null
      clientId: string
      createdAt: Date | null
      creditLimit: string | null
      currency: string | null
      id: string
      isCreditApproved: boolean | null
      lastPaymentDate: Date | null
      paymentTermsDays: number | null
      updatedAt: Date | null
      walletBalance: string | null
    }
  > {
    let query = this.db
      .selectFrom('billing.clientAccounts')
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
    'billing.clientAccounts',
    {
      availableCredit: string | null
      clientId: string
      createdAt: Date | null
      creditLimit: string | null
      currency: string | null
      id: string
      isCreditApproved: boolean | null
      lastPaymentDate: Date | null
      paymentTermsDays: number | null
      updatedAt: Date | null
      walletBalance: string | null
    }
  > {
    return this.db.selectFrom('billing.clientAccounts').selectAll().where('id', 'in', values)
  }
  create(
    value: { clientId: string } & {
      availableCredit?: string | number | null | undefined
      createdAt?: string | Date | null | undefined
      creditLimit?: string | number | null | undefined
      currency?: string | null | undefined
      id?: string | undefined
      isCreditApproved?: boolean | null | undefined
      lastPaymentDate?: string | Date | null | undefined
      paymentTermsDays?: number | null | undefined
      updatedAt?: string | Date | null | undefined
      walletBalance?: string | number | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'billing.clientAccounts',
    {
      availableCredit: string | null
      clientId: string
      createdAt: Date | null
      creditLimit: string | null
      currency: string | null
      id: string
      isCreditApproved: boolean | null
      lastPaymentDate: Date | null
      paymentTermsDays: number | null
      updatedAt: Date | null
      walletBalance: string | null
    }
  > {
    return this.db.insertInto('billing.clientAccounts').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      availableCredit?: string | number | null | undefined
      clientId?: string | undefined
      createdAt?: string | Date | null | undefined
      creditLimit?: string | number | null | undefined
      currency?: string | null | undefined
      id?: string | undefined
      isCreditApproved?: boolean | null | undefined
      lastPaymentDate?: string | Date | null | undefined
      paymentTermsDays?: number | null | undefined
      updatedAt?: string | Date | null | undefined
      walletBalance?: string | number | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'billing.clientAccounts',
    'billing.clientAccounts',
    {
      availableCredit: string | null
      clientId: string
      createdAt: Date | null
      creditLimit: string | null
      currency: string | null
      id: string
      isCreditApproved: boolean | null
      lastPaymentDate: Date | null
      paymentTermsDays: number | null
      updatedAt: Date | null
      walletBalance: string | null
    }
  > {
    return this.db
      .updateTable('billing.clientAccounts')
      .set(value)
      .where('id', '=', id)
      .returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'billing.clientAccounts', DeleteResult> {
    return this.db.deleteFrom('billing.clientAccounts').where('id', '=', id)
  }
}

export class BillingClientAccountRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.clientAccounts'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.clientAccounts', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.clientAccounts')
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

    if (search) builder = builder.where('billing.clientAccounts.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['billing.clientAccounts']>) {
    return this.db.insertInto('billing.clientAccounts').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['billing.clientAccounts']>[]) {
    return this.db.insertInto('billing.clientAccounts').values(values).returningAll()
  }

  update(
    id: DB['billing.clientAccounts']['id']['__update__'],
    value: Updateable<DB['billing.clientAccounts']>,
  ) {
    return this.db
      .updateTable('billing.clientAccounts')
      .set(value)
      .where('billing.clientAccounts.id', '=', id)
      .returningAll()
  }

  delete(id: DB['billing.clientAccounts']['id']['__update__']) {
    return this.db.deleteFrom('billing.clientAccounts').where('billing.clientAccounts.id', '=', id)
  }
}
