import type { Insertable, Selectable, Updateable } from "kysely";
import { Kysely } from "kysely";
import type { CrmDeals, DB } from "../types";

export interface ICrmDealsRepository {
  findById(id: string): Promise<Selectable<CrmDeals> | undefined>;
  findAll(): Promise<Selectable<CrmDeals>[]>;
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

  async findById(id: string): Promise<Selectable<CrmDeals> | undefined> {
    return await this.db
      .selectFrom("crm.deals")
      .selectAll()
      .where("id", "=", id)
      .where("deleted", "is", null)
      .executeTakeFirst();
  }

  async findAll(): Promise<Selectable<CrmDeals>[]> {
    return await this.db
      .selectFrom("crm.deals")
      .selectAll()
      .where("deleted", "is", null)
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
      .where("deleted", "is", null)
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
}
