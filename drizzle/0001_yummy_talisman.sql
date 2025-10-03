CREATE SCHEMA "crm";
--> statement-breakpoint
CREATE TYPE "crm"."record_type" AS ENUM('companies', 'contacts', 'leads', 'opportunities', 'cases', 'interactions', 'campaigns', 'products', 'invoices');--> statement-breakpoint
CREATE TYPE "crm"."case_priority" AS ENUM('critical', 'high', 'medium', 'low');--> statement-breakpoint
CREATE TYPE "crm"."case_status" AS ENUM('new', 'in-progress', 'waiting-for-customer', 'waiting-for-internal', 'escalated', 'resolved', 'closed', 'cancelled');--> statement-breakpoint
CREATE TYPE "crm"."case_type" AS ENUM('question', 'problem', 'complaint', 'feature-request', 'bug-report', 'technical-support');--> statement-breakpoint
CREATE TYPE "crm"."interaction_type" AS ENUM('call', 'meeting', 'text', 'email');--> statement-breakpoint
CREATE TYPE "crm"."invoice_status" AS ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled');--> statement-breakpoint
CREATE TYPE "crm"."payment_method" AS ENUM('credit-card', 'bank-transfer', 'cash', 'check', 'paypal', 'stripe', 'wire-transfer');--> statement-breakpoint
CREATE TYPE "crm"."lead_source" AS ENUM('website', 'referral', 'social-media', 'email-campaign', 'cold-call', 'event', 'advertisement', 'partner', 'other');--> statement-breakpoint
CREATE TYPE "crm"."lead_status" AS ENUM('new', 'contacted', 'qualified', 'unqualified', 'converted');--> statement-breakpoint
CREATE TYPE "crm"."opportunity_source" AS ENUM('website', 'referral', 'social-media', 'email-campaign', 'cold-call', 'event', 'advertisement', 'partner', 'existing-customer', 'other');--> statement-breakpoint
CREATE TYPE "crm"."opportunity_stage" AS ENUM('prospecting', 'qualification', 'need-analysis', 'demo', 'proposal', 'negotiation', 'closed-won', 'closed-lost');--> statement-breakpoint
CREATE TYPE "crm"."product_type" AS ENUM('service', 'good', 'digital', 'subscription');--> statement-breakpoint
CREATE TABLE "crm"."attachments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"file_path" varchar(500) NOT NULL,
	"mime_type" varchar(100),
	"record_id" uuid,
	"record_type" "crm"."record_type"
);
--> statement-breakpoint
CREATE TABLE "crm"."campaigns" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone NOT NULL,
	"name" varchar(255) NOT NULL,
	"budget" numeric(15, 2),
	"start_date" date,
	"end_date" date
);
--> statement-breakpoint
CREATE TABLE "crm"."cases" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone NOT NULL,
	"case_number" varchar(50) NOT NULL,
	"status" "crm"."case_status",
	"priority" "crm"."case_priority",
	"type" "crm"."case_type",
	"owner_id" text NOT NULL,
	"contact_id" uuid,
	"description" text,
	CONSTRAINT "cases_case_number_unique" UNIQUE("case_number")
);
--> statement-breakpoint
CREATE TABLE "crm"."companies" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone NOT NULL,
	"name" varchar(255) NOT NULL,
	"street" varchar(255),
	"city" varchar(255),
	"state" varchar(255),
	"postal_code" varchar(20),
	"country" varchar(100),
	"phone_number" varchar(20),
	"industry" varchar(100),
	"website" varchar(255),
	"annual_revenue" numeric(2, 15),
	"owner_id" text
);
--> statement-breakpoint
CREATE TABLE "crm"."contacts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(20),
	"job_title" varchar(100),
	"company_id" uuid,
	"owner_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."interactions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone NOT NULL,
	"contact_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"case_id" uuid,
	"type" "crm"."interaction_type",
	"outcome" varchar(128),
	"notes" text,
	"interaction_date" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "crm"."invoice_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone NOT NULL,
	"invoice_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."invoices" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone NOT NULL,
	"opportunity_id" uuid,
	"status" "crm"."invoice_status",
	"total" numeric(15, 2),
	"issue_date" date,
	"due_date" date,
	"sent_at" timestamp with time zone,
	"paid_at" timestamp with time zone,
	"payment_method" "crm"."payment_method"
);
--> statement-breakpoint
CREATE TABLE "crm"."leads" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"lead_source" "crm"."lead_source",
	"status" "crm"."lead_status" DEFAULT 'new',
	"lead_score" integer,
	"owner_id" text NOT NULL,
	"campaign_id" uuid,
	"converted_at" timestamp with time zone,
	"converted_contact_id" uuid,
	"converted_company_id" uuid,
	"converted_opportunity_id" uuid
);
--> statement-breakpoint
CREATE TABLE "crm"."notifications" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone NOT NULL,
	"user_id" text NOT NULL,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false,
	"link" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "crm"."opportunities" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone NOT NULL,
	"name" varchar(255) NOT NULL,
	"stage" "crm"."opportunity_stage",
	"deal_value" numeric(15, 2),
	"probability" real,
	"expected_close_date" date,
	"lost_reason" text,
	"source" "crm"."opportunity_source",
	"owner_id" text NOT NULL,
	"contact_id" uuid,
	"company_id" uuid,
	"campaign_id" uuid
);
--> statement-breakpoint
CREATE TABLE "crm"."opportunity_products" (
	"opportunity_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crm"."products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone NOT NULL,
	"name" varchar(255) NOT NULL,
	"sku" varchar(100),
	"price" numeric(10, 2) NOT NULL,
	"type" "crm"."product_type" DEFAULT 'good',
	"description" text,
	CONSTRAINT "products_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "crm"."taggings" (
	"tag_id" uuid NOT NULL,
	"record_id" uuid NOT NULL,
	"record_type" "crm"."record_type"
);
--> statement-breakpoint
CREATE TABLE "crm"."tags" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "crm"."cases" ADD CONSTRAINT "cases_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."cases" ADD CONSTRAINT "cases_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "crm"."contacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."companies" ADD CONSTRAINT "companies_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."contacts" ADD CONSTRAINT "contacts_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "crm"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."contacts" ADD CONSTRAINT "contacts_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."interactions" ADD CONSTRAINT "interactions_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "crm"."contacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."interactions" ADD CONSTRAINT "interactions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."interactions" ADD CONSTRAINT "interactions_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "crm"."cases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."invoice_items" ADD CONSTRAINT "invoice_items_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "crm"."invoices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."invoice_items" ADD CONSTRAINT "invoice_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "crm"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."invoices" ADD CONSTRAINT "invoices_opportunity_id_opportunities_id_fk" FOREIGN KEY ("opportunity_id") REFERENCES "crm"."opportunities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."leads" ADD CONSTRAINT "leads_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."leads" ADD CONSTRAINT "leads_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "crm"."campaigns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."leads" ADD CONSTRAINT "leads_converted_contact_id_contacts_id_fk" FOREIGN KEY ("converted_contact_id") REFERENCES "crm"."contacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."leads" ADD CONSTRAINT "leads_converted_company_id_companies_id_fk" FOREIGN KEY ("converted_company_id") REFERENCES "crm"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."leads" ADD CONSTRAINT "leads_converted_opportunity_id_opportunities_id_fk" FOREIGN KEY ("converted_opportunity_id") REFERENCES "crm"."opportunities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."notifications" ADD CONSTRAINT "notifications_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."opportunities" ADD CONSTRAINT "opportunities_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."opportunities" ADD CONSTRAINT "opportunities_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "crm"."contacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."opportunities" ADD CONSTRAINT "opportunities_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "crm"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."opportunities" ADD CONSTRAINT "opportunities_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "crm"."campaigns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."opportunity_products" ADD CONSTRAINT "opportunity_products_opportunity_id_opportunities_id_fk" FOREIGN KEY ("opportunity_id") REFERENCES "crm"."opportunities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."opportunity_products" ADD CONSTRAINT "opportunity_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "crm"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."taggings" ADD CONSTRAINT "taggings_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "crm"."tags"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_crm_attachments_record" ON "crm"."attachments" USING btree ("record_type","record_id");--> statement-breakpoint
CREATE INDEX "idx_crm_attachments_mime_type" ON "crm"."attachments" USING btree ("mime_type");--> statement-breakpoint
CREATE INDEX "idx_crm_campaigns_start_date" ON "crm"."campaigns" USING btree ("start_date");--> statement-breakpoint
CREATE INDEX "idx_crm_campaigns_end_date" ON "crm"."campaigns" USING btree ("end_date");--> statement-breakpoint
CREATE INDEX "idx_crm_campaigns_name" ON "crm"."campaigns" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_crm_cases_status" ON "crm"."cases" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_crm_cases_priority" ON "crm"."cases" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "idx_crm_cases_type" ON "crm"."cases" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_crm_cases_owner_id" ON "crm"."cases" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "idx_crm_cases_contact_id" ON "crm"."cases" USING btree ("contact_id");--> statement-breakpoint
CREATE INDEX "idx_crm_cases_case_number" ON "crm"."cases" USING btree ("case_number");--> statement-breakpoint
CREATE INDEX "idx_crm_companies_name" ON "crm"."companies" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_crm_companies_industry" ON "crm"."companies" USING btree ("industry");--> statement-breakpoint
CREATE INDEX "idx_crm_companies_owner_id" ON "crm"."companies" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "idx_crm_companies_country" ON "crm"."companies" USING btree ("country");--> statement-breakpoint
CREATE INDEX "idx_crm_contacts_email" ON "crm"."contacts" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_crm_contacts_company_id" ON "crm"."contacts" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "idx_crm_contacts_owner_id" ON "crm"."contacts" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "idx_crm_contacts_name" ON "crm"."contacts" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_crm_interactions_contact_id" ON "crm"."interactions" USING btree ("contact_id");--> statement-breakpoint
CREATE INDEX "idx_crm_interactions_user_id" ON "crm"."interactions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_crm_interactions_case_id" ON "crm"."interactions" USING btree ("case_id");--> statement-breakpoint
CREATE INDEX "idx_crm_interactions_type" ON "crm"."interactions" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_crm_interactions_interaction_date" ON "crm"."interactions" USING btree ("interaction_date");--> statement-breakpoint
CREATE INDEX "idx_crm_invoice_items_invoice_id" ON "crm"."invoice_items" USING btree ("invoice_id");--> statement-breakpoint
CREATE INDEX "idx_crm_invoice_items_product_id" ON "crm"."invoice_items" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "idx_crm_invoices_opportunity_id" ON "crm"."invoices" USING btree ("opportunity_id");--> statement-breakpoint
CREATE INDEX "idx_crm_invoices_status" ON "crm"."invoices" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_crm_invoices_issue_date" ON "crm"."invoices" USING btree ("issue_date");--> statement-breakpoint
CREATE INDEX "idx_crm_invoices_due_date" ON "crm"."invoices" USING btree ("due_date");--> statement-breakpoint
CREATE INDEX "idx_crm_leads_status" ON "crm"."leads" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_crm_leads_lead_source" ON "crm"."leads" USING btree ("lead_source");--> statement-breakpoint
CREATE INDEX "idx_crm_leads_owner_id" ON "crm"."leads" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "idx_crm_leads_campaign_id" ON "crm"."leads" USING btree ("campaign_id");--> statement-breakpoint
CREATE INDEX "idx_crm_leads_email" ON "crm"."leads" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_crm_leads_converted_at" ON "crm"."leads" USING btree ("converted_at");--> statement-breakpoint
CREATE INDEX "idx_crm_notifications_user_id" ON "crm"."notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_crm_notifications_is_read" ON "crm"."notifications" USING btree ("is_read");--> statement-breakpoint
CREATE INDEX "idx_crm_notifications_created_at" ON "crm"."notifications" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "idx_crm_opportunities_stage" ON "crm"."opportunities" USING btree ("stage");--> statement-breakpoint
CREATE INDEX "idx_crm_opportunities_owner_id" ON "crm"."opportunities" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "idx_crm_opportunities_company_id" ON "crm"."opportunities" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "idx_crm_opportunities_contact_id" ON "crm"."opportunities" USING btree ("contact_id");--> statement-breakpoint
CREATE INDEX "idx_crm_opportunities_campaign_id" ON "crm"."opportunities" USING btree ("campaign_id");--> statement-breakpoint
CREATE INDEX "idx_crm_opportunities_expected_close_date" ON "crm"."opportunities" USING btree ("expected_close_date");--> statement-breakpoint
CREATE INDEX "idx_crm_opportunities_source" ON "crm"."opportunities" USING btree ("source");--> statement-breakpoint
CREATE INDEX "idx_crm_opportunity_products_opportunity_id" ON "crm"."opportunity_products" USING btree ("opportunity_id");--> statement-breakpoint
CREATE INDEX "idx_crm_opportunity_products_product_id" ON "crm"."opportunity_products" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "idx_crm_products_sku" ON "crm"."products" USING btree ("sku");--> statement-breakpoint
CREATE INDEX "idx_crm_products_type" ON "crm"."products" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_crm_products_name" ON "crm"."products" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_crm_taggings_record" ON "crm"."taggings" USING btree ("record_type","record_id");--> statement-breakpoint
CREATE INDEX "idx_crm_taggings_tag_id" ON "crm"."taggings" USING btree ("tag_id");--> statement-breakpoint
CREATE INDEX "idx_crm_tags_name" ON "crm"."tags" USING btree ("name");