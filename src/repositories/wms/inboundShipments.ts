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
import { DB, WmsInboundShipmentStatusEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class InboundShipmentRepository
  implements GenericRepository<'wms.inboundShipments'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.inboundShipments'> | undefined,
    filter?: FilterConfig<'wms.inboundShipments'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.inboundShipments',
    {
      id: string;
      createdAt: Date | null;
      updatedAt: Date | null;
      status: WmsInboundShipmentStatusEnum | null;
      actualArrivalDate: Date | null;
      clientId: string | null;
      expectedArrivalDate: Date | null;
      warehouseId: string;
    }
  > {
    let query = this.db.selectFrom('wms.inboundShipments').selectAll();

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
    sort?: SortConfig<'wms.inboundShipments'> | undefined,
    filter?: FilterConfig<'wms.inboundShipments'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.inboundShipments',
    {
      id: string;
      createdAt: Date | null;
      updatedAt: Date | null;
      status: WmsInboundShipmentStatusEnum | null;
      actualArrivalDate: Date | null;
      clientId: string | null;
      expectedArrivalDate: Date | null;
      warehouseId: string;
    }
  > {
    let query = this.db
      .selectFrom('wms.inboundShipments')
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
  in(values: string[]): SelectQueryBuilder<
    DB,
    'wms.inboundShipments',
    {
      id: string;
      createdAt: Date | null;
      updatedAt: Date | null;
      status: WmsInboundShipmentStatusEnum | null;
      actualArrivalDate: Date | null;
      clientId: string | null;
      expectedArrivalDate: Date | null;
      warehouseId: string;
    }
  > {
    return this.db
      .selectFrom('wms.inboundShipments')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { warehouseId: string } & {
      id?: string | undefined;
      createdAt?: string | Date | null | undefined;
      updatedAt?: string | Date | null | undefined;
      status?: WmsInboundShipmentStatusEnum | null | undefined;
      actualArrivalDate?: string | Date | null | undefined;
      clientId?: string | null | undefined;
      expectedArrivalDate?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.inboundShipments',
    {
      id: string;
      createdAt: Date | null;
      updatedAt: Date | null;
      status: WmsInboundShipmentStatusEnum | null;
      actualArrivalDate: Date | null;
      clientId: string | null;
      expectedArrivalDate: Date | null;
      warehouseId: string;
    }
  > {
    return this.db
      .insertInto('wms.inboundShipments')
      .values(value)
      .returningAll();
  }
  update(
    id: string,
    value: {
      id?: string | undefined;
      createdAt?: string | Date | null | undefined;
      updatedAt?: string | Date | null | undefined;
      status?: WmsInboundShipmentStatusEnum | null | undefined;
      actualArrivalDate?: string | Date | null | undefined;
      clientId?: string | null | undefined;
      expectedArrivalDate?: string | Date | null | undefined;
      warehouseId?: string | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.inboundShipments',
    'wms.inboundShipments',
    {
      id: string;
      createdAt: Date | null;
      updatedAt: Date | null;
      status: WmsInboundShipmentStatusEnum | null;
      actualArrivalDate: Date | null;
      clientId: string | null;
      expectedArrivalDate: Date | null;
      warehouseId: string;
    }
  > {
    return this.db
      .updateTable('wms.inboundShipments')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'wms.inboundShipments', DeleteResult> {
    return this.db.deleteFrom('wms.inboundShipments').where('id', '=', id);
  }
}

export class WmsInboundShipmentRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.inboundShipments'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.inboundShipments', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.inboundShipments')
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
      builder = builder.where('wms.inboundShipments.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.inboundShipments']>) {
    return this.db
      .insertInto('wms.inboundShipments')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.inboundShipments']>[]) {
    return this.db
      .insertInto('wms.inboundShipments')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.inboundShipments']['id']['__update__'],
    value: Updateable<DB['wms.inboundShipments']>,
  ) {
    return this.db
      .updateTable('wms.inboundShipments')
      .set(value)
      .where('wms.inboundShipments.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.inboundShipments']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.inboundShipments')
      .where('wms.inboundShipments.id', '=', id);
  }
}
