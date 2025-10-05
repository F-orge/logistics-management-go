import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class BillingQuoteRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.quotes'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.quotes', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.quotes')
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
      builder = builder.where('billing.quotes.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.quotes']>) {
    return this.db.insertInto('billing.quotes').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['billing.quotes']>[]) {
    return this.db.insertInto('billing.quotes').values(values).returningAll();
  }

  update(
    id: DB['billing.quotes']['id']['__update__'],
    value: Updateable<DB['billing.quotes']>,
  ) {
    return this.db
      .updateTable('billing.quotes')
      .set(value)
      .where('billing.quotes.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.quotes']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.quotes')
      .where('billing.quotes.id', '=', id);
  }
}
