import type { Insertable, Selectable, Updateable } from "kysely";
import { Kysely } from "kysely";
import type { CrmActivities, DB } from "../types";

export interface ICrmActivitiesRepository {
  findById(id: string): Promise<Selectable<CrmActivities> | undefined>;
  findAll(): Promise<Selectable<CrmActivities>[]>;
  create(
    activity: Insertable<CrmActivities>,
  ): Promise<Selectable<CrmActivities>>;
  update(
    id: string,
    updates: Updateable<CrmActivities>,
  ): Promise<Selectable<CrmActivities>>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
}

export class KyselyCrmActivitiesRepository implements ICrmActivitiesRepository {
  constructor(private db: Kysely<DB>) {}

  async findById(id: string): Promise<Selectable<CrmActivities> | undefined> {
    return await this.db
      .selectFrom("crm.activities")
      .selectAll()
      .where("id", "=", id)
      .where("deleted", "is", null)
      .executeTakeFirst();
  }

  async findAll(): Promise<Selectable<CrmActivities>[]> {
    return await this.db
      .selectFrom("crm.activities")
      .selectAll()
      .where("deleted", "is", null)
      .execute();
  }

  async create(
    activity: Insertable<CrmActivities>,
  ): Promise<Selectable<CrmActivities>> {
    return await this.db
      .insertInto("crm.activities")
      .values({
        ...activity,
        id: crypto.randomUUID(),
        created: new Date(),
        updated: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(
    id: string,
    updates: Updateable<CrmActivities>,
  ): Promise<Selectable<CrmActivities>> {
    return await this.db
      .updateTable("crm.activities")
      .set({
        ...updates,
        updated: new Date(),
      })
      .where("id", "=", id)
      .where("deleted", "is", null)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async delete(id: string): Promise<void> {
    await this.db
      .deleteFrom("crm.activities")
      .where("id", "=", id)
      .execute();
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .updateTable("crm.activities")
      .set({
        deleted: true,
        updated: new Date(),
      })
      .where("id", "=", id)
      .execute();
  }
}
