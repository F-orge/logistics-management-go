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

export class InvoiceItemRepository implements GenericRepository<'crm.invoiceItems'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.invoiceItems'> | undefined,
    filter?: FilterConfig<'crm.invoiceItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.invoiceItems',
    {
      createdAt: Date | null
      id: string
      invoiceId: string
      price: string
      productId: string
      quantity: number
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('crm.invoiceItems').selectAll()

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
    sort?: SortConfig<'crm.invoiceItems'> | undefined,
    filter?: FilterConfig<'crm.invoiceItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.invoiceItems',
    {
      createdAt: Date | null
      id: string
      invoiceId: string
      price: string
      productId: string
      quantity: number
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('crm.invoiceItems')
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
    'crm.invoiceItems',
    {
      createdAt: Date | null
      id: string
      invoiceId: string
      price: string
      productId: string
      quantity: number
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('crm.invoiceItems').selectAll().where('id', 'in', values)
  }
  create(
    value: {
      invoiceId: string
      price: string | number
      productId: string
      quantity: number
    } & {
      createdAt?: string | Date | null | undefined
      id?: string | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'crm.invoiceItems',
    {
      createdAt: Date | null
      id: string
      invoiceId: string
      price: string
      productId: string
      quantity: number
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('crm.invoiceItems').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined
      id?: string | undefined
      invoiceId?: string | undefined
      price?: string | number | undefined
      productId?: string | undefined
      quantity?: number | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.invoiceItems',
    'crm.invoiceItems',
    {
      createdAt: Date | null
      id: string
      invoiceId: string
      price: string
      productId: string
      quantity: number
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('crm.invoiceItems').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'crm.invoiceItems', DeleteResult> {
    return this.db.deleteFrom('crm.invoiceItems').where('id', '=', id)
  }
}

export class CrmInvoiceItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.invoiceItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.invoiceItems', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.invoiceItems')
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

    if (search) builder = builder.where('crm.invoiceItems.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['crm.invoiceItems']>) {
    return this.db.insertInto('crm.invoiceItems').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['crm.invoiceItems']>[]) {
    return this.db.insertInto('crm.invoiceItems').values(values).returningAll()
  }

  update(
    id: DB['crm.invoiceItems']['id']['__update__'],
    value: Updateable<DB['crm.invoiceItems']>,
  ) {
    return this.db
      .updateTable('crm.invoiceItems')
      .set(value)
      .where('crm.invoiceItems.id', '=', id)
      .returningAll()
  }

  delete(id: DB['crm.invoiceItems']['id']['__update__']) {
    return this.db.deleteFrom('crm.invoiceItems').where('crm.invoiceItems.id', '=', id)
  }
}
