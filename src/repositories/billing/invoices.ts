import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class BillingInvoiceRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.invoices'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.invoices', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.invoices')
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
      builder = builder.where('billing.invoices.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.invoices']>) {
    return this.db.insertInto('billing.invoices').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['billing.invoices']>[]) {
    return this.db.insertInto('billing.invoices').values(values).returningAll();
  }

  update(
    id: DB['billing.invoices']['id']['__update__'],
    value: Updateable<DB['billing.invoices']>,
  ) {
    return this.db
      .updateTable('billing.invoices')
      .set(value)
      .where('billing.invoices.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.invoices']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.invoices')
      .where('billing.invoices.id', '=', id);
  }
}
