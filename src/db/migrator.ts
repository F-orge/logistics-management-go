import { FileMigrationProvider, Kysely, Migrator } from "kysely";
import type { DB } from "./types";
import { promises as fs } from "node:fs";
import * as path from "node:path";

export const migrator = (db: Kysely<DB>) =>
  new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "../../migrations"),
    }),
  });
