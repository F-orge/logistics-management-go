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

export class OutboundShipmentItemRepository
  implements GenericRepository<'wms.outboundShipmentItems'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.outboundShipmentItems'> | undefined,
    filter?: FilterConfig<'wms.outboundShipmentItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.outboundShipmentItems',
    {
      batchId: string | null
      createdAt: Date | null
      id: string
      outboundShipmentId: string
      productId: string
      quantityShipped: number
      salesOrderItemId: string
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('wms.outboundShipmentItems').selectAll()

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
    sort?: SortConfig<'wms.outboundShipmentItems'> | undefined,
    filter?: FilterConfig<'wms.outboundShipmentItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.outboundShipmentItems',
    {
      batchId: string | null
      createdAt: Date | null
      id: string
      outboundShipmentId: string
      productId: string
      quantityShipped: number
      salesOrderItemId: string
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('wms.outboundShipmentItems')
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
    'wms.outboundShipmentItems',
    {
      batchId: string | null
      createdAt: Date | null
      id: string
      outboundShipmentId: string
      productId: string
      quantityShipped: number
      salesOrderItemId: string
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('wms.outboundShipmentItems').selectAll().where('id', 'in', values)
  }
  create(
    value: {
      outboundShipmentId: string
      productId: string
      quantityShipped: number
      salesOrderItemId: string
    } & {
      batchId?: string | null | undefined
      createdAt?: string | Date | null | undefined
      id?: string | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'wms.outboundShipmentItems',
    {
      batchId: string | null
      createdAt: Date | null
      id: string
      outboundShipmentId: string
      productId: string
      quantityShipped: number
      salesOrderItemId: string
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('wms.outboundShipmentItems').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      batchId?: string | null | undefined
      createdAt?: string | Date | null | undefined
      id?: string | undefined
      outboundShipmentId?: string | undefined
      productId?: string | undefined
      quantityShipped?: number | undefined
      salesOrderItemId?: string | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.outboundShipmentItems',
    'wms.outboundShipmentItems',
    {
      batchId: string | null
      createdAt: Date | null
      id: string
      outboundShipmentId: string
      productId: string
      quantityShipped: number
      salesOrderItemId: string
      updatedAt: Date | null
    }
  > {
    return this.db
      .updateTable('wms.outboundShipmentItems')
      .set(value)
      .where('id', '=', id)
      .returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.outboundShipmentItems', DeleteResult> {
    return this.db.deleteFrom('wms.outboundShipmentItems').where('id', '=', id)
  }
}

export class WmsOutboundShipmentItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.outboundShipmentItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.outboundShipmentItems', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.outboundShipmentItems')
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

    if (search) builder = builder.where('wms.outboundShipmentItems.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['wms.outboundShipmentItems']>) {
    return this.db.insertInto('wms.outboundShipmentItems').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['wms.outboundShipmentItems']>[]) {
    return this.db.insertInto('wms.outboundShipmentItems').values(values).returningAll()
  }

  update(
    id: DB['wms.outboundShipmentItems']['id']['__update__'],
    value: Updateable<DB['wms.outboundShipmentItems']>,
  ) {
    return this.db
      .updateTable('wms.outboundShipmentItems')
      .set(value)
      .where('wms.outboundShipmentItems.id', '=', id)
      .returningAll()
  }

  delete(id: DB['wms.outboundShipmentItems']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.outboundShipmentItems')
      .where('wms.outboundShipmentItems.id', '=', id)
  }
}
