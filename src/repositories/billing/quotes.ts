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
import { BillingQuoteStatusEnum, DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class QuoteRepository implements GenericRepository<'billing.quotes'> {
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'billing.quotes'> | undefined,
    filter?: FilterConfig<'billing.quotes'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.quotes',
    {
      clientId: string | null;
      createdAt: Date | null;
      createdByUserId: string | null;
      destinationDetails: string;
      expiresAt: Date | null;
      height: string | null;
      id: string;
      length: string | null;
      notes: string | null;
      originDetails: string;
      quotedPrice: string;
      quoteNumber: string | null;
      serviceLevel: string | null;
      status: BillingQuoteStatusEnum | null;
      updatedAt: Date | null;
      volume: string | null;
      weight: string | null;
      width: string | null;
    }
  > {
    let query = this.db.selectFrom('billing.quotes').selectAll();

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
    sort?: SortConfig<'billing.quotes'> | undefined,
    filter?: FilterConfig<'billing.quotes'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'billing.quotes',
    {
      clientId: string | null;
      createdAt: Date | null;
      createdByUserId: string | null;
      destinationDetails: string;
      expiresAt: Date | null;
      height: string | null;
      id: string;
      length: string | null;
      notes: string | null;
      originDetails: string;
      quotedPrice: string;
      quoteNumber: string | null;
      serviceLevel: string | null;
      status: BillingQuoteStatusEnum | null;
      updatedAt: Date | null;
      volume: string | null;
      weight: string | null;
      width: string | null;
    }
  > {
    let query = this.db
      .selectFrom('billing.quotes')
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
    'billing.quotes',
    {
      clientId: string | null;
      createdAt: Date | null;
      createdByUserId: string | null;
      destinationDetails: string;
      expiresAt: Date | null;
      height: string | null;
      id: string;
      length: string | null;
      notes: string | null;
      originDetails: string;
      quotedPrice: string;
      quoteNumber: string | null;
      serviceLevel: string | null;
      status: BillingQuoteStatusEnum | null;
      updatedAt: Date | null;
      volume: string | null;
      weight: string | null;
      width: string | null;
    }
  > {
    return this.db
      .selectFrom('billing.quotes')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      destinationDetails: string;
      originDetails: string;
      quotedPrice: string | number;
    } & {
      clientId?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      createdByUserId?: string | null | undefined;
      expiresAt?: string | Date | null | undefined;
      height?: string | number | null | undefined;
      id?: string | undefined;
      length?: string | number | null | undefined;
      notes?: string | null | undefined;
      quoteNumber?: string | null | undefined;
      serviceLevel?: string | null | undefined;
      status?: BillingQuoteStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
      volume?: string | number | null | undefined;
      weight?: string | number | null | undefined;
      width?: string | number | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'billing.quotes',
    {
      clientId: string | null;
      createdAt: Date | null;
      createdByUserId: string | null;
      destinationDetails: string;
      expiresAt: Date | null;
      height: string | null;
      id: string;
      length: string | null;
      notes: string | null;
      originDetails: string;
      quotedPrice: string;
      quoteNumber: string | null;
      serviceLevel: string | null;
      status: BillingQuoteStatusEnum | null;
      updatedAt: Date | null;
      volume: string | null;
      weight: string | null;
      width: string | null;
    }
  > {
    return this.db.insertInto('billing.quotes').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      clientId?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      createdByUserId?: string | null | undefined;
      destinationDetails?: string | undefined;
      expiresAt?: string | Date | null | undefined;
      height?: string | number | null | undefined;
      id?: string | undefined;
      length?: string | number | null | undefined;
      notes?: string | null | undefined;
      originDetails?: string | undefined;
      quotedPrice?: string | number | undefined;
      quoteNumber?: string | null | undefined;
      serviceLevel?: string | null | undefined;
      status?: BillingQuoteStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
      volume?: string | number | null | undefined;
      weight?: string | number | null | undefined;
      width?: string | number | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'billing.quotes',
    'billing.quotes',
    {
      clientId: string | null;
      createdAt: Date | null;
      createdByUserId: string | null;
      destinationDetails: string;
      expiresAt: Date | null;
      height: string | null;
      id: string;
      length: string | null;
      notes: string | null;
      originDetails: string;
      quotedPrice: string;
      quoteNumber: string | null;
      serviceLevel: string | null;
      status: BillingQuoteStatusEnum | null;
      updatedAt: Date | null;
      volume: string | null;
      weight: string | null;
      width: string | null;
    }
  > {
    return this.db
      .updateTable('billing.quotes')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'billing.quotes', DeleteResult> {
    return this.db.deleteFrom('billing.quotes').where('id', '=', id);
  }
}

export class BillingQuoteRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.quotes'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.quotes', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.quotes')
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
      builder = builder.where('billing.quotes.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.quotes']>) {
    return this.db.insertInto('billing.quotes').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['billing.quotes']>[]) {
    return this.db.insertInto('billing.quotes').values(values).returningAll();
  }

  update(
    id: DB['billing.quotes']['id']['__update__'],
    value: Updateable<DB['billing.quotes']>,
  ) {
    return this.db
      .updateTable('billing.quotes')
      .set(value)
      .where('billing.quotes.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.quotes']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.quotes')
      .where('billing.quotes.id', '=', id);
  }
}
