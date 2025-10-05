import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsBinThresholdRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.binThresholds'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.binThresholds', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.binThresholds')
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
      builder = builder.where('wms.binThresholds.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.binThresholds']>) {
    return this.db.insertInto('wms.binThresholds').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.binThresholds']>[]) {
    return this.db
      .insertInto('wms.binThresholds')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.binThresholds']['id']['__update__'],
    value: Updateable<DB['wms.binThresholds']>,
  ) {
    return this.db
      .updateTable('wms.binThresholds')
      .set(value)
      .where('wms.binThresholds.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.binThresholds']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.binThresholds')
      .where('wms.binThresholds.id', '=', id);
  }
}
