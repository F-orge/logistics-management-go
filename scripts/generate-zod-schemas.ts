/**
 * PocketBase Types to Zod Schema Generator
 *
 * This script connects to PocketBase and introspects collections to generate
 * corresponding Zod schemas. Uses the PocketBase Collections API to dynamically
 * gather proper type information.
 *
 * Usage: bun scripts/generate-zod-schemas.ts
 * Environment Variables:
 *   - POCKETBASE_URL: PocketBase server URL (default: http://localhost:8090)
 *   - POCKETBASE_ADMIN_EMAIL: Admin email for authentication
 *   - POCKETBASE_ADMIN_PASSWORD: Admin password for authentication
 *
 * Output: Generated schemas are written to src/pocketbase/schemas/<schema>/<table>.ts
 * Reference: https://pocketbase.io/docs/api-collections/#list-collections
 */

import * as fs from "node:fs";
import * as path from "node:path";
import PocketBase from "pocketbase";

interface FieldInfo {
  name: string;
  type: string;
  isOptional: boolean;
  isArray: boolean;
  isEnum?: boolean;
}

interface RecordTypeInfo {
  name: string;
  fields: FieldInfo[];
  isAuthType: boolean;
  schemaPrefix: string; // e.g., "billing_management", "customer_relations"
}

interface PocketBaseField {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  system?: boolean;
  presentable?: boolean;
  onCreate?: boolean;
  onUpdate?: boolean;
  // For select/multiselect fields
  options?: Record<string, unknown>;
  // For file fields
  maxSelect?: number;
  mimeTypes?: string[];
  // For relation fields
  collectionId?: string;
  collectionName?: string;
}

interface PocketBaseCollection {
  id: string;
  name: string;
  type: string;
  fields?: PocketBaseField[];
  system: boolean;
}

const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://localhost:8090";
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN || "admin@example.com";
const ADMIN_PASSWORD = process.env.POCKETBASE_PASSWORD || "admin@123";

const pbTypesPath = path.join(process.cwd(), "src/lib/pb.types.ts");
const outputBaseDir = path.join(process.cwd(), "src/pocketbase/schemas");

// Ensure output base directory exists
if (!fs.existsSync(outputBaseDir)) {
  fs.mkdirSync(outputBaseDir, { recursive: true });
}

// Extract schema prefix from collection name
// e.g., "billing_management_invoices" -> "billing-management"
// e.g., "users" -> "system"
// e.g., "notifications" -> "system"
function extractSchemaPrefix(collectionName: string): string {
  // Map snake_case prefixes to kebab-case
  const prefixMap: Record<string, string> = {
    billing_management: "billing-management",
    customer_relations: "customer-relations",
    delivery_management: "delivery-management",
    transport_management: "transport-management",
    warehouse_management: "warehouse-management",
  };

  for (const [snakeCase, kebabCase] of Object.entries(prefixMap)) {
    if (collectionName.startsWith(snakeCase)) {
      return kebabCase;
    }
  }

  // System types (users, notifications, etc.)
  return "system";
}

// Convert collection name to TypeScript identifier
// e.g., "billing_management_invoices" -> "BillingManagementInvoices"
function collectionNameToTypeName(collectionName: string): string {
  return collectionName
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

// Map PocketBase field types to Zod validation types
// Reference: https://pocketbase.io/docs/api-collections/#collection-fields
function mapPocketBaseFieldToZod(field: PocketBaseField): {
  zodType: string;
  isArray: boolean;
} {
  const baseType = field.type;
  const options = field.options || {};

  // Most fields are optional unless required is explicitly true
  const isRequired = field.required === true;

  let zodType = "";

  switch (baseType) {
    case "text":
      zodType = "z.string()";
      break;
    case "email":
      zodType = "z.email()";
      break;
    case "url":
      zodType = "z.url()";
      break;
    case "number":
      zodType = "z.number()";
      break;
    case "boolean":
      zodType = "z.boolean()";
      break;
    case "date":
      zodType = "z.iso.date()";
      break;
    case "datetime":
      zodType = "z.iso.datetime()";
      break;
    case "autodate":
      // autodate is PocketBase's automatic timestamp field
      zodType = "z.iso.datetime()";
      break;
    case "select": {
      // For select fields, we can use an enum if values are provided
      const selectValues = (field as any).values;
      const maxSelect = (field as any).maxSelect;

      if (Array.isArray(selectValues) && selectValues.length > 0) {
        const values = (selectValues as string[])
          .map((v) => `"${v}"`)
          .join(", ");

        // Check if this is a multi-select (maxSelect > 1)
        if (maxSelect && maxSelect > 1) {
          zodType = `z.array(z.enum([${values}]))`;
          // Add optional if not required, then return
          if (!isRequired) {
            return { zodType: `${zodType}.optional()`, isArray: true };
          }
          return { zodType, isArray: true };
        } else {
          // Single select
          zodType = `z.enum([${values}])`;
        }
      } else {
        zodType = "z.string()";
      }
      break;
    }
    case "multiselect":
      // Multi-select returns array of strings
      const multiValues = (field as any).values;
      if (Array.isArray(multiValues) && multiValues.length > 0) {
        const values = (multiValues as string[])
          .map((v) => `"${v}"`)
          .join(", ");
        zodType = `z.array(z.enum([${values}]))`;
      } else {
        zodType = "z.array(z.string())";
      }
      return { zodType, isArray: true };
    case "json":
      zodType = "z.unknown()";
      break;
    case "file": {
      // File fields - check maxSelect to determine if array
      const fileMaxSelect = (field as any).maxSelect;
      if (fileMaxSelect && fileMaxSelect > 1) {
        zodType = "z.array(z.string())";
        // Add optional if not required, then return
        if (!isRequired) {
          return { zodType: `${zodType}.optional()`, isArray: true };
        }
        return { zodType, isArray: true };
      }
      zodType = "z.string()";
      break;
    }
    case "relation": {
      // Relation fields - check maxSelect to determine if array
      const relationMaxSelect = (field as any).maxSelect;
      if (relationMaxSelect && relationMaxSelect > 1) {
        zodType = "z.array(z.string())";
        // Add optional if not required, then return
        if (!isRequired) {
          return { zodType: `${zodType}.optional()`, isArray: true };
        }
        return { zodType, isArray: true };
      }
      zodType = "z.string()";
      break;
    }
    case "user":
      zodType = "z.string()";
      break;
    default:
      zodType = "z.unknown()";
  }

  // Add optional modifier if field is not required
  if (!isRequired) {
    zodType = `${zodType}.optional()`;
  }

  return { zodType, isArray: false };
}

// Convert PocketBase collection to RecordTypeInfo
function convertCollectionToRecordType(
  collection: PocketBaseCollection
): RecordTypeInfo {
  const typeName = collectionNameToTypeName(collection.name);
  const schemaPrefix = extractSchemaPrefix(collection.name);
  const isAuthType = collection.type === "auth";

  const fields: FieldInfo[] = [];

  // Process all fields from the collection
  // The fields array includes system fields like id, created, updated
  if (collection.fields && Array.isArray(collection.fields)) {
    for (const field of collection.fields) {
      const { zodType, isArray } = mapPocketBaseFieldToZod(field);
      fields.push({
        name: field.name,
        type: zodType, // Store the Zod type directly
        isOptional: false, // Already handled in mapPocketBaseFieldToZod
        isArray,
      });
    }
  } else {
    // Fallback: add standard fields if fields array is missing
    fields.push({
      name: "id",
      type: "z.string()",
      isOptional: false,
      isArray: false,
    });

    fields.push({
      name: "created",
      type: "z.string().datetime()",
      isOptional: false,
      isArray: false,
    });

    fields.push({
      name: "updated",
      type: "z.string().datetime()",
      isOptional: false,
      isArray: false,
    });
  }

  return {
    name: typeName,
    fields,
    isAuthType,
    schemaPrefix,
  };
}

function generateZodSchema(record: RecordTypeInfo): string {
  // Extract just the table name (remove the schema prefix)
  let tableName = record.name;

  // Remove schema prefix
  for (const prefix of [
    "BillingManagement",
    "CustomerRelations",
    "DeliveryManagement",
    "TransportManagement",
    "WarehouseManagement",
  ]) {
    if (tableName.startsWith(prefix)) {
      tableName = tableName.slice(prefix.length);
      break;
    }
  }

  const schemaName = `${tableName}Schema`;
  let schema = `export const ${schemaName} = z.object({\n`;

  for (const field of record.fields) {
    const fieldName = field.name;
    let zodType = field.type; // Already includes .optional() if needed

    // Handle arrays (for multiselect fields)
    if (field.isArray && !zodType.includes("z.array")) {
      zodType = `z.array(${zodType})`;
    }

    schema += `  ${fieldName}: ${zodType},\n`;
  }

  schema += `});\n\n`;
  schema += `export type ${tableName} = z.infer<typeof ${schemaName}>;\n`;

  return schema;
}

async function main() {
  try {
    console.log("� Connecting to PocketBase...");

    const pb = new PocketBase(POCKETBASE_URL);

    // Authenticate as admin
    console.log("🔑 Authenticating as admin...");
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);

    console.log("📖 Fetching PocketBase collections...");
    // Get all collections from PocketBase API
    // First, get the list of collections
    // Reference: https://pocketbase.io/docs/api-collections/#list-collections
    const collectionList =
      (await pb.collections.getFullList()) as PocketBaseCollection[];

    console.log(`✅ Found ${collectionList.length} collections`);

    // Filter out system collections (those starting with _)
    const userCollectionNames = collectionList
      .filter((col) => !col.name.startsWith("_"))
      .map((col) => col.name);

    console.log(`📦 Processing ${userCollectionNames.length} user collections`);

    // Fetch full collection details (including fields) for each collection
    console.log("📋 Fetching collection details...");
    const userCollections: PocketBaseCollection[] = [];
    for (const collectionName of userCollectionNames) {
      try {
        const fullCollection = (await pb.collections.getOne(
          collectionName
        )) as PocketBaseCollection;
        userCollections.push(fullCollection);
      } catch (error) {
        console.warn(`⚠️  Failed to fetch details for ${collectionName}`);
      }
    }

    console.log(`✅ Fetched ${userCollections.length} collection details`);

    console.log("🔍 Converting collections to record types...");
    const recordTypes: RecordTypeInfo[] = userCollections.map((col) => {
      const record = convertCollectionToRecordType(col);
      return record;
    });

    // Group records by schema prefix
    console.log("🔧 Generating Zod schemas...");
    const recordsBySchema = new Map<string, RecordTypeInfo[]>();

    for (const record of recordTypes) {
      if (!recordsBySchema.has(record.schemaPrefix)) {
        recordsBySchema.set(record.schemaPrefix, []);
      }
      const records = recordsBySchema.get(record.schemaPrefix);
      if (records) {
        records.push(record);
      }
    }

    // Generate files for each schema
    let totalFilesGenerated = 0;

    for (const [schemaPrefix, records] of recordsBySchema) {
      const schemaDir = path.join(outputBaseDir, schemaPrefix);

      // Ensure schema directory exists
      if (!fs.existsSync(schemaDir)) {
        fs.mkdirSync(schemaDir, { recursive: true });
      }

      // Generate individual files for each record type
      for (const record of records) {
        // Extract just the table name (remove the schema prefix)
        // e.g., "BillingManagementInvoices" -> "invoices"
        let tableName = record.name;

        // Remove schema prefix
        for (const prefix of [
          "BillingManagement",
          "CustomerRelations",
          "DeliveryManagement",
          "TransportManagement",
          "WarehouseManagement",
        ]) {
          if (tableName.startsWith(prefix)) {
            tableName = tableName.slice(prefix.length);
            break;
          }
        }

        // Convert to kebab-case
        const fileName = tableName
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase()
          .replace(/^-/, "");

        const filePath = path.join(schemaDir, `${fileName}.ts`);

        const schemaContent = generateZodSchema(record);
        const content = `/**
 * Auto-generated Zod schema for ${record.name}
 * Generated by: scripts/generate-zod-schemas.ts
 * DO NOT EDIT MANUALLY
 */

import { z } from "zod";

${schemaContent}`;

        fs.writeFileSync(filePath, content);
        console.log(`  ✅ Generated ${schemaPrefix}/${fileName}.ts`);
        totalFilesGenerated++;
      }
    }

    // Generate index files for each schema directory
    console.log("\n📋 Generating index files...");
    for (const schemaPrefix of recordsBySchema.keys()) {
      const schemaDir = path.join(outputBaseDir, schemaPrefix);
      const indexPath = path.join(schemaDir, "index.ts");

      const files = fs
        .readdirSync(schemaDir)
        .filter((f) => f.endsWith(".ts") && f !== "index.ts")
        .sort();

      const exports = files
        .map((file) => {
          const moduleName = file.replace(".ts", "");
          return `export * from "./${moduleName}";`;
        })
        .join("\n");

      const indexContent = `/**
 * Auto-generated index file for ${schemaPrefix} schemas
 * Generated by: scripts/generate-zod-schemas.ts
 * DO NOT EDIT MANUALLY
 */

${exports}
`;

      fs.writeFileSync(indexPath, indexContent);
      console.log(`  ✅ Generated ${schemaPrefix}/index.ts`);
    }

    console.log("\n✨ Schema generation complete!");
    console.log(
      `📦 Generated ${totalFilesGenerated} schema files across ${recordsBySchema.size} schema directories`
    );
  } catch (error) {
    console.error("❌ Error generating schemas:", error);
    process.exit(1);
  }
}

main();
