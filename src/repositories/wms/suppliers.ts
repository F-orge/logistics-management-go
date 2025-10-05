import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class WmsSupplierRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.suppliers'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.suppliers', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.suppliers')
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
      builder = builder.where('wms.suppliers.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.suppliers']>) {
    return this.db.insertInto('wms.suppliers').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.suppliers']>[]) {
    return this.db.insertInto('wms.suppliers').values(values).returningAll();
  }

  update(
    id: DB['wms.suppliers']['id']['__update__'],
    value: Updateable<DB['wms.suppliers']>,
  ) {
    return this.db
      .updateTable('wms.suppliers')
      .set(value)
      .where('wms.suppliers.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.suppliers']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.suppliers')
      .where('wms.suppliers.id', '=', id);
  }
}
