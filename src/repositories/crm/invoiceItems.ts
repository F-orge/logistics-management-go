import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class CrmInvoiceItemRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.invoiceItems'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.invoiceItems', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.invoiceItems')
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
      builder = builder.where('crm.invoiceItems.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.invoiceItems']>) {
    return this.db.insertInto('crm.invoiceItems').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.invoiceItems']>[]) {
    return this.db.insertInto('crm.invoiceItems').values(values).returningAll();
  }

  update(
    id: DB['crm.invoiceItems']['id']['__update__'],
    value: Updateable<DB['crm.invoiceItems']>,
  ) {
    return this.db
      .updateTable('crm.invoiceItems')
      .set(value)
      .where('crm.invoiceItems.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.invoiceItems']['id']['__update__']) {
    return this.db
      .deleteFrom('crm.invoiceItems')
      .where('crm.invoiceItems.id', '=', id);
  }
}
