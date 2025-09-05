CREATE SCHEMA "billing";
--> statement-breakpoint
CREATE SCHEMA "crm";
--> statement-breakpoint
CREATE SCHEMA "dms";
--> statement-breakpoint
CREATE SCHEMA "ims";
--> statement-breakpoint
CREATE SCHEMA "portal";
--> statement-breakpoint
CREATE SCHEMA "tms";
--> statement-breakpoint
CREATE SCHEMA "wms";
--> statement-breakpoint
CREATE TABLE "crm"."attachments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"file_name" varchar(128),
	"file_path" varchar(256),
	"mime_type" varchar(64),
	"record_id" uuid,
	"record_type" varchar(64),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."campaigns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"budget" numeric(16, 2),
	"start_date" date,
	"end_date" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."cases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_number" varchar(64),
	"status" varchar(32),
	"priority" varchar(16),
	"type" varchar(32),
	"owner_id" uuid,
	"contact_id" uuid,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"street" varchar(128),
	"city" varchar(64),
	"state" varchar(64),
	"postal_code" varchar(32),
	"country" varchar(64),
	"phone_number" varchar(32),
	"industry" varchar(64),
	"website" varchar(128),
	"annual_revenue" numeric(16, 2),
	"owner_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"email" varchar(128),
	"phone_number" varchar(32),
	"job_title" varchar(64),
	"company_id" uuid,
	"owner_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."interactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contact_id" uuid,
	"user_id" uuid,
	"case_id" uuid,
	"type" varchar(32),
	"outcome" varchar(128),
	"notes" text,
	"interaction_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."invoice_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invoice_id" uuid,
	"product_id" uuid,
	"quantity" integer,
	"price" numeric(16, 2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"opportunity_id" uuid,
	"status" varchar(32),
	"total" numeric(16, 2),
	"issue_date" date,
	"due_date" date,
	"sent_at" timestamp with time zone,
	"paid_at" timestamp with time zone,
	"payment_method" varchar(32),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."leads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"email" varchar(128),
	"lead_source" varchar(64),
	"status" varchar(32),
	"lead_score" integer,
	"owner_id" uuid,
	"campaign_id" uuid,
	"converted_at" timestamp with time zone,
	"converted_contact_id" uuid,
	"converted_company_id" uuid,
	"converted_opportunity_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"message" varchar(256),
	"is_read" boolean,
	"link" varchar(256),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."opportunities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"stage" varchar(32),
	"deal_value" numeric(16, 2),
	"probability" real,
	"expected_close_date" date,
	"lost_reason" text,
	"source" varchar(64),
	"owner_id" uuid,
	"contact_id" uuid,
	"company_id" uuid,
	"campaign_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."opportunity_products" (
	"opportunity_id" uuid,
	"product_id" uuid,
	"quantity" integer
);
--> statement-breakpoint
CREATE TABLE "crm"."products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"sku" varchar(64),
	"price" numeric(16, 2),
	"type" varchar(32),
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."taggings" (
	"tag_id" uuid,
	"record_id" uuid,
	"record_type" varchar(64)
);
--> statement-breakpoint
CREATE TABLE "crm"."tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(64) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."inbound_shipment_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inbound_shipment_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"expected_quantity" integer NOT NULL,
	"received_quantity" integer NOT NULL,
	"discrepancy_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."inbound_shipments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"warehouse_id" uuid NOT NULL,
	"status" varchar(32) NOT NULL,
	"expected_arrival_date" date,
	"actual_arrival_date" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."inventory_adjustments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"warehouse_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"quantity_change" integer NOT NULL,
	"reason" varchar(64) NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."inventory_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"batch_number" varchar(64) NOT NULL,
	"expiration_date" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."inventory_levels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"warehouse_id" uuid NOT NULL,
	"location_id" uuid,
	"batch_id" uuid,
	"quantity_on_hand" integer NOT NULL,
	"quantity_committed" integer NOT NULL,
	"quantity_available" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."outbound_shipment_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"outbound_shipment_id" uuid NOT NULL,
	"sales_order_item_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"batch_id" uuid,
	"quantity_shipped" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."outbound_shipments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sales_order_id" uuid NOT NULL,
	"warehouse_id" uuid NOT NULL,
	"status" varchar(32) NOT NULL,
	"tracking_number" varchar(64),
	"carrier" varchar(64),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."reorder_points" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"warehouse_id" uuid NOT NULL,
	"threshold" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."return_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"return_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity_expected" integer NOT NULL,
	"quantity_received" integer NOT NULL,
	"condition" varchar(32),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."returns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"return_number" varchar(64) NOT NULL,
	"sales_order_id" uuid NOT NULL,
	"client_id" uuid NOT NULL,
	"status" varchar(32) NOT NULL,
	"reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."sales_order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sales_order_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity_ordered" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."sales_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_number" varchar(64) NOT NULL,
	"client_id" uuid NOT NULL,
	"crm_opportunity_id" uuid,
	"status" varchar(32) NOT NULL,
	"shipping_address" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."stock_transfers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"source_warehouse_id" uuid NOT NULL,
	"destination_warehouse_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"status" varchar(32) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ims"."suppliers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"contact_person" varchar(255),
	"email" varchar(255),
	"phone_number" varchar(32),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wms"."bin_thresholds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"location_id" uuid NOT NULL,
	"product_id" varchar(36) NOT NULL,
	"threshold" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wms"."inventory_stock" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" varchar(36) NOT NULL,
	"location_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"status" varchar(32) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wms"."locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"parent_id" uuid,
	"name" varchar(64) NOT NULL,
	"type" varchar(32) NOT NULL,
	"capacity" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wms"."packages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" varchar(36) NOT NULL,
	"weight" integer,
	"length" integer,
	"width" integer,
	"height" integer,
	"shipping_label_url" varchar(256),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wms"."pick_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"strategy" varchar(32) NOT NULL,
	"status" varchar(32) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wms"."putaway_rules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" varchar(36) NOT NULL,
	"preferred_location_id" uuid,
	"rule_type" varchar(32) NOT NULL,
	"value" varchar(64),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wms"."task_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task_id" uuid NOT NULL,
	"operator_id" uuid,
	"completed_at" timestamp with time zone NOT NULL,
	"time_taken_seconds" integer,
	"accuracy" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wms"."tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar(32) NOT NULL,
	"status" varchar(32) NOT NULL,
	"assigned_to" uuid,
	"related_batch_id" uuid,
	"source_location_id" uuid,
	"destination_location_id" uuid,
	"product_id" varchar(36),
	"quantity" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wms"."warehouses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"address" varchar(256),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."drivers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"license_number" varchar(64) NOT NULL,
	"license_expiry_date" date NOT NULL,
	"status" varchar(32) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."driver_schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"driver_id" uuid NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"reason" varchar(32),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"registration_number" varchar(32) NOT NULL,
	"model" varchar(64) NOT NULL,
	"capacity_volume" real,
	"capacity_weight" real,
	"status" varchar(32) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."vehicle_maintenance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"service_date" date NOT NULL,
	"service_type" varchar(32) NOT NULL,
	"cost" numeric(12, 2),
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."trips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"driver_id" uuid NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"status" varchar(32) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."trip_stops" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" uuid NOT NULL,
	"shipment_id" uuid NOT NULL,
	"sequence" integer NOT NULL,
	"address" varchar(256) NOT NULL,
	"status" varchar(32) NOT NULL,
	"estimated_arrival_time" timestamp with time zone,
	"actual_arrival_time" timestamp with time zone,
	"estimated_departure_time" timestamp with time zone,
	"actual_departure_time" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."gps_pings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"timestamp" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."routes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" uuid NOT NULL,
	"optimized_route_data" text,
	"total_distance" real,
	"total_duration" real,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."proof_of_deliveries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_stop_id" uuid NOT NULL,
	"type" varchar(32) NOT NULL,
	"file_path" varchar(256),
	"timestamp" timestamp with time zone NOT NULL,
	"latitude" real,
	"longitude" real,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."expenses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"trip_id" uuid NOT NULL,
	"driver_id" uuid NOT NULL,
	"type" varchar(32) NOT NULL,
	"amount" numeric(12, 2),
	"currency" varchar(8),
	"receipt_url" varchar(256),
	"fuel_quantity" real,
	"odometer_reading" integer,
	"status" varchar(32),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."geofences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(64) NOT NULL,
	"coordinates" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."geofence_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"vehicle_id" uuid NOT NULL,
	"geofence_id" uuid NOT NULL,
	"event_type" varchar(16) NOT NULL,
	"timestamp" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."carriers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"contact_details" varchar(256),
	"services_offered" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."carrier_rates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"carrier_id" uuid NOT NULL,
	"service_type" varchar(32) NOT NULL,
	"origin" varchar(128) NOT NULL,
	"destination" varchar(128) NOT NULL,
	"rate" numeric(12, 2),
	"unit" varchar(32),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."shipment_legs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"shipment_id" uuid NOT NULL,
	"leg_sequence" integer NOT NULL,
	"start_location" varchar(128) NOT NULL,
	"end_location" varchar(128) NOT NULL,
	"carrier_id" uuid,
	"internal_trip_id" uuid,
	"status" varchar(32) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."shipment_leg_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"shipment_leg_id" uuid NOT NULL,
	"status_message" varchar(128),
	"location" varchar(128),
	"event_timestamp" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."partner_invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"carrier_id" uuid NOT NULL,
	"invoice_number" varchar(64) NOT NULL,
	"invoice_date" date NOT NULL,
	"total_amount" numeric(12, 2),
	"status" varchar(32) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tms"."partner_invoice_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"partner_invoice_id" uuid NOT NULL,
	"shipment_leg_id" uuid NOT NULL,
	"amount" numeric(12, 2)
);
--> statement-breakpoint
CREATE TABLE "dms"."delivery_routes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"driver_id" uuid NOT NULL,
	"route_date" date NOT NULL,
	"status" varchar(32) NOT NULL,
	"optimized_route_data" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dms"."delivery_tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"package_id" uuid NOT NULL,
	"delivery_route_id" uuid NOT NULL,
	"route_sequence" integer NOT NULL,
	"estimated_arrival_time" timestamp with time zone,
	"status" varchar(32) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dms"."task_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"delivery_task_id" uuid NOT NULL,
	"status" varchar(32) NOT NULL,
	"reason" text,
	"timestamp" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dms"."driver_locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"driver_id" uuid NOT NULL,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"timestamp" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dms"."customer_tracking_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"delivery_task_id" uuid NOT NULL,
	"tracking_token" varchar(64) NOT NULL,
	"is_active" boolean NOT NULL,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing"."rate_cards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(128) NOT NULL,
	"service_type" varchar(32) NOT NULL,
	"is_active" boolean NOT NULL,
	"valid_from" timestamp with time zone,
	"valid_to" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing"."rate_rules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rate_card_id" uuid NOT NULL,
	"condition" varchar(32) NOT NULL,
	"value" varchar(64) NOT NULL,
	"price" numeric(12, 2),
	"pricing_model" varchar(32),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing"."surcharges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(64) NOT NULL,
	"type" varchar(32) NOT NULL,
	"amount" numeric(12, 2),
	"calculation_method" varchar(32),
	"is_active" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing"."quotes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid,
	"origin_details" text,
	"destination_details" text,
	"weight" numeric(12, 2),
	"length" numeric(12, 2),
	"width" numeric(12, 2),
	"height" numeric(12, 2),
	"quoted_price" numeric(12, 2),
	"service_level" varchar(32),
	"expires_at" timestamp with time zone,
	"status" varchar(32),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing"."client_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"credit_limit" numeric(12, 2),
	"available_credit" numeric(12, 2),
	"wallet_balance" numeric(12, 2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing"."account_transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_account_id" uuid NOT NULL,
	"type" varchar(32) NOT NULL,
	"amount" numeric(12, 2),
	"source_record_id" uuid,
	"source_record_type" varchar(32),
	"transaction_date" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing"."invoice_line_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invoice_id" uuid NOT NULL,
	"source_record_id" uuid,
	"source_record_type" varchar(32),
	"description" varchar(256),
	"quantity" integer,
	"unit_price" numeric(12, 2),
	"total_price" numeric(12, 2)
);
--> statement-breakpoint
CREATE TABLE "billing"."payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invoice_id" uuid NOT NULL,
	"amount" numeric(12, 2),
	"payment_method" varchar(32),
	"transaction_id" varchar(64),
	"status" varchar(32),
	"payment_date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "billing"."disputes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"line_item_id" uuid NOT NULL,
	"client_id" uuid NOT NULL,
	"reason" text,
	"status" varchar(32),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing"."credit_notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invoice_id" uuid NOT NULL,
	"dispute_id" uuid,
	"amount" numeric(12, 2),
	"reason" varchar(256),
	"issue_date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "billing"."documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"record_id" uuid NOT NULL,
	"record_type" varchar(32),
	"document_type" varchar(32),
	"file_path" varchar(256),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing"."accounting_sync_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"record_id" uuid NOT NULL,
	"record_type" varchar(32),
	"external_system" varchar(32),
	"external_id" varchar(64),
	"status" varchar(32),
	"error_message" text,
	"last_sync_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "portal"."roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(32) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portal"."permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"action" varchar(32) NOT NULL,
	"subject" varchar(32) NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "portal"."user_roles" (
	"user_id" uuid NOT NULL,
	"role_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portal"."role_permissions" (
	"role_id" uuid NOT NULL,
	"permission_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portal"."user_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"key" varchar(64) NOT NULL,
	"value" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portal"."audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"action" varchar(32) NOT NULL,
	"subject" varchar(32) NOT NULL,
	"subject_id" uuid,
	"details" text,
	"timestamp" timestamp with time zone NOT NULL
);
