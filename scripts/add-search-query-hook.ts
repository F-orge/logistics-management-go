#!/usr/bin/env node

/**
 * Add searchQuery Hook to All Controls
 *
 * This script adds the searchQuery = useSearch() hook to all control files
 * that don't already have it.
 *
 * Usage:
 *   bun scripts/add-search-query-hook.ts [--dry-run]
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

interface FileModificationResult {
  filePath: string;
  modified: boolean;
  reason: string;
}

const CONTROLS_DIR = join(process.cwd(), "src/components/controls");

function getAllControlFiles(dir: string = CONTROLS_DIR): string[] {
  const files: string[] = [];

  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllControlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }

  return files;
}

function addSearchQueryHook(filePath: string, dryRun: boolean = false): FileModificationResult {
  try {
    const content = readFileSync(filePath, "utf-8");

    // Check if already has searchQuery
    if (content.includes("searchQuery = useSearch")) {
      return {
        filePath,
        modified: false,
        reason: "Already has searchQuery hook",
      };
    }

    let modifiedContent = content;

    // Add useSearch import if missing
    if (!content.includes("useSearch")) {
      // Find the useNavigate import line and add useSearch to it
      const useNavigateMatch = modifiedContent.match(
        /import\s*{\s*useNavigate[^}]*}\s*from\s*["']@tanstack\/react-router["'];/
      );

      if (useNavigateMatch) {
        const importLine = useNavigateMatch[0];
        const updatedImport = importLine.replace(/import\s*{\s*useNavigate/, "import { useNavigate, useSearch");
        modifiedContent = modifiedContent.replace(importLine, updatedImport);
      } else {
        return {
          filePath,
          modified: false,
          reason: "Could not find useNavigate import to add useSearch",
        };
      }
    }

    // Check if has useNavigate (needed to find where to insert)
    if (!modifiedContent.includes("useNavigate")) {
      return {
        filePath,
        modified: false,
        reason: "Missing useNavigate import",
      };
    }

    // Find the first const declaration inside the component function
    const componentBodyMatch = modifiedContent.match(/^(\s+)const\s+navigate\s*=\s*useNavigate/m);

    if (!componentBodyMatch) {
      return {
        filePath,
        modified: false,
        reason: "Could not find navigate declaration",
      };
    }

    const indent = componentBodyMatch[1];
    const navigateLineStart = modifiedContent.indexOf(componentBodyMatch[0]);
    const navigateLineEnd = modifiedContent.indexOf("\n", navigateLineStart);

    // Insert searchQuery hook after navigate declaration
    const searchQueryLine = `${indent}const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });`;
    modifiedContent =
      modifiedContent.substring(0, navigateLineEnd + 1) +
      searchQueryLine +
      "\n" +
      modifiedContent.substring(navigateLineEnd + 1);

    if (!dryRun) {
      writeFileSync(filePath, modifiedContent, "utf-8");
    }

    return {
      filePath,
      modified: true,
      reason: "Added useSearch import and searchQuery hook",
    };
  } catch (error) {
    return {
      filePath,
      modified: false,
      reason: `Error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");

  console.log("🔍 Scanning control files...\n");

  const controlFiles = getAllControlFiles();
  console.log(`Found ${controlFiles.length} control file(s)\n`);

  const results: FileModificationResult[] = [];

  for (const filePath of controlFiles) {
    const result = addSearchQueryHook(filePath, dryRun);
    results.push(result);
  }

  const modified = results.filter((r) => r.modified);
  const unmodified = results.filter((r) => !r.modified);

  console.log("=".repeat(80));
  console.log(`Search Query Hook Addition Results${dryRun ? " (DRY RUN)" : ""}`);
  console.log("=".repeat(80));

  if (modified.length > 0) {
    console.log(`\n✅ Modified (${modified.length}):\n`);
    for (const result of modified) {
      const relPath = relative(process.cwd(), result.filePath);
      console.log(`  📄 ${relPath}`);
    }
  }

  if (unmodified.length > 0) {
    console.log(`\n⏭️  Skipped (${unmodified.length}):\n`);
    for (const result of unmodified) {
      const relPath = relative(process.cwd(), result.filePath);
      console.log(`  📄 ${relPath}`);
      console.log(`     Reason: ${result.reason}`);
    }
  }

  console.log(`\n${"=".repeat(80)}`);
  console.log(`Summary: ${modified.length} modified, ${unmodified.length} skipped`);
  console.log(`${"=".repeat(80)}\n`);

  if (!dryRun && modified.length > 0) {
    console.log("💡 Don't forget to run: bun run check (to format files)\n");
  }
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
