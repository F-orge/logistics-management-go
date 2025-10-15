import {
  type DeleteQueryBuilder,
  type DeleteResult,
  type Insertable,
  type InsertQueryBuilder,
  type Kysely,
  type OrderByExpression,
  type OrderByModifiers,
  Selectable,
  type SelectExpression,
  type SelectQueryBuilder,
  type Updateable,
  type UpdateQueryBuilder,
} from 'kysely'
import { jsonObjectFrom } from 'kysely/helpers/postgres'
import type { CrmLeadSource, CrmLeadStatus, DB } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class LeadRepository implements GenericRepository<'crm.leads'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.leads'> | undefined,
    filter?: FilterConfig<'crm.leads'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.leads',
    {
      campaignId: string | null
      convertedAt: Date | null
      convertedCompanyId: string | null
      convertedContactId: string | null
      convertedOpportunityId: string | null
      createdAt: Date | null
      email: string
      id: string
      leadScore: number | null
      leadSource: CrmLeadSource | null
      name: string
      ownerId: string
      status: CrmLeadStatus | null
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('crm.leads').selectAll()

    if (limit) query = query.limit(limit)

    if (page && limit) query = query.offset((page - 1) * limit)

    for (const sortCol of sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order)
    }

    for (const filterCol of filter || []) {
      query = query.where(filterCol.column, filterCol.operation, filterCol.value)
    }

    const test = query.executeTakeFirstOrThrow()

    return query
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'crm.leads'> | undefined,
    filter?: FilterConfig<'crm.leads'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.leads',
    {
      campaignId: string | null
      convertedAt: Date | null
      convertedCompanyId: string | null
      convertedContactId: string | null
      convertedOpportunityId: string | null
      createdAt: Date | null
      email: string
      id: string
      leadScore: number | null
      leadSource: CrmLeadSource | null
      name: string
      ownerId: string
      status: CrmLeadStatus | null
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('crm.leads')
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
    'crm.leads',
    {
      campaignId: string | null
      convertedAt: Date | null
      convertedCompanyId: string | null
      convertedContactId: string | null
      convertedOpportunityId: string | null
      createdAt: Date | null
      email: string
      id: string
      leadScore: number | null
      leadSource: CrmLeadSource | null
      name: string
      ownerId: string
      status: CrmLeadStatus | null
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('crm.leads').selectAll().where('id', 'in', values)
  }
  create(
    value: { email: string; name: string; ownerId: string } & {
      campaignId?: string | null | undefined
      convertedAt?: string | Date | null | undefined
      convertedCompanyId?: string | null | undefined
      convertedContactId?: string | null | undefined
      convertedOpportunityId?: string | null | undefined
      createdAt?: string | Date | null | undefined
      id?: string | undefined
      leadScore?: number | null | undefined
      leadSource?: CrmLeadSource | null | undefined
      status?: CrmLeadStatus | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'crm.leads',
    {
      campaignId: string | null
      convertedAt: Date | null
      convertedCompanyId: string | null
      convertedContactId: string | null
      convertedOpportunityId: string | null
      createdAt: Date | null
      email: string
      id: string
      leadScore: number | null
      leadSource: CrmLeadSource | null
      name: string
      ownerId: string
      status: CrmLeadStatus | null
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('crm.leads').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      campaignId?: string | null | undefined
      convertedAt?: string | Date | null | undefined
      convertedCompanyId?: string | null | undefined
      convertedContactId?: string | null | undefined
      convertedOpportunityId?: string | null | undefined
      createdAt?: string | Date | null | undefined
      email?: string | undefined
      id?: string | undefined
      leadScore?: number | null | undefined
      leadSource?: CrmLeadSource | null | undefined
      name?: string | undefined
      ownerId?: string | undefined
      status?: CrmLeadStatus | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.leads',
    'crm.leads',
    {
      campaignId: string | null
      convertedAt: Date | null
      convertedCompanyId: string | null
      convertedContactId: string | null
      convertedOpportunityId: string | null
      createdAt: Date | null
      email: string
      id: string
      leadScore: number | null
      leadSource: CrmLeadSource | null
      name: string
      ownerId: string
      status: CrmLeadStatus | null
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('crm.leads').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'crm.leads', DeleteResult> {
    return this.db.deleteFrom('crm.leads').where('id', '=', id)
  }
}

export class CrmLeadRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.leads'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.leads', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.leads')
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

    if (search) builder = builder.where('crm.leads.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['crm.leads']>) {
    return this.db.insertInto('crm.leads').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['crm.leads']>[]) {
    return this.db.insertInto('crm.leads').values(values).returningAll()
  }

  update(id: DB['crm.leads']['id']['__update__'], value: Updateable<DB['crm.leads']>) {
    return this.db.updateTable('crm.leads').set(value).where('crm.leads.id', '=', id).returningAll()
  }

  delete(id: DB['crm.leads']['id']['__update__']) {
    return this.db.deleteFrom('crm.leads').where('crm.leads.id', '=', id)
  }
}
