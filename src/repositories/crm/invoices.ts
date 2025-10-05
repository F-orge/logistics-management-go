import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class CrmInvoiceRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.invoices'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.invoices', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.invoices')
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
      builder = builder.where('crm.invoices.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.invoices']>) {
    return this.db.insertInto('crm.invoices').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.invoices']>[]) {
    return this.db.insertInto('crm.invoices').values(values).returningAll();
  }

  update(
    id: DB['crm.invoices']['id']['__update__'],
    value: Updateable<DB['crm.invoices']>,
  ) {
    return this.db
      .updateTable('crm.invoices')
      .set(value)
      .where('crm.invoices.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.invoices']['id']['__update__']) {
    return this.db.deleteFrom('crm.invoices').where('crm.invoices.id', '=', id);
  }
}
