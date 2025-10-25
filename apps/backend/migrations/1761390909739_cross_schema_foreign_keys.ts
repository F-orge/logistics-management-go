import { DB } from "@packages/db/db.types";
import type { Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<DB>): Promise<void> {
  console.log("Adding foreign key constraints and updating null references...");

  try {
    // Update TMS trip stops with null shipment_id to link to actual WMS outbound shipments
    await db
      .updateTable("tms.tripStops")
      .set((eb) => ({
        shipmentId: eb
          .selectFrom("wms.outboundShipments")
          .select("id")
          .orderBy("createdAt")
          .limit(1),
      }))
      .where("shipmentId", "is", null)
      .where(
        "id",
        "in",
        (eb) =>
          eb
            .selectFrom("tms.tripStops")
            .select("id")
            .where("shipmentId", "is", null)
            .limit(100) // Update in batches to avoid locking issues
      )
      .execute();

    // Update TMS shipment legs with null shipment_id to link to actual WMS outbound shipments
    await db
      .updateTable("tms.shipmentLegs")
      .set((eb) => ({
        shipmentId: eb
          .selectFrom("wms.outboundShipments")
          .select("id")
          .orderBy("createdAt")
          .limit(1),
      }))
      .where("shipmentId", "is", null)
      .where("id", "in", (eb) =>
        eb
          .selectFrom("tms.shipmentLegs")
          .select("id")
          .where("shipmentId", "is", null)
          .limit(100)
      )
      .execute();

    // Update WMS products with null client_id to link to actual CRM companies
    await db
      .updateTable("wms.products")
      .set((eb) => ({
        clientId: eb
          .selectFrom("crm.companies")
          .select("id")
          .orderBy("createdAt")
          .limit(1),
      }))
      .where("clientId", "is", null)
      .where("id", "in", (eb) =>
        eb
          .selectFrom("wms.products")
          .select("id")
          .where("clientId", "is", null)
          .limit(100)
      )
      .execute();

    // Update WMS sales orders with null crm_opportunity_id to link to actual CRM opportunities
    await db
      .updateTable("wms.salesOrders")
      .set((eb) => ({
        crmOpportunityId: eb
          .selectFrom("crm.opportunities")
          .select("id")
          .orderBy("createdAt")
          .limit(1),
      }))
      .where("crmOpportunityId", "is", null)
      .where("id", "in", (eb) =>
        eb
          .selectFrom("wms.salesOrders")
          .select("id")
          .where("crmOpportunityId", "is", null)
          .limit(100)
      )
      .execute();

    // Update billing invoice line items with null source_record_id to link to actual entities
    await db
      .updateTable("billing.invoiceLineItems")
      .set((eb) => ({
        sourceRecordId: eb
          .selectFrom("wms.outboundShipments")
          .select("id")
          .orderBy("createdAt")
          .limit(1),
        sourceRecordType: "wms_outbound_shipment",
      }))
      .where("sourceRecordId", "is", null)
      .where("sourceRecordType", "is", null)
      .where("id", "in", (eb) =>
        eb
          .selectFrom("billing.invoiceLineItems")
          .select("id")
          .where("sourceRecordId", "is", null)
          .limit(100)
      )
      .execute();

    // Update billing account transactions with null source_record_id to link to actual invoices
    await db
      .updateTable("billing.accountTransactions")
      .set((eb) => ({
        sourceRecordId: eb
          .selectFrom("billing.invoices")
          .select("id")
          .orderBy("createdAt")
          .limit(1),
        sourceRecordType: "billing_invoice",
      }))
      .where("sourceRecordId", "is", null)
      .where("sourceRecordType", "is", null)
      .where("id", "in", (eb) =>
        eb
          .selectFrom("billing.accountTransactions")
          .select("id")
          .where("sourceRecordId", "is", null)
          .limit(100)
      )
      .execute();

    // Add foreign key constraints to prevent future null relationships
    console.log("Adding foreign key constraints...");

    // Add foreign key constraint for TMS trip stops -> WMS outbound shipments
    await db.schema
      .alterTable("tms.tripStops")
      .addForeignKeyConstraint(
        "fk_trip_stops_shipment_id",
        ["shipmentId"],
        "wms.outboundShipments",
        ["id"]
      )
      .onDelete("set null") // Allow soft deletion
      .execute();

    // Add foreign key constraint for TMS shipment legs -> WMS outbound shipments
    await db.schema
      .alterTable("tms.shipmentLegs")
      .addForeignKeyConstraint(
        "fk_shipment_legs_shipment_id",
        ["shipmentId"],
        "wms.outboundShipments",
        ["id"]
      )
      .onDelete("set null")
      .execute();

    // Add foreign key constraint for WMS products -> CRM companies
    await db.schema
      .alterTable("wms.products")
      .addForeignKeyConstraint(
        "fk_products_client_id",
        ["clientId"],
        "crm.companies",
        ["id"]
      )
      .onDelete("set null")
      .execute();

    // Add foreign key constraint for WMS sales orders -> CRM opportunities
    await db.schema
      .alterTable("wms.salesOrders")
      .addForeignKeyConstraint(
        "fk_sales_orders_crm_opportunity_id",
        ["crmOpportunityId"],
        "crm.opportunities",
        ["id"]
      )
      .onDelete("set null")
      .execute();

    console.log("Cross-schema foreign key constraints added successfully!");
  } catch (error) {
    console.error("Error in cross-schema foreign key migration:", error);
    throw error;
  }
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  console.log("Removing cross-schema foreign key constraints...");

  try {
    // Remove foreign key constraints
    await db.schema
      .alterTable("tms.tripStops")
      .dropConstraint("fk_trip_stops_shipment_id")
      .execute();

    await db.schema
      .alterTable("tms.shipmentLegs")
      .dropConstraint("fk_shipment_legs_shipment_id")
      .execute();

    await db.schema
      .alterTable("wms.products")
      .dropConstraint("fk_products_client_id")
      .execute();

    await db.schema
      .alterTable("wms.salesOrders")
      .dropConstraint("fk_sales_orders_crm_opportunity_id")
      .execute();

    console.log("Cross-schema foreign key constraints removed successfully!");
  } catch (error) {
    console.error(
      "Error removing cross-schema foreign key constraints:",
      error
    );
    throw error;
  }
}
