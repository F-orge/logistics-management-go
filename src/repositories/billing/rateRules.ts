import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class BillingRateRuleRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.rateRules'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.rateRules', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.rateRules')
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
      builder = builder.where('billing.rateRules.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.rateRules']>) {
    return this.db.insertInto('billing.rateRules').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['billing.rateRules']>[]) {
    return this.db
      .insertInto('billing.rateRules')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.rateRules']['id']['__update__'],
    value: Updateable<DB['billing.rateRules']>,
  ) {
    return this.db
      .updateTable('billing.rateRules')
      .set(value)
      .where('billing.rateRules.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.rateRules']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.rateRules')
      .where('billing.rateRules.id', '=', id);
  }
}
