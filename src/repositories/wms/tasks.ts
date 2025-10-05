import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class WmsTaskRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.tasks'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.tasks', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.tasks')
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

    if (search) builder = builder.where('wms.tasks.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.tasks']>) {
    return this.db.insertInto('wms.tasks').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.tasks']>[]) {
    return this.db.insertInto('wms.tasks').values(values).returningAll();
  }

  update(
    id: DB['wms.tasks']['id']['__update__'],
    value: Updateable<DB['wms.tasks']>,
  ) {
    return this.db
      .updateTable('wms.tasks')
      .set(value)
      .where('wms.tasks.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.tasks']['id']['__update__']) {
    return this.db.deleteFrom('wms.tasks').where('wms.tasks.id', '=', id);
  }
}
