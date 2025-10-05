import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class CrmLeadRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.leads'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.leads', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.leads')
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

    if (search) builder = builder.where('crm.leads.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.leads']>) {
    return this.db.insertInto('crm.leads').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.leads']>[]) {
    return this.db.insertInto('crm.leads').values(values).returningAll();
  }

  update(
    id: DB['crm.leads']['id']['__update__'],
    value: Updateable<DB['crm.leads']>,
  ) {
    return this.db
      .updateTable('crm.leads')
      .set(value)
      .where('crm.leads.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.leads']['id']['__update__']) {
    return this.db.deleteFrom('crm.leads').where('crm.leads.id', '=', id);
  }
}
