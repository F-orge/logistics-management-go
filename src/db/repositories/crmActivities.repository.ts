import type { Insertable, Selectable, Updateable } from "kysely";
import { Kysely } from "kysely";
import type { CrmActivities, DB } from "../types";

export interface ICrmActivitiesRepository {
  findById(id: string): Promise<Selectable<CrmActivities> | undefined>;
  findAll(): Promise<Selectable<CrmActivities>[]>;
  findByType(
    type: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmActivities>[]>;
  findByCompanyID(
    companyID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmActivities>[]>;
  findByContactID(
    contactID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmActivities>[]>;
  paginate(offset: number, limit: number): Promise<Selectable<CrmActivities>[]>;
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

  private baseQuery() {
    return this.db
      .selectFrom("crm.activities")
      .selectAll()
      .where("deleted", "=", false);
  }

  async findByType(
    type: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmActivities>[]> {
    return await this.baseQuery()
      .where("type", "like", `%${type}%`)
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async findByCompanyID(
    companyID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmActivities>[]> {
    return await this.baseQuery()
      .where("companyId", "=", companyID)
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async findByContactID(
    contactID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmActivities>[]> {
    return await this.baseQuery()
      .where("contactId", "=", contactID)
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async paginate(
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmActivities>[]> {
    return await this.baseQuery()
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async findById(id: string): Promise<Selectable<CrmActivities> | undefined> {
    return await this.baseQuery()
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async findAll(): Promise<Selectable<CrmActivities>[]> {
    return await this.baseQuery().execute();
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
      .where("deleted", "=", false)
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
