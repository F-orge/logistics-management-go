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
import { CrmProductType, DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class ProductRepository implements GenericRepository<'crm.products'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.products'> | undefined,
    filter?: FilterConfig<'crm.products'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.products',
    {
      createdAt: Date | null;
      description: string | null;
      id: string;
      name: string;
      price: string;
      sku: string | null;
      type: CrmProductType | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('crm.products').selectAll();

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
    sort?: SortConfig<'crm.products'> | undefined,
    filter?: FilterConfig<'crm.products'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.products',
    {
      createdAt: Date | null;
      description: string | null;
      id: string;
      name: string;
      price: string;
      sku: string | null;
      type: CrmProductType | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('crm.products')
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
    'crm.products',
    {
      createdAt: Date | null;
      description: string | null;
      id: string;
      name: string;
      price: string;
      sku: string | null;
      type: CrmProductType | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('crm.products')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { name: string; price: string | number } & {
      createdAt?: string | Date | null | undefined;
      description?: string | null | undefined;
      id?: string | undefined;
      sku?: string | null | undefined;
      type?: CrmProductType | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'crm.products',
    {
      createdAt: Date | null;
      description: string | null;
      id: string;
      name: string;
      price: string;
      sku: string | null;
      type: CrmProductType | null;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('crm.products').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      description?: string | null | undefined;
      id?: string | undefined;
      name?: string | undefined;
      price?: string | number | undefined;
      sku?: string | null | undefined;
      type?: CrmProductType | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.products',
    'crm.products',
    {
      createdAt: Date | null;
      description: string | null;
      id: string;
      name: string;
      price: string;
      sku: string | null;
      type: CrmProductType | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('crm.products')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'crm.products', DeleteResult> {
    return this.db.deleteFrom('crm.products').where('id', '=', id);
  }
}

export class CrmProductRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.products'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.products', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.products')
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
      builder = builder.where('crm.products.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.products']>) {
    return this.db.insertInto('crm.products').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.products']>[]) {
    return this.db.insertInto('crm.products').values(values).returningAll();
  }

  update(
    id: DB['crm.products']['id']['__update__'],
    value: Updateable<DB['crm.products']>,
  ) {
    return this.db
      .updateTable('crm.products')
      .set(value)
      .where('crm.products.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.products']['id']['__update__']) {
    return this.db.deleteFrom('crm.products').where('crm.products.id', '=', id);
  }
}
