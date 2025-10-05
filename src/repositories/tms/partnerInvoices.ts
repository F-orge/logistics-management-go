import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

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
