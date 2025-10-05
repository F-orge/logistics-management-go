import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsReturnItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.returnItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.returnItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.returnItems')
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
      builder = builder.where('wms.returnItems.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.returnItems']>) {
    return this.db.insertInto('wms.returnItems').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.returnItems']>[]) {
    return this.db.insertInto('wms.returnItems').values(values).returningAll();
  }

  update(
    id: DB['wms.returnItems']['id']['__update__'],
    value: Updateable<DB['wms.returnItems']>,
  ) {
    return this.db
      .updateTable('wms.returnItems')
      .set(value)
      .where('wms.returnItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.returnItems']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.returnItems')
      .where('wms.returnItems.id', '=', id);
  }
}
