/**
 * PocketBase Types to Zod Schema Generator
 *
 * This script reads the pb.types.ts file and generates corresponding Zod schemas.
 * Usage: bun scripts/generate-zod-schemas.ts
 *
 * Output: Generated schemas are written to src/pocketbase/schemas/<schema>/<table>.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";

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

const pbTypesPath = path.join(process.cwd(), "src/lib/pb.types.ts");
const outputBaseDir = path.join(process.cwd(), "src/pocketbase/schemas");

// Ensure output base directory exists
if (!fs.existsSync(outputBaseDir)) {
  fs.mkdirSync(outputBaseDir, { recursive: true });
}

// Extract schema prefix from a record type name
// e.g., "BillingManagementInvoices" -> "billing-management"
// e.g., "Users" -> "system"
function extractSchemaPrefix(typeName: string): string {
  // Map common prefixes
  const prefixMap: Record<string, string> = {
    BillingManagement: "billing-management",
    CustomerRelations: "customer-relations",
    DeliveryManagement: "delivery-management",
    TransportManagement: "transport-management",
    WarehouseManagement: "warehouse-management",
  };

  for (const [camelCase, kebabCase] of Object.entries(prefixMap)) {
    if (typeName.startsWith(camelCase)) {
      return kebabCase;
    }
  }

  // System types (Users, Notifications, etc.)
  return "system";
}

function parseTypeString(typeStr: string): {
  baseType: string;
  isOptional: boolean;
  isArray: boolean;
} {
  let isOptional = false;
  let isArray = false;

  // Handle optional types (ending with ?)
  if (typeStr.endsWith("?")) {
    isOptional = true;
    typeStr = typeStr.slice(0, -1);
  }

  // Handle array types
  if (typeStr.endsWith("[]")) {
    isArray = true;
    typeStr = typeStr.slice(0, -2);
  }

  // Handle union types with null
  if (typeStr.includes("| null")) {
    isOptional = true;
    typeStr = typeStr.replace("| null", "").trim();
  }

  // Clean up remaining type
  typeStr = typeStr.replace(/^null \| /, "").trim();

  return { baseType: typeStr, isOptional, isArray };
}

function mapTypeToZod(baseType: string, isEnum: boolean = false): string {
  const typeMap: Record<string, string> = {
    string: "z.string()",
    number: "z.number()",
    boolean: "z.boolean()",
    RecordIdString: "z.string()",
    IsoDateString: "z.iso.date()",
    IsoAutoDateString: "z.iso.date()",
    FileNameString: "z.string()",
    HTMLString: "z.string()",
  };

  if (typeMap[baseType]) {
    return typeMap[baseType];
  }

  // Check if it's an enum type - use nativeEnum with PB namespace reference
  if (isEnum && baseType.includes("Options")) {
    return `z.enum(PB.${baseType})`;
  }

  // Default to string
  return "z.string()";
}

function parseRecordType(content: string, typeName: string): RecordTypeInfo {
  const recordRegex = new RegExp(
    `export type ${typeName}Record(?:<.*?>)? = \\{([^}]+)\\};`,
    "s"
  );
  const match = content.match(recordRegex);

  const schemaPrefix = extractSchemaPrefix(typeName);

  if (!match) {
    return { name: typeName, fields: [], isAuthType: false, schemaPrefix };
  }

  const fieldsStr = match[1];
  const fields: FieldInfo[] = [];
  const fieldPattern = /(\w+)(\?)?:\s*([^;]+);/g;

  for (
    let fieldMatch = fieldPattern.exec(fieldsStr);
    fieldMatch !== null;
    fieldMatch = fieldPattern.exec(fieldsStr)
  ) {
    const [, fieldName, optional, typeStr] = fieldMatch;
    const {
      baseType,
      isOptional: typeOptional,
      isArray,
    } = parseTypeString(typeStr);

    fields.push({
      name: fieldName,
      type: baseType,
      isOptional: !!optional || typeOptional,
      isArray,
      isEnum: baseType.includes("Options"),
    });
  }

  return {
    name: typeName,
    fields,
    isAuthType: typeName.includes("Auth"),
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
    let zodType = mapTypeToZod(field.type, field.isEnum);

    // Handle arrays
    if (field.isArray) {
      zodType = `z.array(${zodType})`;
    }

    // Handle optional fields
    if (field.isOptional) {
      zodType = `${zodType}.optional()`;
    }

    schema += `  ${fieldName}: ${zodType},\n`;
  }

  schema += `});\n\n`;
  schema += `export type ${tableName} = z.infer<typeof ${schemaName}>;\n`;

  return schema;
}

function main() {
  try {
    console.log("📖 Reading PocketBase types file...");
    const pbContent = fs.readFileSync(pbTypesPath, "utf-8");

    console.log("🔍 Parsing record types...");

    // Extract all Record type names
    const recordTypeRegex = /export type (\w+Record)(?:<.*?>)? = \{/g;
    const recordTypes: RecordTypeInfo[] = [];

    for (
      let match = recordTypeRegex.exec(pbContent);
      match !== null;
      match = recordTypeRegex.exec(pbContent)
    ) {
      const typeName = match[1].replace("Record", "");
      const recordInfo = parseRecordType(pbContent, typeName);
      recordTypes.push(recordInfo);
    }

    console.log(`✅ Found ${recordTypes.length} record types`);

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

    for (const [schema, records] of recordsBySchema) {
      const schemaDir = path.join(outputBaseDir, schema);

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

        const schema = generateZodSchema(record);
        const content = `/**
 * Auto-generated Zod schema for ${record.name}
 * Generated by: scripts/generate-zod-schemas.ts
 * DO NOT EDIT MANUALLY
 */

import { z } from "zod";
import * as PB from "../../../lib/pb.types";

${schema}`;

        fs.writeFileSync(filePath, content);
        console.log(`  ✅ Generated ${schema}/${fileName}.ts`);
        totalFilesGenerated++;
      }
    }

    // Generate index files for each schema directory
    console.log("\n📋 Generating index files...");
    for (const schema of recordsBySchema.keys()) {
      const schemaDir = path.join(outputBaseDir, schema);
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
 * Auto-generated index file for ${schema} schemas
 * Generated by: scripts/generate-zod-schemas.ts
 * DO NOT EDIT MANUALLY
 */

${exports}
`;

      fs.writeFileSync(indexPath, indexContent);
      console.log(`  ✅ Generated ${schema}/index.ts`);
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
