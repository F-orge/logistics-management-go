import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class CrmTagRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.tags'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.tags', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.tags')
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

    if (search) builder = builder.where('crm.tags.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.tags']>) {
    return this.db.insertInto('crm.tags').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.tags']>[]) {
    return this.db.insertInto('crm.tags').values(values).returningAll();
  }

  update(
    id: DB['crm.tags']['id']['__update__'],
    value: Updateable<DB['crm.tags']>,
  ) {
    return this.db
      .updateTable('crm.tags')
      .set(value)
      .where('crm.tags.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.tags']['id']['__update__']) {
    return this.db.deleteFrom('crm.tags').where('crm.tags.id', '=', id);
  }
}
