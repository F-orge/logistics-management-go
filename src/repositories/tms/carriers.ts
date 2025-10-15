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

export class CarrierRepository implements GenericRepository<'tms.carriers'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.carriers'> | undefined,
    filter?: FilterConfig<'tms.carriers'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.carriers',
    {
      contactDetails: string | null
      createdAt: Date | null
      id: string
      name: string
      servicesOffered: string | null
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('tms.carriers').selectAll()

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
    sort?: SortConfig<'tms.carriers'> | undefined,
    filter?: FilterConfig<'tms.carriers'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.carriers',
    {
      contactDetails: string | null
      createdAt: Date | null
      id: string
      name: string
      servicesOffered: string | null
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('tms.carriers')
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
    'tms.carriers',
    {
      contactDetails: string | null
      createdAt: Date | null
      id: string
      name: string
      servicesOffered: string | null
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('tms.carriers').selectAll().where('id', 'in', values)
  }
  create(
    value: { name: string } & {
      contactDetails?: string | null | undefined
      createdAt?: string | Date | null | undefined
      id?: string | undefined
      servicesOffered?: string | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'tms.carriers',
    {
      contactDetails: string | null
      createdAt: Date | null
      id: string
      name: string
      servicesOffered: string | null
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('tms.carriers').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      contactDetails?: string | null | undefined
      createdAt?: string | Date | null | undefined
      id?: string | undefined
      name?: string | undefined
      servicesOffered?: string | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.carriers',
    'tms.carriers',
    {
      contactDetails: string | null
      createdAt: Date | null
      id: string
      name: string
      servicesOffered: string | null
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('tms.carriers').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'tms.carriers', DeleteResult> {
    return this.db.deleteFrom('tms.carriers').where('id', '=', id)
  }
}

export class TmsCarrierRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.carriers'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.carriers', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.carriers')
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

    if (search) builder = builder.where('tms.carriers.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['tms.carriers']>) {
    return this.db.insertInto('tms.carriers').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['tms.carriers']>[]) {
    return this.db.insertInto('tms.carriers').values(values).returningAll()
  }

  update(id: DB['tms.carriers']['id']['__update__'], value: Updateable<DB['tms.carriers']>) {
    return this.db
      .updateTable('tms.carriers')
      .set(value)
      .where('tms.carriers.id', '=', id)
      .returningAll()
  }

  delete(id: DB['tms.carriers']['id']['__update__']) {
    return this.db.deleteFrom('tms.carriers').where('tms.carriers.id', '=', id)
  }
}
