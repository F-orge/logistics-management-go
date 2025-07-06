import type { Insertable, Selectable, Updateable } from "kysely";
import { Kysely } from "kysely";
import type { CrmLinks, DB } from "../types";

export interface ICrmLinksRepository {
  findById(id: string): Promise<Selectable<CrmLinks> | undefined>;

  findByContactID(
    contactID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmLinks>[]>;

  findByCompanyID(
    companyID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmLinks>[]>;

  create(
    link: Insertable<CrmLinks>,
  ): Promise<Selectable<CrmLinks>>;

  update(
    id: string,
    updates: Updateable<CrmLinks>,
  ): Promise<Selectable<CrmLinks>>;

  delete(id: string): Promise<void>;

  softDelete(id: string): Promise<void>;

  paginate(
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmLinks>[]>;
}

export class KyselyCrmLinksRepository implements ICrmLinksRepository {
  constructor(private db: Kysely<DB>) {}

  private baseQuery() {
    return this.db.selectFrom("crm.links").selectAll().where(
      "deleted",
      "=",
      false,
    );
  }

  async findById(id: string): Promise<Selectable<CrmLinks> | undefined> {
    return await this.baseQuery()
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async create(
    link: Insertable<CrmLinks>,
  ): Promise<Selectable<CrmLinks>> {
    return await this.db
      .insertInto("crm.links")
      .values({
        ...link,
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

  async paginate(
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmLinks>[]> {
    return await this.baseQuery()
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async findByContactID(
    contactID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmLinks>[]> {
    return await this.baseQuery().where("contactId", "=", contactID).offset(
      offset,
    ).limit(limit).execute();
  }

  async findByCompanyID(
    companyID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmLinks>[]> {
    throw await this.baseQuery().where("companyId", "=", companyID).offset(
      offset,
    ).limit(limit).execute();
  }
}
