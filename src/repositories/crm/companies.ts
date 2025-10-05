import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class CrmCompanyRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.companies'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.companies', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.companies')
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
      builder = builder.where('crm.companies.name', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.companies']>) {
    return this.db.insertInto('crm.companies').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.companies']>[]) {
    return this.db.insertInto('crm.companies').values(values).returningAll();
  }

  update(
    id: DB['crm.companies']['id']['__update__'],
    value: Updateable<DB['crm.companies']>,
  ) {
    return this.db
      .updateTable('crm.companies')
      .set(value)
      .where('crm.companies.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.companies']['id']['__update__']) {
    return this.db
      .deleteFrom('crm.companies')
      .where('crm.companies.id', '=', id);
  }
}
