import type { Insertable, Selectable, Updateable } from "kysely";
import { Kysely } from "kysely";
import type { CrmCompanies, CrmContacts, DB } from "../types";
import { KyselyCrmContactsRepository } from "./crmContacts.repository";

export interface ICrmCompaniesRepository {
  findById(id: string): Promise<Selectable<CrmCompanies> | undefined>;
  findByEmail(email: string): Promise<Selectable<CrmCompanies> | undefined>;
  paginate(offset: number, limit: number): Promise<Selectable<CrmCompanies>[]>;
  create(company: Insertable<CrmCompanies>): Promise<Selectable<CrmCompanies>>;
  update(
    id: string,
    updates: Updateable<CrmCompanies>,
  ): Promise<Selectable<CrmCompanies>>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
  addContactByID(
    companyID: string,
    contactID: string,
  ): Promise<Selectable<CrmContacts>>;
  addContact(
    contact: Insertable<CrmContacts>,
  ): Promise<Selectable<CrmContacts>>;
  addContacts(
    contacts: Insertable<CrmContacts>[],
  ): Promise<Selectable<CrmContacts>[]>;
}

export class KyselyCrmCompaniesRepository implements ICrmCompaniesRepository {
  constructor(private db: Kysely<DB>) {}

  private baseQuery() {
    return this.db
      .selectFrom("crm.companies")
      .selectAll()
      .where("deleted", "=", false);
  }

  async findById(id: string): Promise<Selectable<CrmCompanies> | undefined> {
    return await this.baseQuery().where("id", "=", id).executeTakeFirst();
  }

  async findByEmail(
    email: string,
  ): Promise<Selectable<CrmCompanies> | undefined> {
    return await this.baseQuery().where("email", "=", email).executeTakeFirst();
  }

  async create(
    company: Insertable<CrmCompanies>,
  ): Promise<Selectable<CrmCompanies>> {
    return await this.db
      .insertInto("crm.companies")
      .values({
        ...company,
        id: crypto.randomUUID(),
        created: new Date(),
        updated: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(
    id: string,
    updates: Updateable<CrmCompanies>,
  ): Promise<Selectable<CrmCompanies>> {
    return await this.db
      .updateTable("crm.companies")
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
      .deleteFrom("crm.companies")
      .where("id", "=", id)
      .execute();
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .updateTable("crm.companies")
      .set({
        deleted: true,
        updated: new Date(),
      })
      .where("id", "=", id)
      .execute();
  }

  async paginate(
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmCompanies>[]> {
    return await this.baseQuery().limit(limit).offset(offset).execute();
  }

  async addContactByID(
    companyID: string,
    contactID: string,
  ): Promise<Selectable<CrmContacts>> {
    const contactRepository = new KyselyCrmContactsRepository(this.db);

    const updatedContact = await contactRepository.update(contactID, {
      companyId: companyID,
    });

    return updatedContact;
  }

  async addContact(
    contact: Insertable<CrmContacts>,
  ): Promise<Selectable<CrmContacts>> {
    const contactRepository = new KyselyCrmContactsRepository(this.db);

    const newContact = await contactRepository.create(contact);

    return newContact;
  }

  async addContacts(
    contacts: Insertable<CrmContacts>[],
  ): Promise<Selectable<CrmContacts>[]> {
    const contactRepository = new KyselyCrmContactsRepository(this.db);

    const newContacts = await contactRepository.batchCreate(contacts);

    return newContacts;
  }
}
