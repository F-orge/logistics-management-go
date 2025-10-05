import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class WmsReturnRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.returns'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.returns', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.returns')
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
      builder = builder.where('wms.returns.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.returns']>) {
    return this.db.insertInto('wms.returns').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.returns']>[]) {
    return this.db.insertInto('wms.returns').values(values).returningAll();
  }

  update(
    id: DB['wms.returns']['id']['__update__'],
    value: Updateable<DB['wms.returns']>,
  ) {
    return this.db
      .updateTable('wms.returns')
      .set(value)
      .where('wms.returns.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.returns']['id']['__update__']) {
    return this.db.deleteFrom('wms.returns').where('wms.returns.id', '=', id);
  }
}
