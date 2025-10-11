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
import { BillingInvoiceStatusEnum, DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class InvoiceRepository
  implements GenericRepository<'billing.invoices'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'billing.invoices'> | undefined,
    filter?: FilterConfig<'billing.invoices'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.invoices',
    {
      amountOutstanding: string | null;
      amountPaid: string | null;
      clientId: string;
      createdAt: Date | null;
      createdByUserId: string | null;
      currency: string | null;
      discountAmount: string | null;
      dueDate: Date;
      id: string;
      invoiceNumber: string;
      issueDate: Date;
      notes: string | null;
      paidAt: Date | null;
      paymentTerms: string | null;
      quoteId: string | null;
      sentAt: Date | null;
      status: BillingInvoiceStatusEnum | null;
      subtotal: string | null;
      taxAmount: string | null;
      totalAmount: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('billing.invoices').selectAll();

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
    sort?: SortConfig<'billing.invoices'> | undefined,
    filter?: FilterConfig<'billing.invoices'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.invoices',
    {
      amountOutstanding: string | null;
      amountPaid: string | null;
      clientId: string;
      createdAt: Date | null;
      createdByUserId: string | null;
      currency: string | null;
      discountAmount: string | null;
      dueDate: Date;
      id: string;
      invoiceNumber: string;
      issueDate: Date;
      notes: string | null;
      paidAt: Date | null;
      paymentTerms: string | null;
      quoteId: string | null;
      sentAt: Date | null;
      status: BillingInvoiceStatusEnum | null;
      subtotal: string | null;
      taxAmount: string | null;
      totalAmount: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('billing.invoices')
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
    'billing.invoices',
    {
      amountOutstanding: string | null;
      amountPaid: string | null;
      clientId: string;
      createdAt: Date | null;
      createdByUserId: string | null;
      currency: string | null;
      discountAmount: string | null;
      dueDate: Date;
      id: string;
      invoiceNumber: string;
      issueDate: Date;
      notes: string | null;
      paidAt: Date | null;
      paymentTerms: string | null;
      quoteId: string | null;
      sentAt: Date | null;
      status: BillingInvoiceStatusEnum | null;
      subtotal: string | null;
      taxAmount: string | null;
      totalAmount: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('billing.invoices')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      clientId: string;
      dueDate: string | Date;
      invoiceNumber: string;
      issueDate: string | Date;
      totalAmount: string | number;
    } & {
      amountOutstanding?: string | number | null | undefined;
      amountPaid?: string | number | null | undefined;
      createdAt?: string | Date | null | undefined;
      createdByUserId?: string | null | undefined;
      currency?: string | null | undefined;
      discountAmount?: string | number | null | undefined;
      id?: string | undefined;
      notes?: string | null | undefined;
      paidAt?: string | Date | null | undefined;
      paymentTerms?: string | null | undefined;
      quoteId?: string | null | undefined;
      sentAt?: string | Date | null | undefined;
      status?: BillingInvoiceStatusEnum | null | undefined;
      subtotal?: string | number | null | undefined;
      taxAmount?: string | number | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'billing.invoices',
    {
      amountOutstanding: string | null;
      amountPaid: string | null;
      clientId: string;
      createdAt: Date | null;
      createdByUserId: string | null;
      currency: string | null;
      discountAmount: string | null;
      dueDate: Date;
      id: string;
      invoiceNumber: string;
      issueDate: Date;
      notes: string | null;
      paidAt: Date | null;
      paymentTerms: string | null;
      quoteId: string | null;
      sentAt: Date | null;
      status: BillingInvoiceStatusEnum | null;
      subtotal: string | null;
      taxAmount: string | null;
      totalAmount: string;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('billing.invoices').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      amountOutstanding?: string | number | null | undefined;
      amountPaid?: string | number | null | undefined;
      clientId?: string | undefined;
      createdAt?: string | Date | null | undefined;
      createdByUserId?: string | null | undefined;
      currency?: string | null | undefined;
      discountAmount?: string | number | null | undefined;
      dueDate?: string | Date | undefined;
      id?: string | undefined;
      invoiceNumber?: string | undefined;
      issueDate?: string | Date | undefined;
      notes?: string | null | undefined;
      paidAt?: string | Date | null | undefined;
      paymentTerms?: string | null | undefined;
      quoteId?: string | null | undefined;
      sentAt?: string | Date | null | undefined;
      status?: BillingInvoiceStatusEnum | null | undefined;
      subtotal?: string | number | null | undefined;
      taxAmount?: string | number | null | undefined;
      totalAmount?: string | number | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'billing.invoices',
    'billing.invoices',
    {
      amountOutstanding: string | null;
      amountPaid: string | null;
      clientId: string;
      createdAt: Date | null;
      createdByUserId: string | null;
      currency: string | null;
      discountAmount: string | null;
      dueDate: Date;
      id: string;
      invoiceNumber: string;
      issueDate: Date;
      notes: string | null;
      paidAt: Date | null;
      paymentTerms: string | null;
      quoteId: string | null;
      sentAt: Date | null;
      status: BillingInvoiceStatusEnum | null;
      subtotal: string | null;
      taxAmount: string | null;
      totalAmount: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('billing.invoices')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'billing.invoices', DeleteResult> {
    return this.db.deleteFrom('billing.invoices').where('id', '=', id);
  }
}

export class BillingInvoiceRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.invoices'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.invoices', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.invoices')
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
      builder = builder.where('billing.invoices.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.invoices']>) {
    return this.db.insertInto('billing.invoices').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['billing.invoices']>[]) {
    return this.db.insertInto('billing.invoices').values(values).returningAll();
  }

  update(
    id: DB['billing.invoices']['id']['__update__'],
    value: Updateable<DB['billing.invoices']>,
  ) {
    return this.db
      .updateTable('billing.invoices')
      .set(value)
      .where('billing.invoices.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.invoices']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.invoices')
      .where('billing.invoices.id', '=', id);
  }
}
