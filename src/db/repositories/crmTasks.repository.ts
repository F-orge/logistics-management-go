import type { Insertable, Selectable, Updateable } from "kysely";
import { Kysely } from "kysely";
import type { CrmTasks, DB } from "../types";

export interface ICrmTasksRepository {
  findById(id: string): Promise<Selectable<CrmTasks> | undefined>;
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

  async findById(id: string): Promise<Selectable<CrmTasks> | undefined> {
    return await this.db
      .selectFrom("crm.tasks")
      .selectAll()
      .where("id", "=", id)
      .where("deleted", "=", false)
      .executeTakeFirst();
  }

  async findAll(): Promise<Selectable<CrmTasks>[]> {
    return await this.db
      .selectFrom("crm.tasks")
      .selectAll()
      .where("deleted", "=", false)
      .execute();
  }

  async create(
    task: Insertable<CrmTasks>,
  ): Promise<Selectable<CrmTasks>> {
    return await this.db
      .insertInto("crm.tasks")
      .values({
        ...task,
        id: crypto.randomUUID(),
        created: new Date(),
        updated: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(
    id: string,
    updates: Updateable<CrmTasks>,
  ): Promise<Selectable<CrmTasks>> {
    return await this.db
      .updateTable("crm.tasks")
      .set({
        ...updates,
        updated: new Date(),
      })
      .where("id", "=", id)
      .where("deleted", "=", false)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async delete(id: string): Promise<void> {
    await this.db
      .deleteFrom("crm.tasks")
      .where("id", "=", id)
      .execute();
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .updateTable("crm.tasks")
      .set({
        deleted: true,
        updated: new Date(),
      })
      .where("id", "=", id)
      .execute();
  }
}
