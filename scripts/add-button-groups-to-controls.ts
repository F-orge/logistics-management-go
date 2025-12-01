#!/usr/bin/env node

/**
 * Add Button Group to All Controls
 *
 * This executable script scans all control files and adds button group functionality
 * to those that don't already have it. It modifies files in-place.
 *
 * Usage:
 *   bun scripts/add-button-groups-to-controls.ts [options]
 *
 * Options:
 *   --dry-run              Show what would be changed without modifying files
 *   --target <path>        Target specific control file (optional)
 *   --help, -h             Show this help message
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { getButtonGroupCode } from "../src/lib/generate-button-group";

interface FileModificationResult {
  filePath: string;
  modified: boolean;
  reason: string;
  changes?: {
    addedImports: string[];
    addedFunctions: string[];
  };
}

const CONTROLS_DIR = join(process.cwd(), "src/components/controls");
const results: FileModificationResult[] = [];

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

function hasButtonGroup(content: string): boolean {
  return content.includes("ButtonGroup");
}

function hasGlobalActionType(content: string): boolean {
  return content.includes("GlobalAction");
}

function extractNavigationRoute(content: string): string | null {
  const match = content.match(/useSearch\(\{\s*from:\s*"([^"]+)"/);
  return match ? match[1] : null;
}

function addButtonGroupToFile(filePath: string, dryRun: boolean = false): FileModificationResult {
  try {
    const content = readFileSync(filePath, "utf-8");

    // Check if already has button group
    if (hasButtonGroup(content)) {
      return {
        filePath,
        modified: false,
        reason: "Already has ButtonGroup",
      };
    }

    // Extract navigation route from useSearch
    const navigationRoute = extractNavigationRoute(content);
    if (!navigationRoute) {
      return {
        filePath,
        modified: false,
        reason: "Could not determine navigation route",
      };
    }

    // Generate button group code
    const config = {
      primaryButtonLabel: "Create",
      includeDropdown: hasGlobalActionType(content),
      navigationRoute,
    };

    const generatedCode = getButtonGroupCode(config);

    // Check if file already has necessary imports
    const hasChevronDownIcon = content.includes("ChevronDownIcon");
    const hasButtonGroupImport = content.includes("ButtonGroup");
    const hasDropdownMenuImport = content.includes("DropdownMenu");
    const hasGlobalActionImport = content.includes("GlobalAction");

    let modifiedContent = content;
    const addedImports: string[] = [];
    const addedFunctions: string[] = [];

    // Add missing imports at the top
    if (!hasChevronDownIcon && generatedCode.imports.includes("ChevronDownIcon")) {
      modifiedContent = addImport(modifiedContent, "ChevronDownIcon", "lucide-react");
      addedImports.push("ChevronDownIcon");
    }

    if (!hasButtonGroupImport) {
      modifiedContent = addImport(modifiedContent, "ButtonGroup, ButtonGroupSeparator", "@/components/ui/button-group");
      addedImports.push("ButtonGroup, ButtonGroupSeparator");
    }

    if (!hasDropdownMenuImport && generatedCode.imports.includes("DropdownMenu")) {
      modifiedContent = addImportMultiple(modifiedContent, "@/components/ui/dropdown-menu", [
        "DropdownMenu",
        "DropdownMenuContent",
        "DropdownMenuGroup",
        "DropdownMenuItem",
        "DropdownMenuSeparator",
        "DropdownMenuSub",
        "DropdownMenuSubContent",
        "DropdownMenuSubTrigger",
        "DropdownMenuTrigger",
      ]);
      addedImports.push("DropdownMenu (and related)");
    }

    if (!hasGlobalActionImport && generatedCode.imports.includes("GlobalAction")) {
      modifiedContent = addImport(modifiedContent, "GlobalAction", "@/lib/utils");
      addedImports.push("GlobalAction");
    }

    // Add helper functions before the component definition
    const componentDefMatch = modifiedContent.match(/(const\s+\w+\s*=\s*\(\{|const\s+\w+:\s*React\.FC)/);
    if (componentDefMatch) {
      const insertPos = componentDefMatch.index || 0;
      const beforeComponent = modifiedContent.substring(0, insertPos);
      const afterComponent = modifiedContent.substring(insertPos);

      // Add functions only if dropdown is included
      if (config.includeDropdown) {
        const functionsToAdd = `\n${generatedCode.renderMenuItems}\n\n${generatedCode.handleGlobalAction}\n\n`;
        modifiedContent = beforeComponent + functionsToAdd + afterComponent;
        addedFunctions.push("renderMenuItems", "handleGlobalAction");
      }
    }

    if (!dryRun) {
      writeFileSync(filePath, modifiedContent, "utf-8");
    }

    return {
      filePath,
      modified: true,
      reason: "Added ButtonGroup functionality",
      changes: {
        addedImports,
        addedFunctions,
      },
    };
  } catch (error) {
    return {
      filePath,
      modified: false,
      reason: `Error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

function addImport(content: string, imports: string, from: string): string {
  const importLine = `import { ${imports} } from "${from}";\n`;
  const lastImportMatch = content.match(/import\s+.*from\s+["'].*["'];/);

  if (lastImportMatch) {
    const lastImportPos = content.indexOf(lastImportMatch[0]) + lastImportMatch[0].length;
    return `${content.substring(0, lastImportPos)}\n${importLine}${content.substring(lastImportPos)}`;
  }

  return importLine + content;
}

function addImportMultiple(content: string, from: string, imports: string[]): string {
  // Check if this import from already exists
  const importRegex = new RegExp(
    `import\\s+\\{([^}]*)\\}\\s+from\\s+["']${from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'];`
  );
  const match = content.match(importRegex);

  if (match) {
    const existingImports = match[1].split(",").map((s) => s.trim());
    const newImports = imports.filter((i) => !existingImports.includes(i));

    if (newImports.length === 0) {
      return content; // All imports already exist
    }

    const updatedImports = [...existingImports, ...newImports].join(", ");
    const newImportLine = `import { ${updatedImports} } from "${from}";`;
    return content.replace(match[0], newImportLine);
  }

  // Add new import
  return addImport(content, imports.join(", "), from);
}

function printResults(results: FileModificationResult[], dryRun: boolean): void {
  console.log(`\n${"=".repeat(80)}`);
  console.log(`Button Group Modification Results${dryRun ? " (DRY RUN)" : ""}`);
  console.log("=".repeat(80));

  const modified = results.filter((r) => r.modified);
  const unmodified = results.filter((r) => !r.modified);

  if (modified.length > 0) {
    console.log(`\n✅ Modified (${modified.length}):\n`);
    for (const result of modified) {
      const relPath = relative(process.cwd(), result.filePath);
      console.log(`  📄 ${relPath}`);
      if (result.changes) {
        if (result.changes.addedImports.length > 0) {
          console.log(`     Added imports: ${result.changes.addedImports.join(", ")}`);
        }
        if (result.changes.addedFunctions.length > 0) {
          console.log(`     Added functions: ${result.changes.addedFunctions.join(", ")}`);
        }
      }
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
}

function printHelp(): void {
  const helpText = `
Add Button Group to All Controls

Usage:
  bun scripts/add-button-groups-to-controls.ts [options]

Options:
  --dry-run              Show what would be changed without modifying files
  --target <path>        Target specific control file (e.g., customers, leads)
  --help, -h             Show this help message

Examples:
  # Add button groups to all controls
  bun scripts/add-button-groups-to-controls.ts

  # Preview changes without modifying
  bun scripts/add-button-groups-to-controls.ts --dry-run

  # Add button group to specific control
  bun scripts/add-button-groups-to-controls.ts --target leads
  `;
  console.log(helpText);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  let dryRun = false;
  let targetFile: string | null = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--dry-run") {
      dryRun = true;
    } else if (args[i] === "--target" && args[i + 1]) {
      targetFile = args[++i];
    } else if (args[i] === "--help" || args[i] === "-h") {
      printHelp();
      process.exit(0);
    }
  }

  console.log("🔍 Scanning control files...\n");

  let controlFiles = getAllControlFiles();

  if (targetFile) {
    controlFiles = controlFiles.filter((f) => f.includes(targetFile));
  }

  if (controlFiles.length === 0) {
    console.error("❌ No control files found");
    process.exit(1);
  }

  console.log(`Found ${controlFiles.length} control file(s)\n`);

  for (const filePath of controlFiles) {
    const result = addButtonGroupToFile(filePath, dryRun);
    results.push(result);
  }

  printResults(results, dryRun);

  if (!dryRun && results.some((r) => r.modified)) {
    console.log("💡 Don't forget to run: bun run check (to format files)\n");
  }
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
