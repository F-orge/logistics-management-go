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
import { BillingSurchargeCalculationMethodEnum, DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class SurchargeRepository
  implements GenericRepository<'billing.surcharges'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'billing.surcharges'> | undefined,
    filter?: FilterConfig<'billing.surcharges'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.surcharges',
    {
      amount: string;
      calculationMethod: BillingSurchargeCalculationMethodEnum;
      createdAt: Date | null;
      description: string | null;
      id: string;
      isActive: boolean | null;
      name: string;
      type: string;
      updatedAt: Date | null;
      validFrom: Date | null;
      validTo: Date | null;
    }
  > {
    let query = this.db.selectFrom('billing.surcharges').selectAll();

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
    sort?: SortConfig<'billing.surcharges'> | undefined,
    filter?: FilterConfig<'billing.surcharges'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.surcharges',
    {
      amount: string;
      calculationMethod: BillingSurchargeCalculationMethodEnum;
      createdAt: Date | null;
      description: string | null;
      id: string;
      isActive: boolean | null;
      name: string;
      type: string;
      updatedAt: Date | null;
      validFrom: Date | null;
      validTo: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('billing.surcharges')
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
    'billing.surcharges',
    {
      amount: string;
      calculationMethod: BillingSurchargeCalculationMethodEnum;
      createdAt: Date | null;
      description: string | null;
      id: string;
      isActive: boolean | null;
      name: string;
      type: string;
      updatedAt: Date | null;
      validFrom: Date | null;
      validTo: Date | null;
    }
  > {
    return this.db
      .selectFrom('billing.surcharges')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      amount: string | number;
      calculationMethod: BillingSurchargeCalculationMethodEnum;
      name: string;
      type: string;
    } & {
      createdAt?: string | Date | null | undefined;
      description?: string | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      updatedAt?: string | Date | null | undefined;
      validFrom?: string | Date | null | undefined;
      validTo?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'billing.surcharges',
    {
      amount: string;
      calculationMethod: BillingSurchargeCalculationMethodEnum;
      createdAt: Date | null;
      description: string | null;
      id: string;
      isActive: boolean | null;
      name: string;
      type: string;
      updatedAt: Date | null;
      validFrom: Date | null;
      validTo: Date | null;
    }
  > {
    return this.db
      .insertInto('billing.surcharges')
      .values(value)
      .returningAll();
  }
  update(
    id: string,
    value: {
      amount?: string | number | undefined;
      calculationMethod?: BillingSurchargeCalculationMethodEnum | undefined;
      createdAt?: string | Date | null | undefined;
      description?: string | null | undefined;
      id?: string | undefined;
      isActive?: boolean | null | undefined;
      name?: string | undefined;
      type?: string | undefined;
      updatedAt?: string | Date | null | undefined;
      validFrom?: string | Date | null | undefined;
      validTo?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'billing.surcharges',
    'billing.surcharges',
    {
      amount: string;
      calculationMethod: BillingSurchargeCalculationMethodEnum;
      createdAt: Date | null;
      description: string | null;
      id: string;
      isActive: boolean | null;
      name: string;
      type: string;
      updatedAt: Date | null;
      validFrom: Date | null;
      validTo: Date | null;
    }
  > {
    return this.db
      .updateTable('billing.surcharges')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'billing.surcharges', DeleteResult> {
    return this.db.deleteFrom('billing.surcharges').where('id', '=', id);
  }
}

export class BillingSurchargeRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.surcharges'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.surcharges', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.surcharges')
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
      builder = builder.where('billing.surcharges.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.surcharges']>) {
    return this.db
      .insertInto('billing.surcharges')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['billing.surcharges']>[]) {
    return this.db
      .insertInto('billing.surcharges')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.surcharges']['id']['__update__'],
    value: Updateable<DB['billing.surcharges']>,
  ) {
    return this.db
      .updateTable('billing.surcharges')
      .set(value)
      .where('billing.surcharges.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.surcharges']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.surcharges')
      .where('billing.surcharges.id', '=', id);
  }
}
