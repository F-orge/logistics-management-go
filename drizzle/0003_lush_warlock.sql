CREATE TYPE "crm"."case_priority" AS ENUM('high', 'medium', 'low');--> statement-breakpoint
CREATE TYPE "crm"."case_status" AS ENUM('active', 'resolved', 'cancelled');--> statement-breakpoint
CREATE TYPE "crm"."lead_status" AS ENUM('new', 'attempting-to-contact', 'connected', 'qualified', 'meeting', 'open-deal', 'unqualified', 'customer', 'not-interested', 'cancelled');--> statement-breakpoint
ALTER TABLE "crm"."cases" ALTER COLUMN "status" SET DEFAULT 'active'::"crm"."case_status";--> statement-breakpoint
ALTER TABLE "crm"."cases" ALTER COLUMN "status" SET DATA TYPE "crm"."case_status" USING "status"::"crm"."case_status";--> statement-breakpoint
ALTER TABLE "crm"."cases" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "crm"."cases" ALTER COLUMN "priority" SET DATA TYPE "crm"."case_priority" USING "priority"::"crm"."case_priority";--> statement-breakpoint
ALTER TABLE "crm"."cases" ALTER COLUMN "priority" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "crm"."cases" ALTER COLUMN "owner_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "crm"."companies" ALTER COLUMN "owner_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "crm"."contacts" ALTER COLUMN "owner_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "crm"."leads" ALTER COLUMN "status" SET DEFAULT 'new'::"crm"."lead_status";--> statement-breakpoint
ALTER TABLE "crm"."leads" ALTER COLUMN "status" SET DATA TYPE "crm"."lead_status" USING "status"::"crm"."lead_status";--> statement-breakpoint
ALTER TABLE "crm"."leads" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "crm"."leads" ALTER COLUMN "owner_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "crm"."cases" ADD CONSTRAINT "cases_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."cases" ADD CONSTRAINT "cases_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "crm"."contacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."companies" ADD CONSTRAINT "companies_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."contacts" ADD CONSTRAINT "contacts_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "crm"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."contacts" ADD CONSTRAINT "contacts_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."leads" ADD CONSTRAINT "leads_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."leads" ADD CONSTRAINT "leads_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "crm"."campaigns"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."leads" ADD CONSTRAINT "leads_converted_contact_id_contacts_id_fk" FOREIGN KEY ("converted_contact_id") REFERENCES "crm"."contacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."leads" ADD CONSTRAINT "leads_converted_company_id_companies_id_fk" FOREIGN KEY ("converted_company_id") REFERENCES "crm"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."leads" ADD CONSTRAINT "leads_converted_opportunity_id_opportunities_id_fk" FOREIGN KEY ("converted_opportunity_id") REFERENCES "crm"."opportunities"("id") ON DELETE no action ON UPDATE no action;