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
import { DB, TmsPartnerInvoiceStatusEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class PartnerInvoiceRepository
  implements GenericRepository<'tms.partnerInvoices'>
{
  constructor(private db: Kysely<DB>) {}
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.partnerInvoices'> | undefined,
    filter?: FilterConfig<'tms.partnerInvoices'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.partnerInvoices',
    {
      carrierId: string;
      createdAt: Date | null;
      id: string;
      invoiceDate: Date;
      invoiceNumber: string;
      status: TmsPartnerInvoiceStatusEnum | null;
      totalAmount: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('tms.partnerInvoices').selectAll();

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
    sort?: SortConfig<'tms.partnerInvoices'> | undefined,
    filter?: FilterConfig<'tms.partnerInvoices'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.partnerInvoices',
    {
      carrierId: string;
      createdAt: Date | null;
      id: string;
      invoiceDate: Date;
      invoiceNumber: string;
      status: TmsPartnerInvoiceStatusEnum | null;
      totalAmount: string;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('tms.partnerInvoices')
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
    'tms.partnerInvoices',
    {
      carrierId: string;
      createdAt: Date | null;
      id: string;
      invoiceDate: Date;
      invoiceNumber: string;
      status: TmsPartnerInvoiceStatusEnum | null;
      totalAmount: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('tms.partnerInvoices')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: {
      carrierId: string;
      invoiceDate: string | Date;
      invoiceNumber: string;
      totalAmount: string | number;
    } & {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      status?: TmsPartnerInvoiceStatusEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'tms.partnerInvoices',
    {
      carrierId: string;
      createdAt: Date | null;
      id: string;
      invoiceDate: Date;
      invoiceNumber: string;
      status: TmsPartnerInvoiceStatusEnum | null;
      totalAmount: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .insertInto('tms.partnerInvoices')
      .values(value)
      .returningAll();
  }
  update(
    id: string,
    value: {
      carrierId?: string | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      invoiceDate?: string | Date | undefined;
      invoiceNumber?: string | undefined;
      status?: TmsPartnerInvoiceStatusEnum | null | undefined;
      totalAmount?: string | number | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.partnerInvoices',
    'tms.partnerInvoices',
    {
      carrierId: string;
      createdAt: Date | null;
      id: string;
      invoiceDate: Date;
      invoiceNumber: string;
      status: TmsPartnerInvoiceStatusEnum | null;
      totalAmount: string;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('tms.partnerInvoices')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'tms.partnerInvoices', DeleteResult> {
    return this.db.deleteFrom('tms.partnerInvoices').where('id', '=', id);
  }
}

export class TmsPartnerInvoiceRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.partnerInvoices'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.partnerInvoices', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.partnerInvoices')
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
      builder = builder.where('tms.partnerInvoices.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.partnerInvoices']>) {
    return this.db
      .insertInto('tms.partnerInvoices')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['tms.partnerInvoices']>[]) {
    return this.db
      .insertInto('tms.partnerInvoices')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['tms.partnerInvoices']['id']['__update__'],
    value: Updateable<DB['tms.partnerInvoices']>,
  ) {
    return this.db
      .updateTable('tms.partnerInvoices')
      .set(value)
      .where('tms.partnerInvoices.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.partnerInvoices']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.partnerInvoices')
      .where('tms.partnerInvoices.id', '=', id);
  }
}
