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
import { DB, WmsProductStatusEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class ProductRepository implements GenericRepository<'wms.products'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.products'> | undefined,
    filter?: FilterConfig<'wms.products'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.products',
    {
      barcode: string | null;
      clientId: string | null;
      costPrice: string | null;
      createdAt: Date | null;
      description: string | null;
      height: number | null;
      id: string;
      length: number | null;
      name: string;
      sku: string;
      status: WmsProductStatusEnum | null;
      supplierId: string | null;
      updatedAt: Date | null;
      volume: number | null;
      weight: number | null;
      width: number | null;
    }
  > {
    let query = this.db.selectFrom('wms.products').selectAll();

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
    sort?: SortConfig<'wms.products'> | undefined,
    filter?: FilterConfig<'wms.products'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.products',
    {
      barcode: string | null;
      clientId: string | null;
      costPrice: string | null;
      createdAt: Date | null;
      description: string | null;
      height: number | null;
      id: string;
      length: number | null;
      name: string;
      sku: string;
      status: WmsProductStatusEnum | null;
      supplierId: string | null;
      updatedAt: Date | null;
      volume: number | null;
      weight: number | null;
      width: number | null;
    }
  > {
    let query = this.db
      .selectFrom('wms.products')
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
    'wms.products',
    {
      barcode: string | null;
      clientId: string | null;
      costPrice: string | null;
      createdAt: Date | null;
      description: string | null;
      height: number | null;
      id: string;
      length: number | null;
      name: string;
      sku: string;
      status: WmsProductStatusEnum | null;
      supplierId: string | null;
      updatedAt: Date | null;
      volume: number | null;
      weight: number | null;
      width: number | null;
    }
  > {
    return this.db
      .selectFrom('wms.products')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { name: string; sku: string } & {
      barcode?: string | null | undefined;
      clientId?: string | null | undefined;
      costPrice?: string | number | null | undefined;
      createdAt?: string | Date | null | undefined;
      description?: string | null | undefined;
      height?: number | null | undefined;
      id?: string | undefined;
      length?: number | null | undefined;
      status?: WmsProductStatusEnum | null | undefined;
      supplierId?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
      volume?: number | null | undefined;
      weight?: number | null | undefined;
      width?: number | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.products',
    {
      barcode: string | null;
      clientId: string | null;
      costPrice: string | null;
      createdAt: Date | null;
      description: string | null;
      height: number | null;
      id: string;
      length: number | null;
      name: string;
      sku: string;
      status: WmsProductStatusEnum | null;
      supplierId: string | null;
      updatedAt: Date | null;
      volume: number | null;
      weight: number | null;
      width: number | null;
    }
  > {
    return this.db.insertInto('wms.products').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      barcode?: string | null | undefined;
      clientId?: string | null | undefined;
      costPrice?: string | number | null | undefined;
      createdAt?: string | Date | null | undefined;
      description?: string | null | undefined;
      height?: number | null | undefined;
      id?: string | undefined;
      length?: number | null | undefined;
      name?: string | undefined;
      sku?: string | undefined;
      status?: WmsProductStatusEnum | null | undefined;
      supplierId?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
      volume?: number | null | undefined;
      weight?: number | null | undefined;
      width?: number | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.products',
    'wms.products',
    {
      barcode: string | null;
      clientId: string | null;
      costPrice: string | null;
      createdAt: Date | null;
      description: string | null;
      height: number | null;
      id: string;
      length: number | null;
      name: string;
      sku: string;
      status: WmsProductStatusEnum | null;
      supplierId: string | null;
      updatedAt: Date | null;
      volume: number | null;
      weight: number | null;
      width: number | null;
    }
  > {
    return this.db
      .updateTable('wms.products')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.products', DeleteResult> {
    return this.db.deleteFrom('wms.products').where('id', '=', id);
  }
}

export class WmsProductRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.products'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.products', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.products')
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
      builder = builder.where('wms.products.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.products']>) {
    return this.db.insertInto('wms.products').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.products']>[]) {
    return this.db.insertInto('wms.products').values(values).returningAll();
  }

  update(
    id: DB['wms.products']['id']['__update__'],
    value: Updateable<DB['wms.products']>,
  ) {
    return this.db
      .updateTable('wms.products')
      .set(value)
      .where('wms.products.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.products']['id']['__update__']) {
    return this.db.deleteFrom('wms.products').where('wms.products.id', '=', id);
  }
}
