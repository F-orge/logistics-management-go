CREATE TYPE "crm"."interaction_type" AS ENUM('call', 'meeting', 'text', 'email');--> statement-breakpoint
ALTER TABLE "crm"."notifications" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "crm"."notifications" CASCADE;--> statement-breakpoint
ALTER TABLE "crm"."interactions" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "crm"."interactions" ALTER COLUMN "type" SET DATA TYPE "crm"."interaction_type" USING "type"::"crm"."interaction_type";--> statement-breakpoint
ALTER TABLE "crm"."interactions" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "crm"."interactions" ADD CONSTRAINT "interactions_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "crm"."contacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."interactions" ADD CONSTRAINT "interactions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crm"."interactions" ADD CONSTRAINT "interactions_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "crm"."cases"("id") ON DELETE no action ON UPDATE no action;