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
import type { CrmRecordType, DB } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class TaggingRepository implements GenericRepository<'crm.taggings'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.taggings'> | undefined,
    filter?: FilterConfig<'crm.taggings'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.taggings',
    { id: string; recordId: string; recordType: CrmRecordType; tagId: string }
  > {
    let query = this.db.selectFrom('crm.taggings').selectAll()

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
    sort?: SortConfig<'crm.taggings'> | undefined,
    filter?: FilterConfig<'crm.taggings'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.taggings',
    { id: string; recordId: string; recordType: CrmRecordType; tagId: string }
  > {
    throw new Error('Cannot be implemented since this is a sub table')
  }
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'crm.taggings',
    { id: string; recordId: string; recordType: CrmRecordType; tagId: string }
  > {
    return this.db.selectFrom('crm.taggings').selectAll().where('id', 'in', values)
  }
  create(
    value: { recordId: string; recordType: CrmRecordType; tagId: string } & {
      id?: string | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'crm.taggings',
    { id: string; recordId: string; recordType: CrmRecordType; tagId: string }
  > {
    return this.db.insertInto('crm.taggings').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      id?: string | undefined
      recordId?: string | undefined
      recordType?: CrmRecordType | undefined
      tagId?: string | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.taggings',
    'crm.taggings',
    { id: string; recordId: string; recordType: CrmRecordType; tagId: string }
  > {
    return this.db.updateTable('crm.taggings').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'crm.taggings', DeleteResult> {
    return this.db.deleteFrom('crm.taggings').where('id', '=', id)
  }
}

export class CrmTaggingRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.taggings'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.taggings', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.taggings')
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

    if (search) builder = builder.where('crm.taggings.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['crm.taggings']>) {
    return this.db.insertInto('crm.taggings').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['crm.taggings']>[]) {
    return this.db.insertInto('crm.taggings').values(values).returningAll()
  }

  update(id: DB['crm.taggings']['id']['__update__'], value: Updateable<DB['crm.taggings']>) {
    return this.db
      .updateTable('crm.taggings')
      .set(value)
      .where('crm.taggings.id', '=', id)
      .returningAll()
  }

  delete(id: DB['crm.taggings']['id']['__update__']) {
    return this.db.deleteFrom('crm.taggings').where('crm.taggings.id', '=', id)
  }
}
