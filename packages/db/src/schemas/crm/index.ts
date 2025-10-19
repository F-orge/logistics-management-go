import z from "zod";
import { AttachmentSchema } from "./attachments";
import { CampaignSchema } from "./campaigns";
import { CaseSchema } from "./cases";
import { CompanySchema } from "./companies";
import { ContactSchema } from "./contacts";
import { InteractionSchema } from "./interactions";
import { InvoiceItemSchema } from "./invoice_items";
import { InvoiceSchema } from "./invoices";
import { LeadSchema } from "./leads";
import { NotificationSchema } from "./notifications";
import { OpportunitySchema } from "./opportunities";
import { OpportunityProductSchema } from "./opportunity_products";
import { ProductSchema } from "./products";

export default z.object({
  attachments: AttachmentSchema,
  campaigns: CampaignSchema,
  cases: CaseSchema,
  companies: CompanySchema,
  contacts: ContactSchema,
  interactions: InteractionSchema,
  invoiceItems: InvoiceItemSchema,
  invoices: InvoiceSchema,
  leads: LeadSchema,
  notifications: NotificationSchema,
  opportunities: OpportunitySchema,
  opportunityProducts: OpportunityProductSchema,
  products: ProductSchema,
});
