import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class CrmTaggingRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.taggings'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.taggings', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.taggings')
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
      builder = builder.where('crm.taggings.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.taggings']>) {
    return this.db.insertInto('crm.taggings').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.taggings']>[]) {
    return this.db.insertInto('crm.taggings').values(values).returningAll();
  }

  update(
    id: DB['crm.taggings']['id']['__update__'],
    value: Updateable<DB['crm.taggings']>,
  ) {
    return this.db
      .updateTable('crm.taggings')
      .set(value)
      .where('crm.taggings.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.taggings']['id']['__update__']) {
    return this.db.deleteFrom('crm.taggings').where('crm.taggings.id', '=', id);
  }
}
