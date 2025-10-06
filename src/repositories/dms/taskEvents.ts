import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class DmsTaskEventRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.taskEvents'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.taskEvents', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.taskEvents')
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
      builder = builder.where('dms.taskEvents.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['dms.taskEvents']>) {
    return this.db.insertInto('dms.taskEvents').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['dms.taskEvents']>[]) {
    return this.db.insertInto('dms.taskEvents').values(values).returningAll();
  }

  update(
    id: DB['dms.taskEvents']['id']['__update__'],
    value: Updateable<DB['dms.taskEvents']>,
  ) {
    return this.db
      .updateTable('dms.taskEvents')
      .set(value)
      .where('dms.taskEvents.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.taskEvents']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.taskEvents')
      .where('dms.taskEvents.id', '=', id);
  }
}
