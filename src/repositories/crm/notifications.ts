import {
  DeleteQueryBuilder,
  DeleteResult,
  Insertable,
  InsertQueryBuilder,
  Kysely,
  OrderByExpression,
  OrderByModifiers,
  SelectExpression,
  SelectQueryBuilder,
  Updateable,
  UpdateQueryBuilder,
} from 'kysely';
import { DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class NotificationRepositry
  implements GenericRepository<'crm.notifications'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.notifications'> | undefined,
    filter?: FilterConfig<'crm.notifications'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.notifications',
    {
      createdAt: Date | null;
      id: string;
      isRead: boolean | null;
      link: string | null;
      message: string;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    let query = this.db.selectFrom('crm.notifications').selectAll();

    if (limit) query = query.limit(limit);

    if (page && limit) query = query.offset((page - 1) * limit);

    for (const sortCol of sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order);
    }

    for (const filterCol of filter || []) {
      query = query.where(
        filterCol.column,
        filterCol.operation,
        filterCol.value,
      );
    }

    return query;
  }
  range(
    from: Date,
    to: Date,
    sort?: SortConfig<'crm.notifications'> | undefined,
    filter?: FilterConfig<'crm.notifications'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.notifications',
    {
      createdAt: Date | null;
      id: string;
      isRead: boolean | null;
      link: string | null;
      message: string;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    let query = this.db
      .selectFrom('crm.notifications')
      .selectAll()
      .where('createdAt', '>=', from)
      .where('createdAt', '<=', to);

    for (const sortCol of sort || []) {
      query = query.orderBy(sortCol.column, sortCol.order);
    }

    for (const filterCol of filter || []) {
      query = query.where(
        filterCol.column,
        filterCol.operation,
        filterCol.value,
      );
    }

    return query;
  }
  in(
    values: string[],
  ): SelectQueryBuilder<
    DB,
    'crm.notifications',
    {
      createdAt: Date | null;
      id: string;
      isRead: boolean | null;
      link: string | null;
      message: string;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    return this.db
      .selectFrom('crm.notifications')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { message: string; userId: string } & {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      isRead?: boolean | null | undefined;
      link?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'crm.notifications',
    {
      createdAt: Date | null;
      id: string;
      isRead: boolean | null;
      link: string | null;
      message: string;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    return this.db.insertInto('crm.notifications').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      isRead?: boolean | null | undefined;
      link?: string | null | undefined;
      message?: string | undefined;
      updatedAt?: string | Date | null | undefined;
      userId?: string | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.notifications',
    'crm.notifications',
    {
      createdAt: Date | null;
      id: string;
      isRead: boolean | null;
      link: string | null;
      message: string;
      updatedAt: Date | null;
      userId: string;
    }
  > {
    return this.db
      .updateTable('crm.notifications')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'crm.notifications', DeleteResult> {
    return this.db.deleteFrom('crm.notifications').where('id', '=', id);
  }
}

export class CrmNotificationRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.notifications'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.notifications', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.notifications')
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
      builder = builder.where('crm.notifications.id', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.notifications']>) {
    return this.db.insertInto('crm.notifications').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.notifications']>[]) {
    return this.db
      .insertInto('crm.notifications')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['crm.notifications']['id']['__update__'],
    value: Updateable<DB['crm.notifications']>,
  ) {
    return this.db
      .updateTable('crm.notifications')
      .set(value)
      .where('crm.notifications.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.notifications']['id']['__update__']) {
    return this.db
      .deleteFrom('crm.notifications')
      .where('crm.notifications.id', '=', id);
  }
}
