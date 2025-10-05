import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

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
