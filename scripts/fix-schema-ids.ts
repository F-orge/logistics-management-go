import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Fixes schema field registry IDs to include collection name
 * Changes format from "fieldName" to "CollectionName-fieldName"
 */
async function fixSchemaIds() {
  const schemasDir = "./src/pocketbase/schemas";

  try {
    console.log("📝 Fixing schema field registry IDs...");

    const subdirs = await readdir(schemasDir, { withFileTypes: true });

    for (const subdir of subdirs) {
      if (!subdir.isDirectory()) continue;

      const schemaSubDir = path.join(schemasDir, subdir.name);
      const files = await readdir(schemaSubDir);

      for (const file of files) {
        if (!file.endsWith(".ts") || file === "index.ts") continue;

        const filePath = path.join(schemaSubDir, file);
        let content = await readFile(filePath, "utf-8");

        // Extract the schema name (e.g., AccountTransactionsSchema -> AccountTransactions)
        const schemaMatch = content.match(/export const (\w+)Schema = /);
        if (!schemaMatch) {
          console.log(
            `⚠️  Skipping ${filePath} - could not find schema export`
          );
          continue;
        }

        const collectionName = schemaMatch[1];
        const originalContent = content;

        // Find all id: "..." patterns within .register(fieldRegistry, { ... })
        // This regex matches the pattern but we need to be careful to only update within fieldRegistry
        content = content.replace(
          /\.register\(fieldRegistry,\s*\{([^}]*?)id:\s*"([^"]*)"([^}]*?)\}/g,
          (match, before, idValue, after) => {
            // Only update if it doesn't already have the collection name prefix
            if (!idValue.includes("-")) {
              const newId = `${collectionName}-${idValue}`;
              return `.register(fieldRegistry, {${before}id: "${newId}"${after}}`;
            }
            return match;
          }
        );

        if (content !== originalContent) {
          await writeFile(filePath, content, "utf-8");
          console.log(`✅ Fixed: ${path.relative(".", filePath)}`);
        }
      }
    }

    console.log("\n✨ All schema IDs fixed successfully!");
  } catch (error) {
    console.error("❌ Error fixing schema IDs:", error);
    process.exit(1);
  }
}

fixSchemaIds();
