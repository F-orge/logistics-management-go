import type {
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
} from 'kysely'
import type { DB, TmsCurrencyEnum, TmsExpenseStatusEnum, TmsExpenseTypeEnum } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class ExpenseRepository implements GenericRepository<'tms.expenses'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.expenses'> | undefined,
    filter?: FilterConfig<'tms.expenses'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.expenses',
    {
      amount: string
      createdAt: Date | null
      currency: TmsCurrencyEnum | null
      driverId: string | null
      fuelQuantity: number | null
      id: string
      odometerReading: number | null
      receiptUrl: string | null
      status: TmsExpenseStatusEnum | null
      tripId: string | null
      type: TmsExpenseTypeEnum | null
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('tms.expenses').selectAll()

    if (limit) query = query.limit(limit)

    if (page && limit) query = query.offset((page - 1) * limit)

    for (const sortCol of sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order)
    }

    for (const filterCol of filter || []) {
      query = query.where(filterCol.column, filterCol.operation, filterCol.value)
    }

    return query
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'tms.expenses'> | undefined,
    filter?: FilterConfig<'tms.expenses'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.expenses',
    {
      amount: string
      createdAt: Date | null
      currency: TmsCurrencyEnum | null
      driverId: string | null
      fuelQuantity: number | null
      id: string
      odometerReading: number | null
      receiptUrl: string | null
      status: TmsExpenseStatusEnum | null
      tripId: string | null
      type: TmsExpenseTypeEnum | null
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('tms.expenses')
      .selectAll()
      .where('createdAt', '>=', from)
      .where('createdAt', '<=', to)

    for (const sortCol of sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order)
    }

    for (const filterCol of filter || []) {
      query = query.where(filterCol.column, filterCol.operation, filterCol.value)
    }

    return query
  }
  in(values: string[]): SelectQueryBuilder<
    DB,
    'tms.expenses',
    {
      amount: string
      createdAt: Date | null
      currency: TmsCurrencyEnum | null
      driverId: string | null
      fuelQuantity: number | null
      id: string
      odometerReading: number | null
      receiptUrl: string | null
      status: TmsExpenseStatusEnum | null
      tripId: string | null
      type: TmsExpenseTypeEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('tms.expenses').selectAll().where('id', 'in', values)
  }
  create(
    value: { amount: string | number } & {
      createdAt?: string | Date | null | undefined
      currency?: TmsCurrencyEnum | null | undefined
      driverId?: string | null | undefined
      fuelQuantity?: number | null | undefined
      id?: string | undefined
      odometerReading?: number | null | undefined
      receiptUrl?: string | null | undefined
      status?: TmsExpenseStatusEnum | null | undefined
      tripId?: string | null | undefined
      type?: TmsExpenseTypeEnum | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'tms.expenses',
    {
      amount: string
      createdAt: Date | null
      currency: TmsCurrencyEnum | null
      driverId: string | null
      fuelQuantity: number | null
      id: string
      odometerReading: number | null
      receiptUrl: string | null
      status: TmsExpenseStatusEnum | null
      tripId: string | null
      type: TmsExpenseTypeEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('tms.expenses').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      amount?: string | number | undefined
      createdAt?: string | Date | null | undefined
      currency?: TmsCurrencyEnum | null | undefined
      driverId?: string | null | undefined
      fuelQuantity?: number | null | undefined
      id?: string | undefined
      odometerReading?: number | null | undefined
      receiptUrl?: string | null | undefined
      status?: TmsExpenseStatusEnum | null | undefined
      tripId?: string | null | undefined
      type?: TmsExpenseTypeEnum | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.expenses',
    'tms.expenses',
    {
      amount: string
      createdAt: Date | null
      currency: TmsCurrencyEnum | null
      driverId: string | null
      fuelQuantity: number | null
      id: string
      odometerReading: number | null
      receiptUrl: string | null
      status: TmsExpenseStatusEnum | null
      tripId: string | null
      type: TmsExpenseTypeEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('tms.expenses').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'tms.expenses', DeleteResult> {
    return this.db.deleteFrom('tms.expenses').where('id', '=', id)
  }
}

export class TmsExpenseRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.expenses'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.expenses', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.expenses')
      .limit(perPage)
      .offset((page - 1) * perPage)

    if (fields) {
      builder = builder.select(fields)
    } else {
      builder = builder.selectAll()
    }

    // sort
    for (const field of sort || []) {
      builder = builder.orderBy(field.field, field.order)
    }

    if (search) builder = builder.where('tms.expenses.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['tms.expenses']>) {
    return this.db.insertInto('tms.expenses').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['tms.expenses']>[]) {
    return this.db.insertInto('tms.expenses').values(values).returningAll()
  }

  update(id: DB['tms.expenses']['id']['__update__'], value: Updateable<DB['tms.expenses']>) {
    return this.db
      .updateTable('tms.expenses')
      .set(value)
      .where('tms.expenses.id', '=', id)
      .returningAll()
  }

  delete(id: DB['tms.expenses']['id']['__update__']) {
    return this.db.deleteFrom('tms.expenses').where('tms.expenses.id', '=', id)
  }
}
