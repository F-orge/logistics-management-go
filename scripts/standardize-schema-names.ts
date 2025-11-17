/**
 * Standardize Schema Names
 *
 * Converts custom schema names (CreateCampaignSchema, UpdateProductSchema, etc.)
 * to standard names (CreateSchema, UpdateSchema)
 *
 * Usage:
 *   bun scripts/standardize-schema-names.ts [OPTIONS]
 *
 * Options:
 *   --domain <name>      Filter by domain
 *   --collection <name>  Filter by collection
 *   --dry-run           Output preview without writing files
 *
 * Examples:
 *   bun scripts/standardize-schema-names.ts --dry-run
 *   bun scripts/standardize-schema-names.ts --force
 */

import * as fs from "node:fs/promises";
import * as path from "node:path";

interface CLIArgs {
  domain?: string;
  collection?: string;
  dryRun: boolean;
}

function parseArgs(): CLIArgs {
  const args = process.argv.slice(2);
  const parsed: CLIArgs = {
    dryRun: false,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--domain":
        parsed.domain = args[++i];
        break;
      case "--collection":
        parsed.collection = args[++i];
        break;
      case "--dry-run":
        parsed.dryRun = true;
        break;
    }
  }

  return parsed;
}

async function findMutationFiles(args: CLIArgs): Promise<string[]> {
  const actionsDir = "./src/components/actions";
  const files: string[] = [];

  try {
    const domains = await fs.readdir(actionsDir, { withFileTypes: true });

    for (const domainDir of domains) {
      if (!domainDir.isDirectory()) continue;

      const domainName = domainDir.name;
      if (args.domain && domainName !== args.domain) continue;

      const domainPath = path.join(actionsDir, domainName);
      const collections = await fs.readdir(domainPath, {
        withFileTypes: true,
      });

      for (const collectionDir of collections) {
        if (!collectionDir.isDirectory()) continue;

        const collectionName = collectionDir.name;
        if (args.collection && collectionName !== args.collection) continue;

        const collectionPath = path.join(domainPath, collectionName);

        try {
          const createPath = path.join(collectionPath, "create.tsx");
          await fs.access(createPath);
          files.push(createPath);
        } catch {}

        try {
          const updatePath = path.join(collectionPath, "update.tsx");
          await fs.access(updatePath);
          files.push(updatePath);
        } catch {}
      }
    }
  } catch (error) {
    console.error(`Error finding mutation files: ${error}`);
    process.exit(1);
  }

  return files;
}

function standardizeSchemaNames(
  content: string,
  fileName: string
): { modified: string; changed: boolean; changes: string[] } {
  const changes: string[] = [];
  let modified = content;
  const isCreateFile = fileName.includes("create.tsx");

  if (isCreateFile) {
    // Find any "export const Create*Schema" pattern
    const createMatch = modified.match(/export const Create\w+Schema = z\.object/);
    if (createMatch) {
      const oldName = createMatch[0].match(/Create\w+Schema/)?.[0];
      if (oldName && oldName !== "CreateSchema") {
        // Replace export declaration
        modified = modified.replace(
          new RegExp(`export const ${oldName} = z\\.object`, "g"),
          "export const CreateSchema = z.object"
        );
        // Replace all references to the old schema name with CreateSchema
        modified = modified.replace(new RegExp(oldName, "g"), "CreateSchema");
        changes.push(`Renamed ${oldName} → CreateSchema`);
      }
    }
  } else {
    // Find any "export const Update*Schema" pattern
    const updateMatch = modified.match(/export const Update\w+Schema = z\.object/);
    if (updateMatch) {
      const oldName = updateMatch[0].match(/Update\w+Schema/)?.[0];
      if (oldName && oldName !== "UpdateSchema") {
        // Replace export declaration
        modified = modified.replace(
          new RegExp(`export const ${oldName} = z\\.object`, "g"),
          "export const UpdateSchema = z.object"
        );
        // Replace all references to the old schema name with UpdateSchema
        modified = modified.replace(new RegExp(oldName, "g"), "UpdateSchema");
        changes.push(`Renamed ${oldName} → UpdateSchema`);
      }
    }
  }

  const changed = changes.length > 0;
  return { modified, changed, changes };
}

async function main() {
  const args = parseArgs();

  console.log("🔍 Finding mutation files...\n");
  const files = await findMutationFiles(args);

  if (files.length === 0) {
    console.log("No mutation files found matching criteria.");
    process.exit(0);
  }

  console.log(`Found ${files.length} file(s):\n`);
  for (const file of files) {
    console.log(`  - ${file}`);
  }
  console.log();

  let totalChanged = 0;

  // Process each file
  for (const file of files) {
    const content = await fs.readFile(file, "utf-8");
    const fileName = path.basename(file);
    const { modified, changed, changes } = standardizeSchemaNames(content, fileName);

    if (changed) {
      totalChanged++;

      if (args.dryRun) {
        console.log(`📋 ${file}`);
        for (const change of changes) {
          console.log(`   ${change}`);
        }
      } else {
        await fs.writeFile(file, modified);
        console.log(`✓ ${file}`);
        for (const change of changes) {
          console.log(`   ${change}`);
        }
      }
    }
  }

  console.log();
  if (args.dryRun) {
    console.log(`📊 Dry run: Would update ${totalChanged} file(s)`);
    console.log("Run without --dry-run to apply changes");
  } else {
    console.log(`✓ Standardization complete! ${totalChanged} file(s) updated.`);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
