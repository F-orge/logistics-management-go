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

export class InboundShipmentItemRepository
  implements GenericRepository<'wms.inboundShipmentItems'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.inboundShipmentItems'> | undefined,
    filter?: FilterConfig<'wms.inboundShipmentItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.inboundShipmentItems',
    {
      createdAt: Date | null;
      discrepancyNotes: string | null;
      discrepancyQuantity: number | null;
      expectedQuantity: number;
      id: string;
      inboundShipmentId: string;
      productId: string;
      receivedQuantity: number | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('wms.inboundShipmentItems').selectAll();

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
    sort?: SortConfig<'wms.inboundShipmentItems'> | undefined,
    filter?: FilterConfig<'wms.inboundShipmentItems'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.inboundShipmentItems',
    {
      createdAt: Date | null;
      discrepancyNotes: string | null;
      discrepancyQuantity: number | null;
      expectedQuantity: number;
      id: string;
      inboundShipmentId: string;
      productId: string;
      receivedQuantity: number | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('wms.inboundShipmentItems')
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
    'wms.inboundShipmentItems',
    {
      createdAt: Date | null;
      discrepancyNotes: string | null;
      discrepancyQuantity: number | null;
      expectedQuantity: number;
      id: string;
      inboundShipmentId: string;
      productId: string;
      receivedQuantity: number | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('wms.inboundShipmentItems')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      expectedQuantity: number;
      inboundShipmentId: string;
      productId: string;
    } & {
      createdAt?: string | Date | null | undefined;
      discrepancyNotes?: string | null | undefined;
      discrepancyQuantity?: number | null | undefined;
      id?: string | undefined;
      receivedQuantity?: number | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.inboundShipmentItems',
    {
      createdAt: Date | null;
      discrepancyNotes: string | null;
      discrepancyQuantity: number | null;
      expectedQuantity: number;
      id: string;
      inboundShipmentId: string;
      productId: string;
      receivedQuantity: number | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .insertInto('wms.inboundShipmentItems')
      .values(value)
      .returningAll();
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      discrepancyNotes?: string | null | undefined;
      discrepancyQuantity?: number | null | undefined;
      expectedQuantity?: number | undefined;
      id?: string | undefined;
      inboundShipmentId?: string | undefined;
      productId?: string | undefined;
      receivedQuantity?: number | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.inboundShipmentItems',
    'wms.inboundShipmentItems',
    {
      createdAt: Date | null;
      discrepancyNotes: string | null;
      discrepancyQuantity: number | null;
      expectedQuantity: number;
      id: string;
      inboundShipmentId: string;
      productId: string;
      receivedQuantity: number | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('wms.inboundShipmentItems')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'wms.inboundShipmentItems', DeleteResult> {
    return this.db.deleteFrom('wms.inboundShipmentItems').where('id', '=', id);
  }
}

export class WmsInboundShipmentItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.inboundShipmentItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.inboundShipmentItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.inboundShipmentItems')
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
        'wms.inboundShipmentItems.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['wms.inboundShipmentItems']>) {
    return this.db
      .insertInto('wms.inboundShipmentItems')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['wms.inboundShipmentItems']>[]) {
    return this.db
      .insertInto('wms.inboundShipmentItems')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['wms.inboundShipmentItems']['id']['__update__'],
    value: Updateable<DB['wms.inboundShipmentItems']>,
  ) {
    return this.db
      .updateTable('wms.inboundShipmentItems')
      .set(value)
      .where('wms.inboundShipmentItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.inboundShipmentItems']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.inboundShipmentItems')
      .where('wms.inboundShipmentItems.id', '=', id);
  }
}
