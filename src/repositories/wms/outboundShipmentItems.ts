import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsOutboundShipmentItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.outboundShipmentItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.outboundShipmentItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.outboundShipmentItems')
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
        'wms.outboundShipmentItems.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['wms.outboundShipmentItems']>) {
    return this.db
      .insertInto('wms.outboundShipmentItems')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.outboundShipmentItems']>[]) {
    return this.db
      .insertInto('wms.outboundShipmentItems')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.outboundShipmentItems']['id']['__update__'],
    value: Updateable<DB['wms.outboundShipmentItems']>,
  ) {
    return this.db
      .updateTable('wms.outboundShipmentItems')
      .set(value)
      .where('wms.outboundShipmentItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.outboundShipmentItems']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.outboundShipmentItems')
      .where('wms.outboundShipmentItems.id', '=', id);
  }
}
