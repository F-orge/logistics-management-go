import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsReorderPointRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.reorderPoints'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.reorderPoints', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.reorderPoints')
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
      builder = builder.where('wms.reorderPoints.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.reorderPoints']>) {
    return this.db.insertInto('wms.reorderPoints').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.reorderPoints']>[]) {
    return this.db
      .insertInto('wms.reorderPoints')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.reorderPoints']['id']['__update__'],
    value: Updateable<DB['wms.reorderPoints']>,
  ) {
    return this.db
      .updateTable('wms.reorderPoints')
      .set(value)
      .where('wms.reorderPoints.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.reorderPoints']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.reorderPoints')
      .where('wms.reorderPoints.id', '=', id);
  }
}
