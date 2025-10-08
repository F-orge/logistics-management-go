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
import { CrmInteractionType, DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class InteractionRepository
  implements GenericRepository<'crm.interactions'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.interactions'> | undefined,
    filter?: FilterConfig<'crm.interactions'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.interactions',
    {
      caseId: string | null;
      contactId: string;
      createdAt: Date | null;
      id: string;
      interactionDate: Date | null;
      notes: string | null;
      outcome: string | null;
      type: CrmInteractionType | null;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    let query = this.db.selectFrom('crm.interactions').selectAll();

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
    sort?: SortConfig<'crm.interactions'> | undefined,
    filter?: FilterConfig<'crm.interactions'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.interactions',
    {
      caseId: string | null;
      contactId: string;
      createdAt: Date | null;
      id: string;
      interactionDate: Date | null;
      notes: string | null;
      outcome: string | null;
      type: CrmInteractionType | null;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    let query = this.db
      .selectFrom('crm.interactions')
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
  in(values: string[]): SelectQueryBuilder<
    DB,
    'crm.interactions',
    {
      caseId: string | null;
      contactId: string;
      createdAt: Date | null;
      id: string;
      interactionDate: Date | null;
      notes: string | null;
      outcome: string | null;
      type: CrmInteractionType | null;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    return this.db
      .selectFrom('crm.interactions')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { contactId: string; userId: string } & {
      caseId?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      interactionDate?: string | Date | null | undefined;
      notes?: string | null | undefined;
      outcome?: string | null | undefined;
      type?: CrmInteractionType | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'crm.interactions',
    {
      caseId: string | null;
      contactId: string;
      createdAt: Date | null;
      id: string;
      interactionDate: Date | null;
      notes: string | null;
      outcome: string | null;
      type: CrmInteractionType | null;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    return this.db.insertInto('crm.interactions').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      caseId?: string | null | undefined;
      contactId?: string | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      interactionDate?: string | Date | null | undefined;
      notes?: string | null | undefined;
      outcome?: string | null | undefined;
      type?: CrmInteractionType | null | undefined;
      updatedAt?: string | Date | null | undefined;
      userId?: string | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.interactions',
    'crm.interactions',
    {
      caseId: string | null;
      contactId: string;
      createdAt: Date | null;
      id: string;
      interactionDate: Date | null;
      notes: string | null;
      outcome: string | null;
      type: CrmInteractionType | null;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    return this.db
      .updateTable('crm.interactions')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'crm.interactions', DeleteResult> {
    return this.db.deleteFrom('crm.interactions').where('id', '=', id);
  }
}

export class CrmInteractionRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.interactions'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.interactions', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.interactions')
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
      builder = builder.where('crm.interactions.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.interactions']>) {
    return this.db.insertInto('crm.interactions').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.interactions']>[]) {
    return this.db.insertInto('crm.interactions').values(values).returningAll();
  }

  update(
    id: DB['crm.interactions']['id']['__update__'],
    value: Updateable<DB['crm.interactions']>,
  ) {
    return this.db
      .updateTable('crm.interactions')
      .set(value)
      .where('crm.interactions.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.interactions']['id']['__update__']) {
    return this.db
      .deleteFrom('crm.interactions')
      .where('crm.interactions.id', '=', id);
  }
}
