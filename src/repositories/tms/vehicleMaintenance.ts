import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class TmsVehicleMaintenanceRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.vehicleMaintenance'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.vehicleMaintenance', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.vehicleMaintenance')
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
        'tms.vehicleMaintenance.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['tms.vehicleMaintenance']>) {
    return this.db
      .insertInto('tms.vehicleMaintenance')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['tms.vehicleMaintenance']>[]) {
    return this.db
      .insertInto('tms.vehicleMaintenance')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['tms.vehicleMaintenance']['id']['__update__'],
    value: Updateable<DB['tms.vehicleMaintenance']>,
  ) {
    return this.db
      .updateTable('tms.vehicleMaintenance')
      .set(value)
      .where('tms.vehicleMaintenance.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.vehicleMaintenance']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.vehicleMaintenance')
      .where('tms.vehicleMaintenance.id', '=', id);
  }
}
