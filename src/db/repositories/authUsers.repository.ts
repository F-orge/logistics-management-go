import {
  type Insertable,
  Kysely,
  type Selectable,
  type Updateable,
} from "kysely";
import type { AuthUsers, DB } from "../types";

export interface AuthUsersRepository {
  findById(id: string): Promise<Selectable<AuthUsers> | undefined>;
  findByEmail(email: string): Promise<Selectable<AuthUsers> | undefined>;
  create(user: Insertable<AuthUsers>): Promise<Selectable<AuthUsers>>;
  update(
    id: string,
    updates: Updateable<AuthUsers>,
  ): Promise<Selectable<AuthUsers>>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
}

export class KyselyAuthUsersRepository implements AuthUsersRepository {
  constructor(private db: Kysely<DB>) {}

  async findById(id: string): Promise<Selectable<AuthUsers> | undefined> {
    return await this.db
      .selectFrom("auth.users")
      .selectAll()
      .where("id", "=", id)
      .where("deleted", "=", false)
      .executeTakeFirst();
  }

  async findByEmail(email: string): Promise<Selectable<AuthUsers> | undefined> {
    return await this.db
      .selectFrom("auth.users")
      .selectAll()
      .where("email", "=", email)
      .where("deleted", "=", false)
      .executeTakeFirst();
  }

  async create(user: Insertable<AuthUsers>): Promise<Selectable<AuthUsers>> {
    return await this.db
      .insertInto("auth.users")
      .values({
        ...user,
        id: crypto.randomUUID(),
        created: new Date(),
        updated: new Date(),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async update(
    id: string,
    updates: Updateable<AuthUsers>,
  ): Promise<Selectable<AuthUsers>> {
    return await this.db
      .updateTable("auth.users")
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
    await this.db.deleteFrom("auth.users").where("id", "=", id).execute();
  }

  async softDelete(id: string): Promise<void> {
    await this.db
      .updateTable("auth.users")
      .set({
        deleted: true,
        updated: new Date(),
      })
      .where("id", "=", id)
      .execute();
  }
}
