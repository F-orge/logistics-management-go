import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class BillingAccountingSyncLogRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.accountingSyncLogs'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.accountingSyncLogs', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.accountingSyncLogs')
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
        'billing.accountingSyncLogs.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['billing.accountingSyncLogs']>) {
    return this.db
      .insertInto('billing.accountingSyncLogs')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['billing.accountingSyncLogs']>[]) {
    return this.db
      .insertInto('billing.accountingSyncLogs')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.accountingSyncLogs']['id']['__update__'],
    value: Updateable<DB['billing.accountingSyncLogs']>,
  ) {
    return this.db
      .updateTable('billing.accountingSyncLogs')
      .set(value)
      .where('billing.accountingSyncLogs.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.accountingSyncLogs']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.accountingSyncLogs')
      .where('billing.accountingSyncLogs.id', '=', id);
  }
}
