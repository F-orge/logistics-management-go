/**
 * Field Registry Schema Generator
 *
 * Automatically registers Zod schema fields into fieldRegistry with proper metadata
 * to override auto-generation and provide custom labels, descriptions, input types, and props.
 *
 * Usage:
 *   bun scripts/register-field-schemas.ts [OPTIONS]
 *
 * Options:
 *   --domain <name>      Filter by domain (e.g., transport-management, customer-relations)
 *   --collection <name>  Filter by collection (requires --domain)
 *   --dry-run           Output preview to console without writing files
 *   --force             Skip safety confirmations and write directly
 *
 * Examples:
 *   bun scripts/register-field-schemas.ts --dry-run --domain transport-management --collection partner-invoices
 *   bun scripts/register-field-schemas.ts --domain billing-management --force
 *   bun scripts/register-field-schemas.ts --dry-run
 */

import * as fs from "node:fs/promises";
import * as path from "node:path";

interface CLIArgs {
  domain?: string;
  collection?: string;
  dryRun: boolean;
  force: boolean;
}

interface SchemaConfig {
  domain: string;
  collection: string;
  schemaFilePath: string;
  mutationCreatePath: string;
  mutationUpdatePath: string;
  fields: FieldConfig[];
  importName: string;
}

interface FieldConfig {
  name: string;
  zodType: string;
  isRequired: boolean;
  isArray: boolean;
  isEnum: boolean;
  enumValues?: string[];
  isRelation: boolean;
  isFile: boolean;
  validator?: string;
  description?: string;
  relationCollectionId?: string;
}

interface GeneratedSchema {
  schemaPath: string;
  createSchema: string;
  updateSchema: string;
  warnings: string[];
}

// ============================================================================
// CLI ARGUMENT PARSING
// ============================================================================

function parseArgs(): CLIArgs {
  const args = process.argv.slice(2);
  const parsed: CLIArgs = {
    dryRun: false,
    force: false,
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
      case "--force":
        parsed.force = true;
        break;
    }
  }

  return parsed;
}

// ============================================================================
// SCHEMA.JSON LOADING AND RELATION MAPPING
// ============================================================================

interface PBSchemaField {
  name: string;
  type: string;
  collectionId?: string;
  system?: boolean;
  required?: boolean;
}

interface PBCollection {
  id: string;
  name: string;
  fields: PBSchemaField[];
}

interface RelationMap {
  [collectionName: string]: {
    [fieldName: string]: {
      relationCollectionId: string;
      relationCollectionName: string;
    };
  };
}

async function loadSchemaJson(): Promise<RelationMap> {
  const relationMap: RelationMap = {};

  try {
    const content = await fs.readFile("./scripts/schema.json", "utf-8");
    const schema = JSON.parse(content) as { collections: PBCollection[] };

    // Build collection name to ID mapping
    const collectionIdToName: { [id: string]: string } = {};
    for (const collection of schema.collections) {
      collectionIdToName[collection.id] = collection.name;
    }

    // Build relation field mappings
    for (const collection of schema.collections) {
      relationMap[collection.name] = {};

      for (const field of collection.fields) {
        if (field.type === "relation" && field.collectionId) {
          const relationCollectionName = collectionIdToName[field.collectionId];
          if (relationCollectionName) {
            relationMap[collection.name][field.name] = {
              relationCollectionId: field.collectionId,
              relationCollectionName,
            };
          }
        }
      }
    }
  } catch (_error) {
    console.warn("Warning: Could not load schema.json for relation mapping");
  }

  return relationMap;
}

// ============================================================================
// COLLECTIONS ENUM MAPPING
// ============================================================================

function _buildCollectionsMap(): Map<string, string> {
  // Maps snake_case collection names to their Collections enum reference
  const collectionsMap = new Map<string, string>([
    // Billing Management
    [
      "billing_management_account_transactions",
      "Collections.BillingManagementAccountTransactions",
    ],
    [
      "billing_management_client_accounts",
      "Collections.BillingManagementClientAccounts",
    ],
    [
      "billing_management_credit_notes",
      "Collections.BillingManagementCreditNotes",
    ],
    ["billing_management_disputes", "Collections.BillingManagementDisputes"],
    [
      "billing_management_invoice_line_items",
      "Collections.BillingManagementInvoiceLineItems",
    ],
    ["billing_management_invoices", "Collections.BillingManagementInvoices"],
    ["billing_management_logs", "Collections.BillingManagementLogs"],
    ["billing_management_payments", "Collections.BillingManagementPayments"],
    ["billing_management_quotes", "Collections.BillingManagementQuotes"],
    ["billing_management_rate_cards", "Collections.BillingManagementRateCards"],
    ["billing_management_rate_rules", "Collections.BillingManagementRateRules"],
    [
      "billing_management_surcharges",
      "Collections.BillingManagementSurcharges",
    ],
    // Customer Relations
    ["customer_relations_campaigns", "Collections.CustomerRelationsCampaigns"],
    ["customer_relations_cases", "Collections.CustomerRelationsCases"],
    ["customer_relations_companies", "Collections.CustomerRelationsCompanies"],
    ["customer_relations_contacts", "Collections.CustomerRelationsContacts"],
    [
      "customer_relations_interactions",
      "Collections.CustomerRelationsInteractions",
    ],
    [
      "customer_relations_invoice_items",
      "Collections.CustomerRelationsInvoiceItems",
    ],
    ["customer_relations_invoices", "Collections.CustomerRelationsInvoices"],
    ["customer_relations_leads", "Collections.CustomerRelationsLeads"],
    [
      "customer_relations_opportunities",
      "Collections.CustomerRelationsOpportunities",
    ],
    [
      "customer_relations_opportunity_products",
      "Collections.CustomerRelationsOpportunityProducts",
    ],
    ["customer_relations_products", "Collections.CustomerRelationsProducts"],
    // Delivery Management
    [
      "delivery_management_proof_of_deliveries",
      "Collections.DeliveryManagementProofOfDeliveries",
    ],
    ["delivery_management_routes", "Collections.DeliveryManagementRoutes"],
    [
      "delivery_management_task_events",
      "Collections.DeliveryManagementTaskEvents",
    ],
    ["delivery_management_tasks", "Collections.DeliveryManagementTasks"],
    // Transport Management
    [
      "transport_management_carrier_rates",
      "Collections.TransportManagementCarrierRates",
    ],
    [
      "transport_management_carriers",
      "Collections.TransportManagementCarriers",
    ],
    [
      "transport_management_driver_schedules",
      "Collections.TransportManagementDriverSchedules",
    ],
    ["transport_management_drivers", "Collections.TransportManagementDrivers"],
    [
      "transport_management_expenses",
      "Collections.TransportManagementExpenses",
    ],
    [
      "transport_management_geofence",
      "Collections.TransportManagementGeofence",
    ],
    [
      "transport_management_geofence_events",
      "Collections.TransportManagementGeofenceEvents",
    ],
    [
      "transport_management_gps_pings",
      "Collections.TransportManagementGpsPings",
    ],
    [
      "transport_management_partner_invoice",
      "Collections.TransportManagementPartnerInvoice",
    ],
    [
      "transport_management_partner_invoice_items",
      "Collections.TransportManagementPartnerInvoiceItems",
    ],
    [
      "transport_management_proof_of_deliveries",
      "Collections.TransportManagementProofOfDeliveries",
    ],
    ["transport_management_routes", "Collections.TransportManagementRoutes"],
    [
      "transport_management_shipment_leg_events",
      "Collections.TransportManagementShipmentLegEvents",
    ],
    [
      "transport_management_shipment_legs",
      "Collections.TransportManagementShipmentLegs",
    ],
    [
      "transport_management_trip_stops",
      "Collections.TransportManagementTripStops",
    ],
    ["transport_management_trips", "Collections.TransportManagementTrips"],
    [
      "transport_management_vehicle_maintenance",
      "Collections.TransportManagementVehicleMaintenance",
    ],
    [
      "transport_management_vehicles",
      "Collections.TransportManagementVehicles",
    ],
    // Warehouse Management
    [
      "warehouse_management_bin_threshold",
      "Collections.WarehouseManagementBinThreshold",
    ],
    [
      "warehouse_management_inbound_shipment_items",
      "Collections.WarehouseManagementInboundShipmentItems",
    ],
    [
      "warehouse_management_inbound_shipments",
      "Collections.WarehouseManagementInboundShipments",
    ],
    [
      "warehouse_management_inventory_adjustment",
      "Collections.WarehouseManagementInventoryAdjustment",
    ],
    [
      "warehouse_management_inventory_batches",
      "Collections.WarehouseManagementInventoryBatches",
    ],
    [
      "warehouse_management_inventory_stock",
      "Collections.WarehouseManagementInventoryStock",
    ],
    [
      "warehouse_management_locations",
      "Collections.WarehouseManagementLocations",
    ],
    [
      "warehouse_management_outbound_shipment_items",
      "Collections.WarehouseManagementOutboundShipmentItems",
    ],
    [
      "warehouse_management_outbound_shipments",
      "Collections.WarehouseManagementOutboundShipments",
    ],
    [
      "warehouse_management_package_items",
      "Collections.WarehouseManagementPackageItems",
    ],
    [
      "warehouse_management_packages",
      "Collections.WarehouseManagementPackages",
    ],
    [
      "warehouse_management_pick_batch_items",
      "Collections.WarehouseManagementPickBatchItems",
    ],
    [
      "warehouse_management_pick_batches",
      "Collections.WarehouseManagementPickBatches",
    ],
    [
      "warehouse_management_products",
      "Collections.WarehouseManagementProducts",
    ],
    [
      "warehouse_management_putaway_rules",
      "Collections.WarehouseManagementPutawayRules",
    ],
    [
      "warehouse_management_reorder_points",
      "Collections.WarehouseManagementReorderPoints",
    ],
    [
      "warehouse_management_return_items",
      "Collections.WarehouseManagementReturnItems",
    ],
    ["warehouse_management_returns", "Collections.WarehouseManagementReturns"],
    [
      "warehouse_management_sales_order_items",
      "Collections.WarehouseManagementSalesOrderItems",
    ],
    [
      "warehouse_management_sales_orders",
      "Collections.WarehouseManagementSalesOrders",
    ],
    [
      "warehouse_management_stock_transfer",
      "Collections.WarehouseManagementStockTransfer",
    ],
    [
      "warehouse_management_suppliers",
      "Collections.WarehouseManagementSuppliers",
    ],
    [
      "warehouse_management_task_items",
      "Collections.WarehouseManagementTaskItems",
    ],
    ["warehouse_management_tasks", "Collections.WarehouseManagementTasks"],
    [
      "warehouse_management_warehouses",
      "Collections.WarehouseManagementWarehouses",
    ],
  ]);

  return collectionsMap;
}

// Global relation map (will be loaded at runtime)
let globalRelationMap: RelationMap = {};

function setGlobalRelationMap(map: RelationMap): void {
  globalRelationMap = map;
}

function getRelationCollectionName(collectionId: string): string | null {
  // Extract collection name from relation map using collectionId
  for (const fieldMap of Object.values(globalRelationMap)) {
    for (const fieldRel of Object.values(fieldMap)) {
      if (fieldRel.relationCollectionId === collectionId) {
        return fieldRel.relationCollectionName;
      }
    }
  }
  return null;
}

// ============================================================================
// COLLECTIONS ENUM MAPPING
// ============================================================================

function buildCollectionsMap(): Map<string, string> {
  // Maps snake_case collection names to their Collections enum reference
  const collectionsMap = new Map<string, string>([
    // Billing Management
    [
      "billing_management_account_transactions",
      "Collections.BillingManagementAccountTransactions",
    ],
    [
      "billing_management_client_accounts",
      "Collections.BillingManagementClientAccounts",
    ],
    [
      "billing_management_credit_notes",
      "Collections.BillingManagementCreditNotes",
    ],
    ["billing_management_disputes", "Collections.BillingManagementDisputes"],
    [
      "billing_management_invoice_line_items",
      "Collections.BillingManagementInvoiceLineItems",
    ],
    ["billing_management_invoices", "Collections.BillingManagementInvoices"],
    ["billing_management_logs", "Collections.BillingManagementLogs"],
    ["billing_management_payments", "Collections.BillingManagementPayments"],
    ["billing_management_quotes", "Collections.BillingManagementQuotes"],
    ["billing_management_rate_cards", "Collections.BillingManagementRateCards"],
    ["billing_management_rate_rules", "Collections.BillingManagementRateRules"],
    [
      "billing_management_surcharges",
      "Collections.BillingManagementSurcharges",
    ],
    // Customer Relations
    ["customer_relations_campaigns", "Collections.CustomerRelationsCampaigns"],
    ["customer_relations_cases", "Collections.CustomerRelationsCases"],
    ["customer_relations_companies", "Collections.CustomerRelationsCompanies"],
    ["customer_relations_contacts", "Collections.CustomerRelationsContacts"],
    [
      "customer_relations_interactions",
      "Collections.CustomerRelationsInteractions",
    ],
    [
      "customer_relations_invoice_items",
      "Collections.CustomerRelationsInvoiceItems",
    ],
    ["customer_relations_invoices", "Collections.CustomerRelationsInvoices"],
    ["customer_relations_leads", "Collections.CustomerRelationsLeads"],
    [
      "customer_relations_opportunities",
      "Collections.CustomerRelationsOpportunities",
    ],
    [
      "customer_relations_opportunity_products",
      "Collections.CustomerRelationsOpportunityProducts",
    ],
    ["customer_relations_products", "Collections.CustomerRelationsProducts"],
    // Delivery Management
    [
      "delivery_management_proof_of_deliveries",
      "Collections.DeliveryManagementProofOfDeliveries",
    ],
    ["delivery_management_routes", "Collections.DeliveryManagementRoutes"],
    [
      "delivery_management_task_events",
      "Collections.DeliveryManagementTaskEvents",
    ],
    ["delivery_management_tasks", "Collections.DeliveryManagementTasks"],
    // Transport Management
    [
      "transport_management_carrier_rates",
      "Collections.TransportManagementCarrierRates",
    ],
    [
      "transport_management_carriers",
      "Collections.TransportManagementCarriers",
    ],
    [
      "transport_management_driver_schedules",
      "Collections.TransportManagementDriverSchedules",
    ],
    ["transport_management_drivers", "Collections.TransportManagementDrivers"],
    [
      "transport_management_expenses",
      "Collections.TransportManagementExpenses",
    ],
    [
      "transport_management_geofence",
      "Collections.TransportManagementGeofence",
    ],
    [
      "transport_management_geofence_events",
      "Collections.TransportManagementGeofenceEvents",
    ],
    [
      "transport_management_gps_pings",
      "Collections.TransportManagementGpsPings",
    ],
    [
      "transport_management_partner_invoice",
      "Collections.TransportManagementPartnerInvoice",
    ],
    [
      "transport_management_partner_invoice_items",
      "Collections.TransportManagementPartnerInvoiceItems",
    ],
    [
      "transport_management_proof_of_deliveries",
      "Collections.TransportManagementProofOfDeliveries",
    ],
    ["transport_management_routes", "Collections.TransportManagementRoutes"],
    [
      "transport_management_shipment_leg_events",
      "Collections.TransportManagementShipmentLegEvents",
    ],
    [
      "transport_management_shipment_legs",
      "Collections.TransportManagementShipmentLegs",
    ],
    [
      "transport_management_trip_stops",
      "Collections.TransportManagementTripStops",
    ],
    ["transport_management_trips", "Collections.TransportManagementTrips"],
    [
      "transport_management_vehicle_maintenance",
      "Collections.TransportManagementVehicleMaintenance",
    ],
    [
      "transport_management_vehicles",
      "Collections.TransportManagementVehicles",
    ],
    // Warehouse Management
    [
      "warehouse_management_bin_threshold",
      "Collections.WarehouseManagementBinThreshold",
    ],
    [
      "warehouse_management_inbound_shipment_items",
      "Collections.WarehouseManagementInboundShipmentItems",
    ],
    [
      "warehouse_management_inbound_shipments",
      "Collections.WarehouseManagementInboundShipments",
    ],
    [
      "warehouse_management_inventory_adjustment",
      "Collections.WarehouseManagementInventoryAdjustment",
    ],
    [
      "warehouse_management_inventory_batches",
      "Collections.WarehouseManagementInventoryBatches",
    ],
    [
      "warehouse_management_inventory_stock",
      "Collections.WarehouseManagementInventoryStock",
    ],
    [
      "warehouse_management_locations",
      "Collections.WarehouseManagementLocations",
    ],
    [
      "warehouse_management_outbound_shipment_items",
      "Collections.WarehouseManagementOutboundShipmentItems",
    ],
    [
      "warehouse_management_outbound_shipments",
      "Collections.WarehouseManagementOutboundShipments",
    ],
    [
      "warehouse_management_package_items",
      "Collections.WarehouseManagementPackageItems",
    ],
    [
      "warehouse_management_packages",
      "Collections.WarehouseManagementPackages",
    ],
    [
      "warehouse_management_pick_batch_items",
      "Collections.WarehouseManagementPickBatchItems",
    ],
    [
      "warehouse_management_pick_batches",
      "Collections.WarehouseManagementPickBatches",
    ],
    [
      "warehouse_management_products",
      "Collections.WarehouseManagementProducts",
    ],
    [
      "warehouse_management_putaway_rules",
      "Collections.WarehouseManagementPutawayRules",
    ],
    [
      "warehouse_management_reorder_points",
      "Collections.WarehouseManagementReorderPoints",
    ],
    [
      "warehouse_management_return_items",
      "Collections.WarehouseManagementReturnItems",
    ],
    ["warehouse_management_returns", "Collections.WarehouseManagementReturns"],
    [
      "warehouse_management_sales_order_items",
      "Collections.WarehouseManagementSalesOrderItems",
    ],
    [
      "warehouse_management_sales_orders",
      "Collections.WarehouseManagementSalesOrders",
    ],
    [
      "warehouse_management_stock_transfer",
      "Collections.WarehouseManagementStockTransfer",
    ],
    [
      "warehouse_management_suppliers",
      "Collections.WarehouseManagementSuppliers",
    ],
    [
      "warehouse_management_task_items",
      "Collections.WarehouseManagementTaskItems",
    ],
    ["warehouse_management_tasks", "Collections.WarehouseManagementTasks"],
    [
      "warehouse_management_warehouses",
      "Collections.WarehouseManagementWarehouses",
    ],
  ]);

  return collectionsMap;
}

// ============================================================================
// SCHEMA DISCOVERY
// ============================================================================

async function discoverSchemas(args: CLIArgs): Promise<SchemaConfig[]> {
  const schemasDir = "./src/pocketbase/schemas";
  const actionsDir = "./src/components/actions";
  const schemas: SchemaConfig[] = [];
  const relationMap = await loadSchemaJson();
  setGlobalRelationMap(relationMap);

  try {
    const domains = await fs.readdir(schemasDir, { withFileTypes: true });

    for (const domainDir of domains) {
      if (!domainDir.isDirectory()) continue;

      const domainName = domainDir.name;

      // Filter by domain if specified
      if (args.domain && domainName !== args.domain) continue;

      const domainPath = path.join(schemasDir, domainName);
      const files = await fs.readdir(domainPath);

      for (const file of files) {
        if (!file.endsWith(".ts") || file === "index.ts") continue;

        const collectionName = file.replace(".ts", "");

        // Filter by collection if specified
        if (args.collection && collectionName !== args.collection) continue;

        const schemaFilePath = path.join(domainPath, file);
        const mutationCreatePath = path.join(
          actionsDir,
          domainName,
          collectionName,
          "create.tsx"
        );
        const mutationUpdatePath = path.join(
          actionsDir,
          domainName,
          collectionName,
          "update.tsx"
        );

        // Check if mutation files exist
        try {
          await fs.access(mutationCreatePath);
          await fs.access(mutationUpdatePath);

          const fields = await extractSchemaFields(schemaFilePath);
          const importName = await extractSchemaImportName(mutationCreatePath);

          // Enrich fields with relation information
          const pbCollectionName = `${domainName.replace(/-/g, "_")}_${collectionName.replace(/-/g, "_")}`;
          const collectionRelations = relationMap[pbCollectionName] || {};

          for (const field of fields) {
            if (field.isRelation && collectionRelations[field.name]) {
              field.relationCollectionId =
                collectionRelations[field.name].relationCollectionId;
            }
          }

          schemas.push({
            domain: domainName,
            collection: collectionName,
            schemaFilePath,
            mutationCreatePath,
            mutationUpdatePath,
            fields,
            importName,
          });
        } catch {}
      }
    }
  } catch (error) {
    console.error(`Error discovering schemas: ${error}`);
    process.exit(1);
  }

  return schemas;
}

// ============================================================================
// FIELD EXTRACTION
// ============================================================================

async function extractSchemaImportName(filePath: string): Promise<string> {
  const content = await fs.readFile(filePath, "utf-8");
  const match = content.match(/import \{ (\w+Schema) \} from/);
  return match ? match[1] : "Schema"; // Fallback
}

async function extractSchemaFields(
  schemaFilePath: string
): Promise<FieldConfig[]> {
  const content = await fs.readFile(schemaFilePath, "utf-8");
  const fields: FieldConfig[] = [];

  // Parse the Zod schema object
  const schemaMatch = content.match(
    /export const \w+Schema = z\.object\(\{([\s\S]*?)\}\);/
  );

  if (!schemaMatch) {
    return fields;
  }

  const schemaBody = schemaMatch[1];
  const fieldLines = schemaBody.split("\n").filter((line) => line.trim());

  for (const line of fieldLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("//")) continue;

    // Extract field name and type
    const fieldMatch = trimmed.match(/^(\w+):\s*(.+)/);
    if (!fieldMatch) continue;

    const [, fieldName, typeExpression] = fieldMatch;

    const field: FieldConfig = {
      name: fieldName,
      zodType: extractZodType(typeExpression),
      isRequired: !typeExpression.includes(".optional()"),
      isArray: typeExpression.includes(".array()"),
      isEnum: typeExpression.includes("z.enum"),
      isRelation:
        typeExpression.includes("z.string()") && isLikelyRelation(fieldName),
      isFile: typeExpression.includes("z.file()"),
      validator: extractValidator(typeExpression),
      description: extractDescription(typeExpression),
    };

    // Extract enum values if present
    if (field.isEnum) {
      const enumMatch = typeExpression.match(/z\.enum\(\s*\[(.*?)\]\s*\)/);
      if (enumMatch) {
        field.enumValues = enumMatch[1]
          .split(",")
          .map((v) => v.trim().replace(/^"(.*)"$/, "$1"));
      }
    }

    fields.push(field);
  }

  return fields;
}

function extractZodType(expression: string): string {
  if (expression.includes("z.string")) return "string";
  if (expression.includes("z.number")) return "number";
  if (expression.includes("z.boolean")) return "boolean";
  if (expression.includes("z.date")) return "date";
  if (expression.includes("z.enum")) return "enum";
  if (expression.includes("z.file")) return "file";
  if (expression.includes("z.iso.datetime")) return "datetime";
  return "unknown";
}

function extractValidator(expression: string): string | undefined {
  const match = expression.match(/\.(nonempty|min|max|pattern)\([^)]*\)/);
  return match ? match[0] : undefined;
}

function extractDescription(expression: string): string | undefined {
  const match = expression.match(/\.(\w+)\("([^"]+)"\)/);
  return match ? match[2] : undefined;
}

function isLikelyRelation(fieldName: string): boolean {
  const relationKeywords = [
    "id",
    "carrier",
    "company",
    "contact",
    "product",
    "supplier",
    "warehouse",
    "vehicle",
    "driver",
    "opportunity",
    "lead",
    "account",
  ];
  return relationKeywords.some((kw) => fieldName.toLowerCase().includes(kw));
}

// ============================================================================
// SCHEMA GENERATION
// ============================================================================

function generateCreateSchema(
  domain: string,
  collection: string,
  fields: FieldConfig[],
  importName: string
): { schema: string; warnings: string[] } {
  const warnings: string[] = [];
  const collectionsMap = buildCollectionsMap();

  const fieldLines: string[] = [];

  // Filter out system fields
  const userFields = fields.filter(
    (f) => !["id", "created", "updated"].includes(f.name)
  );

  for (const field of userFields) {
    const id = `${domain}-${collection}-${field.name}-create`;
    const label = toTitleCase(field.name);
    const inputType = getInputType(field);

    if (field.isFile) {
      warnings.push(
        `⚠️  Skipping registration for file field '${field.name}' in ${domain}/${collection}/create - requires manual props configuration`
      );
      continue;
    }

    // Handle relation fields
    if (field.isRelation) {
      if (field.relationCollectionId) {
        const relationCollectionName = getRelationCollectionName(
          field.relationCollectionId
        );

        if (relationCollectionName) {
          const collectionRef = collectionsMap.get(relationCollectionName);
          if (collectionRef) {
            const fieldRegistration = generateRelationFieldRegistration(
              field,
              id,
              label,
              importName,
              collectionRef,
              relationCollectionName
            );
            fieldLines.push(fieldRegistration);
            continue;
          }
        }
      }

      warnings.push(
        `⚠️  Skipping registration for relation field '${field.name}' in ${domain}/${collection}/create - could not resolve target collection`
      );
      continue;
    }

    const fieldRegistration = generateFieldRegistration(
      field,
      id,
      label,
      inputType,
      importName
    );
    fieldLines.push(fieldRegistration);
  }

  const schema = `export const CreateSchema = z.object({
${fieldLines.join(",\n")}
});`;

  return { schema, warnings };
}

function generateUpdateSchema(
  domain: string,
  collection: string,
  fields: FieldConfig[],
  importName: string
): { schema: string; warnings: string[] } {
  const warnings: string[] = [];
  const collectionsMap = buildCollectionsMap();

  const fieldLines: string[] = [];

  // Filter out system fields
  const userFields = fields.filter(
    (f) => !["id", "created", "updated"].includes(f.name)
  );

  for (const field of userFields) {
    const id = `${domain}-${collection}-${field.name}-update`;
    const label = toTitleCase(field.name);
    const inputType = getInputType(field);

    if (field.isFile) {
      warnings.push(
        `⚠️  Skipping registration for file field '${field.name}' in ${domain}/${collection}/update - requires manual props configuration`
      );
      continue;
    }

    // Handle relation fields
    if (field.isRelation) {
      if (field.relationCollectionId) {
        const relationCollectionName = getRelationCollectionName(
          field.relationCollectionId
        );

        if (relationCollectionName) {
          const collectionRef = collectionsMap.get(relationCollectionName);
          if (collectionRef) {
            const fieldRegistration = generateRelationFieldRegistration(
              field,
              id,
              label,
              importName,
              collectionRef,
              relationCollectionName,
              true
            );
            fieldLines.push(fieldRegistration);
            continue;
          }
        }
      }

      warnings.push(
        `⚠️  Skipping registration for relation field '${field.name}' in ${domain}/${collection}/update - could not resolve target collection`
      );
      continue;
    }

    const fieldRegistration = generateFieldRegistration(
      field,
      id,
      label,
      inputType,
      importName,
      true
    );
    fieldLines.push(fieldRegistration);
  }

  const schema = `export const UpdateSchema = z.object({
${fieldLines.join(",\n")}
});`;

  return { schema, warnings };
}

function generateFieldRegistration(
  field: FieldConfig,
  id: string,
  label: string,
  inputType: string,
  schemaImport: string,
  isUpdate: boolean = false
): string {
  const fieldShape = `${schemaImport}.shape.${field.name}`;
  const optionalChain = isUpdate ? `.optional()` : "";

  const registrationMetadata = {
    id: `"${id}"`,
    type: `"field"`,
    label: `"${label}"`,
    description: `"${getFieldDescription(field)}"`,
    inputType: `"${inputType}"`,
  };

  const metadata = Object.entries(registrationMetadata)
    .map(([key, value]) => `${key}: ${value}`)
    .join(",\n\t\t");

  return `\t${field.name}: ${fieldShape}${optionalChain}.register(fieldRegistry, {
\t\t${metadata},
\t})`;
}

function generateRelationFieldRegistration(
  field: FieldConfig,
  id: string,
  label: string,
  schemaImport: string,
  collectionRef: string,
  _relationCollectionName: string,
  isUpdate: boolean = false
): string {
  const fieldShape = `${schemaImport}.shape.${field.name}`;
  const optionalChain = isUpdate ? `.optional()` : "";

  const registrationMetadata = {
    id: `"${id}"`,
    type: `"field"`,
    label: `"${label}"`,
    description: `"${getFieldDescription(field)}"`,
    inputType: `"relation"`,
  };

  const metadata = Object.entries(registrationMetadata)
    .map(([key, value]) => `${key}: ${value}`)
    .join(",\n\t\t");

  // Convert collection name to display field name (guess: usually 'name')
  const displayField = "name";
  const relationshipName = field.name;

  return `\t${field.name}: ${fieldShape}${optionalChain}.register(fieldRegistry, {
\t\t${metadata},
\t\tprops: {
\t\t\tcollectionName: ${collectionRef},
\t\t\tdisplayField: "${displayField}",
\t\t\trelationshipName: "${relationshipName}",
\t\t},
\t})`;
}

function getInputType(field: FieldConfig): string {
  if (field.isFile) return "file";
  if (field.isEnum) return "select";
  if (field.zodType === "email") return "email";
  if (field.zodType === "url") return "url";
  if (field.zodType === "number") return "number";
  if (field.zodType === "boolean") return "boolean";
  if (field.zodType === "date" || field.zodType === "datetime") return "date";
  if (field.isArray) return "textarea";
  if (field.name.toLowerCase().includes("description")) return "textarea";
  return "text";
}

function getFieldDescription(field: FieldConfig): string {
  if (field.description) return field.description;
  return `Enter ${toArticle(field.name)} ${toTitleCase(field.name).toLowerCase()}`;
}

function toTitleCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toArticle(str: string): string {
  return "aeiou".includes(str.charAt(0).toLowerCase()) ? "an" : "a";
}

// ============================================================================
// FILE OPERATIONS
// ============================================================================

async function checkExistingRegistrations(filePath: string): Promise<boolean> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content.includes(".register(fieldRegistry");
  } catch {
    return false;
  }
}

async function generateAllSchemas(
  schemas: SchemaConfig[]
): Promise<GeneratedSchema[]> {
  const generated: GeneratedSchema[] = [];

  for (const schema of schemas) {
    const hasCreate = await checkExistingRegistrations(
      schema.mutationCreatePath
    );
    const hasUpdate = await checkExistingRegistrations(
      schema.mutationUpdatePath
    );

    // Skip if both already have registrations
    if (hasCreate && hasUpdate) {
      continue;
    }

    const createResult = generateCreateSchema(
      schema.domain,
      schema.collection,
      schema.fields,
      schema.importName
    );
    const updateResult = generateUpdateSchema(
      schema.domain,
      schema.collection,
      schema.fields,
      schema.importName
    );

    generated.push({
      schemaPath: `${schema.domain}/${schema.collection}`,
      createSchema: createResult.schema,
      updateSchema: updateResult.schema,
      warnings: [...createResult.warnings, ...updateResult.warnings],
    });
  }

  return generated;
}

async function writeSchemas(
  schemas: SchemaConfig[],
  generated: GeneratedSchema[]
): Promise<void> {
  const generatedMap = new Map(generated.map((g) => [g.schemaPath, g]));

  for (const schema of schemas) {
    const key = `${schema.domain}/${schema.collection}`;
    const genSchema = generatedMap.get(key);

    if (!genSchema) continue;

    // Update create.tsx
    const createContent = await fs.readFile(schema.mutationCreatePath, "utf-8");
    const hasCreateReg = createContent.includes(".register(fieldRegistry");

    if (!hasCreateReg) {
      const updatedCreate = createContent.replace(
        /export const CreateSchema = z\.object\(\{\}\);/,
        genSchema.createSchema
      );
      await fs.writeFile(schema.mutationCreatePath, updatedCreate);
      console.log(`✓ Updated create schema: ${key}/create.tsx`);
    }

    // Update update.tsx
    const updateContent = await fs.readFile(schema.mutationUpdatePath, "utf-8");
    const hasUpdateReg = updateContent.includes(".register(fieldRegistry");

    if (!hasUpdateReg) {
      const updatedUpdate = updateContent.replace(
        /export const UpdateSchema = z\.object\(\{\}\);/,
        genSchema.updateSchema
      );
      await fs.writeFile(schema.mutationUpdatePath, updatedUpdate);
      console.log(`✓ Updated update schema: ${key}/update.tsx`);
    }
  }
}

// ============================================================================
// DRY RUN OUTPUT
// ============================================================================

function printDryRunPreview(generated: GeneratedSchema[]): void {
  console.log(`\n${"=".repeat(80)}`);
  console.log("DRY RUN PREVIEW - No files will be written");
  console.log(`${"=".repeat(80)}\n`);

  for (const schema of generated) {
    console.log(`📋 ${schema.schemaPath}`);
    console.log("-".repeat(80));

    console.log("\n>>> CREATE SCHEMA");
    console.log(schema.createSchema);

    console.log("\n>>> UPDATE SCHEMA");
    console.log(schema.updateSchema);

    if (schema.warnings.length > 0) {
      console.log("\n>>> WARNINGS");
      for (const warning of schema.warnings) {
        console.log(warning);
      }
    }

    console.log(`\n${"-".repeat(80)}\n`);
  }

  console.log("=".repeat(80));
  console.log(
    "To apply changes, run without --dry-run flag (add --force to skip confirmation)"
  );
  console.log("=".repeat(80));
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = parseArgs();

  console.log("🔍 Discovering schemas...\n");
  const schemas = await discoverSchemas(args);

  if (schemas.length === 0) {
    console.log("No schemas found matching criteria.");
    process.exit(0);
  }

  console.log(`Found ${schemas.length} schema(s):\n`);
  for (const schema of schemas) {
    console.log(`  - ${schema.domain}/${schema.collection}`);
  }
  console.log();

  console.log("📝 Generating field registrations...\n");
  const generated = await generateAllSchemas(schemas);

  if (generated.length === 0) {
    console.log(
      "✓ All schemas already have field registrations. No updates needed.\n"
    );
    process.exit(0);
  }

  if (args.dryRun) {
    printDryRunPreview(generated);
  } else {
    console.log("Writing schemas...\n");
    await writeSchemas(schemas, generated);
    console.log(
      "\n✓ Field registration complete! All schemas have been updated.\n"
    );

    // Print warnings
    const allWarnings = generated.flatMap((g) => g.warnings);
    if (allWarnings.length > 0) {
      console.log("Warnings:");
      for (const warning of allWarnings) {
        console.log(warning);
      }
      console.log();
    }
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
