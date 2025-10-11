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
import { BillingTransactionTypeEnum, DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class AccountTransactionRepository
  implements GenericRepository<'billing.accountTransactions'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'billing.accountTransactions'> | undefined,
    filter?: FilterConfig<'billing.accountTransactions'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.accountTransactions',
    {
      amount: string;
      clientAccountId: string;
      createdAt: Date | null;
      description: string | null;
      id: string;
      processedByUserId: string | null;
      referenceNumber: string | null;
      runningBalance: string | null;
      sourceRecordId: string | null;
      sourceRecordType: string | null;
      transactionDate: Date | null;
      type: BillingTransactionTypeEnum;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('billing.accountTransactions').selectAll();

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
    sort?: SortConfig<'billing.accountTransactions'> | undefined,
    filter?: FilterConfig<'billing.accountTransactions'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.accountTransactions',
    {
      amount: string;
      clientAccountId: string;
      createdAt: Date | null;
      description: string | null;
      id: string;
      processedByUserId: string | null;
      referenceNumber: string | null;
      runningBalance: string | null;
      sourceRecordId: string | null;
      sourceRecordType: string | null;
      transactionDate: Date | null;
      type: BillingTransactionTypeEnum;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('billing.accountTransactions')
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
    'billing.accountTransactions',
    {
      amount: string;
      clientAccountId: string;
      createdAt: Date | null;
      description: string | null;
      id: string;
      processedByUserId: string | null;
      referenceNumber: string | null;
      runningBalance: string | null;
      sourceRecordId: string | null;
      sourceRecordType: string | null;
      transactionDate: Date | null;
      type: BillingTransactionTypeEnum;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('billing.accountTransactions')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      amount: string | number;
      clientAccountId: string;
      type: BillingTransactionTypeEnum;
    } & {
      createdAt?: string | Date | null | undefined;
      description?: string | null | undefined;
      id?: string | undefined;
      processedByUserId?: string | null | undefined;
      referenceNumber?: string | null | undefined;
      runningBalance?: string | number | null | undefined;
      sourceRecordId?: string | null | undefined;
      sourceRecordType?: string | null | undefined;
      transactionDate?: string | Date | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'billing.accountTransactions',
    {
      amount: string;
      clientAccountId: string;
      createdAt: Date | null;
      description: string | null;
      id: string;
      processedByUserId: string | null;
      referenceNumber: string | null;
      runningBalance: string | null;
      sourceRecordId: string | null;
      sourceRecordType: string | null;
      transactionDate: Date | null;
      type: BillingTransactionTypeEnum;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('billing.accountTransactions').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      amount?: string | number | undefined;
      clientAccountId?: string | undefined;
      createdAt?: string | Date | null | undefined;
      description?: string | null | undefined;
      id?: string | undefined;
      processedByUserId?: string | null | undefined;
      referenceNumber?: string | null | undefined;
      runningBalance?: string | number | null | undefined;
      sourceRecordId?: string | null | undefined;
      sourceRecordType?: string | null | undefined;
      transactionDate?: string | Date | null | undefined;
      type?: BillingTransactionTypeEnum | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'billing.accountTransactions',
    'billing.accountTransactions',
    {
      amount: string;
      clientAccountId: string;
      createdAt: Date | null;
      description: string | null;
      id: string;
      processedByUserId: string | null;
      referenceNumber: string | null;
      runningBalance: string | null;
      sourceRecordId: string | null;
      sourceRecordType: string | null;
      transactionDate: Date | null;
      type: BillingTransactionTypeEnum;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('billing.accountTransactions')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'billing.accountTransactions', DeleteResult> {
    return this.db.deleteFrom('billing.accountTransactions').where('id', '=', id);
  }
}

export class BillingAccountTransactionRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.accountTransactions'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.accountTransactions', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.accountTransactions')
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
        'billing.accountTransactions.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['billing.accountTransactions']>) {
    return this.db
      .insertInto('billing.accountTransactions')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['billing.accountTransactions']>[]) {
    return this.db
      .insertInto('billing.accountTransactions')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.accountTransactions']['id']['__update__'],
    value: Updateable<DB['billing.accountTransactions']>,
  ) {
    return this.db
      .updateTable('billing.accountTransactions')
      .set(value)
      .where('billing.accountTransactions.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.accountTransactions']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.accountTransactions')
      .where('billing.accountTransactions.id', '=', id);
  }
}
