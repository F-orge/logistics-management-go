import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class BillingInvoiceLineItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.invoiceLineItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.invoiceLineItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.invoiceLineItems')
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
        'billing.invoiceLineItems.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['billing.invoiceLineItems']>) {
    return this.db
      .insertInto('billing.invoiceLineItems')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['billing.invoiceLineItems']>[]) {
    return this.db
      .insertInto('billing.invoiceLineItems')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.invoiceLineItems']['id']['__update__'],
    value: Updateable<DB['billing.invoiceLineItems']>,
  ) {
    return this.db
      .updateTable('billing.invoiceLineItems')
      .set(value)
      .where('billing.invoiceLineItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.invoiceLineItems']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.invoiceLineItems')
      .where('billing.invoiceLineItems.id', '=', id);
  }
}
