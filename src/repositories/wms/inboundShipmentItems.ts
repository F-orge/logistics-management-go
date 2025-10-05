import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsInboundShipmentItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.inboundShipmentItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.inboundShipmentItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.inboundShipmentItems')
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
        'wms.inboundShipmentItems.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['wms.inboundShipmentItems']>) {
    return this.db
      .insertInto('wms.inboundShipmentItems')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.inboundShipmentItems']>[]) {
    return this.db
      .insertInto('wms.inboundShipmentItems')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.inboundShipmentItems']['id']['__update__'],
    value: Updateable<DB['wms.inboundShipmentItems']>,
  ) {
    return this.db
      .updateTable('wms.inboundShipmentItems')
      .set(value)
      .where('wms.inboundShipmentItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.inboundShipmentItems']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.inboundShipmentItems')
      .where('wms.inboundShipmentItems.id', '=', id);
  }
}
