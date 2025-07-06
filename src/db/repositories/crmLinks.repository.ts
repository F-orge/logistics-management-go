import type { Insertable, Selectable, Updateable } from "kysely";
import { Kysely } from "kysely";
import type { CrmLinks, DB } from "../types";

export interface ICrmLinksRepository {
  findById(id: string): Promise<Selectable<CrmLinks> | undefined>;
  findAll(): Promise<Selectable<CrmLinks>[]>;
  create(link: Insertable<CrmLinks>): Promise<Selectable<CrmLinks>>;
  update(
    id: string,
    updates: Updateable<CrmLinks>,
  ): Promise<Selectable<CrmLinks>>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
}

export class KyselyCrmLinksRepository implements ICrmLinksRepository {
  constructor(private db: Kysely<DB>) {}

  async findById(id: string): Promise<Selectable<CrmLinks> | undefined> {
    return await this.db
      .selectFrom("crm.links")
      .selectAll()
      .where("id", "=", id)
      .where("deleted", "=", false)
      .executeTakeFirst();
  }

  async findAll(): Promise<Selectable<CrmLinks>[]> {
    return await this.db
      .selectFrom("crm.links")
      .selectAll()
      .where("deleted", "=", false)
      .execute();
  }

  async create(
    link: Insertable<CrmLinks>,
  ): Promise<Selectable<CrmLinks>> {
    return await this.db
      .insertInto("crm.links")
      .values({
        ...link,
        id: crypto.randomUUID(),
        created: new Date(),
        updated: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(
    id: string,
    updates: Updateable<CrmLinks>,
  ): Promise<Selectable<CrmLinks>> {
    return await this.db
      .updateTable("crm.links")
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
      .deleteFrom("crm.links")
      .where("id", "=", id)
      .execute();
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .updateTable("crm.links")
      .set({
        deleted: true,
        updated: new Date(),
      })
      .where("id", "=", id)
      .execute();
  }
}
