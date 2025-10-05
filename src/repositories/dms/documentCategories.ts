import {
  Insertable,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  Updateable,
} from 'kysely';
import { DB } from '@/db/types';

export class DmsDocumentCategoryRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'dms.documentCategories'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'dms.documentCategories', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('dms.documentCategories')
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
        'dms.documentCategories.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['dms.documentCategories']>) {
    return this.db
      .insertInto('dms.documentCategories')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['dms.documentCategories']>[]) {
    return this.db
      .insertInto('dms.documentCategories')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['dms.documentCategories']['id']['__update__'],
    value: Updateable<DB['dms.documentCategories']>,
  ) {
    return this.db
      .updateTable('dms.documentCategories')
      .set(value)
      .where('dms.documentCategories.id', '=', id)
      .returningAll();
  }

  delete(id: DB['dms.documentCategories']['id']['__update__']) {
    return this.db
      .deleteFrom('dms.documentCategories')
      .where('dms.documentCategories.id', '=', id);
  }
}
