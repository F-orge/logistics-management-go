import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsInventoryAdjustmentRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.inventoryAdjustments'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.inventoryAdjustments', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.inventoryAdjustments')
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
        'wms.inventoryAdjustments.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['wms.inventoryAdjustments']>) {
    return this.db
      .insertInto('wms.inventoryAdjustments')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.inventoryAdjustments']>[]) {
    return this.db
      .insertInto('wms.inventoryAdjustments')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.inventoryAdjustments']['id']['__update__'],
    value: Updateable<DB['wms.inventoryAdjustments']>,
  ) {
    return this.db
      .updateTable('wms.inventoryAdjustments')
      .set(value)
      .where('wms.inventoryAdjustments.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.inventoryAdjustments']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.inventoryAdjustments')
      .where('wms.inventoryAdjustments.id', '=', id);
  }
}
