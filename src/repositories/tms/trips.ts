import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class TmsTripRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.trips'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.trips', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.trips')
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

    if (search) builder = builder.where('tms.trips.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.trips']>) {
    return this.db.insertInto('tms.trips').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.trips']>[]) {
    return this.db.insertInto('tms.trips').values(values).returningAll();
  }

  update(
    id: DB['tms.trips']['id']['__update__'],
    value: Updateable<DB['tms.trips']>,
  ) {
    return this.db
      .updateTable('tms.trips')
      .set(value)
      .where('tms.trips.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.trips']['id']['__update__']) {
    return this.db.deleteFrom('tms.trips').where('tms.trips.id', '=', id);
  }
}
