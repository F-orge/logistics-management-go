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
import type { CrmCasePriority, CrmCaseStatus, CrmCaseType, DB } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class CaseRepository implements GenericRepository<'crm.cases'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.cases'> | undefined,
    filter?: FilterConfig<'crm.cases'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.cases',
    {
      caseNumber: string
      contactId: string | null
      createdAt: Date | null
      description: string | null
      id: string
      ownerId: string
      priority: CrmCasePriority | null
      status: CrmCaseStatus | null
      type: CrmCaseType | null
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('crm.cases').selectAll()

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
    sort?: SortConfig<'crm.cases'> | undefined,
    filter?: FilterConfig<'crm.cases'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.cases',
    {
      caseNumber: string
      contactId: string | null
      createdAt: Date | null
      description: string | null
      id: string
      ownerId: string
      priority: CrmCasePriority | null
      status: CrmCaseStatus | null
      type: CrmCaseType | null
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('crm.cases')
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
    'crm.cases',
    {
      caseNumber: string
      contactId: string | null
      createdAt: Date | null
      description: string | null
      id: string
      ownerId: string
      priority: CrmCasePriority | null
      status: CrmCaseStatus | null
      type: CrmCaseType | null
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('crm.cases').selectAll().where('id', 'in', values)
  }
  create(
    value: { caseNumber: string; ownerId: string } & {
      contactId?: string | null | undefined
      createdAt?: string | Date | null | undefined
      description?: string | null | undefined
      id?: string | undefined
      priority?: CrmCasePriority | null | undefined
      status?: CrmCaseStatus | null | undefined
      type?: CrmCaseType | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'crm.cases',
    {
      caseNumber: string
      contactId: string | null
      createdAt: Date | null
      description: string | null
      id: string
      ownerId: string
      priority: CrmCasePriority | null
      status: CrmCaseStatus | null
      type: CrmCaseType | null
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('crm.cases').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      caseNumber?: string | undefined
      contactId?: string | null | undefined
      createdAt?: string | Date | null | undefined
      description?: string | null | undefined
      id?: string | undefined
      ownerId?: string | undefined
      priority?: CrmCasePriority | null | undefined
      status?: CrmCaseStatus | null | undefined
      type?: CrmCaseType | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.cases',
    'crm.cases',
    {
      caseNumber: string
      contactId: string | null
      createdAt: Date | null
      description: string | null
      id: string
      ownerId: string
      priority: CrmCasePriority | null
      status: CrmCaseStatus | null
      type: CrmCaseType | null
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('crm.cases').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'crm.cases', DeleteResult> {
    return this.db.deleteFrom('crm.cases').where('id', '=', id)
  }
}

export class CrmCaseRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.cases'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.cases', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.cases')
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

    if (search) builder = builder.where('crm.cases.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['crm.cases']>) {
    return this.db.insertInto('crm.cases').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['crm.cases']>[]) {
    return this.db.insertInto('crm.cases').values(values).returningAll()
  }

  update(id: DB['crm.cases']['id']['__update__'], value: Updateable<DB['crm.cases']>) {
    return this.db.updateTable('crm.cases').set(value).where('crm.cases.id', '=', id).returningAll()
  }

  delete(id: DB['crm.cases']['id']['__update__']) {
    return this.db.deleteFrom('crm.cases').where('crm.cases.id', '=', id)
  }
}
