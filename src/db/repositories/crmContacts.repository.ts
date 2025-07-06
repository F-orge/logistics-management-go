import type { Insertable, Selectable, Updateable } from "kysely";
import { Kysely } from "kysely";
import type { CrmContacts, DB } from "../types";

export interface CrmContactsRepository {
  findById(id: string): Promise<Selectable<CrmContacts> | undefined>;
  findAll(): Promise<Selectable<CrmContacts>[]>;
  create(contact: Insertable<CrmContacts>): Promise<Selectable<CrmContacts>>;
  update(
    id: string,
    updates: Updateable<CrmContacts>,
  ): Promise<Selectable<CrmContacts>>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
}

export class KyselyCrmContactsRepository implements CrmContactsRepository {
  constructor(private db: Kysely<DB>) {}

  async findById(id: string): Promise<Selectable<CrmContacts> | undefined> {
    return (await this.db
      .selectFrom("crm.contacts")
      .selectAll()
      .where("id", "=", id)
      .where("deleted", "is", null)
      .executeTakeFirst());
  }

  async findAll(): Promise<Selectable<CrmContacts>[]> {
    return await this.db
      .selectFrom("crm.contacts")
      .selectAll()
      .where("deleted", "is", null)
      .execute();
  }

  async create(
    contact: Insertable<CrmContacts>,
  ): Promise<Selectable<CrmContacts>> {
    return await this.db
      .insertInto("crm.contacts")
      .values({
        ...contact,
        id: crypto.randomUUID(),
        created: new Date(),
        updated: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(
    id: string,
    updates: Updateable<CrmContacts>,
  ): Promise<Selectable<CrmContacts>> {
    return await this.db
      .updateTable("crm.contacts")
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
      .deleteFrom("crm.contacts")
      .where("id", "=", id)
      .execute();
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .updateTable("crm.contacts")
      .set({
        deleted: true,
        updated: new Date(),
      })
      .where("id", "=", id)
      .execute();
  }
}
