import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

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
