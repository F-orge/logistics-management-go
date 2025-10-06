import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class DmsProofOfDeliveryRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.proofOfDeliveries'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.proofOfDeliveries', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.proofOfDeliveries')
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
      builder = builder.where(
        'dms.proofOfDeliveries.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['dms.proofOfDeliveries']>) {
    return this.db
      .insertInto('dms.proofOfDeliveries')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['dms.proofOfDeliveries']>[]) {
    return this.db
      .insertInto('dms.proofOfDeliveries')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['dms.proofOfDeliveries']['id']['__update__'],
    value: Updateable<DB['dms.proofOfDeliveries']>,
  ) {
    return this.db
      .updateTable('dms.proofOfDeliveries')
      .set(value)
      .where('dms.proofOfDeliveries.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.proofOfDeliveries']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.proofOfDeliveries')
      .where('dms.proofOfDeliveries.id', '=', id);
  }
}
