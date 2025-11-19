#!/usr/bin/env node

/**
 * Add Dropdown Logic to Button Groups in Controls
 *
 * This executable script adds the dropdown menu logic (renderMenuItems and handleGlobalAction)
 * to control files that have button groups but are missing this functionality.
 *
 * Usage:
 *   bun scripts/add-button-group-logic.ts [options]
 *
 * Options:
 *   --dry-run              Show what would be changed without modifying files
 *   --target <path>        Target specific control file (e.g., leads)
 *   --help, -h             Show this help message
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

interface FileModificationResult {
  filePath: string;
  modified: boolean;
  reason: string;
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

function extractNavigationRoute(content: string): string {
  // Try to extract from useSearch hook
  let match = content.match(/useSearch\(\{\s*from:\s*"([^"]+)"/);
  if (match) return match[1];

  // Try to extract from useNavigate hook
  match = content.match(/useNavigate\(\{\s*from:\s*"([^"]+)"/);
  if (match) return match[1];

  // Default to the standard route
  return "/dashboard/$schema/$collection";
}

function generateHandleGlobalAction(navigationRoute: string): string {
  return `const handleGlobalAction = (
    action: GlobalAction<"${navigationRoute}">
  ) => {
    action.onSelect?.(navigate);
  };`;
}

function generateRenderMenuItems(navigationRoute: string): string {
  const code = `const renderMenuItems = (
    actions: GlobalAction<"${navigationRoute}">[]
  ): React.ReactNode => {
    return actions.map((action, index) => {
      const submenuItems = action.submenu;

      return (
        <React.Fragment key={index}>
          {action.divider && index > 0 && <DropdownMenuSeparator />}
          {submenuItems && submenuItems.length > 0 ? (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger disabled={action.disabled}>
                {action.icon && React.isValidElement(action.icon) && (
                  <span className="mr-2">{action.icon}</span>
                )}
                {typeof action.icon === "function" && (
                  <span className="mr-2">{action.icon(searchQuery)}</span>
                )}
                {action.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {renderMenuItems(submenuItems)}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem
              onClick={() => handleGlobalAction(action)}
              disabled={action.disabled}
              variant={action.variant}
            >
              {action.icon && React.isValidElement(action.icon) && (
                <span className="mr-2">{action.icon}</span>
              )}
              {typeof action.icon === "function" && (
                <span className="mr-2">{action.icon(searchQuery)}</span>
              )}
              {action.label}
            </DropdownMenuItem>
          )}
        </React.Fragment>
      );
    });
  };`;
  return code;
}

function hasButtonGroupDropdownLogic(content: string): boolean {
  return (
    content.includes("renderMenuItems") &&
    content.includes("handleGlobalAction")
  );
}

function hasButtonGroup(content: string): boolean {
  return content.includes("ButtonGroup");
}

function hasGlobalActionImport(content: string): boolean {
  return content.includes("GlobalAction");
}

function addImportIfMissing(
  content: string,
  from: string,
  imports: string[]
): string {
  const importRegex = new RegExp(
    `import\\s+\\{([^}]*)\\}\\s+from\\s+["']${from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'];`
  );
  const match = content.match(importRegex);

  if (match) {
    const existingImports = match[1]
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    const missingImports = imports.filter((i) => !existingImports.includes(i));

    if (missingImports.length === 0) {
      return content; // All imports already exist
    }

    const allImports = [...new Set([...existingImports, ...missingImports])];
    const newImportLine = `import { ${allImports.join(", ")} } from "${from}";`;
    return content.replace(match[0], newImportLine);
  }

  // Add new import after last import
  const lastImportMatch = content.match(/import\s+.*from\s+["'].*["'];/);
  if (lastImportMatch) {
    const lastImportPos =
      content.indexOf(lastImportMatch[0]) + lastImportMatch[0].length;
    const importLine = `import { ${imports.join(", ")} } from "${from}";`;
    return (
      content.substring(0, lastImportPos) +
      "\n" +
      importLine +
      content.substring(lastImportPos)
    );
  }

  return content;
}

function addDropdownLogicToFile(
  filePath: string,
  dryRun: boolean = false
): FileModificationResult {
  try {
    let content = readFileSync(filePath, "utf-8");

    // Check if already has the dropdown logic
    if (hasButtonGroupDropdownLogic(content)) {
      return {
        filePath,
        modified: false,
        reason: "Already has dropdown logic",
      };
    }

    // Check if has button group
    if (!hasButtonGroup(content)) {
      return {
        filePath,
        modified: false,
        reason: "No ButtonGroup found",
      };
    }

    // Extract navigation route (now returns a default if not found)
    const navigationRoute = extractNavigationRoute(content);

    // Add GlobalAction import if missing
    if (!hasGlobalActionImport(content)) {
      content = addImportIfMissing(content, "@/lib/utils", ["GlobalAction"]);
    }

    // Ensure DropdownMenuSub and related items are imported
    content = addImportIfMissing(content, "@/components/ui/dropdown-menu", [
      "DropdownMenuSeparator",
      "DropdownMenuSub",
      "DropdownMenuSubContent",
      "DropdownMenuSubTrigger",
      "DropdownMenuItem",
    ]);

    // Find the component function definition - look for "const [ComponentName] = () => {"
    const componentDefRegex =
      /^\s*const\s+\w+\s*=\s*(?:\([^)]*\)\s*)?=>?\s*\{/m;
    const componentMatch = content.match(componentDefRegex);

    if (!componentMatch || !componentMatch.index) {
      return {
        filePath,
        modified: false,
        reason: "Could not find component definition",
      };
    }

    // Insert right after the opening brace of the component
    const insertPos = componentMatch.index + componentMatch[0].length;
    const beforeComponent = content.substring(0, insertPos);
    const afterComponent = content.substring(insertPos);

    const functions = `${generateRenderMenuItems(navigationRoute)}\n\n${generateHandleGlobalAction(navigationRoute)}\n\n`;

    const modifiedContent = beforeComponent + functions + afterComponent;

    if (!dryRun) {
      writeFileSync(filePath, modifiedContent, "utf-8");
    }

    return {
      filePath,
      modified: true,
      reason: "Added dropdown logic (renderMenuItems, handleGlobalAction)",
    };
  } catch (error) {
    return {
      filePath,
      modified: false,
      reason: `Error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

function printResults(
  results: FileModificationResult[],
  dryRun: boolean
): void {
  console.log(`\n${"=".repeat(80)}`);
  console.log(
    `Button Group Logic Addition Results${dryRun ? " (DRY RUN)" : ""}`
  );
  console.log("=".repeat(80));

  const modified = results.filter((r) => r.modified);
  const unmodified = results.filter((r) => !r.modified);

  if (modified.length > 0) {
    console.log(`\n✅ Modified (${modified.length}):\n`);
    for (const result of modified) {
      const relPath = relative(process.cwd(), result.filePath);
      console.log(`  📄 ${relPath}`);
      console.log(`     ${result.reason}`);
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
  console.log(
    `Summary: ${modified.length} modified, ${unmodified.length} skipped`
  );
  console.log(`${"=".repeat(80)}\n`);
}

function printHelp(): void {
  const helpText = `
Add Button Group Dropdown Logic to Controls

This script adds renderMenuItems() and handleGlobalAction() functions to control files
that have ButtonGroup but are missing the dropdown menu logic.

Usage:
  bun scripts/add-button-group-logic.ts [options]

Options:
  --dry-run              Show what would be changed without modifying files
  --target <path>        Target specific control file (e.g., leads)
  --help, -h             Show this help message

Examples:
  # Preview changes without modifying
  bun scripts/add-button-group-logic.ts --dry-run

  # Add logic to all controls
  bun scripts/add-button-group-logic.ts

  # Add logic to specific control
  bun scripts/add-button-group-logic.ts --target leads
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
    const result = addDropdownLogicToFile(filePath, dryRun);
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
