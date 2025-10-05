import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class CrmInteractionRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.interactions'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.interactions', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.interactions')
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
      builder = builder.where('crm.interactions.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.interactions']>) {
    return this.db.insertInto('crm.interactions').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.interactions']>[]) {
    return this.db.insertInto('crm.interactions').values(values).returningAll();
  }

  update(
    id: DB['crm.interactions']['id']['__update__'],
    value: Updateable<DB['crm.interactions']>,
  ) {
    return this.db
      .updateTable('crm.interactions')
      .set(value)
      .where('crm.interactions.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.interactions']['id']['__update__']) {
    return this.db
      .deleteFrom('crm.interactions')
      .where('crm.interactions.id', '=', id);
  }
}
