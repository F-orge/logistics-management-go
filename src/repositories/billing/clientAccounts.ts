import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class BillingClientAccountRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.clientAccounts'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.clientAccounts', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.clientAccounts')
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
        'billing.clientAccounts.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['billing.clientAccounts']>) {
    return this.db
      .insertInto('billing.clientAccounts')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['billing.clientAccounts']>[]) {
    return this.db
      .insertInto('billing.clientAccounts')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.clientAccounts']['id']['__update__'],
    value: Updateable<DB['billing.clientAccounts']>,
  ) {
    return this.db
      .updateTable('billing.clientAccounts')
      .set(value)
      .where('billing.clientAccounts.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.clientAccounts']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.clientAccounts')
      .where('billing.clientAccounts.id', '=', id);
  }
}
