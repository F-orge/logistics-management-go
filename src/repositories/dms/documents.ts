import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class DmsDocumentRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.documents'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.documents', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.documents')
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
      builder = builder.where('dms.documents.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['dms.documents']>) {
    return this.db.insertInto('dms.documents').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['dms.documents']>[]) {
    return this.db.insertInto('dms.documents').values(values).returningAll();
  }

  update(
    id: DB['dms.documents']['id']['__update__'],
    value: Updateable<DB['dms.documents']>,
  ) {
    return this.db
      .updateTable('dms.documents')
      .set(value)
      .where('dms.documents.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.documents']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.documents')
      .where('dms.documents.id', '=', id);
  }
}
