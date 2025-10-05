import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class TmsVehicleRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.vehicles'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.vehicles', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.vehicles')
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
      builder = builder.where('tms.vehicles.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.vehicles']>) {
    return this.db.insertInto('tms.vehicles').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.vehicles']>[]) {
    return this.db.insertInto('tms.vehicles').values(values).returningAll();
  }

  update(
    id: DB['tms.vehicles']['id']['__update__'],
    value: Updateable<DB['tms.vehicles']>,
  ) {
    return this.db
      .updateTable('tms.vehicles')
      .set(value)
      .where('tms.vehicles.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.vehicles']['id']['__update__']) {
    return this.db.deleteFrom('tms.vehicles').where('tms.vehicles.id', '=', id);
  }
}
