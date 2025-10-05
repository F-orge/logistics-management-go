import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class TmsProofOfDeliveryRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.proofOfDeliveries'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.proofOfDeliveries', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.proofOfDeliveries')
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
        'tms.proofOfDeliveries.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['tms.proofOfDeliveries']>) {
    return this.db
      .insertInto('tms.proofOfDeliveries')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['tms.proofOfDeliveries']>[]) {
    return this.db
      .insertInto('tms.proofOfDeliveries')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['tms.proofOfDeliveries']['id']['__update__'],
    value: Updateable<DB['tms.proofOfDeliveries']>,
  ) {
    return this.db
      .updateTable('tms.proofOfDeliveries')
      .set(value)
      .where('tms.proofOfDeliveries.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.proofOfDeliveries']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.proofOfDeliveries')
      .where('tms.proofOfDeliveries.id', '=', id);
  }
}
