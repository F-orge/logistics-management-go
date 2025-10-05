import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class CrmContactRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.contacts'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.contacts', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.contacts')
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
      builder = builder.where('crm.contacts.name', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.contacts']>) {
    return this.db.insertInto('crm.contacts').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.contacts']>[]) {
    return this.db.insertInto('crm.contacts').values(values).returningAll();
  }

  update(
    id: DB['crm.contacts']['id']['__update__'],
    value: Updateable<DB['crm.contacts']>,
  ) {
    return this.db
      .updateTable('crm.contacts')
      .set(value)
      .where('crm.contacts.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.contacts']['id']['__update__']) {
    return this.db.deleteFrom('crm.contacts').where('crm.contacts.id', '=', id);
  }
}
