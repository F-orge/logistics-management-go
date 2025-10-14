import { AttachmentSchema } from '@/schemas/crm/attachments';
import { CampaignSchema } from '@/schemas/crm/campaigns';
import { CaseSchema } from '@/schemas/crm/cases';
import { CompanySchema } from '@/schemas/crm/companies';
import { ContactSchema } from '@/schemas/crm/contacts';
import { InteractionSchema } from '@/schemas/crm/interactions';
import { InvoiceSchema } from '@/schemas/crm/invoices';
import { InvoiceItemSchema } from '@/schemas/crm/invoice_items';
import { LeadSchema } from '@/schemas/crm/leads';
import { NotificationSchema } from '@/schemas/crm/notifications';
import { OpportunitySchema } from '@/schemas/crm/opportunities';
import { OpportunityProductSchema } from '@/schemas/crm/opportunity_products';
import { ProductSchema } from '@/schemas/crm/products';
import { repositoryFactory } from './interface';

export const AttachmentRepository = repositoryFactory(
  'crm.attachments',
  AttachmentSchema,
);

export const CampaignRepository = repositoryFactory(
  'crm.campaigns',
  CampaignSchema,
);

export const CaseRepository = repositoryFactory('crm.cases', CaseSchema);
export const CompanyRepository = repositoryFactory('crm.companies', CompanySchema);
export const ContactRepository = repositoryFactory('crm.contacts', ContactSchema);
export const InteractionRepository = repositoryFactory(
  'crm.interactions',
  InteractionSchema,
);

export const InvoiceRepository = repositoryFactory('crm.invoices', InvoiceSchema);
export const InvoiceItemRepository = repositoryFactory(
  'crm.invoiceItems',
  InvoiceItemSchema,
);
export const LeadRepository = repositoryFactory('crm.leads', LeadSchema);
export const NotificationRepository = repositoryFactory(
  'crm.notifications',
  NotificationSchema,
);
export const OpportunityRepository = repositoryFactory(
  'crm.opportunities',
  OpportunitySchema,
);
export const OpportunityProductRepository = repositoryFactory(
  'crm.opportunityProducts',
  OpportunityProductSchema,
);
export const ProductRepository = repositoryFactory('crm.products', ProductSchema);
