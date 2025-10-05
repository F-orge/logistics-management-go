import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class TmsShipmentLegEventRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.shipmentLegEvents'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.shipmentLegEvents', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.shipmentLegEvents')
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
        'tms.shipmentLegEvents.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['tms.shipmentLegEvents']>) {
    return this.db
      .insertInto('tms.shipmentLegEvents')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['tms.shipmentLegEvents']>[]) {
    return this.db
      .insertInto('tms.shipmentLegEvents')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['tms.shipmentLegEvents']['id']['__update__'],
    value: Updateable<DB['tms.shipmentLegEvents']>,
  ) {
    return this.db
      .updateTable('tms.shipmentLegEvents')
      .set(value)
      .where('tms.shipmentLegEvents.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.shipmentLegEvents']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.shipmentLegEvents')
      .where('tms.shipmentLegEvents.id', '=', id);
  }
}
