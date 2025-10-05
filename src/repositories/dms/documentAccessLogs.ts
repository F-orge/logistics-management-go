import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class DmsDocumentAccessLogRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.documentAccessLogs'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.documentAccessLogs', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.documentAccessLogs')
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
      builder = builder.where(
        'dms.documentAccessLogs.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['dms.documentAccessLogs']>) {
    return this.db
      .insertInto('dms.documentAccessLogs')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['dms.documentAccessLogs']>[]) {
    return this.db
      .insertInto('dms.documentAccessLogs')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['dms.documentAccessLogs']['id']['__update__'],
    value: Updateable<DB['dms.documentAccessLogs']>,
  ) {
    return this.db
      .updateTable('dms.documentAccessLogs')
      .set(value)
      .where('dms.documentAccessLogs.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.documentAccessLogs']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.documentAccessLogs')
      .where('dms.documentAccessLogs.id', '=', id);
  }
}
