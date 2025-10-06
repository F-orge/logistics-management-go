import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class DmsDeliveryRouteRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.deliveryRoutes'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.deliveryRoutes', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.deliveryRoutes')
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
      builder = builder.where('dms.deliveryRoutes.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['dms.deliveryRoutes']>) {
    return this.db
      .insertInto('dms.deliveryRoutes')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['dms.deliveryRoutes']>[]) {
    return this.db
      .insertInto('dms.deliveryRoutes')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['dms.deliveryRoutes']['id']['__update__'],
    value: Updateable<DB['dms.deliveryRoutes']>,
  ) {
    return this.db
      .updateTable('dms.deliveryRoutes')
      .set(value)
      .where('dms.deliveryRoutes.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.deliveryRoutes']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.deliveryRoutes')
      .where('dms.deliveryRoutes.id', '=', id);
  }
}
