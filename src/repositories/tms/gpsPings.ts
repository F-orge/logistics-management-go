import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class TmsGpsPingRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.gpsPings'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.gpsPings', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.gpsPings')
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
      builder = builder.where('tms.gpsPings.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.gpsPings']>) {
    return this.db.insertInto('tms.gpsPings').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.gpsPings']>[]) {
    return this.db.insertInto('tms.gpsPings').values(values).returningAll();
  }

  update(
    id: DB['tms.gpsPings']['id']['__update__'],
    value: Updateable<DB['tms.gpsPings']>,
  ) {
    return this.db
      .updateTable('tms.gpsPings')
      .set(value)
      .where('tms.gpsPings.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.gpsPings']['id']['__update__']) {
    return this.db.deleteFrom('tms.gpsPings').where('tms.gpsPings.id', '=', id);
  }
}
