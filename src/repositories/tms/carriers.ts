import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class TmsCarrierRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.carriers'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.carriers', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.carriers')
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
      builder = builder.where('tms.carriers.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.carriers']>) {
    return this.db.insertInto('tms.carriers').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.carriers']>[]) {
    return this.db.insertInto('tms.carriers').values(values).returningAll();
  }

  update(
    id: DB['tms.carriers']['id']['__update__'],
    value: Updateable<DB['tms.carriers']>,
  ) {
    return this.db
      .updateTable('tms.carriers')
      .set(value)
      .where('tms.carriers.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.carriers']['id']['__update__']) {
    return this.db.deleteFrom('tms.carriers').where('tms.carriers.id', '=', id);
  }
}
