import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class TmsDriverRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.drivers'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.drivers', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.drivers')
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
      builder = builder.where('tms.drivers.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.drivers']>) {
    return this.db.insertInto('tms.drivers').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.drivers']>[]) {
    return this.db.insertInto('tms.drivers').values(values).returningAll();
  }

  update(
    id: DB['tms.drivers']['id']['__update__'],
    value: Updateable<DB['tms.drivers']>,
  ) {
    return this.db
      .updateTable('tms.drivers')
      .set(value)
      .where('tms.drivers.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.drivers']['id']['__update__']) {
    return this.db.deleteFrom('tms.drivers').where('tms.drivers.id', '=', id);
  }
}
