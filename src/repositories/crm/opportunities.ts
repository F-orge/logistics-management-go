import {
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
} from 'kysely';
import { CrmOpportunitySource, CrmOpportunityStage, DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class OpportunityRepository
  implements GenericRepository<'crm.opportunities'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.opportunities'> | undefined,
    filter?: FilterConfig<'crm.opportunities'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.opportunities',
    {
      campaignId: string | null;
      companyId: string | null;
      contactId: string | null;
      createdAt: Date | null;
      dealValue: string | null;
      expectedCloseDate: Date | null;
      id: string;
      lostReason: string | null;
      name: string;
      ownerId: string;
      probability: number | null;
      source: CrmOpportunitySource | null;
      stage: CrmOpportunityStage | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('crm.opportunities').selectAll();

    if (limit) query = query.limit(limit);

    if (page && limit) query = query.offset((page - 1) * limit);

    for (const sortCol of sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order);
    }

    for (const filterCol of filter || []) {
      query = query.where(
        filterCol.column,
        filterCol.operation,
        filterCol.value,
      );
    }

    return query;
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'crm.opportunities'> | undefined,
    filter?: FilterConfig<'crm.opportunities'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.opportunities',
    {
      campaignId: string | null;
      companyId: string | null;
      contactId: string | null;
      createdAt: Date | null;
      dealValue: string | null;
      expectedCloseDate: Date | null;
      id: string;
      lostReason: string | null;
      name: string;
      ownerId: string;
      probability: number | null;
      source: CrmOpportunitySource | null;
      stage: CrmOpportunityStage | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('crm.opportunities')
      .selectAll()
      .where('createdAt', '>=', from)
      .where('createdAt', '<=', to);

    for (const sortCol of sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order);
    }

    for (const filterCol of filter || []) {
      query = query.where(
        filterCol.column,
        filterCol.operation,
        filterCol.value,
      );
    }

    return query;
  }
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'crm.opportunities',
    {
      campaignId: string | null;
      companyId: string | null;
      contactId: string | null;
      createdAt: Date | null;
      dealValue: string | null;
      expectedCloseDate: Date | null;
      id: string;
      lostReason: string | null;
      name: string;
      ownerId: string;
      probability: number | null;
      source: CrmOpportunitySource | null;
      stage: CrmOpportunityStage | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('crm.opportunities')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { name: string; ownerId: string } & {
      campaignId?: string | null | undefined;
      companyId?: string | null | undefined;
      contactId?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      dealValue?: string | number | null | undefined;
      expectedCloseDate?: string | Date | null | undefined;
      id?: string | undefined;
      lostReason?: string | null | undefined;
      probability?: number | null | undefined;
      source?: CrmOpportunitySource | null | undefined;
      stage?: CrmOpportunityStage | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'crm.opportunities',
    {
      campaignId: string | null;
      companyId: string | null;
      contactId: string | null;
      createdAt: Date | null;
      dealValue: string | null;
      expectedCloseDate: Date | null;
      id: string;
      lostReason: string | null;
      name: string;
      ownerId: string;
      probability: number | null;
      source: CrmOpportunitySource | null;
      stage: CrmOpportunityStage | null;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('crm.opportunities').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      campaignId?: string | null | undefined;
      companyId?: string | null | undefined;
      contactId?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      dealValue?: string | number | null | undefined;
      expectedCloseDate?: string | Date | null | undefined;
      id?: string | undefined;
      lostReason?: string | null | undefined;
      name?: string | undefined;
      ownerId?: string | undefined;
      probability?: number | null | undefined;
      source?: CrmOpportunitySource | null | undefined;
      stage?: CrmOpportunityStage | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.opportunities',
    'crm.opportunities',
    {
      campaignId: string | null;
      companyId: string | null;
      contactId: string | null;
      createdAt: Date | null;
      dealValue: string | null;
      expectedCloseDate: Date | null;
      id: string;
      lostReason: string | null;
      name: string;
      ownerId: string;
      probability: number | null;
      source: CrmOpportunitySource | null;
      stage: CrmOpportunityStage | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('crm.opportunities')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'crm.opportunities', DeleteResult> {
    return this.db.deleteFrom('crm.opportunities').where('id', '=', id);
  }
}

export class CrmOpportunityRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.opportunities'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.opportunities', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.opportunities')
      .limit(perPage)
      .offset((page - 1) * perPage);

    if (fields) {
      builder = builder.select(fields);
    } else {
      builder = builder.selectAll();
    }

    // sort
    for (const field of sort || []) {
      builder = builder.orderBy(field.field, field.order);
    }

    if (search)
      builder = builder.where('crm.opportunities.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.opportunities']>) {
    return this.db.insertInto('crm.opportunities').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.opportunities']>[]) {
    return this.db
      .insertInto('crm.opportunities')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['crm.opportunities']['id']['__update__'],
    value: Updateable<DB['crm.opportunities']>,
  ) {
    return this.db
      .updateTable('crm.opportunities')
      .set(value)
      .where('crm.opportunities.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.opportunities']['id']['__update__']) {
    return this.db
      .deleteFrom('crm.opportunities')
      .where('crm.opportunities.id', '=', id);
  }
}
