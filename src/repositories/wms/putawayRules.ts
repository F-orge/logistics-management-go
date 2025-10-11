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

export class PutawayRuleRepository
  implements GenericRepository<'wms.putawayRules'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.putawayRules'> | undefined,
    filter?: FilterConfig<'wms.putawayRules'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.putawayRules',
    {
      clientId: string | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      locationType: WmsLocationTypeEnum | null;
      maxQuantity: number | null;
      minQuantity: number | null;
      preferredLocationId: string | null;
      priority: number;
      productId: string;
      requiresHazmatApproval: boolean | null;
      requiresTemperatureControl: boolean | null;
      updatedAt: Date | null;
      volumeThreshold: number | null;
      warehouseId: string;
      weightThreshold: number | null;
    }
  > {
    let query = this.db.selectFrom('wms.putawayRules').selectAll();

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
    sort?: SortConfig<'wms.putawayRules'> | undefined,
    filter?: FilterConfig<'wms.putawayRules'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.putawayRules',
    {
      clientId: string | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      locationType: WmsLocationTypeEnum | null;
      maxQuantity: number | null;
      minQuantity: number | null;
      preferredLocationId: string | null;
      priority: number;
      productId: string;
      requiresHazmatApproval: boolean | null;
      requiresTemperatureControl: boolean | null;
      updatedAt: Date | null;
      volumeThreshold: number | null;
      warehouseId: string;
      weightThreshold: number | null;
    }
  > {
    let query = this.db
      .selectFrom('wms.putawayRules')
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
    'wms.putawayRules',
    {
      clientId: string | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      locationType: WmsLocationTypeEnum | null;
      maxQuantity: number | null;
      minQuantity: number | null;
      preferredLocationId: string | null;
      priority: number;
      productId: string;
      requiresHazmatApproval: boolean | null;
      requiresTemperatureControl: boolean | null;
      updatedAt: Date | null;
      volumeThreshold: number | null;
      warehouseId: string;
      weightThreshold: number | null;
    }
  > {
    return this.db
      .selectFrom('wms.putawayRules')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { productId: string; warehouseId: string } & {
      clientId?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      locationType?: WmsLocationTypeEnum | null | undefined;
      maxQuantity?: number | null | undefined;
      minQuantity?: number | null | undefined;
      preferredLocationId?: string | null | undefined;
      priority?: number | undefined;
      requiresHazmatApproval?: boolean | null | undefined;
      requiresTemperatureControl?: boolean | null | undefined;
      updatedAt?: string | Date | null | undefined;
      volumeThreshold?: number | null | undefined;
      weightThreshold?: number | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.putawayRules',
    {
      clientId: string | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      locationType: WmsLocationTypeEnum | null;
      maxQuantity: number | null;
      minQuantity: number | null;
      preferredLocationId: string | null;
      priority: number;
      productId: string;
      requiresHazmatApproval: boolean | null;
      requiresTemperatureControl: boolean | null;
      updatedAt: Date | null;
      volumeThreshold: number | null;
      warehouseId: string;
      weightThreshold: number | null;
    }
  > {
    return this.db.insertInto('wms.putawayRules').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      clientId?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      locationType?: WmsLocationTypeEnum | null | undefined;
      maxQuantity?: number | null | undefined;
      minQuantity?: number | null | undefined;
      preferredLocationId?: string | null | undefined;
      priority?: number | undefined;
      productId?: string | undefined;
      requiresHazmatApproval?: boolean | null | undefined;
      requiresTemperatureControl?: boolean | null | undefined;
      updatedAt?: string | Date | null | undefined;
      volumeThreshold?: number | null | undefined;
      warehouseId?: string | undefined;
      weightThreshold?: number | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.putawayRules',
    'wms.putawayRules',
    {
      clientId: string | null;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      locationType: WmsLocationTypeEnum | null;
      maxQuantity: number | null;
      minQuantity: number | null;
      preferredLocationId: string | null;
      priority: number;
      productId: string;
      requiresHazmatApproval: boolean | null;
      requiresTemperatureControl: boolean | null;
      updatedAt: Date | null;
      volumeThreshold: number | null;
      warehouseId: string;
      weightThreshold: number | null;
    }
  > {
    return this.db
      .updateTable('wms.putawayRules')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.putawayRules', DeleteResult> {
    return this.db.deleteFrom('wms.putawayRules').where('id', '=', id);
  }
}

export class WmsPutawayRuleRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.putawayRules'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.putawayRules', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.putawayRules')
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
      builder = builder.where('wms.putawayRules.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.putawayRules']>) {
    return this.db.insertInto('wms.putawayRules').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.putawayRules']>[]) {
    return this.db.insertInto('wms.putawayRules').values(values).returningAll();
  }

  update(
    id: DB['wms.putawayRules']['id']['__update__'],
    value: Updateable<DB['wms.putawayRules']>,
  ) {
    return this.db
      .updateTable('wms.putawayRules')
      .set(value)
      .where('wms.putawayRules.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.putawayRules']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.putawayRules')
      .where('wms.putawayRules.id', '=', id);
  }
}
