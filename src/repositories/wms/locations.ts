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
import { DB, WmsLocationTypeEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class LocationRepository implements GenericRepository<'wms.locations'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.locations'> | undefined,
    filter?: FilterConfig<'wms.locations'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.locations',
    {
      barcode: string | null;
      createdAt: Date | null;
      hazmatApproved: boolean | null;
      id: string;
      isActive: boolean | null;
      isPickable: boolean | null;
      isReceivable: boolean | null;
      level: number | null;
      maxPallets: number | null;
      maxVolume: number | null;
      maxWeight: number | null;
      name: string;
      parentLocationId: string | null;
      path: string | null;
      temperatureControlled: boolean | null;
      type: WmsLocationTypeEnum;
      updatedAt: Date | null;
      warehouseId: string;
      xCoordinate: number | null;
      yCoordinate: number | null;
      zCoordinate: number | null;
    }
  > {
    let query = this.db.selectFrom('wms.locations').selectAll();

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
    sort?: SortConfig<'wms.locations'> | undefined,
    filter?: FilterConfig<'wms.locations'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.locations',
    {
      barcode: string | null;
      createdAt: Date | null;
      hazmatApproved: boolean | null;
      id: string;
      isActive: boolean | null;
      isPickable: boolean | null;
      isReceivable: boolean | null;
      level: number | null;
      maxPallets: number | null;
      maxVolume: number | null;
      maxWeight: number | null;
      name: string;
      parentLocationId: string | null;
      path: string | null;
      temperatureControlled: boolean | null;
      type: WmsLocationTypeEnum;
      updatedAt: Date | null;
      warehouseId: string;
      xCoordinate: number | null;
      yCoordinate: number | null;
      zCoordinate: number | null;
    }
  > {
    let query = this.db
      .selectFrom('wms.locations')
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
    'wms.locations',
    {
      barcode: string | null;
      createdAt: Date | null;
      hazmatApproved: boolean | null;
      id: string;
      isActive: boolean | null;
      isPickable: boolean | null;
      isReceivable: boolean | null;
      level: number | null;
      maxPallets: number | null;
      maxVolume: number | null;
      maxWeight: number | null;
      name: string;
      parentLocationId: string | null;
      path: string | null;
      temperatureControlled: boolean | null;
      type: WmsLocationTypeEnum;
      updatedAt: Date | null;
      warehouseId: string;
      xCoordinate: number | null;
      yCoordinate: number | null;
      zCoordinate: number | null;
    }
  > {
    return this.db
      .selectFrom('wms.locations')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { name: string; type: WmsLocationTypeEnum; warehouseId: string } & {
      barcode?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      hazmatApproved?: boolean | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      isPickable?: boolean | null | undefined;
      isReceivable?: boolean | null | undefined;
      level?: number | null | undefined;
      maxPallets?: number | null | undefined;
      maxVolume?: number | null | undefined;
      maxWeight?: number | null | undefined;
      parentLocationId?: string | null | undefined;
      path?: string | null | undefined;
      temperatureControlled?: boolean | null | undefined;
      updatedAt?: string | Date | null | undefined;
      xCoordinate?: number | null | undefined;
      yCoordinate?: number | null | undefined;
      zCoordinate?: number | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.locations',
    {
      barcode: string | null;
      createdAt: Date | null;
      hazmatApproved: boolean | null;
      id: string;
      isActive: boolean | null;
      isPickable: boolean | null;
      isReceivable: boolean | null;
      level: number | null;
      maxPallets: number | null;
      maxVolume: number | null;
      maxWeight: number | null;
      name: string;
      parentLocationId: string | null;
      path: string | null;
      temperatureControlled: boolean | null;
      type: WmsLocationTypeEnum;
      updatedAt: Date | null;
      warehouseId: string;
      xCoordinate: number | null;
      yCoordinate: number | null;
      zCoordinate: number | null;
    }
  > {
    return this.db.insertInto('wms.locations').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      barcode?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      hazmatApproved?: boolean | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      isPickable?: boolean | null | undefined;
      isReceivable?: boolean | null | undefined;
      level?: number | null | undefined;
      maxPallets?: number | null | undefined;
      maxVolume?: number | null | undefined;
      maxWeight?: number | null | undefined;
      name?: string | undefined;
      parentLocationId?: string | null | undefined;
      path?: string | null | undefined;
      temperatureControlled?: boolean | null | undefined;
      type?: WmsLocationTypeEnum | undefined;
      updatedAt?: string | Date | null | undefined;
      warehouseId?: string | undefined;
      xCoordinate?: number | null | undefined;
      yCoordinate?: number | null | undefined;
      zCoordinate?: number | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.locations',
    'wms.locations',
    {
      barcode: string | null;
      createdAt: Date | null;
      hazmatApproved: boolean | null;
      id: string;
      isActive: boolean | null;
      isPickable: boolean | null;
      isReceivable: boolean | null;
      level: number | null;
      maxPallets: number | null;
      maxVolume: number | null;
      maxWeight: number | null;
      name: string;
      parentLocationId: string | null;
      path: string | null;
      temperatureControlled: boolean | null;
      type: WmsLocationTypeEnum;
      updatedAt: Date | null;
      warehouseId: string;
      xCoordinate: number | null;
      yCoordinate: number | null;
      zCoordinate: number | null;
    }
  > {
    return this.db
      .updateTable('wms.locations')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.locations', DeleteResult> {
    return this.db.deleteFrom('wms.locations').where('id', '=', id);
  }
}

export class WmsLocationRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.locations'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.locations', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.locations')
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
      builder = builder.where('wms.locations.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.locations']>) {
    return this.db.insertInto('wms.locations').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.locations']>[]) {
    return this.db.insertInto('wms.locations').values(values).returningAll();
  }

  update(
    id: DB['wms.locations']['id']['__update__'],
    value: Updateable<DB['wms.locations']>,
  ) {
    return this.db
      .updateTable('wms.locations')
      .set(value)
      .where('wms.locations.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.locations']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.locations')
      .where('wms.locations.id', '=', id);
  }
}
