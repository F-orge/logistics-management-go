import type {
  ComparisonOperatorExpression,
  DeleteQueryBuilder,
  DeleteResult,
  Insertable,
  InsertQueryBuilder,
  OrderByDirection,
  Selectable,
  SelectQueryBuilder,
  Updateable,
  UpdateQueryBuilder,
} from 'kysely'
import type { DB } from '@/db/types'

// Utility type to get column names from a table
export type TableColumns<T extends keyof DB> = keyof DB[T]

// Utility type to get the primary key (id) type from a table using Selectable
// All tables are guaranteed to have an 'id' field in this entity-based system
export type PrimaryKey<T extends keyof DB> = Selectable<DB[T]> extends {
  id: infer U
}
  ? U
  : never

// Utility type to get the type of a specific column
export type ColumnType<Table extends keyof DB, Column extends keyof DB[Table]> = DB[Table][Column]

// Utility type to create a sort configuration with proper column typing
export type SortConfig<Table extends keyof DB> = Array<{
  column: TableColumns<Table>
  order: OrderByDirection
}>

export type FilterConfig<Table extends keyof DB> = Array<
  {
    [K in keyof Selectable<DB[Table]>]: {
      column: K
      operation: ComparisonOperatorExpression
      value: Selectable<DB[Table]>[K]
    }
  }[keyof Selectable<DB[Table]>]
>

export interface GenericRepository<
  Table extends keyof DB,
  ReturnType = SelectQueryBuilder<DB, Table, Selectable<DB[Table]>>,
  InsertReturnType = InsertQueryBuilder<DB, Table, Selectable<DB[Table]>>,
  UpdateReturnType = UpdateQueryBuilder<DB, Table, Table, Selectable<DB[Table]>>,
  DeleteReturnType = DeleteQueryBuilder<DB, Table, DeleteResult>,
> {
  paginate(
    page?: number,
    limit?: number,
    sort?: SortConfig<Table>,
    filter?: FilterConfig<Table>,
  ): ReturnType

  range(from: Date, to: Date, sort?: SortConfig<Table>, filter?: FilterConfig<Table>): ReturnType

  in(values: Array<PrimaryKey<Table>>): ReturnType

  create(value: Insertable<DB[Table]>): InsertReturnType

  update(id: PrimaryKey<Table>, value: Updateable<DB[Table]>): UpdateReturnType

  delete(id: PrimaryKey<Table>): DeleteReturnType
}
