import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class DmsDocumentTagLinkRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.documentTagLinks'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.documentTagLinks', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.documentTagLinks')
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
      builder = builder.where('dms.documentTagLinks.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['dms.documentTagLinks']>) {
    return this.db
      .insertInto('dms.documentTagLinks')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['dms.documentTagLinks']>[]) {
    return this.db
      .insertInto('dms.documentTagLinks')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['dms.documentTagLinks']['id']['__update__'],
    value: Updateable<DB['dms.documentTagLinks']>,
  ) {
    return this.db
      .updateTable('dms.documentTagLinks')
      .set(value)
      .where('dms.documentTagLinks.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.documentTagLinks']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.documentTagLinks')
      .where('dms.documentTagLinks.id', '=', id);
  }
}
