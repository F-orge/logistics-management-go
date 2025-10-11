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

export class InvoiceLineItemRepository
  implements GenericRepository<'billing.invoiceLineItems'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'billing.invoiceLineItems'> | undefined,
    filter?: FilterConfig<'billing.invoiceLineItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.invoiceLineItems',
    {
      createdAt: Date | null;
      description: string;
      discountAmount: string | null;
      discountRate: string | null;
      id: string;
      invoiceId: string;
      lineTotal: string | null;
      quantity: string;
      sourceRecordId: string | null;
      sourceRecordType: string | null;
      taxAmount: string | null;
      taxRate: string | null;
      totalPrice: string | null;
      unitPrice: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('billing.invoiceLineItems').selectAll();

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
    sort?: SortConfig<'billing.invoiceLineItems'> | undefined,
    filter?: FilterConfig<'billing.invoiceLineItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.invoiceLineItems',
    {
      createdAt: Date | null;
      description: string;
      discountAmount: string | null;
      discountRate: string | null;
      id: string;
      invoiceId: string;
      lineTotal: string | null;
      quantity: string;
      sourceRecordId: string | null;
      sourceRecordType: string | null;
      taxAmount: string | null;
      taxRate: string | null;
      totalPrice: string | null;
      unitPrice: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('billing.invoiceLineItems')
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
    'billing.invoiceLineItems',
    {
      createdAt: Date | null;
      description: string;
      discountAmount: string | null;
      discountRate: string | null;
      id: string;
      invoiceId: string;
      lineTotal: string | null;
      quantity: string;
      sourceRecordId: string | null;
      sourceRecordType: string | null;
      taxAmount: string | null;
      taxRate: string | null;
      totalPrice: string | null;
      unitPrice: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('billing.invoiceLineItems')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      description: string;
      invoiceId: string;
      unitPrice: string | number;
    } & {
      createdAt?: string | Date | null | undefined;
      discountAmount?: string | number | null | undefined;
      discountRate?: string | number | null | undefined;
      id?: string | undefined;
      lineTotal?: string | number | null | undefined;
      quantity?: string | number | undefined;
      sourceRecordId?: string | null | undefined;
      sourceRecordType?: string | null | undefined;
      taxAmount?: string | number | null | undefined;
      taxRate?: string | number | null | undefined;
      totalPrice?: string | number | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'billing.invoiceLineItems',
    {
      createdAt: Date | null;
      description: string;
      discountAmount: string | null;
      discountRate: string | null;
      id: string;
      invoiceId: string;
      lineTotal: string | null;
      quantity: string;
      sourceRecordId: string | null;
      sourceRecordType: string | null;
      taxAmount: string | null;
      taxRate: string | null;
      totalPrice: string | null;
      unitPrice: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .insertInto('billing.invoiceLineItems')
      .values(value)
      .returningAll();
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      description?: string | undefined;
      discountAmount?: string | number | null | undefined;
      discountRate?: string | number | null | undefined;
      id?: string | undefined;
      invoiceId?: string | undefined;
      lineTotal?: string | number | null | undefined;
      quantity?: string | number | undefined;
      sourceRecordId?: string | null | undefined;
      sourceRecordType?: string | null | undefined;
      taxAmount?: string | number | null | undefined;
      taxRate?: string | number | null | undefined;
      totalPrice?: string | number | null | undefined;
      unitPrice?: string | number | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'billing.invoiceLineItems',
    'billing.invoiceLineItems',
    {
      createdAt: Date | null;
      description: string;
      discountAmount: string | null;
      discountRate: string | null;
      id: string;
      invoiceId: string;
      lineTotal: string | null;
      quantity: string;
      sourceRecordId: string | null;
      sourceRecordType: string | null;
      taxAmount: string | null;
      taxRate: string | null;
      totalPrice: string | null;
      unitPrice: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('billing.invoiceLineItems')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'billing.invoiceLineItems', DeleteResult> {
    return this.db.deleteFrom('billing.invoiceLineItems').where('id', '=', id);
  }
}

export class BillingInvoiceLineItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.invoiceLineItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.invoiceLineItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.invoiceLineItems')
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
      builder = builder.where(
        'billing.invoiceLineItems.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['billing.invoiceLineItems']>) {
    return this.db
      .insertInto('billing.invoiceLineItems')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['billing.invoiceLineItems']>[]) {
    return this.db
      .insertInto('billing.invoiceLineItems')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.invoiceLineItems']['id']['__update__'],
    value: Updateable<DB['billing.invoiceLineItems']>,
  ) {
    return this.db
      .updateTable('billing.invoiceLineItems')
      .set(value)
      .where('billing.invoiceLineItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.invoiceLineItems']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.invoiceLineItems')
      .where('billing.invoiceLineItems.id', '=', id);
  }
}
