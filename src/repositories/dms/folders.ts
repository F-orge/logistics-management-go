import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class DmsFolderRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.folders'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.folders', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.folders')
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
      builder = builder.where('dms.folders.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['dms.folders']>) {
    return this.db.insertInto('dms.folders').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['dms.folders']>[]) {
    return this.db.insertInto('dms.folders').values(values).returningAll();
  }

  update(
    id: DB['dms.folders']['id']['__update__'],
    value: Updateable<DB['dms.folders']>,
  ) {
    return this.db
      .updateTable('dms.folders')
      .set(value)
      .where('dms.folders.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.folders']['id']['__update__']) {
    return this.db.deleteFrom('dms.folders').where('dms.folders.id', '=', id);
  }
}
