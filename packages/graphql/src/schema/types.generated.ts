import { GraphQLResolveInfo } from 'graphql';
import { GraphQLContext } from '../context';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Attachments = {
  __typename?: 'Attachments';
  createdAt?: Maybe<Scalars['String']['output']>;
  fileName: Scalars['String']['output'];
  filePath: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  recordId?: Maybe<Scalars['ID']['output']>;
  recordType?: Maybe<RecordType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Campaigns = {
  __typename?: 'Campaigns';
  budget?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startDate?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type CarrierRateUnit =
  | 'FLAT_RATE'
  | 'PER_CONTAINER'
  | 'PER_KG'
  | 'PER_KM'
  | 'PER_MILE';

export type CarrierRates = {
  __typename?: 'CarrierRates';
  carrier: Carriers;
  createdAt?: Maybe<Scalars['String']['output']>;
  destination?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  origin?: Maybe<Scalars['String']['output']>;
  rate: Scalars['Float']['output'];
  serviceType?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<CarrierRateUnit>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Carriers = {
  __typename?: 'Carriers';
  contactDetails?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  partnerInvoices?: Maybe<Array<PartnerInvoices>>;
  rates?: Maybe<Array<CarrierRates>>;
  servicesOffered?: Maybe<Scalars['String']['output']>;
  shipmentLegs?: Maybe<Array<ShipmentLegs>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type CasePriority =
  | 'CRITICAL'
  | 'HIGH'
  | 'LOW'
  | 'MEDIUM';

export type CaseStatus =
  | 'CANCELLED'
  | 'CLOSED'
  | 'ESCALATED'
  | 'IN_PROGRESS'
  | 'NEW'
  | 'RESOLVED'
  | 'WAITING_FOR_CUSTOMER'
  | 'WAITING_FOR_INTERNAL';

export type CaseType =
  | 'BUG_REPORT'
  | 'COMPLAINT'
  | 'FEATURE_REQUEST'
  | 'PROBLEM'
  | 'QUESTION'
  | 'TECHNICAL_SUPPORT';

export type Cases = {
  __typename?: 'Cases';
  caseNumber: Scalars['String']['output'];
  contact?: Maybe<Contacts>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  owner: User;
  priority?: Maybe<CasePriority>;
  status?: Maybe<CaseStatus>;
  type?: Maybe<CaseType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Companies = {
  __typename?: 'Companies';
  annualRevenue?: Maybe<Scalars['Float']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type Contacts = {
  __typename?: 'Contacts';
  company?: Maybe<Companies>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  jobTitle?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: User;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type CreateAttachmentInput = {
  fileName: Scalars['String']['input'];
  filePath: Scalars['String']['input'];
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId?: InputMaybe<Scalars['ID']['input']>;
  recordType?: InputMaybe<RecordType>;
};

export type CreateCampaignInput = {
  budget?: InputMaybe<Scalars['Float']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCarrierInput = {
  contactDetails?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  servicesOffered?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCarrierRateInput = {
  carrierId: Scalars['ID']['input'];
  destination?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  rate: Scalars['Float']['input'];
  serviceType?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<CarrierRateUnit>;
};

export type CreateCaseInput = {
  caseNumber: Scalars['String']['input'];
  contactId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['ID']['input'];
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
};

export type CreateCompanyInput = {
  annualRevenue?: InputMaybe<Scalars['Float']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateContactInput = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['ID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDriverInput = {
  licenseExpiryDate?: InputMaybe<Scalars['String']['input']>;
  licenseNumber: Scalars['String']['input'];
  status?: InputMaybe<DriverStatus>;
  userId: Scalars['ID']['input'];
};

export type CreateDriverScheduleInput = {
  driverId: Scalars['ID']['input'];
  endDate: Scalars['String']['input'];
  reason?: InputMaybe<DriverScheduleReason>;
  startDate: Scalars['String']['input'];
};

export type CreateExpenseInput = {
  amount: Scalars['Float']['input'];
  currency?: InputMaybe<Currency>;
  driverId?: InputMaybe<Scalars['ID']['input']>;
  fuelQuantity?: InputMaybe<Scalars['Float']['input']>;
  odometerReading?: InputMaybe<Scalars['Int']['input']>;
  receiptUrl?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ExpenseStatus>;
  tripId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<ExpenseType>;
};

export type CreateGeofenceEventInput = {
  eventType: GeofenceEventType;
  geofenceId: Scalars['ID']['input'];
  timestamp: Scalars['String']['input'];
  vehicleId: Scalars['ID']['input'];
};

export type CreateGeofenceInput = {
  coordinates?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateGpsPingInput = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  timestamp: Scalars['String']['input'];
  vehicleId: Scalars['ID']['input'];
};

export type CreateInteractionInput = {
  caseId?: InputMaybe<Scalars['ID']['input']>;
  contactId: Scalars['ID']['input'];
  interactionDate?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId: Scalars['ID']['input'];
};

export type CreateInvoiceInput = {
  dueDate?: InputMaybe<Scalars['String']['input']>;
  issueDate?: InputMaybe<Scalars['String']['input']>;
  opportunityId?: InputMaybe<Scalars['ID']['input']>;
  paidAt?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sentAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<InvoiceStatus>;
  total?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateInvoiceItemInput = {
  invoiceId: Scalars['ID']['input'];
  price: Scalars['Float']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreateLeadInput = {
  campaignId?: InputMaybe<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  leadScore?: InputMaybe<Scalars['Int']['input']>;
  leadSource?: InputMaybe<LeadSource>;
  name: Scalars['String']['input'];
  ownerId: Scalars['ID']['input'];
  status?: InputMaybe<LeadStatus>;
};

export type CreateNotificationInput = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  message: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateOpportunityInput = {
  campaignId?: InputMaybe<Scalars['ID']['input']>;
  companyId?: InputMaybe<Scalars['ID']['input']>;
  contactId?: InputMaybe<Scalars['ID']['input']>;
  dealValue?: InputMaybe<Scalars['Float']['input']>;
  expectedCloseDate?: InputMaybe<Scalars['String']['input']>;
  lostReason?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['ID']['input'];
  probability?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<OpportunitySource>;
  stage?: InputMaybe<OpportunityStage>;
};

export type CreateOpportunityProductInput = {
  opportunityId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type CreatePartnerInvoiceInput = {
  carrierId: Scalars['ID']['input'];
  invoiceDate: Scalars['String']['input'];
  invoiceNumber: Scalars['String']['input'];
  status?: InputMaybe<PartnerInvoiceStatus>;
  totalAmount: Scalars['Float']['input'];
};

export type CreatePartnerInvoiceItemInput = {
  amount: Scalars['Float']['input'];
  partnerInvoiceId: Scalars['ID']['input'];
  shipmentLegId: Scalars['ID']['input'];
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
};

export type CreateProofOfDeliveryInput = {
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp: Scalars['String']['input'];
  tripStopId: Scalars['ID']['input'];
  type?: InputMaybe<ProofType>;
};

export type CreateRouteInput = {
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  totalDistance?: InputMaybe<Scalars['Float']['input']>;
  totalDuration?: InputMaybe<Scalars['Float']['input']>;
  tripId: Scalars['ID']['input'];
};

export type CreateShipmentLegEventInput = {
  eventTimestamp: Scalars['String']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  shipmentLegId: Scalars['ID']['input'];
  statusMessage?: InputMaybe<Scalars['String']['input']>;
};

export type CreateShipmentLegInput = {
  carrierId?: InputMaybe<Scalars['ID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  internalTripId?: InputMaybe<Scalars['ID']['input']>;
  legSequence: Scalars['Int']['input'];
  shipmentId?: InputMaybe<Scalars['ID']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatus>;
};

export type CreateTripInput = {
  driverId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TripStatus>;
  vehicleId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateTripStopInput = {
  actualArrivalTime?: InputMaybe<Scalars['String']['input']>;
  actualDepartureTime?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['String']['input']>;
  estimatedDepartureTime?: InputMaybe<Scalars['String']['input']>;
  sequence: Scalars['Int']['input'];
  shipmentId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TripStopStatus>;
  tripId: Scalars['ID']['input'];
};

export type CreateVehicleInput = {
  capacityVolume?: InputMaybe<Scalars['Float']['input']>;
  capacityWeight?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  registrationNumber: Scalars['String']['input'];
  status?: InputMaybe<VehicleStatus>;
};

export type CreateVehicleMaintenanceInput = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceDate: Scalars['String']['input'];
  serviceType?: InputMaybe<VehicleServiceType>;
  vehicleId: Scalars['ID']['input'];
};

export type CrmMutation = {
  __typename?: 'CrmMutation';
  createAttachment: Attachments;
  createCampaign: Campaigns;
  createCase: Cases;
  createCompany: Companies;
  createContact: Contacts;
  createInteraction: Interactions;
  createInvoice: Invoices;
  createInvoiceItem: InvoiceItems;
  createLead: Leads;
  createNotification: Notifications;
  createOpportunity: Opportunities;
  createOpportunityProduct: OpportunityProducts;
  createProduct: Products;
  removeAttachment: DeleteResult;
  removeCampaign: DeleteResult;
  removeCase: DeleteResult;
  removeCompany: DeleteResult;
  removeContact: DeleteResult;
  removeInteraction: DeleteResult;
  removeInvoice: DeleteResult;
  removeInvoiceItem: DeleteResult;
  removeLead: DeleteResult;
  removeNotification: DeleteResult;
  removeOpportunity: DeleteResult;
  removeOpportunityProduct: DeleteResult;
  removeProduct: DeleteResult;
  updateAttachment: Attachments;
  updateCampaign: Campaigns;
  updateCase: Cases;
  updateCompany: Companies;
  updateContact: Contacts;
  updateInteraction: Interactions;
  updateInvoice: Invoices;
  updateInvoiceItem: InvoiceItems;
  updateLead: Leads;
  updateNotification: Notifications;
  updateOpportunity: Opportunities;
  updateOpportunityProduct: OpportunityProducts;
  updateProduct: Products;
};


export type CrmMutationcreateAttachmentArgs = {
  value: CreateAttachmentInput;
};


export type CrmMutationcreateCampaignArgs = {
  value: CreateCampaignInput;
};


export type CrmMutationcreateCaseArgs = {
  value: CreateCaseInput;
};


export type CrmMutationcreateCompanyArgs = {
  value: CreateCompanyInput;
};


export type CrmMutationcreateContactArgs = {
  value: CreateContactInput;
};


export type CrmMutationcreateInteractionArgs = {
  value: CreateInteractionInput;
};


export type CrmMutationcreateInvoiceArgs = {
  value: CreateInvoiceInput;
};


export type CrmMutationcreateInvoiceItemArgs = {
  value: CreateInvoiceItemInput;
};


export type CrmMutationcreateLeadArgs = {
  value: CreateLeadInput;
};


export type CrmMutationcreateNotificationArgs = {
  value: CreateNotificationInput;
};


export type CrmMutationcreateOpportunityArgs = {
  value: CreateOpportunityInput;
};


export type CrmMutationcreateOpportunityProductArgs = {
  value: CreateOpportunityProductInput;
};


export type CrmMutationcreateProductArgs = {
  value: CreateProductInput;
};


export type CrmMutationremoveAttachmentArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationremoveCampaignArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationremoveCaseArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationremoveCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationremoveContactArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationremoveInteractionArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationremoveInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationremoveInvoiceItemArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationremoveLeadArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationremoveNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationremoveOpportunityArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationremoveOpportunityProductArgs = {
  opportunityId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type CrmMutationremoveProductArgs = {
  id: Scalars['ID']['input'];
};


export type CrmMutationupdateAttachmentArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateAttachmentInput>;
};


export type CrmMutationupdateCampaignArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateCampaignInput>;
};


export type CrmMutationupdateCaseArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateCaseInput>;
};


export type CrmMutationupdateCompanyArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateCompanyInput>;
};


export type CrmMutationupdateContactArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateContactInput>;
};


export type CrmMutationupdateInteractionArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInteractionInput>;
};


export type CrmMutationupdateInvoiceArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInvoiceInput>;
};


export type CrmMutationupdateInvoiceItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInvoiceItemInput>;
};


export type CrmMutationupdateLeadArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateLeadInput>;
};


export type CrmMutationupdateNotificationArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateNotificationInput>;
};


export type CrmMutationupdateOpportunityArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateOpportunityInput>;
};


export type CrmMutationupdateOpportunityProductArgs = {
  opportunityId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  value?: InputMaybe<UpdateOpportunityProductInput>;
};


export type CrmMutationupdateProductArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateProductInput>;
};

export type CrmQuery = {
  __typename?: 'CrmQuery';
  attachment: Attachments;
  attachments: Array<Attachments>;
  campaign: Campaigns;
  campaigns: Array<Campaigns>;
  case: Cases;
  cases: Array<Cases>;
  companies: Array<Companies>;
  company: Companies;
  contact: Contacts;
  contacts: Array<Contacts>;
  interaction: Interactions;
  interactions: Array<Interactions>;
  invoice: Invoices;
  invoiceItem: InvoiceItems;
  invoiceItems: Array<InvoiceItems>;
  invoices: Array<Invoices>;
  lead: Leads;
  leads: Array<Leads>;
  notification: Notifications;
  notifications: Array<Notifications>;
  opportunities: Array<Opportunities>;
  opportunity: Opportunities;
  opportunityProduct: OpportunityProducts;
  opportunityProducts: Array<OpportunityProducts>;
  product: Products;
  products: Array<Products>;
};


export type CrmQueryattachmentArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryattachmentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQuerycampaignArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQuerycampaignsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQuerycaseArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQuerycasesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQuerycompaniesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQuerycompanyArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQuerycontactArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQuerycontactsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryinteractionArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryinteractionsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryinvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryinvoiceItemArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryinvoiceItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryinvoicesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryleadArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryleadsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQuerynotificationArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQuerynotificationsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryopportunitiesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryopportunityArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryopportunityProductArgs = {
  opportunityId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type CrmQueryopportunityProductsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type CrmQueryproductArgs = {
  id: Scalars['ID']['input'];
};


export type CrmQueryproductsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};

export type Currency =
  | 'AUD'
  | 'CAD'
  | 'EUR'
  | 'GBP'
  | 'JPY'
  | 'PHP'
  | 'USD';

export type DeleteResult = {
  __typename?: 'DeleteResult';
  numDeletedRows: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
};

export type DriverScheduleReason =
  | 'PERSONAL_LEAVE'
  | 'SICK_LEAVE'
  | 'TRAINING'
  | 'VACATION';

export type DriverSchedules = {
  __typename?: 'DriverSchedules';
  createdAt?: Maybe<Scalars['String']['output']>;
  driver: Drivers;
  endDate: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  reason?: Maybe<DriverScheduleReason>;
  startDate: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type DriverStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'ON_LEAVE';

export type Drivers = {
  __typename?: 'Drivers';
  createdAt?: Maybe<Scalars['String']['output']>;
  expenses?: Maybe<Array<Expenses>>;
  id: Scalars['ID']['output'];
  licenseExpiryDate?: Maybe<Scalars['String']['output']>;
  licenseNumber: Scalars['String']['output'];
  schedules?: Maybe<Array<DriverSchedules>>;
  status?: Maybe<DriverStatus>;
  trips?: Maybe<Array<Trips>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type ExpenseStatus =
  | 'APPROVED'
  | 'PENDING'
  | 'REIMBURSED'
  | 'REJECTED';

export type ExpenseType =
  | 'ACCOMMODATION'
  | 'FUEL'
  | 'MAINTENANCE'
  | 'MEALS'
  | 'PARKING'
  | 'TOLLS';

export type Expenses = {
  __typename?: 'Expenses';
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<Currency>;
  driver?: Maybe<Drivers>;
  fuelQuantity?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  odometerReading?: Maybe<Scalars['Int']['output']>;
  receiptUrl?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ExpenseStatus>;
  trip?: Maybe<Trips>;
  type?: Maybe<ExpenseType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type GeofenceEventType =
  | 'ENTER'
  | 'EXIT';

export type GeofenceEvents = {
  __typename?: 'GeofenceEvents';
  eventType: GeofenceEventType;
  geofence: Geofences;
  id: Scalars['ID']['output'];
  timestamp: Scalars['String']['output'];
  vehicle: Vehicles;
};

export type Geofences = {
  __typename?: 'Geofences';
  coordinates?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<GeofenceEvents>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type GpsPings = {
  __typename?: 'GpsPings';
  id: Scalars['ID']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  timestamp: Scalars['String']['output'];
  vehicle: Vehicles;
};

export type InteractionType =
  | 'CALL'
  | 'EMAIL'
  | 'MEETING'
  | 'TEXT';

export type Interactions = {
  __typename?: 'Interactions';
  case?: Maybe<Cases>;
  contact: Contacts;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interactionDate?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  outcome?: Maybe<Scalars['String']['output']>;
  type?: Maybe<InteractionType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type InvoiceItems = {
  __typename?: 'InvoiceItems';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoice: Invoices;
  price: Scalars['Float']['output'];
  product: Products;
  quantity: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type InvoiceStatus =
  | 'CANCELLED'
  | 'DRAFT'
  | 'OVERDUE'
  | 'PAID'
  | 'SENT';

export type Invoices = {
  __typename?: 'Invoices';
  createdAt?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  issueDate?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<InvoiceItems>>;
  opportunity?: Maybe<Opportunities>;
  paidAt?: Maybe<Scalars['String']['output']>;
  paymentMethod?: Maybe<PaymentMethod>;
  sentAt?: Maybe<Scalars['String']['output']>;
  status?: Maybe<InvoiceStatus>;
  total?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type LeadSource =
  | 'ADVERTISEMENT'
  | 'COLD_CALL'
  | 'EMAIL_CAMPAIGN'
  | 'EVENT'
  | 'OTHER'
  | 'PARTNER'
  | 'REFERRAL'
  | 'SOCIAL_MEDIA'
  | 'WEBSITE';

export type LeadStatus =
  | 'CONTACTED'
  | 'CONVERTED'
  | 'NEW'
  | 'QUALIFIED'
  | 'UNQUALIFIED';

export type Leads = {
  __typename?: 'Leads';
  campaign?: Maybe<Campaigns>;
  convertedAt?: Maybe<Scalars['String']['output']>;
  convertedCompany?: Maybe<Companies>;
  convertedContact?: Maybe<Contacts>;
  convertedOpportunity?: Maybe<Opportunities>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  leadScore?: Maybe<Scalars['Int']['output']>;
  leadSource?: Maybe<LeadSource>;
  name: Scalars['String']['output'];
  owner: User;
  status?: Maybe<LeadStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  crm?: Maybe<CrmMutation>;
  tms?: Maybe<TmsMutation>;
};

export type Notifications = {
  __typename?: 'Notifications';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isRead?: Maybe<Scalars['Boolean']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type Opportunities = {
  __typename?: 'Opportunities';
  campaign?: Maybe<Campaigns>;
  company?: Maybe<Companies>;
  contact?: Maybe<Contacts>;
  createdAt?: Maybe<Scalars['String']['output']>;
  dealValue?: Maybe<Scalars['Float']['output']>;
  expectedCloseDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lostReason?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: User;
  probability?: Maybe<Scalars['Float']['output']>;
  products?: Maybe<Array<OpportunityProducts>>;
  source?: Maybe<OpportunitySource>;
  stage?: Maybe<OpportunityStage>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type OpportunityProducts = {
  __typename?: 'OpportunityProducts';
  opportunity: Opportunities;
  product: Products;
  quantity: Scalars['Int']['output'];
};

export type OpportunitySource =
  | 'ADVERTISEMENT'
  | 'COLD_CALL'
  | 'EMAIL_CAMPAIGN'
  | 'EVENT'
  | 'EXISTING_CUSTOMER'
  | 'OTHER'
  | 'PARTNER'
  | 'REFERRAL'
  | 'SOCIAL_MEDIA'
  | 'WEBSITE';

export type OpportunityStage =
  | 'CLOSED_LOST'
  | 'CLOSED_WON'
  | 'DEMO'
  | 'NEED_ANALYSIS'
  | 'NEGOTIATION'
  | 'PROPOSAL'
  | 'PROSPECTING'
  | 'QUALIFICATION';

export type PartnerInvoiceItems = {
  __typename?: 'PartnerInvoiceItems';
  amount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  partnerInvoice: PartnerInvoices;
  shipmentLeg: ShipmentLegs;
};

export type PartnerInvoiceStatus =
  | 'CANCELLED'
  | 'DISPUTED'
  | 'OVERDUE'
  | 'PAID'
  | 'PENDING';

export type PartnerInvoices = {
  __typename?: 'PartnerInvoices';
  carrier: Carriers;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoiceDate: Scalars['String']['output'];
  invoiceNumber: Scalars['String']['output'];
  items?: Maybe<Array<PartnerInvoiceItems>>;
  status?: Maybe<PartnerInvoiceStatus>;
  totalAmount: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PaymentMethod =
  | 'BANK_TRANSFER'
  | 'CASH'
  | 'CHECK'
  | 'CREDIT_CARD'
  | 'PAYPAL'
  | 'STRIPE'
  | 'WIRE_TRANSFER';

export type ProductType =
  | 'DIGITAL'
  | 'GOOD'
  | 'SERVICE'
  | 'SUBSCRIPTION';

export type Products = {
  __typename?: 'Products';
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ProductType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ProofOfDeliveries = {
  __typename?: 'ProofOfDeliveries';
  createdAt?: Maybe<Scalars['String']['output']>;
  filePath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  timestamp: Scalars['String']['output'];
  tripStop: TripStops;
  type?: Maybe<ProofType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ProofType =
  | 'BARCODE_SCAN'
  | 'PHOTO'
  | 'PIN_VERIFICATION'
  | 'SIGNATURE';

export type Query = {
  __typename?: 'Query';
  crm?: Maybe<CrmQuery>;
  tms?: Maybe<TmsQuery>;
};

export type RecordType =
  | 'CAMPAIGNS'
  | 'CASES'
  | 'COMPANIES'
  | 'CONTACTS'
  | 'INTERACTIONS'
  | 'INVOICES'
  | 'LEADS'
  | 'OPPORTUNITIES'
  | 'PRODUCTS';

export type Routes = {
  __typename?: 'Routes';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  optimizedRouteData?: Maybe<Scalars['String']['output']>;
  totalDistance?: Maybe<Scalars['Float']['output']>;
  totalDuration?: Maybe<Scalars['Float']['output']>;
  trip: Trips;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ShipmentLegEvents = {
  __typename?: 'ShipmentLegEvents';
  eventTimestamp: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  shipmentLeg: ShipmentLegs;
  statusMessage?: Maybe<Scalars['String']['output']>;
};

export type ShipmentLegStatus =
  | 'CANCELLED'
  | 'DELIVERED'
  | 'FAILED'
  | 'IN_TRANSIT'
  | 'PENDING';

export type ShipmentLegs = {
  __typename?: 'ShipmentLegs';
  carrier?: Maybe<Carriers>;
  createdAt?: Maybe<Scalars['String']['output']>;
  endLocation?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<ShipmentLegEvents>>;
  id: Scalars['ID']['output'];
  internalTrip?: Maybe<Trips>;
  legSequence: Scalars['Int']['output'];
  partnerInvoiceItems?: Maybe<Array<PartnerInvoiceItems>>;
  shipmentId?: Maybe<Scalars['ID']['output']>;
  startLocation?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ShipmentLegStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type TmsMutation = {
  __typename?: 'TmsMutation';
  createCarrier: Carriers;
  createCarrierRate: CarrierRates;
  createDriver: Drivers;
  createDriverSchedule: DriverSchedules;
  createExpense: Expenses;
  createGeofence: Geofences;
  createGeofenceEvent: GeofenceEvents;
  createGpsPing: GpsPings;
  createPartnerInvoice: PartnerInvoices;
  createPartnerInvoiceItem: PartnerInvoiceItems;
  createProofOfDelivery: ProofOfDeliveries;
  createRoute: Routes;
  createShipmentLeg: ShipmentLegs;
  createShipmentLegEvent: ShipmentLegEvents;
  createTrip: Trips;
  createTripStop: TripStops;
  createVehicle: Vehicles;
  createVehicleMaintenance: VehicleMaintenance;
  removeCarrier: DeleteResult;
  removeCarrierRate: DeleteResult;
  removeDriver: DeleteResult;
  removeDriverSchedule: DeleteResult;
  removeExpense: DeleteResult;
  removeGeofence: DeleteResult;
  removeGeofenceEvent: DeleteResult;
  removeGpsPing: DeleteResult;
  removePartnerInvoice: DeleteResult;
  removePartnerInvoiceItem: DeleteResult;
  removeProofOfDelivery: DeleteResult;
  removeRoute: DeleteResult;
  removeShipmentLeg: DeleteResult;
  removeShipmentLegEvent: DeleteResult;
  removeTrip: DeleteResult;
  removeTripStop: DeleteResult;
  removeVehicle: DeleteResult;
  removeVehicleMaintenance: DeleteResult;
  updateCarrier: Carriers;
  updateCarrierRate: CarrierRates;
  updateDriver: Drivers;
  updateDriverSchedule: DriverSchedules;
  updateExpense: Expenses;
  updateGeofence: Geofences;
  updateGeofenceEvent: GeofenceEvents;
  updateGpsPing: GpsPings;
  updatePartnerInvoice: PartnerInvoices;
  updatePartnerInvoiceItem: PartnerInvoiceItems;
  updateProofOfDelivery: ProofOfDeliveries;
  updateRoute: Routes;
  updateShipmentLeg: ShipmentLegs;
  updateShipmentLegEvent: ShipmentLegEvents;
  updateTrip: Trips;
  updateTripStop: TripStops;
  updateVehicle: Vehicles;
  updateVehicleMaintenance: VehicleMaintenance;
};


export type TmsMutationcreateCarrierArgs = {
  value: CreateCarrierInput;
};


export type TmsMutationcreateCarrierRateArgs = {
  value: CreateCarrierRateInput;
};


export type TmsMutationcreateDriverArgs = {
  value: CreateDriverInput;
};


export type TmsMutationcreateDriverScheduleArgs = {
  value: CreateDriverScheduleInput;
};


export type TmsMutationcreateExpenseArgs = {
  value: CreateExpenseInput;
};


export type TmsMutationcreateGeofenceArgs = {
  value: CreateGeofenceInput;
};


export type TmsMutationcreateGeofenceEventArgs = {
  value: CreateGeofenceEventInput;
};


export type TmsMutationcreateGpsPingArgs = {
  value: CreateGpsPingInput;
};


export type TmsMutationcreatePartnerInvoiceArgs = {
  value: CreatePartnerInvoiceInput;
};


export type TmsMutationcreatePartnerInvoiceItemArgs = {
  value: CreatePartnerInvoiceItemInput;
};


export type TmsMutationcreateProofOfDeliveryArgs = {
  value: CreateProofOfDeliveryInput;
};


export type TmsMutationcreateRouteArgs = {
  value: CreateRouteInput;
};


export type TmsMutationcreateShipmentLegArgs = {
  value: CreateShipmentLegInput;
};


export type TmsMutationcreateShipmentLegEventArgs = {
  value: CreateShipmentLegEventInput;
};


export type TmsMutationcreateTripArgs = {
  value: CreateTripInput;
};


export type TmsMutationcreateTripStopArgs = {
  value: CreateTripStopInput;
};


export type TmsMutationcreateVehicleArgs = {
  value: CreateVehicleInput;
};


export type TmsMutationcreateVehicleMaintenanceArgs = {
  value: CreateVehicleMaintenanceInput;
};


export type TmsMutationremoveCarrierArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveCarrierRateArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveDriverArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveDriverScheduleArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveExpenseArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveGeofenceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveGeofenceEventArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveGpsPingArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremovePartnerInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremovePartnerInvoiceItemArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveProofOfDeliveryArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveRouteArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveShipmentLegArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveShipmentLegEventArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveTripArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveTripStopArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveVehicleArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationremoveVehicleMaintenanceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsMutationupdateCarrierArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateCarrierInput>;
};


export type TmsMutationupdateCarrierRateArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateCarrierRateInput>;
};


export type TmsMutationupdateDriverArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateDriverInput>;
};


export type TmsMutationupdateDriverScheduleArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateDriverScheduleInput>;
};


export type TmsMutationupdateExpenseArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateExpenseInput>;
};


export type TmsMutationupdateGeofenceArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateGeofenceInput>;
};


export type TmsMutationupdateGeofenceEventArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateGeofenceEventInput>;
};


export type TmsMutationupdateGpsPingArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateGpsPingInput>;
};


export type TmsMutationupdatePartnerInvoiceArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePartnerInvoiceInput>;
};


export type TmsMutationupdatePartnerInvoiceItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePartnerInvoiceItemInput>;
};


export type TmsMutationupdateProofOfDeliveryArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateProofOfDeliveryInput>;
};


export type TmsMutationupdateRouteArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateRouteInput>;
};


export type TmsMutationupdateShipmentLegArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateShipmentLegInput>;
};


export type TmsMutationupdateShipmentLegEventArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateShipmentLegEventInput>;
};


export type TmsMutationupdateTripArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateTripInput>;
};


export type TmsMutationupdateTripStopArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateTripStopInput>;
};


export type TmsMutationupdateVehicleArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateVehicleInput>;
};


export type TmsMutationupdateVehicleMaintenanceArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateVehicleMaintenanceInput>;
};

export type TmsQuery = {
  __typename?: 'TmsQuery';
  carrier: Carriers;
  carrierRate: CarrierRates;
  carrierRates: Array<CarrierRates>;
  carriers: Array<Carriers>;
  driver: Drivers;
  driverSchedule: DriverSchedules;
  driverSchedules: Array<DriverSchedules>;
  drivers: Array<Drivers>;
  expense: Expenses;
  expenses: Array<Expenses>;
  geofence: Geofences;
  geofenceEvent: GeofenceEvents;
  geofenceEvents: Array<GeofenceEvents>;
  geofences: Array<Geofences>;
  gpsPing: GpsPings;
  gpsPings: Array<GpsPings>;
  partnerInvoice: PartnerInvoices;
  partnerInvoiceItem: PartnerInvoiceItems;
  partnerInvoiceItems: Array<PartnerInvoiceItems>;
  partnerInvoices: Array<PartnerInvoices>;
  proofOfDeliveries: Array<ProofOfDeliveries>;
  proofOfDelivery: ProofOfDeliveries;
  route: Routes;
  routes: Array<Routes>;
  shipmentLeg: ShipmentLegs;
  shipmentLegEvent: ShipmentLegEvents;
  shipmentLegEvents: Array<ShipmentLegEvents>;
  shipmentLegs: Array<ShipmentLegs>;
  trip: Trips;
  tripStop: TripStops;
  tripStops: Array<TripStops>;
  trips: Array<Trips>;
  vehicle: Vehicles;
  vehicleMaintenance: VehicleMaintenance;
  vehicleMaintenances: Array<VehicleMaintenance>;
  vehicles: Array<Vehicles>;
};


export type TmsQuerycarrierArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQuerycarrierRateArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQuerycarrierRatesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQuerycarriersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQuerydriverArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQuerydriverScheduleArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQuerydriverSchedulesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQuerydriversArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryexpenseArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryexpensesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQuerygeofenceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQuerygeofenceEventArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQuerygeofenceEventsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQuerygeofencesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQuerygpsPingArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQuerygpsPingsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQuerypartnerInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQuerypartnerInvoiceItemArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQuerypartnerInvoiceItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQuerypartnerInvoicesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryproofOfDeliveriesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryproofOfDeliveryArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryrouteArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryroutesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryshipmentLegArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryshipmentLegEventArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryshipmentLegEventsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryshipmentLegsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQuerytripArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQuerytripStopArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQuerytripStopsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQuerytripsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryvehicleArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryvehicleMaintenanceArgs = {
  id: Scalars['ID']['input'];
};


export type TmsQueryvehicleMaintenancesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type TmsQueryvehiclesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};

export type TripStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'PLANNED';

export type TripStopStatus =
  | 'ARRIVED'
  | 'COMPLETED'
  | 'PENDING'
  | 'SKIPPED';

export type TripStops = {
  __typename?: 'TripStops';
  actualArrivalTime?: Maybe<Scalars['String']['output']>;
  actualDepartureTime?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  estimatedArrivalTime?: Maybe<Scalars['String']['output']>;
  estimatedDepartureTime?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  proofOfDeliveries?: Maybe<Array<ProofOfDeliveries>>;
  sequence: Scalars['Int']['output'];
  shipmentId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<TripStopStatus>;
  trip: Trips;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Trips = {
  __typename?: 'Trips';
  createdAt?: Maybe<Scalars['String']['output']>;
  driver?: Maybe<Drivers>;
  expenses?: Maybe<Array<Expenses>>;
  id: Scalars['ID']['output'];
  routes?: Maybe<Array<Routes>>;
  shipmentLegs?: Maybe<Array<ShipmentLegs>>;
  status?: Maybe<TripStatus>;
  stops?: Maybe<Array<TripStops>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  vehicle?: Maybe<Vehicles>;
};

export type UpdateAttachmentInput = {
  fileName?: InputMaybe<Scalars['String']['input']>;
  filePath?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  recordId?: InputMaybe<Scalars['ID']['input']>;
  recordType?: InputMaybe<RecordType>;
};

export type UpdateCampaignInput = {
  budget?: InputMaybe<Scalars['Float']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCarrierInput = {
  contactDetails?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  servicesOffered?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCarrierRateInput = {
  carrierId?: InputMaybe<Scalars['ID']['input']>;
  destination?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
  rate?: InputMaybe<Scalars['Float']['input']>;
  serviceType?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<CarrierRateUnit>;
};

export type UpdateCaseInput = {
  caseNumber?: InputMaybe<Scalars['String']['input']>;
  contactId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  priority?: InputMaybe<CasePriority>;
  status?: InputMaybe<CaseStatus>;
  type?: InputMaybe<CaseType>;
};

export type UpdateCompanyInput = {
  annualRevenue?: InputMaybe<Scalars['Float']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContactInput = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDriverInput = {
  licenseExpiryDate?: InputMaybe<Scalars['String']['input']>;
  licenseNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DriverStatus>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateDriverScheduleInput = {
  driverId?: InputMaybe<Scalars['ID']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<DriverScheduleReason>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExpenseInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Currency>;
  driverId?: InputMaybe<Scalars['ID']['input']>;
  fuelQuantity?: InputMaybe<Scalars['Float']['input']>;
  odometerReading?: InputMaybe<Scalars['Int']['input']>;
  receiptUrl?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ExpenseStatus>;
  tripId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<ExpenseType>;
};

export type UpdateGeofenceEventInput = {
  eventType?: InputMaybe<GeofenceEventType>;
  geofenceId?: InputMaybe<Scalars['ID']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
  vehicleId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateGeofenceInput = {
  coordinates?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGpsPingInput = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
  vehicleId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateInteractionInput = {
  caseId?: InputMaybe<Scalars['ID']['input']>;
  contactId?: InputMaybe<Scalars['ID']['input']>;
  interactionDate?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  outcome?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<InteractionType>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateInvoiceInput = {
  dueDate?: InputMaybe<Scalars['String']['input']>;
  issueDate?: InputMaybe<Scalars['String']['input']>;
  opportunityId?: InputMaybe<Scalars['ID']['input']>;
  paidAt?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  sentAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<InvoiceStatus>;
  total?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateInvoiceItemInput = {
  invoiceId?: InputMaybe<Scalars['ID']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateLeadInput = {
  campaignId?: InputMaybe<Scalars['ID']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  leadScore?: InputMaybe<Scalars['Int']['input']>;
  leadSource?: InputMaybe<LeadSource>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<LeadStatus>;
};

export type UpdateNotificationInput = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateOpportunityInput = {
  campaignId?: InputMaybe<Scalars['ID']['input']>;
  companyId?: InputMaybe<Scalars['ID']['input']>;
  contactId?: InputMaybe<Scalars['ID']['input']>;
  dealValue?: InputMaybe<Scalars['Float']['input']>;
  expectedCloseDate?: InputMaybe<Scalars['String']['input']>;
  lostReason?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  probability?: InputMaybe<Scalars['Float']['input']>;
  source?: InputMaybe<OpportunitySource>;
  stage?: InputMaybe<OpportunityStage>;
};

export type UpdateOpportunityProductInput = {
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdatePartnerInvoiceInput = {
  carrierId?: InputMaybe<Scalars['ID']['input']>;
  invoiceDate?: InputMaybe<Scalars['String']['input']>;
  invoiceNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PartnerInvoiceStatus>;
  totalAmount?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePartnerInvoiceItemInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  partnerInvoiceId?: InputMaybe<Scalars['ID']['input']>;
  shipmentLegId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
};

export type UpdateProofOfDeliveryInput = {
  filePath?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
  tripStopId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<ProofType>;
};

export type UpdateRouteInput = {
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  totalDistance?: InputMaybe<Scalars['Float']['input']>;
  totalDuration?: InputMaybe<Scalars['Float']['input']>;
  tripId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateShipmentLegEventInput = {
  eventTimestamp?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  shipmentLegId?: InputMaybe<Scalars['ID']['input']>;
  statusMessage?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShipmentLegInput = {
  carrierId?: InputMaybe<Scalars['ID']['input']>;
  endLocation?: InputMaybe<Scalars['String']['input']>;
  internalTripId?: InputMaybe<Scalars['ID']['input']>;
  legSequence?: InputMaybe<Scalars['Int']['input']>;
  shipmentId?: InputMaybe<Scalars['ID']['input']>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatus>;
};

export type UpdateTripInput = {
  driverId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TripStatus>;
  vehicleId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateTripStopInput = {
  actualArrivalTime?: InputMaybe<Scalars['String']['input']>;
  actualDepartureTime?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  estimatedArrivalTime?: InputMaybe<Scalars['String']['input']>;
  estimatedDepartureTime?: InputMaybe<Scalars['String']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
  shipmentId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TripStopStatus>;
  tripId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateVehicleInput = {
  capacityVolume?: InputMaybe<Scalars['Float']['input']>;
  capacityWeight?: InputMaybe<Scalars['Float']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<VehicleStatus>;
};

export type UpdateVehicleMaintenanceInput = {
  cost?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceDate?: InputMaybe<Scalars['String']['input']>;
  serviceType?: InputMaybe<VehicleServiceType>;
  vehicleId?: InputMaybe<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  emailVerified: Scalars['String']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type VehicleMaintenance = {
  __typename?: 'VehicleMaintenance';
  cost?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  serviceDate: Scalars['String']['output'];
  serviceType?: Maybe<VehicleServiceType>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  vehicle: Vehicles;
};

export type VehicleServiceType =
  | 'BRAKE_SERVICE'
  | 'INSPECTION'
  | 'OIL_CHANGE'
  | 'REPAIR'
  | 'ROUTINE_MAINTENANCE'
  | 'TIRE_REPLACEMENT';

export type VehicleStatus =
  | 'AVAILABLE'
  | 'IN_MAINTENANCE'
  | 'ON_TRIP'
  | 'OUT_OF_SERVICE';

export type Vehicles = {
  __typename?: 'Vehicles';
  capacityVolume?: Maybe<Scalars['Float']['output']>;
  capacityWeight?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  geofenceEvents?: Maybe<Array<GeofenceEvents>>;
  gpsPings?: Maybe<Array<GpsPings>>;
  id: Scalars['ID']['output'];
  maintenances?: Maybe<Array<VehicleMaintenance>>;
  model?: Maybe<Scalars['String']['output']>;
  registrationNumber: Scalars['String']['output'];
  status?: Maybe<VehicleStatus>;
  trips?: Maybe<Array<Trips>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Attachments: ResolverTypeWrapper<Omit<Attachments, 'recordType'> & { recordType?: Maybe<ResolversTypes['RecordType']> }>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Campaigns: ResolverTypeWrapper<Campaigns>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  CarrierRateUnit: ResolverTypeWrapper<'PER_KG' | 'PER_CONTAINER' | 'PER_MILE' | 'PER_KM' | 'FLAT_RATE'>;
  CarrierRates: ResolverTypeWrapper<Omit<CarrierRates, 'carrier' | 'unit'> & { carrier: ResolversTypes['Carriers'], unit?: Maybe<ResolversTypes['CarrierRateUnit']> }>;
  Carriers: ResolverTypeWrapper<Omit<Carriers, 'partnerInvoices' | 'rates' | 'shipmentLegs'> & { partnerInvoices?: Maybe<Array<ResolversTypes['PartnerInvoices']>>, rates?: Maybe<Array<ResolversTypes['CarrierRates']>>, shipmentLegs?: Maybe<Array<ResolversTypes['ShipmentLegs']>> }>;
  CasePriority: ResolverTypeWrapper<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>;
  CaseStatus: ResolverTypeWrapper<'NEW' | 'IN_PROGRESS' | 'WAITING_FOR_CUSTOMER' | 'WAITING_FOR_INTERNAL' | 'ESCALATED' | 'RESOLVED' | 'CLOSED' | 'CANCELLED'>;
  CaseType: ResolverTypeWrapper<'QUESTION' | 'PROBLEM' | 'COMPLAINT' | 'FEATURE_REQUEST' | 'BUG_REPORT' | 'TECHNICAL_SUPPORT'>;
  Cases: ResolverTypeWrapper<Omit<Cases, 'priority' | 'status' | 'type'> & { priority?: Maybe<ResolversTypes['CasePriority']>, status?: Maybe<ResolversTypes['CaseStatus']>, type?: Maybe<ResolversTypes['CaseType']> }>;
  Companies: ResolverTypeWrapper<Companies>;
  Contacts: ResolverTypeWrapper<Contacts>;
  CreateAttachmentInput: CreateAttachmentInput;
  CreateCampaignInput: CreateCampaignInput;
  CreateCarrierInput: CreateCarrierInput;
  CreateCarrierRateInput: CreateCarrierRateInput;
  CreateCaseInput: CreateCaseInput;
  CreateCompanyInput: CreateCompanyInput;
  CreateContactInput: CreateContactInput;
  CreateDriverInput: CreateDriverInput;
  CreateDriverScheduleInput: CreateDriverScheduleInput;
  CreateExpenseInput: CreateExpenseInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  CreateGeofenceEventInput: CreateGeofenceEventInput;
  CreateGeofenceInput: CreateGeofenceInput;
  CreateGpsPingInput: CreateGpsPingInput;
  CreateInteractionInput: CreateInteractionInput;
  CreateInvoiceInput: CreateInvoiceInput;
  CreateInvoiceItemInput: CreateInvoiceItemInput;
  CreateLeadInput: CreateLeadInput;
  CreateNotificationInput: CreateNotificationInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateOpportunityInput: CreateOpportunityInput;
  CreateOpportunityProductInput: CreateOpportunityProductInput;
  CreatePartnerInvoiceInput: CreatePartnerInvoiceInput;
  CreatePartnerInvoiceItemInput: CreatePartnerInvoiceItemInput;
  CreateProductInput: CreateProductInput;
  CreateProofOfDeliveryInput: CreateProofOfDeliveryInput;
  CreateRouteInput: CreateRouteInput;
  CreateShipmentLegEventInput: CreateShipmentLegEventInput;
  CreateShipmentLegInput: CreateShipmentLegInput;
  CreateTripInput: CreateTripInput;
  CreateTripStopInput: CreateTripStopInput;
  CreateVehicleInput: CreateVehicleInput;
  CreateVehicleMaintenanceInput: CreateVehicleMaintenanceInput;
  CrmMutation: ResolverTypeWrapper<Omit<CrmMutation, 'createAttachment' | 'createCase' | 'createInteraction' | 'createInvoice' | 'createInvoiceItem' | 'createLead' | 'createOpportunity' | 'createOpportunityProduct' | 'createProduct' | 'updateAttachment' | 'updateCase' | 'updateInteraction' | 'updateInvoice' | 'updateInvoiceItem' | 'updateLead' | 'updateOpportunity' | 'updateOpportunityProduct' | 'updateProduct'> & { createAttachment: ResolversTypes['Attachments'], createCase: ResolversTypes['Cases'], createInteraction: ResolversTypes['Interactions'], createInvoice: ResolversTypes['Invoices'], createInvoiceItem: ResolversTypes['InvoiceItems'], createLead: ResolversTypes['Leads'], createOpportunity: ResolversTypes['Opportunities'], createOpportunityProduct: ResolversTypes['OpportunityProducts'], createProduct: ResolversTypes['Products'], updateAttachment: ResolversTypes['Attachments'], updateCase: ResolversTypes['Cases'], updateInteraction: ResolversTypes['Interactions'], updateInvoice: ResolversTypes['Invoices'], updateInvoiceItem: ResolversTypes['InvoiceItems'], updateLead: ResolversTypes['Leads'], updateOpportunity: ResolversTypes['Opportunities'], updateOpportunityProduct: ResolversTypes['OpportunityProducts'], updateProduct: ResolversTypes['Products'] }>;
  CrmQuery: ResolverTypeWrapper<Omit<CrmQuery, 'attachment' | 'attachments' | 'case' | 'cases' | 'interaction' | 'interactions' | 'invoice' | 'invoiceItem' | 'invoiceItems' | 'invoices' | 'lead' | 'leads' | 'opportunities' | 'opportunity' | 'opportunityProduct' | 'opportunityProducts' | 'product' | 'products'> & { attachment: ResolversTypes['Attachments'], attachments: Array<ResolversTypes['Attachments']>, case: ResolversTypes['Cases'], cases: Array<ResolversTypes['Cases']>, interaction: ResolversTypes['Interactions'], interactions: Array<ResolversTypes['Interactions']>, invoice: ResolversTypes['Invoices'], invoiceItem: ResolversTypes['InvoiceItems'], invoiceItems: Array<ResolversTypes['InvoiceItems']>, invoices: Array<ResolversTypes['Invoices']>, lead: ResolversTypes['Leads'], leads: Array<ResolversTypes['Leads']>, opportunities: Array<ResolversTypes['Opportunities']>, opportunity: ResolversTypes['Opportunities'], opportunityProduct: ResolversTypes['OpportunityProducts'], opportunityProducts: Array<ResolversTypes['OpportunityProducts']>, product: ResolversTypes['Products'], products: Array<ResolversTypes['Products']> }>;
  Currency: ResolverTypeWrapper<'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'PHP'>;
  DeleteResult: ResolverTypeWrapper<DeleteResult>;
  DriverScheduleReason: ResolverTypeWrapper<'VACATION' | 'SICK_LEAVE' | 'TRAINING' | 'PERSONAL_LEAVE'>;
  DriverSchedules: ResolverTypeWrapper<Omit<DriverSchedules, 'driver' | 'reason'> & { driver: ResolversTypes['Drivers'], reason?: Maybe<ResolversTypes['DriverScheduleReason']> }>;
  DriverStatus: ResolverTypeWrapper<'ACTIVE' | 'INACTIVE' | 'ON_LEAVE'>;
  Drivers: ResolverTypeWrapper<Omit<Drivers, 'expenses' | 'schedules' | 'status' | 'trips'> & { expenses?: Maybe<Array<ResolversTypes['Expenses']>>, schedules?: Maybe<Array<ResolversTypes['DriverSchedules']>>, status?: Maybe<ResolversTypes['DriverStatus']>, trips?: Maybe<Array<ResolversTypes['Trips']>> }>;
  ExpenseStatus: ResolverTypeWrapper<'PENDING' | 'APPROVED' | 'REJECTED' | 'REIMBURSED'>;
  ExpenseType: ResolverTypeWrapper<'FUEL' | 'TOLLS' | 'MAINTENANCE' | 'PARKING' | 'MEALS' | 'ACCOMMODATION'>;
  Expenses: ResolverTypeWrapper<Omit<Expenses, 'currency' | 'driver' | 'status' | 'trip' | 'type'> & { currency?: Maybe<ResolversTypes['Currency']>, driver?: Maybe<ResolversTypes['Drivers']>, status?: Maybe<ResolversTypes['ExpenseStatus']>, trip?: Maybe<ResolversTypes['Trips']>, type?: Maybe<ResolversTypes['ExpenseType']> }>;
  GeofenceEventType: ResolverTypeWrapper<'ENTER' | 'EXIT'>;
  GeofenceEvents: ResolverTypeWrapper<Omit<GeofenceEvents, 'eventType' | 'geofence' | 'vehicle'> & { eventType: ResolversTypes['GeofenceEventType'], geofence: ResolversTypes['Geofences'], vehicle: ResolversTypes['Vehicles'] }>;
  Geofences: ResolverTypeWrapper<Omit<Geofences, 'events'> & { events?: Maybe<Array<ResolversTypes['GeofenceEvents']>> }>;
  GpsPings: ResolverTypeWrapper<Omit<GpsPings, 'vehicle'> & { vehicle: ResolversTypes['Vehicles'] }>;
  InteractionType: ResolverTypeWrapper<'CALL' | 'MEETING' | 'TEXT' | 'EMAIL'>;
  Interactions: ResolverTypeWrapper<Omit<Interactions, 'case' | 'type'> & { case?: Maybe<ResolversTypes['Cases']>, type?: Maybe<ResolversTypes['InteractionType']> }>;
  InvoiceItems: ResolverTypeWrapper<Omit<InvoiceItems, 'invoice' | 'product'> & { invoice: ResolversTypes['Invoices'], product: ResolversTypes['Products'] }>;
  InvoiceStatus: ResolverTypeWrapper<'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED'>;
  Invoices: ResolverTypeWrapper<Omit<Invoices, 'items' | 'opportunity' | 'paymentMethod' | 'status'> & { items?: Maybe<Array<ResolversTypes['InvoiceItems']>>, opportunity?: Maybe<ResolversTypes['Opportunities']>, paymentMethod?: Maybe<ResolversTypes['PaymentMethod']>, status?: Maybe<ResolversTypes['InvoiceStatus']> }>;
  LeadSource: ResolverTypeWrapper<'WEBSITE' | 'REFERRAL' | 'SOCIAL_MEDIA' | 'EMAIL_CAMPAIGN' | 'COLD_CALL' | 'EVENT' | 'ADVERTISEMENT' | 'PARTNER' | 'OTHER'>;
  LeadStatus: ResolverTypeWrapper<'NEW' | 'CONTACTED' | 'QUALIFIED' | 'UNQUALIFIED' | 'CONVERTED'>;
  Leads: ResolverTypeWrapper<Omit<Leads, 'convertedOpportunity' | 'leadSource' | 'status'> & { convertedOpportunity?: Maybe<ResolversTypes['Opportunities']>, leadSource?: Maybe<ResolversTypes['LeadSource']>, status?: Maybe<ResolversTypes['LeadStatus']> }>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Notifications: ResolverTypeWrapper<Notifications>;
  Opportunities: ResolverTypeWrapper<Omit<Opportunities, 'products' | 'source' | 'stage'> & { products?: Maybe<Array<ResolversTypes['OpportunityProducts']>>, source?: Maybe<ResolversTypes['OpportunitySource']>, stage?: Maybe<ResolversTypes['OpportunityStage']> }>;
  OpportunityProducts: ResolverTypeWrapper<Omit<OpportunityProducts, 'opportunity' | 'product'> & { opportunity: ResolversTypes['Opportunities'], product: ResolversTypes['Products'] }>;
  OpportunitySource: ResolverTypeWrapper<'WEBSITE' | 'REFERRAL' | 'SOCIAL_MEDIA' | 'EMAIL_CAMPAIGN' | 'COLD_CALL' | 'EVENT' | 'ADVERTISEMENT' | 'PARTNER' | 'EXISTING_CUSTOMER' | 'OTHER'>;
  OpportunityStage: ResolverTypeWrapper<'PROSPECTING' | 'QUALIFICATION' | 'NEED_ANALYSIS' | 'DEMO' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST'>;
  PartnerInvoiceItems: ResolverTypeWrapper<Omit<PartnerInvoiceItems, 'partnerInvoice' | 'shipmentLeg'> & { partnerInvoice: ResolversTypes['PartnerInvoices'], shipmentLeg: ResolversTypes['ShipmentLegs'] }>;
  PartnerInvoiceStatus: ResolverTypeWrapper<'PENDING' | 'PAID' | 'DISPUTED' | 'OVERDUE' | 'CANCELLED'>;
  PartnerInvoices: ResolverTypeWrapper<Omit<PartnerInvoices, 'carrier' | 'items' | 'status'> & { carrier: ResolversTypes['Carriers'], items?: Maybe<Array<ResolversTypes['PartnerInvoiceItems']>>, status?: Maybe<ResolversTypes['PartnerInvoiceStatus']> }>;
  PaymentMethod: ResolverTypeWrapper<'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'CHECK' | 'PAYPAL' | 'STRIPE' | 'WIRE_TRANSFER'>;
  ProductType: ResolverTypeWrapper<'SERVICE' | 'GOOD' | 'DIGITAL' | 'SUBSCRIPTION'>;
  Products: ResolverTypeWrapper<Omit<Products, 'type'> & { type?: Maybe<ResolversTypes['ProductType']> }>;
  ProofOfDeliveries: ResolverTypeWrapper<Omit<ProofOfDeliveries, 'tripStop' | 'type'> & { tripStop: ResolversTypes['TripStops'], type?: Maybe<ResolversTypes['ProofType']> }>;
  ProofType: ResolverTypeWrapper<'SIGNATURE' | 'PHOTO' | 'BARCODE_SCAN' | 'PIN_VERIFICATION'>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RecordType: ResolverTypeWrapper<'COMPANIES' | 'CONTACTS' | 'LEADS' | 'OPPORTUNITIES' | 'CASES' | 'INTERACTIONS' | 'CAMPAIGNS' | 'PRODUCTS' | 'INVOICES'>;
  Routes: ResolverTypeWrapper<Omit<Routes, 'trip'> & { trip: ResolversTypes['Trips'] }>;
  ShipmentLegEvents: ResolverTypeWrapper<Omit<ShipmentLegEvents, 'shipmentLeg'> & { shipmentLeg: ResolversTypes['ShipmentLegs'] }>;
  ShipmentLegStatus: ResolverTypeWrapper<'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED' | 'FAILED'>;
  ShipmentLegs: ResolverTypeWrapper<Omit<ShipmentLegs, 'carrier' | 'events' | 'internalTrip' | 'partnerInvoiceItems' | 'status'> & { carrier?: Maybe<ResolversTypes['Carriers']>, events?: Maybe<Array<ResolversTypes['ShipmentLegEvents']>>, internalTrip?: Maybe<ResolversTypes['Trips']>, partnerInvoiceItems?: Maybe<Array<ResolversTypes['PartnerInvoiceItems']>>, status?: Maybe<ResolversTypes['ShipmentLegStatus']> }>;
  TmsMutation: ResolverTypeWrapper<Omit<TmsMutation, 'createCarrier' | 'createCarrierRate' | 'createDriver' | 'createDriverSchedule' | 'createExpense' | 'createGeofence' | 'createGeofenceEvent' | 'createGpsPing' | 'createPartnerInvoice' | 'createPartnerInvoiceItem' | 'createProofOfDelivery' | 'createRoute' | 'createShipmentLeg' | 'createShipmentLegEvent' | 'createTrip' | 'createTripStop' | 'createVehicle' | 'createVehicleMaintenance' | 'updateCarrier' | 'updateCarrierRate' | 'updateDriver' | 'updateDriverSchedule' | 'updateExpense' | 'updateGeofence' | 'updateGeofenceEvent' | 'updateGpsPing' | 'updatePartnerInvoice' | 'updatePartnerInvoiceItem' | 'updateProofOfDelivery' | 'updateRoute' | 'updateShipmentLeg' | 'updateShipmentLegEvent' | 'updateTrip' | 'updateTripStop' | 'updateVehicle' | 'updateVehicleMaintenance'> & { createCarrier: ResolversTypes['Carriers'], createCarrierRate: ResolversTypes['CarrierRates'], createDriver: ResolversTypes['Drivers'], createDriverSchedule: ResolversTypes['DriverSchedules'], createExpense: ResolversTypes['Expenses'], createGeofence: ResolversTypes['Geofences'], createGeofenceEvent: ResolversTypes['GeofenceEvents'], createGpsPing: ResolversTypes['GpsPings'], createPartnerInvoice: ResolversTypes['PartnerInvoices'], createPartnerInvoiceItem: ResolversTypes['PartnerInvoiceItems'], createProofOfDelivery: ResolversTypes['ProofOfDeliveries'], createRoute: ResolversTypes['Routes'], createShipmentLeg: ResolversTypes['ShipmentLegs'], createShipmentLegEvent: ResolversTypes['ShipmentLegEvents'], createTrip: ResolversTypes['Trips'], createTripStop: ResolversTypes['TripStops'], createVehicle: ResolversTypes['Vehicles'], createVehicleMaintenance: ResolversTypes['VehicleMaintenance'], updateCarrier: ResolversTypes['Carriers'], updateCarrierRate: ResolversTypes['CarrierRates'], updateDriver: ResolversTypes['Drivers'], updateDriverSchedule: ResolversTypes['DriverSchedules'], updateExpense: ResolversTypes['Expenses'], updateGeofence: ResolversTypes['Geofences'], updateGeofenceEvent: ResolversTypes['GeofenceEvents'], updateGpsPing: ResolversTypes['GpsPings'], updatePartnerInvoice: ResolversTypes['PartnerInvoices'], updatePartnerInvoiceItem: ResolversTypes['PartnerInvoiceItems'], updateProofOfDelivery: ResolversTypes['ProofOfDeliveries'], updateRoute: ResolversTypes['Routes'], updateShipmentLeg: ResolversTypes['ShipmentLegs'], updateShipmentLegEvent: ResolversTypes['ShipmentLegEvents'], updateTrip: ResolversTypes['Trips'], updateTripStop: ResolversTypes['TripStops'], updateVehicle: ResolversTypes['Vehicles'], updateVehicleMaintenance: ResolversTypes['VehicleMaintenance'] }>;
  TmsQuery: ResolverTypeWrapper<Omit<TmsQuery, 'carrier' | 'carrierRate' | 'carrierRates' | 'carriers' | 'driver' | 'driverSchedule' | 'driverSchedules' | 'drivers' | 'expense' | 'expenses' | 'geofence' | 'geofenceEvent' | 'geofenceEvents' | 'geofences' | 'gpsPing' | 'gpsPings' | 'partnerInvoice' | 'partnerInvoiceItem' | 'partnerInvoiceItems' | 'partnerInvoices' | 'proofOfDeliveries' | 'proofOfDelivery' | 'route' | 'routes' | 'shipmentLeg' | 'shipmentLegEvent' | 'shipmentLegEvents' | 'shipmentLegs' | 'trip' | 'tripStop' | 'tripStops' | 'trips' | 'vehicle' | 'vehicleMaintenance' | 'vehicleMaintenances' | 'vehicles'> & { carrier: ResolversTypes['Carriers'], carrierRate: ResolversTypes['CarrierRates'], carrierRates: Array<ResolversTypes['CarrierRates']>, carriers: Array<ResolversTypes['Carriers']>, driver: ResolversTypes['Drivers'], driverSchedule: ResolversTypes['DriverSchedules'], driverSchedules: Array<ResolversTypes['DriverSchedules']>, drivers: Array<ResolversTypes['Drivers']>, expense: ResolversTypes['Expenses'], expenses: Array<ResolversTypes['Expenses']>, geofence: ResolversTypes['Geofences'], geofenceEvent: ResolversTypes['GeofenceEvents'], geofenceEvents: Array<ResolversTypes['GeofenceEvents']>, geofences: Array<ResolversTypes['Geofences']>, gpsPing: ResolversTypes['GpsPings'], gpsPings: Array<ResolversTypes['GpsPings']>, partnerInvoice: ResolversTypes['PartnerInvoices'], partnerInvoiceItem: ResolversTypes['PartnerInvoiceItems'], partnerInvoiceItems: Array<ResolversTypes['PartnerInvoiceItems']>, partnerInvoices: Array<ResolversTypes['PartnerInvoices']>, proofOfDeliveries: Array<ResolversTypes['ProofOfDeliveries']>, proofOfDelivery: ResolversTypes['ProofOfDeliveries'], route: ResolversTypes['Routes'], routes: Array<ResolversTypes['Routes']>, shipmentLeg: ResolversTypes['ShipmentLegs'], shipmentLegEvent: ResolversTypes['ShipmentLegEvents'], shipmentLegEvents: Array<ResolversTypes['ShipmentLegEvents']>, shipmentLegs: Array<ResolversTypes['ShipmentLegs']>, trip: ResolversTypes['Trips'], tripStop: ResolversTypes['TripStops'], tripStops: Array<ResolversTypes['TripStops']>, trips: Array<ResolversTypes['Trips']>, vehicle: ResolversTypes['Vehicles'], vehicleMaintenance: ResolversTypes['VehicleMaintenance'], vehicleMaintenances: Array<ResolversTypes['VehicleMaintenance']>, vehicles: Array<ResolversTypes['Vehicles']> }>;
  TripStatus: ResolverTypeWrapper<'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'>;
  TripStopStatus: ResolverTypeWrapper<'PENDING' | 'ARRIVED' | 'COMPLETED' | 'SKIPPED'>;
  TripStops: ResolverTypeWrapper<Omit<TripStops, 'proofOfDeliveries' | 'status' | 'trip'> & { proofOfDeliveries?: Maybe<Array<ResolversTypes['ProofOfDeliveries']>>, status?: Maybe<ResolversTypes['TripStopStatus']>, trip: ResolversTypes['Trips'] }>;
  Trips: ResolverTypeWrapper<Omit<Trips, 'driver' | 'expenses' | 'routes' | 'shipmentLegs' | 'status' | 'stops' | 'vehicle'> & { driver?: Maybe<ResolversTypes['Drivers']>, expenses?: Maybe<Array<ResolversTypes['Expenses']>>, routes?: Maybe<Array<ResolversTypes['Routes']>>, shipmentLegs?: Maybe<Array<ResolversTypes['ShipmentLegs']>>, status?: Maybe<ResolversTypes['TripStatus']>, stops?: Maybe<Array<ResolversTypes['TripStops']>>, vehicle?: Maybe<ResolversTypes['Vehicles']> }>;
  UpdateAttachmentInput: UpdateAttachmentInput;
  UpdateCampaignInput: UpdateCampaignInput;
  UpdateCarrierInput: UpdateCarrierInput;
  UpdateCarrierRateInput: UpdateCarrierRateInput;
  UpdateCaseInput: UpdateCaseInput;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateContactInput: UpdateContactInput;
  UpdateDriverInput: UpdateDriverInput;
  UpdateDriverScheduleInput: UpdateDriverScheduleInput;
  UpdateExpenseInput: UpdateExpenseInput;
  UpdateGeofenceEventInput: UpdateGeofenceEventInput;
  UpdateGeofenceInput: UpdateGeofenceInput;
  UpdateGpsPingInput: UpdateGpsPingInput;
  UpdateInteractionInput: UpdateInteractionInput;
  UpdateInvoiceInput: UpdateInvoiceInput;
  UpdateInvoiceItemInput: UpdateInvoiceItemInput;
  UpdateLeadInput: UpdateLeadInput;
  UpdateNotificationInput: UpdateNotificationInput;
  UpdateOpportunityInput: UpdateOpportunityInput;
  UpdateOpportunityProductInput: UpdateOpportunityProductInput;
  UpdatePartnerInvoiceInput: UpdatePartnerInvoiceInput;
  UpdatePartnerInvoiceItemInput: UpdatePartnerInvoiceItemInput;
  UpdateProductInput: UpdateProductInput;
  UpdateProofOfDeliveryInput: UpdateProofOfDeliveryInput;
  UpdateRouteInput: UpdateRouteInput;
  UpdateShipmentLegEventInput: UpdateShipmentLegEventInput;
  UpdateShipmentLegInput: UpdateShipmentLegInput;
  UpdateTripInput: UpdateTripInput;
  UpdateTripStopInput: UpdateTripStopInput;
  UpdateVehicleInput: UpdateVehicleInput;
  UpdateVehicleMaintenanceInput: UpdateVehicleMaintenanceInput;
  User: ResolverTypeWrapper<User>;
  VehicleMaintenance: ResolverTypeWrapper<Omit<VehicleMaintenance, 'serviceType' | 'vehicle'> & { serviceType?: Maybe<ResolversTypes['VehicleServiceType']>, vehicle: ResolversTypes['Vehicles'] }>;
  VehicleServiceType: ResolverTypeWrapper<'ROUTINE_MAINTENANCE' | 'REPAIR' | 'INSPECTION' | 'OIL_CHANGE' | 'TIRE_REPLACEMENT' | 'BRAKE_SERVICE'>;
  VehicleStatus: ResolverTypeWrapper<'AVAILABLE' | 'IN_MAINTENANCE' | 'ON_TRIP' | 'OUT_OF_SERVICE'>;
  Vehicles: ResolverTypeWrapper<Omit<Vehicles, 'geofenceEvents' | 'gpsPings' | 'maintenances' | 'status' | 'trips'> & { geofenceEvents?: Maybe<Array<ResolversTypes['GeofenceEvents']>>, gpsPings?: Maybe<Array<ResolversTypes['GpsPings']>>, maintenances?: Maybe<Array<ResolversTypes['VehicleMaintenance']>>, status?: Maybe<ResolversTypes['VehicleStatus']>, trips?: Maybe<Array<ResolversTypes['Trips']>> }>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Attachments: Attachments;
  String: Scalars['String']['output'];
  ID: Scalars['ID']['output'];
  Campaigns: Campaigns;
  Float: Scalars['Float']['output'];
  CarrierRates: Omit<CarrierRates, 'carrier'> & { carrier: ResolversParentTypes['Carriers'] };
  Carriers: Omit<Carriers, 'partnerInvoices' | 'rates' | 'shipmentLegs'> & { partnerInvoices?: Maybe<Array<ResolversParentTypes['PartnerInvoices']>>, rates?: Maybe<Array<ResolversParentTypes['CarrierRates']>>, shipmentLegs?: Maybe<Array<ResolversParentTypes['ShipmentLegs']>> };
  Cases: Cases;
  Companies: Companies;
  Contacts: Contacts;
  CreateAttachmentInput: CreateAttachmentInput;
  CreateCampaignInput: CreateCampaignInput;
  CreateCarrierInput: CreateCarrierInput;
  CreateCarrierRateInput: CreateCarrierRateInput;
  CreateCaseInput: CreateCaseInput;
  CreateCompanyInput: CreateCompanyInput;
  CreateContactInput: CreateContactInput;
  CreateDriverInput: CreateDriverInput;
  CreateDriverScheduleInput: CreateDriverScheduleInput;
  CreateExpenseInput: CreateExpenseInput;
  Int: Scalars['Int']['output'];
  CreateGeofenceEventInput: CreateGeofenceEventInput;
  CreateGeofenceInput: CreateGeofenceInput;
  CreateGpsPingInput: CreateGpsPingInput;
  CreateInteractionInput: CreateInteractionInput;
  CreateInvoiceInput: CreateInvoiceInput;
  CreateInvoiceItemInput: CreateInvoiceItemInput;
  CreateLeadInput: CreateLeadInput;
  CreateNotificationInput: CreateNotificationInput;
  Boolean: Scalars['Boolean']['output'];
  CreateOpportunityInput: CreateOpportunityInput;
  CreateOpportunityProductInput: CreateOpportunityProductInput;
  CreatePartnerInvoiceInput: CreatePartnerInvoiceInput;
  CreatePartnerInvoiceItemInput: CreatePartnerInvoiceItemInput;
  CreateProductInput: CreateProductInput;
  CreateProofOfDeliveryInput: CreateProofOfDeliveryInput;
  CreateRouteInput: CreateRouteInput;
  CreateShipmentLegEventInput: CreateShipmentLegEventInput;
  CreateShipmentLegInput: CreateShipmentLegInput;
  CreateTripInput: CreateTripInput;
  CreateTripStopInput: CreateTripStopInput;
  CreateVehicleInput: CreateVehicleInput;
  CreateVehicleMaintenanceInput: CreateVehicleMaintenanceInput;
  CrmMutation: Omit<CrmMutation, 'createAttachment' | 'createCase' | 'createInteraction' | 'createInvoice' | 'createInvoiceItem' | 'createLead' | 'createOpportunity' | 'createOpportunityProduct' | 'createProduct' | 'updateAttachment' | 'updateCase' | 'updateInteraction' | 'updateInvoice' | 'updateInvoiceItem' | 'updateLead' | 'updateOpportunity' | 'updateOpportunityProduct' | 'updateProduct'> & { createAttachment: ResolversParentTypes['Attachments'], createCase: ResolversParentTypes['Cases'], createInteraction: ResolversParentTypes['Interactions'], createInvoice: ResolversParentTypes['Invoices'], createInvoiceItem: ResolversParentTypes['InvoiceItems'], createLead: ResolversParentTypes['Leads'], createOpportunity: ResolversParentTypes['Opportunities'], createOpportunityProduct: ResolversParentTypes['OpportunityProducts'], createProduct: ResolversParentTypes['Products'], updateAttachment: ResolversParentTypes['Attachments'], updateCase: ResolversParentTypes['Cases'], updateInteraction: ResolversParentTypes['Interactions'], updateInvoice: ResolversParentTypes['Invoices'], updateInvoiceItem: ResolversParentTypes['InvoiceItems'], updateLead: ResolversParentTypes['Leads'], updateOpportunity: ResolversParentTypes['Opportunities'], updateOpportunityProduct: ResolversParentTypes['OpportunityProducts'], updateProduct: ResolversParentTypes['Products'] };
  CrmQuery: Omit<CrmQuery, 'attachment' | 'attachments' | 'case' | 'cases' | 'interaction' | 'interactions' | 'invoice' | 'invoiceItem' | 'invoiceItems' | 'invoices' | 'lead' | 'leads' | 'opportunities' | 'opportunity' | 'opportunityProduct' | 'opportunityProducts' | 'product' | 'products'> & { attachment: ResolversParentTypes['Attachments'], attachments: Array<ResolversParentTypes['Attachments']>, case: ResolversParentTypes['Cases'], cases: Array<ResolversParentTypes['Cases']>, interaction: ResolversParentTypes['Interactions'], interactions: Array<ResolversParentTypes['Interactions']>, invoice: ResolversParentTypes['Invoices'], invoiceItem: ResolversParentTypes['InvoiceItems'], invoiceItems: Array<ResolversParentTypes['InvoiceItems']>, invoices: Array<ResolversParentTypes['Invoices']>, lead: ResolversParentTypes['Leads'], leads: Array<ResolversParentTypes['Leads']>, opportunities: Array<ResolversParentTypes['Opportunities']>, opportunity: ResolversParentTypes['Opportunities'], opportunityProduct: ResolversParentTypes['OpportunityProducts'], opportunityProducts: Array<ResolversParentTypes['OpportunityProducts']>, product: ResolversParentTypes['Products'], products: Array<ResolversParentTypes['Products']> };
  DeleteResult: DeleteResult;
  DriverSchedules: Omit<DriverSchedules, 'driver'> & { driver: ResolversParentTypes['Drivers'] };
  Drivers: Omit<Drivers, 'expenses' | 'schedules' | 'trips'> & { expenses?: Maybe<Array<ResolversParentTypes['Expenses']>>, schedules?: Maybe<Array<ResolversParentTypes['DriverSchedules']>>, trips?: Maybe<Array<ResolversParentTypes['Trips']>> };
  Expenses: Omit<Expenses, 'driver' | 'trip'> & { driver?: Maybe<ResolversParentTypes['Drivers']>, trip?: Maybe<ResolversParentTypes['Trips']> };
  GeofenceEvents: Omit<GeofenceEvents, 'geofence' | 'vehicle'> & { geofence: ResolversParentTypes['Geofences'], vehicle: ResolversParentTypes['Vehicles'] };
  Geofences: Omit<Geofences, 'events'> & { events?: Maybe<Array<ResolversParentTypes['GeofenceEvents']>> };
  GpsPings: Omit<GpsPings, 'vehicle'> & { vehicle: ResolversParentTypes['Vehicles'] };
  Interactions: Omit<Interactions, 'case'> & { case?: Maybe<ResolversParentTypes['Cases']> };
  InvoiceItems: Omit<InvoiceItems, 'invoice' | 'product'> & { invoice: ResolversParentTypes['Invoices'], product: ResolversParentTypes['Products'] };
  Invoices: Omit<Invoices, 'items' | 'opportunity'> & { items?: Maybe<Array<ResolversParentTypes['InvoiceItems']>>, opportunity?: Maybe<ResolversParentTypes['Opportunities']> };
  Leads: Omit<Leads, 'convertedOpportunity'> & { convertedOpportunity?: Maybe<ResolversParentTypes['Opportunities']> };
  Mutation: Record<PropertyKey, never>;
  Notifications: Notifications;
  Opportunities: Omit<Opportunities, 'products'> & { products?: Maybe<Array<ResolversParentTypes['OpportunityProducts']>> };
  OpportunityProducts: Omit<OpportunityProducts, 'opportunity' | 'product'> & { opportunity: ResolversParentTypes['Opportunities'], product: ResolversParentTypes['Products'] };
  PartnerInvoiceItems: Omit<PartnerInvoiceItems, 'partnerInvoice' | 'shipmentLeg'> & { partnerInvoice: ResolversParentTypes['PartnerInvoices'], shipmentLeg: ResolversParentTypes['ShipmentLegs'] };
  PartnerInvoices: Omit<PartnerInvoices, 'carrier' | 'items'> & { carrier: ResolversParentTypes['Carriers'], items?: Maybe<Array<ResolversParentTypes['PartnerInvoiceItems']>> };
  Products: Products;
  ProofOfDeliveries: Omit<ProofOfDeliveries, 'tripStop'> & { tripStop: ResolversParentTypes['TripStops'] };
  Query: Record<PropertyKey, never>;
  Routes: Omit<Routes, 'trip'> & { trip: ResolversParentTypes['Trips'] };
  ShipmentLegEvents: Omit<ShipmentLegEvents, 'shipmentLeg'> & { shipmentLeg: ResolversParentTypes['ShipmentLegs'] };
  ShipmentLegs: Omit<ShipmentLegs, 'carrier' | 'events' | 'internalTrip' | 'partnerInvoiceItems'> & { carrier?: Maybe<ResolversParentTypes['Carriers']>, events?: Maybe<Array<ResolversParentTypes['ShipmentLegEvents']>>, internalTrip?: Maybe<ResolversParentTypes['Trips']>, partnerInvoiceItems?: Maybe<Array<ResolversParentTypes['PartnerInvoiceItems']>> };
  TmsMutation: Omit<TmsMutation, 'createCarrier' | 'createCarrierRate' | 'createDriver' | 'createDriverSchedule' | 'createExpense' | 'createGeofence' | 'createGeofenceEvent' | 'createGpsPing' | 'createPartnerInvoice' | 'createPartnerInvoiceItem' | 'createProofOfDelivery' | 'createRoute' | 'createShipmentLeg' | 'createShipmentLegEvent' | 'createTrip' | 'createTripStop' | 'createVehicle' | 'createVehicleMaintenance' | 'updateCarrier' | 'updateCarrierRate' | 'updateDriver' | 'updateDriverSchedule' | 'updateExpense' | 'updateGeofence' | 'updateGeofenceEvent' | 'updateGpsPing' | 'updatePartnerInvoice' | 'updatePartnerInvoiceItem' | 'updateProofOfDelivery' | 'updateRoute' | 'updateShipmentLeg' | 'updateShipmentLegEvent' | 'updateTrip' | 'updateTripStop' | 'updateVehicle' | 'updateVehicleMaintenance'> & { createCarrier: ResolversParentTypes['Carriers'], createCarrierRate: ResolversParentTypes['CarrierRates'], createDriver: ResolversParentTypes['Drivers'], createDriverSchedule: ResolversParentTypes['DriverSchedules'], createExpense: ResolversParentTypes['Expenses'], createGeofence: ResolversParentTypes['Geofences'], createGeofenceEvent: ResolversParentTypes['GeofenceEvents'], createGpsPing: ResolversParentTypes['GpsPings'], createPartnerInvoice: ResolversParentTypes['PartnerInvoices'], createPartnerInvoiceItem: ResolversParentTypes['PartnerInvoiceItems'], createProofOfDelivery: ResolversParentTypes['ProofOfDeliveries'], createRoute: ResolversParentTypes['Routes'], createShipmentLeg: ResolversParentTypes['ShipmentLegs'], createShipmentLegEvent: ResolversParentTypes['ShipmentLegEvents'], createTrip: ResolversParentTypes['Trips'], createTripStop: ResolversParentTypes['TripStops'], createVehicle: ResolversParentTypes['Vehicles'], createVehicleMaintenance: ResolversParentTypes['VehicleMaintenance'], updateCarrier: ResolversParentTypes['Carriers'], updateCarrierRate: ResolversParentTypes['CarrierRates'], updateDriver: ResolversParentTypes['Drivers'], updateDriverSchedule: ResolversParentTypes['DriverSchedules'], updateExpense: ResolversParentTypes['Expenses'], updateGeofence: ResolversParentTypes['Geofences'], updateGeofenceEvent: ResolversParentTypes['GeofenceEvents'], updateGpsPing: ResolversParentTypes['GpsPings'], updatePartnerInvoice: ResolversParentTypes['PartnerInvoices'], updatePartnerInvoiceItem: ResolversParentTypes['PartnerInvoiceItems'], updateProofOfDelivery: ResolversParentTypes['ProofOfDeliveries'], updateRoute: ResolversParentTypes['Routes'], updateShipmentLeg: ResolversParentTypes['ShipmentLegs'], updateShipmentLegEvent: ResolversParentTypes['ShipmentLegEvents'], updateTrip: ResolversParentTypes['Trips'], updateTripStop: ResolversParentTypes['TripStops'], updateVehicle: ResolversParentTypes['Vehicles'], updateVehicleMaintenance: ResolversParentTypes['VehicleMaintenance'] };
  TmsQuery: Omit<TmsQuery, 'carrier' | 'carrierRate' | 'carrierRates' | 'carriers' | 'driver' | 'driverSchedule' | 'driverSchedules' | 'drivers' | 'expense' | 'expenses' | 'geofence' | 'geofenceEvent' | 'geofenceEvents' | 'geofences' | 'gpsPing' | 'gpsPings' | 'partnerInvoice' | 'partnerInvoiceItem' | 'partnerInvoiceItems' | 'partnerInvoices' | 'proofOfDeliveries' | 'proofOfDelivery' | 'route' | 'routes' | 'shipmentLeg' | 'shipmentLegEvent' | 'shipmentLegEvents' | 'shipmentLegs' | 'trip' | 'tripStop' | 'tripStops' | 'trips' | 'vehicle' | 'vehicleMaintenance' | 'vehicleMaintenances' | 'vehicles'> & { carrier: ResolversParentTypes['Carriers'], carrierRate: ResolversParentTypes['CarrierRates'], carrierRates: Array<ResolversParentTypes['CarrierRates']>, carriers: Array<ResolversParentTypes['Carriers']>, driver: ResolversParentTypes['Drivers'], driverSchedule: ResolversParentTypes['DriverSchedules'], driverSchedules: Array<ResolversParentTypes['DriverSchedules']>, drivers: Array<ResolversParentTypes['Drivers']>, expense: ResolversParentTypes['Expenses'], expenses: Array<ResolversParentTypes['Expenses']>, geofence: ResolversParentTypes['Geofences'], geofenceEvent: ResolversParentTypes['GeofenceEvents'], geofenceEvents: Array<ResolversParentTypes['GeofenceEvents']>, geofences: Array<ResolversParentTypes['Geofences']>, gpsPing: ResolversParentTypes['GpsPings'], gpsPings: Array<ResolversParentTypes['GpsPings']>, partnerInvoice: ResolversParentTypes['PartnerInvoices'], partnerInvoiceItem: ResolversParentTypes['PartnerInvoiceItems'], partnerInvoiceItems: Array<ResolversParentTypes['PartnerInvoiceItems']>, partnerInvoices: Array<ResolversParentTypes['PartnerInvoices']>, proofOfDeliveries: Array<ResolversParentTypes['ProofOfDeliveries']>, proofOfDelivery: ResolversParentTypes['ProofOfDeliveries'], route: ResolversParentTypes['Routes'], routes: Array<ResolversParentTypes['Routes']>, shipmentLeg: ResolversParentTypes['ShipmentLegs'], shipmentLegEvent: ResolversParentTypes['ShipmentLegEvents'], shipmentLegEvents: Array<ResolversParentTypes['ShipmentLegEvents']>, shipmentLegs: Array<ResolversParentTypes['ShipmentLegs']>, trip: ResolversParentTypes['Trips'], tripStop: ResolversParentTypes['TripStops'], tripStops: Array<ResolversParentTypes['TripStops']>, trips: Array<ResolversParentTypes['Trips']>, vehicle: ResolversParentTypes['Vehicles'], vehicleMaintenance: ResolversParentTypes['VehicleMaintenance'], vehicleMaintenances: Array<ResolversParentTypes['VehicleMaintenance']>, vehicles: Array<ResolversParentTypes['Vehicles']> };
  TripStops: Omit<TripStops, 'proofOfDeliveries' | 'trip'> & { proofOfDeliveries?: Maybe<Array<ResolversParentTypes['ProofOfDeliveries']>>, trip: ResolversParentTypes['Trips'] };
  Trips: Omit<Trips, 'driver' | 'expenses' | 'routes' | 'shipmentLegs' | 'stops' | 'vehicle'> & { driver?: Maybe<ResolversParentTypes['Drivers']>, expenses?: Maybe<Array<ResolversParentTypes['Expenses']>>, routes?: Maybe<Array<ResolversParentTypes['Routes']>>, shipmentLegs?: Maybe<Array<ResolversParentTypes['ShipmentLegs']>>, stops?: Maybe<Array<ResolversParentTypes['TripStops']>>, vehicle?: Maybe<ResolversParentTypes['Vehicles']> };
  UpdateAttachmentInput: UpdateAttachmentInput;
  UpdateCampaignInput: UpdateCampaignInput;
  UpdateCarrierInput: UpdateCarrierInput;
  UpdateCarrierRateInput: UpdateCarrierRateInput;
  UpdateCaseInput: UpdateCaseInput;
  UpdateCompanyInput: UpdateCompanyInput;
  UpdateContactInput: UpdateContactInput;
  UpdateDriverInput: UpdateDriverInput;
  UpdateDriverScheduleInput: UpdateDriverScheduleInput;
  UpdateExpenseInput: UpdateExpenseInput;
  UpdateGeofenceEventInput: UpdateGeofenceEventInput;
  UpdateGeofenceInput: UpdateGeofenceInput;
  UpdateGpsPingInput: UpdateGpsPingInput;
  UpdateInteractionInput: UpdateInteractionInput;
  UpdateInvoiceInput: UpdateInvoiceInput;
  UpdateInvoiceItemInput: UpdateInvoiceItemInput;
  UpdateLeadInput: UpdateLeadInput;
  UpdateNotificationInput: UpdateNotificationInput;
  UpdateOpportunityInput: UpdateOpportunityInput;
  UpdateOpportunityProductInput: UpdateOpportunityProductInput;
  UpdatePartnerInvoiceInput: UpdatePartnerInvoiceInput;
  UpdatePartnerInvoiceItemInput: UpdatePartnerInvoiceItemInput;
  UpdateProductInput: UpdateProductInput;
  UpdateProofOfDeliveryInput: UpdateProofOfDeliveryInput;
  UpdateRouteInput: UpdateRouteInput;
  UpdateShipmentLegEventInput: UpdateShipmentLegEventInput;
  UpdateShipmentLegInput: UpdateShipmentLegInput;
  UpdateTripInput: UpdateTripInput;
  UpdateTripStopInput: UpdateTripStopInput;
  UpdateVehicleInput: UpdateVehicleInput;
  UpdateVehicleMaintenanceInput: UpdateVehicleMaintenanceInput;
  User: User;
  VehicleMaintenance: Omit<VehicleMaintenance, 'vehicle'> & { vehicle: ResolversParentTypes['Vehicles'] };
  Vehicles: Omit<Vehicles, 'geofenceEvents' | 'gpsPings' | 'maintenances' | 'trips'> & { geofenceEvents?: Maybe<Array<ResolversParentTypes['GeofenceEvents']>>, gpsPings?: Maybe<Array<ResolversParentTypes['GpsPings']>>, maintenances?: Maybe<Array<ResolversParentTypes['VehicleMaintenance']>>, trips?: Maybe<Array<ResolversParentTypes['Trips']>> };
};

export type AttachmentsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Attachments'] = ResolversParentTypes['Attachments']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filePath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mimeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recordId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  recordType?: Resolver<Maybe<ResolversTypes['RecordType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CampaignsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Campaigns'] = ResolversParentTypes['Campaigns']> = {
  budget?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CarrierRateUnitResolvers = EnumResolverSignature<{ FLAT_RATE?: any, PER_CONTAINER?: any, PER_KG?: any, PER_KM?: any, PER_MILE?: any }, ResolversTypes['CarrierRateUnit']>;

export type CarrierRatesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CarrierRates'] = ResolversParentTypes['CarrierRates']> = {
  carrier?: Resolver<ResolversTypes['Carriers'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destination?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  serviceType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unit?: Resolver<Maybe<ResolversTypes['CarrierRateUnit']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CarriersResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Carriers'] = ResolversParentTypes['Carriers']> = {
  contactDetails?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  partnerInvoices?: Resolver<Maybe<Array<ResolversTypes['PartnerInvoices']>>, ParentType, ContextType>;
  rates?: Resolver<Maybe<Array<ResolversTypes['CarrierRates']>>, ParentType, ContextType>;
  servicesOffered?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shipmentLegs?: Resolver<Maybe<Array<ResolversTypes['ShipmentLegs']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CasePriorityResolvers = EnumResolverSignature<{ CRITICAL?: any, HIGH?: any, LOW?: any, MEDIUM?: any }, ResolversTypes['CasePriority']>;

export type CaseStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, CLOSED?: any, ESCALATED?: any, IN_PROGRESS?: any, NEW?: any, RESOLVED?: any, WAITING_FOR_CUSTOMER?: any, WAITING_FOR_INTERNAL?: any }, ResolversTypes['CaseStatus']>;

export type CaseTypeResolvers = EnumResolverSignature<{ BUG_REPORT?: any, COMPLAINT?: any, FEATURE_REQUEST?: any, PROBLEM?: any, QUESTION?: any, TECHNICAL_SUPPORT?: any }, ResolversTypes['CaseType']>;

export type CasesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Cases'] = ResolversParentTypes['Cases']> = {
  caseNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contact?: Resolver<Maybe<ResolversTypes['Contacts']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['CasePriority']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['CaseStatus']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['CaseType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CompaniesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Companies'] = ResolversParentTypes['Companies']> = {
  annualRevenue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  industry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ContactsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Contacts'] = ResolversParentTypes['Contacts']> = {
  company?: Resolver<Maybe<ResolversTypes['Companies']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  jobTitle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CrmMutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CrmMutation'] = ResolversParentTypes['CrmMutation']> = {
  createAttachment?: Resolver<ResolversTypes['Attachments'], ParentType, ContextType, RequireFields<CrmMutationcreateAttachmentArgs, 'value'>>;
  createCampaign?: Resolver<ResolversTypes['Campaigns'], ParentType, ContextType, RequireFields<CrmMutationcreateCampaignArgs, 'value'>>;
  createCase?: Resolver<ResolversTypes['Cases'], ParentType, ContextType, RequireFields<CrmMutationcreateCaseArgs, 'value'>>;
  createCompany?: Resolver<ResolversTypes['Companies'], ParentType, ContextType, RequireFields<CrmMutationcreateCompanyArgs, 'value'>>;
  createContact?: Resolver<ResolversTypes['Contacts'], ParentType, ContextType, RequireFields<CrmMutationcreateContactArgs, 'value'>>;
  createInteraction?: Resolver<ResolversTypes['Interactions'], ParentType, ContextType, RequireFields<CrmMutationcreateInteractionArgs, 'value'>>;
  createInvoice?: Resolver<ResolversTypes['Invoices'], ParentType, ContextType, RequireFields<CrmMutationcreateInvoiceArgs, 'value'>>;
  createInvoiceItem?: Resolver<ResolversTypes['InvoiceItems'], ParentType, ContextType, RequireFields<CrmMutationcreateInvoiceItemArgs, 'value'>>;
  createLead?: Resolver<ResolversTypes['Leads'], ParentType, ContextType, RequireFields<CrmMutationcreateLeadArgs, 'value'>>;
  createNotification?: Resolver<ResolversTypes['Notifications'], ParentType, ContextType, RequireFields<CrmMutationcreateNotificationArgs, 'value'>>;
  createOpportunity?: Resolver<ResolversTypes['Opportunities'], ParentType, ContextType, RequireFields<CrmMutationcreateOpportunityArgs, 'value'>>;
  createOpportunityProduct?: Resolver<ResolversTypes['OpportunityProducts'], ParentType, ContextType, RequireFields<CrmMutationcreateOpportunityProductArgs, 'value'>>;
  createProduct?: Resolver<ResolversTypes['Products'], ParentType, ContextType, RequireFields<CrmMutationcreateProductArgs, 'value'>>;
  removeAttachment?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationremoveAttachmentArgs, 'id'>>;
  removeCampaign?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationremoveCampaignArgs, 'id'>>;
  removeCase?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationremoveCaseArgs, 'id'>>;
  removeCompany?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationremoveCompanyArgs, 'id'>>;
  removeContact?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationremoveContactArgs, 'id'>>;
  removeInteraction?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationremoveInteractionArgs, 'id'>>;
  removeInvoice?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationremoveInvoiceArgs, 'id'>>;
  removeInvoiceItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationremoveInvoiceItemArgs, 'id'>>;
  removeLead?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationremoveLeadArgs, 'id'>>;
  removeNotification?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationremoveNotificationArgs, 'id'>>;
  removeOpportunity?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationremoveOpportunityArgs, 'id'>>;
  removeOpportunityProduct?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationremoveOpportunityProductArgs, 'opportunityId' | 'productId'>>;
  removeProduct?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<CrmMutationremoveProductArgs, 'id'>>;
  updateAttachment?: Resolver<ResolversTypes['Attachments'], ParentType, ContextType, RequireFields<CrmMutationupdateAttachmentArgs, 'id'>>;
  updateCampaign?: Resolver<ResolversTypes['Campaigns'], ParentType, ContextType, RequireFields<CrmMutationupdateCampaignArgs, 'id'>>;
  updateCase?: Resolver<ResolversTypes['Cases'], ParentType, ContextType, RequireFields<CrmMutationupdateCaseArgs, 'id'>>;
  updateCompany?: Resolver<ResolversTypes['Companies'], ParentType, ContextType, RequireFields<CrmMutationupdateCompanyArgs, 'id'>>;
  updateContact?: Resolver<ResolversTypes['Contacts'], ParentType, ContextType, RequireFields<CrmMutationupdateContactArgs, 'id'>>;
  updateInteraction?: Resolver<ResolversTypes['Interactions'], ParentType, ContextType, RequireFields<CrmMutationupdateInteractionArgs, 'id'>>;
  updateInvoice?: Resolver<ResolversTypes['Invoices'], ParentType, ContextType, RequireFields<CrmMutationupdateInvoiceArgs, 'id'>>;
  updateInvoiceItem?: Resolver<ResolversTypes['InvoiceItems'], ParentType, ContextType, RequireFields<CrmMutationupdateInvoiceItemArgs, 'id'>>;
  updateLead?: Resolver<ResolversTypes['Leads'], ParentType, ContextType, RequireFields<CrmMutationupdateLeadArgs, 'id'>>;
  updateNotification?: Resolver<ResolversTypes['Notifications'], ParentType, ContextType, RequireFields<CrmMutationupdateNotificationArgs, 'id'>>;
  updateOpportunity?: Resolver<ResolversTypes['Opportunities'], ParentType, ContextType, RequireFields<CrmMutationupdateOpportunityArgs, 'id'>>;
  updateOpportunityProduct?: Resolver<ResolversTypes['OpportunityProducts'], ParentType, ContextType, RequireFields<CrmMutationupdateOpportunityProductArgs, 'opportunityId' | 'productId'>>;
  updateProduct?: Resolver<ResolversTypes['Products'], ParentType, ContextType, RequireFields<CrmMutationupdateProductArgs, 'id'>>;
};

export type CrmQueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CrmQuery'] = ResolversParentTypes['CrmQuery']> = {
  attachment?: Resolver<ResolversTypes['Attachments'], ParentType, ContextType, RequireFields<CrmQueryattachmentArgs, 'id'>>;
  attachments?: Resolver<Array<ResolversTypes['Attachments']>, ParentType, ContextType, Partial<CrmQueryattachmentsArgs>>;
  campaign?: Resolver<ResolversTypes['Campaigns'], ParentType, ContextType, RequireFields<CrmQuerycampaignArgs, 'id'>>;
  campaigns?: Resolver<Array<ResolversTypes['Campaigns']>, ParentType, ContextType, Partial<CrmQuerycampaignsArgs>>;
  case?: Resolver<ResolversTypes['Cases'], ParentType, ContextType, RequireFields<CrmQuerycaseArgs, 'id'>>;
  cases?: Resolver<Array<ResolversTypes['Cases']>, ParentType, ContextType, Partial<CrmQuerycasesArgs>>;
  companies?: Resolver<Array<ResolversTypes['Companies']>, ParentType, ContextType, Partial<CrmQuerycompaniesArgs>>;
  company?: Resolver<ResolversTypes['Companies'], ParentType, ContextType, RequireFields<CrmQuerycompanyArgs, 'id'>>;
  contact?: Resolver<ResolversTypes['Contacts'], ParentType, ContextType, RequireFields<CrmQuerycontactArgs, 'id'>>;
  contacts?: Resolver<Array<ResolversTypes['Contacts']>, ParentType, ContextType, Partial<CrmQuerycontactsArgs>>;
  interaction?: Resolver<ResolversTypes['Interactions'], ParentType, ContextType, RequireFields<CrmQueryinteractionArgs, 'id'>>;
  interactions?: Resolver<Array<ResolversTypes['Interactions']>, ParentType, ContextType, Partial<CrmQueryinteractionsArgs>>;
  invoice?: Resolver<ResolversTypes['Invoices'], ParentType, ContextType, RequireFields<CrmQueryinvoiceArgs, 'id'>>;
  invoiceItem?: Resolver<ResolversTypes['InvoiceItems'], ParentType, ContextType, RequireFields<CrmQueryinvoiceItemArgs, 'id'>>;
  invoiceItems?: Resolver<Array<ResolversTypes['InvoiceItems']>, ParentType, ContextType, Partial<CrmQueryinvoiceItemsArgs>>;
  invoices?: Resolver<Array<ResolversTypes['Invoices']>, ParentType, ContextType, Partial<CrmQueryinvoicesArgs>>;
  lead?: Resolver<ResolversTypes['Leads'], ParentType, ContextType, RequireFields<CrmQueryleadArgs, 'id'>>;
  leads?: Resolver<Array<ResolversTypes['Leads']>, ParentType, ContextType, Partial<CrmQueryleadsArgs>>;
  notification?: Resolver<ResolversTypes['Notifications'], ParentType, ContextType, RequireFields<CrmQuerynotificationArgs, 'id'>>;
  notifications?: Resolver<Array<ResolversTypes['Notifications']>, ParentType, ContextType, Partial<CrmQuerynotificationsArgs>>;
  opportunities?: Resolver<Array<ResolversTypes['Opportunities']>, ParentType, ContextType, Partial<CrmQueryopportunitiesArgs>>;
  opportunity?: Resolver<ResolversTypes['Opportunities'], ParentType, ContextType, RequireFields<CrmQueryopportunityArgs, 'id'>>;
  opportunityProduct?: Resolver<ResolversTypes['OpportunityProducts'], ParentType, ContextType, RequireFields<CrmQueryopportunityProductArgs, 'opportunityId' | 'productId'>>;
  opportunityProducts?: Resolver<Array<ResolversTypes['OpportunityProducts']>, ParentType, ContextType, Partial<CrmQueryopportunityProductsArgs>>;
  product?: Resolver<ResolversTypes['Products'], ParentType, ContextType, RequireFields<CrmQueryproductArgs, 'id'>>;
  products?: Resolver<Array<ResolversTypes['Products']>, ParentType, ContextType, Partial<CrmQueryproductsArgs>>;
};

export type CurrencyResolvers = EnumResolverSignature<{ AUD?: any, CAD?: any, EUR?: any, GBP?: any, JPY?: any, PHP?: any, USD?: any }, ResolversTypes['Currency']>;

export type DeleteResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DeleteResult'] = ResolversParentTypes['DeleteResult']> = {
  numDeletedRows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type DriverScheduleReasonResolvers = EnumResolverSignature<{ PERSONAL_LEAVE?: any, SICK_LEAVE?: any, TRAINING?: any, VACATION?: any }, ResolversTypes['DriverScheduleReason']>;

export type DriverSchedulesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DriverSchedules'] = ResolversParentTypes['DriverSchedules']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  driver?: Resolver<ResolversTypes['Drivers'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['DriverScheduleReason']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type DriverStatusResolvers = EnumResolverSignature<{ ACTIVE?: any, INACTIVE?: any, ON_LEAVE?: any }, ResolversTypes['DriverStatus']>;

export type DriversResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Drivers'] = ResolversParentTypes['Drivers']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expenses?: Resolver<Maybe<Array<ResolversTypes['Expenses']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  licenseExpiryDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  licenseNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  schedules?: Resolver<Maybe<Array<ResolversTypes['DriverSchedules']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['DriverStatus']>, ParentType, ContextType>;
  trips?: Resolver<Maybe<Array<ResolversTypes['Trips']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type ExpenseStatusResolvers = EnumResolverSignature<{ APPROVED?: any, PENDING?: any, REIMBURSED?: any, REJECTED?: any }, ResolversTypes['ExpenseStatus']>;

export type ExpenseTypeResolvers = EnumResolverSignature<{ ACCOMMODATION?: any, FUEL?: any, MAINTENANCE?: any, MEALS?: any, PARKING?: any, TOLLS?: any }, ResolversTypes['ExpenseType']>;

export type ExpensesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Expenses'] = ResolversParentTypes['Expenses']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['Currency']>, ParentType, ContextType>;
  driver?: Resolver<Maybe<ResolversTypes['Drivers']>, ParentType, ContextType>;
  fuelQuantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  odometerReading?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  receiptUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ExpenseStatus']>, ParentType, ContextType>;
  trip?: Resolver<Maybe<ResolversTypes['Trips']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ExpenseType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type GeofenceEventTypeResolvers = EnumResolverSignature<{ ENTER?: any, EXIT?: any }, ResolversTypes['GeofenceEventType']>;

export type GeofenceEventsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['GeofenceEvents'] = ResolversParentTypes['GeofenceEvents']> = {
  eventType?: Resolver<ResolversTypes['GeofenceEventType'], ParentType, ContextType>;
  geofence?: Resolver<ResolversTypes['Geofences'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vehicle?: Resolver<ResolversTypes['Vehicles'], ParentType, ContextType>;
};

export type GeofencesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Geofences'] = ResolversParentTypes['Geofences']> = {
  coordinates?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  events?: Resolver<Maybe<Array<ResolversTypes['GeofenceEvents']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type GpsPingsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['GpsPings'] = ResolversParentTypes['GpsPings']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  vehicle?: Resolver<ResolversTypes['Vehicles'], ParentType, ContextType>;
};

export type InteractionTypeResolvers = EnumResolverSignature<{ CALL?: any, EMAIL?: any, MEETING?: any, TEXT?: any }, ResolversTypes['InteractionType']>;

export type InteractionsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Interactions'] = ResolversParentTypes['Interactions']> = {
  case?: Resolver<Maybe<ResolversTypes['Cases']>, ParentType, ContextType>;
  contact?: Resolver<ResolversTypes['Contacts'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  interactionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  outcome?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['InteractionType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type InvoiceItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InvoiceItems'] = ResolversParentTypes['InvoiceItems']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invoice?: Resolver<ResolversTypes['Invoices'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Products'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type InvoiceStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, DRAFT?: any, OVERDUE?: any, PAID?: any, SENT?: any }, ResolversTypes['InvoiceStatus']>;

export type InvoicesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Invoices'] = ResolversParentTypes['Invoices']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  issueDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['InvoiceItems']>>, ParentType, ContextType>;
  opportunity?: Resolver<Maybe<ResolversTypes['Opportunities']>, ParentType, ContextType>;
  paidAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentMethod?: Resolver<Maybe<ResolversTypes['PaymentMethod']>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['InvoiceStatus']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type LeadSourceResolvers = EnumResolverSignature<{ ADVERTISEMENT?: any, COLD_CALL?: any, EMAIL_CAMPAIGN?: any, EVENT?: any, OTHER?: any, PARTNER?: any, REFERRAL?: any, SOCIAL_MEDIA?: any, WEBSITE?: any }, ResolversTypes['LeadSource']>;

export type LeadStatusResolvers = EnumResolverSignature<{ CONTACTED?: any, CONVERTED?: any, NEW?: any, QUALIFIED?: any, UNQUALIFIED?: any }, ResolversTypes['LeadStatus']>;

export type LeadsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Leads'] = ResolversParentTypes['Leads']> = {
  campaign?: Resolver<Maybe<ResolversTypes['Campaigns']>, ParentType, ContextType>;
  convertedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  convertedCompany?: Resolver<Maybe<ResolversTypes['Companies']>, ParentType, ContextType>;
  convertedContact?: Resolver<Maybe<ResolversTypes['Contacts']>, ParentType, ContextType>;
  convertedOpportunity?: Resolver<Maybe<ResolversTypes['Opportunities']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  leadScore?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  leadSource?: Resolver<Maybe<ResolversTypes['LeadSource']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['LeadStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  crm?: Resolver<Maybe<ResolversTypes['CrmMutation']>, ParentType, ContextType>;
  tms?: Resolver<Maybe<ResolversTypes['TmsMutation']>, ParentType, ContextType>;
};

export type NotificationsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Notifications'] = ResolversParentTypes['Notifications']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isRead?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type OpportunitiesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Opportunities'] = ResolversParentTypes['Opportunities']> = {
  campaign?: Resolver<Maybe<ResolversTypes['Campaigns']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['Companies']>, ParentType, ContextType>;
  contact?: Resolver<Maybe<ResolversTypes['Contacts']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dealValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  expectedCloseDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lostReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  probability?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['OpportunityProducts']>>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['OpportunitySource']>, ParentType, ContextType>;
  stage?: Resolver<Maybe<ResolversTypes['OpportunityStage']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type OpportunityProductsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['OpportunityProducts'] = ResolversParentTypes['OpportunityProducts']> = {
  opportunity?: Resolver<ResolversTypes['Opportunities'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Products'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type OpportunitySourceResolvers = EnumResolverSignature<{ ADVERTISEMENT?: any, COLD_CALL?: any, EMAIL_CAMPAIGN?: any, EVENT?: any, EXISTING_CUSTOMER?: any, OTHER?: any, PARTNER?: any, REFERRAL?: any, SOCIAL_MEDIA?: any, WEBSITE?: any }, ResolversTypes['OpportunitySource']>;

export type OpportunityStageResolvers = EnumResolverSignature<{ CLOSED_LOST?: any, CLOSED_WON?: any, DEMO?: any, NEED_ANALYSIS?: any, NEGOTIATION?: any, PROPOSAL?: any, PROSPECTING?: any, QUALIFICATION?: any }, ResolversTypes['OpportunityStage']>;

export type PartnerInvoiceItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PartnerInvoiceItems'] = ResolversParentTypes['PartnerInvoiceItems']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  partnerInvoice?: Resolver<ResolversTypes['PartnerInvoices'], ParentType, ContextType>;
  shipmentLeg?: Resolver<ResolversTypes['ShipmentLegs'], ParentType, ContextType>;
};

export type PartnerInvoiceStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, DISPUTED?: any, OVERDUE?: any, PAID?: any, PENDING?: any }, ResolversTypes['PartnerInvoiceStatus']>;

export type PartnerInvoicesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PartnerInvoices'] = ResolversParentTypes['PartnerInvoices']> = {
  carrier?: Resolver<ResolversTypes['Carriers'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invoiceDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invoiceNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['PartnerInvoiceItems']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['PartnerInvoiceStatus']>, ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PaymentMethodResolvers = EnumResolverSignature<{ BANK_TRANSFER?: any, CASH?: any, CHECK?: any, CREDIT_CARD?: any, PAYPAL?: any, STRIPE?: any, WIRE_TRANSFER?: any }, ResolversTypes['PaymentMethod']>;

export type ProductTypeResolvers = EnumResolverSignature<{ DIGITAL?: any, GOOD?: any, SERVICE?: any, SUBSCRIPTION?: any }, ResolversTypes['ProductType']>;

export type ProductsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Products'] = ResolversParentTypes['Products']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ProductType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ProofOfDeliveriesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ProofOfDeliveries'] = ResolversParentTypes['ProofOfDeliveries']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  filePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tripStop?: Resolver<ResolversTypes['TripStops'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ProofType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ProofTypeResolvers = EnumResolverSignature<{ BARCODE_SCAN?: any, PHOTO?: any, PIN_VERIFICATION?: any, SIGNATURE?: any }, ResolversTypes['ProofType']>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  crm?: Resolver<Maybe<ResolversTypes['CrmQuery']>, ParentType, ContextType>;
  tms?: Resolver<Maybe<ResolversTypes['TmsQuery']>, ParentType, ContextType>;
};

export type RecordTypeResolvers = EnumResolverSignature<{ CAMPAIGNS?: any, CASES?: any, COMPANIES?: any, CONTACTS?: any, INTERACTIONS?: any, INVOICES?: any, LEADS?: any, OPPORTUNITIES?: any, PRODUCTS?: any }, ResolversTypes['RecordType']>;

export type RoutesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Routes'] = ResolversParentTypes['Routes']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  optimizedRouteData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalDistance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalDuration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  trip?: Resolver<ResolversTypes['Trips'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ShipmentLegEventsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ShipmentLegEvents'] = ResolversParentTypes['ShipmentLegEvents']> = {
  eventTimestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shipmentLeg?: Resolver<ResolversTypes['ShipmentLegs'], ParentType, ContextType>;
  statusMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ShipmentLegStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, DELIVERED?: any, FAILED?: any, IN_TRANSIT?: any, PENDING?: any }, ResolversTypes['ShipmentLegStatus']>;

export type ShipmentLegsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ShipmentLegs'] = ResolversParentTypes['ShipmentLegs']> = {
  carrier?: Resolver<Maybe<ResolversTypes['Carriers']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  events?: Resolver<Maybe<Array<ResolversTypes['ShipmentLegEvents']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  internalTrip?: Resolver<Maybe<ResolversTypes['Trips']>, ParentType, ContextType>;
  legSequence?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  partnerInvoiceItems?: Resolver<Maybe<Array<ResolversTypes['PartnerInvoiceItems']>>, ParentType, ContextType>;
  shipmentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  startLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ShipmentLegStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type TmsMutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TmsMutation'] = ResolversParentTypes['TmsMutation']> = {
  createCarrier?: Resolver<ResolversTypes['Carriers'], ParentType, ContextType, RequireFields<TmsMutationcreateCarrierArgs, 'value'>>;
  createCarrierRate?: Resolver<ResolversTypes['CarrierRates'], ParentType, ContextType, RequireFields<TmsMutationcreateCarrierRateArgs, 'value'>>;
  createDriver?: Resolver<ResolversTypes['Drivers'], ParentType, ContextType, RequireFields<TmsMutationcreateDriverArgs, 'value'>>;
  createDriverSchedule?: Resolver<ResolversTypes['DriverSchedules'], ParentType, ContextType, RequireFields<TmsMutationcreateDriverScheduleArgs, 'value'>>;
  createExpense?: Resolver<ResolversTypes['Expenses'], ParentType, ContextType, RequireFields<TmsMutationcreateExpenseArgs, 'value'>>;
  createGeofence?: Resolver<ResolversTypes['Geofences'], ParentType, ContextType, RequireFields<TmsMutationcreateGeofenceArgs, 'value'>>;
  createGeofenceEvent?: Resolver<ResolversTypes['GeofenceEvents'], ParentType, ContextType, RequireFields<TmsMutationcreateGeofenceEventArgs, 'value'>>;
  createGpsPing?: Resolver<ResolversTypes['GpsPings'], ParentType, ContextType, RequireFields<TmsMutationcreateGpsPingArgs, 'value'>>;
  createPartnerInvoice?: Resolver<ResolversTypes['PartnerInvoices'], ParentType, ContextType, RequireFields<TmsMutationcreatePartnerInvoiceArgs, 'value'>>;
  createPartnerInvoiceItem?: Resolver<ResolversTypes['PartnerInvoiceItems'], ParentType, ContextType, RequireFields<TmsMutationcreatePartnerInvoiceItemArgs, 'value'>>;
  createProofOfDelivery?: Resolver<ResolversTypes['ProofOfDeliveries'], ParentType, ContextType, RequireFields<TmsMutationcreateProofOfDeliveryArgs, 'value'>>;
  createRoute?: Resolver<ResolversTypes['Routes'], ParentType, ContextType, RequireFields<TmsMutationcreateRouteArgs, 'value'>>;
  createShipmentLeg?: Resolver<ResolversTypes['ShipmentLegs'], ParentType, ContextType, RequireFields<TmsMutationcreateShipmentLegArgs, 'value'>>;
  createShipmentLegEvent?: Resolver<ResolversTypes['ShipmentLegEvents'], ParentType, ContextType, RequireFields<TmsMutationcreateShipmentLegEventArgs, 'value'>>;
  createTrip?: Resolver<ResolversTypes['Trips'], ParentType, ContextType, RequireFields<TmsMutationcreateTripArgs, 'value'>>;
  createTripStop?: Resolver<ResolversTypes['TripStops'], ParentType, ContextType, RequireFields<TmsMutationcreateTripStopArgs, 'value'>>;
  createVehicle?: Resolver<ResolversTypes['Vehicles'], ParentType, ContextType, RequireFields<TmsMutationcreateVehicleArgs, 'value'>>;
  createVehicleMaintenance?: Resolver<ResolversTypes['VehicleMaintenance'], ParentType, ContextType, RequireFields<TmsMutationcreateVehicleMaintenanceArgs, 'value'>>;
  removeCarrier?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveCarrierArgs, 'id'>>;
  removeCarrierRate?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveCarrierRateArgs, 'id'>>;
  removeDriver?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveDriverArgs, 'id'>>;
  removeDriverSchedule?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveDriverScheduleArgs, 'id'>>;
  removeExpense?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveExpenseArgs, 'id'>>;
  removeGeofence?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveGeofenceArgs, 'id'>>;
  removeGeofenceEvent?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveGeofenceEventArgs, 'id'>>;
  removeGpsPing?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveGpsPingArgs, 'id'>>;
  removePartnerInvoice?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremovePartnerInvoiceArgs, 'id'>>;
  removePartnerInvoiceItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremovePartnerInvoiceItemArgs, 'id'>>;
  removeProofOfDelivery?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveProofOfDeliveryArgs, 'id'>>;
  removeRoute?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveRouteArgs, 'id'>>;
  removeShipmentLeg?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveShipmentLegArgs, 'id'>>;
  removeShipmentLegEvent?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveShipmentLegEventArgs, 'id'>>;
  removeTrip?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveTripArgs, 'id'>>;
  removeTripStop?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveTripStopArgs, 'id'>>;
  removeVehicle?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveVehicleArgs, 'id'>>;
  removeVehicleMaintenance?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<TmsMutationremoveVehicleMaintenanceArgs, 'id'>>;
  updateCarrier?: Resolver<ResolversTypes['Carriers'], ParentType, ContextType, RequireFields<TmsMutationupdateCarrierArgs, 'id'>>;
  updateCarrierRate?: Resolver<ResolversTypes['CarrierRates'], ParentType, ContextType, RequireFields<TmsMutationupdateCarrierRateArgs, 'id'>>;
  updateDriver?: Resolver<ResolversTypes['Drivers'], ParentType, ContextType, RequireFields<TmsMutationupdateDriverArgs, 'id'>>;
  updateDriverSchedule?: Resolver<ResolversTypes['DriverSchedules'], ParentType, ContextType, RequireFields<TmsMutationupdateDriverScheduleArgs, 'id'>>;
  updateExpense?: Resolver<ResolversTypes['Expenses'], ParentType, ContextType, RequireFields<TmsMutationupdateExpenseArgs, 'id'>>;
  updateGeofence?: Resolver<ResolversTypes['Geofences'], ParentType, ContextType, RequireFields<TmsMutationupdateGeofenceArgs, 'id'>>;
  updateGeofenceEvent?: Resolver<ResolversTypes['GeofenceEvents'], ParentType, ContextType, RequireFields<TmsMutationupdateGeofenceEventArgs, 'id'>>;
  updateGpsPing?: Resolver<ResolversTypes['GpsPings'], ParentType, ContextType, RequireFields<TmsMutationupdateGpsPingArgs, 'id'>>;
  updatePartnerInvoice?: Resolver<ResolversTypes['PartnerInvoices'], ParentType, ContextType, RequireFields<TmsMutationupdatePartnerInvoiceArgs, 'id'>>;
  updatePartnerInvoiceItem?: Resolver<ResolversTypes['PartnerInvoiceItems'], ParentType, ContextType, RequireFields<TmsMutationupdatePartnerInvoiceItemArgs, 'id'>>;
  updateProofOfDelivery?: Resolver<ResolversTypes['ProofOfDeliveries'], ParentType, ContextType, RequireFields<TmsMutationupdateProofOfDeliveryArgs, 'id'>>;
  updateRoute?: Resolver<ResolversTypes['Routes'], ParentType, ContextType, RequireFields<TmsMutationupdateRouteArgs, 'id'>>;
  updateShipmentLeg?: Resolver<ResolversTypes['ShipmentLegs'], ParentType, ContextType, RequireFields<TmsMutationupdateShipmentLegArgs, 'id'>>;
  updateShipmentLegEvent?: Resolver<ResolversTypes['ShipmentLegEvents'], ParentType, ContextType, RequireFields<TmsMutationupdateShipmentLegEventArgs, 'id'>>;
  updateTrip?: Resolver<ResolversTypes['Trips'], ParentType, ContextType, RequireFields<TmsMutationupdateTripArgs, 'id'>>;
  updateTripStop?: Resolver<ResolversTypes['TripStops'], ParentType, ContextType, RequireFields<TmsMutationupdateTripStopArgs, 'id'>>;
  updateVehicle?: Resolver<ResolversTypes['Vehicles'], ParentType, ContextType, RequireFields<TmsMutationupdateVehicleArgs, 'id'>>;
  updateVehicleMaintenance?: Resolver<ResolversTypes['VehicleMaintenance'], ParentType, ContextType, RequireFields<TmsMutationupdateVehicleMaintenanceArgs, 'id'>>;
};

export type TmsQueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TmsQuery'] = ResolversParentTypes['TmsQuery']> = {
  carrier?: Resolver<ResolversTypes['Carriers'], ParentType, ContextType, RequireFields<TmsQuerycarrierArgs, 'id'>>;
  carrierRate?: Resolver<ResolversTypes['CarrierRates'], ParentType, ContextType, RequireFields<TmsQuerycarrierRateArgs, 'id'>>;
  carrierRates?: Resolver<Array<ResolversTypes['CarrierRates']>, ParentType, ContextType, Partial<TmsQuerycarrierRatesArgs>>;
  carriers?: Resolver<Array<ResolversTypes['Carriers']>, ParentType, ContextType, Partial<TmsQuerycarriersArgs>>;
  driver?: Resolver<ResolversTypes['Drivers'], ParentType, ContextType, RequireFields<TmsQuerydriverArgs, 'id'>>;
  driverSchedule?: Resolver<ResolversTypes['DriverSchedules'], ParentType, ContextType, RequireFields<TmsQuerydriverScheduleArgs, 'id'>>;
  driverSchedules?: Resolver<Array<ResolversTypes['DriverSchedules']>, ParentType, ContextType, Partial<TmsQuerydriverSchedulesArgs>>;
  drivers?: Resolver<Array<ResolversTypes['Drivers']>, ParentType, ContextType, Partial<TmsQuerydriversArgs>>;
  expense?: Resolver<ResolversTypes['Expenses'], ParentType, ContextType, RequireFields<TmsQueryexpenseArgs, 'id'>>;
  expenses?: Resolver<Array<ResolversTypes['Expenses']>, ParentType, ContextType, Partial<TmsQueryexpensesArgs>>;
  geofence?: Resolver<ResolversTypes['Geofences'], ParentType, ContextType, RequireFields<TmsQuerygeofenceArgs, 'id'>>;
  geofenceEvent?: Resolver<ResolversTypes['GeofenceEvents'], ParentType, ContextType, RequireFields<TmsQuerygeofenceEventArgs, 'id'>>;
  geofenceEvents?: Resolver<Array<ResolversTypes['GeofenceEvents']>, ParentType, ContextType, Partial<TmsQuerygeofenceEventsArgs>>;
  geofences?: Resolver<Array<ResolversTypes['Geofences']>, ParentType, ContextType, Partial<TmsQuerygeofencesArgs>>;
  gpsPing?: Resolver<ResolversTypes['GpsPings'], ParentType, ContextType, RequireFields<TmsQuerygpsPingArgs, 'id'>>;
  gpsPings?: Resolver<Array<ResolversTypes['GpsPings']>, ParentType, ContextType, Partial<TmsQuerygpsPingsArgs>>;
  partnerInvoice?: Resolver<ResolversTypes['PartnerInvoices'], ParentType, ContextType, RequireFields<TmsQuerypartnerInvoiceArgs, 'id'>>;
  partnerInvoiceItem?: Resolver<ResolversTypes['PartnerInvoiceItems'], ParentType, ContextType, RequireFields<TmsQuerypartnerInvoiceItemArgs, 'id'>>;
  partnerInvoiceItems?: Resolver<Array<ResolversTypes['PartnerInvoiceItems']>, ParentType, ContextType, Partial<TmsQuerypartnerInvoiceItemsArgs>>;
  partnerInvoices?: Resolver<Array<ResolversTypes['PartnerInvoices']>, ParentType, ContextType, Partial<TmsQuerypartnerInvoicesArgs>>;
  proofOfDeliveries?: Resolver<Array<ResolversTypes['ProofOfDeliveries']>, ParentType, ContextType, Partial<TmsQueryproofOfDeliveriesArgs>>;
  proofOfDelivery?: Resolver<ResolversTypes['ProofOfDeliveries'], ParentType, ContextType, RequireFields<TmsQueryproofOfDeliveryArgs, 'id'>>;
  route?: Resolver<ResolversTypes['Routes'], ParentType, ContextType, RequireFields<TmsQueryrouteArgs, 'id'>>;
  routes?: Resolver<Array<ResolversTypes['Routes']>, ParentType, ContextType, Partial<TmsQueryroutesArgs>>;
  shipmentLeg?: Resolver<ResolversTypes['ShipmentLegs'], ParentType, ContextType, RequireFields<TmsQueryshipmentLegArgs, 'id'>>;
  shipmentLegEvent?: Resolver<ResolversTypes['ShipmentLegEvents'], ParentType, ContextType, RequireFields<TmsQueryshipmentLegEventArgs, 'id'>>;
  shipmentLegEvents?: Resolver<Array<ResolversTypes['ShipmentLegEvents']>, ParentType, ContextType, Partial<TmsQueryshipmentLegEventsArgs>>;
  shipmentLegs?: Resolver<Array<ResolversTypes['ShipmentLegs']>, ParentType, ContextType, Partial<TmsQueryshipmentLegsArgs>>;
  trip?: Resolver<ResolversTypes['Trips'], ParentType, ContextType, RequireFields<TmsQuerytripArgs, 'id'>>;
  tripStop?: Resolver<ResolversTypes['TripStops'], ParentType, ContextType, RequireFields<TmsQuerytripStopArgs, 'id'>>;
  tripStops?: Resolver<Array<ResolversTypes['TripStops']>, ParentType, ContextType, Partial<TmsQuerytripStopsArgs>>;
  trips?: Resolver<Array<ResolversTypes['Trips']>, ParentType, ContextType, Partial<TmsQuerytripsArgs>>;
  vehicle?: Resolver<ResolversTypes['Vehicles'], ParentType, ContextType, RequireFields<TmsQueryvehicleArgs, 'id'>>;
  vehicleMaintenance?: Resolver<ResolversTypes['VehicleMaintenance'], ParentType, ContextType, RequireFields<TmsQueryvehicleMaintenanceArgs, 'id'>>;
  vehicleMaintenances?: Resolver<Array<ResolversTypes['VehicleMaintenance']>, ParentType, ContextType, Partial<TmsQueryvehicleMaintenancesArgs>>;
  vehicles?: Resolver<Array<ResolversTypes['Vehicles']>, ParentType, ContextType, Partial<TmsQueryvehiclesArgs>>;
};

export type TripStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, COMPLETED?: any, IN_PROGRESS?: any, PLANNED?: any }, ResolversTypes['TripStatus']>;

export type TripStopStatusResolvers = EnumResolverSignature<{ ARRIVED?: any, COMPLETED?: any, PENDING?: any, SKIPPED?: any }, ResolversTypes['TripStopStatus']>;

export type TripStopsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TripStops'] = ResolversParentTypes['TripStops']> = {
  actualArrivalTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  actualDepartureTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedArrivalTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedDepartureTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  proofOfDeliveries?: Resolver<Maybe<Array<ResolversTypes['ProofOfDeliveries']>>, ParentType, ContextType>;
  sequence?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  shipmentId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TripStopStatus']>, ParentType, ContextType>;
  trip?: Resolver<ResolversTypes['Trips'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type TripsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Trips'] = ResolversParentTypes['Trips']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  driver?: Resolver<Maybe<ResolversTypes['Drivers']>, ParentType, ContextType>;
  expenses?: Resolver<Maybe<Array<ResolversTypes['Expenses']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  routes?: Resolver<Maybe<Array<ResolversTypes['Routes']>>, ParentType, ContextType>;
  shipmentLegs?: Resolver<Maybe<Array<ResolversTypes['ShipmentLegs']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TripStatus']>, ParentType, ContextType>;
  stops?: Resolver<Maybe<Array<ResolversTypes['TripStops']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vehicle?: Resolver<Maybe<ResolversTypes['Vehicles']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailVerified?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type VehicleMaintenanceResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['VehicleMaintenance'] = ResolversParentTypes['VehicleMaintenance']> = {
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  serviceDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  serviceType?: Resolver<Maybe<ResolversTypes['VehicleServiceType']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vehicle?: Resolver<ResolversTypes['Vehicles'], ParentType, ContextType>;
};

export type VehicleServiceTypeResolvers = EnumResolverSignature<{ BRAKE_SERVICE?: any, INSPECTION?: any, OIL_CHANGE?: any, REPAIR?: any, ROUTINE_MAINTENANCE?: any, TIRE_REPLACEMENT?: any }, ResolversTypes['VehicleServiceType']>;

export type VehicleStatusResolvers = EnumResolverSignature<{ AVAILABLE?: any, IN_MAINTENANCE?: any, ON_TRIP?: any, OUT_OF_SERVICE?: any }, ResolversTypes['VehicleStatus']>;

export type VehiclesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Vehicles'] = ResolversParentTypes['Vehicles']> = {
  capacityVolume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  capacityWeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  geofenceEvents?: Resolver<Maybe<Array<ResolversTypes['GeofenceEvents']>>, ParentType, ContextType>;
  gpsPings?: Resolver<Maybe<Array<ResolversTypes['GpsPings']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maintenances?: Resolver<Maybe<Array<ResolversTypes['VehicleMaintenance']>>, ParentType, ContextType>;
  model?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registrationNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['VehicleStatus']>, ParentType, ContextType>;
  trips?: Resolver<Maybe<Array<ResolversTypes['Trips']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Attachments?: AttachmentsResolvers<ContextType>;
  Campaigns?: CampaignsResolvers<ContextType>;
  CarrierRateUnit?: CarrierRateUnitResolvers;
  CarrierRates?: CarrierRatesResolvers<ContextType>;
  Carriers?: CarriersResolvers<ContextType>;
  CasePriority?: CasePriorityResolvers;
  CaseStatus?: CaseStatusResolvers;
  CaseType?: CaseTypeResolvers;
  Cases?: CasesResolvers<ContextType>;
  Companies?: CompaniesResolvers<ContextType>;
  Contacts?: ContactsResolvers<ContextType>;
  CrmMutation?: CrmMutationResolvers<ContextType>;
  CrmQuery?: CrmQueryResolvers<ContextType>;
  Currency?: CurrencyResolvers;
  DeleteResult?: DeleteResultResolvers<ContextType>;
  DriverScheduleReason?: DriverScheduleReasonResolvers;
  DriverSchedules?: DriverSchedulesResolvers<ContextType>;
  DriverStatus?: DriverStatusResolvers;
  Drivers?: DriversResolvers<ContextType>;
  ExpenseStatus?: ExpenseStatusResolvers;
  ExpenseType?: ExpenseTypeResolvers;
  Expenses?: ExpensesResolvers<ContextType>;
  GeofenceEventType?: GeofenceEventTypeResolvers;
  GeofenceEvents?: GeofenceEventsResolvers<ContextType>;
  Geofences?: GeofencesResolvers<ContextType>;
  GpsPings?: GpsPingsResolvers<ContextType>;
  InteractionType?: InteractionTypeResolvers;
  Interactions?: InteractionsResolvers<ContextType>;
  InvoiceItems?: InvoiceItemsResolvers<ContextType>;
  InvoiceStatus?: InvoiceStatusResolvers;
  Invoices?: InvoicesResolvers<ContextType>;
  LeadSource?: LeadSourceResolvers;
  LeadStatus?: LeadStatusResolvers;
  Leads?: LeadsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notifications?: NotificationsResolvers<ContextType>;
  Opportunities?: OpportunitiesResolvers<ContextType>;
  OpportunityProducts?: OpportunityProductsResolvers<ContextType>;
  OpportunitySource?: OpportunitySourceResolvers;
  OpportunityStage?: OpportunityStageResolvers;
  PartnerInvoiceItems?: PartnerInvoiceItemsResolvers<ContextType>;
  PartnerInvoiceStatus?: PartnerInvoiceStatusResolvers;
  PartnerInvoices?: PartnerInvoicesResolvers<ContextType>;
  PaymentMethod?: PaymentMethodResolvers;
  ProductType?: ProductTypeResolvers;
  Products?: ProductsResolvers<ContextType>;
  ProofOfDeliveries?: ProofOfDeliveriesResolvers<ContextType>;
  ProofType?: ProofTypeResolvers;
  Query?: QueryResolvers<ContextType>;
  RecordType?: RecordTypeResolvers;
  Routes?: RoutesResolvers<ContextType>;
  ShipmentLegEvents?: ShipmentLegEventsResolvers<ContextType>;
  ShipmentLegStatus?: ShipmentLegStatusResolvers;
  ShipmentLegs?: ShipmentLegsResolvers<ContextType>;
  TmsMutation?: TmsMutationResolvers<ContextType>;
  TmsQuery?: TmsQueryResolvers<ContextType>;
  TripStatus?: TripStatusResolvers;
  TripStopStatus?: TripStopStatusResolvers;
  TripStops?: TripStopsResolvers<ContextType>;
  Trips?: TripsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VehicleMaintenance?: VehicleMaintenanceResolvers<ContextType>;
  VehicleServiceType?: VehicleServiceTypeResolvers;
  VehicleStatus?: VehicleStatusResolvers;
  Vehicles?: VehiclesResolvers<ContextType>;
};

