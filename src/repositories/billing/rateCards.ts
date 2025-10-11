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
import { BillingServiceTypeEnum, DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class RateCardRepository
  implements GenericRepository<'billing.rateCards'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'billing.rateCards'> | undefined,
    filter?: FilterConfig<'billing.rateCards'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.rateCards',
    {
      createdAt: Date | null;
      createdByUserId: string | null;
      description: string | null;
      id: string;
      isActive: boolean | null;
      name: string;
      serviceType: BillingServiceTypeEnum;
      updatedAt: Date | null;
      validFrom: Date;
      validTo: Date | null;
    }
  > {
    let query = this.db.selectFrom('billing.rateCards').selectAll();

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
    sort?: SortConfig<'billing.rateCards'> | undefined,
    filter?: FilterConfig<'billing.rateCards'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.rateCards',
    {
      createdAt: Date | null;
      createdByUserId: string | null;
      description: string | null;
      id: string;
      isActive: boolean | null;
      name: string;
      serviceType: BillingServiceTypeEnum;
      updatedAt: Date | null;
      validFrom: Date;
      validTo: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('billing.rateCards')
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
    'billing.rateCards',
    {
      createdAt: Date | null;
      createdByUserId: string | null;
      description: string | null;
      id: string;
      isActive: boolean | null;
      name: string;
      serviceType: BillingServiceTypeEnum;
      updatedAt: Date | null;
      validFrom: Date;
      validTo: Date | null;
    }
  > {
    return this.db
      .selectFrom('billing.rateCards')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      name: string;
      serviceType: BillingServiceTypeEnum;
      validFrom: string | Date;
    } & {
      createdAt?: string | Date | null | undefined;
      createdByUserId?: string | null | undefined;
      description?: string | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      updatedAt?: string | Date | null | undefined;
      validTo?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'billing.rateCards',
    {
      createdAt: Date | null;
      createdByUserId: string | null;
      description: string | null;
      id: string;
      isActive: boolean | null;
      name: string;
      serviceType: BillingServiceTypeEnum;
      updatedAt: Date | null;
      validFrom: Date;
      validTo: Date | null;
    }
  > {
    return this.db.insertInto('billing.rateCards').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      createdByUserId?: string | null | undefined;
      description?: string | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      name?: string | undefined;
      serviceType?: BillingServiceTypeEnum | undefined;
      updatedAt?: string | Date | null | undefined;
      validFrom?: string | Date | undefined;
      validTo?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'billing.rateCards',
    'billing.rateCards',
    {
      createdAt: Date | null;
      createdByUserId: string | null;
      description: string | null;
      id: string;
      isActive: boolean | null;
      name: string;
      serviceType: BillingServiceTypeEnum;
      updatedAt: Date | null;
      validFrom: Date;
      validTo: Date | null;
    }
  > {
    return this.db
      .updateTable('billing.rateCards')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'billing.rateCards', DeleteResult> {
    return this.db.deleteFrom('billing.rateCards').where('id', '=', id);
  }
}

export class BillingRateCardRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.rateCards'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.rateCards', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.rateCards')
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
      builder = builder.where('billing.rateCards.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.rateCards']>) {
    return this.db.insertInto('billing.rateCards').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['billing.rateCards']>[]) {
    return this.db
      .insertInto('billing.rateCards')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.rateCards']['id']['__update__'],
    value: Updateable<DB['billing.rateCards']>,
  ) {
    return this.db
      .updateTable('billing.rateCards')
      .set(value)
      .where('billing.rateCards.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.rateCards']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.rateCards')
      .where('billing.rateCards.id', '=', id);
  }
}
