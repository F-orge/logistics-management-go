import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class DmsCustomerTrackingLinkRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.customerTrackingLinks'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.customerTrackingLinks', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.customerTrackingLinks')
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
        'dms.customerTrackingLinks.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['dms.customerTrackingLinks']>) {
    return this.db
      .insertInto('dms.customerTrackingLinks')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['dms.customerTrackingLinks']>[]) {
    return this.db
      .insertInto('dms.customerTrackingLinks')
      .values(values)
      .returningAll()
      .onConflict((oc) => oc.doNothing());
  }

  update(
    id: DB['dms.customerTrackingLinks']['id']['__update__'],
    value: Updateable<DB['dms.customerTrackingLinks']>,
  ) {
    return this.db
      .updateTable('dms.customerTrackingLinks')
      .set(value)
      .where('dms.customerTrackingLinks.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.customerTrackingLinks']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.customerTrackingLinks')
      .where('dms.customerTrackingLinks.id', '=', id);
  }
}
