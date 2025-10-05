import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class BillingSurchargeRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.surcharges'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.surcharges', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.surcharges')
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
      builder = builder.where('billing.surcharges.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.surcharges']>) {
    return this.db
      .insertInto('billing.surcharges')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['billing.surcharges']>[]) {
    return this.db
      .insertInto('billing.surcharges')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.surcharges']['id']['__update__'],
    value: Updateable<DB['billing.surcharges']>,
  ) {
    return this.db
      .updateTable('billing.surcharges')
      .set(value)
      .where('billing.surcharges.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.surcharges']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.surcharges')
      .where('billing.surcharges.id', '=', id);
  }
}
