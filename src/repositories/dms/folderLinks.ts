import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class DmsFolderLinkRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.folderLinks'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.folderLinks', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.folderLinks')
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
      builder = builder.where('dms.folderLinks.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['dms.folderLinks']>) {
    return this.db.insertInto('dms.folderLinks').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['dms.folderLinks']>[]) {
    return this.db.insertInto('dms.folderLinks').values(values).returningAll();
  }

  update(
    id: DB['dms.folderLinks']['id']['__update__'],
    value: Updateable<DB['dms.folderLinks']>,
  ) {
    return this.db
      .updateTable('dms.folderLinks')
      .set(value)
      .where('dms.folderLinks.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.folderLinks']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.folderLinks')
      .where('dms.folderLinks.id', '=', id);
  }
}
