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
import {
  BillingPaymentMethodEnum,
  BillingPaymentStatusEnum,
  DB,
} from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class PaymentRepository
  implements GenericRepository<'billing.payments'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'billing.payments'> | undefined,
    filter?: FilterConfig<'billing.payments'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.payments',
    {
      amount: string;
      createdAt: Date | null;
      currency: string | null;
      exchangeRate: string | null;
      fees: string | null;
      gatewayReference: string | null;
      id: string;
      invoiceId: string;
      netAmount: string | null;
      notes: string | null;
      paymentDate: Date | null;
      paymentMethod: BillingPaymentMethodEnum;
      processedAt: Date | null;
      processedByUserId: string | null;
      status: BillingPaymentStatusEnum | null;
      transactionId: string | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('billing.payments').selectAll();

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
    sort?: SortConfig<'billing.payments'> | undefined,
    filter?: FilterConfig<'billing.payments'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.payments',
    {
      amount: string;
      createdAt: Date | null;
      currency: string | null;
      exchangeRate: string | null;
      fees: string | null;
      gatewayReference: string | null;
      id: string;
      invoiceId: string;
      netAmount: string | null;
      notes: string | null;
      paymentDate: Date | null;
      paymentMethod: BillingPaymentMethodEnum;
      processedAt: Date | null;
      processedByUserId: string | null;
      status: BillingPaymentStatusEnum | null;
      transactionId: string | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('billing.payments')
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
    'billing.payments',
    {
      amount: string;
      createdAt: Date | null;
      currency: string | null;
      exchangeRate: string | null;
      fees: string | null;
      gatewayReference: string | null;
      id: string;
      invoiceId: string;
      netAmount: string | null;
      notes: string | null;
      paymentDate: Date | null;
      paymentMethod: BillingPaymentMethodEnum;
      processedAt: Date | null;
      processedByUserId: string | null;
      status: BillingPaymentStatusEnum | null;
      transactionId: string | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('billing.payments')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      amount: string | number;
      invoiceId: string;
      paymentMethod: BillingPaymentMethodEnum;
    } & {
      createdAt?: string | Date | null | undefined;
      currency?: string | null | undefined;
      exchangeRate?: string | number | null | undefined;
      fees?: string | number | null | undefined;
      gatewayReference?: string | null | undefined;
      id?: string | undefined;
      netAmount?: string | number | null | undefined;
      notes?: string | null | undefined;
      paymentDate?: string | Date | null | undefined;
      processedAt?: string | Date | null | undefined;
      processedByUserId?: string | null | undefined;
      status?: BillingPaymentStatusEnum | null | undefined;
      transactionId?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'billing.payments',
    {
      amount: string;
      createdAt: Date | null;
      currency: string | null;
      exchangeRate: string | null;
      fees: string | null;
      gatewayReference: string | null;
      id: string;
      invoiceId: string;
      netAmount: string | null;
      notes: string | null;
      paymentDate: Date | null;
      paymentMethod: BillingPaymentMethodEnum;
      processedAt: Date | null;
      processedByUserId: string | null;
      status: BillingPaymentStatusEnum | null;
      transactionId: string | null;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('billing.payments').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      amount?: string | number | undefined;
      createdAt?: string | Date | null | undefined;
      currency?: string | null | undefined;
      exchangeRate?: string | number | null | undefined;
      fees?: string | number | null | undefined;
      gatewayReference?: string | null | undefined;
      id?: string | undefined;
      invoiceId?: string | undefined;
      netAmount?: string | number | null | undefined;
      notes?: string | null | undefined;
      paymentDate?: string | Date | null | undefined;
      paymentMethod?: BillingPaymentMethodEnum | undefined;
      processedAt?: string | Date | null | undefined;
      processedByUserId?: string | null | undefined;
      status?: BillingPaymentStatusEnum | null | undefined;
      transactionId?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'billing.payments',
    'billing.payments',
    {
      amount: string;
      createdAt: Date | null;
      currency: string | null;
      exchangeRate: string | null;
      fees: string | null;
      gatewayReference: string | null;
      id: string;
      invoiceId: string;
      netAmount: string | null;
      notes: string | null;
      paymentDate: Date | null;
      paymentMethod: BillingPaymentMethodEnum;
      processedAt: Date | null;
      processedByUserId: string | null;
      status: BillingPaymentStatusEnum | null;
      transactionId: string | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('billing.payments')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'billing.payments', DeleteResult> {
    return this.db.deleteFrom('billing.payments').where('id', '=', id);
  }
}

export class BillingPaymentRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.payments'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.payments', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.payments')
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
      builder = builder.where('billing.payments.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.payments']>) {
    return this.db.insertInto('billing.payments').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['billing.payments']>[]) {
    return this.db.insertInto('billing.payments').values(values).returningAll();
  }

  update(
    id: DB['billing.payments']['id']['__update__'],
    value: Updateable<DB['billing.payments']>,
  ) {
    return this.db
      .updateTable('billing.payments')
      .set(value)
      .where('billing.payments.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.payments']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.payments')
      .where('billing.payments.id', '=', id);
  }
}
