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

export class CustomerTrackingLinkRepository
  implements GenericRepository<'dms.customerTrackingLinks'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'dms.customerTrackingLinks'> | undefined,
    filter?: FilterConfig<'dms.customerTrackingLinks'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'dms.customerTrackingLinks',
    {
      accessCount: number | null;
      createdAt: Date | null;
      deliveryTaskId: string;
      expiresAt: Date | null;
      id: string;
      isActive: boolean | null;
      lastAccessedAt: Date | null;
      trackingToken: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('dms.customerTrackingLinks').selectAll();

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
    sort?: SortConfig<'dms.customerTrackingLinks'> | undefined,
    filter?: FilterConfig<'dms.customerTrackingLinks'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'dms.customerTrackingLinks',
    {
      accessCount: number | null;
      createdAt: Date | null;
      deliveryTaskId: string;
      expiresAt: Date | null;
      id: string;
      isActive: boolean | null;
      lastAccessedAt: Date | null;
      trackingToken: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('dms.customerTrackingLinks')
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
    'dms.customerTrackingLinks',
    {
      accessCount: number | null;
      createdAt: Date | null;
      deliveryTaskId: string;
      expiresAt: Date | null;
      id: string;
      isActive: boolean | null;
      lastAccessedAt: Date | null;
      trackingToken: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('dms.customerTrackingLinks')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { deliveryTaskId: string; trackingToken: string } & {
      accessCount?: number | null | undefined;
      createdAt?: string | Date | null | undefined;
      expiresAt?: string | Date | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      lastAccessedAt?: string | Date | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'dms.customerTrackingLinks',
    {
      accessCount: number | null;
      createdAt: Date | null;
      deliveryTaskId: string;
      expiresAt: Date | null;
      id: string;
      isActive: boolean | null;
      lastAccessedAt: Date | null;
      trackingToken: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .insertInto('dms.customerTrackingLinks')
      .values(value)
      .returningAll();
  }
  update(
    id: string,
    value: {
      accessCount?: number | null | undefined;
      createdAt?: string | Date | null | undefined;
      deliveryTaskId?: string | undefined;
      expiresAt?: string | Date | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      lastAccessedAt?: string | Date | null | undefined;
      trackingToken?: string | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'dms.customerTrackingLinks',
    'dms.customerTrackingLinks',
    {
      accessCount: number | null;
      createdAt: Date | null;
      deliveryTaskId: string;
      expiresAt: Date | null;
      id: string;
      isActive: boolean | null;
      lastAccessedAt: Date | null;
      trackingToken: string;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'dms.customerTrackingLinks', DeleteResult> {
    throw new Error('Method not implemented.');
  }
}

export class DmsCustomerTrackingLinkRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.customerTrackingLinks'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.customerTrackingLinks', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.customerTrackingLinks')
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
        'dms.customerTrackingLinks.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['dms.customerTrackingLinks']>) {
    return this.db
      .insertInto('dms.customerTrackingLinks')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['dms.customerTrackingLinks']>[]) {
    return this.db
      .insertInto('dms.customerTrackingLinks')
      .values(values)
      .returningAll()
      .onConflict((oc) => oc.doNothing());
  }

  update(
    id: DB['dms.customerTrackingLinks']['id']['__update__'],
    value: Updateable<DB['dms.customerTrackingLinks']>,
  ) {
    return this.db
      .updateTable('dms.customerTrackingLinks')
      .set(value)
      .where('dms.customerTrackingLinks.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.customerTrackingLinks']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.customerTrackingLinks')
      .where('dms.customerTrackingLinks.id', '=', id);
  }
}
