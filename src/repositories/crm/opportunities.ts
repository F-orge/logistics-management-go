import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class CrmOpportunityRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.opportunities'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.opportunities', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.opportunities')
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
      builder = builder.where('crm.opportunities.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.opportunities']>) {
    return this.db.insertInto('crm.opportunities').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.opportunities']>[]) {
    return this.db
      .insertInto('crm.opportunities')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['crm.opportunities']['id']['__update__'],
    value: Updateable<DB['crm.opportunities']>,
  ) {
    return this.db
      .updateTable('crm.opportunities')
      .set(value)
      .where('crm.opportunities.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.opportunities']['id']['__update__']) {
    return this.db
      .deleteFrom('crm.opportunities')
      .where('crm.opportunities.id', '=', id);
  }
}
