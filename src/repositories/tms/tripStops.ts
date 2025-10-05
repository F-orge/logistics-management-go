import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class TmsTripStopRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.tripStops'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.tripStops', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.tripStops')
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
      builder = builder.where('tms.tripStops.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.tripStops']>) {
    return this.db.insertInto('tms.tripStops').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.tripStops']>[]) {
    return this.db.insertInto('tms.tripStops').values(values).returningAll();
  }

  update(
    id: DB['tms.tripStops']['id']['__update__'],
    value: Updateable<DB['tms.tripStops']>,
  ) {
    return this.db
      .updateTable('tms.tripStops')
      .set(value)
      .where('tms.tripStops.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.tripStops']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.tripStops')
      .where('tms.tripStops.id', '=', id);
  }
}
