import { index, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "../better-auth";
import { entityFields } from "../helpers";
import { crmCases } from "./cases";
import { crmContacts } from "./contacts";
import { crmSchema } from "./schema";

export const interactionTypeEnum = crmSchema.enum("interaction_type", [
  "call",
  "meeting",
  "text",
  "email",
]);

export const crmInteractions = crmSchema.table(
  "interactions",
  {
    ...entityFields,
    contactId: uuid("contact_id")
      .notNull()
      .references(() => crmContacts.id),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    caseId: uuid("case_id").references(() => crmCases.id),
    type: interactionTypeEnum("type"),
    outcome: varchar("outcome", { length: 128 }),
    notes: text("notes"),
    interactionDate: timestamp("interaction_date", { withTimezone: true }),
  },
  (table) => [
    index("idx_crm_interactions_contact_id").on(table.contactId),
    index("idx_crm_interactions_user_id").on(table.userId),
    index("idx_crm_interactions_case_id").on(table.caseId),
    index("idx_crm_interactions_type").on(table.type),
    index("idx_crm_interactions_interaction_date").on(table.interactionDate),
  ],
);
