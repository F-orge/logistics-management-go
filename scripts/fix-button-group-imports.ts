#!/usr/bin/env node

/**
 * Fix Missing Imports in Modified Control Files
 *
 * This script adds missing dropdown menu imports to files that had the dropdown logic added.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CONTROLS_DIR = join(process.cwd(), "src/components/controls");

function getAllControlFiles(dir: string = CONTROLS_DIR): string[] {
  const files: string[] = [];

  try {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...getAllControlFiles(fullPath));
      } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return files;
}

function addImportIfMissing(
  content: string,
  from: string,
  imports: string[]
): string {
  // Check if this import from already exists
  const importRegex = new RegExp(
    `import\\s+\\{([^}]*)\\}\\s+from\\s+["']${from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'];`
  );
  const match = content.match(importRegex);

  if (match) {
    const existingImports = match[1]
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    const newImports = imports.filter((i) => !existingImports.includes(i));

    if (newImports.length === 0) {
      return content; // All imports already exist
    }

    const updatedImports = [...new Set([...existingImports, ...newImports])];
    const newImportLine = `import { ${updatedImports.join(", ")} } from "${from}";`;
    return content.replace(match[0], newImportLine);
  }

  // Add new import after last import
  const lastImportMatch = content.match(/import\s+.*from\s+["'].*["'];/);
  if (lastImportMatch) {
    const lastImportPos =
      content.indexOf(lastImportMatch[0]) + lastImportMatch[0].length;
    const importLine = `import { ${imports.join(", ")} } from "${from}";`;
    const result = `${content.substring(0, lastImportPos)}\n${importLine}${content.substring(lastImportPos)}`;
    return result;
  }

  return content;
}

function fixFile(filePath: string): boolean {
  try {
    let content = readFileSync(filePath, "utf-8");

    // Add missing dropdown imports if the file has renderMenuItems
    if (content.includes("renderMenuItems")) {
      const originalLength = content.length;

      content = addImportIfMissing(content, "@/components/ui/dropdown-menu", [
        "DropdownMenuSeparator",
        "DropdownMenuItem",
        "DropdownMenuSub",
        "DropdownMenuSubContent",
        "DropdownMenuSubTrigger",
      ]);

      if (content.length !== originalLength) {
        writeFileSync(filePath, content, "utf-8");
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

async function main(): Promise<void> {
  console.log("🔍 Fixing missing imports in modified control files...\n");

  const controlFiles = getAllControlFiles();
  let fixedCount = 0;

  for (const filePath of controlFiles) {
    if (fixFile(filePath)) {
      fixedCount++;
    }
  }

  console.log(`✅ Fixed imports in ${fixedCount} file(s)\n`);
  console.log("💡 Run: bun run lint (or just lint) to format files\n");
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
