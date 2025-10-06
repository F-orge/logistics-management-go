import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class BillingAccountingSyncLogRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.accountingSyncLog'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.accountingSyncLog', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.accountingSyncLog')
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
        'billing.accountingSyncLog.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['billing.accountingSyncLog']>) {
    return this.db
      .insertInto('billing.accountingSyncLog')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['billing.accountingSyncLog']>[]) {
    return this.db
      .insertInto('billing.accountingSyncLog')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.accountingSyncLog']['id']['__update__'],
    value: Updateable<DB['billing.accountingSyncLog']>,
  ) {
    return this.db
      .updateTable('billing.accountingSyncLog')
      .set(value)
      .where('billing.accountingSyncLog.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.accountingSyncLog']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.accountingSyncLog')
      .where('billing.accountingSyncLog.id', '=', id);
  }
}
