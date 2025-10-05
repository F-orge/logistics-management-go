import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class WmsLocationRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.locations'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.locations', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.locations')
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
      builder = builder.where('wms.locations.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.locations']>) {
    return this.db.insertInto('wms.locations').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.locations']>[]) {
    return this.db.insertInto('wms.locations').values(values).returningAll();
  }

  update(
    id: DB['wms.locations']['id']['__update__'],
    value: Updateable<DB['wms.locations']>,
  ) {
    return this.db
      .updateTable('wms.locations')
      .set(value)
      .where('wms.locations.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.locations']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.locations')
      .where('wms.locations.id', '=', id);
  }
}
