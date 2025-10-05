import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class WmsTaskItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.taskItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.taskItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.taskItems')
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
      builder = builder.where('wms.taskItems.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.taskItems']>) {
    return this.db.insertInto('wms.taskItems').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.taskItems']>[]) {
    return this.db.insertInto('wms.taskItems').values(values).returningAll();
  }

  update(
    id: DB['wms.taskItems']['id']['__update__'],
    value: Updateable<DB['wms.taskItems']>,
  ) {
    return this.db
      .updateTable('wms.taskItems')
      .set(value)
      .where('wms.taskItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.taskItems']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.taskItems')
      .where('wms.taskItems.id', '=', id);
  }
}
