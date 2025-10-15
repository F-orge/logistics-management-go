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
import type { DB, DmsDeliveryFailureReasonEnum, DmsDeliveryTaskStatusEnum } from '@/db/types'
import type { FilterConfig, GenericRepository, SortConfig } from '../interface'

export class DeliveryTaskRepository implements GenericRepository<'dms.deliveryTasks'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'dms.deliveryTasks'> | undefined,
    filter?: FilterConfig<'dms.deliveryTasks'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'dms.deliveryTasks',
    {
      actualArrivalTime: Date | null
      attemptCount: number | null
      createdAt: Date | null
      deliveryAddress: string
      deliveryInstructions: string | null
      deliveryRouteId: string
      deliveryTime: Date | null
      estimatedArrivalTime: Date | null
      failureReason: DmsDeliveryFailureReasonEnum | null
      id: string
      packageId: string
      recipientName: string | null
      recipientPhone: string | null
      routeSequence: number
      status: DmsDeliveryTaskStatusEnum | null
      updatedAt: Date | null
    }
  > {
    let query = this.db.selectFrom('dms.deliveryTasks').selectAll()

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
    sort?: SortConfig<'dms.deliveryTasks'> | undefined,
    filter?: FilterConfig<'dms.deliveryTasks'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'dms.deliveryTasks',
    {
      actualArrivalTime: Date | null
      attemptCount: number | null
      createdAt: Date | null
      deliveryAddress: string
      deliveryInstructions: string | null
      deliveryRouteId: string
      deliveryTime: Date | null
      estimatedArrivalTime: Date | null
      failureReason: DmsDeliveryFailureReasonEnum | null
      id: string
      packageId: string
      recipientName: string | null
      recipientPhone: string | null
      routeSequence: number
      status: DmsDeliveryTaskStatusEnum | null
      updatedAt: Date | null
    }
  > {
    let query = this.db
      .selectFrom('dms.deliveryTasks')
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
    'dms.deliveryTasks',
    {
      actualArrivalTime: Date | null
      attemptCount: number | null
      createdAt: Date | null
      deliveryAddress: string
      deliveryInstructions: string | null
      deliveryRouteId: string
      deliveryTime: Date | null
      estimatedArrivalTime: Date | null
      failureReason: DmsDeliveryFailureReasonEnum | null
      id: string
      packageId: string
      recipientName: string | null
      recipientPhone: string | null
      routeSequence: number
      status: DmsDeliveryTaskStatusEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.selectFrom('dms.deliveryTasks').selectAll().where('id', 'in', values)
  }
  create(
    value: {
      deliveryAddress: string
      deliveryRouteId: string
      packageId: string
      routeSequence: number
    } & {
      actualArrivalTime?: string | Date | null | undefined
      attemptCount?: number | null | undefined
      createdAt?: string | Date | null | undefined
      deliveryInstructions?: string | null | undefined
      deliveryTime?: string | Date | null | undefined
      estimatedArrivalTime?: string | Date | null | undefined
      failureReason?: DmsDeliveryFailureReasonEnum | null | undefined
      id?: string | undefined
      recipientName?: string | null | undefined
      recipientPhone?: string | null | undefined
      status?: DmsDeliveryTaskStatusEnum | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): InsertQueryBuilder<
    DB,
    'dms.deliveryTasks',
    {
      actualArrivalTime: Date | null
      attemptCount: number | null
      createdAt: Date | null
      deliveryAddress: string
      deliveryInstructions: string | null
      deliveryRouteId: string
      deliveryTime: Date | null
      estimatedArrivalTime: Date | null
      failureReason: DmsDeliveryFailureReasonEnum | null
      id: string
      packageId: string
      recipientName: string | null
      recipientPhone: string | null
      routeSequence: number
      status: DmsDeliveryTaskStatusEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.insertInto('dms.deliveryTasks').values(value).returningAll()
  }
  update(
    id: string,
    value: {
      actualArrivalTime?: string | Date | null | undefined
      attemptCount?: number | null | undefined
      createdAt?: string | Date | null | undefined
      deliveryAddress?: string | undefined
      deliveryInstructions?: string | null | undefined
      deliveryRouteId?: string | undefined
      deliveryTime?: string | Date | null | undefined
      estimatedArrivalTime?: string | Date | null | undefined
      failureReason?: DmsDeliveryFailureReasonEnum | null | undefined
      id?: string | undefined
      packageId?: string | undefined
      recipientName?: string | null | undefined
      recipientPhone?: string | null | undefined
      routeSequence?: number | undefined
      status?: DmsDeliveryTaskStatusEnum | null | undefined
      updatedAt?: string | Date | null | undefined
    },
  ): UpdateQueryBuilder<
    DB,
    'dms.deliveryTasks',
    'dms.deliveryTasks',
    {
      actualArrivalTime: Date | null
      attemptCount: number | null
      createdAt: Date | null
      deliveryAddress: string
      deliveryInstructions: string | null
      deliveryRouteId: string
      deliveryTime: Date | null
      estimatedArrivalTime: Date | null
      failureReason: DmsDeliveryFailureReasonEnum | null
      id: string
      packageId: string
      recipientName: string | null
      recipientPhone: string | null
      routeSequence: number
      status: DmsDeliveryTaskStatusEnum | null
      updatedAt: Date | null
    }
  > {
    return this.db.updateTable('dms.deliveryTasks').set(value).where('id', '=', id).returningAll()
  }
  delete(id: string): DeleteQueryBuilder<DB, 'dms.deliveryTasks', DeleteResult> {
    return this.db.deleteFrom('dms.deliveryTasks').where('id', '=', id)
  }
}

export class DmsDeliveryTaskRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.deliveryTasks'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.deliveryTasks', {}>
      order: OrderByModifiers
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.deliveryTasks')
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

    if (search) builder = builder.where('dms.deliveryTasks.id', 'like', `%${search}%`)

    return builder
  }

  create(value: Insertable<DB['dms.deliveryTasks']>) {
    return this.db.insertInto('dms.deliveryTasks').values(value).returningAll()
  }

  batchCreate(values: Insertable<DB['dms.deliveryTasks']>[]) {
    return this.db.insertInto('dms.deliveryTasks').values(values).returningAll()
  }

  update(
    id: DB['dms.deliveryTasks']['id']['__update__'],
    value: Updateable<DB['dms.deliveryTasks']>,
  ) {
    return this.db
      .updateTable('dms.deliveryTasks')
      .set(value)
      .where('dms.deliveryTasks.id', '=', id)
      .returningAll()
  }

  delete(id: DB['dms.deliveryTasks']['id']['__update__']) {
    return this.db.deleteFrom('dms.deliveryTasks').where('dms.deliveryTasks.id', '=', id)
  }
}
