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

export class SalesOrderItemRepository implements GenericRepository<'wms.salesOrderItems'> {
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.salesOrderItems'> | undefined,
    filter?: FilterConfig<'wms.salesOrderItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.salesOrderItems',
    {
      createdAt: Date | null
      id: string
      productId: string
      quantityOrdered: number
      salesOrderId: string
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('wms.salesOrderItems').selectAll()

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
    sort?: SortConfig<'wms.salesOrderItems'> | undefined,
    filter?: FilterConfig<'wms.salesOrderItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.salesOrderItems',
    {
      createdAt: Date | null
      id: string
      productId: string
      quantityOrdered: number
      salesOrderId: string
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('wms.salesOrderItems')
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
    'wms.salesOrderItems',
    {
      createdAt: Date | null
      id: string
      productId: string
      quantityOrdered: number
      salesOrderId: string
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('wms.salesOrderItems').selectAll().where('id', 'in', values)
  }
  create(
    value: {
      productId: string
      quantityOrdered: number
      salesOrderId: string
    } & {
      createdAt?: string | Date | null | undefined
      id?: string | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'wms.salesOrderItems',
    {
      createdAt: Date | null
      id: string
      productId: string
      quantityOrdered: number
      salesOrderId: string
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('wms.salesOrderItems').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined
      id?: string | undefined
      productId?: string | undefined
      quantityOrdered?: number | undefined
      salesOrderId?: string | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.salesOrderItems',
    'wms.salesOrderItems',
    {
      createdAt: Date | null
      id: string
      productId: string
      quantityOrdered: number
      salesOrderId: string
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('wms.salesOrderItems').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.salesOrderItems', DeleteResult> {
    return this.db.deleteFrom('wms.salesOrderItems').where('id', '=', id)
  }
}

export class WmsSalesOrderItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.salesOrderItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.salesOrderItems', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.salesOrderItems')
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

    if (search) builder = builder.where('wms.salesOrderItems.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['wms.salesOrderItems']>) {
    return this.db.insertInto('wms.salesOrderItems').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['wms.salesOrderItems']>[]) {
    return this.db.insertInto('wms.salesOrderItems').values(values).returningAll()
  }

  update(
    id: DB['wms.salesOrderItems']['id']['__update__'],
    value: Updateable<DB['wms.salesOrderItems']>,
  ) {
    return this.db
      .updateTable('wms.salesOrderItems')
      .set(value)
      .where('wms.salesOrderItems.id', '=', id)
      .returningAll()
  }

  delete(id: DB['wms.salesOrderItems']['id']['__update__']) {
    return this.db.deleteFrom('wms.salesOrderItems').where('wms.salesOrderItems.id', '=', id)
  }
}
