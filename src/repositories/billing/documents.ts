import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class BillingDocumentRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.documents'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.documents', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.documents')
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
      builder = builder.where('billing.documents.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.documents']>) {
    return this.db.insertInto('billing.documents').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['billing.documents']>[]) {
    return this.db
      .insertInto('billing.documents')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.documents']['id']['__update__'],
    value: Updateable<DB['billing.documents']>,
  ) {
    return this.db
      .updateTable('billing.documents')
      .set(value)
      .where('billing.documents.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.documents']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.documents')
      .where('billing.documents.id', '=', id);
  }
}
