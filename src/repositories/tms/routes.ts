import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class TmsRouteRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.routes'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.routes', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.routes')
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

    if (search) builder = builder.where('tms.routes.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.routes']>) {
    return this.db.insertInto('tms.routes').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.routes']>[]) {
    return this.db.insertInto('tms.routes').values(values).returningAll();
  }

  update(
    id: DB['tms.routes']['id']['__update__'],
    value: Updateable<DB['tms.routes']>,
  ) {
    return this.db
      .updateTable('tms.routes')
      .set(value)
      .where('tms.routes.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.routes']['id']['__update__']) {
    return this.db.deleteFrom('tms.routes').where('tms.routes.id', '=', id);
  }
}
