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
import { DB, WmsReturnStatusEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class ReturnRepository implements GenericRepository<'wms.returns'> {
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.returns'> | undefined,
    filter?: FilterConfig<'wms.returns'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.returns',
    {
      clientId: string;
      createdAt: Date | null;
      id: string;
      reason: string | null;
      returnNumber: string;
      salesOrderId: string | null;
      status: WmsReturnStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('wms.returns').selectAll();

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
    sort?: SortConfig<'wms.returns'> | undefined,
    filter?: FilterConfig<'wms.returns'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.returns',
    {
      clientId: string;
      createdAt: Date | null;
      id: string;
      reason: string | null;
      returnNumber: string;
      salesOrderId: string | null;
      status: WmsReturnStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('wms.returns')
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
    'wms.returns',
    {
      clientId: string;
      createdAt: Date | null;
      id: string;
      reason: string | null;
      returnNumber: string;
      salesOrderId: string | null;
      status: WmsReturnStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('wms.returns')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { clientId: string; returnNumber: string } & {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      reason?: string | null | undefined;
      salesOrderId?: string | null | undefined;
      status?: WmsReturnStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.returns',
    {
      clientId: string;
      createdAt: Date | null;
      id: string;
      reason: string | null;
      returnNumber: string;
      salesOrderId: string | null;
      status: WmsReturnStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('wms.returns').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      clientId?: string | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      reason?: string | null | undefined;
      returnNumber?: string | undefined;
      salesOrderId?: string | null | undefined;
      status?: WmsReturnStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.returns',
    'wms.returns',
    {
      clientId: string;
      createdAt: Date | null;
      id: string;
      reason: string | null;
      returnNumber: string;
      salesOrderId: string | null;
      status: WmsReturnStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('wms.returns')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.returns', DeleteResult> {
    return this.db.deleteFrom('wms.returns').where('id', '=', id);
  }
}

export class WmsReturnRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.returns'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.returns', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.returns')
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
      builder = builder.where('wms.returns.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.returns']>) {
    return this.db.insertInto('wms.returns').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.returns']>[]) {
    return this.db.insertInto('wms.returns').values(values).returningAll();
  }

  update(
    id: DB['wms.returns']['id']['__update__'],
    value: Updateable<DB['wms.returns']>,
  ) {
    return this.db
      .updateTable('wms.returns')
      .set(value)
      .where('wms.returns.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.returns']['id']['__update__']) {
    return this.db.deleteFrom('wms.returns').where('wms.returns.id', '=', id);
  }
}
