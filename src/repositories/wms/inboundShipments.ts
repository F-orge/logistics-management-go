import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsInboundShipmentRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.inboundShipments'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.inboundShipments', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.inboundShipments')
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
      builder = builder.where('wms.inboundShipments.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.inboundShipments']>) {
    return this.db
      .insertInto('wms.inboundShipments')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.inboundShipments']>[]) {
    return this.db
      .insertInto('wms.inboundShipments')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.inboundShipments']['id']['__update__'],
    value: Updateable<DB['wms.inboundShipments']>,
  ) {
    return this.db
      .updateTable('wms.inboundShipments')
      .set(value)
      .where('wms.inboundShipments.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.inboundShipments']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.inboundShipments')
      .where('wms.inboundShipments.id', '=', id);
  }
}
