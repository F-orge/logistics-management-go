import {
  index,
  integer,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "../better-auth";
import { entityFields } from "../helpers";
import { crmCampaigns } from "./campaigns";
import { crmCompanies } from "./companies";
import { crmContacts } from "./contacts";
import { crmOpportunities } from "./opportunities";
import { crmSchema } from "./schema";

export const leadStatusEnum = crmSchema.enum("lead_status", [
  "new",
  "contacted",
  "qualified",
  "unqualified",
  "converted",
]);

export const leadSourceEnum = crmSchema.enum("lead_source", [
  "website",
  "referral",
  "social-media",
  "email-campaign",
  "cold-call",
  "event",
  "advertisement",
  "partner",
  "other",
]);

export const crmLeads = crmSchema.table(
  "leads",
  {
    ...entityFields,
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    leadSource: leadSourceEnum("lead_source"),
    status: leadStatusEnum("status").default("new"),
    leadScore: integer("lead_score"),
    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id),
    campaignId: uuid("campaign_id").references(() => crmCampaigns.id),
    convertedAt: timestamp("converted_at", { withTimezone: true }),
    convertedContactId: uuid("converted_contact_id").references(
      () => crmContacts.id,
    ),
    convertedCompanyId: uuid("converted_company_id").references(
      () => crmCompanies.id,
    ),
    convertedOpportunityId: uuid("converted_opportunity_id").references(
      () => crmOpportunities.id,
    ),
  },
  (table) => [
    index("idx_crm_leads_status").on(table.status),
    index("idx_crm_leads_lead_source").on(table.leadSource),
    index("idx_crm_leads_owner_id").on(table.ownerId),
    index("idx_crm_leads_campaign_id").on(table.campaignId),
    index("idx_crm_leads_email").on(table.email),
    index("idx_crm_leads_converted_at").on(table.convertedAt),
  ],
);
