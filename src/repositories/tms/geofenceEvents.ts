import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class TmsGeofenceEventRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.geofenceEvents'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.geofenceEvents', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.geofenceEvents')
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
      builder = builder.where('tms.geofenceEvents.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.geofenceEvents']>) {
    return this.db
      .insertInto('tms.geofenceEvents')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['tms.geofenceEvents']>[]) {
    return this.db
      .insertInto('tms.geofenceEvents')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['tms.geofenceEvents']['id']['__update__'],
    value: Updateable<DB['tms.geofenceEvents']>,
  ) {
    return this.db
      .updateTable('tms.geofenceEvents')
      .set(value)
      .where('tms.geofenceEvents.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.geofenceEvents']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.geofenceEvents')
      .where('tms.geofenceEvents.id', '=', id);
  }
}
