import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class WmsInventoryBatchRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.inventoryBatches'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.inventoryBatches', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.inventoryBatches')
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
      builder = builder.where('wms.inventoryBatches.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.inventoryBatches']>) {
    return this.db
      .insertInto('wms.inventoryBatches')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.inventoryBatches']>[]) {
    return this.db
      .insertInto('wms.inventoryBatches')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.inventoryBatches']['id']['__update__'],
    value: Updateable<DB['wms.inventoryBatches']>,
  ) {
    return this.db
      .updateTable('wms.inventoryBatches')
      .set(value)
      .where('wms.inventoryBatches.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.inventoryBatches']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.inventoryBatches')
      .where('wms.inventoryBatches.id', '=', id);
  }
}
