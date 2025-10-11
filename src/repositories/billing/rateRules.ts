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
import { BillingPricingModelEnum, DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class RateRuleRepository
  implements GenericRepository<'billing.rateRules'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'billing.rateRules'> | undefined,
    filter?: FilterConfig<'billing.rateRules'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.rateRules',
    {
      condition: string;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      maxValue: string | null;
      minValue: string | null;
      price: string;
      pricingModel: BillingPricingModelEnum;
      priority: number | null;
      rateCardId: string;
      updatedAt: Date | null;
      value: string;
    }
  > {
    let query = this.db.selectFrom('billing.rateRules').selectAll();

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
    sort?: SortConfig<'billing.rateRules'> | undefined,
    filter?: FilterConfig<'billing.rateRules'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.rateRules',
    {
      condition: string;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      maxValue: string | null;
      minValue: string | null;
      price: string;
      pricingModel: BillingPricingModelEnum;
      priority: number | null;
      rateCardId: string;
      updatedAt: Date | null;
      value: string;
    }
  > {
    let query = this.db
      .selectFrom('billing.rateRules')
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
    'billing.rateRules',
    {
      condition: string;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      maxValue: string | null;
      minValue: string | null;
      price: string;
      pricingModel: BillingPricingModelEnum;
      priority: number | null;
      rateCardId: string;
      updatedAt: Date | null;
      value: string;
    }
  > {
    return this.db
      .selectFrom('billing.rateRules')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      condition: string;
      price: string | number;
      pricingModel: BillingPricingModelEnum;
      rateCardId: string;
      value: string;
    } & {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      maxValue?: string | number | null | undefined;
      minValue?: string | number | null | undefined;
      priority?: number | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'billing.rateRules',
    {
      condition: string;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      maxValue: string | null;
      minValue: string | null;
      price: string;
      pricingModel: BillingPricingModelEnum;
      priority: number | null;
      rateCardId: string;
      updatedAt: Date | null;
      value: string;
    }
  > {
    return this.db.insertInto('billing.rateRules').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      condition?: string | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      maxValue?: string | number | null | undefined;
      minValue?: string | number | null | undefined;
      price?: string | number | undefined;
      pricingModel?: BillingPricingModelEnum | undefined;
      priority?: number | null | undefined;
      rateCardId?: string | undefined;
      updatedAt?: string | Date | null | undefined;
      value?: string | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'billing.rateRules',
    'billing.rateRules',
    {
      condition: string;
      createdAt: Date | null;
      id: string;
      isActive: boolean | null;
      maxValue: string | null;
      minValue: string | null;
      price: string;
      pricingModel: BillingPricingModelEnum;
      priority: number | null;
      rateCardId: string;
      updatedAt: Date | null;
      value: string;
    }
  > {
    return this.db
      .updateTable('billing.rateRules')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'billing.rateRules', DeleteResult> {
    return this.db.deleteFrom('billing.rateRules').where('id', '=', id);
  }
}

export class BillingRateRuleRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.rateRules'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.rateRules', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.rateRules')
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
      builder = builder.where('billing.rateRules.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.rateRules']>) {
    return this.db.insertInto('billing.rateRules').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['billing.rateRules']>[]) {
    return this.db
      .insertInto('billing.rateRules')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.rateRules']['id']['__update__'],
    value: Updateable<DB['billing.rateRules']>,
  ) {
    return this.db
      .updateTable('billing.rateRules')
      .set(value)
      .where('billing.rateRules.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.rateRules']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.rateRules')
      .where('billing.rateRules.id', '=', id);
  }
}
