import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsPickBatchItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.pickBatchItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.pickBatchItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.pickBatchItems')
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
      builder = builder.where('wms.pickBatchItems.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.pickBatchItems']>) {
    return this.db
      .insertInto('wms.pickBatchItems')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.pickBatchItems']>[]) {
    return this.db
      .insertInto('wms.pickBatchItems')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.pickBatchItems']['id']['__update__'],
    value: Updateable<DB['wms.pickBatchItems']>,
  ) {
    return this.db
      .updateTable('wms.pickBatchItems')
      .set(value)
      .where('wms.pickBatchItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.pickBatchItems']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.pickBatchItems')
      .where('wms.pickBatchItems.id', '=', id);
  }
}
