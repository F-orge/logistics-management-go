import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class WmsProductRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.products'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.products', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.products')
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
      builder = builder.where('wms.products.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.products']>) {
    return this.db.insertInto('wms.products').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.products']>[]) {
    return this.db.insertInto('wms.products').values(values).returningAll();
  }

  update(
    id: DB['wms.products']['id']['__update__'],
    value: Updateable<DB['wms.products']>,
  ) {
    return this.db
      .updateTable('wms.products')
      .set(value)
      .where('wms.products.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.products']['id']['__update__']) {
    return this.db.deleteFrom('wms.products').where('wms.products.id', '=', id);
  }
}
