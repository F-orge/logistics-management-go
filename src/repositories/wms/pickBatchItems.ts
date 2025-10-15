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

export class PickBatchItemRepository implements GenericRepository<'wms.pickBatchItems'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.pickBatchItems'> | undefined,
    filter?: FilterConfig<'wms.pickBatchItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.pickBatchItems',
    {
      actualPickTime: number | null
      createdAt: Date | null
      estimatedPickTime: number | null
      id: string
      orderPriority: number | null
      pickBatchId: string
      salesOrderId: string
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('wms.pickBatchItems').selectAll()

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
    sort?: SortConfig<'wms.pickBatchItems'> | undefined,
    filter?: FilterConfig<'wms.pickBatchItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.pickBatchItems',
    {
      actualPickTime: number | null
      createdAt: Date | null
      estimatedPickTime: number | null
      id: string
      orderPriority: number | null
      pickBatchId: string
      salesOrderId: string
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('wms.pickBatchItems')
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
    'wms.pickBatchItems',
    {
      actualPickTime: number | null
      createdAt: Date | null
      estimatedPickTime: number | null
      id: string
      orderPriority: number | null
      pickBatchId: string
      salesOrderId: string
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('wms.pickBatchItems').selectAll().where('id', 'in', values)
  }
  create(
    value: { pickBatchId: string; salesOrderId: string } & {
      actualPickTime?: number | null | undefined
      createdAt?: string | Date | null | undefined
      estimatedPickTime?: number | null | undefined
      id?: string | undefined
      orderPriority?: number | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'wms.pickBatchItems',
    {
      actualPickTime: number | null
      createdAt: Date | null
      estimatedPickTime: number | null
      id: string
      orderPriority: number | null
      pickBatchId: string
      salesOrderId: string
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('wms.pickBatchItems').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      actualPickTime?: number | null | undefined
      createdAt?: string | Date | null | undefined
      estimatedPickTime?: number | null | undefined
      id?: string | undefined
      orderPriority?: number | null | undefined
      pickBatchId?: string | undefined
      salesOrderId?: string | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.pickBatchItems',
    'wms.pickBatchItems',
    {
      actualPickTime: number | null
      createdAt: Date | null
      estimatedPickTime: number | null
      id: string
      orderPriority: number | null
      pickBatchId: string
      salesOrderId: string
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('wms.pickBatchItems').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.pickBatchItems', DeleteResult> {
    return this.db.deleteFrom('wms.pickBatchItems').where('id', '=', id)
  }
}

export class WmsPickBatchItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.pickBatchItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.pickBatchItems', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.pickBatchItems')
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

    if (search) builder = builder.where('wms.pickBatchItems.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['wms.pickBatchItems']>) {
    return this.db.insertInto('wms.pickBatchItems').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['wms.pickBatchItems']>[]) {
    return this.db.insertInto('wms.pickBatchItems').values(values).returningAll()
  }

  update(
    id: DB['wms.pickBatchItems']['id']['__update__'],
    value: Updateable<DB['wms.pickBatchItems']>,
  ) {
    return this.db
      .updateTable('wms.pickBatchItems')
      .set(value)
      .where('wms.pickBatchItems.id', '=', id)
      .returningAll()
  }

  delete(id: DB['wms.pickBatchItems']['id']['__update__']) {
    return this.db.deleteFrom('wms.pickBatchItems').where('wms.pickBatchItems.id', '=', id)
  }
}
