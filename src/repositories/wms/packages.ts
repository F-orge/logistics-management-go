import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class WmsPackageRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.packages'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.packages', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.packages')
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
      builder = builder.where('wms.packages.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.packages']>) {
    return this.db.insertInto('wms.packages').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.packages']>[]) {
    return this.db.insertInto('wms.packages').values(values).returningAll();
  }

  update(
    id: DB['wms.packages']['id']['__update__'],
    value: Updateable<DB['wms.packages']>,
  ) {
    return this.db
      .updateTable('wms.packages')
      .set(value)
      .where('wms.packages.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.packages']['id']['__update__']) {
    return this.db.deleteFrom('wms.packages').where('wms.packages.id', '=', id);
  }
}
