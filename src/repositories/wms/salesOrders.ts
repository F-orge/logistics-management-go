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
import { DB, WmsSalesOrderStatusEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class SalesOrderRepository
  implements GenericRepository<'wms.salesOrders'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'wms.salesOrders'> | undefined,
    filter?: FilterConfig<'wms.salesOrders'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.salesOrders',
    {
      clientId: string;
      createdAt: Date | null;
      crmOpportunityId: string | null;
      id: string;
      orderNumber: string;
      shippingAddress: string | null;
      status: WmsSalesOrderStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'wms.salesOrders'> | undefined,
    filter?: FilterConfig<'wms.salesOrders'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'wms.salesOrders',
    {
      clientId: string;
      createdAt: Date | null;
      crmOpportunityId: string | null;
      id: string;
      orderNumber: string;
      shippingAddress: string | null;
      status: WmsSalesOrderStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'wms.salesOrders',
    {
      clientId: string;
      createdAt: Date | null;
      crmOpportunityId: string | null;
      id: string;
      orderNumber: string;
      shippingAddress: string | null;
      status: WmsSalesOrderStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  create(
    value: { clientId: string; orderNumber: string } & {
      createdAt?: string | Date | null | undefined;
      crmOpportunityId?: string | null | undefined;
      id?: string | undefined;
      shippingAddress?: string | null | undefined;
      status?: WmsSalesOrderStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'wms.salesOrders',
    {
      clientId: string;
      createdAt: Date | null;
      crmOpportunityId: string | null;
      id: string;
      orderNumber: string;
      shippingAddress: string | null;
      status: WmsSalesOrderStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  update(
    id: string,
    value: {
      clientId?: string | undefined;
      createdAt?: string | Date | null | undefined;
      crmOpportunityId?: string | null | undefined;
      id?: string | undefined;
      orderNumber?: string | undefined;
      shippingAddress?: string | null | undefined;
      status?: WmsSalesOrderStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'wms.salesOrders',
    'wms.salesOrders',
    {
      clientId: string;
      createdAt: Date | null;
      crmOpportunityId: string | null;
      id: string;
      orderNumber: string;
      shippingAddress: string | null;
      status: WmsSalesOrderStatusEnum | null;
      updatedAt: Date | null;
    }
  > {
    throw new Error('Method not implemented.');
  }
  delete(id: string): DeleteQueryBuilder<DB, 'wms.salesOrders', DeleteResult> {
    throw new Error('Method not implemented.');
  }
}

export class WmsSalesOrderRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'wms.salesOrders'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'wms.salesOrders', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('wms.salesOrders')
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
      builder = builder.where('wms.salesOrders.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['wms.salesOrders']>) {
    return this.db.insertInto('wms.salesOrders').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['wms.salesOrders']>[]) {
    return this.db.insertInto('wms.salesOrders').values(values).returningAll();
  }

  update(
    id: DB['wms.salesOrders']['id']['__update__'],
    value: Updateable<DB['wms.salesOrders']>,
  ) {
    return this.db
      .updateTable('wms.salesOrders')
      .set(value)
      .where('wms.salesOrders.id', '=', id)
      .returningAll();
  }

  delete(id: DB['wms.salesOrders']['id']['__update__']) {
    return this.db
      .deleteFrom('wms.salesOrders')
      .where('wms.salesOrders.id', '=', id);
  }
}
