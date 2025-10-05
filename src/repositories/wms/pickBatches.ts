import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsPickBatchRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.pickBatches'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.pickBatches', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.pickBatches')
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
      builder = builder.where('wms.pickBatches.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.pickBatches']>) {
    return this.db.insertInto('wms.pickBatches').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.pickBatches']>[]) {
    return this.db.insertInto('wms.pickBatches').values(values).returningAll();
  }

  update(
    id: DB['wms.pickBatches']['id']['__update__'],
    value: Updateable<DB['wms.pickBatches']>,
  ) {
    return this.db
      .updateTable('wms.pickBatches')
      .set(value)
      .where('wms.pickBatches.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.pickBatches']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.pickBatches')
      .where('wms.pickBatches.id', '=', id);
  }
}
