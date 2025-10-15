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
import type { BillingDocumentTypeEnum, DB } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class DocumentRepository implements GenericRepository<'billing.documents'> {
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'billing.documents'> | undefined,
    filter?: FilterConfig<'billing.documents'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.documents',
    {
      createdAt: Date | null
      documentType: BillingDocumentTypeEnum
      fileName: string
      filePath: string
      fileSize: number | null
      id: string
      mimeType: string | null
      recordId: string
      recordType: string
      updatedAt: Date | null
      uploadedByUserId: string | null
    }
  > {
    let query = this.db.selectFrom('billing.documents').selectAll()

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
    sort?: SortConfig<'billing.documents'> | undefined,
    filter?: FilterConfig<'billing.documents'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.documents',
    {
      createdAt: Date | null
      documentType: BillingDocumentTypeEnum
      fileName: string
      filePath: string
      fileSize: number | null
      id: string
      mimeType: string | null
      recordId: string
      recordType: string
      updatedAt: Date | null
      uploadedByUserId: string | null
    }
  > {
    let query = this.db
      .selectFrom('billing.documents')
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
    'billing.documents',
    {
      createdAt: Date | null
      documentType: BillingDocumentTypeEnum
      fileName: string
      filePath: string
      fileSize: number | null
      id: string
      mimeType: string | null
      recordId: string
      recordType: string
      updatedAt: Date | null
      uploadedByUserId: string | null
    }
  > {
    return this.db.selectFrom('billing.documents').selectAll().where('id', 'in', values)
  }
  create(
    value: {
      documentType: BillingDocumentTypeEnum
      fileName: string
      filePath: string
      recordId: string
      recordType: string
    } & {
      createdAt?: string | Date | null | undefined
      fileSize?: number | null | undefined
      id?: string | undefined
      mimeType?: string | null | undefined
      updatedAt?: string | Date | null | undefined
      uploadedByUserId?: string | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'billing.documents',
    {
      createdAt: Date | null
      documentType: BillingDocumentTypeEnum
      fileName: string
      filePath: string
      fileSize: number | null
      id: string
      mimeType: string | null
      recordId: string
      recordType: string
      updatedAt: Date | null
      uploadedByUserId: string | null
    }
  > {
    return this.db.insertInto('billing.documents').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined
      documentType?: BillingDocumentTypeEnum | undefined
      fileName?: string | undefined
      filePath?: string | undefined
      fileSize?: number | null | undefined
      id?: string | undefined
      mimeType?: string | null | undefined
      recordId?: string | undefined
      recordType?: string | undefined
      updatedAt?: string | Date | null | undefined
      uploadedByUserId?: string | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'billing.documents',
    'billing.documents',
    {
      createdAt: Date | null
      documentType: BillingDocumentTypeEnum
      fileName: string
      filePath: string
      fileSize: number | null
      id: string
      mimeType: string | null
      recordId: string
      recordType: string
      updatedAt: Date | null
      uploadedByUserId: string | null
    }
  > {
    return this.db.updateTable('billing.documents').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'billing.documents', DeleteResult> {
    return this.db.deleteFrom('billing.documents').where('id', '=', id)
  }
}

export class BillingDocumentRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.documents'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.documents', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.documents')
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

    if (search) builder = builder.where('billing.documents.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['billing.documents']>) {
    return this.db.insertInto('billing.documents').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['billing.documents']>[]) {
    return this.db.insertInto('billing.documents').values(values).returningAll()
  }

  update(
    id: DB['billing.documents']['id']['__update__'],
    value: Updateable<DB['billing.documents']>,
  ) {
    return this.db
      .updateTable('billing.documents')
      .set(value)
      .where('billing.documents.id', '=', id)
      .returningAll()
  }

  delete(id: DB['billing.documents']['id']['__update__']) {
    return this.db.deleteFrom('billing.documents').where('billing.documents.id', '=', id)
  }
}
