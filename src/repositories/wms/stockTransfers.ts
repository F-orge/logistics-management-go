import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsStockTransferRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.stockTransfers'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.stockTransfers', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.stockTransfers')
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
      builder = builder.where('wms.stockTransfers.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.stockTransfers']>) {
    return this.db
      .insertInto('wms.stockTransfers')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.stockTransfers']>[]) {
    return this.db
      .insertInto('wms.stockTransfers')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.stockTransfers']['id']['__update__'],
    value: Updateable<DB['wms.stockTransfers']>,
  ) {
    return this.db
      .updateTable('wms.stockTransfers')
      .set(value)
      .where('wms.stockTransfers.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.stockTransfers']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.stockTransfers')
      .where('wms.stockTransfers.id', '=', id);
  }
}
