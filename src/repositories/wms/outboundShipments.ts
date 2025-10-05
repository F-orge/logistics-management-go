import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class WmsOutboundShipmentRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.outboundShipments'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.outboundShipments', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.outboundShipments')
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
        'wms.outboundShipments.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['wms.outboundShipments']>) {
    return this.db
      .insertInto('wms.outboundShipments')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.outboundShipments']>[]) {
    return this.db
      .insertInto('wms.outboundShipments')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.outboundShipments']['id']['__update__'],
    value: Updateable<DB['wms.outboundShipments']>,
  ) {
    return this.db
      .updateTable('wms.outboundShipments')
      .set(value)
      .where('wms.outboundShipments.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.outboundShipments']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.outboundShipments')
      .where('wms.outboundShipments.id', '=', id);
  }
}
