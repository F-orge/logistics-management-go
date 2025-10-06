import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class DmsDeliveryTaskRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.deliveryTasks'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.deliveryTasks', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.deliveryTasks')
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
      builder = builder.where('dms.deliveryTasks.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['dms.deliveryTasks']>) {
    return this.db.insertInto('dms.deliveryTasks').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['dms.deliveryTasks']>[]) {
    return this.db
      .insertInto('dms.deliveryTasks')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['dms.deliveryTasks']['id']['__update__'],
    value: Updateable<DB['dms.deliveryTasks']>,
  ) {
    return this.db
      .updateTable('dms.deliveryTasks')
      .set(value)
      .where('dms.deliveryTasks.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.deliveryTasks']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.deliveryTasks')
      .where('dms.deliveryTasks.id', '=', id);
  }
}
