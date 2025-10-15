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
import type { CrmInvoiceStatus, CrmPaymentMethod, DB } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class InvoiceRepository implements GenericRepository<'crm.invoices'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.invoices'> | undefined,
    filter?: FilterConfig<'crm.invoices'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.invoices',
    {
      createdAt: Date | null
      dueDate: Date | null
      id: string
      issueDate: Date | null
      opportunityId: string | null
      paidAt: Date | null
      paymentMethod: CrmPaymentMethod | null
      sentAt: Date | null
      status: CrmInvoiceStatus | null
      total: string | null
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('crm.invoices').selectAll()

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
    sort?: SortConfig<'crm.invoices'> | undefined,
    filter?: FilterConfig<'crm.invoices'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.invoices',
    {
      createdAt: Date | null
      dueDate: Date | null
      id: string
      issueDate: Date | null
      opportunityId: string | null
      paidAt: Date | null
      paymentMethod: CrmPaymentMethod | null
      sentAt: Date | null
      status: CrmInvoiceStatus | null
      total: string | null
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('crm.invoices')
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
    'crm.invoices',
    {
      createdAt: Date | null
      dueDate: Date | null
      id: string
      issueDate: Date | null
      opportunityId: string | null
      paidAt: Date | null
      paymentMethod: CrmPaymentMethod | null
      sentAt: Date | null
      status: CrmInvoiceStatus | null
      total: string | null
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('crm.invoices').selectAll().where('id', 'in', values)
  }
  create(
    value: {} & {
      createdAt?: string | Date | null | undefined
      dueDate?: string | Date | null | undefined
      id?: string | undefined
      issueDate?: string | Date | null | undefined
      opportunityId?: string | null | undefined
      paidAt?: string | Date | null | undefined
      paymentMethod?: CrmPaymentMethod | null | undefined
      sentAt?: string | Date | null | undefined
      status?: CrmInvoiceStatus | null | undefined
      total?: string | number | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'crm.invoices',
    {
      createdAt: Date | null
      dueDate: Date | null
      id: string
      issueDate: Date | null
      opportunityId: string | null
      paidAt: Date | null
      paymentMethod: CrmPaymentMethod | null
      sentAt: Date | null
      status: CrmInvoiceStatus | null
      total: string | null
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('crm.invoices').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined
      dueDate?: string | Date | null | undefined
      id?: string | undefined
      issueDate?: string | Date | null | undefined
      opportunityId?: string | null | undefined
      paidAt?: string | Date | null | undefined
      paymentMethod?: CrmPaymentMethod | null | undefined
      sentAt?: string | Date | null | undefined
      status?: CrmInvoiceStatus | null | undefined
      total?: string | number | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.invoices',
    'crm.invoices',
    {
      createdAt: Date | null
      dueDate: Date | null
      id: string
      issueDate: Date | null
      opportunityId: string | null
      paidAt: Date | null
      paymentMethod: CrmPaymentMethod | null
      sentAt: Date | null
      status: CrmInvoiceStatus | null
      total: string | null
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('crm.invoices').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'crm.invoices', DeleteResult> {
    return this.db.deleteFrom('crm.invoices').where('id', '=', id)
  }
}

export class CrmInvoiceRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.invoices'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.invoices', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.invoices')
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

    if (search) builder = builder.where('crm.invoices.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['crm.invoices']>) {
    return this.db.insertInto('crm.invoices').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['crm.invoices']>[]) {
    return this.db.insertInto('crm.invoices').values(values).returningAll()
  }

  update(id: DB['crm.invoices']['id']['__update__'], value: Updateable<DB['crm.invoices']>) {
    return this.db
      .updateTable('crm.invoices')
      .set(value)
      .where('crm.invoices.id', '=', id)
      .returningAll()
  }

  delete(id: DB['crm.invoices']['id']['__update__']) {
    return this.db.deleteFrom('crm.invoices').where('crm.invoices.id', '=', id)
  }
}
