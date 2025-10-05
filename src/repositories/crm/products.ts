import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class CrmProductRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.products'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.products', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.products')
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
      builder = builder.where('crm.products.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.products']>) {
    return this.db.insertInto('crm.products').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.products']>[]) {
    return this.db.insertInto('crm.products').values(values).returningAll();
  }

  update(
    id: DB['crm.products']['id']['__update__'],
    value: Updateable<DB['crm.products']>,
  ) {
    return this.db
      .updateTable('crm.products')
      .set(value)
      .where('crm.products.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.products']['id']['__update__']) {
    return this.db.deleteFrom('crm.products').where('crm.products.id', '=', id);
  }
}
