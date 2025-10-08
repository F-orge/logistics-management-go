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
import { CrmCompany, DB } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class CompanyRepository implements GenericRepository<'crm.companies'> {
  constructor(private db: Kysely<DB>) {}
  create(
    value: { name: string } & {
      annualRevenue?: string | number | null | undefined;
      city?: string | null | undefined;
      country?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      industry?: string | null | undefined;
      ownerId?: string | null | undefined;
      phoneNumber?: string | null | undefined;
      postalCode?: string | null | undefined;
      state?: string | null | undefined;
      street?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
      website?: string | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'crm.companies',
    {
      annualRevenue: string | null;
      city: string | null;
      country: string | null;
      createdAt: Date | null;
      id: string;
      industry: string | null;
      name: string;
      ownerId: string | null;
      phoneNumber: string | null;
      postalCode: string | null;
      state: string | null;
      street: string | null;
      updatedAt: Date | null;
      website: string | null;
    }
  > {
    return this.db.insertInto('crm.companies').values(value).returningAll();
  }

  update(
    id: string,
    value: {
      annualRevenue?: string | number | null | undefined;
      city?: string | null | undefined;
      country?: string | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      industry?: string | null | undefined;
      name?: string | undefined;
      ownerId?: string | null | undefined;
      phoneNumber?: string | null | undefined;
      postalCode?: string | null | undefined;
      state?: string | null | undefined;
      street?: string | null | undefined;
      updatedAt?: string | Date | null | undefined;
      website?: string | null | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'crm.companies',
    'crm.companies',
    {
      annualRevenue: string | null;
      city: string | null;
      country: string | null;
      createdAt: Date | null;
      id: string;
      industry: string | null;
      name: string;
      ownerId: string | null;
      phoneNumber: string | null;
      postalCode: string | null;
      state: string | null;
      street: string | null;
      updatedAt: Date | null;
      website: string | null;
    }
  > {
    return this.db
      .updateTable('crm.companies')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }

  delete(id: string): DeleteQueryBuilder<DB, 'crm.companies', DeleteResult> {
    return this.db.deleteFrom('crm.companies').where('id', '=', id);
  }

  in(values: string[]): SelectQueryBuilder<
    DB,
    'crm.companies',
    {
      annualRevenue: string | null;
      city: string | null;
      country: string | null;
      createdAt: Date | null;
      id: string;
      industry: string | null;
      name: string;
      ownerId: string | null;
      phoneNumber: string | null;
      postalCode: string | null;
      state: string | null;
      street: string | null;
      updatedAt: Date | null;
      website: string | null;
    }
  > {
    return this.db
      .selectFrom('crm.companies')
      .selectAll()
      .where('id', 'in', values);
  }

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'crm.companies'> | undefined,
    filter?: FilterConfig<'crm.companies'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.companies',
    {
      id: string;
      createdAt: Date | null;
      updatedAt: Date | null;
      name: string;
      ownerId: string | null;
      annualRevenue: string | null;
      city: string | null;
      country: string | null;
      industry: string | null;
      phoneNumber: string | null;
      postalCode: string | null;
      state: string | null;
      street: string | null;
      website: string | null;
    }
  > {
    let query = this.db.selectFrom('crm.companies').selectAll();

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
    sort?: SortConfig<'crm.companies'> | undefined,
    filter?: FilterConfig<'crm.companies'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'crm.companies',
    {
      id: string;
      createdAt: Date | null;
      updatedAt: Date | null;
      name: string;
      ownerId: string | null;
      annualRevenue: string | null;
      city: string | null;
      country: string | null;
      industry: string | null;
      phoneNumber: string | null;
      postalCode: string | null;
      state: string | null;
      street: string | null;
      website: string | null;
    }
  > {
    let query = this.db
      .selectFrom('crm.companies')
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
}

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
