import { index, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "../better-auth";
import { entityFields } from "../helpers";
import { crmCompanies } from "./companies";
import { crmSchema } from "./schema";

export const crmContacts = crmSchema.table(
  "contacts",
  {
    ...entityFields,
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }),
    jobTitle: varchar("job_title", { length: 100 }),
    companyId: uuid("company_id").references(() => crmCompanies.id),
    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id),
  },
  (table) => [
    index("idx_crm_contacts_email").on(table.email),
    index("idx_crm_contacts_company_id").on(table.companyId),
    index("idx_crm_contacts_owner_id").on(table.ownerId),
    index("idx_crm_contacts_name").on(table.name),
  ],
);
