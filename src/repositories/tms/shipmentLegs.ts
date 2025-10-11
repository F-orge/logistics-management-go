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
import { DB, TmsShipmentLegStatusEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class ShipmentLegRepository
  implements GenericRepository<'tms.shipmentLegs'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.shipmentLegs'> | undefined,
    filter?: FilterConfig<'tms.shipmentLegs'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.shipmentLegs',
    {
      carrierId: string | null;
      createdAt: Date | null;
      endLocation: string | null;
      id: string;
      internalTripId: string | null;
      legSequence: number;
      shipmentId: string | null;
      startLocation: string | null;
      status: TmsShipmentLegStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('tms.shipmentLegs').selectAll();

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
    sort?: SortConfig<'tms.shipmentLegs'> | undefined,
    filter?: FilterConfig<'tms.shipmentLegs'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.shipmentLegs',
    {
      carrierId: string | null;
      createdAt: Date | null;
      endLocation: string | null;
      id: string;
      internalTripId: string | null;
      legSequence: number;
      shipmentId: string | null;
      startLocation: string | null;
      status: TmsShipmentLegStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('tms.shipmentLegs')
      .selectAll()
      .where('createdAt', '>=', from)
      .where('createdAt', '<=', to);

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
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'tms.shipmentLegs',
    {
      carrierId: string | null;
      createdAt: Date | null;
      endLocation: string | null;
      id: string;
      internalTripId: string | null;
      legSequence: number;
      shipmentId: string | null;
      startLocation: string | null;
      status: TmsShipmentLegStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('tms.shipmentLegs')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { legSequence: number } & {
      carrierId?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      endLocation?: string | null | undefined;
      id?: string | undefined;
      internalTripId?: string | null | undefined;
      shipmentId?: string | null | undefined;
      startLocation?: string | null | undefined;
      status?: TmsShipmentLegStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'tms.shipmentLegs',
    {
      carrierId: string | null;
      createdAt: Date | null;
      endLocation: string | null;
      id: string;
      internalTripId: string | null;
      legSequence: number;
      shipmentId: string | null;
      startLocation: string | null;
      status: TmsShipmentLegStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('tms.shipmentLegs').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      carrierId?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      endLocation?: string | null | undefined;
      id?: string | undefined;
      internalTripId?: string | null | undefined;
      legSequence?: number | undefined;
      shipmentId?: string | null | undefined;
      startLocation?: string | null | undefined;
      status?: TmsShipmentLegStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.shipmentLegs',
    'tms.shipmentLegs',
    {
      carrierId: string | null;
      createdAt: Date | null;
      endLocation: string | null;
      id: string;
      internalTripId: string | null;
      legSequence: number;
      shipmentId: string | null;
      startLocation: string | null;
      status: TmsShipmentLegStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('tms.shipmentLegs')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'tms.shipmentLegs', DeleteResult> {
    return this.db.deleteFrom('tms.shipmentLegs').where('id', '=', id);
  }
}

export class TmsShipmentLegRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.shipmentLegs'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.shipmentLegs', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.shipmentLegs')
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
      builder = builder.where('tms.shipmentLegs.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.shipmentLegs']>) {
    return this.db.insertInto('tms.shipmentLegs').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.shipmentLegs']>[]) {
    return this.db.insertInto('tms.shipmentLegs').values(values).returningAll();
  }

  update(
    id: DB['tms.shipmentLegs']['id']['__update__'],
    value: Updateable<DB['tms.shipmentLegs']>,
  ) {
    return this.db
      .updateTable('tms.shipmentLegs')
      .set(value)
      .where('tms.shipmentLegs.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.shipmentLegs']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.shipmentLegs')
      .where('tms.shipmentLegs.id', '=', id);
  }
}
