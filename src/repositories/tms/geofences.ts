import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class TmsGeofenceRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.geofences'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.geofences', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.geofences')
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
      builder = builder.where('tms.geofences.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.geofences']>) {
    return this.db.insertInto('tms.geofences').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.geofences']>[]) {
    return this.db.insertInto('tms.geofences').values(values).returningAll();
  }

  update(
    id: DB['tms.geofences']['id']['__update__'],
    value: Updateable<DB['tms.geofences']>,
  ) {
    return this.db
      .updateTable('tms.geofences')
      .set(value)
      .where('tms.geofences.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.geofences']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.geofences')
      .where('tms.geofences.id', '=', id);
  }
}
