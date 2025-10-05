import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsSalesOrderRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.salesOrders'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.salesOrders', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.salesOrders')
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
      builder = builder.where('wms.salesOrders.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.salesOrders']>) {
    return this.db.insertInto('wms.salesOrders').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.salesOrders']>[]) {
    return this.db.insertInto('wms.salesOrders').values(values).returningAll();
  }

  update(
    id: DB['wms.salesOrders']['id']['__update__'],
    value: Updateable<DB['wms.salesOrders']>,
  ) {
    return this.db
      .updateTable('wms.salesOrders')
      .set(value)
      .where('wms.salesOrders.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.salesOrders']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.salesOrders')
      .where('wms.salesOrders.id', '=', id);
  }
}
