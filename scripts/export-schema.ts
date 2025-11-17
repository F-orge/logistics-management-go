/**
 * PocketBase Schema Export Script
 *
 * This script exports all PocketBase collections (excluding system tables)
 * to a JSON file at scripts/schema.json.
 *
 * Usage: bun scripts/export-schema.ts
 * Environment Variables:
 *   - POCKETBASE_URL: PocketBase server URL (default: http://localhost:8090)
 *   - POCKETBASE_ADMIN_EMAIL: Admin email for authentication
 *   - POCKETBASE_ADMIN_PASSWORD: Admin password for authentication
 *
 * Output: scripts/schema.json
 */

import { readdir, writeFile } from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import PocketBase from "pocketbase";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://localhost:8090";
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN || "admin@example.com";
const ADMIN_PASSWORD = process.env.POCKETBASE_PASSWORD || "admin@123";

interface SchemaFile {
  name: string;
  category: string;
  path: string;
}

interface PocketBaseField {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  system?: boolean;
  presentable?: boolean;
  options?: Record<string, unknown>;
}

interface PocketBaseCollection {
  id: string;
  name: string;
  type: string;
  created: string;
  updated: string;
  system: boolean;
  listRule?: string | null;
  viewRule?: string | null;
  createRule?: string | null;
  updateRule?: string | null;
  deleteRule?: string | null;
  options?: Record<string, unknown>;
  fields?: PocketBaseField[];
}

interface DatabaseSchema {
  timestamp: string;
  collections: PocketBaseCollection[];
  schemaFiles: SchemaFile[];
}

async function getCollectionsFromDB(): Promise<PocketBaseCollection[]> {
  try {
    console.log("🔗 Connecting to PocketBase...");
    const pb = new PocketBase(POCKETBASE_URL);

    console.log("🔑 Authenticating as admin...");
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);

    console.log("📖 Fetching PocketBase collections...");
    const collectionList = (await pb.collections.getFullList()) as PocketBaseCollection[];

    console.log(`✅ Found ${collectionList.length} collections`);

    // Filter out system collections (those starting with _)
    const userCollections = collectionList.filter((col) => !col.name.startsWith("_") && !col.system);

    console.log(`📦 Processing ${userCollections.length} user collections`);

    return userCollections;
  } catch (error) {
    console.error("❌ Error connecting to PocketBase:", (error as Error).message);
    console.warn(`Falling back to schema files only. Make sure PocketBase is running at ${POCKETBASE_URL}`);
    return [];
  }
}

async function getSchemaFiles(): Promise<SchemaFile[]> {
  const schemasDir = path.join(__dirname, "../src/pocketbase/schemas");
  const schemaFiles: SchemaFile[] = [];

  async function walkDir(currentPath: string, category: string = ""): Promise<void> {
    try {
      const entries = await readdir(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        const relativePath = fullPath.replace(schemasDir, "");

        if (entry.isDirectory()) {
          await walkDir(fullPath, entry.name);
        } else if (entry.name.endsWith(".ts") && !entry.name.includes("index")) {
          const name = entry.name.replace(".ts", "");
          const categoryName = category || "root";

          schemaFiles.push({
            name,
            category: categoryName,
            path: relativePath,
          });
        }
      }
    } catch (err) {
      console.warn(`Could not read directory ${currentPath}: ${(err as Error).message}`);
    }
  }

  await walkDir(schemasDir);
  return schemaFiles;
}

async function exportSchema(): Promise<void> {
  try {
    console.log("Exporting PocketBase schema...");

    const collections = await getCollectionsFromDB();
    const schemaFiles = await getSchemaFiles();

    const schema: DatabaseSchema = {
      timestamp: new Date().toISOString(),
      collections,
      schemaFiles,
    };

    const outputPath = path.join(__dirname, "schema.json");
    await writeFile(outputPath, JSON.stringify(schema, null, 2), "utf-8");

    console.log(`✓ Schema exported successfully to ${outputPath}`);
    console.log(`  - Collections: ${collections.length}`);
    console.log(`  - Schema files found: ${schemaFiles.length}`);

    if (schemaFiles.length > 0) {
      console.log("\nSchema files by category:");
      const categories = new Map<string, number>();
      for (const file of schemaFiles) {
        categories.set(file.category, (categories.get(file.category) || 0) + 1);
      }
      for (const [category, count] of categories) {
        console.log(`  - ${category}: ${count} files`);
      }
    }
  } catch (error) {
    console.error("Error exporting schema:", (error as Error).message);
    process.exit(1);
  }
}

void exportSchema();
