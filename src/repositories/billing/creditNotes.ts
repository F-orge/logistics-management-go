import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class BillingCreditNoteRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'billing.creditNotes'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'billing.creditNotes', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('billing.creditNotes')
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
      builder = builder.where('billing.creditNotes.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['billing.creditNotes']>) {
    return this.db
      .insertInto('billing.creditNotes')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['billing.creditNotes']>[]) {
    return this.db
      .insertInto('billing.creditNotes')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['billing.creditNotes']['id']['__update__'],
    value: Updateable<DB['billing.creditNotes']>,
  ) {
    return this.db
      .updateTable('billing.creditNotes')
      .set(value)
      .where('billing.creditNotes.id', '=', id)
      .returningAll();
  }

  delete(id: DB['billing.creditNotes']['id']['__update__']) {
    return this.db
      .deleteFrom('billing.creditNotes')
      .where('billing.creditNotes.id', '=', id);
  }
}
