import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class BillingRateCardRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.rateCards'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.rateCards', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.rateCards')
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
      builder = builder.where('billing.rateCards.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.rateCards']>) {
    return this.db.insertInto('billing.rateCards').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['billing.rateCards']>[]) {
    return this.db
      .insertInto('billing.rateCards')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.rateCards']['id']['__update__'],
    value: Updateable<DB['billing.rateCards']>,
  ) {
    return this.db
      .updateTable('billing.rateCards')
      .set(value)
      .where('billing.rateCards.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.rateCards']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.rateCards')
      .where('billing.rateCards.id', '=', id);
  }
}
