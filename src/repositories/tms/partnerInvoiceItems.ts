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

export class PartnerInvoiceItemRepository implements GenericRepository<'tms.partnerInvoiceItems'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.partnerInvoiceItems'> | undefined,
    filter?: FilterConfig<'tms.partnerInvoiceItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.partnerInvoiceItems',
    {
      amount: string
      id: string
      partnerInvoiceId: string
      shipmentLegId: string
    }
  > {
    let query = this.db.selectFrom('tms.partnerInvoiceItems').selectAll()

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
    sort?: SortConfig<'tms.partnerInvoiceItems'> | undefined,
    filter?: FilterConfig<'tms.partnerInvoiceItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.partnerInvoiceItems',
    {
      amount: string
      id: string
      partnerInvoiceId: string
      shipmentLegId: string
    }
  > {
    throw new Error('Method not implemented')
  }
  in(values: string[]): SelectQueryBuilder<
    DB,
    'tms.partnerInvoiceItems',
    {
      amount: string
      id: string
      partnerInvoiceId: string
      shipmentLegId: string
    }
  > {
    return this.db.selectFrom('tms.partnerInvoiceItems').selectAll().where('id', 'in', values)
  }
  create(
    value: {
      amount: string | number
      partnerInvoiceId: string
      shipmentLegId: string
    } & { id?: string | undefined },
  ): InsertQueryBuilder<
    DB,
    'tms.partnerInvoiceItems',
    {
      amount: string
      id: string
      partnerInvoiceId: string
      shipmentLegId: string
    }
  > {
    return this.db.insertInto('tms.partnerInvoiceItems').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      amount?: string | number | undefined
      id?: string | undefined
      partnerInvoiceId?: string | undefined
      shipmentLegId?: string | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.partnerInvoiceItems',
    'tms.partnerInvoiceItems',
    {
      amount: string
      id: string
      partnerInvoiceId: string
      shipmentLegId: string
    }
  > {
    return this.db
      .updateTable('tms.partnerInvoiceItems')
      .set(value)
      .where('id', '=', id)
      .returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'tms.partnerInvoiceItems', DeleteResult> {
    return this.db.deleteFrom('tms.partnerInvoiceItems').where('id', '=', id)
  }
}

export class TmsPartnerInvoiceItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.partnerInvoiceItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.partnerInvoiceItems', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.partnerInvoiceItems')
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

    if (search) builder = builder.where('tms.partnerInvoiceItems.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['tms.partnerInvoiceItems']>) {
    return this.db.insertInto('tms.partnerInvoiceItems').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['tms.partnerInvoiceItems']>[]) {
    return this.db.insertInto('tms.partnerInvoiceItems').values(values).returningAll()
  }

  update(
    id: DB['tms.partnerInvoiceItems']['id']['__update__'],
    value: Updateable<DB['tms.partnerInvoiceItems']>,
  ) {
    return this.db
      .updateTable('tms.partnerInvoiceItems')
      .set(value)
      .where('tms.partnerInvoiceItems.id', '=', id)
      .returningAll()
  }

  delete(id: DB['tms.partnerInvoiceItems']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.partnerInvoiceItems')
      .where('tms.partnerInvoiceItems.id', '=', id)
  }
}
