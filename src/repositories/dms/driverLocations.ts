import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class DmsDriverLocationRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.driverLocations'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.driverLocations', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.driverLocations')
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
      builder = builder.where('dms.driverLocations.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['dms.driverLocations']>) {
    return this.db
      .insertInto('dms.driverLocations')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['dms.driverLocations']>[]) {
    return this.db
      .insertInto('dms.driverLocations')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['dms.driverLocations']['id']['__update__'],
    value: Updateable<DB['dms.driverLocations']>,
  ) {
    return this.db
      .updateTable('dms.driverLocations')
      .set(value)
      .where('dms.driverLocations.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.driverLocations']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.driverLocations')
      .where('dms.driverLocations.id', '=', id);
  }
}
