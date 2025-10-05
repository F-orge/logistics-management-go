import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class WmsWarehouseRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.warehouses'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.warehouses', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.warehouses')
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
      builder = builder.where('wms.warehouses.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.warehouses']>) {
    return this.db.insertInto('wms.warehouses').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.warehouses']>[]) {
    return this.db.insertInto('wms.warehouses').values(values).returningAll();
  }

  update(
    id: DB['wms.warehouses']['id']['__update__'],
    value: Updateable<DB['wms.warehouses']>,
  ) {
    return this.db
      .updateTable('wms.warehouses')
      .set(value)
      .where('wms.warehouses.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.warehouses']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.warehouses')
      .where('wms.warehouses.id', '=', id);
  }
}
