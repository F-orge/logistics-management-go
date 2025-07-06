import type { Insertable, Selectable, Updateable } from "kysely";
import { Kysely } from "kysely";
import type { CrmTasks, DB, TaskStatus } from "../types";

export interface ICrmTasksRepository {
  findById(id: string): Promise<Selectable<CrmTasks> | undefined>;
  findByCompanyID(
    companyID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmTasks>[]>;
  findByContactID(
    contactID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmTasks>[]>;
  findByDueDate(
    dueDate: Date,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmTasks>[]>;
  findByStatus(
    status: TaskStatus,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmTasks>[]>;
  searchByTitle(
    query: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmTasks>[]>;
  findAll(): Promise<Selectable<CrmTasks>[]>;
  create(task: Insertable<CrmTasks>): Promise<Selectable<CrmTasks>>;
  update(
    id: string,
    updates: Updateable<CrmTasks>,
  ): Promise<Selectable<CrmTasks>>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
}

export class KyselyCrmTasksRepository implements ICrmTasksRepository {
  constructor(private db: Kysely<DB>) {}

  private baseQuery() {
    return this.db.selectFrom("crm.tasks").selectAll().where(
      "deleted",
      "=",
      false,
    );
  }

  async findById(id: string): Promise<Selectable<CrmTasks> | undefined> {
    return this.baseQuery()
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async findByCompanyID(
    companyID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmTasks>[]> {
    return this.baseQuery()
      .where("companyId", "=", companyID)
      .offset(offset)
      .limit(limit)
      .execute();
  }

  async findByContactID(
    contactID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmTasks>[]> {
    return this.baseQuery()
      .where("contactId", "=", contactID)
      .offset(offset)
      .limit(limit)
      .execute();
  }

  async findByDueDate(
    dueDate: Date,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmTasks>[]> {
    return this.baseQuery()
      .where("dueDate", "=", dueDate)
      .offset(offset)
      .limit(limit)
      .execute();
  }

  async findByStatus(
    status: TaskStatus,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmTasks>[]> {
    return this.baseQuery()
      .where("status", "=", status)
      .offset(offset)
      .limit(limit)
      .execute();
  }

  async searchByTitle(
    query: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmTasks>[]> {
    return this.baseQuery()
      .where("title", "like", `%${query}%`)
      .offset(offset)
      .limit(limit)
      .execute();
  }

  async findAll(): Promise<Selectable<CrmTasks>[]> {
    return this.baseQuery()
      .execute();
  }

  async create(task: Insertable<CrmTasks>): Promise<Selectable<CrmTasks>> {
    return this.db
      .insertInto("crm.tasks")
      .values(task)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(
    id: string,
    updates: Updateable<CrmTasks>,
  ): Promise<Selectable<CrmTasks>> {
    return this.db
      .updateTable("crm.tasks")
      .set(updates)
      .where("id", "=", id)
      .where("deleted", "is", false)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async delete(id: string): Promise<void> {
    await this.db.deleteFrom("crm.tasks").where("id", "=", id).execute();
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .updateTable("crm.tasks")
      .set({ deleted: true, updated: new Date() })
      .where("id", "=", id)
      .execute();
  }
}
