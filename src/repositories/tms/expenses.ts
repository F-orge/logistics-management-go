import { DB } from '@/db/types';
import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';

export class TmsExpenseRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.expenses'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.expenses', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.expenses')
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
      builder = builder.where('tms.expenses.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['tms.expenses']>) {
    return this.db.insertInto('tms.expenses').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['tms.expenses']>[]) {
    return this.db.insertInto('tms.expenses').values(values).returningAll();
  }

  update(
    id: DB['tms.expenses']['id']['__update__'],
    value: Updateable<DB['tms.expenses']>,
  ) {
    return this.db
      .updateTable('tms.expenses')
      .set(value)
      .where('tms.expenses.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.expenses']['id']['__update__']) {
    return this.db.deleteFrom('tms.expenses').where('tms.expenses.id', '=', id);
  }
}
