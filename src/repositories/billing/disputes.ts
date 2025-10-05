import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class BillingDisputeRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.disputes'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.disputes', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.disputes')
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
      builder = builder.where('billing.disputes.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.disputes']>) {
    return this.db.insertInto('billing.disputes').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['billing.disputes']>[]) {
    return this.db.insertInto('billing.disputes').values(values).returningAll();
  }

  update(
    id: DB['billing.disputes']['id']['__update__'],
    value: Updateable<DB['billing.disputes']>,
  ) {
    return this.db
      .updateTable('billing.disputes')
      .set(value)
      .where('billing.disputes.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.disputes']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.disputes')
      .where('billing.disputes.id', '=', id);
  }
}
