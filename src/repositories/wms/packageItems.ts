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

export class PackageItemRepository implements GenericRepository<'wms.packageItems'> {
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.packageItems'> | undefined,
    filter?: FilterConfig<'wms.packageItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.packageItems',
    {
      batchId: string | null
      createdAt: Date | null
      expiryDate: Date | null
      id: string
      lotNumber: string | null
      packageId: string
      productId: string
      quantity: number
      serialNumbers: string[] | null
      totalWeight: number | null
      unitWeight: number | null
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('wms.packageItems').selectAll()

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
    sort?: SortConfig<'wms.packageItems'> | undefined,
    filter?: FilterConfig<'wms.packageItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.packageItems',
    {
      batchId: string | null
      createdAt: Date | null
      expiryDate: Date | null
      id: string
      lotNumber: string | null
      packageId: string
      productId: string
      quantity: number
      serialNumbers: string[] | null
      totalWeight: number | null
      unitWeight: number | null
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('wms.packageItems')
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
    'wms.packageItems',
    {
      batchId: string | null
      createdAt: Date | null
      expiryDate: Date | null
      id: string
      lotNumber: string | null
      packageId: string
      productId: string
      quantity: number
      serialNumbers: string[] | null
      totalWeight: number | null
      unitWeight: number | null
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('wms.packageItems').selectAll().where('id', 'in', values)
  }
  create(
    value: { packageId: string; productId: string; quantity: number } & {
      batchId?: string | null | undefined
      createdAt?: string | Date | null | undefined
      expiryDate?: string | Date | null | undefined
      id?: string | undefined
      lotNumber?: string | null | undefined
      serialNumbers?: string[] | null | undefined
      totalWeight?: number | null | undefined
      unitWeight?: number | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'wms.packageItems',
    {
      batchId: string | null
      createdAt: Date | null
      expiryDate: Date | null
      id: string
      lotNumber: string | null
      packageId: string
      productId: string
      quantity: number
      serialNumbers: string[] | null
      totalWeight: number | null
      unitWeight: number | null
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('wms.packageItems').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      batchId?: string | null | undefined
      createdAt?: string | Date | null | undefined
      expiryDate?: string | Date | null | undefined
      id?: string | undefined
      lotNumber?: string | null | undefined
      packageId?: string | undefined
      productId?: string | undefined
      quantity?: number | undefined
      serialNumbers?: string[] | null | undefined
      totalWeight?: number | null | undefined
      unitWeight?: number | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.packageItems',
    'wms.packageItems',
    {
      batchId: string | null
      createdAt: Date | null
      expiryDate: Date | null
      id: string
      lotNumber: string | null
      packageId: string
      productId: string
      quantity: number
      serialNumbers: string[] | null
      totalWeight: number | null
      unitWeight: number | null
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('wms.packageItems').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.packageItems', DeleteResult> {
    return this.db.deleteFrom('wms.packageItems').where('id', '=', id)
  }
}

export class WmsPackageItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.packageItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.packageItems', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.packageItems')
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

    if (search) builder = builder.where('wms.packageItems.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['wms.packageItems']>) {
    return this.db.insertInto('wms.packageItems').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['wms.packageItems']>[]) {
    return this.db.insertInto('wms.packageItems').values(values).returningAll()
  }

  update(
    id: DB['wms.packageItems']['id']['__update__'],
    value: Updateable<DB['wms.packageItems']>,
  ) {
    return this.db
      .updateTable('wms.packageItems')
      .set(value)
      .where('wms.packageItems.id', '=', id)
      .returningAll()
  }

  delete(id: DB['wms.packageItems']['id']['__update__']) {
    return this.db.deleteFrom('wms.packageItems').where('wms.packageItems.id', '=', id)
  }
}
