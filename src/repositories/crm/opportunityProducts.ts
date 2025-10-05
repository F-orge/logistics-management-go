import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class CrmOpportunityProductRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.opportunityProducts'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.opportunityProducts', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.opportunityProducts')
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
        'crm.opportunityProducts.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['crm.opportunityProducts']>) {
    return this.db
      .insertInto('crm.opportunityProducts')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['crm.opportunityProducts']>[]) {
    return this.db
      .insertInto('crm.opportunityProducts')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['crm.opportunityProducts']['id']['__update__'],
    value: Updateable<DB['crm.opportunityProducts']>,
  ) {
    return this.db
      .updateTable('crm.opportunityProducts')
      .set(value)
      .where('crm.opportunityProducts.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.opportunityProducts']['id']['__update__']) {
    return this.db
      .deleteFrom('crm.opportunityProducts')
      .where('crm.opportunityProducts.id', '=', id);
  }
}
