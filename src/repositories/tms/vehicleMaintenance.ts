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
import { DB, TmsVehicleServiceTypeEnum } from '@/db/types';
import { FilterConfig, GenericRepository, SortConfig } from '../interface';

export class VehicleMaintenanceRepository
  implements GenericRepository<'tms.vehicleMaintenance'>
{
  constructor(private db: Kysely<DB>) {}

  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<'tms.vehicleMaintenance'> | undefined,
    filter?: FilterConfig<'tms.vehicleMaintenance'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.vehicleMaintenance',
    {
      cost: string | null;
      createdAt: Date | null;
      id: string;
      notes: string | null;
      serviceDate: Date;
      serviceType: TmsVehicleServiceTypeEnum | null;
      updatedAt: Date | null;
      vehicleId: string;
    }
  > {
    let query = this.db.selectFrom('tms.vehicleMaintenance').selectAll();

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
    sort?: SortConfig<'tms.vehicleMaintenance'> | undefined,
    filter?: FilterConfig<'tms.vehicleMaintenance'> | undefined,
  ): SelectQueryBuilder<
    DB,
    'tms.vehicleMaintenance',
    {
      cost: string | null;
      createdAt: Date | null;
      id: string;
      notes: string | null;
      serviceDate: Date;
      serviceType: TmsVehicleServiceTypeEnum | null;
      updatedAt: Date | null;
      vehicleId: string;
    }
  > {
    let query = this.db
      .selectFrom('tms.vehicleMaintenance')
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
    'tms.vehicleMaintenance',
    {
      cost: string | null;
      createdAt: Date | null;
      id: string;
      notes: string | null;
      serviceDate: Date;
      serviceType: TmsVehicleServiceTypeEnum | null;
      updatedAt: Date | null;
      vehicleId: string;
    }
  > {
    return this.db
      .selectFrom('tms.vehicleMaintenance')
      .selectAll()
      .where('id', 'in', values);
  }
  create(
    value: { serviceDate: string | Date; vehicleId: string } & {
      cost?: string | number | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      notes?: string | null | undefined;
      serviceType?: TmsVehicleServiceTypeEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
    },
  ): InsertQueryBuilder<
    DB,
    'tms.vehicleMaintenance',
    {
      cost: string | null;
      createdAt: Date | null;
      id: string;
      notes: string | null;
      serviceDate: Date;
      serviceType: TmsVehicleServiceTypeEnum | null;
      updatedAt: Date | null;
      vehicleId: string;
    }
  > {
    return this.db
      .insertInto('tms.vehicleMaintenance')
      .values(value)
      .returningAll();
  }
  update(
    id: string,
    value: {
      cost?: string | number | null | undefined;
      createdAt?: string | Date | null | undefined;
      id?: string | undefined;
      notes?: string | null | undefined;
      serviceDate?: string | Date | undefined;
      serviceType?: TmsVehicleServiceTypeEnum | null | undefined;
      updatedAt?: string | Date | null | undefined;
      vehicleId?: string | undefined;
    },
  ): UpdateQueryBuilder<
    DB,
    'tms.vehicleMaintenance',
    'tms.vehicleMaintenance',
    {
      cost: string | null;
      createdAt: Date | null;
      id: string;
      notes: string | null;
      serviceDate: Date;
      serviceType: TmsVehicleServiceTypeEnum | null;
      updatedAt: Date | null;
      vehicleId: string;
    }
  > {
    return this.db
      .updateTable('tms.vehicleMaintenance')
      .set(value)
      .where('id', '=', id)
      .returningAll();
  }
  delete(
    id: string,
  ): DeleteQueryBuilder<DB, 'tms.vehicleMaintenance', DeleteResult> {
    return this.db.deleteFrom('tms.vehicleMaintenance').where('id', '=', id);
  }
}

export class TmsVehicleMaintenanceRepository {
  constructor(private db: Kysely<DB>) {}

  select(
    page: number,
    perPage: number,
    fields?: SelectExpression<DB, 'tms.vehicleMaintenance'>,
    search?: string,
    sort?: {
      field: OrderByExpression<DB, 'tms.vehicleMaintenance', {}>;
      order: OrderByModifiers;
    }[],
  ) {
    let builder = this.db
      .selectFrom('tms.vehicleMaintenance')
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
        'tms.vehicleMaintenance.id',
        'like',
        `%${search}%`,
      );

    return builder;
  }

  create(value: Insertable<DB['tms.vehicleMaintenance']>) {
    return this.db
      .insertInto('tms.vehicleMaintenance')
      .values(value)
      .returningAll();
  }

  batchCreate(values: Insertable<DB['tms.vehicleMaintenance']>[]) {
    return this.db
      .insertInto('tms.vehicleMaintenance')
      .values(values)
      .returningAll();
  }

  update(
    id: DB['tms.vehicleMaintenance']['id']['__update__'],
    value: Updateable<DB['tms.vehicleMaintenance']>,
  ) {
    return this.db
      .updateTable('tms.vehicleMaintenance')
      .set(value)
      .where('tms.vehicleMaintenance.id', '=', id)
      .returningAll();
  }

  delete(id: DB['tms.vehicleMaintenance']['id']['__update__']) {
    return this.db
      .deleteFrom('tms.vehicleMaintenance')
      .where('tms.vehicleMaintenance.id', '=', id);
  }
}
