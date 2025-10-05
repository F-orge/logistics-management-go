import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class TmsCarrierRateRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.carrierRates'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.carrierRates', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.carrierRates')
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
      builder = builder.where('tms.carrierRates.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.carrierRates']>) {
    return this.db.insertInto('tms.carrierRates').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.carrierRates']>[]) {
    return this.db.insertInto('tms.carrierRates').values(values).returningAll();
  }

  update(
    id: DB['tms.carrierRates']['id']['__update__'],
    value: Updateable<DB['tms.carrierRates']>,
  ) {
    return this.db
      .updateTable('tms.carrierRates')
      .set(value)
      .where('tms.carrierRates.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.carrierRates']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.carrierRates')
      .where('tms.carrierRates.id', '=', id);
  }
}
