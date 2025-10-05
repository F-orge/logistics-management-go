import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class CrmCaseRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.cases'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.cases', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.cases')
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

    if (search) builder = builder.where('crm.cases.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.cases']>) {
    return this.db.insertInto('crm.cases').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.cases']>[]) {
    return this.db.insertInto('crm.cases').values(values).returningAll();
  }

  update(
    id: DB['crm.cases']['id']['__update__'],
    value: Updateable<DB['crm.cases']>,
  ) {
    return this.db
      .updateTable('crm.cases')
      .set(value)
      .where('crm.cases.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.cases']['id']['__update__']) {
    return this.db.deleteFrom('crm.cases').where('crm.cases.id', '=', id);
  }
}
