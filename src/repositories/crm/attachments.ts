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

export class AttachmentRepository implements GenericRepository<'crm.attachments'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.attachments'> | undefined,
    filter?: FilterConfig<'crm.attachments'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.attachments',
    {
      createdAt: Date | null
      fileName: string
      filePath: string
      id: string
      mimeType: string | null
      recordId: string | null
      recordType: CrmRecordType | null
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('crm.attachments').selectAll()

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
    sort?: SortConfig<'crm.attachments'> | undefined,
    filter?: FilterConfig<'crm.attachments'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.attachments',
    {
      createdAt: Date | null
      fileName: string
      filePath: string
      id: string
      mimeType: string | null
      recordId: string | null
      recordType: CrmRecordType | null
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('crm.attachments')
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
    'crm.attachments',
    {
      createdAt: Date | null
      fileName: string
      filePath: string
      id: string
      mimeType: string | null
      recordId: string | null
      recordType: CrmRecordType | null
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('crm.attachments').selectAll().where('id', 'in', values)
  }
  create(
    value: { fileName: string; filePath: string } & {
      createdAt?: string | Date | null | undefined
      id?: string | undefined
      mimeType?: string | null | undefined
      recordId?: string | null | undefined
      recordType?: CrmRecordType | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'crm.attachments',
    {
      createdAt: Date | null
      fileName: string
      filePath: string
      id: string
      mimeType: string | null
      recordId: string | null
      recordType: CrmRecordType | null
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('crm.attachments').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined
      fileName?: string | undefined
      filePath?: string | undefined
      id?: string | undefined
      mimeType?: string | null | undefined
      recordId?: string | null | undefined
      recordType?: CrmRecordType | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.attachments',
    'crm.attachments',
    {
      createdAt: Date | null
      fileName: string
      filePath: string
      id: string
      mimeType: string | null
      recordId: string | null
      recordType: CrmRecordType | null
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('crm.attachments').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'crm.attachments', DeleteResult> {
    return this.db.deleteFrom('crm.attachments').where('id', '=', id)
  }
}

export class CrmAttachmentRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.attachments'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.attachments', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.attachments')
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

    if (search) builder = builder.where('crm.attachments.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['crm.attachments']>) {
    return this.db.insertInto('crm.attachments').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['crm.attachments']>[]) {
    return this.db.insertInto('crm.attachments').values(values).returningAll()
  }

  update(id: DB['crm.attachments']['id']['__update__'], value: Updateable<DB['crm.attachments']>) {
    return this.db
      .updateTable('crm.attachments')
      .set(value)
      .where('crm.attachments.id', '=', id)
      .returningAll()
  }

  delete(id: DB['crm.attachments']['id']['__update__']) {
    return this.db.deleteFrom('crm.attachments').where('crm.attachments.id', '=', id)
  }
}
