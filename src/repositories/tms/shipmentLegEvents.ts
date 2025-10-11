import {
  DeleteQueryBuilder,
  DeleteResult,
  Insertable,
  InsertQueryBuilder,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  SelectQueryBuilder,
  Updateable,
  UpdateQueryBuilder,
} from 'kysely';
import { DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class ShipmentLegEventRepository
  implements GenericRepository<'tms.shipmentLegEvents'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.shipmentLegEvents'> | undefined,
    filter?: FilterConfig<'tms.shipmentLegEvents'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.shipmentLegEvents',
    {
      id: string;
      eventTimestamp: Date;
      location: string | null;
      shipmentLegId: string;
      statusMessage: string | null;
    }
  > {
    let query = this.db.selectFrom('tms.shipmentLegEvents').selectAll();

    if (limit) query = query.limit(limit);

    if (page && limit) query = query.offset((page - 1) * limit);

    for (const sortCol of sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order);
    }

    for (const filterCol of filter || []) {
      query = query.where(
        filterCol.column,
        filterCol.operation,
        filterCol.value,
      );
    }

    return query;
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'tms.shipmentLegEvents'> | undefined,
    filter?: FilterConfig<'tms.shipmentLegEvents'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.shipmentLegEvents',
    {
      id: string;
      eventTimestamp: Date;
      location: string | null;
      shipmentLegId: string;
      statusMessage: string | null;
    }
  > {
    let query = this.db
      .selectFrom('tms.shipmentLegEvents')
      .selectAll()
      .where('eventTimestamp', '>=', from)
      .where('eventTimestamp', '<=', to);

    for (const sortCol of sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order);
    }

    for (const filterCol of filter || []) {
      query = query.where(
        filterCol.column,
        filterCol.operation,
        filterCol.value,
      );
    }

    return query;
  }
  in(values: string[]): SelectQueryBuilder<
    DB,
    'tms.shipmentLegEvents',
    {
      id: string;
      eventTimestamp: Date;
      location: string | null;
      shipmentLegId: string;
      statusMessage: string | null;
    }
  > {
    return this.db
      .selectFrom('tms.shipmentLegEvents')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { shipmentLegId: string } & {
      id?: string | undefined;
      eventTimestamp?: string | Date | undefined;
      location?: string | null | undefined;
      statusMessage?: string | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'tms.shipmentLegEvents',
    {
      id: string;
      eventTimestamp: Date;
      location: string | null;
      shipmentLegId: string;
      statusMessage: string | null;
    }
  > {
    return this.db
      .insertInto('tms.shipmentLegEvents')
      .values(value)
      .returningAll();
  }
  update(
    id: string,
    value: {
      id?: string | undefined;
      eventTimestamp?: string | Date | undefined;
      location?: string | null | undefined;
      shipmentLegId?: string | undefined;
      statusMessage?: string | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.shipmentLegEvents',
    'tms.shipmentLegEvents',
    {
      id: string;
      eventTimestamp: Date;
      location: string | null;
      shipmentLegId: string;
      statusMessage: string | null;
    }
  > {
    return this.db
      .updateTable('tms.shipmentLegEvents')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'tms.shipmentLegEvents', DeleteResult> {
    return this.db.deleteFrom('tms.shipmentLegEvents').where('id', '=', id);
  }
}

export class TmsShipmentLegEventRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.shipmentLegEvents'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.shipmentLegEvents', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.shipmentLegEvents')
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
        'tms.shipmentLegEvents.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['tms.shipmentLegEvents']>) {
    return this.db
      .insertInto('tms.shipmentLegEvents')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['tms.shipmentLegEvents']>[]) {
    return this.db
      .insertInto('tms.shipmentLegEvents')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['tms.shipmentLegEvents']['id']['__update__'],
    value: Updateable<DB['tms.shipmentLegEvents']>,
  ) {
    return this.db
      .updateTable('tms.shipmentLegEvents')
      .set(value)
      .where('tms.shipmentLegEvents.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.shipmentLegEvents']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.shipmentLegEvents')
      .where('tms.shipmentLegEvents.id', '=', id);
  }
}
