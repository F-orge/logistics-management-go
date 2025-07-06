import type { Insertable, Selectable, Updateable } from "kysely";
import { Kysely } from "kysely";
import type { CrmDeals, DB, DealStatus } from "../types";

export interface ICrmDealsRepository {
  findById(id: string): Promise<Selectable<CrmDeals> | undefined>;

  findAll(): Promise<Selectable<CrmDeals>[]>;

  findByContactID(
    contactID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmDeals>[]>;

  findByCompanyID(
    companyID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmDeals>[]>;

  findByStatus(
    status: DealStatus,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmDeals>[]>;

  searchByName(
    name: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmDeals>[]>;

  create(deal: Insertable<CrmDeals>): Promise<Selectable<CrmDeals>>;

  update(
    id: string,
    updates: Updateable<CrmDeals>,
  ): Promise<Selectable<CrmDeals>>;

  delete(id: string): Promise<void>;

  softDelete(id: string): Promise<void>;
}

export class KyselyCrmDealsRepository implements ICrmDealsRepository {
  constructor(private db: Kysely<DB>) {}

  private baseQuery() {
    return this.db
      .selectFrom("crm.deals")
      .selectAll();
  }

  async findById(id: string): Promise<Selectable<CrmDeals> | undefined> {
    return await this.baseQuery()
      .where("id", "=", id)
      .where("deleted", "=", false)
      .executeTakeFirst();
  }

  async findAll(): Promise<Selectable<CrmDeals>[]> {
    return await this.baseQuery()
      .where("deleted", "=", false)
      .execute();
  }

  async create(
    deal: Insertable<CrmDeals>,
  ): Promise<Selectable<CrmDeals>> {
    return await this.db
      .insertInto("crm.deals")
      .values({
        ...deal,
        id: crypto.randomUUID(),
        created: new Date(),
        updated: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(
    id: string,
    updates: Updateable<CrmDeals>,
  ): Promise<Selectable<CrmDeals>> {
    return await this.db
      .updateTable("crm.deals")
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
      .deleteFrom("crm.deals")
      .where("id", "=", id)
      .execute();
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .updateTable("crm.deals")
      .set({
        deleted: true,
        updated: new Date(),
      })
      .where("id", "=", id)
      .execute();
  }

  async findByStatus(
    status: DealStatus,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmDeals>[]> {
    return await this.baseQuery().where("status", "=", status).offset(offset)
      .limit(limit).execute();
  }

  async searchByName(
    name: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmDeals>[]> {
    return await this.baseQuery().where("name", "like", `%${name}%`).offset(
      offset,
    )
      .limit(limit).execute();
  }

  async findByContactID(
    contactID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmDeals>[]> {
    return await this.baseQuery().where("contactId", "=", contactID).offset(
      offset,
    )
      .limit(limit).execute();
  }

  async findByCompanyID(
    companyID: string,
    offset: number,
    limit: number,
  ): Promise<Selectable<CrmDeals>[]> {
    return await this.baseQuery().where("companyId", "=", companyID).offset(
      offset,
    )
      .limit(limit).execute();
  }
}
