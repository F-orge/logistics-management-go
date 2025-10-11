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

export class ContactRepository implements GenericRepository<'crm.contacts'> {
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.contacts'> | undefined,
    filter?: FilterConfig<'crm.contacts'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.contacts',
    {
      companyId: string | null;
      createdAt: Date | null;
      email: string;
      id: string;
      jobTitle: string | null;
      name: string;
      ownerId: string;
      phoneNumber: string | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db.selectFrom('crm.contacts').selectAll();

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
    sort?: SortConfig<'crm.contacts'> | undefined,
    filter?: FilterConfig<'crm.contacts'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.contacts',
    {
      companyId: string | null;
      createdAt: Date | null;
      email: string;
      id: string;
      jobTitle: string | null;
      name: string;
      ownerId: string;
      phoneNumber: string | null;
      updatedAt: Date | null;
    }
  > {
    let query = this.db
      .selectFrom('crm.contacts')
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
  in(values: string[]): SelectQueryBuilder<
    DB,
    'crm.contacts',
    {
      companyId: string | null;
      createdAt: Date | null;
      email: string;
      id: string;
      jobTitle: string | null;
      name: string;
      ownerId: string;
      phoneNumber: string | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .selectFrom('crm.contacts')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { email: string; name: string; ownerId: string } & {
      companyId?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      jobTitle?: string | null | undefined;
      phoneNumber?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'crm.contacts',
    {
      companyId: string | null;
      createdAt: Date | null;
      email: string;
      id: string;
      jobTitle: string | null;
      name: string;
      ownerId: string;
      phoneNumber: string | null;
      updatedAt: Date | null;
    }
  > {
    return this.db.insertInto('crm.contacts').values(value).returningAll();
  }
  update(
    id: string,
    value: {
      companyId?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      email?: string | undefined;
      id?: string | undefined;
      jobTitle?: string | null | undefined;
      name?: string | undefined;
      ownerId?: string | undefined;
      phoneNumber?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.contacts',
    'crm.contacts',
    {
      companyId: string | null;
      createdAt: Date | null;
      email: string;
      id: string;
      jobTitle: string | null;
      name: string;
      ownerId: string;
      phoneNumber: string | null;
      updatedAt: Date | null;
    }
  > {
    return this.db
      .updateTable('crm.contacts')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(id: string): DeleteQueryBuilder<DB, 'crm.contacts', DeleteResult> {
    return this.db.deleteFrom('crm.contacts').where('id', '=', id);
  }
}

export class CrmContactRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'crm.contacts'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'crm.contacts', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('crm.contacts')
      .limit(perPage)
      .offset((page - 1) * perPage)
      .selectAll();

    // sort
    for (const field of sort || []) {
      builder = builder.orderBy(field.field, field.order);
    }

    if (search)
      builder = builder.where('crm.contacts.name', 'like', `%${search}%`);

    return builder;
  }

  create(value: Insertable<DB['crm.contacts']>) {
    return this.db.insertInto('crm.contacts').values(value).returningAll();
  }

  batchCreate(values: Insertable<DB['crm.contacts']>[]) {
    return this.db.insertInto('crm.contacts').values(values).returningAll();
  }

  update(
    id: DB['crm.contacts']['id']['__update__'],
    value: Updateable<DB['crm.contacts']>,
  ) {
    return this.db
      .updateTable('crm.contacts')
      .set(value)
      .where('crm.contacts.id', '=', id)
      .returningAll();
  }

  delete(id: DB['crm.contacts']['id']['__update__']) {
    return this.db.deleteFrom('crm.contacts').where('crm.contacts.id', '=', id);
  }
}
