import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class DmsDocumentLinkRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.documentLinks'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.documentLinks', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.documentLinks')
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
      builder = builder.where('dms.documentLinks.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['dms.documentLinks']>) {
    return this.db.insertInto('dms.documentLinks').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['dms.documentLinks']>[]) {
    return this.db
      .insertInto('dms.documentLinks')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['dms.documentLinks']['id']['__update__'],
    value: Updateable<DB['dms.documentLinks']>,
  ) {
    return this.db
      .updateTable('dms.documentLinks')
      .set(value)
      .where('dms.documentLinks.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.documentLinks']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.documentLinks')
      .where('dms.documentLinks.id', '=', id);
  }
}
