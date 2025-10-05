import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class WmsPutawayRuleRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.putawayRules'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.putawayRules', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.putawayRules')
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
      builder = builder.where('wms.putawayRules.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.putawayRules']>) {
    return this.db.insertInto('wms.putawayRules').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.putawayRules']>[]) {
    return this.db.insertInto('wms.putawayRules').values(values).returningAll();
  }

  update(
    id: DB['wms.putawayRules']['id']['__update__'],
    value: Updateable<DB['wms.putawayRules']>,
  ) {
    return this.db
      .updateTable('wms.putawayRules')
      .set(value)
      .where('wms.putawayRules.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.putawayRules']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.putawayRules')
      .where('wms.putawayRules.id', '=', id);
  }
}
