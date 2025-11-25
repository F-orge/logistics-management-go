/**
 * Reset Schemas to Empty Objects
 *
 * Converts all CreateSchema and UpdateSchema back to empty z.object({})
 * This is useful for re-running the register-field-schemas script.
 *
 * Usage:
 *   bun scripts/reset-schemas.ts [OPTIONS]
 *
 * Options:
 *   --domain <name>      Filter by domain (e.g., transport-management)
 *   --collection <name>  Filter by collection (requires --domain)
 *   --dry-run           Output preview without writing files
 *
 * Examples:
 *   bun scripts/reset-schemas.ts --dry-run
 *   bun scripts/reset-schemas.ts --domain customer-relations --force
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

        // Check for create.tsx and update.tsx
        const createPath = path.join(collectionPath, "create.tsx");
        const updatePath = path.join(collectionPath, "update.tsx");

        try {
          await fs.access(createPath);
          files.push(createPath);
        } catch {}

        try {
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

function resetSchemaToEmpty(content: string): {
  modified: string;
  changed: boolean;
} {
  let modified = content;
  let changed = false;

  // Helper function to find balanced closing brace
  function findClosingBrace(str: string, startIdx: number): number {
    let depth = 0;
    for (let i = startIdx; i < str.length; i++) {
      if (str[i] === "{") depth++;
      else if (str[i] === "}") {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
  }

  // Process CreateSchema
  const createStart = modified.indexOf("export const CreateSchema = z.object({");
  if (createStart !== -1) {
    const openBraceIdx = createStart + "export const CreateSchema = z.object(".length;
    const closeBraceIdx = findClosingBrace(modified, openBraceIdx);
    if (closeBraceIdx !== -1) {
      const semicolonIdx = modified.indexOf(";", closeBraceIdx);
      if (semicolonIdx !== -1) {
        modified =
          modified.slice(0, createStart) +
          "export const CreateSchema = z.object({});" +
          modified.slice(semicolonIdx + 1);
        changed = true;
      }
    }
  }

  // Process UpdateSchema
  const updateStart = modified.indexOf("export const UpdateSchema = z.object({");
  if (updateStart !== -1) {
    const openBraceIdx = updateStart + "export const UpdateSchema = z.object(".length;
    const closeBraceIdx = findClosingBrace(modified, openBraceIdx);
    if (closeBraceIdx !== -1) {
      const semicolonIdx = modified.indexOf(";", closeBraceIdx);
      if (semicolonIdx !== -1) {
        modified =
          modified.slice(0, updateStart) +
          "export const UpdateSchema = z.object({});" +
          modified.slice(semicolonIdx + 1);
        changed = true;
      }
    }
  }

  return { modified, changed };
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
  const changes: Array<{ file: string; changed: boolean }> = [];

  // Process each file
  for (const file of files) {
    const content = await fs.readFile(file, "utf-8");
    const { modified, changed } = resetSchemaToEmpty(content);

    if (changed) {
      totalChanged++;
      changes.push({ file, changed: true });

      if (!args.dryRun) {
        await fs.writeFile(file, modified);
        console.log(`✓ Reset: ${file}`);
      } else {
        console.log(`📋 Would reset: ${file}`);
      }
    }
  }

  console.log();
  if (args.dryRun) {
    console.log(`📊 Dry run: Would reset ${totalChanged} file(s)`);
    console.log("Run without --dry-run to apply changes");
  } else {
    console.log(`✓ Reset complete! ${totalChanged} file(s) updated.`);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
