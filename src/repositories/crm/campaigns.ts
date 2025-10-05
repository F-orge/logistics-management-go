import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class CrmCampaignRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.campaigns'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.campaigns', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.campaigns')
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
      builder = builder.where('crm.campaigns.name', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.campaigns']>) {
    return this.db.insertInto('crm.campaigns').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.campaigns']>[]) {
    return this.db.insertInto('crm.campaigns').values(values).returningAll();
  }

  update(
    id: DB['crm.campaigns']['id']['__update__'],
    value: Updateable<DB['crm.campaigns']>,
  ) {
    return this.db
      .updateTable('crm.campaigns')
      .set(value)
      .where('crm.campaigns.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.campaigns']['id']['__update__']) {
    return this.db
      .deleteFrom('crm.campaigns')
      .where('crm.campaigns.id', '=', id);
  }
}
