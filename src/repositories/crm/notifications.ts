import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class CrmNotificationRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.notifications'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.notifications', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.notifications')
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
      builder = builder.where('crm.notifications.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.notifications']>) {
    return this.db.insertInto('crm.notifications').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.notifications']>[]) {
    return this.db
      .insertInto('crm.notifications')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['crm.notifications']['id']['__update__'],
    value: Updateable<DB['crm.notifications']>,
  ) {
    return this.db
      .updateTable('crm.notifications')
      .set(value)
      .where('crm.notifications.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.notifications']['id']['__update__']) {
    return this.db
      .deleteFrom('crm.notifications')
      .where('crm.notifications.id', '=', id);
  }
}
