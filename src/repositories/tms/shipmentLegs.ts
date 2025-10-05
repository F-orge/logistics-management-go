import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class TmsShipmentLegRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.shipmentLegs'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.shipmentLegs', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.shipmentLegs')
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
      builder = builder.where('tms.shipmentLegs.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.shipmentLegs']>) {
    return this.db.insertInto('tms.shipmentLegs').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.shipmentLegs']>[]) {
    return this.db.insertInto('tms.shipmentLegs').values(values).returningAll();
  }

  update(
    id: DB['tms.shipmentLegs']['id']['__update__'],
    value: Updateable<DB['tms.shipmentLegs']>,
  ) {
    return this.db
      .updateTable('tms.shipmentLegs')
      .set(value)
      .where('tms.shipmentLegs.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.shipmentLegs']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.shipmentLegs')
      .where('tms.shipmentLegs.id', '=', id);
  }
}
