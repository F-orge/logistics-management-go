#!/usr/bin/env node

/**
 * Button Group Code Generator Script
 *
 * This script generates button group code for controls without modifying existing files.
 *
 * Usage:
 *   bun scripts/generate-button-group.ts [options]
 *
 * Options:
 *   --label <text>        Primary button label (default: "Create")
 *   --with-dropdown       Include dropdown menu for global actions (default: true)
 *   --route <path>        Navigation route (default: "/dashboard/$schema/$collection")
 *   --output <file>       Output file path (optional, prints to console if not specified)
 *   --format <type>       Output format: "full", "jsx", "imports", "functions" (default: "full")
 */

// biome-ignore lint: imports used in main function
import { writeFileSync } from "node:fs";
// biome-ignore lint: imports used in main function
import { resolve } from "node:path";
// biome-ignore lint: imports used in main function
import { getButtonGroupCode } from "../src/lib/generate-button-group";

interface ScriptArgs {
  label: string;
  withDropdown: boolean;
  route: string;
  output?: string;
  format: "full" | "jsx" | "imports" | "functions";
}

function parseArgs(): ScriptArgs {
  const args = process.argv.slice(2);
  const parsed: ScriptArgs = {
    label: "Create",
    withDropdown: true,
    route: "/dashboard/$schema/$collection",
    format: "full",
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--label" && args[i + 1]) {
      parsed.label = args[++i];
    } else if (arg === "--with-dropdown" && args[i + 1]) {
      parsed.withDropdown = args[++i].toLowerCase() !== "false";
    } else if (arg === "--route" && args[i + 1]) {
      parsed.route = args[++i];
    } else if (arg === "--output" && args[i + 1]) {
      parsed.output = args[++i];
    } else if (arg === "--format" && args[i + 1]) {
      const format = args[++i];
      if (["full", "jsx", "imports", "functions"].includes(format)) {
        parsed.format = format as ScriptArgs["format"];
      }
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
  }

  return parsed;
}

function printHelp(): void {
  const helpText = `
Button Group Code Generator

Usage:
  bun scripts/generate-button-group.ts [options]

Options:
  --label <text>        Primary button label (default: "Create")
  --with-dropdown       Include dropdown menu (default: true)
  --route <path>        Navigation route (default: "/dashboard/$schema/$collection")
  --output <file>       Output file path (prints to console if not specified)
  --format <type>       Output format:
                        - "full": all code pieces (default)
                        - "jsx": button group JSX only
                        - "imports": imports only
                        - "functions": helper functions only
  --help, -h            Show this help message

Examples:
  # Generate with default settings
  bun scripts/generate-button-group.ts

  # Generate with custom label and output to file
  bun scripts/generate-button-group.ts --label "Add" --output generated-button-group.tsx

  # Generate only JSX
  bun scripts/generate-button-group.ts --format jsx

  # Custom route and dropdown disabled
  bun scripts/generate-button-group.ts --route "/dashboard/items" --with-dropdown false
  `;
  console.log(helpText);
}

function formatOutput(
  code: ReturnType<typeof getButtonGroupCode>,
  format: ScriptArgs["format"]
): string {
  switch (format) {
    case "jsx":
      return code.buttonGroupJSX;
    case "imports":
      return code.imports;
    case "functions":
      return `${code.renderMenuItems}\n\n${code.handleGlobalAction}`;
    default:
      return `// Generated Button Group Code
// ${new Date().toISOString()}

${code.imports}

// Helper Functions
${code.renderMenuItems}

${code.handleGlobalAction}

// Button Group JSX
${code.buttonGroupJSX}
`;
  }
}

async function main(): Promise<void> {
  try {
    const args = parseArgs();

    console.log("🔄 Generating button group code...\n");

    const code = getButtonGroupCode({
      primaryButtonLabel: args.label,
      includeDropdown: args.withDropdown,
      navigationRoute: args.route,
    });

    const output = formatOutput(code, args.format);

    if (args.output) {
      const outputPath = resolve(process.cwd(), args.output);
      writeFileSync(outputPath, output, "utf-8");
      console.log(`✅ Generated code written to: ${args.output}`);
      console.log(`\n📝 File size: ${(output.length / 1024).toFixed(2)} KB`);
    } else {
      console.log("📋 Generated Code:\n");
      console.log(output);
    }

    console.log("\n✨ Done!");
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
