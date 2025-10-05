import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsPackageItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.packageItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.packageItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.packageItems')
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
      builder = builder.where('wms.packageItems.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.packageItems']>) {
    return this.db.insertInto('wms.packageItems').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.packageItems']>[]) {
    return this.db.insertInto('wms.packageItems').values(values).returningAll();
  }

  update(
    id: DB['wms.packageItems']['id']['__update__'],
    value: Updateable<DB['wms.packageItems']>,
  ) {
    return this.db
      .updateTable('wms.packageItems')
      .set(value)
      .where('wms.packageItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.packageItems']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.packageItems')
      .where('wms.packageItems.id', '=', id);
  }
}
