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
import { DB, WmsOutboundShipmentStatusEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class OutboundShipmentRepository
  implements GenericRepository<'wms.outboundShipments'>
{
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.outboundShipments'> | undefined,
    filter?: FilterConfig<'wms.outboundShipments'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.outboundShipments',
    {
      carrier: string | null;
      createdAt: Date | null;
      id: string;
      salesOrderId: string;
      status: WmsOutboundShipmentStatusEnum | null;
      trackingNumber: string | null;
      updatedAt: Date | null;
      warehouseId: string;
    }
  > {
    throw new Error('Method not implemented.');
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'wms.outboundShipments'> | undefined,
    filter?: FilterConfig<'wms.outboundShipments'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.outboundShipments',
    {
      carrier: string | null;
      createdAt: Date | null;
      id: string;
      salesOrderId: string;
      status: WmsOutboundShipmentStatusEnum | null;
      trackingNumber: string | null;
      updatedAt: Date | null;
      warehouseId: string;
    }
  > {
    throw new Error('Method not implemented.');
  }
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'wms.outboundShipments',
    {
      carrier: string | null;
      createdAt: Date | null;
      id: string;
      salesOrderId: string;
      status: WmsOutboundShipmentStatusEnum | null;
      trackingNumber: string | null;
      updatedAt: Date | null;
      warehouseId: string;
    }
  > {
    throw new Error('Method not implemented.');
  }
  create(
    value: { salesOrderId: string; warehouseId: string } & {
      carrier?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      status?: WmsOutboundShipmentStatusEnum | null | undefined;
      trackingNumber?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.outboundShipments',
    {
      carrier: string | null;
      createdAt: Date | null;
      id: string;
      salesOrderId: string;
      status: WmsOutboundShipmentStatusEnum | null;
      trackingNumber: string | null;
      updatedAt: Date | null;
      warehouseId: string;
    }
  > {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    value: {
      carrier?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      salesOrderId?: string | undefined;
      status?: WmsOutboundShipmentStatusEnum | null | undefined;
      trackingNumber?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
      warehouseId?: string | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.outboundShipments',
    'wms.outboundShipments',
    {
      carrier: string | null;
      createdAt: Date | null;
      id: string;
      salesOrderId: string;
      status: WmsOutboundShipmentStatusEnum | null;
      trackingNumber: string | null;
      updatedAt: Date | null;
      warehouseId: string;
    }
  > {
    throw new Error('Method not implemented.');
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'wms.outboundShipments', DeleteResult> {
    throw new Error('Method not implemented.');
  }
}

export class WmsOutboundShipmentRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.outboundShipments'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.outboundShipments', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.outboundShipments')
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
        'wms.outboundShipments.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['wms.outboundShipments']>) {
    return this.db
      .insertInto('wms.outboundShipments')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.outboundShipments']>[]) {
    return this.db
      .insertInto('wms.outboundShipments')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.outboundShipments']['id']['__update__'],
    value: Updateable<DB['wms.outboundShipments']>,
  ) {
    return this.db
      .updateTable('wms.outboundShipments')
      .set(value)
      .where('wms.outboundShipments.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.outboundShipments']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.outboundShipments')
      .where('wms.outboundShipments.id', '=', id);
  }
}
