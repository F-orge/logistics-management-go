/**
 * PocketBase Control Component Scaffolder
 *
 * Scaffold new control components with search functionality.
 * This script connects to PocketBase, inspects collections, and generates
 * control components with dynamic search capabilities.
 *
 * Usage: bun scripts/scaffold-control.ts <schema> <table> [--force]
 *        bun scripts/scaffold-control.ts --all [--force]
 * Examples:
 *   - Scaffold single control:
 *     bun scripts/scaffold-control.ts customer-relations companies
 *   - Scaffold single control (force overwrite):
 *     bun scripts/scaffold-control.ts customer-relations companies --force
 *   - Scaffold all controls:
 *     bun scripts/scaffold-control.ts --all
 *   - Scaffold all controls (force overwrite):
 *     bun scripts/scaffold-control.ts --all --force
 *
 * Environment Variables:
 *   - POCKETBASE_URL: PocketBase server URL (default: http://localhost:8090)
 *   - POCKETBASE_ADMIN: Admin email for authentication
 *   - POCKETBASE_PASSWORD: Admin password for authentication
 */

import * as fs from "node:fs";
import PocketBase from "pocketbase";

interface PocketBaseField {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  system?: boolean;
  presentable?: boolean;
}

interface PocketBaseCollection {
  id: string;
  name: string;
  type: string;
  fields?: PocketBaseField[];
  system: boolean;
}

interface SearchableField {
  name: string;
  type: string;
}

// Color codes for output
const colors = {
  red: "\x1b[0;31m",
  green: "\x1b[0;32m",
  yellow: "\x1b[1;33m",
  reset: "\x1b[0m",
};

const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://localhost:8090";
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN || "admin@example.com";
const ADMIN_PASSWORD = process.env.POCKETBASE_PASSWORD || "admin@123";

// Convert to singular form
// e.g., "companies" -> "company", "opportunities" -> "opportunity"
function toSingular(word: string): string {
  // Handle "ies" -> "y" (e.g., opportunities -> opportunity)
  if (word.endsWith("ies")) {
    return `${word.slice(0, -3)}y`;
  }
  // Handle "ves" -> "f" (e.g., leaves -> leaf)
  if (word.endsWith("ves")) {
    return `${word.slice(0, -3)}f`;
  }
  // Handle "es" -> "" (e.g., boxes -> box, buses -> bus)
  if (word.match(/[sxz]es$/) || word.match(/ches$/) || word.match(/shes$/)) {
    return word.slice(0, -2);
  }
  // Handle simple "s" -> ""
  if (word.endsWith("s")) {
    return word.slice(0, -1);
  }
  return word;
}

// Convert kebab-case or snake_case to PascalCase
// e.g., "companies" -> "Companies", "customer-relations" -> "CustomerRelations"
function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

// Convert snake_case or PascalCase to kebab-case
// e.g., "driver_schedules" -> "driver-schedules", "DriverSchedules" -> "driver-schedules"
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Handle PascalCase
    .replace(/_/g, "-") // Replace underscores with hyphens
    .toLowerCase();
}

// Convert kebab-case back to snake_case for collection lookups
// e.g., "driver-schedules" -> "driver_schedules"
function toSnakeCase(str: string): string {
  return str.replace(/-/g, "_");
}

// Get searchable fields from collection
// Searchable fields are typically text, email, url types
function getSearchableFields(
  collection: PocketBaseCollection
): SearchableField[] {
  const searchableTypes = ["text", "email", "url"];
  const searchableFields: SearchableField[] = [];

  if (!collection.fields) {
    return searchableFields;
  }

  for (const field of collection.fields) {
    // Skip system fields and non-searchable types
    if (field.system || !searchableTypes.includes(field.type)) {
      continue;
    }

    searchableFields.push({
      name: field.name,
      type: field.type,
    });
  }

  return searchableFields;
}

// Get searchable fields from collection
function generateControlComponent(
  componentName: string,
  searchableFields: SearchableField[]
): string {
  const hasSearch = searchableFields.length > 0;

  const importsUI = hasSearch
    ? `import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";`
    : `import { Button } from "@/components/ui/button";`;

  if (!hasSearch) {
    return `import { useNavigate } from "@tanstack/react-router";
import React from "react";
${importsUI}

const ${componentName}Controls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });

  return (
    <section className="col-span-full flex justify-end">
      <Button
        onClick={() =>
          navigate({ search: (prev) => ({ ...prev, action: "create" }) })
        }
      >
        Create
      </Button>
    </section>
  );
};

export default ${componentName}Controls;
`;
  }

  const searchFieldsComment = searchableFields
    .map((field) => `   * - ${field.name}`)
    .join("\n");

  // Build the filter query logic - we need to output proper template literals
  // The trick is to build the string that will have ${...} in the final output
  const filterConditions = searchableFields
    .map((field) => `${field.name} ~ '\${searchTerm}'`)
    .join(" || ");

  const filterExpression =
    searchableFields.length === 1
      ? `${searchableFields[0].name} ~ '\${searchTerm}'`
      : `(${filterConditions})`;

  const filterQueryLine = `    const filterQuery = \`${filterExpression}\`;`;

  return `import { useNavigate } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

/**
 * ${componentName}Controls
 * Searchable fields:
${searchFieldsComment}
 */
const ${componentName}Controls = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      navigate({
        search: (prev) => {
          const { filter, ...rest } = prev;
          return rest;
        },
      });
      return;
    }

    // PocketBase filter syntax: field ~ 'value' for contains (regex)
    // Multiple fields: (field1 ~ 'term' || field2 ~ 'term')
${filterQueryLine}

    navigate({
      search: (prev) => ({
        ...prev,
        filter: filterQuery,
      }),
    });
  };

  return (
    <section className="col-span-full flex justify-between">
      <InputGroup className="w-full max-w-sm">
        <InputGroupInput
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            onClick={handleSearch}
            variant="secondary"
            className="rounded-md"
          >
            Search
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <Button
        onClick={() =>
          navigate({ search: (prev) => ({ ...prev, action: "create" }) })
        }
      >
        Create
      </Button>
    </section>
  );
};

export default ${componentName}Controls;
`;
}

async function scaffoldSingleControl(
  schema: string,
  table: string,
  pb: PocketBase,
  force: boolean
): Promise<{ success: boolean; message: string }> {
  // Convert table name to collection name
  // "companies" -> "customer_relations_companies"
  // "driver-schedules" -> "transport_management_driver_schedules"
  const schemaSnakeCase = schema.replace(/-/g, "_");
  const tableSnakeCase = toSnakeCase(table);
  const collectionName = `${schemaSnakeCase}_${tableSnakeCase}`;

  const singularTable = toSingular(tableSnakeCase);
  const componentName = toPascalCase(singularTable);
  const kebabCaseTable = toKebabCase(tableSnakeCase);

  const controlDir = `src/components/controls/${schema}`;
  const filePath = `${controlDir}/${kebabCaseTable}.tsx`;

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    if (!force) {
      return {
        success: false,
        message: `⏭️  Skipped: ${filePath} (use --force to overwrite)`,
      };
    }
  }

  try {
    const collection = (await pb.collections.getOne(
      collectionName
    )) as PocketBaseCollection;

    if (!collection) {
      return {
        success: false,
        message: `✗ Failed to fetch collection: ${collectionName}`,
      };
    }

    const searchableFields = getSearchableFields(collection);

    // Create directory if it doesn't exist
    if (!fs.existsSync(controlDir)) {
      fs.mkdirSync(controlDir, { recursive: true });
    }

    // Generate and write the component
    const componentContent = generateControlComponent(
      componentName,
      searchableFields
    );
    fs.writeFileSync(filePath, componentContent);

    const searchInfo =
      searchableFields.length > 0
        ? ` (${searchableFields.length} searchable field(s))`
        : "";
    return {
      success: true,
      message: `✓ ${filePath}${searchInfo}`,
    };
  } catch (error) {
    return {
      success: false,
      message: `✗ Error scaffolding ${table}: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

async function scaffoldAllControls(
  pb: PocketBase,
  force: boolean
): Promise<void> {
  console.log("� Fetching all PocketBase collections...");
  const collectionList =
    (await pb.collections.getFullList()) as PocketBaseCollection[];

  // Filter out system collections (those starting with _)
  const userCollections = collectionList.filter(
    (col) => !col.name.startsWith("_")
  );

  console.log(`✅ Found ${userCollections.length} user collections`);
  console.log("");

  // Map schema prefixes to kebab-case
  const schemaPrefixes: Record<string, string> = {
    billing_management: "billing-management",
    customer_relations: "customer-relations",
    delivery_management: "delivery-management",
    transport_management: "transport-management",
    warehouse_management: "warehouse-management",
  };

  // Group collections by schema
  const collectionsBySchema = new Map<string, string[]>();

  for (const collection of userCollections) {
    let schema = "system";
    let table = collection.name;

    // Extract schema and table name
    for (const [snakePrefix, kebabPrefix] of Object.entries(schemaPrefixes)) {
      if (collection.name.startsWith(snakePrefix)) {
        schema = kebabPrefix;
        table = collection.name.replace(`${snakePrefix}_`, "");
        // Convert table name to kebab-case for consistency
        table = toKebabCase(table);
        break;
      }
    }

    if (!collectionsBySchema.has(schema)) {
      collectionsBySchema.set(schema, []);
    }
    const tables = collectionsBySchema.get(schema);
    if (tables) {
      tables.push(table);
    }
  }

  // Scaffold controls for each schema
  let totalSuccess = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  for (const [schema, tables] of collectionsBySchema) {
    console.log(
      `\n📦 Processing schema: ${colors.yellow}${schema}${colors.reset}`
    );

    for (const table of tables.sort()) {
      try {
        const result = await scaffoldSingleControl(schema, table, pb, force);

        if (result.success) {
          console.log(`  ${colors.green}${result.message}${colors.reset}`);
          totalSuccess++;
        } else if (result.message.includes("Skipped")) {
          console.log(`  ${result.message}`);
          totalSkipped++;
        } else {
          console.log(`  ${colors.red}${result.message}${colors.reset}`);
          totalFailed++;
        }
      } catch (error) {
        console.log(
          `  ${colors.red}✗ Error: ${error instanceof Error ? error.message : String(error)}${colors.reset}`
        );
        totalFailed++;
      }
    }
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(
    `${colors.green}✓ Created: ${totalSuccess}${colors.reset} | ${colors.yellow}⏭️  Skipped: ${totalSkipped}${colors.reset} | ${colors.red}✗ Failed: ${totalFailed}${colors.reset}`
  );
  console.log(`${"=".repeat(60)}`);

  if (totalFailed > 0) {
    process.exit(1);
  }
}

async function main() {
  try {
    // Validate arguments
    const args = process.argv.slice(2);

    if (args.length === 0) {
      console.error(
        `${colors.red}Error: Invalid number of arguments${colors.reset}`
      );
      console.error(
        "Usage: bun scaffold-control.ts <schema> <table> [--force]"
      );
      console.error("       bun scaffold-control.ts --all [--force]");
      console.error(
        "Example: bun scaffold-control.ts customer-relations companies"
      );
      console.error("Example: bun scaffold-control.ts --all --force");
      process.exit(1);
    }

    const isScaffoldAll = args[0] === "--all";
    const force = args.includes("--force");

    console.log("🔗 Connecting to PocketBase...");
    const pb = new PocketBase(POCKETBASE_URL);

    console.log("🔑 Authenticating as admin...");
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);

    if (isScaffoldAll) {
      await scaffoldAllControls(pb, force);
    } else {
      if (args.length < 2) {
        console.error(
          `${colors.red}Error: Invalid number of arguments${colors.reset}`
        );
        console.error(
          "Usage: bun scaffold-control.ts <schema> <table> [--force]"
        );
        console.error("       bun scaffold-control.ts --all [--force]");
        process.exit(1);
      }

      const schema = args[0];
      const table = args[1];

      console.log(`📖 Fetching collection: ${schema}/${table}`);
      const result = await scaffoldSingleControl(schema, table, pb, force);

      if (result.success) {
        console.log(`${colors.green}${result.message}${colors.reset}`);
      } else {
        console.log(`${colors.red}${result.message}${colors.reset}`);
        process.exit(1);
      }
    }
  } catch (error) {
    console.error(
      `${colors.red}Error: ${error instanceof Error ? error.message : String(error)}${colors.reset}`
    );
    process.exit(1);
  }
}

main();
