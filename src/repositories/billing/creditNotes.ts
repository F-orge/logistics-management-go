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
import { DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class CreditNoteRepository
  implements GenericRepository<'billing.creditNotes'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'billing.creditNotes'> | undefined,
    filter?: FilterConfig<'billing.creditNotes'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.creditNotes',
    {
      amount: string;
      appliedAt: Date | null;
      createdAt: Date | null;
      createdByUserId: string | null;
      creditNoteNumber: string;
      currency: string | null;
      disputeId: string | null;
      id: string;
      invoiceId: string;
      issueDate: Date;
      notes: string | null;
      reason: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('billing.creditNotes').selectAll();

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
    sort?: SortConfig<'billing.creditNotes'> | undefined,
    filter?: FilterConfig<'billing.creditNotes'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.creditNotes',
    {
      amount: string;
      appliedAt: Date | null;
      createdAt: Date | null;
      createdByUserId: string | null;
      creditNoteNumber: string;
      currency: string | null;
      disputeId: string | null;
      id: string;
      invoiceId: string;
      issueDate: Date;
      notes: string | null;
      reason: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('billing.creditNotes')
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
    'billing.creditNotes',
    {
      amount: string;
      appliedAt: Date | null;
      createdAt: Date | null;
      createdByUserId: string | null;
      creditNoteNumber: string;
      currency: string | null;
      disputeId: string | null;
      id: string;
      invoiceId: string;
      issueDate: Date;
      notes: string | null;
      reason: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('billing.creditNotes')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      amount: string | number;
      creditNoteNumber: string;
      invoiceId: string;
      issueDate: string | Date;
      reason: string;
    } & {
      appliedAt?: string | Date | null | undefined;
      createdAt?: string | Date | null | undefined;
      createdByUserId?: string | null | undefined;
      currency?: string | null | undefined;
      disputeId?: string | null | undefined;
      id?: string | undefined;
      notes?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'billing.creditNotes',
    {
      amount: string;
      appliedAt: Date | null;
      createdAt: Date | null;
      createdByUserId: string | null;
      creditNoteNumber: string;
      currency: string | null;
      disputeId: string | null;
      id: string;
      invoiceId: string;
      issueDate: Date;
      notes: string | null;
      reason: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .insertInto('billing.creditNotes')
      .values(value)
      .returningAll();
  }
  update(
    id: string,
    value: {
      amount?: string | number | undefined;
      appliedAt?: string | Date | null | undefined;
      createdAt?: string | Date | null | undefined;
      createdByUserId?: string | null | undefined;
      creditNoteNumber?: string | undefined;
      currency?: string | null | undefined;
      disputeId?: string | null | undefined;
      id?: string | undefined;
      invoiceId?: string | undefined;
      issueDate?: string | Date | undefined;
      notes?: string | null | undefined;
      reason?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'billing.creditNotes',
    'billing.creditNotes',
    {
      amount: string;
      appliedAt: Date | null;
      createdAt: Date | null;
      createdByUserId: string | null;
      creditNoteNumber: string;
      currency: string | null;
      disputeId: string | null;
      id: string;
      invoiceId: string;
      issueDate: Date;
      notes: string | null;
      reason: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('billing.creditNotes')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'billing.creditNotes', DeleteResult> {
    return this.db.deleteFrom('billing.creditNotes').where('id', '=', id);
  }
}

export class BillingCreditNoteRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.creditNotes'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.creditNotes', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.creditNotes')
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
      builder = builder.where('billing.creditNotes.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.creditNotes']>) {
    return this.db
      .insertInto('billing.creditNotes')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['billing.creditNotes']>[]) {
    return this.db
      .insertInto('billing.creditNotes')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.creditNotes']['id']['__update__'],
    value: Updateable<DB['billing.creditNotes']>,
  ) {
    return this.db
      .updateTable('billing.creditNotes')
      .set(value)
      .where('billing.creditNotes.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.creditNotes']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.creditNotes')
      .where('billing.creditNotes.id', '=', id);
  }
}
