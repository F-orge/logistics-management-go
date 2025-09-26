/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  /**
   * ISO 8601 calendar date without timezone.
   * Format: %Y-%m-%d
   *
   * # Examples
   *
   * * `1994-11-13`
   * * `2000-02-24`
   */
  NaiveDate: { input: any; output: any; }
  /**
   * A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as
   * Strings within GraphQL. UUIDs are used to assign unique identifiers to
   * entities without requiring a central allocating authority.
   *
   * # References
   *
   * * [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
   * * [RFC4122: A Universally Unique Identifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122)
   */
  UUID: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AuthMutation = {
  __typename?: 'AuthMutation';
  changePassword: Scalars['String']['output'];
  refreshSession: RefreshSessionResponse;
  revokeSession: RevokeSessionResponse;
  signInEmail: SignInResponse;
  signUpEmail: SignUpResponse;
};


export type AuthMutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type AuthMutationRevokeSessionArgs = {
  token: Scalars['String']['input'];
};


export type AuthMutationSignInEmailArgs = {
  payload: SignInEmailInput;
};


export type AuthMutationSignUpEmailArgs = {
  payload: SignUpEmailInput;
};

export type AuthQuery = {
  __typename?: 'AuthQuery';
  me: AuthUser;
  user?: Maybe<AuthUser>;
  users: Array<AuthUser>;
};


export type AuthQueryUserArgs = {
  id: Scalars['UUID']['input'];
};


export type AuthQueryUsersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  banExpires?: Maybe<Scalars['DateTime']['output']>;
  banReason?: Maybe<Scalars['String']['output']>;
  banned?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['UUID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  role?: Maybe<AuthUserRole>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum AuthUserRole {
  Accountant = 'ACCOUNTANT',
  AccountManager = 'ACCOUNT_MANAGER',
  Admin = 'ADMIN',
  Carrier = 'CARRIER',
  Client = 'CLIENT',
  ClientAdmin = 'CLIENT_ADMIN',
  CustomerSupportAgent = 'CUSTOMER_SUPPORT_AGENT',
  Developer = 'DEVELOPER',
  Dispatcher = 'DISPATCHER',
  Driver = 'DRIVER',
  EndCustomer = 'END_CUSTOMER',
  FinanceManager = 'FINANCE_MANAGER',
  FleetManager = 'FLEET_MANAGER',
  InventoryManager = 'INVENTORY_MANAGER',
  LogisticsCoordinator = 'LOGISTICS_COORDINATOR',
  LogisticsManager = 'LOGISTICS_MANAGER',
  LogisticsPlanner = 'LOGISTICS_PLANNER',
  MarketingManager = 'MARKETING_MANAGER',
  Packer = 'PACKER',
  Picker = 'PICKER',
  PricingAnalyst = 'PRICING_ANALYST',
  ProductManager = 'PRODUCT_MANAGER',
  QcManager = 'QC_MANAGER',
  ReceivingManager = 'RECEIVING_MANAGER',
  ReturnsProcessor = 'RETURNS_PROCESSOR',
  SalesManager = 'SALES_MANAGER',
  SalesRep = 'SALES_REP',
  Sdr = 'SDR',
  TransportManager = 'TRANSPORT_MANAGER',
  User = 'USER',
  WarehouseManager = 'WAREHOUSE_MANAGER',
  WarehouseOperator = 'WAREHOUSE_OPERATOR'
}

export enum CasePriority {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum CaseStatus {
  Cancelled = 'CANCELLED',
  Closed = 'CLOSED',
  Escalated = 'ESCALATED',
  InProgress = 'IN_PROGRESS',
  New = 'NEW',
  Resolved = 'RESOLVED',
  WaitingForCustomer = 'WAITING_FOR_CUSTOMER',
  WaitingForInternal = 'WAITING_FOR_INTERNAL'
}

export enum CaseType {
  BugReport = 'BUG_REPORT',
  Complaint = 'COMPLAINT',
  FeatureRequest = 'FEATURE_REQUEST',
  Problem = 'PROBLEM',
  Question = 'QUESTION',
  TechnicalSupport = 'TECHNICAL_SUPPORT'
}

export type CreateCampaignInput = {
  budget?: InputMaybe<Scalars['Decimal']['input']>;
  endDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type CreateCaseInput = {
  caseNumber: Scalars['String']['input'];
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['UUID']['input'];
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
};

export type CreateCompanyInput = {
  annualRevenue?: InputMaybe<Scalars['Decimal']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateContactInput = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  email: Scalars['String']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CreateInteractionInput = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  contactId: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId: Scalars['UUID']['input'];
};

export type CreateInvoiceInput = {
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  items: Array<CreateInvoiceItemInput>;
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<InvoiceStatus>;
  total?: InputMaybe<Scalars['Decimal']['input']>;
};

export type CreateInvoiceItemInput = {
  price: Scalars['Decimal']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateLeadInput = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  convertedAt?: InputMaybe<Scalars['DateTime']['input']>;
  convertedCompanyId?: InputMaybe<Scalars['UUID']['input']>;
  convertedContactId?: InputMaybe<Scalars['UUID']['input']>;
  convertedOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
  email: Scalars['String']['input'];
  leadScore?: InputMaybe<Scalars['Int']['input']>;
  leadSource?: InputMaybe<LeadSource>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
  status?: InputMaybe<LeadStatus>;
};

export type CreateNotificationInput = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};

export type CreateOpportunityInput = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  dealValue?: InputMaybe<Scalars['Decimal']['input']>;
  expectedCloseDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lostReason?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
  probability?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<OpportunitySource>;
  stage?: InputMaybe<OpportunityStage>;
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
};

export type CrmAttachments = {
  __typename?: 'CrmAttachments';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId?: Maybe<Scalars['UUID']['output']>;
  recordType?: Maybe<RecordType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCampaigns = {
  __typename?: 'CrmCampaigns';
  budget?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  endDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  startDate?: Maybe<Scalars['NaiveDate']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCases = {
  __typename?: 'CrmCases';
  caseNumber: Scalars['String']['output'];
  contact?: Maybe<CrmContacts>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  owner: AuthUser;
  priority?: Maybe<CasePriority>;
  status?: Maybe<CaseStatus>;
  type?: Maybe<CaseType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCompanies = {
  __typename?: 'CrmCompanies';
  annualRevenue?: Maybe<Scalars['Decimal']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<AuthUser>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type CrmContacts = {
  __typename?: 'CrmContacts';
  company?: Maybe<CrmCompanies>;
  companyId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: AuthUser;
  ownerId: Scalars['UUID']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmInteractions = {
  __typename?: 'CrmInteractions';
  case?: Maybe<CrmCases>;
  contact: CrmContacts;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  interactionDate?: Maybe<Scalars['DateTime']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  outcome?: Maybe<Scalars['String']['output']>;
  type?: Maybe<InteractionType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: AuthUser;
};

export type CrmInvoiceItems = {
  __typename?: 'CrmInvoiceItems';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  invoice: CrmInvoices;
  price: Scalars['Decimal']['output'];
  product: CrmProducts;
  quantity: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmInvoices = {
  __typename?: 'CrmInvoices';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dueDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  issueDate?: Maybe<Scalars['NaiveDate']['output']>;
  items: Array<CrmInvoiceItems>;
  opportunity?: Maybe<CrmOpportunities>;
  opportunityId?: Maybe<Scalars['UUID']['output']>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  paymentMethod?: Maybe<PaymentMethod>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<InvoiceStatus>;
  total?: Maybe<Scalars['Decimal']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CrmInvoicesItemsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type CrmLeads = {
  __typename?: 'CrmLeads';
  campaign?: Maybe<CrmCampaigns>;
  convertedAt?: Maybe<Scalars['DateTime']['output']>;
  convertedContact?: Maybe<CrmContacts>;
  convertedOpportunity?: Maybe<CrmOpportunities>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  leadScore?: Maybe<Scalars['Int']['output']>;
  leadSource?: Maybe<LeadSource>;
  name: Scalars['String']['output'];
  owner: AuthUser;
  status?: Maybe<LeadStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmMutations = {
  __typename?: 'CrmMutations';
  addInvoiceItem: CrmInvoices;
  createCampaign: CrmCampaigns;
  createCase: CrmCases;
  createCompany: CrmCompanies;
  createContact: CrmContacts;
  createInteraction: CrmInteractions;
  createInvoice: CrmInvoices;
  createLead: CrmLeads;
  createNotification: CrmNotifications;
  createOpportunity: CrmOpportunities;
  createProduct: CrmProducts;
  createTag: CrmTags;
  removeAttachment: Scalars['String']['output'];
  removeCampaign: Scalars['String']['output'];
  removeCase: Scalars['String']['output'];
  removeCompany: Scalars['String']['output'];
  removeContact: Scalars['String']['output'];
  removeInteraction: Scalars['String']['output'];
  removeInvoice: Scalars['String']['output'];
  removeInvoiceItem: CrmInvoices;
  removeLead: Scalars['String']['output'];
  removeNotification: Scalars['String']['output'];
  removeOpportunity: Scalars['String']['output'];
  removeProduct: Scalars['String']['output'];
  removeTag: Scalars['String']['output'];
  updateCampaignBudget: CrmCampaigns;
  updateCampaignEndDate: CrmCampaigns;
  updateCampaignName: CrmCampaigns;
  updateCampaignStartDate: CrmCampaigns;
  updateCaseContactId: CrmCases;
  updateCaseDescription: CrmCases;
  updateCaseNumber: CrmCases;
  updateCaseOwnerId: CrmCases;
  updateCasePriority: CrmCases;
  updateCaseStatus: CrmCases;
  updateCaseType: CrmCases;
  updateCompanyAnnualRevenue: CrmCompanies;
  updateCompanyCity: CrmCompanies;
  updateCompanyCountry: CrmCompanies;
  updateCompanyIndustry: CrmCompanies;
  updateCompanyName: CrmCompanies;
  updateCompanyOwnerId: CrmCompanies;
  updateCompanyPhoneNumber: CrmCompanies;
  updateCompanyPostalCode: CrmCompanies;
  updateCompanyState: CrmCompanies;
  updateCompanyStreet: CrmCompanies;
  updateCompanyWebsite: CrmCompanies;
  updateContactCompanyId: CrmContacts;
  updateContactEmail: CrmContacts;
  updateContactJobTitle: CrmContacts;
  updateContactName: CrmContacts;
  updateContactOwnerId: CrmContacts;
  updateContactPhoneNumber: CrmContacts;
  updateInteractionCaseId: CrmInteractions;
  updateInteractionContactId: CrmInteractions;
  updateInteractionInteractionDate: CrmInteractions;
  updateInteractionNotes: CrmInteractions;
  updateInteractionOutcome: CrmInteractions;
  updateInteractionType: CrmInteractions;
  updateInteractionUserId: CrmInteractions;
  updateInvoiceDueDate: CrmInvoices;
  updateInvoiceIssueDate: CrmInvoices;
  updateInvoiceOpportunityId: CrmInvoices;
  updateInvoicePaidAt: CrmInvoices;
  updateInvoicePaymentMethod: CrmInvoices;
  updateInvoiceSentAt: CrmInvoices;
  updateInvoiceStatus: CrmInvoices;
  updateInvoiceTotal: CrmInvoices;
  updateLeadCampaignId: CrmLeads;
  updateLeadConvertedAt: CrmLeads;
  updateLeadConvertedCompanyId: CrmLeads;
  updateLeadConvertedContactId: CrmLeads;
  updateLeadConvertedOpportunityId: CrmLeads;
  updateLeadEmail: CrmLeads;
  updateLeadLeadScore: CrmLeads;
  updateLeadLeadSource: CrmLeads;
  updateLeadName: CrmLeads;
  updateLeadOwnerId: CrmLeads;
  updateLeadStatus: CrmLeads;
  updateNotificationIsRead: CrmNotifications;
  updateNotificationLink: CrmNotifications;
  updateNotificationMessage: CrmNotifications;
  updateNotificationUserId: CrmNotifications;
  updateOpportunityCampaignId: CrmOpportunities;
  updateOpportunityCompanyId: CrmOpportunities;
  updateOpportunityContactId: CrmOpportunities;
  updateOpportunityDealValue: CrmOpportunities;
  updateOpportunityExpectedCloseDate: CrmOpportunities;
  updateOpportunityLostReason: CrmOpportunities;
  updateOpportunityName: CrmOpportunities;
  updateOpportunityOwnerId: CrmOpportunities;
  updateOpportunityProbability: CrmOpportunities;
  updateOpportunitySource: CrmOpportunities;
  updateOpportunityStage: CrmOpportunities;
  updateProductDescription: CrmProducts;
  updateProductName: CrmProducts;
  updateProductPrice: CrmProducts;
  updateProductSku: CrmProducts;
  updateProductType: CrmProducts;
  updateTagName: CrmTags;
  uploadAttachment: CrmAttachments;
};


export type CrmMutationsAddInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateInvoiceItemInput;
};


export type CrmMutationsCreateCampaignArgs = {
  payload: CreateCampaignInput;
};


export type CrmMutationsCreateCaseArgs = {
  payload: CreateCaseInput;
};


export type CrmMutationsCreateCompanyArgs = {
  payload: CreateCompanyInput;
};


export type CrmMutationsCreateContactArgs = {
  payload: CreateContactInput;
};


export type CrmMutationsCreateInteractionArgs = {
  payload: CreateInteractionInput;
};


export type CrmMutationsCreateInvoiceArgs = {
  payload: CreateInvoiceInput;
};


export type CrmMutationsCreateLeadArgs = {
  payload: CreateLeadInput;
};


export type CrmMutationsCreateNotificationArgs = {
  payload: CreateNotificationInput;
};


export type CrmMutationsCreateOpportunityArgs = {
  payload: CreateOpportunityInput;
};


export type CrmMutationsCreateProductArgs = {
  payload: CreateProductInput;
};


export type CrmMutationsCreateTagArgs = {
  payload: CreateTagInput;
};


export type CrmMutationsRemoveAttachmentArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveCampaignArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveCaseArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveCompanyArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveContactArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveInteractionArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveInvoiceItemArgs = {
  itemId: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveLeadArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveNotificationArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveOpportunityArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveProductArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveTagArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCampaignBudgetArgs = {
  budget: Scalars['Decimal']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCampaignEndDateArgs = {
  endDate: Scalars['NaiveDate']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCampaignNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateCampaignStartDateArgs = {
  id: Scalars['UUID']['input'];
  startDate: Scalars['NaiveDate']['input'];
};


export type CrmMutationsUpdateCaseContactIdArgs = {
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCaseDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCaseNumberArgs = {
  caseNumber: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCaseOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCasePriorityArgs = {
  id: Scalars['UUID']['input'];
  priority?: InputMaybe<CasePriority>;
};


export type CrmMutationsUpdateCaseStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<CaseStatus>;
};


export type CrmMutationsUpdateCaseTypeArgs = {
  id: Scalars['UUID']['input'];
  type?: InputMaybe<CaseType>;
};


export type CrmMutationsUpdateCompanyAnnualRevenueArgs = {
  annualRevenue?: InputMaybe<Scalars['Decimal']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCompanyCityArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCompanyCountryArgs = {
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCompanyIndustryArgs = {
  id: Scalars['UUID']['input'];
  industry?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateCompanyOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
};


export type CrmMutationsUpdateCompanyPhoneNumberArgs = {
  id: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyPostalCodeArgs = {
  id: Scalars['UUID']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyStateArgs = {
  id: Scalars['UUID']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyStreetArgs = {
  id: Scalars['UUID']['input'];
  street?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyWebsiteArgs = {
  id: Scalars['UUID']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateContactCompanyIdArgs = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateContactEmailArgs = {
  email: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateContactJobTitleArgs = {
  id: Scalars['UUID']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateContactNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateContactOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateContactPhoneNumberArgs = {
  id: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateInteractionCaseIdArgs = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInteractionContactIdArgs = {
  contactId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInteractionInteractionDateArgs = {
  id: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type CrmMutationsUpdateInteractionNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateInteractionOutcomeArgs = {
  id: Scalars['UUID']['input'];
  outcome?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateInteractionTypeArgs = {
  id: Scalars['UUID']['input'];
  type?: InputMaybe<InteractionType>;
};


export type CrmMutationsUpdateInteractionUserIdArgs = {
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInvoiceDueDateArgs = {
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInvoiceIssueDateArgs = {
  id: Scalars['UUID']['input'];
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};


export type CrmMutationsUpdateInvoiceOpportunityIdArgs = {
  id: Scalars['UUID']['input'];
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
};


export type CrmMutationsUpdateInvoicePaidAtArgs = {
  id: Scalars['UUID']['input'];
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type CrmMutationsUpdateInvoicePaymentMethodArgs = {
  id: Scalars['UUID']['input'];
  paymentMethod?: InputMaybe<PaymentMethod>;
};


export type CrmMutationsUpdateInvoiceSentAtArgs = {
  id: Scalars['UUID']['input'];
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type CrmMutationsUpdateInvoiceStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<InvoiceStatus>;
};


export type CrmMutationsUpdateInvoiceTotalArgs = {
  id: Scalars['UUID']['input'];
  total?: InputMaybe<Scalars['Decimal']['input']>;
};


export type CrmMutationsUpdateLeadCampaignIdArgs = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedAtArgs = {
  convertedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedCompanyIdArgs = {
  convertedCompanyId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedContactIdArgs = {
  convertedContactId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedOpportunityIdArgs = {
  convertedOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadEmailArgs = {
  email: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadLeadScoreArgs = {
  id: Scalars['UUID']['input'];
  leadScore?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmMutationsUpdateLeadLeadSourceArgs = {
  id: Scalars['UUID']['input'];
  leadSource?: InputMaybe<LeadSource>;
};


export type CrmMutationsUpdateLeadNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateLeadOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<LeadStatus>;
};


export type CrmMutationsUpdateNotificationIsReadArgs = {
  id: Scalars['UUID']['input'];
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CrmMutationsUpdateNotificationLinkArgs = {
  id: Scalars['UUID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateNotificationMessageArgs = {
  id: Scalars['UUID']['input'];
  message: Scalars['String']['input'];
};


export type CrmMutationsUpdateNotificationUserIdArgs = {
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityCampaignIdArgs = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityCompanyIdArgs = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityContactIdArgs = {
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityDealValueArgs = {
  dealValue?: InputMaybe<Scalars['Decimal']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityExpectedCloseDateArgs = {
  expectedCloseDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityLostReasonArgs = {
  id: Scalars['UUID']['input'];
  lostReason?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateOpportunityNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateOpportunityOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityProbabilityArgs = {
  id: Scalars['UUID']['input'];
  probability?: InputMaybe<Scalars['Float']['input']>;
};


export type CrmMutationsUpdateOpportunitySourceArgs = {
  id: Scalars['UUID']['input'];
  source?: InputMaybe<OpportunitySource>;
};


export type CrmMutationsUpdateOpportunityStageArgs = {
  id: Scalars['UUID']['input'];
  stage?: InputMaybe<OpportunityStage>;
};


export type CrmMutationsUpdateProductDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateProductNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateProductPriceArgs = {
  id: Scalars['UUID']['input'];
  price: Scalars['Decimal']['input'];
};


export type CrmMutationsUpdateProductSkuArgs = {
  id: Scalars['UUID']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateProductTypeArgs = {
  id: Scalars['UUID']['input'];
  type?: InputMaybe<ProductType>;
};


export type CrmMutationsUpdateTagNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUploadAttachmentArgs = {
  file: Scalars['Upload']['input'];
  recordId: Scalars['UUID']['input'];
  recordType: RecordType;
};

export type CrmNotifications = {
  __typename?: 'CrmNotifications';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isRead?: Maybe<Scalars['Boolean']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: AuthUser;
};

export type CrmOpportunities = {
  __typename?: 'CrmOpportunities';
  campaign?: Maybe<CrmCampaigns>;
  company?: Maybe<CrmCompanies>;
  contact?: Maybe<CrmContacts>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dealValue?: Maybe<Scalars['Decimal']['output']>;
  expectedCloseDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  lostReason?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: AuthUser;
  probability?: Maybe<Scalars['Float']['output']>;
  products: Array<CrmProducts>;
  source?: Maybe<OpportunitySource>;
  stage?: Maybe<OpportunityStage>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CrmOpportunitiesProductsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type CrmProducts = {
  __typename?: 'CrmProducts';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ProductType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmQueries = {
  __typename?: 'CrmQueries';
  attachment?: Maybe<CrmAttachments>;
  attachments: Array<CrmAttachments>;
  campaign?: Maybe<CrmCampaigns>;
  campaigns: Array<CrmCampaigns>;
  case?: Maybe<CrmCases>;
  cases: Array<CrmCases>;
  companies: Array<CrmCompanies>;
  company?: Maybe<CrmCompanies>;
  contact?: Maybe<CrmContacts>;
  contacts: Array<CrmContacts>;
  interaction?: Maybe<CrmInteractions>;
  interactions: Array<CrmInteractions>;
  invoice?: Maybe<CrmInvoices>;
  invoices: Array<CrmInvoices>;
  lead?: Maybe<CrmLeads>;
  leads: Array<CrmLeads>;
  notification?: Maybe<CrmNotifications>;
  notifications: Array<CrmNotifications>;
  opportunities: Array<CrmOpportunities>;
  opportunity?: Maybe<CrmOpportunities>;
  product?: Maybe<CrmProducts>;
  products: Array<CrmProducts>;
  tag?: Maybe<CrmTags>;
  tags: Array<CrmTags>;
};


export type CrmQueriesAttachmentArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesAttachmentsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCampaignArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCampaignsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCaseArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCasesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCompaniesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCompanyArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesContactArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesContactsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesInteractionArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesInteractionsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesInvoicesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesLeadArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesLeadsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesNotificationArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesNotificationsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesOpportunitiesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesOpportunityArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesProductArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesProductsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesTagArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesTagsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type CrmTags = {
  __typename?: 'CrmTags';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum InteractionType {
  Call = 'CALL',
  Email = 'EMAIL',
  Meeting = 'MEETING',
  Text = 'TEXT'
}

export enum InvoiceStatus {
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Sent = 'SENT'
}

export enum LeadSource {
  Advertisement = 'ADVERTISEMENT',
  ColdCall = 'COLD_CALL',
  EmailCampaign = 'EMAIL_CAMPAIGN',
  Event = 'EVENT',
  Other = 'OTHER',
  Partner = 'PARTNER',
  Referral = 'REFERRAL',
  SocialMedia = 'SOCIAL_MEDIA',
  Website = 'WEBSITE'
}

export enum LeadStatus {
  Contacted = 'CONTACTED',
  Converted = 'CONVERTED',
  New = 'NEW',
  Qualified = 'QUALIFIED',
  Unqualified = 'UNQUALIFIED'
}

export type Mutations = {
  __typename?: 'Mutations';
  auth: AuthMutation;
  crm: CrmMutations;
};

export enum OpportunitySource {
  Advertisement = 'ADVERTISEMENT',
  ColdCall = 'COLD_CALL',
  EmailCampaign = 'EMAIL_CAMPAIGN',
  Event = 'EVENT',
  ExistingCustomer = 'EXISTING_CUSTOMER',
  Other = 'OTHER',
  Partner = 'PARTNER',
  Referral = 'REFERRAL',
  SocialMedia = 'SOCIAL_MEDIA',
  Website = 'WEBSITE'
}

export enum OpportunityStage {
  ClosedLost = 'CLOSED_LOST',
  ClosedWon = 'CLOSED_WON',
  Demo = 'DEMO',
  NeedAnalysis = 'NEED_ANALYSIS',
  Negotiation = 'NEGOTIATION',
  Proposal = 'PROPOSAL',
  Prospecting = 'PROSPECTING',
  Qualification = 'QUALIFICATION'
}

export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Cash = 'CASH',
  Check = 'CHECK',
  CreditCard = 'CREDIT_CARD',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
  WireTransfer = 'WIRE_TRANSFER'
}

export enum ProductType {
  Digital = 'DIGITAL',
  Good = 'GOOD',
  Service = 'SERVICE',
  Subscription = 'SUBSCRIPTION'
}

export type Query = {
  __typename?: 'Query';
  auth: AuthQuery;
  crm: CrmQueries;
};

export enum RecordType {
  Campaigns = 'CAMPAIGNS',
  Cases = 'CASES',
  Companies = 'COMPANIES',
  Contacts = 'CONTACTS',
  Interactions = 'INTERACTIONS',
  Invoices = 'INVOICES',
  Leads = 'LEADS',
  Opportunities = 'OPPORTUNITIES',
  Products = 'PRODUCTS'
}

export type RefreshSessionResponse = {
  __typename?: 'RefreshSessionResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type RevokeSessionResponse = {
  __typename?: 'RevokeSessionResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SignInEmailInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type SignUpEmailInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type SignUpEmailMutationVariables = Exact<{
  payload: SignUpEmailInput;
}>;


export type SignUpEmailMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', signUpEmail: { __typename?: 'SignUpResponse', token: string, user: { __typename?: 'AuthUser', name: string, email: string, emailVerified?: boolean | null, image?: string | null, role?: AuthUserRole | null } } } };

export type SignInEmailMutationVariables = Exact<{
  payload: SignInEmailInput;
}>;


export type SignInEmailMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', signInEmail: { __typename?: 'SignInResponse', token: string, user: { __typename?: 'AuthUser', name: string, email: string, emailVerified?: boolean | null, image?: string | null, role?: AuthUserRole | null } } } };

export type RevokeSessionMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RevokeSessionMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', revokeSession: { __typename?: 'RevokeSessionResponse', message: string, success: boolean } } };

export type RefreshSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshSessionMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', refreshSession: { __typename?: 'RefreshSessionResponse', token: string, user: { __typename?: 'AuthUser', name: string, email: string, emailVerified?: boolean | null, image?: string | null, role?: AuthUserRole | null } } } };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', changePassword: string } };

export type CreateCampaignMutationVariables = Exact<{
  payload: CreateCampaignInput;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createCampaign: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, endDate?: any | null, startDate?: any | null, createdAt?: any | null, updatedAt?: any | null } } };

export type CreateCaseMutationVariables = Exact<{
  payload: CreateCaseInput;
}>;


export type CreateCaseMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createCase: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, priority?: CasePriority | null, status?: CaseStatus | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, contact?: { __typename?: 'CrmContacts', email: string, name: string, jobTitle?: string | null, phoneNumber?: string | null, company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, website?: string | null, phoneNumber?: string | null } | null } | null, owner: { __typename?: 'AuthUser', email: string, name: string, image?: string | null, role?: AuthUserRole | null } } } };

export type CreateCompanyMutationVariables = Exact<{
  payload: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createCompany: { __typename?: 'CrmCompanies', id: any, annualRevenue?: any | null, state?: string | null, street?: string | null, updatedAt?: any | null, website?: string | null, city?: string | null, country?: string | null, industry?: string | null, name: string, createdAt?: any | null, phoneNumber?: string | null, postalCode?: string | null, owner?: { __typename?: 'AuthUser', name: string, email: string, image?: string | null, role?: AuthUserRole | null } | null } } };

export type CreateContactMutationVariables = Exact<{
  payload: CreateContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createContact: { __typename?: 'CrmContacts', id: any, email: string, jobTitle?: string | null, name: string, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, website?: string | null, phoneNumber?: string | null } | null, owner: { __typename?: 'AuthUser', name: string, email: string, image?: string | null, role?: AuthUserRole | null } } } };

export type CreateInteractionMutationVariables = Exact<{
  payload: CreateInteractionInput;
}>;


export type CreateInteractionMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createInteraction: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, case?: { __typename?: 'CrmCases', caseNumber: string, contact?: { __typename?: 'CrmContacts', company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, website?: string | null, phoneNumber?: string | null } | null } | null } | null, contact: { __typename?: 'CrmContacts', name: string, jobTitle?: string | null, email: string, phoneNumber?: string | null }, user: { __typename?: 'AuthUser', name: string, email: string, image?: string | null, role?: AuthUserRole | null } } } };

export type CreateInvoiceMutationVariables = Exact<{
  payload: CreateInvoiceInput;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createInvoice: { __typename?: 'CrmInvoices', id: any, status?: InvoiceStatus | null, total?: any | null, dueDate?: any | null, issueDate?: any | null, createdAt?: any | null, updatedAt?: any | null, items: Array<{ __typename?: 'CrmInvoiceItems', price: any, quantity: number, createdAt?: any | null, updatedAt?: any | null, product: { __typename?: 'CrmProducts', name: string, sku?: string | null, description?: string | null } }>, opportunity?: { __typename?: 'CrmOpportunities', stage?: OpportunityStage | null, source?: OpportunitySource | null, campaign?: { __typename?: 'CrmCampaigns', name: string, startDate?: any | null, endDate?: any | null } | null } | null } } };

export type CreateLeadMutationVariables = Exact<{
  payload: CreateLeadInput;
}>;


export type CreateLeadMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createLead: { __typename?: 'CrmLeads', id: any, name: string, status?: LeadStatus | null, convertedAt?: any | null, email: string, leadScore?: number | null, leadSource?: LeadSource | null, createdAt?: any | null, updatedAt?: any | null, campaign?: { __typename?: 'CrmCampaigns', name: string, startDate?: any | null, endDate?: any | null } | null, owner: { __typename?: 'AuthUser', name: string, email: string, image?: string | null, role?: AuthUserRole | null }, convertedContact?: { __typename?: 'CrmContacts', name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, website?: string | null, phoneNumber?: string | null } | null } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', products: Array<{ __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null }> } | null } } };

export type CreateNotificationMutationVariables = Exact<{
  payload: CreateNotificationInput;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createNotification: { __typename?: 'CrmNotifications', id: any, isRead?: boolean | null, link?: string | null, message: string, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', email: string, name: string, image?: string | null, role?: AuthUserRole | null } } } };

export type CreateOpportunityMutationVariables = Exact<{
  payload: CreateOpportunityInput;
}>;


export type CreateOpportunityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createOpportunity: { __typename?: 'CrmOpportunities', id: any, probability?: number | null, source?: OpportunitySource | null, stage?: OpportunityStage | null, dealValue?: any | null, expectedCloseDate?: any | null, lostReason?: string | null, name: string, createdAt?: any | null, updatedAt?: any | null, campaign?: { __typename?: 'CrmCampaigns', name: string, budget?: any | null, startDate?: any | null, endDate?: any | null } | null, products: Array<{ __typename?: 'CrmProducts', name: string, price: any, sku?: string | null, type?: ProductType | null, description?: string | null }>, company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, phoneNumber?: string | null, website?: string | null } | null, contact?: { __typename?: 'CrmContacts', name: string, phoneNumber?: string | null, jobTitle?: string | null, email: string } | null, owner: { __typename?: 'AuthUser', name: string, email: string, image?: string | null, role?: AuthUserRole | null } } } };

export type CreateProductMutationVariables = Exact<{
  payload: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createProduct: { __typename?: 'CrmProducts', id: any, name: string, price: any, description?: string | null, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type CreateTagMutationVariables = Exact<{
  payload: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createTag: { __typename?: 'CrmTags', id: any, name: string } } };

export type RemoveCampaignMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCampaignMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCampaign: string } };

export type RemoveCaseMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCaseMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCase: string } };

export type RemoveCompanyMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCompanyMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCompany: string } };

export type RemoveContactMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveContactMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeContact: string } };

export type RemoveInteractionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveInteractionMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeInteraction: string } };

export type RemoveInvoiceMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveInvoiceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeInvoice: string } };

export type RemoveLeadMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveLeadMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeLead: string } };

export type RemoveNotificationMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveNotificationMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeNotification: string } };

export type RemoveOpportunityMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveOpportunityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeOpportunity: string } };

export type RemoveProductMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeProduct: string } };

export type RemoveTagMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveTagMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeTag: string } };

export type AddInvoiceItemMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  payload: CreateInvoiceItemInput;
}>;


export type AddInvoiceItemMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', addInvoiceItem: { __typename?: 'CrmInvoices', id: any, status?: InvoiceStatus | null, dueDate?: any | null, issueDate?: any | null, total?: any | null, paidAt?: any | null, paymentMethod?: PaymentMethod | null, sentAt?: any | null, createdAt?: any | null, updatedAt?: any | null, items: Array<{ __typename?: 'CrmInvoiceItems', product: { __typename?: 'CrmProducts', name: string, price: any, type?: ProductType | null, sku?: string | null, description?: string | null } }>, opportunity?: { __typename?: 'CrmOpportunities', dealValue?: any | null, source?: OpportunitySource | null, stage?: OpportunityStage | null, contact?: { __typename?: 'CrmContacts', name: string, phoneNumber?: string | null, email: string, company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, website?: string | null, phoneNumber?: string | null } | null } | null, company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, website?: string | null, phoneNumber?: string | null } | null } | null } } };

export type CrmAttachmentQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmAttachmentQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', attachment?: { __typename?: 'CrmAttachments', id: any } | null } };

export type CrmAttachmentsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmAttachmentsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', attachments: Array<{ __typename?: 'CrmAttachments', id: any }> } };

export type CrmCampaignQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmCampaignQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', campaign?: { __typename?: 'CrmCampaigns', id: any } | null } };

export type CrmCampaignsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmCampaignsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', campaigns: Array<{ __typename?: 'CrmCampaigns', id: any }> } };

export type CrmCaseQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmCaseQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', case?: { __typename?: 'CrmCases', id: any } | null } };

export type CrmCasesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmCasesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', cases: Array<{ __typename?: 'CrmCases', id: any }> } };

export type CrmCompaniesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmCompaniesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', companies: Array<{ __typename?: 'CrmCompanies', id: any }> } };

export type CrmCompanyQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmCompanyQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', company?: { __typename?: 'CrmCompanies', id: any } | null } };

export type CrmContactQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmContactQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', contact?: { __typename?: 'CrmContacts', id: any } | null } };

export type CrmContactsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmContactsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', contacts: Array<{ __typename?: 'CrmContacts', id: any }> } };

export type CrmInteractionQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmInteractionQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', interaction?: { __typename?: 'CrmInteractions', id: any } | null } };

export type CrmInteractionsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmInteractionsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', interactions: Array<{ __typename?: 'CrmInteractions', id: any }> } };

export type CrmInvoiceQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmInvoiceQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', invoice?: { __typename?: 'CrmInvoices', id: any } | null } };

export type CrmInvoicesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmInvoicesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', invoices: Array<{ __typename?: 'CrmInvoices', id: any }> } };

export type CrmLeadQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmLeadQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', lead?: { __typename?: 'CrmLeads', id: any } | null } };

export type CrmLeadsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmLeadsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', leads: Array<{ __typename?: 'CrmLeads', id: any }> } };

export type CrmNotificationQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmNotificationQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', notification?: { __typename?: 'CrmNotifications', id: any } | null } };

export type CrmNotificationsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmNotificationsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', notifications: Array<{ __typename?: 'CrmNotifications', id: any }> } };

export type CrmOpportunitiesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmOpportunitiesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', opportunities: Array<{ __typename?: 'CrmOpportunities', id: any }> } };

export type CrmOpportunityQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmOpportunityQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', opportunity?: { __typename?: 'CrmOpportunities', id: any } | null } };

export type CrmProductQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmProductQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', product?: { __typename?: 'CrmProducts', id: any } | null } };

export type CrmProductsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmProductsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', products: Array<{ __typename?: 'CrmProducts', id: any }> } };

export type CrmTagQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmTagQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', tag?: { __typename?: 'CrmTags', id: any } | null } };

export type CrmTagsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmTagsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', tags: Array<{ __typename?: 'CrmTags', id: any }> } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const SignUpEmailDocument = new TypedDocumentString(`
    mutation SignUpEmail($payload: SignUpEmailInput!) {
  auth {
    signUpEmail(payload: $payload) {
      token
      user {
        name
        email
        emailVerified
        image
        role
      }
    }
  }
}
    `) as unknown as TypedDocumentString<SignUpEmailMutation, SignUpEmailMutationVariables>;
export const SignInEmailDocument = new TypedDocumentString(`
    mutation SignInEmail($payload: SignInEmailInput!) {
  auth {
    signInEmail(payload: $payload) {
      token
      user {
        name
        email
        emailVerified
        image
        role
      }
    }
  }
}
    `) as unknown as TypedDocumentString<SignInEmailMutation, SignInEmailMutationVariables>;
export const RevokeSessionDocument = new TypedDocumentString(`
    mutation RevokeSession($token: String!) {
  auth {
    revokeSession(token: $token) {
      message
      success
    }
  }
}
    `) as unknown as TypedDocumentString<RevokeSessionMutation, RevokeSessionMutationVariables>;
export const RefreshSessionDocument = new TypedDocumentString(`
    mutation RefreshSession {
  auth {
    refreshSession {
      token
      user {
        name
        email
        emailVerified
        image
        role
      }
    }
  }
}
    `) as unknown as TypedDocumentString<RefreshSessionMutation, RefreshSessionMutationVariables>;
export const ChangePasswordDocument = new TypedDocumentString(`
    mutation ChangePassword($newPassword: String!, $oldPassword: String!) {
  auth {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
}
    `) as unknown as TypedDocumentString<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateCampaignDocument = new TypedDocumentString(`
    mutation CreateCampaign($payload: CreateCampaignInput!) {
  crm {
    createCampaign(payload: $payload) {
      id
      name
      budget
      endDate
      startDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCampaignMutation, CreateCampaignMutationVariables>;
export const CreateCaseDocument = new TypedDocumentString(`
    mutation CreateCase($payload: CreateCaseInput!) {
  crm {
    createCase(payload: $payload) {
      id
      caseNumber
      contact {
        company {
          name
          industry
          website
          phoneNumber
        }
        email
        name
        jobTitle
        phoneNumber
      }
      description
      owner {
        email
        name
        image
        role
      }
      priority
      status
      type
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCaseMutation, CreateCaseMutationVariables>;
export const CreateCompanyDocument = new TypedDocumentString(`
    mutation CreateCompany($payload: CreateCompanyInput!) {
  crm {
    createCompany(payload: $payload) {
      id
      annualRevenue
      state
      street
      updatedAt
      website
      city
      country
      industry
      name
      owner {
        name
        email
        image
        role
      }
      createdAt
      phoneNumber
      postalCode
    }
  }
}
    `) as unknown as TypedDocumentString<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const CreateContactDocument = new TypedDocumentString(`
    mutation CreateContact($payload: CreateContactInput!) {
  crm {
    createContact(payload: $payload) {
      id
      company {
        name
        industry
        website
        phoneNumber
      }
      email
      jobTitle
      name
      owner {
        name
        email
        image
        role
      }
      phoneNumber
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateContactMutation, CreateContactMutationVariables>;
export const CreateInteractionDocument = new TypedDocumentString(`
    mutation CreateInteraction($payload: CreateInteractionInput!) {
  crm {
    createInteraction(payload: $payload) {
      id
      case {
        caseNumber
        contact {
          company {
            name
            industry
            website
            phoneNumber
          }
        }
      }
      contact {
        name
        jobTitle
        email
        phoneNumber
      }
      interactionDate
      notes
      outcome
      type
      user {
        name
        email
        image
        role
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInteractionMutation, CreateInteractionMutationVariables>;
export const CreateInvoiceDocument = new TypedDocumentString(`
    mutation CreateInvoice($payload: CreateInvoiceInput!) {
  crm {
    createInvoice(payload: $payload) {
      id
      status
      total
      dueDate
      issueDate
      items(page: 0, limit: 20) {
        price
        product {
          name
          sku
          description
        }
        quantity
        createdAt
        updatedAt
      }
      opportunity {
        campaign {
          name
          startDate
          endDate
        }
        stage
        source
      }
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateInvoiceMutation, CreateInvoiceMutationVariables>;
export const CreateLeadDocument = new TypedDocumentString(`
    mutation CreateLead($payload: CreateLeadInput!) {
  crm {
    createLead(payload: $payload) {
      id
      name
      campaign {
        name
        startDate
        endDate
      }
      status
      owner {
        name
        email
        image
        role
      }
      convertedAt
      convertedContact {
        name
        email
        jobTitle
        phoneNumber
        company {
          name
          industry
          website
          phoneNumber
        }
      }
      convertedOpportunity {
        products(page: 0, limit: 20) {
          id
          name
          description
          price
          sku
          type
        }
      }
      email
      leadScore
      leadSource
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateLeadMutation, CreateLeadMutationVariables>;
export const CreateNotificationDocument = new TypedDocumentString(`
    mutation CreateNotification($payload: CreateNotificationInput!) {
  crm {
    createNotification(payload: $payload) {
      id
      isRead
      link
      message
      user {
        email
        name
        image
        role
      }
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateNotificationMutation, CreateNotificationMutationVariables>;
export const CreateOpportunityDocument = new TypedDocumentString(`
    mutation CreateOpportunity($payload: CreateOpportunityInput!) {
  crm {
    createOpportunity(payload: $payload) {
      id
      campaign {
        name
        budget
        startDate
        endDate
      }
      probability
      products(page: 0, limit: 10) {
        name
        price
        sku
        type
        description
      }
      source
      stage
      company {
        name
        industry
        phoneNumber
        website
      }
      contact {
        name
        phoneNumber
        jobTitle
        email
      }
      dealValue
      expectedCloseDate
      lostReason
      name
      owner {
        name
        email
        image
        role
      }
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateOpportunityMutation, CreateOpportunityMutationVariables>;
export const CreateProductDocument = new TypedDocumentString(`
    mutation CreateProduct($payload: CreateProductInput!) {
  crm {
    createProduct(payload: $payload) {
      id
      name
      price
      description
      sku
      type
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<CreateProductMutation, CreateProductMutationVariables>;
export const CreateTagDocument = new TypedDocumentString(`
    mutation CreateTag($payload: CreateTagInput!) {
  crm {
    createTag(payload: $payload) {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<CreateTagMutation, CreateTagMutationVariables>;
export const RemoveCampaignDocument = new TypedDocumentString(`
    mutation RemoveCampaign($id: UUID!) {
  crm {
    removeCampaign(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveCampaignMutation, RemoveCampaignMutationVariables>;
export const RemoveCaseDocument = new TypedDocumentString(`
    mutation RemoveCase($id: UUID!) {
  crm {
    removeCase(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveCaseMutation, RemoveCaseMutationVariables>;
export const RemoveCompanyDocument = new TypedDocumentString(`
    mutation RemoveCompany($id: UUID!) {
  crm {
    removeCompany(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveCompanyMutation, RemoveCompanyMutationVariables>;
export const RemoveContactDocument = new TypedDocumentString(`
    mutation RemoveContact($id: UUID!) {
  crm {
    removeContact(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveContactMutation, RemoveContactMutationVariables>;
export const RemoveInteractionDocument = new TypedDocumentString(`
    mutation RemoveInteraction($id: UUID!) {
  crm {
    removeInteraction(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveInteractionMutation, RemoveInteractionMutationVariables>;
export const RemoveInvoiceDocument = new TypedDocumentString(`
    mutation RemoveInvoice($id: UUID!) {
  crm {
    removeInvoice(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveInvoiceMutation, RemoveInvoiceMutationVariables>;
export const RemoveLeadDocument = new TypedDocumentString(`
    mutation RemoveLead($id: UUID!) {
  crm {
    removeLead(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveLeadMutation, RemoveLeadMutationVariables>;
export const RemoveNotificationDocument = new TypedDocumentString(`
    mutation RemoveNotification($id: UUID!) {
  crm {
    removeNotification(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveNotificationMutation, RemoveNotificationMutationVariables>;
export const RemoveOpportunityDocument = new TypedDocumentString(`
    mutation RemoveOpportunity($id: UUID!) {
  crm {
    removeOpportunity(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveOpportunityMutation, RemoveOpportunityMutationVariables>;
export const RemoveProductDocument = new TypedDocumentString(`
    mutation RemoveProduct($id: UUID!) {
  crm {
    removeProduct(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveProductMutation, RemoveProductMutationVariables>;
export const RemoveTagDocument = new TypedDocumentString(`
    mutation RemoveTag($id: UUID!) {
  crm {
    removeTag(id: $id)
  }
}
    `) as unknown as TypedDocumentString<RemoveTagMutation, RemoveTagMutationVariables>;
export const AddInvoiceItemDocument = new TypedDocumentString(`
    mutation AddInvoiceItem($id: UUID!, $payload: CreateInvoiceItemInput!) {
  crm {
    addInvoiceItem(id: $id, payload: $payload) {
      id
      status
      dueDate
      issueDate
      total
      items(page: 0, limit: 30) {
        product {
          name
          price
          type
          sku
          description
        }
      }
      opportunity {
        dealValue
        contact {
          name
          phoneNumber
          email
          company {
            name
            industry
            website
            phoneNumber
          }
        }
        source
        stage
        company {
          name
          industry
          website
          phoneNumber
        }
      }
      paidAt
      paymentMethod
      sentAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<AddInvoiceItemMutation, AddInvoiceItemMutationVariables>;
export const CrmAttachmentDocument = new TypedDocumentString(`
    query CrmAttachment($id: UUID!) {
  crm {
    attachment(id: $id) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmAttachmentQuery, CrmAttachmentQueryVariables>;
export const CrmAttachmentsDocument = new TypedDocumentString(`
    query CrmAttachments($limit: Int!, $page: Int!) {
  crm {
    attachments(limit: $limit, page: $page) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmAttachmentsQuery, CrmAttachmentsQueryVariables>;
export const CrmCampaignDocument = new TypedDocumentString(`
    query CrmCampaign($id: UUID!) {
  crm {
    campaign(id: $id) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmCampaignQuery, CrmCampaignQueryVariables>;
export const CrmCampaignsDocument = new TypedDocumentString(`
    query CrmCampaigns($limit: Int!, $page: Int!) {
  crm {
    campaigns(limit: $limit, page: $page) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmCampaignsQuery, CrmCampaignsQueryVariables>;
export const CrmCaseDocument = new TypedDocumentString(`
    query CrmCase($id: UUID!) {
  crm {
    case(id: $id) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmCaseQuery, CrmCaseQueryVariables>;
export const CrmCasesDocument = new TypedDocumentString(`
    query CrmCases($limit: Int!, $page: Int!) {
  crm {
    cases(limit: $limit, page: $page) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmCasesQuery, CrmCasesQueryVariables>;
export const CrmCompaniesDocument = new TypedDocumentString(`
    query CrmCompanies($limit: Int!, $page: Int!) {
  crm {
    companies(limit: $limit, page: $page) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmCompaniesQuery, CrmCompaniesQueryVariables>;
export const CrmCompanyDocument = new TypedDocumentString(`
    query CrmCompany($id: UUID!) {
  crm {
    company(id: $id) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmCompanyQuery, CrmCompanyQueryVariables>;
export const CrmContactDocument = new TypedDocumentString(`
    query CrmContact($id: UUID!) {
  crm {
    contact(id: $id) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmContactQuery, CrmContactQueryVariables>;
export const CrmContactsDocument = new TypedDocumentString(`
    query CrmContacts($limit: Int!, $page: Int!) {
  crm {
    contacts(limit: $limit, page: $page) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmContactsQuery, CrmContactsQueryVariables>;
export const CrmInteractionDocument = new TypedDocumentString(`
    query CrmInteraction($id: UUID!) {
  crm {
    interaction(id: $id) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmInteractionQuery, CrmInteractionQueryVariables>;
export const CrmInteractionsDocument = new TypedDocumentString(`
    query CrmInteractions($limit: Int!, $page: Int!) {
  crm {
    interactions(limit: $limit, page: $page) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmInteractionsQuery, CrmInteractionsQueryVariables>;
export const CrmInvoiceDocument = new TypedDocumentString(`
    query CrmInvoice($id: UUID!) {
  crm {
    invoice(id: $id) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmInvoiceQuery, CrmInvoiceQueryVariables>;
export const CrmInvoicesDocument = new TypedDocumentString(`
    query CrmInvoices($limit: Int!, $page: Int!) {
  crm {
    invoices(limit: $limit, page: $page) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmInvoicesQuery, CrmInvoicesQueryVariables>;
export const CrmLeadDocument = new TypedDocumentString(`
    query CrmLead($id: UUID!) {
  crm {
    lead(id: $id) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmLeadQuery, CrmLeadQueryVariables>;
export const CrmLeadsDocument = new TypedDocumentString(`
    query CrmLeads($limit: Int!, $page: Int!) {
  crm {
    leads(limit: $limit, page: $page) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmLeadsQuery, CrmLeadsQueryVariables>;
export const CrmNotificationDocument = new TypedDocumentString(`
    query CrmNotification($id: UUID!) {
  crm {
    notification(id: $id) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmNotificationQuery, CrmNotificationQueryVariables>;
export const CrmNotificationsDocument = new TypedDocumentString(`
    query CrmNotifications($limit: Int!, $page: Int!) {
  crm {
    notifications(limit: $limit, page: $page) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmNotificationsQuery, CrmNotificationsQueryVariables>;
export const CrmOpportunitiesDocument = new TypedDocumentString(`
    query CrmOpportunities($limit: Int!, $page: Int!) {
  crm {
    opportunities(limit: $limit, page: $page) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmOpportunitiesQuery, CrmOpportunitiesQueryVariables>;
export const CrmOpportunityDocument = new TypedDocumentString(`
    query CrmOpportunity($id: UUID!) {
  crm {
    opportunity(id: $id) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmOpportunityQuery, CrmOpportunityQueryVariables>;
export const CrmProductDocument = new TypedDocumentString(`
    query CrmProduct($id: UUID!) {
  crm {
    product(id: $id) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmProductQuery, CrmProductQueryVariables>;
export const CrmProductsDocument = new TypedDocumentString(`
    query CrmProducts($limit: Int!, $page: Int!) {
  crm {
    products(limit: $limit, page: $page) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmProductsQuery, CrmProductsQueryVariables>;
export const CrmTagDocument = new TypedDocumentString(`
    query CrmTag($id: UUID!) {
  crm {
    tag(id: $id) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmTagQuery, CrmTagQueryVariables>;
export const CrmTagsDocument = new TypedDocumentString(`
    query CrmTags($limit: Int!, $page: Int!) {
  crm {
    tags(limit: $limit, page: $page) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<CrmTagsQuery, CrmTagsQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
  /**
   * ISO 8601 calendar date without timezone.
   * Format: %Y-%m-%d
   *
   * # Examples
   *
   * * `1994-11-13`
   * * `2000-02-24`
   */
  NaiveDate: { input: any; output: any; }
  /**
   * A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as
   * Strings within GraphQL. UUIDs are used to assign unique identifiers to
   * entities without requiring a central allocating authority.
   *
   * # References
   *
   * * [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
   * * [RFC4122: A Universally Unique Identifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122)
   */
  UUID: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AuthMutation = {
  __typename?: 'AuthMutation';
  changePassword: Scalars['String']['output'];
  refreshSession: RefreshSessionResponse;
  revokeSession: RevokeSessionResponse;
  signInEmail: SignInResponse;
  signUpEmail: SignUpResponse;
};


export type AuthMutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type AuthMutationRevokeSessionArgs = {
  token: Scalars['String']['input'];
};


export type AuthMutationSignInEmailArgs = {
  payload: SignInEmailInput;
};


export type AuthMutationSignUpEmailArgs = {
  payload: SignUpEmailInput;
};

export type AuthQuery = {
  __typename?: 'AuthQuery';
  me: AuthUser;
  user?: Maybe<AuthUser>;
  users: Array<AuthUser>;
};


export type AuthQueryUserArgs = {
  id: Scalars['UUID']['input'];
};


export type AuthQueryUsersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type AuthUser = {
  __typename?: 'AuthUser';
  banExpires?: Maybe<Scalars['DateTime']['output']>;
  banReason?: Maybe<Scalars['String']['output']>;
  banned?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['UUID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  role?: Maybe<AuthUserRole>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum AuthUserRole {
  Accountant = 'ACCOUNTANT',
  AccountManager = 'ACCOUNT_MANAGER',
  Admin = 'ADMIN',
  Carrier = 'CARRIER',
  Client = 'CLIENT',
  ClientAdmin = 'CLIENT_ADMIN',
  CustomerSupportAgent = 'CUSTOMER_SUPPORT_AGENT',
  Developer = 'DEVELOPER',
  Dispatcher = 'DISPATCHER',
  Driver = 'DRIVER',
  EndCustomer = 'END_CUSTOMER',
  FinanceManager = 'FINANCE_MANAGER',
  FleetManager = 'FLEET_MANAGER',
  InventoryManager = 'INVENTORY_MANAGER',
  LogisticsCoordinator = 'LOGISTICS_COORDINATOR',
  LogisticsManager = 'LOGISTICS_MANAGER',
  LogisticsPlanner = 'LOGISTICS_PLANNER',
  MarketingManager = 'MARKETING_MANAGER',
  Packer = 'PACKER',
  Picker = 'PICKER',
  PricingAnalyst = 'PRICING_ANALYST',
  ProductManager = 'PRODUCT_MANAGER',
  QcManager = 'QC_MANAGER',
  ReceivingManager = 'RECEIVING_MANAGER',
  ReturnsProcessor = 'RETURNS_PROCESSOR',
  SalesManager = 'SALES_MANAGER',
  SalesRep = 'SALES_REP',
  Sdr = 'SDR',
  TransportManager = 'TRANSPORT_MANAGER',
  User = 'USER',
  WarehouseManager = 'WAREHOUSE_MANAGER',
  WarehouseOperator = 'WAREHOUSE_OPERATOR'
}

export enum CasePriority {
  Critical = 'CRITICAL',
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export enum CaseStatus {
  Cancelled = 'CANCELLED',
  Closed = 'CLOSED',
  Escalated = 'ESCALATED',
  InProgress = 'IN_PROGRESS',
  New = 'NEW',
  Resolved = 'RESOLVED',
  WaitingForCustomer = 'WAITING_FOR_CUSTOMER',
  WaitingForInternal = 'WAITING_FOR_INTERNAL'
}

export enum CaseType {
  BugReport = 'BUG_REPORT',
  Complaint = 'COMPLAINT',
  FeatureRequest = 'FEATURE_REQUEST',
  Problem = 'PROBLEM',
  Question = 'QUESTION',
  TechnicalSupport = 'TECHNICAL_SUPPORT'
}

export type CreateCampaignInput = {
  budget?: InputMaybe<Scalars['Decimal']['input']>;
  endDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};

export type CreateCaseInput = {
  caseNumber: Scalars['String']['input'];
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['UUID']['input'];
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
};

export type CreateCompanyInput = {
  annualRevenue?: InputMaybe<Scalars['Decimal']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateContactInput = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  email: Scalars['String']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CreateInteractionInput = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  contactId: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId: Scalars['UUID']['input'];
};

export type CreateInvoiceInput = {
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  items: Array<CreateInvoiceItemInput>;
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<InvoiceStatus>;
  total?: InputMaybe<Scalars['Decimal']['input']>;
};

export type CreateInvoiceItemInput = {
  price: Scalars['Decimal']['input'];
  productId: Scalars['UUID']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateLeadInput = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  convertedAt?: InputMaybe<Scalars['DateTime']['input']>;
  convertedCompanyId?: InputMaybe<Scalars['UUID']['input']>;
  convertedContactId?: InputMaybe<Scalars['UUID']['input']>;
  convertedOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
  email: Scalars['String']['input'];
  leadScore?: InputMaybe<Scalars['Int']['input']>;
  leadSource?: InputMaybe<LeadSource>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
  status?: InputMaybe<LeadStatus>;
};

export type CreateNotificationInput = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  userId: Scalars['UUID']['input'];
};

export type CreateOpportunityInput = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  dealValue?: InputMaybe<Scalars['Decimal']['input']>;
  expectedCloseDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  lostReason?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['UUID']['input'];
  probability?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<OpportunitySource>;
  stage?: InputMaybe<OpportunityStage>;
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Decimal']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
};

export type CrmAttachments = {
  __typename?: 'CrmAttachments';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId?: Maybe<Scalars['UUID']['output']>;
  recordType?: Maybe<RecordType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCampaigns = {
  __typename?: 'CrmCampaigns';
  budget?: Maybe<Scalars['Decimal']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  endDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  startDate?: Maybe<Scalars['NaiveDate']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCases = {
  __typename?: 'CrmCases';
  caseNumber: Scalars['String']['output'];
  contact?: Maybe<CrmContacts>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  owner: AuthUser;
  priority?: Maybe<CasePriority>;
  status?: Maybe<CaseStatus>;
  type?: Maybe<CaseType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmCompanies = {
  __typename?: 'CrmCompanies';
  annualRevenue?: Maybe<Scalars['Decimal']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<AuthUser>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type CrmContacts = {
  __typename?: 'CrmContacts';
  company?: Maybe<CrmCompanies>;
  companyId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: AuthUser;
  ownerId: Scalars['UUID']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmInteractions = {
  __typename?: 'CrmInteractions';
  case?: Maybe<CrmCases>;
  contact: CrmContacts;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  interactionDate?: Maybe<Scalars['DateTime']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  outcome?: Maybe<Scalars['String']['output']>;
  type?: Maybe<InteractionType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: AuthUser;
};

export type CrmInvoiceItems = {
  __typename?: 'CrmInvoiceItems';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  invoice: CrmInvoices;
  price: Scalars['Decimal']['output'];
  product: CrmProducts;
  quantity: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmInvoices = {
  __typename?: 'CrmInvoices';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dueDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  issueDate?: Maybe<Scalars['NaiveDate']['output']>;
  items: Array<CrmInvoiceItems>;
  opportunity?: Maybe<CrmOpportunities>;
  opportunityId?: Maybe<Scalars['UUID']['output']>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  paymentMethod?: Maybe<PaymentMethod>;
  sentAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<InvoiceStatus>;
  total?: Maybe<Scalars['Decimal']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CrmInvoicesItemsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type CrmLeads = {
  __typename?: 'CrmLeads';
  campaign?: Maybe<CrmCampaigns>;
  convertedAt?: Maybe<Scalars['DateTime']['output']>;
  convertedContact?: Maybe<CrmContacts>;
  convertedOpportunity?: Maybe<CrmOpportunities>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  leadScore?: Maybe<Scalars['Int']['output']>;
  leadSource?: Maybe<LeadSource>;
  name: Scalars['String']['output'];
  owner: AuthUser;
  status?: Maybe<LeadStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmMutations = {
  __typename?: 'CrmMutations';
  addInvoiceItem: CrmInvoices;
  createCampaign: CrmCampaigns;
  createCase: CrmCases;
  createCompany: CrmCompanies;
  createContact: CrmContacts;
  createInteraction: CrmInteractions;
  createInvoice: CrmInvoices;
  createLead: CrmLeads;
  createNotification: CrmNotifications;
  createOpportunity: CrmOpportunities;
  createProduct: CrmProducts;
  createTag: CrmTags;
  removeAttachment: Scalars['String']['output'];
  removeCampaign: Scalars['String']['output'];
  removeCase: Scalars['String']['output'];
  removeCompany: Scalars['String']['output'];
  removeContact: Scalars['String']['output'];
  removeInteraction: Scalars['String']['output'];
  removeInvoice: Scalars['String']['output'];
  removeInvoiceItem: CrmInvoices;
  removeLead: Scalars['String']['output'];
  removeNotification: Scalars['String']['output'];
  removeOpportunity: Scalars['String']['output'];
  removeProduct: Scalars['String']['output'];
  removeTag: Scalars['String']['output'];
  updateCampaignBudget: CrmCampaigns;
  updateCampaignEndDate: CrmCampaigns;
  updateCampaignName: CrmCampaigns;
  updateCampaignStartDate: CrmCampaigns;
  updateCaseContactId: CrmCases;
  updateCaseDescription: CrmCases;
  updateCaseNumber: CrmCases;
  updateCaseOwnerId: CrmCases;
  updateCasePriority: CrmCases;
  updateCaseStatus: CrmCases;
  updateCaseType: CrmCases;
  updateCompanyAnnualRevenue: CrmCompanies;
  updateCompanyCity: CrmCompanies;
  updateCompanyCountry: CrmCompanies;
  updateCompanyIndustry: CrmCompanies;
  updateCompanyName: CrmCompanies;
  updateCompanyOwnerId: CrmCompanies;
  updateCompanyPhoneNumber: CrmCompanies;
  updateCompanyPostalCode: CrmCompanies;
  updateCompanyState: CrmCompanies;
  updateCompanyStreet: CrmCompanies;
  updateCompanyWebsite: CrmCompanies;
  updateContactCompanyId: CrmContacts;
  updateContactEmail: CrmContacts;
  updateContactJobTitle: CrmContacts;
  updateContactName: CrmContacts;
  updateContactOwnerId: CrmContacts;
  updateContactPhoneNumber: CrmContacts;
  updateInteractionCaseId: CrmInteractions;
  updateInteractionContactId: CrmInteractions;
  updateInteractionInteractionDate: CrmInteractions;
  updateInteractionNotes: CrmInteractions;
  updateInteractionOutcome: CrmInteractions;
  updateInteractionType: CrmInteractions;
  updateInteractionUserId: CrmInteractions;
  updateInvoiceDueDate: CrmInvoices;
  updateInvoiceIssueDate: CrmInvoices;
  updateInvoiceOpportunityId: CrmInvoices;
  updateInvoicePaidAt: CrmInvoices;
  updateInvoicePaymentMethod: CrmInvoices;
  updateInvoiceSentAt: CrmInvoices;
  updateInvoiceStatus: CrmInvoices;
  updateInvoiceTotal: CrmInvoices;
  updateLeadCampaignId: CrmLeads;
  updateLeadConvertedAt: CrmLeads;
  updateLeadConvertedCompanyId: CrmLeads;
  updateLeadConvertedContactId: CrmLeads;
  updateLeadConvertedOpportunityId: CrmLeads;
  updateLeadEmail: CrmLeads;
  updateLeadLeadScore: CrmLeads;
  updateLeadLeadSource: CrmLeads;
  updateLeadName: CrmLeads;
  updateLeadOwnerId: CrmLeads;
  updateLeadStatus: CrmLeads;
  updateNotificationIsRead: CrmNotifications;
  updateNotificationLink: CrmNotifications;
  updateNotificationMessage: CrmNotifications;
  updateNotificationUserId: CrmNotifications;
  updateOpportunityCampaignId: CrmOpportunities;
  updateOpportunityCompanyId: CrmOpportunities;
  updateOpportunityContactId: CrmOpportunities;
  updateOpportunityDealValue: CrmOpportunities;
  updateOpportunityExpectedCloseDate: CrmOpportunities;
  updateOpportunityLostReason: CrmOpportunities;
  updateOpportunityName: CrmOpportunities;
  updateOpportunityOwnerId: CrmOpportunities;
  updateOpportunityProbability: CrmOpportunities;
  updateOpportunitySource: CrmOpportunities;
  updateOpportunityStage: CrmOpportunities;
  updateProductDescription: CrmProducts;
  updateProductName: CrmProducts;
  updateProductPrice: CrmProducts;
  updateProductSku: CrmProducts;
  updateProductType: CrmProducts;
  updateTagName: CrmTags;
  uploadAttachment: CrmAttachments;
};


export type CrmMutationsAddInvoiceItemArgs = {
  id: Scalars['UUID']['input'];
  payload: CreateInvoiceItemInput;
};


export type CrmMutationsCreateCampaignArgs = {
  payload: CreateCampaignInput;
};


export type CrmMutationsCreateCaseArgs = {
  payload: CreateCaseInput;
};


export type CrmMutationsCreateCompanyArgs = {
  payload: CreateCompanyInput;
};


export type CrmMutationsCreateContactArgs = {
  payload: CreateContactInput;
};


export type CrmMutationsCreateInteractionArgs = {
  payload: CreateInteractionInput;
};


export type CrmMutationsCreateInvoiceArgs = {
  payload: CreateInvoiceInput;
};


export type CrmMutationsCreateLeadArgs = {
  payload: CreateLeadInput;
};


export type CrmMutationsCreateNotificationArgs = {
  payload: CreateNotificationInput;
};


export type CrmMutationsCreateOpportunityArgs = {
  payload: CreateOpportunityInput;
};


export type CrmMutationsCreateProductArgs = {
  payload: CreateProductInput;
};


export type CrmMutationsCreateTagArgs = {
  payload: CreateTagInput;
};


export type CrmMutationsRemoveAttachmentArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveCampaignArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveCaseArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveCompanyArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveContactArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveInteractionArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveInvoiceItemArgs = {
  itemId: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveLeadArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveNotificationArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveOpportunityArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveProductArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsRemoveTagArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCampaignBudgetArgs = {
  budget: Scalars['Decimal']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCampaignEndDateArgs = {
  endDate: Scalars['NaiveDate']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCampaignNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateCampaignStartDateArgs = {
  id: Scalars['UUID']['input'];
  startDate: Scalars['NaiveDate']['input'];
};


export type CrmMutationsUpdateCaseContactIdArgs = {
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCaseDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCaseNumberArgs = {
  caseNumber: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCaseOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCasePriorityArgs = {
  id: Scalars['UUID']['input'];
  priority?: InputMaybe<CasePriority>;
};


export type CrmMutationsUpdateCaseStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<CaseStatus>;
};


export type CrmMutationsUpdateCaseTypeArgs = {
  id: Scalars['UUID']['input'];
  type?: InputMaybe<CaseType>;
};


export type CrmMutationsUpdateCompanyAnnualRevenueArgs = {
  annualRevenue?: InputMaybe<Scalars['Decimal']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCompanyCityArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCompanyCountryArgs = {
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateCompanyIndustryArgs = {
  id: Scalars['UUID']['input'];
  industry?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateCompanyOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId?: InputMaybe<Scalars['UUID']['input']>;
};


export type CrmMutationsUpdateCompanyPhoneNumberArgs = {
  id: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyPostalCodeArgs = {
  id: Scalars['UUID']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyStateArgs = {
  id: Scalars['UUID']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyStreetArgs = {
  id: Scalars['UUID']['input'];
  street?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateCompanyWebsiteArgs = {
  id: Scalars['UUID']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateContactCompanyIdArgs = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateContactEmailArgs = {
  email: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateContactJobTitleArgs = {
  id: Scalars['UUID']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateContactNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateContactOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateContactPhoneNumberArgs = {
  id: Scalars['UUID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateInteractionCaseIdArgs = {
  caseId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInteractionContactIdArgs = {
  contactId: Scalars['UUID']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInteractionInteractionDateArgs = {
  id: Scalars['UUID']['input'];
  interactionDate?: InputMaybe<Scalars['DateTime']['input']>;
};


export type CrmMutationsUpdateInteractionNotesArgs = {
  id: Scalars['UUID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateInteractionOutcomeArgs = {
  id: Scalars['UUID']['input'];
  outcome?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateInteractionTypeArgs = {
  id: Scalars['UUID']['input'];
  type?: InputMaybe<InteractionType>;
};


export type CrmMutationsUpdateInteractionUserIdArgs = {
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInvoiceDueDateArgs = {
  dueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateInvoiceIssueDateArgs = {
  id: Scalars['UUID']['input'];
  issueDate?: InputMaybe<Scalars['NaiveDate']['input']>;
};


export type CrmMutationsUpdateInvoiceOpportunityIdArgs = {
  id: Scalars['UUID']['input'];
  opportunityId?: InputMaybe<Scalars['UUID']['input']>;
};


export type CrmMutationsUpdateInvoicePaidAtArgs = {
  id: Scalars['UUID']['input'];
  paidAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type CrmMutationsUpdateInvoicePaymentMethodArgs = {
  id: Scalars['UUID']['input'];
  paymentMethod?: InputMaybe<PaymentMethod>;
};


export type CrmMutationsUpdateInvoiceSentAtArgs = {
  id: Scalars['UUID']['input'];
  sentAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type CrmMutationsUpdateInvoiceStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<InvoiceStatus>;
};


export type CrmMutationsUpdateInvoiceTotalArgs = {
  id: Scalars['UUID']['input'];
  total?: InputMaybe<Scalars['Decimal']['input']>;
};


export type CrmMutationsUpdateLeadCampaignIdArgs = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedAtArgs = {
  convertedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedCompanyIdArgs = {
  convertedCompanyId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedContactIdArgs = {
  convertedContactId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadConvertedOpportunityIdArgs = {
  convertedOpportunityId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadEmailArgs = {
  email: Scalars['String']['input'];
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadLeadScoreArgs = {
  id: Scalars['UUID']['input'];
  leadScore?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmMutationsUpdateLeadLeadSourceArgs = {
  id: Scalars['UUID']['input'];
  leadSource?: InputMaybe<LeadSource>;
};


export type CrmMutationsUpdateLeadNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateLeadOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateLeadStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<LeadStatus>;
};


export type CrmMutationsUpdateNotificationIsReadArgs = {
  id: Scalars['UUID']['input'];
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
};


export type CrmMutationsUpdateNotificationLinkArgs = {
  id: Scalars['UUID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateNotificationMessageArgs = {
  id: Scalars['UUID']['input'];
  message: Scalars['String']['input'];
};


export type CrmMutationsUpdateNotificationUserIdArgs = {
  id: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityCampaignIdArgs = {
  campaignId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityCompanyIdArgs = {
  companyId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityContactIdArgs = {
  contactId?: InputMaybe<Scalars['UUID']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityDealValueArgs = {
  dealValue?: InputMaybe<Scalars['Decimal']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityExpectedCloseDateArgs = {
  expectedCloseDate?: InputMaybe<Scalars['NaiveDate']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityLostReasonArgs = {
  id: Scalars['UUID']['input'];
  lostReason?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateOpportunityNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateOpportunityOwnerIdArgs = {
  id: Scalars['UUID']['input'];
  ownerId: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateOpportunityProbabilityArgs = {
  id: Scalars['UUID']['input'];
  probability?: InputMaybe<Scalars['Float']['input']>;
};


export type CrmMutationsUpdateOpportunitySourceArgs = {
  id: Scalars['UUID']['input'];
  source?: InputMaybe<OpportunitySource>;
};


export type CrmMutationsUpdateOpportunityStageArgs = {
  id: Scalars['UUID']['input'];
  stage?: InputMaybe<OpportunityStage>;
};


export type CrmMutationsUpdateProductDescriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};


export type CrmMutationsUpdateProductNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUpdateProductPriceArgs = {
  id: Scalars['UUID']['input'];
  price: Scalars['Decimal']['input'];
};


export type CrmMutationsUpdateProductSkuArgs = {
  id: Scalars['UUID']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
};


export type CrmMutationsUpdateProductTypeArgs = {
  id: Scalars['UUID']['input'];
  type?: InputMaybe<ProductType>;
};


export type CrmMutationsUpdateTagNameArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type CrmMutationsUploadAttachmentArgs = {
  file: Scalars['Upload']['input'];
  recordId: Scalars['UUID']['input'];
  recordType: RecordType;
};

export type CrmNotifications = {
  __typename?: 'CrmNotifications';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isRead?: Maybe<Scalars['Boolean']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: AuthUser;
};

export type CrmOpportunities = {
  __typename?: 'CrmOpportunities';
  campaign?: Maybe<CrmCampaigns>;
  company?: Maybe<CrmCompanies>;
  contact?: Maybe<CrmContacts>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dealValue?: Maybe<Scalars['Decimal']['output']>;
  expectedCloseDate?: Maybe<Scalars['NaiveDate']['output']>;
  id: Scalars['UUID']['output'];
  lostReason?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: AuthUser;
  probability?: Maybe<Scalars['Float']['output']>;
  products: Array<CrmProducts>;
  source?: Maybe<OpportunitySource>;
  stage?: Maybe<OpportunityStage>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};


export type CrmOpportunitiesProductsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type CrmProducts = {
  __typename?: 'CrmProducts';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Decimal']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ProductType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CrmQueries = {
  __typename?: 'CrmQueries';
  attachment?: Maybe<CrmAttachments>;
  attachments: Array<CrmAttachments>;
  campaign?: Maybe<CrmCampaigns>;
  campaigns: Array<CrmCampaigns>;
  case?: Maybe<CrmCases>;
  cases: Array<CrmCases>;
  companies: Array<CrmCompanies>;
  company?: Maybe<CrmCompanies>;
  contact?: Maybe<CrmContacts>;
  contacts: Array<CrmContacts>;
  interaction?: Maybe<CrmInteractions>;
  interactions: Array<CrmInteractions>;
  invoice?: Maybe<CrmInvoices>;
  invoices: Array<CrmInvoices>;
  lead?: Maybe<CrmLeads>;
  leads: Array<CrmLeads>;
  notification?: Maybe<CrmNotifications>;
  notifications: Array<CrmNotifications>;
  opportunities: Array<CrmOpportunities>;
  opportunity?: Maybe<CrmOpportunities>;
  product?: Maybe<CrmProducts>;
  products: Array<CrmProducts>;
  tag?: Maybe<CrmTags>;
  tags: Array<CrmTags>;
};


export type CrmQueriesAttachmentArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesAttachmentsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCampaignArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCampaignsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCaseArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesCasesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCompaniesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesCompanyArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesContactArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesContactsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesInteractionArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesInteractionsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesInvoiceArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesInvoicesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesLeadArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesLeadsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesNotificationArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesNotificationsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesOpportunitiesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesOpportunityArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesProductArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesProductsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


export type CrmQueriesTagArgs = {
  id: Scalars['UUID']['input'];
};


export type CrmQueriesTagsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type CrmTags = {
  __typename?: 'CrmTags';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export enum InteractionType {
  Call = 'CALL',
  Email = 'EMAIL',
  Meeting = 'MEETING',
  Text = 'TEXT'
}

export enum InvoiceStatus {
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Sent = 'SENT'
}

export enum LeadSource {
  Advertisement = 'ADVERTISEMENT',
  ColdCall = 'COLD_CALL',
  EmailCampaign = 'EMAIL_CAMPAIGN',
  Event = 'EVENT',
  Other = 'OTHER',
  Partner = 'PARTNER',
  Referral = 'REFERRAL',
  SocialMedia = 'SOCIAL_MEDIA',
  Website = 'WEBSITE'
}

export enum LeadStatus {
  Contacted = 'CONTACTED',
  Converted = 'CONVERTED',
  New = 'NEW',
  Qualified = 'QUALIFIED',
  Unqualified = 'UNQUALIFIED'
}

export type Mutations = {
  __typename?: 'Mutations';
  auth: AuthMutation;
  crm: CrmMutations;
};

export enum OpportunitySource {
  Advertisement = 'ADVERTISEMENT',
  ColdCall = 'COLD_CALL',
  EmailCampaign = 'EMAIL_CAMPAIGN',
  Event = 'EVENT',
  ExistingCustomer = 'EXISTING_CUSTOMER',
  Other = 'OTHER',
  Partner = 'PARTNER',
  Referral = 'REFERRAL',
  SocialMedia = 'SOCIAL_MEDIA',
  Website = 'WEBSITE'
}

export enum OpportunityStage {
  ClosedLost = 'CLOSED_LOST',
  ClosedWon = 'CLOSED_WON',
  Demo = 'DEMO',
  NeedAnalysis = 'NEED_ANALYSIS',
  Negotiation = 'NEGOTIATION',
  Proposal = 'PROPOSAL',
  Prospecting = 'PROSPECTING',
  Qualification = 'QUALIFICATION'
}

export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Cash = 'CASH',
  Check = 'CHECK',
  CreditCard = 'CREDIT_CARD',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
  WireTransfer = 'WIRE_TRANSFER'
}

export enum ProductType {
  Digital = 'DIGITAL',
  Good = 'GOOD',
  Service = 'SERVICE',
  Subscription = 'SUBSCRIPTION'
}

export type Query = {
  __typename?: 'Query';
  auth: AuthQuery;
  crm: CrmQueries;
};

export enum RecordType {
  Campaigns = 'CAMPAIGNS',
  Cases = 'CASES',
  Companies = 'COMPANIES',
  Contacts = 'CONTACTS',
  Interactions = 'INTERACTIONS',
  Invoices = 'INVOICES',
  Leads = 'LEADS',
  Opportunities = 'OPPORTUNITIES',
  Products = 'PRODUCTS'
}

export type RefreshSessionResponse = {
  __typename?: 'RefreshSessionResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type RevokeSessionResponse = {
  __typename?: 'RevokeSessionResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SignInEmailInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type SignUpEmailInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type SignUpEmailMutationVariables = Exact<{
  payload: SignUpEmailInput;
}>;


export type SignUpEmailMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', signUpEmail: { __typename?: 'SignUpResponse', token: string, user: { __typename?: 'AuthUser', name: string, email: string, emailVerified?: boolean | null, image?: string | null, role?: AuthUserRole | null } } } };

export type SignInEmailMutationVariables = Exact<{
  payload: SignInEmailInput;
}>;


export type SignInEmailMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', signInEmail: { __typename?: 'SignInResponse', token: string, user: { __typename?: 'AuthUser', name: string, email: string, emailVerified?: boolean | null, image?: string | null, role?: AuthUserRole | null } } } };

export type RevokeSessionMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RevokeSessionMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', revokeSession: { __typename?: 'RevokeSessionResponse', message: string, success: boolean } } };

export type RefreshSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshSessionMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', refreshSession: { __typename?: 'RefreshSessionResponse', token: string, user: { __typename?: 'AuthUser', name: string, email: string, emailVerified?: boolean | null, image?: string | null, role?: AuthUserRole | null } } } };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutations', auth: { __typename?: 'AuthMutation', changePassword: string } };

export type CreateCampaignMutationVariables = Exact<{
  payload: CreateCampaignInput;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createCampaign: { __typename?: 'CrmCampaigns', id: any, name: string, budget?: any | null, endDate?: any | null, startDate?: any | null, createdAt?: any | null, updatedAt?: any | null } } };

export type CreateCaseMutationVariables = Exact<{
  payload: CreateCaseInput;
}>;


export type CreateCaseMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createCase: { __typename?: 'CrmCases', id: any, caseNumber: string, description?: string | null, priority?: CasePriority | null, status?: CaseStatus | null, type?: CaseType | null, createdAt?: any | null, updatedAt?: any | null, contact?: { __typename?: 'CrmContacts', email: string, name: string, jobTitle?: string | null, phoneNumber?: string | null, company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, website?: string | null, phoneNumber?: string | null } | null } | null, owner: { __typename?: 'AuthUser', email: string, name: string, image?: string | null, role?: AuthUserRole | null } } } };

export type CreateCompanyMutationVariables = Exact<{
  payload: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createCompany: { __typename?: 'CrmCompanies', id: any, annualRevenue?: any | null, state?: string | null, street?: string | null, updatedAt?: any | null, website?: string | null, city?: string | null, country?: string | null, industry?: string | null, name: string, createdAt?: any | null, phoneNumber?: string | null, postalCode?: string | null, owner?: { __typename?: 'AuthUser', name: string, email: string, image?: string | null, role?: AuthUserRole | null } | null } } };

export type CreateContactMutationVariables = Exact<{
  payload: CreateContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createContact: { __typename?: 'CrmContacts', id: any, email: string, jobTitle?: string | null, name: string, phoneNumber?: string | null, createdAt?: any | null, updatedAt?: any | null, company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, website?: string | null, phoneNumber?: string | null } | null, owner: { __typename?: 'AuthUser', name: string, email: string, image?: string | null, role?: AuthUserRole | null } } } };

export type CreateInteractionMutationVariables = Exact<{
  payload: CreateInteractionInput;
}>;


export type CreateInteractionMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createInteraction: { __typename?: 'CrmInteractions', id: any, interactionDate?: any | null, notes?: string | null, outcome?: string | null, type?: InteractionType | null, case?: { __typename?: 'CrmCases', caseNumber: string, contact?: { __typename?: 'CrmContacts', company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, website?: string | null, phoneNumber?: string | null } | null } | null } | null, contact: { __typename?: 'CrmContacts', name: string, jobTitle?: string | null, email: string, phoneNumber?: string | null }, user: { __typename?: 'AuthUser', name: string, email: string, image?: string | null, role?: AuthUserRole | null } } } };

export type CreateInvoiceMutationVariables = Exact<{
  payload: CreateInvoiceInput;
}>;


export type CreateInvoiceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createInvoice: { __typename?: 'CrmInvoices', id: any, status?: InvoiceStatus | null, total?: any | null, dueDate?: any | null, issueDate?: any | null, createdAt?: any | null, updatedAt?: any | null, items: Array<{ __typename?: 'CrmInvoiceItems', price: any, quantity: number, createdAt?: any | null, updatedAt?: any | null, product: { __typename?: 'CrmProducts', name: string, sku?: string | null, description?: string | null } }>, opportunity?: { __typename?: 'CrmOpportunities', stage?: OpportunityStage | null, source?: OpportunitySource | null, campaign?: { __typename?: 'CrmCampaigns', name: string, startDate?: any | null, endDate?: any | null } | null } | null } } };

export type CreateLeadMutationVariables = Exact<{
  payload: CreateLeadInput;
}>;


export type CreateLeadMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createLead: { __typename?: 'CrmLeads', id: any, name: string, status?: LeadStatus | null, convertedAt?: any | null, email: string, leadScore?: number | null, leadSource?: LeadSource | null, createdAt?: any | null, updatedAt?: any | null, campaign?: { __typename?: 'CrmCampaigns', name: string, startDate?: any | null, endDate?: any | null } | null, owner: { __typename?: 'AuthUser', name: string, email: string, image?: string | null, role?: AuthUserRole | null }, convertedContact?: { __typename?: 'CrmContacts', name: string, email: string, jobTitle?: string | null, phoneNumber?: string | null, company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, website?: string | null, phoneNumber?: string | null } | null } | null, convertedOpportunity?: { __typename?: 'CrmOpportunities', products: Array<{ __typename?: 'CrmProducts', id: any, name: string, description?: string | null, price: any, sku?: string | null, type?: ProductType | null }> } | null } } };

export type CreateNotificationMutationVariables = Exact<{
  payload: CreateNotificationInput;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createNotification: { __typename?: 'CrmNotifications', id: any, isRead?: boolean | null, link?: string | null, message: string, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'AuthUser', email: string, name: string, image?: string | null, role?: AuthUserRole | null } } } };

export type CreateOpportunityMutationVariables = Exact<{
  payload: CreateOpportunityInput;
}>;


export type CreateOpportunityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createOpportunity: { __typename?: 'CrmOpportunities', id: any, probability?: number | null, source?: OpportunitySource | null, stage?: OpportunityStage | null, dealValue?: any | null, expectedCloseDate?: any | null, lostReason?: string | null, name: string, createdAt?: any | null, updatedAt?: any | null, campaign?: { __typename?: 'CrmCampaigns', name: string, budget?: any | null, startDate?: any | null, endDate?: any | null } | null, products: Array<{ __typename?: 'CrmProducts', name: string, price: any, sku?: string | null, type?: ProductType | null, description?: string | null }>, company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, phoneNumber?: string | null, website?: string | null } | null, contact?: { __typename?: 'CrmContacts', name: string, phoneNumber?: string | null, jobTitle?: string | null, email: string } | null, owner: { __typename?: 'AuthUser', name: string, email: string, image?: string | null, role?: AuthUserRole | null } } } };

export type CreateProductMutationVariables = Exact<{
  payload: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createProduct: { __typename?: 'CrmProducts', id: any, name: string, price: any, description?: string | null, sku?: string | null, type?: ProductType | null, createdAt?: any | null, updatedAt?: any | null } } };

export type CreateTagMutationVariables = Exact<{
  payload: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', createTag: { __typename?: 'CrmTags', id: any, name: string } } };

export type RemoveCampaignMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCampaignMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCampaign: string } };

export type RemoveCaseMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCaseMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCase: string } };

export type RemoveCompanyMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveCompanyMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeCompany: string } };

export type RemoveContactMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveContactMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeContact: string } };

export type RemoveInteractionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveInteractionMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeInteraction: string } };

export type RemoveInvoiceMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveInvoiceMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeInvoice: string } };

export type RemoveLeadMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveLeadMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeLead: string } };

export type RemoveNotificationMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveNotificationMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeNotification: string } };

export type RemoveOpportunityMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveOpportunityMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeOpportunity: string } };

export type RemoveProductMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveProductMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeProduct: string } };

export type RemoveTagMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RemoveTagMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', removeTag: string } };

export type AddInvoiceItemMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  payload: CreateInvoiceItemInput;
}>;


export type AddInvoiceItemMutation = { __typename?: 'Mutations', crm: { __typename?: 'CrmMutations', addInvoiceItem: { __typename?: 'CrmInvoices', id: any, status?: InvoiceStatus | null, dueDate?: any | null, issueDate?: any | null, total?: any | null, paidAt?: any | null, paymentMethod?: PaymentMethod | null, sentAt?: any | null, createdAt?: any | null, updatedAt?: any | null, items: Array<{ __typename?: 'CrmInvoiceItems', product: { __typename?: 'CrmProducts', name: string, price: any, type?: ProductType | null, sku?: string | null, description?: string | null } }>, opportunity?: { __typename?: 'CrmOpportunities', dealValue?: any | null, source?: OpportunitySource | null, stage?: OpportunityStage | null, contact?: { __typename?: 'CrmContacts', name: string, phoneNumber?: string | null, email: string, company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, website?: string | null, phoneNumber?: string | null } | null } | null, company?: { __typename?: 'CrmCompanies', name: string, industry?: string | null, website?: string | null, phoneNumber?: string | null } | null } | null } } };

export type CrmAttachmentQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmAttachmentQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', attachment?: { __typename?: 'CrmAttachments', id: any } | null } };

export type CrmAttachmentsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmAttachmentsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', attachments: Array<{ __typename?: 'CrmAttachments', id: any }> } };

export type CrmCampaignQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmCampaignQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', campaign?: { __typename?: 'CrmCampaigns', id: any } | null } };

export type CrmCampaignsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmCampaignsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', campaigns: Array<{ __typename?: 'CrmCampaigns', id: any }> } };

export type CrmCaseQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmCaseQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', case?: { __typename?: 'CrmCases', id: any } | null } };

export type CrmCasesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmCasesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', cases: Array<{ __typename?: 'CrmCases', id: any }> } };

export type CrmCompaniesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmCompaniesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', companies: Array<{ __typename?: 'CrmCompanies', id: any }> } };

export type CrmCompanyQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmCompanyQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', company?: { __typename?: 'CrmCompanies', id: any } | null } };

export type CrmContactQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmContactQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', contact?: { __typename?: 'CrmContacts', id: any } | null } };

export type CrmContactsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmContactsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', contacts: Array<{ __typename?: 'CrmContacts', id: any }> } };

export type CrmInteractionQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmInteractionQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', interaction?: { __typename?: 'CrmInteractions', id: any } | null } };

export type CrmInteractionsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmInteractionsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', interactions: Array<{ __typename?: 'CrmInteractions', id: any }> } };

export type CrmInvoiceQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmInvoiceQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', invoice?: { __typename?: 'CrmInvoices', id: any } | null } };

export type CrmInvoicesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmInvoicesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', invoices: Array<{ __typename?: 'CrmInvoices', id: any }> } };

export type CrmLeadQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmLeadQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', lead?: { __typename?: 'CrmLeads', id: any } | null } };

export type CrmLeadsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmLeadsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', leads: Array<{ __typename?: 'CrmLeads', id: any }> } };

export type CrmNotificationQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmNotificationQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', notification?: { __typename?: 'CrmNotifications', id: any } | null } };

export type CrmNotificationsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmNotificationsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', notifications: Array<{ __typename?: 'CrmNotifications', id: any }> } };

export type CrmOpportunitiesQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmOpportunitiesQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', opportunities: Array<{ __typename?: 'CrmOpportunities', id: any }> } };

export type CrmOpportunityQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmOpportunityQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', opportunity?: { __typename?: 'CrmOpportunities', id: any } | null } };

export type CrmProductQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmProductQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', product?: { __typename?: 'CrmProducts', id: any } | null } };

export type CrmProductsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmProductsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', products: Array<{ __typename?: 'CrmProducts', id: any }> } };

export type CrmTagQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type CrmTagQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', tag?: { __typename?: 'CrmTags', id: any } | null } };

export type CrmTagsQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type CrmTagsQuery = { __typename?: 'Query', crm: { __typename?: 'CrmQueries', tags: Array<{ __typename?: 'CrmTags', id: any }> } };
