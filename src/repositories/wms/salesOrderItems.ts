import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsSalesOrderItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.salesOrderItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.salesOrderItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.salesOrderItems')
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
      builder = builder.where('wms.salesOrderItems.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.salesOrderItems']>) {
    return this.db
      .insertInto('wms.salesOrderItems')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.salesOrderItems']>[]) {
    return this.db
      .insertInto('wms.salesOrderItems')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.salesOrderItems']['id']['__update__'],
    value: Updateable<DB['wms.salesOrderItems']>,
  ) {
    return this.db
      .updateTable('wms.salesOrderItems')
      .set(value)
      .where('wms.salesOrderItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.salesOrderItems']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.salesOrderItems')
      .where('wms.salesOrderItems.id', '=', id);
  }
}
