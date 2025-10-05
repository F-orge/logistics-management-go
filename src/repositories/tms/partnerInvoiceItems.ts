import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class TmsPartnerInvoiceItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.partnerInvoiceItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.partnerInvoiceItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.partnerInvoiceItems')
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
        'tms.partnerInvoiceItems.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['tms.partnerInvoiceItems']>) {
    return this.db
      .insertInto('tms.partnerInvoiceItems')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['tms.partnerInvoiceItems']>[]) {
    return this.db
      .insertInto('tms.partnerInvoiceItems')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['tms.partnerInvoiceItems']['id']['__update__'],
    value: Updateable<DB['tms.partnerInvoiceItems']>,
  ) {
    return this.db
      .updateTable('tms.partnerInvoiceItems')
      .set(value)
      .where('tms.partnerInvoiceItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.partnerInvoiceItems']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.partnerInvoiceItems')
      .where('tms.partnerInvoiceItems.id', '=', id);
  }
}
