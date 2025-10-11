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

export class PackageRepository implements GenericRepository<'wms.packages'> {
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.packages'> | undefined,
    filter?: FilterConfig<'wms.packages'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.packages',
    {
      carrier: string | null;
      createdAt: Date | null;
      height: number | null;
      id: string;
      insuranceValue: string | null;
      isFragile: boolean | null;
      isHazmat: boolean | null;
      length: number | null;
      packageNumber: string;
      packageType: string | null;
      packedAt: Date | null;
      packedByUserId: string | null;
      requiresSignature: boolean | null;
      salesOrderId: string;
      serviceLevel: string | null;
      shippedAt: Date | null;
      trackingNumber: string | null;
      updatedAt: Date | null;
      volume: number | null;
      warehouseId: string;
      weight: number | null;
      width: number | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'wms.packages'> | undefined,
    filter?: FilterConfig<'wms.packages'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.packages',
    {
      carrier: string | null;
      createdAt: Date | null;
      height: number | null;
      id: string;
      insuranceValue: string | null;
      isFragile: boolean | null;
      isHazmat: boolean | null;
      length: number | null;
      packageNumber: string;
      packageType: string | null;
      packedAt: Date | null;
      packedByUserId: string | null;
      requiresSignature: boolean | null;
      salesOrderId: string;
      serviceLevel: string | null;
      shippedAt: Date | null;
      trackingNumber: string | null;
      updatedAt: Date | null;
      volume: number | null;
      warehouseId: string;
      weight: number | null;
      width: number | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'wms.packages',
    {
      carrier: string | null;
      createdAt: Date | null;
      height: number | null;
      id: string;
      insuranceValue: string | null;
      isFragile: boolean | null;
      isHazmat: boolean | null;
      length: number | null;
      packageNumber: string;
      packageType: string | null;
      packedAt: Date | null;
      packedByUserId: string | null;
      requiresSignature: boolean | null;
      salesOrderId: string;
      serviceLevel: string | null;
      shippedAt: Date | null;
      trackingNumber: string | null;
      updatedAt: Date | null;
      volume: number | null;
      warehouseId: string;
      weight: number | null;
      width: number | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  create(
    value: {
      packageNumber: string;
      salesOrderId: string;
      warehouseId: string;
    } & {
      carrier?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      height?: number | null | undefined;
      id?: string | undefined;
      insuranceValue?: string | number | null | undefined;
      isFragile?: boolean | null | undefined;
      isHazmat?: boolean | null | undefined;
      length?: number | null | undefined;
      packageType?: string | null | undefined;
      packedAt?: string | Date | null | undefined;
      packedByUserId?: string | null | undefined;
      requiresSignature?: boolean | null | undefined;
      serviceLevel?: string | null | undefined;
      shippedAt?: string | Date | null | undefined;
      trackingNumber?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
      volume?: number | null | undefined;
      weight?: number | null | undefined;
      width?: number | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.packages',
    {
      carrier: string | null;
      createdAt: Date | null;
      height: number | null;
      id: string;
      insuranceValue: string | null;
      isFragile: boolean | null;
      isHazmat: boolean | null;
      length: number | null;
      packageNumber: string;
      packageType: string | null;
      packedAt: Date | null;
      packedByUserId: string | null;
      requiresSignature: boolean | null;
      salesOrderId: string;
      serviceLevel: string | null;
      shippedAt: Date | null;
      trackingNumber: string | null;
      updatedAt: Date | null;
      volume: number | null;
      warehouseId: string;
      weight: number | null;
      width: number | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    value: {
      carrier?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      height?: number | null | undefined;
      id?: string | undefined;
      insuranceValue?: string | number | null | undefined;
      isFragile?: boolean | null | undefined;
      isHazmat?: boolean | null | undefined;
      length?: number | null | undefined;
      packageNumber?: string | undefined;
      packageType?: string | null | undefined;
      packedAt?: string | Date | null | undefined;
      packedByUserId?: string | null | undefined;
      requiresSignature?: boolean | null | undefined;
      salesOrderId?: string | undefined;
      serviceLevel?: string | null | undefined;
      shippedAt?: string | Date | null | undefined;
      trackingNumber?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
      volume?: number | null | undefined;
      warehouseId?: string | undefined;
      weight?: number | null | undefined;
      width?: number | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.packages',
    'wms.packages',
    {
      carrier: string | null;
      createdAt: Date | null;
      height: number | null;
      id: string;
      insuranceValue: string | null;
      isFragile: boolean | null;
      isHazmat: boolean | null;
      length: number | null;
      packageNumber: string;
      packageType: string | null;
      packedAt: Date | null;
      packedByUserId: string | null;
      requiresSignature: boolean | null;
      salesOrderId: string;
      serviceLevel: string | null;
      shippedAt: Date | null;
      trackingNumber: string | null;
      updatedAt: Date | null;
      volume: number | null;
      warehouseId: string;
      weight: number | null;
      width: number | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.packages', DeleteResult> {
    throw new Error('Method not implemented.');
  }
}

export class WmsPackageRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.packages'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.packages', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.packages')
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
      builder = builder.where('wms.packages.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.packages']>) {
    return this.db.insertInto('wms.packages').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.packages']>[]) {
    return this.db.insertInto('wms.packages').values(values).returningAll();
  }

  update(
    id: DB['wms.packages']['id']['__update__'],
    value: Updateable<DB['wms.packages']>,
  ) {
    return this.db
      .updateTable('wms.packages')
      .set(value)
      .where('wms.packages.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.packages']['id']['__update__']) {
    return this.db.deleteFrom('wms.packages').where('wms.packages.id', '=', id);
  }
}
