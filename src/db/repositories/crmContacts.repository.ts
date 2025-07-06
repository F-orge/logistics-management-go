import type { Insertable, Selectable, Updateable } from "kysely";
import { Kysely } from "kysely";
import type { CrmContacts, DB } from "../types";

export interface CrmContactsRepository {
  findById(id: string): Promise<Selectable<CrmContacts> | undefined>;
  findAll(): Promise<Selectable<CrmContacts>[]>;
  create(contact: Insertable<CrmContacts>): Promise<Selectable<CrmContacts>>;
  batchCreate(
    contacts: Insertable<CrmContacts>[],
  ): Promise<Selectable<CrmContacts>[]>;
  update(
    id: string,
    updates: Updateable<CrmContacts>,
  ): Promise<Selectable<CrmContacts>>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
  paginate(limit: number, offset: number): Promise<Selectable<CrmContacts>[]>;
  searchByName(name: string): Promise<Selectable<CrmContacts>[]>;
  findByPhoneNumber(
    phone: string,
  ): Promise<Selectable<CrmContacts> | undefined>;
  findByCompany(companyId: string): Promise<Selectable<CrmContacts>[]>;
  findByEmail(email: string): Promise<Selectable<CrmContacts> | undefined>;
}

export class KyselyCrmContactsRepository implements CrmContactsRepository {
  constructor(private db: Kysely<DB>) {}

  private baseQuery() {
    return this.db
      .selectFrom("crm.contacts")
      .selectAll()
      .where("deleted", "=", false);
  }

  async findById(id: string): Promise<Selectable<CrmContacts> | undefined> {
    return await this.baseQuery().where("id", "=", id).executeTakeFirst();
  }

  async findAll(): Promise<Selectable<CrmContacts>[]> {
    return await this.baseQuery().execute();
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
      .where("deleted", "=", false)
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

  async paginate(
    limit: number,
    offset: number,
  ): Promise<Selectable<CrmContacts>[]> {
    return await this.baseQuery().limit(limit).offset(offset).execute();
  }

  async searchByName(name: string): Promise<Selectable<CrmContacts>[]> {
    return await this.baseQuery().where("name", "like", `%${name}%`).execute();
  }

  async findByPhoneNumber(
    phone: string,
  ): Promise<Selectable<CrmContacts> | undefined> {
    return await this.baseQuery().where("phone", "=", phone).executeTakeFirst();
  }

  async findByCompany(companyId: string): Promise<Selectable<CrmContacts>[]> {
    return await this.baseQuery().where("companyId", "=", companyId).execute();
  }

  async findByEmail(
    email: string,
  ): Promise<Selectable<CrmContacts> | undefined> {
    return await this.baseQuery().where("email", "=", email).executeTakeFirst();
  }

  async batchCreate(
    contacts: Insertable<CrmContacts>[],
  ): Promise<Selectable<CrmContacts>[]> {
    return this.db.transaction().execute(async (trx) => {
      const createdContacts = [];
      for (const contact of contacts) {
        createdContacts.push(
          trx.insertInto("crm.contacts").values(contact).returningAll()
            .executeTakeFirstOrThrow(),
        );
      }
      return await Promise.all(createdContacts);
    });
  }
}
