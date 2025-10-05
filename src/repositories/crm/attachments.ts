import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class CrmAttachmentRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.attachments'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.attachments', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.attachments')
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
      builder = builder.where('crm.attachments.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.attachments']>) {
    return this.db.insertInto('crm.attachments').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.attachments']>[]) {
    return this.db.insertInto('crm.attachments').values(values).returningAll();
  }

  update(
    id: DB['crm.attachments']['id']['__update__'],
    value: Updateable<DB['crm.attachments']>,
  ) {
    return this.db
      .updateTable('crm.attachments')
      .set(value)
      .where('crm.attachments.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.attachments']['id']['__update__']) {
    return this.db
      .deleteFrom('crm.attachments')
      .where('crm.attachments.id', '=', id);
  }
}
