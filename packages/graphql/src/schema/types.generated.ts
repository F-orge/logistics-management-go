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

export type BinThresholds = {
  __typename?: 'BinThresholds';
  alertThreshold?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  location: Locations;
  maxQuantity: Scalars['Int']['output'];
  minQuantity: Scalars['Int']['output'];
  product: WmsProducts;
  reorderQuantity?: Maybe<Scalars['Int']['output']>;
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
  inboundShipments?: Maybe<Array<InboundShipments>>;
  industry?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  putawayRules?: Maybe<Array<PutawayRules>>;
  returns?: Maybe<Array<Returns>>;
  salesOrders?: Maybe<Array<SalesOrders>>;
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

export type CreateBinThresholdInput = {
  alertThreshold?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationId: Scalars['ID']['input'];
  maxQuantity: Scalars['Int']['input'];
  minQuantity: Scalars['Int']['input'];
  productId: Scalars['ID']['input'];
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
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

export type CreateInboundShipmentInput = {
  actualArrivalDate?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['ID']['input']>;
  expectedArrivalDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<InboundShipmentStatus>;
  warehouseId: Scalars['ID']['input'];
};

export type CreateInboundShipmentItemInput = {
  discrepancyNotes?: InputMaybe<Scalars['String']['input']>;
  expectedQuantity: Scalars['Int']['input'];
  inboundShipmentId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  receivedQuantity?: InputMaybe<Scalars['Int']['input']>;
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

export type CreateInventoryAdjustmentInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  quantityChange: Scalars['Int']['input'];
  reason?: InputMaybe<InventoryAdjustmentReason>;
  userId: Scalars['ID']['input'];
  warehouseId: Scalars['ID']['input'];
};

export type CreateInventoryBatchInput = {
  batchNumber: Scalars['String']['input'];
  expirationDate?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
};

export type CreateInventoryStockInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  lastCountedAt?: InputMaybe<Scalars['String']['input']>;
  lastMovementAt?: InputMaybe<Scalars['String']['input']>;
  locationId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  reservedQuantity: Scalars['Int']['input'];
  status?: InputMaybe<InventoryStockStatus>;
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

export type CreateLocationInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  hazmatApproved?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isPickable?: InputMaybe<Scalars['Boolean']['input']>;
  isReceivable?: InputMaybe<Scalars['Boolean']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  maxPallets?: InputMaybe<Scalars['Int']['input']>;
  maxVolume?: InputMaybe<Scalars['Float']['input']>;
  maxWeight?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  parentLocationId?: InputMaybe<Scalars['ID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  temperatureControlled?: InputMaybe<Scalars['Boolean']['input']>;
  type: LocationType;
  warehouseId: Scalars['ID']['input'];
  xCoordinate?: InputMaybe<Scalars['Float']['input']>;
  yCoordinate?: InputMaybe<Scalars['Float']['input']>;
  zCoordinate?: InputMaybe<Scalars['Float']['input']>;
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

export type CreateOutboundShipmentInput = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  salesOrderId: Scalars['ID']['input'];
  status?: InputMaybe<OutboundShipmentStatus>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId: Scalars['ID']['input'];
};

export type CreateOutboundShipmentItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  outboundShipmentId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantityShipped: Scalars['Int']['input'];
  salesOrderItemId: Scalars['ID']['input'];
};

export type CreatePackageInput = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  insuranceValue?: InputMaybe<Scalars['Float']['input']>;
  isFragile?: InputMaybe<Scalars['Boolean']['input']>;
  isHazmat?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  packageNumber: Scalars['String']['input'];
  packageType?: InputMaybe<Scalars['String']['input']>;
  packedAt?: InputMaybe<Scalars['String']['input']>;
  packedByUserId?: InputMaybe<Scalars['ID']['input']>;
  requiresSignature?: InputMaybe<Scalars['Boolean']['input']>;
  salesOrderId: Scalars['ID']['input'];
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  shippedAt?: InputMaybe<Scalars['String']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId: Scalars['ID']['input'];
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type CreatePackageItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  packageId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  serialNumbers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  unitWeight?: InputMaybe<Scalars['Float']['input']>;
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

export type CreatePickBatchInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  assignedUserId?: InputMaybe<Scalars['ID']['input']>;
  batchNumber: Scalars['String']['input'];
  completedAt?: InputMaybe<Scalars['String']['input']>;
  completedItems?: InputMaybe<Scalars['Int']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PickBatchStatus>;
  strategy: PickStrategy;
  totalItems?: InputMaybe<Scalars['Int']['input']>;
  warehouseId: Scalars['ID']['input'];
  waveId?: InputMaybe<Scalars['String']['input']>;
  zoneRestrictions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CreatePickBatchItemInput = {
  actualPickTime?: InputMaybe<Scalars['Int']['input']>;
  estimatedPickTime?: InputMaybe<Scalars['Int']['input']>;
  orderPriority?: InputMaybe<Scalars['Int']['input']>;
  pickBatchId: Scalars['ID']['input'];
  salesOrderId: Scalars['ID']['input'];
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

export type CreatePutawayRuleInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationType?: InputMaybe<LocationType>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  preferredLocationId?: InputMaybe<Scalars['ID']['input']>;
  priority: Scalars['Int']['input'];
  productId: Scalars['ID']['input'];
  requiresHazmatApproval?: InputMaybe<Scalars['Boolean']['input']>;
  requiresTemperatureControl?: InputMaybe<Scalars['Boolean']['input']>;
  volumeThreshold?: InputMaybe<Scalars['Float']['input']>;
  warehouseId: Scalars['ID']['input'];
  weightThreshold?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateReorderPointInput = {
  productId: Scalars['ID']['input'];
  threshold: Scalars['Int']['input'];
  warehouseId: Scalars['ID']['input'];
};

export type CreateReturnInput = {
  clientId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  returnNumber: Scalars['String']['input'];
  salesOrderId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<ReturnStatus>;
};

export type CreateReturnItemInput = {
  condition?: InputMaybe<ReturnItemCondition>;
  productId: Scalars['ID']['input'];
  quantityExpected: Scalars['Int']['input'];
  quantityReceived?: InputMaybe<Scalars['Int']['input']>;
  returnId: Scalars['ID']['input'];
};

export type CreateRouteInput = {
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  totalDistance?: InputMaybe<Scalars['Float']['input']>;
  totalDuration?: InputMaybe<Scalars['Float']['input']>;
  tripId: Scalars['ID']['input'];
};

export type CreateSalesOrderInput = {
  clientId: Scalars['ID']['input'];
  crmOpportunityId?: InputMaybe<Scalars['ID']['input']>;
  orderNumber: Scalars['String']['input'];
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SalesOrderStatus>;
};

export type CreateSalesOrderItemInput = {
  productId: Scalars['ID']['input'];
  quantityOrdered: Scalars['Int']['input'];
  salesOrderId: Scalars['ID']['input'];
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
  shipment?: InputMaybe<OutboundShipments>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatus>;
};

export type CreateStockTransferInput = {
  destinationWarehouseId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  sourceWarehouseId: Scalars['ID']['input'];
  status?: InputMaybe<StockTransferStatus>;
};

export type CreateSupplierInput = {
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTaskInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  pickBatchId?: InputMaybe<Scalars['ID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  sourceEntityId?: InputMaybe<Scalars['ID']['input']>;
  sourceEntityType?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskStatus>;
  taskNumber: Scalars['String']['input'];
  type: TaskType;
  userId?: InputMaybe<Scalars['ID']['input']>;
  warehouseId: Scalars['ID']['input'];
};

export type CreateTaskItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  completedAt?: InputMaybe<Scalars['String']['input']>;
  destinationLocationId?: InputMaybe<Scalars['ID']['input']>;
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  quantityCompleted: Scalars['Int']['input'];
  quantityRequired: Scalars['Int']['input'];
  serialNumbers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sourceLocationId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TaskItemStatus>;
  taskId: Scalars['ID']['input'];
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
  shipment?: InputMaybe<OutboundShipments>;
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

export type CreateWarehouseInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type CreateWmsProductInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['ID']['input']>;
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  sku: Scalars['String']['input'];
  status?: InputMaybe<ProductStatus>;
  supplierId?: InputMaybe<Scalars['ID']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
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

export type InboundShipmentItems = {
  __typename?: 'InboundShipmentItems';
  createdAt?: Maybe<Scalars['String']['output']>;
  discrepancyNotes?: Maybe<Scalars['String']['output']>;
  discrepancyQuantity?: Maybe<Scalars['Int']['output']>;
  expectedQuantity: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  inboundShipment: InboundShipments;
  product: WmsProducts;
  receivedQuantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type InboundShipmentStatus =
  | 'ARRIVED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'PENDING'
  | 'PROCESSING';

export type InboundShipments = {
  __typename?: 'InboundShipments';
  actualArrivalDate?: Maybe<Scalars['String']['output']>;
  client?: Maybe<Companies>;
  createdAt?: Maybe<Scalars['String']['output']>;
  expectedArrivalDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<InboundShipmentItems>>;
  status?: Maybe<InboundShipmentStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  warehouseId: Scalars['ID']['output'];
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

export type InventoryAdjustmentReason =
  | 'CYCLE_COUNT'
  | 'DAMAGED_GOODS'
  | 'EXPIRED'
  | 'MANUAL_CORRECTION'
  | 'RETURN_TO_VENDOR'
  | 'THEFT';

export type InventoryAdjustments = {
  __typename?: 'InventoryAdjustments';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  product: WmsProducts;
  quantityChange: Scalars['Int']['output'];
  reason?: Maybe<InventoryAdjustmentReason>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: User;
  warehouseId: Scalars['ID']['output'];
};

export type InventoryBatches = {
  __typename?: 'InventoryBatches';
  batchNumber: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  expirationDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inventoryStock?: Maybe<Array<InventoryStock>>;
  outboundShipmentItems?: Maybe<Array<OutboundShipmentItems>>;
  packageItems?: Maybe<Array<PackageItems>>;
  product: WmsProducts;
  taskItems?: Maybe<Array<TaskItems>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type InventoryStock = {
  __typename?: 'InventoryStock';
  availableQuantity?: Maybe<Scalars['Int']['output']>;
  batch?: Maybe<InventoryBatches>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastCountedAt?: Maybe<Scalars['String']['output']>;
  lastMovementAt?: Maybe<Scalars['String']['output']>;
  location: Locations;
  product: WmsProducts;
  quantity: Scalars['Int']['output'];
  reservedQuantity: Scalars['Int']['output'];
  status?: Maybe<InventoryStockStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type InventoryStockStatus =
  | 'ALLOCATED'
  | 'AVAILABLE'
  | 'DAMAGED'
  | 'EXPIRED'
  | 'HOLD'
  | 'QUARANTINE'
  | 'SHIPPED';

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

export type LocationType =
  | 'BULK_STORAGE'
  | 'CROSS_DOCK_AREA'
  | 'DAMAGED_GOODS'
  | 'PACKING_STATION'
  | 'PICK_BIN'
  | 'QUALITY_CONTROL'
  | 'RECEIVING_DOCK'
  | 'RESERVE_STORAGE'
  | 'RETURNS_AREA'
  | 'STAGING_AREA';

export type Locations = {
  __typename?: 'Locations';
  barcode?: Maybe<Scalars['String']['output']>;
  binThresholds?: Maybe<Array<BinThresholds>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  destinationTaskItems?: Maybe<Array<TaskItems>>;
  hazmatApproved?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  inventoryStock?: Maybe<Array<InventoryStock>>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isPickable?: Maybe<Scalars['Boolean']['output']>;
  isReceivable?: Maybe<Scalars['Boolean']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
  maxPallets?: Maybe<Scalars['Int']['output']>;
  maxVolume?: Maybe<Scalars['Float']['output']>;
  maxWeight?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  parentLocation?: Maybe<Locations>;
  path?: Maybe<Scalars['String']['output']>;
  putawayRules?: Maybe<Array<PutawayRules>>;
  sourceTaskItems?: Maybe<Array<TaskItems>>;
  temperatureControlled?: Maybe<Scalars['Boolean']['output']>;
  type: LocationType;
  updatedAt?: Maybe<Scalars['String']['output']>;
  warehouse: Warehouses;
  xCoordinate?: Maybe<Scalars['Float']['output']>;
  yCoordinate?: Maybe<Scalars['Float']['output']>;
  zCoordinate?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  crm?: Maybe<CrmMutation>;
  tms?: Maybe<TmsMutation>;
  wms?: Maybe<WmsMutation>;
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
  salesOrders?: Maybe<Array<SalesOrders>>;
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

export type OutboundShipmentItems = {
  __typename?: 'OutboundShipmentItems';
  batch?: Maybe<InventoryBatches>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  outboundShipment: OutboundShipments;
  product: WmsProducts;
  quantityShipped: Scalars['Int']['output'];
  salesOrderItem: SalesOrderItems;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type OutboundShipmentStatus =
  | 'CANCELLED'
  | 'DELIVERED'
  | 'PACKED'
  | 'PICKING'
  | 'SHIPPED';

export type OutboundShipments = {
  __typename?: 'OutboundShipments';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<OutboundShipmentItems>>;
  salesOrder: SalesOrders;
  status?: Maybe<OutboundShipmentStatus>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  warehouseId: Scalars['ID']['output'];
};

export type PackageItems = {
  __typename?: 'PackageItems';
  batch?: Maybe<InventoryBatches>;
  createdAt?: Maybe<Scalars['String']['output']>;
  expiryDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  package: Packages;
  product: WmsProducts;
  quantity: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  totalWeight?: Maybe<Scalars['Float']['output']>;
  unitWeight?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Packages = {
  __typename?: 'Packages';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  insuranceValue?: Maybe<Scalars['Float']['output']>;
  isFragile?: Maybe<Scalars['Boolean']['output']>;
  isHazmat?: Maybe<Scalars['Boolean']['output']>;
  items?: Maybe<Array<PackageItems>>;
  length?: Maybe<Scalars['Float']['output']>;
  packageNumber: Scalars['String']['output'];
  packageType?: Maybe<Scalars['String']['output']>;
  packedAt?: Maybe<Scalars['String']['output']>;
  packedByUser?: Maybe<User>;
  requiresSignature?: Maybe<Scalars['Boolean']['output']>;
  salesOrder: SalesOrders;
  serviceLevel?: Maybe<Scalars['String']['output']>;
  shippedAt?: Maybe<Scalars['String']['output']>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  warehouse: Warehouses;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

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

export type PickBatchItems = {
  __typename?: 'PickBatchItems';
  actualPickTime?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  estimatedPickTime?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  orderPriority?: Maybe<Scalars['Int']['output']>;
  pickBatch: PickBatches;
  salesOrder: SalesOrders;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PickBatchStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'IN_PROGRESS'
  | 'OPEN';

export type PickBatches = {
  __typename?: 'PickBatches';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  assignedUser?: Maybe<User>;
  batchNumber: Scalars['String']['output'];
  completedAt?: Maybe<Scalars['String']['output']>;
  completedItems?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<PickBatchItems>>;
  priority?: Maybe<Scalars['Int']['output']>;
  startedAt?: Maybe<Scalars['String']['output']>;
  status?: Maybe<PickBatchStatus>;
  strategy: PickStrategy;
  tasks?: Maybe<Array<Tasks>>;
  totalItems?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  warehouse: Warehouses;
  waveId?: Maybe<Scalars['String']['output']>;
  zoneRestrictions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type PickStrategy =
  | 'BATCH_PICKING'
  | 'CLUSTER_PICKING'
  | 'SINGLE_ORDER_PICKING'
  | 'WAVE_PICKING'
  | 'ZONE_PICKING';

export type ProductStatus =
  | 'ACTIVE'
  | 'DISCONTINUED'
  | 'INACTIVE'
  | 'OBSOLETE';

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

export type PutawayRules = {
  __typename?: 'PutawayRules';
  client?: Maybe<Companies>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locationType?: Maybe<LocationType>;
  maxQuantity?: Maybe<Scalars['Int']['output']>;
  minQuantity?: Maybe<Scalars['Int']['output']>;
  preferredLocation?: Maybe<Locations>;
  priority: Scalars['Int']['output'];
  product: WmsProducts;
  requiresHazmatApproval?: Maybe<Scalars['Boolean']['output']>;
  requiresTemperatureControl?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  volumeThreshold?: Maybe<Scalars['Float']['output']>;
  warehouse: Warehouses;
  weightThreshold?: Maybe<Scalars['Float']['output']>;
};

export type Query = {
  __typename?: 'Query';
  crm?: Maybe<CrmQuery>;
  tms?: Maybe<TmsQuery>;
  wms?: Maybe<WmsQuery>;
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

export type ReorderPoints = {
  __typename?: 'ReorderPoints';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  product: WmsProducts;
  threshold: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  warehouseId: Scalars['ID']['output'];
};

export type ReturnItemCondition =
  | 'DAMAGED'
  | 'DEFECTIVE'
  | 'EXPIRED'
  | 'SELLABLE'
  | 'UNSELLABLE';

export type ReturnItems = {
  __typename?: 'ReturnItems';
  condition?: Maybe<ReturnItemCondition>;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  product: WmsProducts;
  quantityExpected: Scalars['Int']['output'];
  quantityReceived?: Maybe<Scalars['Int']['output']>;
  quantityVariance?: Maybe<Scalars['Int']['output']>;
  return: Returns;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ReturnStatus =
  | 'APPROVED'
  | 'PROCESSED'
  | 'RECEIVED'
  | 'REJECTED'
  | 'REQUESTED';

export type Returns = {
  __typename?: 'Returns';
  client: Companies;
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<ReturnItems>>;
  reason?: Maybe<Scalars['String']['output']>;
  returnNumber: Scalars['String']['output'];
  salesOrder?: Maybe<SalesOrders>;
  status?: Maybe<ReturnStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

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

export type SalesOrderItems = {
  __typename?: 'SalesOrderItems';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  outboundShipmentItems?: Maybe<Array<OutboundShipmentItems>>;
  product: WmsProducts;
  quantityOrdered: Scalars['Int']['output'];
  salesOrder: SalesOrders;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type SalesOrderStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED';

export type SalesOrders = {
  __typename?: 'SalesOrders';
  client: Companies;
  createdAt?: Maybe<Scalars['String']['output']>;
  crmOpportunity?: Maybe<Opportunities>;
  id: Scalars['ID']['output'];
  items?: Maybe<Array<SalesOrderItems>>;
  orderNumber: Scalars['String']['output'];
  outboundShipments?: Maybe<Array<OutboundShipments>>;
  packages?: Maybe<Array<Packages>>;
  pickBatchItems?: Maybe<Array<PickBatchItems>>;
  returns?: Maybe<Array<Returns>>;
  shippingAddress?: Maybe<Scalars['String']['output']>;
  status?: Maybe<SalesOrderStatus>;
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
  shipment?: Maybe<OutboundShipments>;
  startLocation?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ShipmentLegStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type StockTransferStatus =
  | 'CANCELLED'
  | 'IN_TRANSIT'
  | 'PENDING'
  | 'RECEIVED';

export type StockTransfers = {
  __typename?: 'StockTransfers';
  createdAt?: Maybe<Scalars['String']['output']>;
  destinationWarehouseId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  product: WmsProducts;
  quantity: Scalars['Int']['output'];
  sourceWarehouseId: Scalars['ID']['output'];
  status?: Maybe<StockTransferStatus>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Suppliers = {
  __typename?: 'Suppliers';
  contactPerson?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<WmsProducts>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type TaskItemStatus =
  | 'COMPLETED'
  | 'DAMAGED'
  | 'IN_PROGRESS'
  | 'NOT_FOUND'
  | 'PENDING'
  | 'SHORT_PICKED';

export type TaskItems = {
  __typename?: 'TaskItems';
  batch?: Maybe<InventoryBatches>;
  completedAt?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  destinationLocation?: Maybe<Locations>;
  expiryDate?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lotNumber?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  product: WmsProducts;
  quantityCompleted: Scalars['Int']['output'];
  quantityRemaining?: Maybe<Scalars['Int']['output']>;
  quantityRequired: Scalars['Int']['output'];
  serialNumbers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sourceLocation?: Maybe<Locations>;
  status?: Maybe<TaskItemStatus>;
  task: Tasks;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type TaskStatus =
  | 'ASSIGNED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'ERROR'
  | 'IN_PROGRESS'
  | 'PENDING';

export type TaskType =
  | 'CROSS_DOCK'
  | 'CYCLE_COUNT'
  | 'DAMAGE_INSPECTION'
  | 'PACK'
  | 'PICK'
  | 'PUTAWAY'
  | 'QUALITY_CHECK'
  | 'REPLENISHMENT'
  | 'RETURNS_PROCESSING';

export type Tasks = {
  __typename?: 'Tasks';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  durationSeconds?: Maybe<Scalars['Int']['output']>;
  endTime?: Maybe<Scalars['String']['output']>;
  estimatedDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<TaskItems>>;
  notes?: Maybe<Scalars['String']['output']>;
  pickBatch?: Maybe<PickBatches>;
  priority?: Maybe<Scalars['Int']['output']>;
  sourceEntityId?: Maybe<Scalars['ID']['output']>;
  sourceEntityType?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['String']['output']>;
  status?: Maybe<TaskStatus>;
  taskNumber: Scalars['String']['output'];
  type: TaskType;
  updatedAt?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  warehouse: Warehouses;
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
  shipment?: Maybe<OutboundShipments>;
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

export type UpdateBinThresholdInput = {
  alertThreshold?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  reorderQuantity?: InputMaybe<Scalars['Int']['input']>;
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

export type UpdateInboundShipmentInput = {
  actualArrivalDate?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['ID']['input']>;
  expectedArrivalDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<InboundShipmentStatus>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateInboundShipmentItemInput = {
  discrepancyNotes?: InputMaybe<Scalars['String']['input']>;
  expectedQuantity?: InputMaybe<Scalars['Int']['input']>;
  inboundShipmentId?: InputMaybe<Scalars['ID']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  receivedQuantity?: InputMaybe<Scalars['Int']['input']>;
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

export type UpdateInventoryAdjustmentInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantityChange?: InputMaybe<Scalars['Int']['input']>;
  reason?: InputMaybe<InventoryAdjustmentReason>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateInventoryBatchInput = {
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  expirationDate?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateInventoryStockInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  lastCountedAt?: InputMaybe<Scalars['String']['input']>;
  lastMovementAt?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['ID']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  reservedQuantity?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<InventoryStockStatus>;
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

export type UpdateLocationInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  hazmatApproved?: InputMaybe<Scalars['Boolean']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isPickable?: InputMaybe<Scalars['Boolean']['input']>;
  isReceivable?: InputMaybe<Scalars['Boolean']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  maxPallets?: InputMaybe<Scalars['Int']['input']>;
  maxVolume?: InputMaybe<Scalars['Float']['input']>;
  maxWeight?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentLocationId?: InputMaybe<Scalars['ID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  temperatureControlled?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<LocationType>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
  xCoordinate?: InputMaybe<Scalars['Float']['input']>;
  yCoordinate?: InputMaybe<Scalars['Float']['input']>;
  zCoordinate?: InputMaybe<Scalars['Float']['input']>;
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

export type UpdateOutboundShipmentInput = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  salesOrderId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<OutboundShipmentStatus>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateOutboundShipmentItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  outboundShipmentId?: InputMaybe<Scalars['ID']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantityShipped?: InputMaybe<Scalars['Int']['input']>;
  salesOrderItemId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdatePackageInput = {
  carrier?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  insuranceValue?: InputMaybe<Scalars['Float']['input']>;
  isFragile?: InputMaybe<Scalars['Boolean']['input']>;
  isHazmat?: InputMaybe<Scalars['Boolean']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  packageNumber?: InputMaybe<Scalars['String']['input']>;
  packageType?: InputMaybe<Scalars['String']['input']>;
  packedAt?: InputMaybe<Scalars['String']['input']>;
  packedByUserId?: InputMaybe<Scalars['ID']['input']>;
  requiresSignature?: InputMaybe<Scalars['Boolean']['input']>;
  salesOrderId?: InputMaybe<Scalars['ID']['input']>;
  serviceLevel?: InputMaybe<Scalars['String']['input']>;
  shippedAt?: InputMaybe<Scalars['String']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdatePackageItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  packageId?: InputMaybe<Scalars['ID']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  serialNumbers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  unitWeight?: InputMaybe<Scalars['Float']['input']>;
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

export type UpdatePickBatchInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  assignedUserId?: InputMaybe<Scalars['ID']['input']>;
  batchNumber?: InputMaybe<Scalars['String']['input']>;
  completedAt?: InputMaybe<Scalars['String']['input']>;
  completedItems?: InputMaybe<Scalars['Int']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  startedAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<PickBatchStatus>;
  strategy?: InputMaybe<PickStrategy>;
  totalItems?: InputMaybe<Scalars['Int']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
  waveId?: InputMaybe<Scalars['String']['input']>;
  zoneRestrictions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UpdatePickBatchItemInput = {
  actualPickTime?: InputMaybe<Scalars['Int']['input']>;
  estimatedPickTime?: InputMaybe<Scalars['Int']['input']>;
  orderPriority?: InputMaybe<Scalars['Int']['input']>;
  pickBatchId?: InputMaybe<Scalars['ID']['input']>;
  salesOrderId?: InputMaybe<Scalars['ID']['input']>;
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

export type UpdatePutawayRuleInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  locationType?: InputMaybe<LocationType>;
  maxQuantity?: InputMaybe<Scalars['Int']['input']>;
  minQuantity?: InputMaybe<Scalars['Int']['input']>;
  preferredLocationId?: InputMaybe<Scalars['ID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  requiresHazmatApproval?: InputMaybe<Scalars['Boolean']['input']>;
  requiresTemperatureControl?: InputMaybe<Scalars['Boolean']['input']>;
  volumeThreshold?: InputMaybe<Scalars['Float']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
  weightThreshold?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateReorderPointInput = {
  productId?: InputMaybe<Scalars['ID']['input']>;
  threshold?: InputMaybe<Scalars['Int']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateReturnInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  returnNumber?: InputMaybe<Scalars['String']['input']>;
  salesOrderId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<ReturnStatus>;
};

export type UpdateReturnItemInput = {
  condition?: InputMaybe<ReturnItemCondition>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantityExpected?: InputMaybe<Scalars['Int']['input']>;
  quantityReceived?: InputMaybe<Scalars['Int']['input']>;
  returnId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateRouteInput = {
  optimizedRouteData?: InputMaybe<Scalars['String']['input']>;
  totalDistance?: InputMaybe<Scalars['Float']['input']>;
  totalDuration?: InputMaybe<Scalars['Float']['input']>;
  tripId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateSalesOrderInput = {
  clientId?: InputMaybe<Scalars['ID']['input']>;
  crmOpportunityId?: InputMaybe<Scalars['ID']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SalesOrderStatus>;
};

export type UpdateSalesOrderItemInput = {
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantityOrdered?: InputMaybe<Scalars['Int']['input']>;
  salesOrderId?: InputMaybe<Scalars['ID']['input']>;
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
  shipment?: InputMaybe<OutboundShipments>;
  startLocation?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ShipmentLegStatus>;
};

export type UpdateStockTransferInput = {
  destinationWarehouseId?: InputMaybe<Scalars['ID']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  sourceWarehouseId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<StockTransferStatus>;
};

export type UpdateSupplierInput = {
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTaskInput = {
  actualDuration?: InputMaybe<Scalars['Int']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  estimatedDuration?: InputMaybe<Scalars['Int']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  pickBatchId?: InputMaybe<Scalars['ID']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  sourceEntityId?: InputMaybe<Scalars['ID']['input']>;
  sourceEntityType?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskStatus>;
  taskNumber?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TaskType>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  warehouseId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateTaskItemInput = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  completedAt?: InputMaybe<Scalars['String']['input']>;
  destinationLocationId?: InputMaybe<Scalars['ID']['input']>;
  expiryDate?: InputMaybe<Scalars['String']['input']>;
  lotNumber?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  quantityCompleted?: InputMaybe<Scalars['Int']['input']>;
  quantityRequired?: InputMaybe<Scalars['Int']['input']>;
  serialNumbers?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sourceLocationId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<TaskItemStatus>;
  taskId?: InputMaybe<Scalars['ID']['input']>;
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
  shipment?: InputMaybe<OutboundShipments>;
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

export type UpdateWarehouseInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPerson?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateWmsProductInput = {
  barcode?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['ID']['input']>;
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  length?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductStatus>;
  supplierId?: InputMaybe<Scalars['ID']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
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

export type Warehouses = {
  __typename?: 'Warehouses';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPerson?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  destinationStockTransfers?: Maybe<Array<StockTransfers>>;
  id: Scalars['ID']['output'];
  inboundShipments?: Maybe<Array<InboundShipments>>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  locations?: Maybe<Array<Locations>>;
  name: Scalars['String']['output'];
  outboundShipments?: Maybe<Array<OutboundShipments>>;
  packages?: Maybe<Array<Packages>>;
  pickBatches?: Maybe<Array<PickBatches>>;
  postalCode?: Maybe<Scalars['String']['output']>;
  putawayRules?: Maybe<Array<PutawayRules>>;
  sourceStockTransfers?: Maybe<Array<StockTransfers>>;
  state?: Maybe<Scalars['String']['output']>;
  tasks?: Maybe<Array<Tasks>>;
  timezone?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type WmsMutation = {
  __typename?: 'WmsMutation';
  createBinThreshold: BinThresholds;
  createInboundShipment: InboundShipments;
  createInboundShipmentItem: InboundShipmentItems;
  createInventoryAdjustment: InventoryAdjustments;
  createInventoryBatch: InventoryBatches;
  createInventoryStock: InventoryStock;
  createLocation: Locations;
  createOutboundShipment: OutboundShipments;
  createOutboundShipmentItem: OutboundShipmentItems;
  createPackage: Packages;
  createPackageItem: PackageItems;
  createPickBatch: PickBatches;
  createPickBatchItem: PickBatchItems;
  createPutawayRule: PutawayRules;
  createReorderPoint: ReorderPoints;
  createReturn: Returns;
  createReturnItem: ReturnItems;
  createSalesOrder: SalesOrders;
  createSalesOrderItem: SalesOrderItems;
  createStockTransfer: StockTransfers;
  createSupplier: Suppliers;
  createTask: Tasks;
  createTaskItem: TaskItems;
  createWarehouse: Warehouses;
  createWmsProduct: WmsProducts;
  removeBinThreshold: DeleteResult;
  removeInboundShipment: DeleteResult;
  removeInboundShipmentItem: DeleteResult;
  removeInventoryAdjustment: DeleteResult;
  removeInventoryBatch: DeleteResult;
  removeInventoryStock: DeleteResult;
  removeLocation: DeleteResult;
  removeOutboundShipment: DeleteResult;
  removeOutboundShipmentItem: DeleteResult;
  removePackage: DeleteResult;
  removePackageItem: DeleteResult;
  removePickBatch: DeleteResult;
  removePickBatchItem: DeleteResult;
  removePutawayRule: DeleteResult;
  removeReorderPoint: DeleteResult;
  removeReturn: DeleteResult;
  removeReturnItem: DeleteResult;
  removeSalesOrder: DeleteResult;
  removeSalesOrderItem: DeleteResult;
  removeStockTransfer: DeleteResult;
  removeSupplier: DeleteResult;
  removeTask: DeleteResult;
  removeTaskItem: DeleteResult;
  removeWarehouse: DeleteResult;
  removeWmsProduct: DeleteResult;
  updateBinThreshold: BinThresholds;
  updateInboundShipment: InboundShipments;
  updateInboundShipmentItem: InboundShipmentItems;
  updateInventoryAdjustment: InventoryAdjustments;
  updateInventoryBatch: InventoryBatches;
  updateInventoryStock: InventoryStock;
  updateLocation: Locations;
  updateOutboundShipment: OutboundShipments;
  updateOutboundShipmentItem: OutboundShipmentItems;
  updatePackage: Packages;
  updatePackageItem: PackageItems;
  updatePickBatch: PickBatches;
  updatePickBatchItem: PickBatchItems;
  updatePutawayRule: PutawayRules;
  updateReorderPoint: ReorderPoints;
  updateReturn: Returns;
  updateReturnItem: ReturnItems;
  updateSalesOrder: SalesOrders;
  updateSalesOrderItem: SalesOrderItems;
  updateStockTransfer: StockTransfers;
  updateSupplier: Suppliers;
  updateTask: Tasks;
  updateTaskItem: TaskItems;
  updateWarehouse: Warehouses;
  updateWmsProduct: WmsProducts;
};


export type WmsMutationcreateBinThresholdArgs = {
  value: CreateBinThresholdInput;
};


export type WmsMutationcreateInboundShipmentArgs = {
  value: CreateInboundShipmentInput;
};


export type WmsMutationcreateInboundShipmentItemArgs = {
  value: CreateInboundShipmentItemInput;
};


export type WmsMutationcreateInventoryAdjustmentArgs = {
  value: CreateInventoryAdjustmentInput;
};


export type WmsMutationcreateInventoryBatchArgs = {
  value: CreateInventoryBatchInput;
};


export type WmsMutationcreateInventoryStockArgs = {
  value: CreateInventoryStockInput;
};


export type WmsMutationcreateLocationArgs = {
  value: CreateLocationInput;
};


export type WmsMutationcreateOutboundShipmentArgs = {
  value: CreateOutboundShipmentInput;
};


export type WmsMutationcreateOutboundShipmentItemArgs = {
  value: CreateOutboundShipmentItemInput;
};


export type WmsMutationcreatePackageArgs = {
  value: CreatePackageInput;
};


export type WmsMutationcreatePackageItemArgs = {
  value: CreatePackageItemInput;
};


export type WmsMutationcreatePickBatchArgs = {
  value: CreatePickBatchInput;
};


export type WmsMutationcreatePickBatchItemArgs = {
  value: CreatePickBatchItemInput;
};


export type WmsMutationcreatePutawayRuleArgs = {
  value: CreatePutawayRuleInput;
};


export type WmsMutationcreateReorderPointArgs = {
  value: CreateReorderPointInput;
};


export type WmsMutationcreateReturnArgs = {
  value: CreateReturnInput;
};


export type WmsMutationcreateReturnItemArgs = {
  value: CreateReturnItemInput;
};


export type WmsMutationcreateSalesOrderArgs = {
  value: CreateSalesOrderInput;
};


export type WmsMutationcreateSalesOrderItemArgs = {
  value: CreateSalesOrderItemInput;
};


export type WmsMutationcreateStockTransferArgs = {
  value: CreateStockTransferInput;
};


export type WmsMutationcreateSupplierArgs = {
  value: CreateSupplierInput;
};


export type WmsMutationcreateTaskArgs = {
  value: CreateTaskInput;
};


export type WmsMutationcreateTaskItemArgs = {
  value: CreateTaskItemInput;
};


export type WmsMutationcreateWarehouseArgs = {
  value: CreateWarehouseInput;
};


export type WmsMutationcreateWmsProductArgs = {
  value: CreateWmsProductInput;
};


export type WmsMutationremoveBinThresholdArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveInboundShipmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveInboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveInventoryAdjustmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveInventoryBatchArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveInventoryStockArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveLocationArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveOutboundShipmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveOutboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremovePackageArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremovePackageItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremovePickBatchArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremovePickBatchItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremovePutawayRuleArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveReorderPointArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveReturnArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveReturnItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveSalesOrderArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveSalesOrderItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveStockTransferArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveSupplierArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveTaskArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveTaskItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveWarehouseArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationremoveWmsProductArgs = {
  id: Scalars['ID']['input'];
};


export type WmsMutationupdateBinThresholdArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateBinThresholdInput>;
};


export type WmsMutationupdateInboundShipmentArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInboundShipmentInput>;
};


export type WmsMutationupdateInboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInboundShipmentItemInput>;
};


export type WmsMutationupdateInventoryAdjustmentArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInventoryAdjustmentInput>;
};


export type WmsMutationupdateInventoryBatchArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInventoryBatchInput>;
};


export type WmsMutationupdateInventoryStockArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateInventoryStockInput>;
};


export type WmsMutationupdateLocationArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateLocationInput>;
};


export type WmsMutationupdateOutboundShipmentArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateOutboundShipmentInput>;
};


export type WmsMutationupdateOutboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateOutboundShipmentItemInput>;
};


export type WmsMutationupdatePackageArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePackageInput>;
};


export type WmsMutationupdatePackageItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePackageItemInput>;
};


export type WmsMutationupdatePickBatchArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePickBatchInput>;
};


export type WmsMutationupdatePickBatchItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePickBatchItemInput>;
};


export type WmsMutationupdatePutawayRuleArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdatePutawayRuleInput>;
};


export type WmsMutationupdateReorderPointArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateReorderPointInput>;
};


export type WmsMutationupdateReturnArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateReturnInput>;
};


export type WmsMutationupdateReturnItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateReturnItemInput>;
};


export type WmsMutationupdateSalesOrderArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateSalesOrderInput>;
};


export type WmsMutationupdateSalesOrderItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateSalesOrderItemInput>;
};


export type WmsMutationupdateStockTransferArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateStockTransferInput>;
};


export type WmsMutationupdateSupplierArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateSupplierInput>;
};


export type WmsMutationupdateTaskArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateTaskInput>;
};


export type WmsMutationupdateTaskItemArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateTaskItemInput>;
};


export type WmsMutationupdateWarehouseArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateWarehouseInput>;
};


export type WmsMutationupdateWmsProductArgs = {
  id: Scalars['ID']['input'];
  value?: InputMaybe<UpdateWmsProductInput>;
};

export type WmsProducts = {
  __typename?: 'WmsProducts';
  adjustments?: Maybe<Array<InventoryAdjustments>>;
  barcode?: Maybe<Scalars['String']['output']>;
  batches?: Maybe<Array<InventoryBatches>>;
  binThresholds?: Maybe<Array<BinThresholds>>;
  client?: Maybe<Companies>;
  costPrice?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  inboundShipmentItems?: Maybe<Array<InboundShipmentItems>>;
  inventoryStock?: Maybe<Array<InventoryStock>>;
  length?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  outboundShipmentItems?: Maybe<Array<OutboundShipmentItems>>;
  packageItems?: Maybe<Array<PackageItems>>;
  putawayRules?: Maybe<Array<PutawayRules>>;
  reorderPoints?: Maybe<Array<ReorderPoints>>;
  returnItems?: Maybe<Array<ReturnItems>>;
  salesOrderItems?: Maybe<Array<SalesOrderItems>>;
  sku: Scalars['String']['output'];
  status?: Maybe<ProductStatus>;
  stockTransfers?: Maybe<Array<StockTransfers>>;
  supplier?: Maybe<Suppliers>;
  taskItems?: Maybe<Array<TaskItems>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type WmsQuery = {
  __typename?: 'WmsQuery';
  binThreshold: BinThresholds;
  binThresholds: Array<BinThresholds>;
  inboundShipment: InboundShipments;
  inboundShipmentItem: InboundShipmentItems;
  inboundShipmentItems: Array<InboundShipmentItems>;
  inboundShipments: Array<InboundShipments>;
  inventoryAdjustment: InventoryAdjustments;
  inventoryAdjustments: Array<InventoryAdjustments>;
  inventoryBatch: InventoryBatches;
  inventoryBatches: Array<InventoryBatches>;
  inventoryStock: InventoryStock;
  inventoryStocks: Array<InventoryStock>;
  location: Locations;
  locations: Array<Locations>;
  outboundShipment: OutboundShipments;
  outboundShipmentItem: OutboundShipmentItems;
  outboundShipmentItems: Array<OutboundShipmentItems>;
  outboundShipments: Array<OutboundShipments>;
  package: Packages;
  packageItem: PackageItems;
  packageItems: Array<PackageItems>;
  packages: Array<Packages>;
  pickBatch: PickBatches;
  pickBatchItem: PickBatchItems;
  pickBatchItems: Array<PickBatchItems>;
  pickBatches: Array<PickBatches>;
  putawayRule: PutawayRules;
  putawayRules: Array<PutawayRules>;
  reorderPoint: ReorderPoints;
  reorderPoints: Array<ReorderPoints>;
  return: Returns;
  returnItem: ReturnItems;
  returnItems: Array<ReturnItems>;
  returns: Array<Returns>;
  salesOrder: SalesOrders;
  salesOrderItem: SalesOrderItems;
  salesOrderItems: Array<SalesOrderItems>;
  salesOrders: Array<SalesOrders>;
  stockTransfer: StockTransfers;
  stockTransfers: Array<StockTransfers>;
  supplier: Suppliers;
  suppliers: Array<Suppliers>;
  task: Tasks;
  taskItem: TaskItems;
  taskItems: Array<TaskItems>;
  tasks: Array<Tasks>;
  warehouse: Warehouses;
  warehouses: Array<Warehouses>;
  wmsProduct: WmsProducts;
  wmsProducts: Array<WmsProducts>;
};


export type WmsQuerybinThresholdArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerybinThresholdsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryinboundShipmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryinboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryinboundShipmentItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryinboundShipmentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryinventoryAdjustmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryinventoryAdjustmentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryinventoryBatchArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryinventoryBatchesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryinventoryStockArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryinventoryStocksArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerylocationArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerylocationsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryoutboundShipmentArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryoutboundShipmentItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryoutboundShipmentItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryoutboundShipmentsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerypackageArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerypackageItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerypackageItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerypackagesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerypickBatchArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerypickBatchItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerypickBatchItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerypickBatchesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryputawayRuleArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryputawayRulesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryreorderPointArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryreorderPointsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryreturnArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryreturnItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQueryreturnItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQueryreturnsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerysalesOrderArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerysalesOrderItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerysalesOrderItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerysalesOrdersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerystockTransferArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerystockTransfersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerysupplierArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerysuppliersArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerytaskArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerytaskItemArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerytaskItemsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerytasksArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerywarehouseArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerywarehousesArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
};


export type WmsQuerywmsProductArgs = {
  id: Scalars['ID']['input'];
};


export type WmsQuerywmsProductsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
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
  BinThresholds: ResolverTypeWrapper<Omit<BinThresholds, 'location' | 'product'> & { location: ResolversTypes['Locations'], product: ResolversTypes['WmsProducts'] }>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Campaigns: ResolverTypeWrapper<Campaigns>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  CarrierRateUnit: ResolverTypeWrapper<'PER_KG' | 'PER_CONTAINER' | 'PER_MILE' | 'PER_KM' | 'FLAT_RATE'>;
  CarrierRates: ResolverTypeWrapper<Omit<CarrierRates, 'carrier' | 'unit'> & { carrier: ResolversTypes['Carriers'], unit?: Maybe<ResolversTypes['CarrierRateUnit']> }>;
  Carriers: ResolverTypeWrapper<Omit<Carriers, 'partnerInvoices' | 'rates' | 'shipmentLegs'> & { partnerInvoices?: Maybe<Array<ResolversTypes['PartnerInvoices']>>, rates?: Maybe<Array<ResolversTypes['CarrierRates']>>, shipmentLegs?: Maybe<Array<ResolversTypes['ShipmentLegs']>> }>;
  CasePriority: ResolverTypeWrapper<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>;
  CaseStatus: ResolverTypeWrapper<'NEW' | 'IN_PROGRESS' | 'WAITING_FOR_CUSTOMER' | 'WAITING_FOR_INTERNAL' | 'ESCALATED' | 'RESOLVED' | 'CLOSED' | 'CANCELLED'>;
  CaseType: ResolverTypeWrapper<'QUESTION' | 'PROBLEM' | 'COMPLAINT' | 'FEATURE_REQUEST' | 'BUG_REPORT' | 'TECHNICAL_SUPPORT'>;
  Cases: ResolverTypeWrapper<Omit<Cases, 'contact' | 'priority' | 'status' | 'type'> & { contact?: Maybe<ResolversTypes['Contacts']>, priority?: Maybe<ResolversTypes['CasePriority']>, status?: Maybe<ResolversTypes['CaseStatus']>, type?: Maybe<ResolversTypes['CaseType']> }>;
  Companies: ResolverTypeWrapper<Omit<Companies, 'inboundShipments' | 'putawayRules' | 'returns' | 'salesOrders'> & { inboundShipments?: Maybe<Array<ResolversTypes['InboundShipments']>>, putawayRules?: Maybe<Array<ResolversTypes['PutawayRules']>>, returns?: Maybe<Array<ResolversTypes['Returns']>>, salesOrders?: Maybe<Array<ResolversTypes['SalesOrders']>> }>;
  Contacts: ResolverTypeWrapper<Omit<Contacts, 'company'> & { company?: Maybe<ResolversTypes['Companies']> }>;
  CreateAttachmentInput: CreateAttachmentInput;
  CreateBinThresholdInput: CreateBinThresholdInput;
  CreateCampaignInput: CreateCampaignInput;
  CreateCarrierInput: CreateCarrierInput;
  CreateCarrierRateInput: CreateCarrierRateInput;
  CreateCaseInput: CreateCaseInput;
  CreateCompanyInput: CreateCompanyInput;
  CreateContactInput: CreateContactInput;
  CreateDriverInput: CreateDriverInput;
  CreateDriverScheduleInput: CreateDriverScheduleInput;
  CreateExpenseInput: CreateExpenseInput;
  CreateGeofenceEventInput: CreateGeofenceEventInput;
  CreateGeofenceInput: CreateGeofenceInput;
  CreateGpsPingInput: CreateGpsPingInput;
  CreateInboundShipmentInput: CreateInboundShipmentInput;
  CreateInboundShipmentItemInput: CreateInboundShipmentItemInput;
  CreateInteractionInput: CreateInteractionInput;
  CreateInventoryAdjustmentInput: CreateInventoryAdjustmentInput;
  CreateInventoryBatchInput: CreateInventoryBatchInput;
  CreateInventoryStockInput: CreateInventoryStockInput;
  CreateInvoiceInput: CreateInvoiceInput;
  CreateInvoiceItemInput: CreateInvoiceItemInput;
  CreateLeadInput: CreateLeadInput;
  CreateLocationInput: CreateLocationInput;
  CreateNotificationInput: CreateNotificationInput;
  CreateOpportunityInput: CreateOpportunityInput;
  CreateOpportunityProductInput: CreateOpportunityProductInput;
  CreateOutboundShipmentInput: CreateOutboundShipmentInput;
  CreateOutboundShipmentItemInput: CreateOutboundShipmentItemInput;
  CreatePackageInput: CreatePackageInput;
  CreatePackageItemInput: CreatePackageItemInput;
  CreatePartnerInvoiceInput: CreatePartnerInvoiceInput;
  CreatePartnerInvoiceItemInput: CreatePartnerInvoiceItemInput;
  CreatePickBatchInput: CreatePickBatchInput;
  CreatePickBatchItemInput: CreatePickBatchItemInput;
  CreateProductInput: CreateProductInput;
  CreateProofOfDeliveryInput: CreateProofOfDeliveryInput;
  CreatePutawayRuleInput: CreatePutawayRuleInput;
  CreateReorderPointInput: CreateReorderPointInput;
  CreateReturnInput: CreateReturnInput;
  CreateReturnItemInput: CreateReturnItemInput;
  CreateRouteInput: CreateRouteInput;
  CreateSalesOrderInput: CreateSalesOrderInput;
  CreateSalesOrderItemInput: CreateSalesOrderItemInput;
  CreateShipmentLegEventInput: CreateShipmentLegEventInput;
  CreateShipmentLegInput: CreateShipmentLegInput;
  CreateStockTransferInput: CreateStockTransferInput;
  CreateSupplierInput: CreateSupplierInput;
  CreateTaskInput: CreateTaskInput;
  CreateTaskItemInput: CreateTaskItemInput;
  CreateTripInput: CreateTripInput;
  CreateTripStopInput: CreateTripStopInput;
  CreateVehicleInput: CreateVehicleInput;
  CreateVehicleMaintenanceInput: CreateVehicleMaintenanceInput;
  CreateWarehouseInput: CreateWarehouseInput;
  CreateWmsProductInput: CreateWmsProductInput;
  CrmMutation: ResolverTypeWrapper<Omit<CrmMutation, 'createAttachment' | 'createCase' | 'createCompany' | 'createContact' | 'createInteraction' | 'createInvoice' | 'createInvoiceItem' | 'createLead' | 'createOpportunity' | 'createOpportunityProduct' | 'createProduct' | 'updateAttachment' | 'updateCase' | 'updateCompany' | 'updateContact' | 'updateInteraction' | 'updateInvoice' | 'updateInvoiceItem' | 'updateLead' | 'updateOpportunity' | 'updateOpportunityProduct' | 'updateProduct'> & { createAttachment: ResolversTypes['Attachments'], createCase: ResolversTypes['Cases'], createCompany: ResolversTypes['Companies'], createContact: ResolversTypes['Contacts'], createInteraction: ResolversTypes['Interactions'], createInvoice: ResolversTypes['Invoices'], createInvoiceItem: ResolversTypes['InvoiceItems'], createLead: ResolversTypes['Leads'], createOpportunity: ResolversTypes['Opportunities'], createOpportunityProduct: ResolversTypes['OpportunityProducts'], createProduct: ResolversTypes['Products'], updateAttachment: ResolversTypes['Attachments'], updateCase: ResolversTypes['Cases'], updateCompany: ResolversTypes['Companies'], updateContact: ResolversTypes['Contacts'], updateInteraction: ResolversTypes['Interactions'], updateInvoice: ResolversTypes['Invoices'], updateInvoiceItem: ResolversTypes['InvoiceItems'], updateLead: ResolversTypes['Leads'], updateOpportunity: ResolversTypes['Opportunities'], updateOpportunityProduct: ResolversTypes['OpportunityProducts'], updateProduct: ResolversTypes['Products'] }>;
  CrmQuery: ResolverTypeWrapper<Omit<CrmQuery, 'attachment' | 'attachments' | 'case' | 'cases' | 'companies' | 'company' | 'contact' | 'contacts' | 'interaction' | 'interactions' | 'invoice' | 'invoiceItem' | 'invoiceItems' | 'invoices' | 'lead' | 'leads' | 'opportunities' | 'opportunity' | 'opportunityProduct' | 'opportunityProducts' | 'product' | 'products'> & { attachment: ResolversTypes['Attachments'], attachments: Array<ResolversTypes['Attachments']>, case: ResolversTypes['Cases'], cases: Array<ResolversTypes['Cases']>, companies: Array<ResolversTypes['Companies']>, company: ResolversTypes['Companies'], contact: ResolversTypes['Contacts'], contacts: Array<ResolversTypes['Contacts']>, interaction: ResolversTypes['Interactions'], interactions: Array<ResolversTypes['Interactions']>, invoice: ResolversTypes['Invoices'], invoiceItem: ResolversTypes['InvoiceItems'], invoiceItems: Array<ResolversTypes['InvoiceItems']>, invoices: Array<ResolversTypes['Invoices']>, lead: ResolversTypes['Leads'], leads: Array<ResolversTypes['Leads']>, opportunities: Array<ResolversTypes['Opportunities']>, opportunity: ResolversTypes['Opportunities'], opportunityProduct: ResolversTypes['OpportunityProducts'], opportunityProducts: Array<ResolversTypes['OpportunityProducts']>, product: ResolversTypes['Products'], products: Array<ResolversTypes['Products']> }>;
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
  InboundShipmentItems: ResolverTypeWrapper<Omit<InboundShipmentItems, 'inboundShipment' | 'product'> & { inboundShipment: ResolversTypes['InboundShipments'], product: ResolversTypes['WmsProducts'] }>;
  InboundShipmentStatus: ResolverTypeWrapper<'PENDING' | 'ARRIVED' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'>;
  InboundShipments: ResolverTypeWrapper<Omit<InboundShipments, 'client' | 'items' | 'status'> & { client?: Maybe<ResolversTypes['Companies']>, items?: Maybe<Array<ResolversTypes['InboundShipmentItems']>>, status?: Maybe<ResolversTypes['InboundShipmentStatus']> }>;
  InteractionType: ResolverTypeWrapper<'CALL' | 'MEETING' | 'TEXT' | 'EMAIL'>;
  Interactions: ResolverTypeWrapper<Omit<Interactions, 'case' | 'contact' | 'type'> & { case?: Maybe<ResolversTypes['Cases']>, contact: ResolversTypes['Contacts'], type?: Maybe<ResolversTypes['InteractionType']> }>;
  InventoryAdjustmentReason: ResolverTypeWrapper<'CYCLE_COUNT' | 'DAMAGED_GOODS' | 'THEFT' | 'EXPIRED' | 'RETURN_TO_VENDOR' | 'MANUAL_CORRECTION'>;
  InventoryAdjustments: ResolverTypeWrapper<Omit<InventoryAdjustments, 'product' | 'reason'> & { product: ResolversTypes['WmsProducts'], reason?: Maybe<ResolversTypes['InventoryAdjustmentReason']> }>;
  InventoryBatches: ResolverTypeWrapper<Omit<InventoryBatches, 'inventoryStock' | 'outboundShipmentItems' | 'packageItems' | 'product' | 'taskItems'> & { inventoryStock?: Maybe<Array<ResolversTypes['InventoryStock']>>, outboundShipmentItems?: Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, packageItems?: Maybe<Array<ResolversTypes['PackageItems']>>, product: ResolversTypes['WmsProducts'], taskItems?: Maybe<Array<ResolversTypes['TaskItems']>> }>;
  InventoryStock: ResolverTypeWrapper<Omit<InventoryStock, 'batch' | 'location' | 'product' | 'status'> & { batch?: Maybe<ResolversTypes['InventoryBatches']>, location: ResolversTypes['Locations'], product: ResolversTypes['WmsProducts'], status?: Maybe<ResolversTypes['InventoryStockStatus']> }>;
  InventoryStockStatus: ResolverTypeWrapper<'AVAILABLE' | 'ALLOCATED' | 'DAMAGED' | 'QUARANTINE' | 'HOLD' | 'SHIPPED' | 'EXPIRED'>;
  InvoiceItems: ResolverTypeWrapper<Omit<InvoiceItems, 'invoice' | 'product'> & { invoice: ResolversTypes['Invoices'], product: ResolversTypes['Products'] }>;
  InvoiceStatus: ResolverTypeWrapper<'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED'>;
  Invoices: ResolverTypeWrapper<Omit<Invoices, 'items' | 'opportunity' | 'paymentMethod' | 'status'> & { items?: Maybe<Array<ResolversTypes['InvoiceItems']>>, opportunity?: Maybe<ResolversTypes['Opportunities']>, paymentMethod?: Maybe<ResolversTypes['PaymentMethod']>, status?: Maybe<ResolversTypes['InvoiceStatus']> }>;
  LeadSource: ResolverTypeWrapper<'WEBSITE' | 'REFERRAL' | 'SOCIAL_MEDIA' | 'EMAIL_CAMPAIGN' | 'COLD_CALL' | 'EVENT' | 'ADVERTISEMENT' | 'PARTNER' | 'OTHER'>;
  LeadStatus: ResolverTypeWrapper<'NEW' | 'CONTACTED' | 'QUALIFIED' | 'UNQUALIFIED' | 'CONVERTED'>;
  Leads: ResolverTypeWrapper<Omit<Leads, 'convertedCompany' | 'convertedContact' | 'convertedOpportunity' | 'leadSource' | 'status'> & { convertedCompany?: Maybe<ResolversTypes['Companies']>, convertedContact?: Maybe<ResolversTypes['Contacts']>, convertedOpportunity?: Maybe<ResolversTypes['Opportunities']>, leadSource?: Maybe<ResolversTypes['LeadSource']>, status?: Maybe<ResolversTypes['LeadStatus']> }>;
  LocationType: ResolverTypeWrapper<'RECEIVING_DOCK' | 'PICK_BIN' | 'PACKING_STATION' | 'CROSS_DOCK_AREA' | 'BULK_STORAGE' | 'RESERVE_STORAGE' | 'DAMAGED_GOODS' | 'STAGING_AREA' | 'QUALITY_CONTROL' | 'RETURNS_AREA'>;
  Locations: ResolverTypeWrapper<Omit<Locations, 'binThresholds' | 'destinationTaskItems' | 'inventoryStock' | 'parentLocation' | 'putawayRules' | 'sourceTaskItems' | 'type' | 'warehouse'> & { binThresholds?: Maybe<Array<ResolversTypes['BinThresholds']>>, destinationTaskItems?: Maybe<Array<ResolversTypes['TaskItems']>>, inventoryStock?: Maybe<Array<ResolversTypes['InventoryStock']>>, parentLocation?: Maybe<ResolversTypes['Locations']>, putawayRules?: Maybe<Array<ResolversTypes['PutawayRules']>>, sourceTaskItems?: Maybe<Array<ResolversTypes['TaskItems']>>, type: ResolversTypes['LocationType'], warehouse: ResolversTypes['Warehouses'] }>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Notifications: ResolverTypeWrapper<Notifications>;
  Opportunities: ResolverTypeWrapper<Omit<Opportunities, 'company' | 'contact' | 'products' | 'salesOrders' | 'source' | 'stage'> & { company?: Maybe<ResolversTypes['Companies']>, contact?: Maybe<ResolversTypes['Contacts']>, products?: Maybe<Array<ResolversTypes['OpportunityProducts']>>, salesOrders?: Maybe<Array<ResolversTypes['SalesOrders']>>, source?: Maybe<ResolversTypes['OpportunitySource']>, stage?: Maybe<ResolversTypes['OpportunityStage']> }>;
  OpportunityProducts: ResolverTypeWrapper<Omit<OpportunityProducts, 'opportunity' | 'product'> & { opportunity: ResolversTypes['Opportunities'], product: ResolversTypes['Products'] }>;
  OpportunitySource: ResolverTypeWrapper<'WEBSITE' | 'REFERRAL' | 'SOCIAL_MEDIA' | 'EMAIL_CAMPAIGN' | 'COLD_CALL' | 'EVENT' | 'ADVERTISEMENT' | 'PARTNER' | 'EXISTING_CUSTOMER' | 'OTHER'>;
  OpportunityStage: ResolverTypeWrapper<'PROSPECTING' | 'QUALIFICATION' | 'NEED_ANALYSIS' | 'DEMO' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST'>;
  OutboundShipmentItems: ResolverTypeWrapper<Omit<OutboundShipmentItems, 'batch' | 'outboundShipment' | 'product' | 'salesOrderItem'> & { batch?: Maybe<ResolversTypes['InventoryBatches']>, outboundShipment: ResolversTypes['OutboundShipments'], product: ResolversTypes['WmsProducts'], salesOrderItem: ResolversTypes['SalesOrderItems'] }>;
  OutboundShipmentStatus: ResolverTypeWrapper<'PICKING' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'>;
  OutboundShipments: ResolverTypeWrapper<Omit<OutboundShipments, 'items' | 'salesOrder' | 'status'> & { items?: Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, salesOrder: ResolversTypes['SalesOrders'], status?: Maybe<ResolversTypes['OutboundShipmentStatus']> }>;
  PackageItems: ResolverTypeWrapper<Omit<PackageItems, 'batch' | 'package' | 'product'> & { batch?: Maybe<ResolversTypes['InventoryBatches']>, package: ResolversTypes['Packages'], product: ResolversTypes['WmsProducts'] }>;
  Packages: ResolverTypeWrapper<Omit<Packages, 'items' | 'salesOrder' | 'warehouse'> & { items?: Maybe<Array<ResolversTypes['PackageItems']>>, salesOrder: ResolversTypes['SalesOrders'], warehouse: ResolversTypes['Warehouses'] }>;
  PartnerInvoiceItems: ResolverTypeWrapper<Omit<PartnerInvoiceItems, 'partnerInvoice' | 'shipmentLeg'> & { partnerInvoice: ResolversTypes['PartnerInvoices'], shipmentLeg: ResolversTypes['ShipmentLegs'] }>;
  PartnerInvoiceStatus: ResolverTypeWrapper<'PENDING' | 'PAID' | 'DISPUTED' | 'OVERDUE' | 'CANCELLED'>;
  PartnerInvoices: ResolverTypeWrapper<Omit<PartnerInvoices, 'carrier' | 'items' | 'status'> & { carrier: ResolversTypes['Carriers'], items?: Maybe<Array<ResolversTypes['PartnerInvoiceItems']>>, status?: Maybe<ResolversTypes['PartnerInvoiceStatus']> }>;
  PaymentMethod: ResolverTypeWrapper<'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'CHECK' | 'PAYPAL' | 'STRIPE' | 'WIRE_TRANSFER'>;
  PickBatchItems: ResolverTypeWrapper<Omit<PickBatchItems, 'pickBatch' | 'salesOrder'> & { pickBatch: ResolversTypes['PickBatches'], salesOrder: ResolversTypes['SalesOrders'] }>;
  PickBatchStatus: ResolverTypeWrapper<'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'>;
  PickBatches: ResolverTypeWrapper<Omit<PickBatches, 'items' | 'status' | 'strategy' | 'tasks' | 'warehouse'> & { items?: Maybe<Array<ResolversTypes['PickBatchItems']>>, status?: Maybe<ResolversTypes['PickBatchStatus']>, strategy: ResolversTypes['PickStrategy'], tasks?: Maybe<Array<ResolversTypes['Tasks']>>, warehouse: ResolversTypes['Warehouses'] }>;
  PickStrategy: ResolverTypeWrapper<'BATCH_PICKING' | 'ZONE_PICKING' | 'WAVE_PICKING' | 'SINGLE_ORDER_PICKING' | 'CLUSTER_PICKING'>;
  ProductStatus: ResolverTypeWrapper<'ACTIVE' | 'DISCONTINUED' | 'OBSOLETE' | 'INACTIVE'>;
  ProductType: ResolverTypeWrapper<'SERVICE' | 'GOOD' | 'DIGITAL' | 'SUBSCRIPTION'>;
  Products: ResolverTypeWrapper<Omit<Products, 'type'> & { type?: Maybe<ResolversTypes['ProductType']> }>;
  ProofOfDeliveries: ResolverTypeWrapper<Omit<ProofOfDeliveries, 'tripStop' | 'type'> & { tripStop: ResolversTypes['TripStops'], type?: Maybe<ResolversTypes['ProofType']> }>;
  ProofType: ResolverTypeWrapper<'SIGNATURE' | 'PHOTO' | 'BARCODE_SCAN' | 'PIN_VERIFICATION'>;
  PutawayRules: ResolverTypeWrapper<Omit<PutawayRules, 'client' | 'locationType' | 'preferredLocation' | 'product' | 'warehouse'> & { client?: Maybe<ResolversTypes['Companies']>, locationType?: Maybe<ResolversTypes['LocationType']>, preferredLocation?: Maybe<ResolversTypes['Locations']>, product: ResolversTypes['WmsProducts'], warehouse: ResolversTypes['Warehouses'] }>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  RecordType: ResolverTypeWrapper<'COMPANIES' | 'CONTACTS' | 'LEADS' | 'OPPORTUNITIES' | 'CASES' | 'INTERACTIONS' | 'CAMPAIGNS' | 'PRODUCTS' | 'INVOICES'>;
  ReorderPoints: ResolverTypeWrapper<Omit<ReorderPoints, 'product'> & { product: ResolversTypes['WmsProducts'] }>;
  ReturnItemCondition: ResolverTypeWrapper<'SELLABLE' | 'DAMAGED' | 'DEFECTIVE' | 'EXPIRED' | 'UNSELLABLE'>;
  ReturnItems: ResolverTypeWrapper<Omit<ReturnItems, 'condition' | 'product' | 'return'> & { condition?: Maybe<ResolversTypes['ReturnItemCondition']>, product: ResolversTypes['WmsProducts'], return: ResolversTypes['Returns'] }>;
  ReturnStatus: ResolverTypeWrapper<'REQUESTED' | 'APPROVED' | 'REJECTED' | 'RECEIVED' | 'PROCESSED'>;
  Returns: ResolverTypeWrapper<Omit<Returns, 'client' | 'items' | 'salesOrder' | 'status'> & { client: ResolversTypes['Companies'], items?: Maybe<Array<ResolversTypes['ReturnItems']>>, salesOrder?: Maybe<ResolversTypes['SalesOrders']>, status?: Maybe<ResolversTypes['ReturnStatus']> }>;
  Routes: ResolverTypeWrapper<Omit<Routes, 'trip'> & { trip: ResolversTypes['Trips'] }>;
  SalesOrderItems: ResolverTypeWrapper<Omit<SalesOrderItems, 'outboundShipmentItems' | 'product' | 'salesOrder'> & { outboundShipmentItems?: Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, product: ResolversTypes['WmsProducts'], salesOrder: ResolversTypes['SalesOrders'] }>;
  SalesOrderStatus: ResolverTypeWrapper<'PENDING' | 'PROCESSING' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED'>;
  SalesOrders: ResolverTypeWrapper<Omit<SalesOrders, 'client' | 'crmOpportunity' | 'items' | 'outboundShipments' | 'packages' | 'pickBatchItems' | 'returns' | 'status'> & { client: ResolversTypes['Companies'], crmOpportunity?: Maybe<ResolversTypes['Opportunities']>, items?: Maybe<Array<ResolversTypes['SalesOrderItems']>>, outboundShipments?: Maybe<Array<ResolversTypes['OutboundShipments']>>, packages?: Maybe<Array<ResolversTypes['Packages']>>, pickBatchItems?: Maybe<Array<ResolversTypes['PickBatchItems']>>, returns?: Maybe<Array<ResolversTypes['Returns']>>, status?: Maybe<ResolversTypes['SalesOrderStatus']> }>;
  ShipmentLegEvents: ResolverTypeWrapper<Omit<ShipmentLegEvents, 'shipmentLeg'> & { shipmentLeg: ResolversTypes['ShipmentLegs'] }>;
  ShipmentLegStatus: ResolverTypeWrapper<'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED' | 'FAILED'>;
  ShipmentLegs: ResolverTypeWrapper<Omit<ShipmentLegs, 'carrier' | 'events' | 'internalTrip' | 'partnerInvoiceItems' | 'shipment' | 'status'> & { carrier?: Maybe<ResolversTypes['Carriers']>, events?: Maybe<Array<ResolversTypes['ShipmentLegEvents']>>, internalTrip?: Maybe<ResolversTypes['Trips']>, partnerInvoiceItems?: Maybe<Array<ResolversTypes['PartnerInvoiceItems']>>, shipment?: Maybe<ResolversTypes['OutboundShipments']>, status?: Maybe<ResolversTypes['ShipmentLegStatus']> }>;
  StockTransferStatus: ResolverTypeWrapper<'PENDING' | 'IN_TRANSIT' | 'RECEIVED' | 'CANCELLED'>;
  StockTransfers: ResolverTypeWrapper<Omit<StockTransfers, 'product' | 'status'> & { product: ResolversTypes['WmsProducts'], status?: Maybe<ResolversTypes['StockTransferStatus']> }>;
  Suppliers: ResolverTypeWrapper<Omit<Suppliers, 'products'> & { products?: Maybe<Array<ResolversTypes['WmsProducts']>> }>;
  TaskItemStatus: ResolverTypeWrapper<'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SHORT_PICKED' | 'DAMAGED' | 'NOT_FOUND'>;
  TaskItems: ResolverTypeWrapper<Omit<TaskItems, 'batch' | 'destinationLocation' | 'product' | 'sourceLocation' | 'status' | 'task'> & { batch?: Maybe<ResolversTypes['InventoryBatches']>, destinationLocation?: Maybe<ResolversTypes['Locations']>, product: ResolversTypes['WmsProducts'], sourceLocation?: Maybe<ResolversTypes['Locations']>, status?: Maybe<ResolversTypes['TaskItemStatus']>, task: ResolversTypes['Tasks'] }>;
  TaskStatus: ResolverTypeWrapper<'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ERROR'>;
  TaskType: ResolverTypeWrapper<'PUTAWAY' | 'PICK' | 'PACK' | 'REPLENISHMENT' | 'CYCLE_COUNT' | 'CROSS_DOCK' | 'RETURNS_PROCESSING' | 'DAMAGE_INSPECTION' | 'QUALITY_CHECK'>;
  Tasks: ResolverTypeWrapper<Omit<Tasks, 'items' | 'pickBatch' | 'status' | 'type' | 'warehouse'> & { items?: Maybe<Array<ResolversTypes['TaskItems']>>, pickBatch?: Maybe<ResolversTypes['PickBatches']>, status?: Maybe<ResolversTypes['TaskStatus']>, type: ResolversTypes['TaskType'], warehouse: ResolversTypes['Warehouses'] }>;
  TmsMutation: ResolverTypeWrapper<Omit<TmsMutation, 'createCarrier' | 'createCarrierRate' | 'createDriver' | 'createDriverSchedule' | 'createExpense' | 'createGeofence' | 'createGeofenceEvent' | 'createGpsPing' | 'createPartnerInvoice' | 'createPartnerInvoiceItem' | 'createProofOfDelivery' | 'createRoute' | 'createShipmentLeg' | 'createShipmentLegEvent' | 'createTrip' | 'createTripStop' | 'createVehicle' | 'createVehicleMaintenance' | 'updateCarrier' | 'updateCarrierRate' | 'updateDriver' | 'updateDriverSchedule' | 'updateExpense' | 'updateGeofence' | 'updateGeofenceEvent' | 'updateGpsPing' | 'updatePartnerInvoice' | 'updatePartnerInvoiceItem' | 'updateProofOfDelivery' | 'updateRoute' | 'updateShipmentLeg' | 'updateShipmentLegEvent' | 'updateTrip' | 'updateTripStop' | 'updateVehicle' | 'updateVehicleMaintenance'> & { createCarrier: ResolversTypes['Carriers'], createCarrierRate: ResolversTypes['CarrierRates'], createDriver: ResolversTypes['Drivers'], createDriverSchedule: ResolversTypes['DriverSchedules'], createExpense: ResolversTypes['Expenses'], createGeofence: ResolversTypes['Geofences'], createGeofenceEvent: ResolversTypes['GeofenceEvents'], createGpsPing: ResolversTypes['GpsPings'], createPartnerInvoice: ResolversTypes['PartnerInvoices'], createPartnerInvoiceItem: ResolversTypes['PartnerInvoiceItems'], createProofOfDelivery: ResolversTypes['ProofOfDeliveries'], createRoute: ResolversTypes['Routes'], createShipmentLeg: ResolversTypes['ShipmentLegs'], createShipmentLegEvent: ResolversTypes['ShipmentLegEvents'], createTrip: ResolversTypes['Trips'], createTripStop: ResolversTypes['TripStops'], createVehicle: ResolversTypes['Vehicles'], createVehicleMaintenance: ResolversTypes['VehicleMaintenance'], updateCarrier: ResolversTypes['Carriers'], updateCarrierRate: ResolversTypes['CarrierRates'], updateDriver: ResolversTypes['Drivers'], updateDriverSchedule: ResolversTypes['DriverSchedules'], updateExpense: ResolversTypes['Expenses'], updateGeofence: ResolversTypes['Geofences'], updateGeofenceEvent: ResolversTypes['GeofenceEvents'], updateGpsPing: ResolversTypes['GpsPings'], updatePartnerInvoice: ResolversTypes['PartnerInvoices'], updatePartnerInvoiceItem: ResolversTypes['PartnerInvoiceItems'], updateProofOfDelivery: ResolversTypes['ProofOfDeliveries'], updateRoute: ResolversTypes['Routes'], updateShipmentLeg: ResolversTypes['ShipmentLegs'], updateShipmentLegEvent: ResolversTypes['ShipmentLegEvents'], updateTrip: ResolversTypes['Trips'], updateTripStop: ResolversTypes['TripStops'], updateVehicle: ResolversTypes['Vehicles'], updateVehicleMaintenance: ResolversTypes['VehicleMaintenance'] }>;
  TmsQuery: ResolverTypeWrapper<Omit<TmsQuery, 'carrier' | 'carrierRate' | 'carrierRates' | 'carriers' | 'driver' | 'driverSchedule' | 'driverSchedules' | 'drivers' | 'expense' | 'expenses' | 'geofence' | 'geofenceEvent' | 'geofenceEvents' | 'geofences' | 'gpsPing' | 'gpsPings' | 'partnerInvoice' | 'partnerInvoiceItem' | 'partnerInvoiceItems' | 'partnerInvoices' | 'proofOfDeliveries' | 'proofOfDelivery' | 'route' | 'routes' | 'shipmentLeg' | 'shipmentLegEvent' | 'shipmentLegEvents' | 'shipmentLegs' | 'trip' | 'tripStop' | 'tripStops' | 'trips' | 'vehicle' | 'vehicleMaintenance' | 'vehicleMaintenances' | 'vehicles'> & { carrier: ResolversTypes['Carriers'], carrierRate: ResolversTypes['CarrierRates'], carrierRates: Array<ResolversTypes['CarrierRates']>, carriers: Array<ResolversTypes['Carriers']>, driver: ResolversTypes['Drivers'], driverSchedule: ResolversTypes['DriverSchedules'], driverSchedules: Array<ResolversTypes['DriverSchedules']>, drivers: Array<ResolversTypes['Drivers']>, expense: ResolversTypes['Expenses'], expenses: Array<ResolversTypes['Expenses']>, geofence: ResolversTypes['Geofences'], geofenceEvent: ResolversTypes['GeofenceEvents'], geofenceEvents: Array<ResolversTypes['GeofenceEvents']>, geofences: Array<ResolversTypes['Geofences']>, gpsPing: ResolversTypes['GpsPings'], gpsPings: Array<ResolversTypes['GpsPings']>, partnerInvoice: ResolversTypes['PartnerInvoices'], partnerInvoiceItem: ResolversTypes['PartnerInvoiceItems'], partnerInvoiceItems: Array<ResolversTypes['PartnerInvoiceItems']>, partnerInvoices: Array<ResolversTypes['PartnerInvoices']>, proofOfDeliveries: Array<ResolversTypes['ProofOfDeliveries']>, proofOfDelivery: ResolversTypes['ProofOfDeliveries'], route: ResolversTypes['Routes'], routes: Array<ResolversTypes['Routes']>, shipmentLeg: ResolversTypes['ShipmentLegs'], shipmentLegEvent: ResolversTypes['ShipmentLegEvents'], shipmentLegEvents: Array<ResolversTypes['ShipmentLegEvents']>, shipmentLegs: Array<ResolversTypes['ShipmentLegs']>, trip: ResolversTypes['Trips'], tripStop: ResolversTypes['TripStops'], tripStops: Array<ResolversTypes['TripStops']>, trips: Array<ResolversTypes['Trips']>, vehicle: ResolversTypes['Vehicles'], vehicleMaintenance: ResolversTypes['VehicleMaintenance'], vehicleMaintenances: Array<ResolversTypes['VehicleMaintenance']>, vehicles: Array<ResolversTypes['Vehicles']> }>;
  TripStatus: ResolverTypeWrapper<'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'>;
  TripStopStatus: ResolverTypeWrapper<'PENDING' | 'ARRIVED' | 'COMPLETED' | 'SKIPPED'>;
  TripStops: ResolverTypeWrapper<Omit<TripStops, 'proofOfDeliveries' | 'shipment' | 'status' | 'trip'> & { proofOfDeliveries?: Maybe<Array<ResolversTypes['ProofOfDeliveries']>>, shipment?: Maybe<ResolversTypes['OutboundShipments']>, status?: Maybe<ResolversTypes['TripStopStatus']>, trip: ResolversTypes['Trips'] }>;
  Trips: ResolverTypeWrapper<Omit<Trips, 'driver' | 'expenses' | 'routes' | 'shipmentLegs' | 'status' | 'stops' | 'vehicle'> & { driver?: Maybe<ResolversTypes['Drivers']>, expenses?: Maybe<Array<ResolversTypes['Expenses']>>, routes?: Maybe<Array<ResolversTypes['Routes']>>, shipmentLegs?: Maybe<Array<ResolversTypes['ShipmentLegs']>>, status?: Maybe<ResolversTypes['TripStatus']>, stops?: Maybe<Array<ResolversTypes['TripStops']>>, vehicle?: Maybe<ResolversTypes['Vehicles']> }>;
  UpdateAttachmentInput: UpdateAttachmentInput;
  UpdateBinThresholdInput: UpdateBinThresholdInput;
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
  UpdateInboundShipmentInput: UpdateInboundShipmentInput;
  UpdateInboundShipmentItemInput: UpdateInboundShipmentItemInput;
  UpdateInteractionInput: UpdateInteractionInput;
  UpdateInventoryAdjustmentInput: UpdateInventoryAdjustmentInput;
  UpdateInventoryBatchInput: UpdateInventoryBatchInput;
  UpdateInventoryStockInput: UpdateInventoryStockInput;
  UpdateInvoiceInput: UpdateInvoiceInput;
  UpdateInvoiceItemInput: UpdateInvoiceItemInput;
  UpdateLeadInput: UpdateLeadInput;
  UpdateLocationInput: UpdateLocationInput;
  UpdateNotificationInput: UpdateNotificationInput;
  UpdateOpportunityInput: UpdateOpportunityInput;
  UpdateOpportunityProductInput: UpdateOpportunityProductInput;
  UpdateOutboundShipmentInput: UpdateOutboundShipmentInput;
  UpdateOutboundShipmentItemInput: UpdateOutboundShipmentItemInput;
  UpdatePackageInput: UpdatePackageInput;
  UpdatePackageItemInput: UpdatePackageItemInput;
  UpdatePartnerInvoiceInput: UpdatePartnerInvoiceInput;
  UpdatePartnerInvoiceItemInput: UpdatePartnerInvoiceItemInput;
  UpdatePickBatchInput: UpdatePickBatchInput;
  UpdatePickBatchItemInput: UpdatePickBatchItemInput;
  UpdateProductInput: UpdateProductInput;
  UpdateProofOfDeliveryInput: UpdateProofOfDeliveryInput;
  UpdatePutawayRuleInput: UpdatePutawayRuleInput;
  UpdateReorderPointInput: UpdateReorderPointInput;
  UpdateReturnInput: UpdateReturnInput;
  UpdateReturnItemInput: UpdateReturnItemInput;
  UpdateRouteInput: UpdateRouteInput;
  UpdateSalesOrderInput: UpdateSalesOrderInput;
  UpdateSalesOrderItemInput: UpdateSalesOrderItemInput;
  UpdateShipmentLegEventInput: UpdateShipmentLegEventInput;
  UpdateShipmentLegInput: UpdateShipmentLegInput;
  UpdateStockTransferInput: UpdateStockTransferInput;
  UpdateSupplierInput: UpdateSupplierInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTaskItemInput: UpdateTaskItemInput;
  UpdateTripInput: UpdateTripInput;
  UpdateTripStopInput: UpdateTripStopInput;
  UpdateVehicleInput: UpdateVehicleInput;
  UpdateVehicleMaintenanceInput: UpdateVehicleMaintenanceInput;
  UpdateWarehouseInput: UpdateWarehouseInput;
  UpdateWmsProductInput: UpdateWmsProductInput;
  User: ResolverTypeWrapper<User>;
  VehicleMaintenance: ResolverTypeWrapper<Omit<VehicleMaintenance, 'serviceType' | 'vehicle'> & { serviceType?: Maybe<ResolversTypes['VehicleServiceType']>, vehicle: ResolversTypes['Vehicles'] }>;
  VehicleServiceType: ResolverTypeWrapper<'ROUTINE_MAINTENANCE' | 'REPAIR' | 'INSPECTION' | 'OIL_CHANGE' | 'TIRE_REPLACEMENT' | 'BRAKE_SERVICE'>;
  VehicleStatus: ResolverTypeWrapper<'AVAILABLE' | 'IN_MAINTENANCE' | 'ON_TRIP' | 'OUT_OF_SERVICE'>;
  Vehicles: ResolverTypeWrapper<Omit<Vehicles, 'geofenceEvents' | 'gpsPings' | 'maintenances' | 'status' | 'trips'> & { geofenceEvents?: Maybe<Array<ResolversTypes['GeofenceEvents']>>, gpsPings?: Maybe<Array<ResolversTypes['GpsPings']>>, maintenances?: Maybe<Array<ResolversTypes['VehicleMaintenance']>>, status?: Maybe<ResolversTypes['VehicleStatus']>, trips?: Maybe<Array<ResolversTypes['Trips']>> }>;
  Warehouses: ResolverTypeWrapper<Omit<Warehouses, 'destinationStockTransfers' | 'inboundShipments' | 'locations' | 'outboundShipments' | 'packages' | 'pickBatches' | 'putawayRules' | 'sourceStockTransfers' | 'tasks'> & { destinationStockTransfers?: Maybe<Array<ResolversTypes['StockTransfers']>>, inboundShipments?: Maybe<Array<ResolversTypes['InboundShipments']>>, locations?: Maybe<Array<ResolversTypes['Locations']>>, outboundShipments?: Maybe<Array<ResolversTypes['OutboundShipments']>>, packages?: Maybe<Array<ResolversTypes['Packages']>>, pickBatches?: Maybe<Array<ResolversTypes['PickBatches']>>, putawayRules?: Maybe<Array<ResolversTypes['PutawayRules']>>, sourceStockTransfers?: Maybe<Array<ResolversTypes['StockTransfers']>>, tasks?: Maybe<Array<ResolversTypes['Tasks']>> }>;
  WmsMutation: ResolverTypeWrapper<Omit<WmsMutation, 'createBinThreshold' | 'createInboundShipment' | 'createInboundShipmentItem' | 'createInventoryAdjustment' | 'createInventoryBatch' | 'createInventoryStock' | 'createLocation' | 'createOutboundShipment' | 'createOutboundShipmentItem' | 'createPackage' | 'createPackageItem' | 'createPickBatch' | 'createPickBatchItem' | 'createPutawayRule' | 'createReorderPoint' | 'createReturn' | 'createReturnItem' | 'createSalesOrder' | 'createSalesOrderItem' | 'createStockTransfer' | 'createSupplier' | 'createTask' | 'createTaskItem' | 'createWarehouse' | 'createWmsProduct' | 'updateBinThreshold' | 'updateInboundShipment' | 'updateInboundShipmentItem' | 'updateInventoryAdjustment' | 'updateInventoryBatch' | 'updateInventoryStock' | 'updateLocation' | 'updateOutboundShipment' | 'updateOutboundShipmentItem' | 'updatePackage' | 'updatePackageItem' | 'updatePickBatch' | 'updatePickBatchItem' | 'updatePutawayRule' | 'updateReorderPoint' | 'updateReturn' | 'updateReturnItem' | 'updateSalesOrder' | 'updateSalesOrderItem' | 'updateStockTransfer' | 'updateSupplier' | 'updateTask' | 'updateTaskItem' | 'updateWarehouse' | 'updateWmsProduct'> & { createBinThreshold: ResolversTypes['BinThresholds'], createInboundShipment: ResolversTypes['InboundShipments'], createInboundShipmentItem: ResolversTypes['InboundShipmentItems'], createInventoryAdjustment: ResolversTypes['InventoryAdjustments'], createInventoryBatch: ResolversTypes['InventoryBatches'], createInventoryStock: ResolversTypes['InventoryStock'], createLocation: ResolversTypes['Locations'], createOutboundShipment: ResolversTypes['OutboundShipments'], createOutboundShipmentItem: ResolversTypes['OutboundShipmentItems'], createPackage: ResolversTypes['Packages'], createPackageItem: ResolversTypes['PackageItems'], createPickBatch: ResolversTypes['PickBatches'], createPickBatchItem: ResolversTypes['PickBatchItems'], createPutawayRule: ResolversTypes['PutawayRules'], createReorderPoint: ResolversTypes['ReorderPoints'], createReturn: ResolversTypes['Returns'], createReturnItem: ResolversTypes['ReturnItems'], createSalesOrder: ResolversTypes['SalesOrders'], createSalesOrderItem: ResolversTypes['SalesOrderItems'], createStockTransfer: ResolversTypes['StockTransfers'], createSupplier: ResolversTypes['Suppliers'], createTask: ResolversTypes['Tasks'], createTaskItem: ResolversTypes['TaskItems'], createWarehouse: ResolversTypes['Warehouses'], createWmsProduct: ResolversTypes['WmsProducts'], updateBinThreshold: ResolversTypes['BinThresholds'], updateInboundShipment: ResolversTypes['InboundShipments'], updateInboundShipmentItem: ResolversTypes['InboundShipmentItems'], updateInventoryAdjustment: ResolversTypes['InventoryAdjustments'], updateInventoryBatch: ResolversTypes['InventoryBatches'], updateInventoryStock: ResolversTypes['InventoryStock'], updateLocation: ResolversTypes['Locations'], updateOutboundShipment: ResolversTypes['OutboundShipments'], updateOutboundShipmentItem: ResolversTypes['OutboundShipmentItems'], updatePackage: ResolversTypes['Packages'], updatePackageItem: ResolversTypes['PackageItems'], updatePickBatch: ResolversTypes['PickBatches'], updatePickBatchItem: ResolversTypes['PickBatchItems'], updatePutawayRule: ResolversTypes['PutawayRules'], updateReorderPoint: ResolversTypes['ReorderPoints'], updateReturn: ResolversTypes['Returns'], updateReturnItem: ResolversTypes['ReturnItems'], updateSalesOrder: ResolversTypes['SalesOrders'], updateSalesOrderItem: ResolversTypes['SalesOrderItems'], updateStockTransfer: ResolversTypes['StockTransfers'], updateSupplier: ResolversTypes['Suppliers'], updateTask: ResolversTypes['Tasks'], updateTaskItem: ResolversTypes['TaskItems'], updateWarehouse: ResolversTypes['Warehouses'], updateWmsProduct: ResolversTypes['WmsProducts'] }>;
  WmsProducts: ResolverTypeWrapper<Omit<WmsProducts, 'adjustments' | 'batches' | 'binThresholds' | 'client' | 'inboundShipmentItems' | 'inventoryStock' | 'outboundShipmentItems' | 'packageItems' | 'putawayRules' | 'reorderPoints' | 'returnItems' | 'salesOrderItems' | 'status' | 'stockTransfers' | 'supplier' | 'taskItems'> & { adjustments?: Maybe<Array<ResolversTypes['InventoryAdjustments']>>, batches?: Maybe<Array<ResolversTypes['InventoryBatches']>>, binThresholds?: Maybe<Array<ResolversTypes['BinThresholds']>>, client?: Maybe<ResolversTypes['Companies']>, inboundShipmentItems?: Maybe<Array<ResolversTypes['InboundShipmentItems']>>, inventoryStock?: Maybe<Array<ResolversTypes['InventoryStock']>>, outboundShipmentItems?: Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, packageItems?: Maybe<Array<ResolversTypes['PackageItems']>>, putawayRules?: Maybe<Array<ResolversTypes['PutawayRules']>>, reorderPoints?: Maybe<Array<ResolversTypes['ReorderPoints']>>, returnItems?: Maybe<Array<ResolversTypes['ReturnItems']>>, salesOrderItems?: Maybe<Array<ResolversTypes['SalesOrderItems']>>, status?: Maybe<ResolversTypes['ProductStatus']>, stockTransfers?: Maybe<Array<ResolversTypes['StockTransfers']>>, supplier?: Maybe<ResolversTypes['Suppliers']>, taskItems?: Maybe<Array<ResolversTypes['TaskItems']>> }>;
  WmsQuery: ResolverTypeWrapper<Omit<WmsQuery, 'binThreshold' | 'binThresholds' | 'inboundShipment' | 'inboundShipmentItem' | 'inboundShipmentItems' | 'inboundShipments' | 'inventoryAdjustment' | 'inventoryAdjustments' | 'inventoryBatch' | 'inventoryBatches' | 'inventoryStock' | 'inventoryStocks' | 'location' | 'locations' | 'outboundShipment' | 'outboundShipmentItem' | 'outboundShipmentItems' | 'outboundShipments' | 'package' | 'packageItem' | 'packageItems' | 'packages' | 'pickBatch' | 'pickBatchItem' | 'pickBatchItems' | 'pickBatches' | 'putawayRule' | 'putawayRules' | 'reorderPoint' | 'reorderPoints' | 'return' | 'returnItem' | 'returnItems' | 'returns' | 'salesOrder' | 'salesOrderItem' | 'salesOrderItems' | 'salesOrders' | 'stockTransfer' | 'stockTransfers' | 'supplier' | 'suppliers' | 'task' | 'taskItem' | 'taskItems' | 'tasks' | 'warehouse' | 'warehouses' | 'wmsProduct' | 'wmsProducts'> & { binThreshold: ResolversTypes['BinThresholds'], binThresholds: Array<ResolversTypes['BinThresholds']>, inboundShipment: ResolversTypes['InboundShipments'], inboundShipmentItem: ResolversTypes['InboundShipmentItems'], inboundShipmentItems: Array<ResolversTypes['InboundShipmentItems']>, inboundShipments: Array<ResolversTypes['InboundShipments']>, inventoryAdjustment: ResolversTypes['InventoryAdjustments'], inventoryAdjustments: Array<ResolversTypes['InventoryAdjustments']>, inventoryBatch: ResolversTypes['InventoryBatches'], inventoryBatches: Array<ResolversTypes['InventoryBatches']>, inventoryStock: ResolversTypes['InventoryStock'], inventoryStocks: Array<ResolversTypes['InventoryStock']>, location: ResolversTypes['Locations'], locations: Array<ResolversTypes['Locations']>, outboundShipment: ResolversTypes['OutboundShipments'], outboundShipmentItem: ResolversTypes['OutboundShipmentItems'], outboundShipmentItems: Array<ResolversTypes['OutboundShipmentItems']>, outboundShipments: Array<ResolversTypes['OutboundShipments']>, package: ResolversTypes['Packages'], packageItem: ResolversTypes['PackageItems'], packageItems: Array<ResolversTypes['PackageItems']>, packages: Array<ResolversTypes['Packages']>, pickBatch: ResolversTypes['PickBatches'], pickBatchItem: ResolversTypes['PickBatchItems'], pickBatchItems: Array<ResolversTypes['PickBatchItems']>, pickBatches: Array<ResolversTypes['PickBatches']>, putawayRule: ResolversTypes['PutawayRules'], putawayRules: Array<ResolversTypes['PutawayRules']>, reorderPoint: ResolversTypes['ReorderPoints'], reorderPoints: Array<ResolversTypes['ReorderPoints']>, return: ResolversTypes['Returns'], returnItem: ResolversTypes['ReturnItems'], returnItems: Array<ResolversTypes['ReturnItems']>, returns: Array<ResolversTypes['Returns']>, salesOrder: ResolversTypes['SalesOrders'], salesOrderItem: ResolversTypes['SalesOrderItems'], salesOrderItems: Array<ResolversTypes['SalesOrderItems']>, salesOrders: Array<ResolversTypes['SalesOrders']>, stockTransfer: ResolversTypes['StockTransfers'], stockTransfers: Array<ResolversTypes['StockTransfers']>, supplier: ResolversTypes['Suppliers'], suppliers: Array<ResolversTypes['Suppliers']>, task: ResolversTypes['Tasks'], taskItem: ResolversTypes['TaskItems'], taskItems: Array<ResolversTypes['TaskItems']>, tasks: Array<ResolversTypes['Tasks']>, warehouse: ResolversTypes['Warehouses'], warehouses: Array<ResolversTypes['Warehouses']>, wmsProduct: ResolversTypes['WmsProducts'], wmsProducts: Array<ResolversTypes['WmsProducts']> }>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Attachments: Attachments;
  String: Scalars['String']['output'];
  ID: Scalars['ID']['output'];
  BinThresholds: Omit<BinThresholds, 'location' | 'product'> & { location: ResolversParentTypes['Locations'], product: ResolversParentTypes['WmsProducts'] };
  Int: Scalars['Int']['output'];
  Boolean: Scalars['Boolean']['output'];
  Campaigns: Campaigns;
  Float: Scalars['Float']['output'];
  CarrierRates: Omit<CarrierRates, 'carrier'> & { carrier: ResolversParentTypes['Carriers'] };
  Carriers: Omit<Carriers, 'partnerInvoices' | 'rates' | 'shipmentLegs'> & { partnerInvoices?: Maybe<Array<ResolversParentTypes['PartnerInvoices']>>, rates?: Maybe<Array<ResolversParentTypes['CarrierRates']>>, shipmentLegs?: Maybe<Array<ResolversParentTypes['ShipmentLegs']>> };
  Cases: Omit<Cases, 'contact'> & { contact?: Maybe<ResolversParentTypes['Contacts']> };
  Companies: Omit<Companies, 'inboundShipments' | 'putawayRules' | 'returns' | 'salesOrders'> & { inboundShipments?: Maybe<Array<ResolversParentTypes['InboundShipments']>>, putawayRules?: Maybe<Array<ResolversParentTypes['PutawayRules']>>, returns?: Maybe<Array<ResolversParentTypes['Returns']>>, salesOrders?: Maybe<Array<ResolversParentTypes['SalesOrders']>> };
  Contacts: Omit<Contacts, 'company'> & { company?: Maybe<ResolversParentTypes['Companies']> };
  CreateAttachmentInput: CreateAttachmentInput;
  CreateBinThresholdInput: CreateBinThresholdInput;
  CreateCampaignInput: CreateCampaignInput;
  CreateCarrierInput: CreateCarrierInput;
  CreateCarrierRateInput: CreateCarrierRateInput;
  CreateCaseInput: CreateCaseInput;
  CreateCompanyInput: CreateCompanyInput;
  CreateContactInput: CreateContactInput;
  CreateDriverInput: CreateDriverInput;
  CreateDriverScheduleInput: CreateDriverScheduleInput;
  CreateExpenseInput: CreateExpenseInput;
  CreateGeofenceEventInput: CreateGeofenceEventInput;
  CreateGeofenceInput: CreateGeofenceInput;
  CreateGpsPingInput: CreateGpsPingInput;
  CreateInboundShipmentInput: CreateInboundShipmentInput;
  CreateInboundShipmentItemInput: CreateInboundShipmentItemInput;
  CreateInteractionInput: CreateInteractionInput;
  CreateInventoryAdjustmentInput: CreateInventoryAdjustmentInput;
  CreateInventoryBatchInput: CreateInventoryBatchInput;
  CreateInventoryStockInput: CreateInventoryStockInput;
  CreateInvoiceInput: CreateInvoiceInput;
  CreateInvoiceItemInput: CreateInvoiceItemInput;
  CreateLeadInput: CreateLeadInput;
  CreateLocationInput: CreateLocationInput;
  CreateNotificationInput: CreateNotificationInput;
  CreateOpportunityInput: CreateOpportunityInput;
  CreateOpportunityProductInput: CreateOpportunityProductInput;
  CreateOutboundShipmentInput: CreateOutboundShipmentInput;
  CreateOutboundShipmentItemInput: CreateOutboundShipmentItemInput;
  CreatePackageInput: CreatePackageInput;
  CreatePackageItemInput: CreatePackageItemInput;
  CreatePartnerInvoiceInput: CreatePartnerInvoiceInput;
  CreatePartnerInvoiceItemInput: CreatePartnerInvoiceItemInput;
  CreatePickBatchInput: CreatePickBatchInput;
  CreatePickBatchItemInput: CreatePickBatchItemInput;
  CreateProductInput: CreateProductInput;
  CreateProofOfDeliveryInput: CreateProofOfDeliveryInput;
  CreatePutawayRuleInput: CreatePutawayRuleInput;
  CreateReorderPointInput: CreateReorderPointInput;
  CreateReturnInput: CreateReturnInput;
  CreateReturnItemInput: CreateReturnItemInput;
  CreateRouteInput: CreateRouteInput;
  CreateSalesOrderInput: CreateSalesOrderInput;
  CreateSalesOrderItemInput: CreateSalesOrderItemInput;
  CreateShipmentLegEventInput: CreateShipmentLegEventInput;
  CreateShipmentLegInput: CreateShipmentLegInput;
  CreateStockTransferInput: CreateStockTransferInput;
  CreateSupplierInput: CreateSupplierInput;
  CreateTaskInput: CreateTaskInput;
  CreateTaskItemInput: CreateTaskItemInput;
  CreateTripInput: CreateTripInput;
  CreateTripStopInput: CreateTripStopInput;
  CreateVehicleInput: CreateVehicleInput;
  CreateVehicleMaintenanceInput: CreateVehicleMaintenanceInput;
  CreateWarehouseInput: CreateWarehouseInput;
  CreateWmsProductInput: CreateWmsProductInput;
  CrmMutation: Omit<CrmMutation, 'createAttachment' | 'createCase' | 'createCompany' | 'createContact' | 'createInteraction' | 'createInvoice' | 'createInvoiceItem' | 'createLead' | 'createOpportunity' | 'createOpportunityProduct' | 'createProduct' | 'updateAttachment' | 'updateCase' | 'updateCompany' | 'updateContact' | 'updateInteraction' | 'updateInvoice' | 'updateInvoiceItem' | 'updateLead' | 'updateOpportunity' | 'updateOpportunityProduct' | 'updateProduct'> & { createAttachment: ResolversParentTypes['Attachments'], createCase: ResolversParentTypes['Cases'], createCompany: ResolversParentTypes['Companies'], createContact: ResolversParentTypes['Contacts'], createInteraction: ResolversParentTypes['Interactions'], createInvoice: ResolversParentTypes['Invoices'], createInvoiceItem: ResolversParentTypes['InvoiceItems'], createLead: ResolversParentTypes['Leads'], createOpportunity: ResolversParentTypes['Opportunities'], createOpportunityProduct: ResolversParentTypes['OpportunityProducts'], createProduct: ResolversParentTypes['Products'], updateAttachment: ResolversParentTypes['Attachments'], updateCase: ResolversParentTypes['Cases'], updateCompany: ResolversParentTypes['Companies'], updateContact: ResolversParentTypes['Contacts'], updateInteraction: ResolversParentTypes['Interactions'], updateInvoice: ResolversParentTypes['Invoices'], updateInvoiceItem: ResolversParentTypes['InvoiceItems'], updateLead: ResolversParentTypes['Leads'], updateOpportunity: ResolversParentTypes['Opportunities'], updateOpportunityProduct: ResolversParentTypes['OpportunityProducts'], updateProduct: ResolversParentTypes['Products'] };
  CrmQuery: Omit<CrmQuery, 'attachment' | 'attachments' | 'case' | 'cases' | 'companies' | 'company' | 'contact' | 'contacts' | 'interaction' | 'interactions' | 'invoice' | 'invoiceItem' | 'invoiceItems' | 'invoices' | 'lead' | 'leads' | 'opportunities' | 'opportunity' | 'opportunityProduct' | 'opportunityProducts' | 'product' | 'products'> & { attachment: ResolversParentTypes['Attachments'], attachments: Array<ResolversParentTypes['Attachments']>, case: ResolversParentTypes['Cases'], cases: Array<ResolversParentTypes['Cases']>, companies: Array<ResolversParentTypes['Companies']>, company: ResolversParentTypes['Companies'], contact: ResolversParentTypes['Contacts'], contacts: Array<ResolversParentTypes['Contacts']>, interaction: ResolversParentTypes['Interactions'], interactions: Array<ResolversParentTypes['Interactions']>, invoice: ResolversParentTypes['Invoices'], invoiceItem: ResolversParentTypes['InvoiceItems'], invoiceItems: Array<ResolversParentTypes['InvoiceItems']>, invoices: Array<ResolversParentTypes['Invoices']>, lead: ResolversParentTypes['Leads'], leads: Array<ResolversParentTypes['Leads']>, opportunities: Array<ResolversParentTypes['Opportunities']>, opportunity: ResolversParentTypes['Opportunities'], opportunityProduct: ResolversParentTypes['OpportunityProducts'], opportunityProducts: Array<ResolversParentTypes['OpportunityProducts']>, product: ResolversParentTypes['Products'], products: Array<ResolversParentTypes['Products']> };
  DeleteResult: DeleteResult;
  DriverSchedules: Omit<DriverSchedules, 'driver'> & { driver: ResolversParentTypes['Drivers'] };
  Drivers: Omit<Drivers, 'expenses' | 'schedules' | 'trips'> & { expenses?: Maybe<Array<ResolversParentTypes['Expenses']>>, schedules?: Maybe<Array<ResolversParentTypes['DriverSchedules']>>, trips?: Maybe<Array<ResolversParentTypes['Trips']>> };
  Expenses: Omit<Expenses, 'driver' | 'trip'> & { driver?: Maybe<ResolversParentTypes['Drivers']>, trip?: Maybe<ResolversParentTypes['Trips']> };
  GeofenceEvents: Omit<GeofenceEvents, 'geofence' | 'vehicle'> & { geofence: ResolversParentTypes['Geofences'], vehicle: ResolversParentTypes['Vehicles'] };
  Geofences: Omit<Geofences, 'events'> & { events?: Maybe<Array<ResolversParentTypes['GeofenceEvents']>> };
  GpsPings: Omit<GpsPings, 'vehicle'> & { vehicle: ResolversParentTypes['Vehicles'] };
  InboundShipmentItems: Omit<InboundShipmentItems, 'inboundShipment' | 'product'> & { inboundShipment: ResolversParentTypes['InboundShipments'], product: ResolversParentTypes['WmsProducts'] };
  InboundShipments: Omit<InboundShipments, 'client' | 'items'> & { client?: Maybe<ResolversParentTypes['Companies']>, items?: Maybe<Array<ResolversParentTypes['InboundShipmentItems']>> };
  Interactions: Omit<Interactions, 'case' | 'contact'> & { case?: Maybe<ResolversParentTypes['Cases']>, contact: ResolversParentTypes['Contacts'] };
  InventoryAdjustments: Omit<InventoryAdjustments, 'product'> & { product: ResolversParentTypes['WmsProducts'] };
  InventoryBatches: Omit<InventoryBatches, 'inventoryStock' | 'outboundShipmentItems' | 'packageItems' | 'product' | 'taskItems'> & { inventoryStock?: Maybe<Array<ResolversParentTypes['InventoryStock']>>, outboundShipmentItems?: Maybe<Array<ResolversParentTypes['OutboundShipmentItems']>>, packageItems?: Maybe<Array<ResolversParentTypes['PackageItems']>>, product: ResolversParentTypes['WmsProducts'], taskItems?: Maybe<Array<ResolversParentTypes['TaskItems']>> };
  InventoryStock: Omit<InventoryStock, 'batch' | 'location' | 'product'> & { batch?: Maybe<ResolversParentTypes['InventoryBatches']>, location: ResolversParentTypes['Locations'], product: ResolversParentTypes['WmsProducts'] };
  InvoiceItems: Omit<InvoiceItems, 'invoice' | 'product'> & { invoice: ResolversParentTypes['Invoices'], product: ResolversParentTypes['Products'] };
  Invoices: Omit<Invoices, 'items' | 'opportunity'> & { items?: Maybe<Array<ResolversParentTypes['InvoiceItems']>>, opportunity?: Maybe<ResolversParentTypes['Opportunities']> };
  Leads: Omit<Leads, 'convertedCompany' | 'convertedContact' | 'convertedOpportunity'> & { convertedCompany?: Maybe<ResolversParentTypes['Companies']>, convertedContact?: Maybe<ResolversParentTypes['Contacts']>, convertedOpportunity?: Maybe<ResolversParentTypes['Opportunities']> };
  Locations: Omit<Locations, 'binThresholds' | 'destinationTaskItems' | 'inventoryStock' | 'parentLocation' | 'putawayRules' | 'sourceTaskItems' | 'warehouse'> & { binThresholds?: Maybe<Array<ResolversParentTypes['BinThresholds']>>, destinationTaskItems?: Maybe<Array<ResolversParentTypes['TaskItems']>>, inventoryStock?: Maybe<Array<ResolversParentTypes['InventoryStock']>>, parentLocation?: Maybe<ResolversParentTypes['Locations']>, putawayRules?: Maybe<Array<ResolversParentTypes['PutawayRules']>>, sourceTaskItems?: Maybe<Array<ResolversParentTypes['TaskItems']>>, warehouse: ResolversParentTypes['Warehouses'] };
  Mutation: Record<PropertyKey, never>;
  Notifications: Notifications;
  Opportunities: Omit<Opportunities, 'company' | 'contact' | 'products' | 'salesOrders'> & { company?: Maybe<ResolversParentTypes['Companies']>, contact?: Maybe<ResolversParentTypes['Contacts']>, products?: Maybe<Array<ResolversParentTypes['OpportunityProducts']>>, salesOrders?: Maybe<Array<ResolversParentTypes['SalesOrders']>> };
  OpportunityProducts: Omit<OpportunityProducts, 'opportunity' | 'product'> & { opportunity: ResolversParentTypes['Opportunities'], product: ResolversParentTypes['Products'] };
  OutboundShipmentItems: Omit<OutboundShipmentItems, 'batch' | 'outboundShipment' | 'product' | 'salesOrderItem'> & { batch?: Maybe<ResolversParentTypes['InventoryBatches']>, outboundShipment: ResolversParentTypes['OutboundShipments'], product: ResolversParentTypes['WmsProducts'], salesOrderItem: ResolversParentTypes['SalesOrderItems'] };
  OutboundShipments: Omit<OutboundShipments, 'items' | 'salesOrder'> & { items?: Maybe<Array<ResolversParentTypes['OutboundShipmentItems']>>, salesOrder: ResolversParentTypes['SalesOrders'] };
  PackageItems: Omit<PackageItems, 'batch' | 'package' | 'product'> & { batch?: Maybe<ResolversParentTypes['InventoryBatches']>, package: ResolversParentTypes['Packages'], product: ResolversParentTypes['WmsProducts'] };
  Packages: Omit<Packages, 'items' | 'salesOrder' | 'warehouse'> & { items?: Maybe<Array<ResolversParentTypes['PackageItems']>>, salesOrder: ResolversParentTypes['SalesOrders'], warehouse: ResolversParentTypes['Warehouses'] };
  PartnerInvoiceItems: Omit<PartnerInvoiceItems, 'partnerInvoice' | 'shipmentLeg'> & { partnerInvoice: ResolversParentTypes['PartnerInvoices'], shipmentLeg: ResolversParentTypes['ShipmentLegs'] };
  PartnerInvoices: Omit<PartnerInvoices, 'carrier' | 'items'> & { carrier: ResolversParentTypes['Carriers'], items?: Maybe<Array<ResolversParentTypes['PartnerInvoiceItems']>> };
  PickBatchItems: Omit<PickBatchItems, 'pickBatch' | 'salesOrder'> & { pickBatch: ResolversParentTypes['PickBatches'], salesOrder: ResolversParentTypes['SalesOrders'] };
  PickBatches: Omit<PickBatches, 'items' | 'tasks' | 'warehouse'> & { items?: Maybe<Array<ResolversParentTypes['PickBatchItems']>>, tasks?: Maybe<Array<ResolversParentTypes['Tasks']>>, warehouse: ResolversParentTypes['Warehouses'] };
  Products: Products;
  ProofOfDeliveries: Omit<ProofOfDeliveries, 'tripStop'> & { tripStop: ResolversParentTypes['TripStops'] };
  PutawayRules: Omit<PutawayRules, 'client' | 'preferredLocation' | 'product' | 'warehouse'> & { client?: Maybe<ResolversParentTypes['Companies']>, preferredLocation?: Maybe<ResolversParentTypes['Locations']>, product: ResolversParentTypes['WmsProducts'], warehouse: ResolversParentTypes['Warehouses'] };
  Query: Record<PropertyKey, never>;
  ReorderPoints: Omit<ReorderPoints, 'product'> & { product: ResolversParentTypes['WmsProducts'] };
  ReturnItems: Omit<ReturnItems, 'product' | 'return'> & { product: ResolversParentTypes['WmsProducts'], return: ResolversParentTypes['Returns'] };
  Returns: Omit<Returns, 'client' | 'items' | 'salesOrder'> & { client: ResolversParentTypes['Companies'], items?: Maybe<Array<ResolversParentTypes['ReturnItems']>>, salesOrder?: Maybe<ResolversParentTypes['SalesOrders']> };
  Routes: Omit<Routes, 'trip'> & { trip: ResolversParentTypes['Trips'] };
  SalesOrderItems: Omit<SalesOrderItems, 'outboundShipmentItems' | 'product' | 'salesOrder'> & { outboundShipmentItems?: Maybe<Array<ResolversParentTypes['OutboundShipmentItems']>>, product: ResolversParentTypes['WmsProducts'], salesOrder: ResolversParentTypes['SalesOrders'] };
  SalesOrders: Omit<SalesOrders, 'client' | 'crmOpportunity' | 'items' | 'outboundShipments' | 'packages' | 'pickBatchItems' | 'returns'> & { client: ResolversParentTypes['Companies'], crmOpportunity?: Maybe<ResolversParentTypes['Opportunities']>, items?: Maybe<Array<ResolversParentTypes['SalesOrderItems']>>, outboundShipments?: Maybe<Array<ResolversParentTypes['OutboundShipments']>>, packages?: Maybe<Array<ResolversParentTypes['Packages']>>, pickBatchItems?: Maybe<Array<ResolversParentTypes['PickBatchItems']>>, returns?: Maybe<Array<ResolversParentTypes['Returns']>> };
  ShipmentLegEvents: Omit<ShipmentLegEvents, 'shipmentLeg'> & { shipmentLeg: ResolversParentTypes['ShipmentLegs'] };
  ShipmentLegs: Omit<ShipmentLegs, 'carrier' | 'events' | 'internalTrip' | 'partnerInvoiceItems' | 'shipment'> & { carrier?: Maybe<ResolversParentTypes['Carriers']>, events?: Maybe<Array<ResolversParentTypes['ShipmentLegEvents']>>, internalTrip?: Maybe<ResolversParentTypes['Trips']>, partnerInvoiceItems?: Maybe<Array<ResolversParentTypes['PartnerInvoiceItems']>>, shipment?: Maybe<ResolversParentTypes['OutboundShipments']> };
  StockTransfers: Omit<StockTransfers, 'product'> & { product: ResolversParentTypes['WmsProducts'] };
  Suppliers: Omit<Suppliers, 'products'> & { products?: Maybe<Array<ResolversParentTypes['WmsProducts']>> };
  TaskItems: Omit<TaskItems, 'batch' | 'destinationLocation' | 'product' | 'sourceLocation' | 'task'> & { batch?: Maybe<ResolversParentTypes['InventoryBatches']>, destinationLocation?: Maybe<ResolversParentTypes['Locations']>, product: ResolversParentTypes['WmsProducts'], sourceLocation?: Maybe<ResolversParentTypes['Locations']>, task: ResolversParentTypes['Tasks'] };
  Tasks: Omit<Tasks, 'items' | 'pickBatch' | 'warehouse'> & { items?: Maybe<Array<ResolversParentTypes['TaskItems']>>, pickBatch?: Maybe<ResolversParentTypes['PickBatches']>, warehouse: ResolversParentTypes['Warehouses'] };
  TmsMutation: Omit<TmsMutation, 'createCarrier' | 'createCarrierRate' | 'createDriver' | 'createDriverSchedule' | 'createExpense' | 'createGeofence' | 'createGeofenceEvent' | 'createGpsPing' | 'createPartnerInvoice' | 'createPartnerInvoiceItem' | 'createProofOfDelivery' | 'createRoute' | 'createShipmentLeg' | 'createShipmentLegEvent' | 'createTrip' | 'createTripStop' | 'createVehicle' | 'createVehicleMaintenance' | 'updateCarrier' | 'updateCarrierRate' | 'updateDriver' | 'updateDriverSchedule' | 'updateExpense' | 'updateGeofence' | 'updateGeofenceEvent' | 'updateGpsPing' | 'updatePartnerInvoice' | 'updatePartnerInvoiceItem' | 'updateProofOfDelivery' | 'updateRoute' | 'updateShipmentLeg' | 'updateShipmentLegEvent' | 'updateTrip' | 'updateTripStop' | 'updateVehicle' | 'updateVehicleMaintenance'> & { createCarrier: ResolversParentTypes['Carriers'], createCarrierRate: ResolversParentTypes['CarrierRates'], createDriver: ResolversParentTypes['Drivers'], createDriverSchedule: ResolversParentTypes['DriverSchedules'], createExpense: ResolversParentTypes['Expenses'], createGeofence: ResolversParentTypes['Geofences'], createGeofenceEvent: ResolversParentTypes['GeofenceEvents'], createGpsPing: ResolversParentTypes['GpsPings'], createPartnerInvoice: ResolversParentTypes['PartnerInvoices'], createPartnerInvoiceItem: ResolversParentTypes['PartnerInvoiceItems'], createProofOfDelivery: ResolversParentTypes['ProofOfDeliveries'], createRoute: ResolversParentTypes['Routes'], createShipmentLeg: ResolversParentTypes['ShipmentLegs'], createShipmentLegEvent: ResolversParentTypes['ShipmentLegEvents'], createTrip: ResolversParentTypes['Trips'], createTripStop: ResolversParentTypes['TripStops'], createVehicle: ResolversParentTypes['Vehicles'], createVehicleMaintenance: ResolversParentTypes['VehicleMaintenance'], updateCarrier: ResolversParentTypes['Carriers'], updateCarrierRate: ResolversParentTypes['CarrierRates'], updateDriver: ResolversParentTypes['Drivers'], updateDriverSchedule: ResolversParentTypes['DriverSchedules'], updateExpense: ResolversParentTypes['Expenses'], updateGeofence: ResolversParentTypes['Geofences'], updateGeofenceEvent: ResolversParentTypes['GeofenceEvents'], updateGpsPing: ResolversParentTypes['GpsPings'], updatePartnerInvoice: ResolversParentTypes['PartnerInvoices'], updatePartnerInvoiceItem: ResolversParentTypes['PartnerInvoiceItems'], updateProofOfDelivery: ResolversParentTypes['ProofOfDeliveries'], updateRoute: ResolversParentTypes['Routes'], updateShipmentLeg: ResolversParentTypes['ShipmentLegs'], updateShipmentLegEvent: ResolversParentTypes['ShipmentLegEvents'], updateTrip: ResolversParentTypes['Trips'], updateTripStop: ResolversParentTypes['TripStops'], updateVehicle: ResolversParentTypes['Vehicles'], updateVehicleMaintenance: ResolversParentTypes['VehicleMaintenance'] };
  TmsQuery: Omit<TmsQuery, 'carrier' | 'carrierRate' | 'carrierRates' | 'carriers' | 'driver' | 'driverSchedule' | 'driverSchedules' | 'drivers' | 'expense' | 'expenses' | 'geofence' | 'geofenceEvent' | 'geofenceEvents' | 'geofences' | 'gpsPing' | 'gpsPings' | 'partnerInvoice' | 'partnerInvoiceItem' | 'partnerInvoiceItems' | 'partnerInvoices' | 'proofOfDeliveries' | 'proofOfDelivery' | 'route' | 'routes' | 'shipmentLeg' | 'shipmentLegEvent' | 'shipmentLegEvents' | 'shipmentLegs' | 'trip' | 'tripStop' | 'tripStops' | 'trips' | 'vehicle' | 'vehicleMaintenance' | 'vehicleMaintenances' | 'vehicles'> & { carrier: ResolversParentTypes['Carriers'], carrierRate: ResolversParentTypes['CarrierRates'], carrierRates: Array<ResolversParentTypes['CarrierRates']>, carriers: Array<ResolversParentTypes['Carriers']>, driver: ResolversParentTypes['Drivers'], driverSchedule: ResolversParentTypes['DriverSchedules'], driverSchedules: Array<ResolversParentTypes['DriverSchedules']>, drivers: Array<ResolversParentTypes['Drivers']>, expense: ResolversParentTypes['Expenses'], expenses: Array<ResolversParentTypes['Expenses']>, geofence: ResolversParentTypes['Geofences'], geofenceEvent: ResolversParentTypes['GeofenceEvents'], geofenceEvents: Array<ResolversParentTypes['GeofenceEvents']>, geofences: Array<ResolversParentTypes['Geofences']>, gpsPing: ResolversParentTypes['GpsPings'], gpsPings: Array<ResolversParentTypes['GpsPings']>, partnerInvoice: ResolversParentTypes['PartnerInvoices'], partnerInvoiceItem: ResolversParentTypes['PartnerInvoiceItems'], partnerInvoiceItems: Array<ResolversParentTypes['PartnerInvoiceItems']>, partnerInvoices: Array<ResolversParentTypes['PartnerInvoices']>, proofOfDeliveries: Array<ResolversParentTypes['ProofOfDeliveries']>, proofOfDelivery: ResolversParentTypes['ProofOfDeliveries'], route: ResolversParentTypes['Routes'], routes: Array<ResolversParentTypes['Routes']>, shipmentLeg: ResolversParentTypes['ShipmentLegs'], shipmentLegEvent: ResolversParentTypes['ShipmentLegEvents'], shipmentLegEvents: Array<ResolversParentTypes['ShipmentLegEvents']>, shipmentLegs: Array<ResolversParentTypes['ShipmentLegs']>, trip: ResolversParentTypes['Trips'], tripStop: ResolversParentTypes['TripStops'], tripStops: Array<ResolversParentTypes['TripStops']>, trips: Array<ResolversParentTypes['Trips']>, vehicle: ResolversParentTypes['Vehicles'], vehicleMaintenance: ResolversParentTypes['VehicleMaintenance'], vehicleMaintenances: Array<ResolversParentTypes['VehicleMaintenance']>, vehicles: Array<ResolversParentTypes['Vehicles']> };
  TripStops: Omit<TripStops, 'proofOfDeliveries' | 'shipment' | 'trip'> & { proofOfDeliveries?: Maybe<Array<ResolversParentTypes['ProofOfDeliveries']>>, shipment?: Maybe<ResolversParentTypes['OutboundShipments']>, trip: ResolversParentTypes['Trips'] };
  Trips: Omit<Trips, 'driver' | 'expenses' | 'routes' | 'shipmentLegs' | 'stops' | 'vehicle'> & { driver?: Maybe<ResolversParentTypes['Drivers']>, expenses?: Maybe<Array<ResolversParentTypes['Expenses']>>, routes?: Maybe<Array<ResolversParentTypes['Routes']>>, shipmentLegs?: Maybe<Array<ResolversParentTypes['ShipmentLegs']>>, stops?: Maybe<Array<ResolversParentTypes['TripStops']>>, vehicle?: Maybe<ResolversParentTypes['Vehicles']> };
  UpdateAttachmentInput: UpdateAttachmentInput;
  UpdateBinThresholdInput: UpdateBinThresholdInput;
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
  UpdateInboundShipmentInput: UpdateInboundShipmentInput;
  UpdateInboundShipmentItemInput: UpdateInboundShipmentItemInput;
  UpdateInteractionInput: UpdateInteractionInput;
  UpdateInventoryAdjustmentInput: UpdateInventoryAdjustmentInput;
  UpdateInventoryBatchInput: UpdateInventoryBatchInput;
  UpdateInventoryStockInput: UpdateInventoryStockInput;
  UpdateInvoiceInput: UpdateInvoiceInput;
  UpdateInvoiceItemInput: UpdateInvoiceItemInput;
  UpdateLeadInput: UpdateLeadInput;
  UpdateLocationInput: UpdateLocationInput;
  UpdateNotificationInput: UpdateNotificationInput;
  UpdateOpportunityInput: UpdateOpportunityInput;
  UpdateOpportunityProductInput: UpdateOpportunityProductInput;
  UpdateOutboundShipmentInput: UpdateOutboundShipmentInput;
  UpdateOutboundShipmentItemInput: UpdateOutboundShipmentItemInput;
  UpdatePackageInput: UpdatePackageInput;
  UpdatePackageItemInput: UpdatePackageItemInput;
  UpdatePartnerInvoiceInput: UpdatePartnerInvoiceInput;
  UpdatePartnerInvoiceItemInput: UpdatePartnerInvoiceItemInput;
  UpdatePickBatchInput: UpdatePickBatchInput;
  UpdatePickBatchItemInput: UpdatePickBatchItemInput;
  UpdateProductInput: UpdateProductInput;
  UpdateProofOfDeliveryInput: UpdateProofOfDeliveryInput;
  UpdatePutawayRuleInput: UpdatePutawayRuleInput;
  UpdateReorderPointInput: UpdateReorderPointInput;
  UpdateReturnInput: UpdateReturnInput;
  UpdateReturnItemInput: UpdateReturnItemInput;
  UpdateRouteInput: UpdateRouteInput;
  UpdateSalesOrderInput: UpdateSalesOrderInput;
  UpdateSalesOrderItemInput: UpdateSalesOrderItemInput;
  UpdateShipmentLegEventInput: UpdateShipmentLegEventInput;
  UpdateShipmentLegInput: UpdateShipmentLegInput;
  UpdateStockTransferInput: UpdateStockTransferInput;
  UpdateSupplierInput: UpdateSupplierInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateTaskItemInput: UpdateTaskItemInput;
  UpdateTripInput: UpdateTripInput;
  UpdateTripStopInput: UpdateTripStopInput;
  UpdateVehicleInput: UpdateVehicleInput;
  UpdateVehicleMaintenanceInput: UpdateVehicleMaintenanceInput;
  UpdateWarehouseInput: UpdateWarehouseInput;
  UpdateWmsProductInput: UpdateWmsProductInput;
  User: User;
  VehicleMaintenance: Omit<VehicleMaintenance, 'vehicle'> & { vehicle: ResolversParentTypes['Vehicles'] };
  Vehicles: Omit<Vehicles, 'geofenceEvents' | 'gpsPings' | 'maintenances' | 'trips'> & { geofenceEvents?: Maybe<Array<ResolversParentTypes['GeofenceEvents']>>, gpsPings?: Maybe<Array<ResolversParentTypes['GpsPings']>>, maintenances?: Maybe<Array<ResolversParentTypes['VehicleMaintenance']>>, trips?: Maybe<Array<ResolversParentTypes['Trips']>> };
  Warehouses: Omit<Warehouses, 'destinationStockTransfers' | 'inboundShipments' | 'locations' | 'outboundShipments' | 'packages' | 'pickBatches' | 'putawayRules' | 'sourceStockTransfers' | 'tasks'> & { destinationStockTransfers?: Maybe<Array<ResolversParentTypes['StockTransfers']>>, inboundShipments?: Maybe<Array<ResolversParentTypes['InboundShipments']>>, locations?: Maybe<Array<ResolversParentTypes['Locations']>>, outboundShipments?: Maybe<Array<ResolversParentTypes['OutboundShipments']>>, packages?: Maybe<Array<ResolversParentTypes['Packages']>>, pickBatches?: Maybe<Array<ResolversParentTypes['PickBatches']>>, putawayRules?: Maybe<Array<ResolversParentTypes['PutawayRules']>>, sourceStockTransfers?: Maybe<Array<ResolversParentTypes['StockTransfers']>>, tasks?: Maybe<Array<ResolversParentTypes['Tasks']>> };
  WmsMutation: Omit<WmsMutation, 'createBinThreshold' | 'createInboundShipment' | 'createInboundShipmentItem' | 'createInventoryAdjustment' | 'createInventoryBatch' | 'createInventoryStock' | 'createLocation' | 'createOutboundShipment' | 'createOutboundShipmentItem' | 'createPackage' | 'createPackageItem' | 'createPickBatch' | 'createPickBatchItem' | 'createPutawayRule' | 'createReorderPoint' | 'createReturn' | 'createReturnItem' | 'createSalesOrder' | 'createSalesOrderItem' | 'createStockTransfer' | 'createSupplier' | 'createTask' | 'createTaskItem' | 'createWarehouse' | 'createWmsProduct' | 'updateBinThreshold' | 'updateInboundShipment' | 'updateInboundShipmentItem' | 'updateInventoryAdjustment' | 'updateInventoryBatch' | 'updateInventoryStock' | 'updateLocation' | 'updateOutboundShipment' | 'updateOutboundShipmentItem' | 'updatePackage' | 'updatePackageItem' | 'updatePickBatch' | 'updatePickBatchItem' | 'updatePutawayRule' | 'updateReorderPoint' | 'updateReturn' | 'updateReturnItem' | 'updateSalesOrder' | 'updateSalesOrderItem' | 'updateStockTransfer' | 'updateSupplier' | 'updateTask' | 'updateTaskItem' | 'updateWarehouse' | 'updateWmsProduct'> & { createBinThreshold: ResolversParentTypes['BinThresholds'], createInboundShipment: ResolversParentTypes['InboundShipments'], createInboundShipmentItem: ResolversParentTypes['InboundShipmentItems'], createInventoryAdjustment: ResolversParentTypes['InventoryAdjustments'], createInventoryBatch: ResolversParentTypes['InventoryBatches'], createInventoryStock: ResolversParentTypes['InventoryStock'], createLocation: ResolversParentTypes['Locations'], createOutboundShipment: ResolversParentTypes['OutboundShipments'], createOutboundShipmentItem: ResolversParentTypes['OutboundShipmentItems'], createPackage: ResolversParentTypes['Packages'], createPackageItem: ResolversParentTypes['PackageItems'], createPickBatch: ResolversParentTypes['PickBatches'], createPickBatchItem: ResolversParentTypes['PickBatchItems'], createPutawayRule: ResolversParentTypes['PutawayRules'], createReorderPoint: ResolversParentTypes['ReorderPoints'], createReturn: ResolversParentTypes['Returns'], createReturnItem: ResolversParentTypes['ReturnItems'], createSalesOrder: ResolversParentTypes['SalesOrders'], createSalesOrderItem: ResolversParentTypes['SalesOrderItems'], createStockTransfer: ResolversParentTypes['StockTransfers'], createSupplier: ResolversParentTypes['Suppliers'], createTask: ResolversParentTypes['Tasks'], createTaskItem: ResolversParentTypes['TaskItems'], createWarehouse: ResolversParentTypes['Warehouses'], createWmsProduct: ResolversParentTypes['WmsProducts'], updateBinThreshold: ResolversParentTypes['BinThresholds'], updateInboundShipment: ResolversParentTypes['InboundShipments'], updateInboundShipmentItem: ResolversParentTypes['InboundShipmentItems'], updateInventoryAdjustment: ResolversParentTypes['InventoryAdjustments'], updateInventoryBatch: ResolversParentTypes['InventoryBatches'], updateInventoryStock: ResolversParentTypes['InventoryStock'], updateLocation: ResolversParentTypes['Locations'], updateOutboundShipment: ResolversParentTypes['OutboundShipments'], updateOutboundShipmentItem: ResolversParentTypes['OutboundShipmentItems'], updatePackage: ResolversParentTypes['Packages'], updatePackageItem: ResolversParentTypes['PackageItems'], updatePickBatch: ResolversParentTypes['PickBatches'], updatePickBatchItem: ResolversParentTypes['PickBatchItems'], updatePutawayRule: ResolversParentTypes['PutawayRules'], updateReorderPoint: ResolversParentTypes['ReorderPoints'], updateReturn: ResolversParentTypes['Returns'], updateReturnItem: ResolversParentTypes['ReturnItems'], updateSalesOrder: ResolversParentTypes['SalesOrders'], updateSalesOrderItem: ResolversParentTypes['SalesOrderItems'], updateStockTransfer: ResolversParentTypes['StockTransfers'], updateSupplier: ResolversParentTypes['Suppliers'], updateTask: ResolversParentTypes['Tasks'], updateTaskItem: ResolversParentTypes['TaskItems'], updateWarehouse: ResolversParentTypes['Warehouses'], updateWmsProduct: ResolversParentTypes['WmsProducts'] };
  WmsProducts: Omit<WmsProducts, 'adjustments' | 'batches' | 'binThresholds' | 'client' | 'inboundShipmentItems' | 'inventoryStock' | 'outboundShipmentItems' | 'packageItems' | 'putawayRules' | 'reorderPoints' | 'returnItems' | 'salesOrderItems' | 'stockTransfers' | 'supplier' | 'taskItems'> & { adjustments?: Maybe<Array<ResolversParentTypes['InventoryAdjustments']>>, batches?: Maybe<Array<ResolversParentTypes['InventoryBatches']>>, binThresholds?: Maybe<Array<ResolversParentTypes['BinThresholds']>>, client?: Maybe<ResolversParentTypes['Companies']>, inboundShipmentItems?: Maybe<Array<ResolversParentTypes['InboundShipmentItems']>>, inventoryStock?: Maybe<Array<ResolversParentTypes['InventoryStock']>>, outboundShipmentItems?: Maybe<Array<ResolversParentTypes['OutboundShipmentItems']>>, packageItems?: Maybe<Array<ResolversParentTypes['PackageItems']>>, putawayRules?: Maybe<Array<ResolversParentTypes['PutawayRules']>>, reorderPoints?: Maybe<Array<ResolversParentTypes['ReorderPoints']>>, returnItems?: Maybe<Array<ResolversParentTypes['ReturnItems']>>, salesOrderItems?: Maybe<Array<ResolversParentTypes['SalesOrderItems']>>, stockTransfers?: Maybe<Array<ResolversParentTypes['StockTransfers']>>, supplier?: Maybe<ResolversParentTypes['Suppliers']>, taskItems?: Maybe<Array<ResolversParentTypes['TaskItems']>> };
  WmsQuery: Omit<WmsQuery, 'binThreshold' | 'binThresholds' | 'inboundShipment' | 'inboundShipmentItem' | 'inboundShipmentItems' | 'inboundShipments' | 'inventoryAdjustment' | 'inventoryAdjustments' | 'inventoryBatch' | 'inventoryBatches' | 'inventoryStock' | 'inventoryStocks' | 'location' | 'locations' | 'outboundShipment' | 'outboundShipmentItem' | 'outboundShipmentItems' | 'outboundShipments' | 'package' | 'packageItem' | 'packageItems' | 'packages' | 'pickBatch' | 'pickBatchItem' | 'pickBatchItems' | 'pickBatches' | 'putawayRule' | 'putawayRules' | 'reorderPoint' | 'reorderPoints' | 'return' | 'returnItem' | 'returnItems' | 'returns' | 'salesOrder' | 'salesOrderItem' | 'salesOrderItems' | 'salesOrders' | 'stockTransfer' | 'stockTransfers' | 'supplier' | 'suppliers' | 'task' | 'taskItem' | 'taskItems' | 'tasks' | 'warehouse' | 'warehouses' | 'wmsProduct' | 'wmsProducts'> & { binThreshold: ResolversParentTypes['BinThresholds'], binThresholds: Array<ResolversParentTypes['BinThresholds']>, inboundShipment: ResolversParentTypes['InboundShipments'], inboundShipmentItem: ResolversParentTypes['InboundShipmentItems'], inboundShipmentItems: Array<ResolversParentTypes['InboundShipmentItems']>, inboundShipments: Array<ResolversParentTypes['InboundShipments']>, inventoryAdjustment: ResolversParentTypes['InventoryAdjustments'], inventoryAdjustments: Array<ResolversParentTypes['InventoryAdjustments']>, inventoryBatch: ResolversParentTypes['InventoryBatches'], inventoryBatches: Array<ResolversParentTypes['InventoryBatches']>, inventoryStock: ResolversParentTypes['InventoryStock'], inventoryStocks: Array<ResolversParentTypes['InventoryStock']>, location: ResolversParentTypes['Locations'], locations: Array<ResolversParentTypes['Locations']>, outboundShipment: ResolversParentTypes['OutboundShipments'], outboundShipmentItem: ResolversParentTypes['OutboundShipmentItems'], outboundShipmentItems: Array<ResolversParentTypes['OutboundShipmentItems']>, outboundShipments: Array<ResolversParentTypes['OutboundShipments']>, package: ResolversParentTypes['Packages'], packageItem: ResolversParentTypes['PackageItems'], packageItems: Array<ResolversParentTypes['PackageItems']>, packages: Array<ResolversParentTypes['Packages']>, pickBatch: ResolversParentTypes['PickBatches'], pickBatchItem: ResolversParentTypes['PickBatchItems'], pickBatchItems: Array<ResolversParentTypes['PickBatchItems']>, pickBatches: Array<ResolversParentTypes['PickBatches']>, putawayRule: ResolversParentTypes['PutawayRules'], putawayRules: Array<ResolversParentTypes['PutawayRules']>, reorderPoint: ResolversParentTypes['ReorderPoints'], reorderPoints: Array<ResolversParentTypes['ReorderPoints']>, return: ResolversParentTypes['Returns'], returnItem: ResolversParentTypes['ReturnItems'], returnItems: Array<ResolversParentTypes['ReturnItems']>, returns: Array<ResolversParentTypes['Returns']>, salesOrder: ResolversParentTypes['SalesOrders'], salesOrderItem: ResolversParentTypes['SalesOrderItems'], salesOrderItems: Array<ResolversParentTypes['SalesOrderItems']>, salesOrders: Array<ResolversParentTypes['SalesOrders']>, stockTransfer: ResolversParentTypes['StockTransfers'], stockTransfers: Array<ResolversParentTypes['StockTransfers']>, supplier: ResolversParentTypes['Suppliers'], suppliers: Array<ResolversParentTypes['Suppliers']>, task: ResolversParentTypes['Tasks'], taskItem: ResolversParentTypes['TaskItems'], taskItems: Array<ResolversParentTypes['TaskItems']>, tasks: Array<ResolversParentTypes['Tasks']>, warehouse: ResolversParentTypes['Warehouses'], warehouses: Array<ResolversParentTypes['Warehouses']>, wmsProduct: ResolversParentTypes['WmsProducts'], wmsProducts: Array<ResolversParentTypes['WmsProducts']> };
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

export type BinThresholdsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['BinThresholds'] = ResolversParentTypes['BinThresholds']> = {
  alertThreshold?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Locations'], ParentType, ContextType>;
  maxQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  reorderQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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
  inboundShipments?: Resolver<Maybe<Array<ResolversTypes['InboundShipments']>>, ParentType, ContextType>;
  industry?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  putawayRules?: Resolver<Maybe<Array<ResolversTypes['PutawayRules']>>, ParentType, ContextType>;
  returns?: Resolver<Maybe<Array<ResolversTypes['Returns']>>, ParentType, ContextType>;
  salesOrders?: Resolver<Maybe<Array<ResolversTypes['SalesOrders']>>, ParentType, ContextType>;
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

export type InboundShipmentItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InboundShipmentItems'] = ResolversParentTypes['InboundShipmentItems']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discrepancyNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discrepancyQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  expectedQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inboundShipment?: Resolver<ResolversTypes['InboundShipments'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  receivedQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type InboundShipmentStatusResolvers = EnumResolverSignature<{ ARRIVED?: any, CANCELLED?: any, COMPLETED?: any, PENDING?: any, PROCESSING?: any }, ResolversTypes['InboundShipmentStatus']>;

export type InboundShipmentsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InboundShipments'] = ResolversParentTypes['InboundShipments']> = {
  actualArrivalDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  client?: Resolver<Maybe<ResolversTypes['Companies']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expectedArrivalDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['InboundShipmentItems']>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['InboundShipmentStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouseId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
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

export type InventoryAdjustmentReasonResolvers = EnumResolverSignature<{ CYCLE_COUNT?: any, DAMAGED_GOODS?: any, EXPIRED?: any, MANUAL_CORRECTION?: any, RETURN_TO_VENDOR?: any, THEFT?: any }, ResolversTypes['InventoryAdjustmentReason']>;

export type InventoryAdjustmentsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InventoryAdjustments'] = ResolversParentTypes['InventoryAdjustments']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantityChange?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['InventoryAdjustmentReason']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  warehouseId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type InventoryBatchesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InventoryBatches'] = ResolversParentTypes['InventoryBatches']> = {
  batchNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expirationDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inventoryStock?: Resolver<Maybe<Array<ResolversTypes['InventoryStock']>>, ParentType, ContextType>;
  outboundShipmentItems?: Resolver<Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, ParentType, ContextType>;
  packageItems?: Resolver<Maybe<Array<ResolversTypes['PackageItems']>>, ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  taskItems?: Resolver<Maybe<Array<ResolversTypes['TaskItems']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type InventoryStockResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['InventoryStock'] = ResolversParentTypes['InventoryStock']> = {
  availableQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  batch?: Resolver<Maybe<ResolversTypes['InventoryBatches']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastCountedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastMovementAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Locations'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reservedQuantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['InventoryStockStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type InventoryStockStatusResolvers = EnumResolverSignature<{ ALLOCATED?: any, AVAILABLE?: any, DAMAGED?: any, EXPIRED?: any, HOLD?: any, QUARANTINE?: any, SHIPPED?: any }, ResolversTypes['InventoryStockStatus']>;

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

export type LocationTypeResolvers = EnumResolverSignature<{ BULK_STORAGE?: any, CROSS_DOCK_AREA?: any, DAMAGED_GOODS?: any, PACKING_STATION?: any, PICK_BIN?: any, QUALITY_CONTROL?: any, RECEIVING_DOCK?: any, RESERVE_STORAGE?: any, RETURNS_AREA?: any, STAGING_AREA?: any }, ResolversTypes['LocationType']>;

export type LocationsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Locations'] = ResolversParentTypes['Locations']> = {
  barcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  binThresholds?: Resolver<Maybe<Array<ResolversTypes['BinThresholds']>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destinationTaskItems?: Resolver<Maybe<Array<ResolversTypes['TaskItems']>>, ParentType, ContextType>;
  hazmatApproved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inventoryStock?: Resolver<Maybe<Array<ResolversTypes['InventoryStock']>>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPickable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isReceivable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxPallets?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxVolume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxWeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentLocation?: Resolver<Maybe<ResolversTypes['Locations']>, ParentType, ContextType>;
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  putawayRules?: Resolver<Maybe<Array<ResolversTypes['PutawayRules']>>, ParentType, ContextType>;
  sourceTaskItems?: Resolver<Maybe<Array<ResolversTypes['TaskItems']>>, ParentType, ContextType>;
  temperatureControlled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['LocationType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType>;
  xCoordinate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  yCoordinate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  zCoordinate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  crm?: Resolver<Maybe<ResolversTypes['CrmMutation']>, ParentType, ContextType>;
  tms?: Resolver<Maybe<ResolversTypes['TmsMutation']>, ParentType, ContextType>;
  wms?: Resolver<Maybe<ResolversTypes['WmsMutation']>, ParentType, ContextType>;
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
  salesOrders?: Resolver<Maybe<Array<ResolversTypes['SalesOrders']>>, ParentType, ContextType>;
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

export type OutboundShipmentItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['OutboundShipmentItems'] = ResolversParentTypes['OutboundShipmentItems']> = {
  batch?: Resolver<Maybe<ResolversTypes['InventoryBatches']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  outboundShipment?: Resolver<ResolversTypes['OutboundShipments'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantityShipped?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  salesOrderItem?: Resolver<ResolversTypes['SalesOrderItems'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type OutboundShipmentStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, DELIVERED?: any, PACKED?: any, PICKING?: any, SHIPPED?: any }, ResolversTypes['OutboundShipmentStatus']>;

export type OutboundShipmentsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['OutboundShipments'] = ResolversParentTypes['OutboundShipments']> = {
  carrier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, ParentType, ContextType>;
  salesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['OutboundShipmentStatus']>, ParentType, ContextType>;
  trackingNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouseId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PackageItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PackageItems'] = ResolversParentTypes['PackageItems']> = {
  batch?: Resolver<Maybe<ResolversTypes['InventoryBatches']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expiryDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lotNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  package?: Resolver<ResolversTypes['Packages'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  serialNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  totalWeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  unitWeight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PackagesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Packages'] = ResolversParentTypes['Packages']> = {
  carrier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  insuranceValue?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  isFragile?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isHazmat?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['PackageItems']>>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  packageNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  packageType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  packedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  packedByUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  requiresSignature?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  salesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType>;
  serviceLevel?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trackingNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

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

export type PickBatchItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PickBatchItems'] = ResolversParentTypes['PickBatchItems']> = {
  actualPickTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedPickTime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  orderPriority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pickBatch?: Resolver<ResolversTypes['PickBatches'], ParentType, ContextType>;
  salesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PickBatchStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, COMPLETED?: any, IN_PROGRESS?: any, OPEN?: any }, ResolversTypes['PickBatchStatus']>;

export type PickBatchesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PickBatches'] = ResolversParentTypes['PickBatches']> = {
  actualDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  assignedUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  batchNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completedItems?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['PickBatchItems']>>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  startedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['PickBatchStatus']>, ParentType, ContextType>;
  strategy?: Resolver<ResolversTypes['PickStrategy'], ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<ResolversTypes['Tasks']>>, ParentType, ContextType>;
  totalItems?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType>;
  waveId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zoneRestrictions?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
};

export type PickStrategyResolvers = EnumResolverSignature<{ BATCH_PICKING?: any, CLUSTER_PICKING?: any, SINGLE_ORDER_PICKING?: any, WAVE_PICKING?: any, ZONE_PICKING?: any }, ResolversTypes['PickStrategy']>;

export type ProductStatusResolvers = EnumResolverSignature<{ ACTIVE?: any, DISCONTINUED?: any, INACTIVE?: any, OBSOLETE?: any }, ResolversTypes['ProductStatus']>;

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

export type PutawayRulesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PutawayRules'] = ResolversParentTypes['PutawayRules']> = {
  client?: Resolver<Maybe<ResolversTypes['Companies']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  locationType?: Resolver<Maybe<ResolversTypes['LocationType']>, ParentType, ContextType>;
  maxQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minQuantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  preferredLocation?: Resolver<Maybe<ResolversTypes['Locations']>, ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  requiresHazmatApproval?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  requiresTemperatureControl?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volumeThreshold?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType>;
  weightThreshold?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  crm?: Resolver<Maybe<ResolversTypes['CrmQuery']>, ParentType, ContextType>;
  tms?: Resolver<Maybe<ResolversTypes['TmsQuery']>, ParentType, ContextType>;
  wms?: Resolver<Maybe<ResolversTypes['WmsQuery']>, ParentType, ContextType>;
};

export type RecordTypeResolvers = EnumResolverSignature<{ CAMPAIGNS?: any, CASES?: any, COMPANIES?: any, CONTACTS?: any, INTERACTIONS?: any, INVOICES?: any, LEADS?: any, OPPORTUNITIES?: any, PRODUCTS?: any }, ResolversTypes['RecordType']>;

export type ReorderPointsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ReorderPoints'] = ResolversParentTypes['ReorderPoints']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  threshold?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  warehouseId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type ReturnItemConditionResolvers = EnumResolverSignature<{ DAMAGED?: any, DEFECTIVE?: any, EXPIRED?: any, SELLABLE?: any, UNSELLABLE?: any }, ResolversTypes['ReturnItemCondition']>;

export type ReturnItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ReturnItems'] = ResolversParentTypes['ReturnItems']> = {
  condition?: Resolver<Maybe<ResolversTypes['ReturnItemCondition']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantityExpected?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantityReceived?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  quantityVariance?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  return?: Resolver<ResolversTypes['Returns'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ReturnStatusResolvers = EnumResolverSignature<{ APPROVED?: any, PROCESSED?: any, RECEIVED?: any, REJECTED?: any, REQUESTED?: any }, ResolversTypes['ReturnStatus']>;

export type ReturnsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Returns'] = ResolversParentTypes['Returns']> = {
  client?: Resolver<ResolversTypes['Companies'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['ReturnItems']>>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  returnNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  salesOrder?: Resolver<Maybe<ResolversTypes['SalesOrders']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ReturnStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type RoutesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Routes'] = ResolversParentTypes['Routes']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  optimizedRouteData?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalDistance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  totalDuration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  trip?: Resolver<ResolversTypes['Trips'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SalesOrderItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SalesOrderItems'] = ResolversParentTypes['SalesOrderItems']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  outboundShipmentItems?: Resolver<Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantityOrdered?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  salesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SalesOrderStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, COMPLETED?: any, PENDING?: any, PROCESSING?: any, SHIPPED?: any }, ResolversTypes['SalesOrderStatus']>;

export type SalesOrdersResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SalesOrders'] = ResolversParentTypes['SalesOrders']> = {
  client?: Resolver<ResolversTypes['Companies'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  crmOpportunity?: Resolver<Maybe<ResolversTypes['Opportunities']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['SalesOrderItems']>>, ParentType, ContextType>;
  orderNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  outboundShipments?: Resolver<Maybe<Array<ResolversTypes['OutboundShipments']>>, ParentType, ContextType>;
  packages?: Resolver<Maybe<Array<ResolversTypes['Packages']>>, ParentType, ContextType>;
  pickBatchItems?: Resolver<Maybe<Array<ResolversTypes['PickBatchItems']>>, ParentType, ContextType>;
  returns?: Resolver<Maybe<Array<ResolversTypes['Returns']>>, ParentType, ContextType>;
  shippingAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['SalesOrderStatus']>, ParentType, ContextType>;
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
  shipment?: Resolver<Maybe<ResolversTypes['OutboundShipments']>, ParentType, ContextType>;
  startLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ShipmentLegStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type StockTransferStatusResolvers = EnumResolverSignature<{ CANCELLED?: any, IN_TRANSIT?: any, PENDING?: any, RECEIVED?: any }, ResolversTypes['StockTransferStatus']>;

export type StockTransfersResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['StockTransfers'] = ResolversParentTypes['StockTransfers']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destinationWarehouseId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sourceWarehouseId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['StockTransferStatus']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SuppliersResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Suppliers'] = ResolversParentTypes['Suppliers']> = {
  contactPerson?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['WmsProducts']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type TaskItemStatusResolvers = EnumResolverSignature<{ COMPLETED?: any, DAMAGED?: any, IN_PROGRESS?: any, NOT_FOUND?: any, PENDING?: any, SHORT_PICKED?: any }, ResolversTypes['TaskItemStatus']>;

export type TaskItemsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TaskItems'] = ResolversParentTypes['TaskItems']> = {
  batch?: Resolver<Maybe<ResolversTypes['InventoryBatches']>, ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destinationLocation?: Resolver<Maybe<ResolversTypes['Locations']>, ParentType, ContextType>;
  expiryDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lotNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  product?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType>;
  quantityCompleted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  quantityRemaining?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  quantityRequired?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  serialNumbers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  sourceLocation?: Resolver<Maybe<ResolversTypes['Locations']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TaskItemStatus']>, ParentType, ContextType>;
  task?: Resolver<ResolversTypes['Tasks'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type TaskStatusResolvers = EnumResolverSignature<{ ASSIGNED?: any, CANCELLED?: any, COMPLETED?: any, ERROR?: any, IN_PROGRESS?: any, PENDING?: any }, ResolversTypes['TaskStatus']>;

export type TaskTypeResolvers = EnumResolverSignature<{ CROSS_DOCK?: any, CYCLE_COUNT?: any, DAMAGE_INSPECTION?: any, PACK?: any, PICK?: any, PUTAWAY?: any, QUALITY_CHECK?: any, REPLENISHMENT?: any, RETURNS_PROCESSING?: any }, ResolversTypes['TaskType']>;

export type TasksResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Tasks'] = ResolversParentTypes['Tasks']> = {
  actualDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  durationSeconds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedDuration?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  instructions?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['TaskItems']>>, ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pickBatch?: Resolver<Maybe<ResolversTypes['PickBatches']>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sourceEntityId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  sourceEntityType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['TaskStatus']>, ParentType, ContextType>;
  taskNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['TaskType'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  warehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType>;
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
  shipment?: Resolver<Maybe<ResolversTypes['OutboundShipments']>, ParentType, ContextType>;
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

export type WarehousesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Warehouses'] = ResolversParentTypes['Warehouses']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactPerson?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destinationStockTransfers?: Resolver<Maybe<Array<ResolversTypes['StockTransfers']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inboundShipments?: Resolver<Maybe<Array<ResolversTypes['InboundShipments']>>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  locations?: Resolver<Maybe<Array<ResolversTypes['Locations']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  outboundShipments?: Resolver<Maybe<Array<ResolversTypes['OutboundShipments']>>, ParentType, ContextType>;
  packages?: Resolver<Maybe<Array<ResolversTypes['Packages']>>, ParentType, ContextType>;
  pickBatches?: Resolver<Maybe<Array<ResolversTypes['PickBatches']>>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  putawayRules?: Resolver<Maybe<Array<ResolversTypes['PutawayRules']>>, ParentType, ContextType>;
  sourceStockTransfers?: Resolver<Maybe<Array<ResolversTypes['StockTransfers']>>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<ResolversTypes['Tasks']>>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type WmsMutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['WmsMutation'] = ResolversParentTypes['WmsMutation']> = {
  createBinThreshold?: Resolver<ResolversTypes['BinThresholds'], ParentType, ContextType, RequireFields<WmsMutationcreateBinThresholdArgs, 'value'>>;
  createInboundShipment?: Resolver<ResolversTypes['InboundShipments'], ParentType, ContextType, RequireFields<WmsMutationcreateInboundShipmentArgs, 'value'>>;
  createInboundShipmentItem?: Resolver<ResolversTypes['InboundShipmentItems'], ParentType, ContextType, RequireFields<WmsMutationcreateInboundShipmentItemArgs, 'value'>>;
  createInventoryAdjustment?: Resolver<ResolversTypes['InventoryAdjustments'], ParentType, ContextType, RequireFields<WmsMutationcreateInventoryAdjustmentArgs, 'value'>>;
  createInventoryBatch?: Resolver<ResolversTypes['InventoryBatches'], ParentType, ContextType, RequireFields<WmsMutationcreateInventoryBatchArgs, 'value'>>;
  createInventoryStock?: Resolver<ResolversTypes['InventoryStock'], ParentType, ContextType, RequireFields<WmsMutationcreateInventoryStockArgs, 'value'>>;
  createLocation?: Resolver<ResolversTypes['Locations'], ParentType, ContextType, RequireFields<WmsMutationcreateLocationArgs, 'value'>>;
  createOutboundShipment?: Resolver<ResolversTypes['OutboundShipments'], ParentType, ContextType, RequireFields<WmsMutationcreateOutboundShipmentArgs, 'value'>>;
  createOutboundShipmentItem?: Resolver<ResolversTypes['OutboundShipmentItems'], ParentType, ContextType, RequireFields<WmsMutationcreateOutboundShipmentItemArgs, 'value'>>;
  createPackage?: Resolver<ResolversTypes['Packages'], ParentType, ContextType, RequireFields<WmsMutationcreatePackageArgs, 'value'>>;
  createPackageItem?: Resolver<ResolversTypes['PackageItems'], ParentType, ContextType, RequireFields<WmsMutationcreatePackageItemArgs, 'value'>>;
  createPickBatch?: Resolver<ResolversTypes['PickBatches'], ParentType, ContextType, RequireFields<WmsMutationcreatePickBatchArgs, 'value'>>;
  createPickBatchItem?: Resolver<ResolversTypes['PickBatchItems'], ParentType, ContextType, RequireFields<WmsMutationcreatePickBatchItemArgs, 'value'>>;
  createPutawayRule?: Resolver<ResolversTypes['PutawayRules'], ParentType, ContextType, RequireFields<WmsMutationcreatePutawayRuleArgs, 'value'>>;
  createReorderPoint?: Resolver<ResolversTypes['ReorderPoints'], ParentType, ContextType, RequireFields<WmsMutationcreateReorderPointArgs, 'value'>>;
  createReturn?: Resolver<ResolversTypes['Returns'], ParentType, ContextType, RequireFields<WmsMutationcreateReturnArgs, 'value'>>;
  createReturnItem?: Resolver<ResolversTypes['ReturnItems'], ParentType, ContextType, RequireFields<WmsMutationcreateReturnItemArgs, 'value'>>;
  createSalesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType, RequireFields<WmsMutationcreateSalesOrderArgs, 'value'>>;
  createSalesOrderItem?: Resolver<ResolversTypes['SalesOrderItems'], ParentType, ContextType, RequireFields<WmsMutationcreateSalesOrderItemArgs, 'value'>>;
  createStockTransfer?: Resolver<ResolversTypes['StockTransfers'], ParentType, ContextType, RequireFields<WmsMutationcreateStockTransferArgs, 'value'>>;
  createSupplier?: Resolver<ResolversTypes['Suppliers'], ParentType, ContextType, RequireFields<WmsMutationcreateSupplierArgs, 'value'>>;
  createTask?: Resolver<ResolversTypes['Tasks'], ParentType, ContextType, RequireFields<WmsMutationcreateTaskArgs, 'value'>>;
  createTaskItem?: Resolver<ResolversTypes['TaskItems'], ParentType, ContextType, RequireFields<WmsMutationcreateTaskItemArgs, 'value'>>;
  createWarehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType, RequireFields<WmsMutationcreateWarehouseArgs, 'value'>>;
  createWmsProduct?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType, RequireFields<WmsMutationcreateWmsProductArgs, 'value'>>;
  removeBinThreshold?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveBinThresholdArgs, 'id'>>;
  removeInboundShipment?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveInboundShipmentArgs, 'id'>>;
  removeInboundShipmentItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveInboundShipmentItemArgs, 'id'>>;
  removeInventoryAdjustment?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveInventoryAdjustmentArgs, 'id'>>;
  removeInventoryBatch?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveInventoryBatchArgs, 'id'>>;
  removeInventoryStock?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveInventoryStockArgs, 'id'>>;
  removeLocation?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveLocationArgs, 'id'>>;
  removeOutboundShipment?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveOutboundShipmentArgs, 'id'>>;
  removeOutboundShipmentItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveOutboundShipmentItemArgs, 'id'>>;
  removePackage?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremovePackageArgs, 'id'>>;
  removePackageItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremovePackageItemArgs, 'id'>>;
  removePickBatch?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremovePickBatchArgs, 'id'>>;
  removePickBatchItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremovePickBatchItemArgs, 'id'>>;
  removePutawayRule?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremovePutawayRuleArgs, 'id'>>;
  removeReorderPoint?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveReorderPointArgs, 'id'>>;
  removeReturn?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveReturnArgs, 'id'>>;
  removeReturnItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveReturnItemArgs, 'id'>>;
  removeSalesOrder?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveSalesOrderArgs, 'id'>>;
  removeSalesOrderItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveSalesOrderItemArgs, 'id'>>;
  removeStockTransfer?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveStockTransferArgs, 'id'>>;
  removeSupplier?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveSupplierArgs, 'id'>>;
  removeTask?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveTaskArgs, 'id'>>;
  removeTaskItem?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveTaskItemArgs, 'id'>>;
  removeWarehouse?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveWarehouseArgs, 'id'>>;
  removeWmsProduct?: Resolver<ResolversTypes['DeleteResult'], ParentType, ContextType, RequireFields<WmsMutationremoveWmsProductArgs, 'id'>>;
  updateBinThreshold?: Resolver<ResolversTypes['BinThresholds'], ParentType, ContextType, RequireFields<WmsMutationupdateBinThresholdArgs, 'id'>>;
  updateInboundShipment?: Resolver<ResolversTypes['InboundShipments'], ParentType, ContextType, RequireFields<WmsMutationupdateInboundShipmentArgs, 'id'>>;
  updateInboundShipmentItem?: Resolver<ResolversTypes['InboundShipmentItems'], ParentType, ContextType, RequireFields<WmsMutationupdateInboundShipmentItemArgs, 'id'>>;
  updateInventoryAdjustment?: Resolver<ResolversTypes['InventoryAdjustments'], ParentType, ContextType, RequireFields<WmsMutationupdateInventoryAdjustmentArgs, 'id'>>;
  updateInventoryBatch?: Resolver<ResolversTypes['InventoryBatches'], ParentType, ContextType, RequireFields<WmsMutationupdateInventoryBatchArgs, 'id'>>;
  updateInventoryStock?: Resolver<ResolversTypes['InventoryStock'], ParentType, ContextType, RequireFields<WmsMutationupdateInventoryStockArgs, 'id'>>;
  updateLocation?: Resolver<ResolversTypes['Locations'], ParentType, ContextType, RequireFields<WmsMutationupdateLocationArgs, 'id'>>;
  updateOutboundShipment?: Resolver<ResolversTypes['OutboundShipments'], ParentType, ContextType, RequireFields<WmsMutationupdateOutboundShipmentArgs, 'id'>>;
  updateOutboundShipmentItem?: Resolver<ResolversTypes['OutboundShipmentItems'], ParentType, ContextType, RequireFields<WmsMutationupdateOutboundShipmentItemArgs, 'id'>>;
  updatePackage?: Resolver<ResolversTypes['Packages'], ParentType, ContextType, RequireFields<WmsMutationupdatePackageArgs, 'id'>>;
  updatePackageItem?: Resolver<ResolversTypes['PackageItems'], ParentType, ContextType, RequireFields<WmsMutationupdatePackageItemArgs, 'id'>>;
  updatePickBatch?: Resolver<ResolversTypes['PickBatches'], ParentType, ContextType, RequireFields<WmsMutationupdatePickBatchArgs, 'id'>>;
  updatePickBatchItem?: Resolver<ResolversTypes['PickBatchItems'], ParentType, ContextType, RequireFields<WmsMutationupdatePickBatchItemArgs, 'id'>>;
  updatePutawayRule?: Resolver<ResolversTypes['PutawayRules'], ParentType, ContextType, RequireFields<WmsMutationupdatePutawayRuleArgs, 'id'>>;
  updateReorderPoint?: Resolver<ResolversTypes['ReorderPoints'], ParentType, ContextType, RequireFields<WmsMutationupdateReorderPointArgs, 'id'>>;
  updateReturn?: Resolver<ResolversTypes['Returns'], ParentType, ContextType, RequireFields<WmsMutationupdateReturnArgs, 'id'>>;
  updateReturnItem?: Resolver<ResolversTypes['ReturnItems'], ParentType, ContextType, RequireFields<WmsMutationupdateReturnItemArgs, 'id'>>;
  updateSalesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType, RequireFields<WmsMutationupdateSalesOrderArgs, 'id'>>;
  updateSalesOrderItem?: Resolver<ResolversTypes['SalesOrderItems'], ParentType, ContextType, RequireFields<WmsMutationupdateSalesOrderItemArgs, 'id'>>;
  updateStockTransfer?: Resolver<ResolversTypes['StockTransfers'], ParentType, ContextType, RequireFields<WmsMutationupdateStockTransferArgs, 'id'>>;
  updateSupplier?: Resolver<ResolversTypes['Suppliers'], ParentType, ContextType, RequireFields<WmsMutationupdateSupplierArgs, 'id'>>;
  updateTask?: Resolver<ResolversTypes['Tasks'], ParentType, ContextType, RequireFields<WmsMutationupdateTaskArgs, 'id'>>;
  updateTaskItem?: Resolver<ResolversTypes['TaskItems'], ParentType, ContextType, RequireFields<WmsMutationupdateTaskItemArgs, 'id'>>;
  updateWarehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType, RequireFields<WmsMutationupdateWarehouseArgs, 'id'>>;
  updateWmsProduct?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType, RequireFields<WmsMutationupdateWmsProductArgs, 'id'>>;
};

export type WmsProductsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['WmsProducts'] = ResolversParentTypes['WmsProducts']> = {
  adjustments?: Resolver<Maybe<Array<ResolversTypes['InventoryAdjustments']>>, ParentType, ContextType>;
  barcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  batches?: Resolver<Maybe<Array<ResolversTypes['InventoryBatches']>>, ParentType, ContextType>;
  binThresholds?: Resolver<Maybe<Array<ResolversTypes['BinThresholds']>>, ParentType, ContextType>;
  client?: Resolver<Maybe<ResolversTypes['Companies']>, ParentType, ContextType>;
  costPrice?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inboundShipmentItems?: Resolver<Maybe<Array<ResolversTypes['InboundShipmentItems']>>, ParentType, ContextType>;
  inventoryStock?: Resolver<Maybe<Array<ResolversTypes['InventoryStock']>>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  outboundShipmentItems?: Resolver<Maybe<Array<ResolversTypes['OutboundShipmentItems']>>, ParentType, ContextType>;
  packageItems?: Resolver<Maybe<Array<ResolversTypes['PackageItems']>>, ParentType, ContextType>;
  putawayRules?: Resolver<Maybe<Array<ResolversTypes['PutawayRules']>>, ParentType, ContextType>;
  reorderPoints?: Resolver<Maybe<Array<ResolversTypes['ReorderPoints']>>, ParentType, ContextType>;
  returnItems?: Resolver<Maybe<Array<ResolversTypes['ReturnItems']>>, ParentType, ContextType>;
  salesOrderItems?: Resolver<Maybe<Array<ResolversTypes['SalesOrderItems']>>, ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['ProductStatus']>, ParentType, ContextType>;
  stockTransfers?: Resolver<Maybe<Array<ResolversTypes['StockTransfers']>>, ParentType, ContextType>;
  supplier?: Resolver<Maybe<ResolversTypes['Suppliers']>, ParentType, ContextType>;
  taskItems?: Resolver<Maybe<Array<ResolversTypes['TaskItems']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type WmsQueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['WmsQuery'] = ResolversParentTypes['WmsQuery']> = {
  binThreshold?: Resolver<ResolversTypes['BinThresholds'], ParentType, ContextType, RequireFields<WmsQuerybinThresholdArgs, 'id'>>;
  binThresholds?: Resolver<Array<ResolversTypes['BinThresholds']>, ParentType, ContextType, Partial<WmsQuerybinThresholdsArgs>>;
  inboundShipment?: Resolver<ResolversTypes['InboundShipments'], ParentType, ContextType, RequireFields<WmsQueryinboundShipmentArgs, 'id'>>;
  inboundShipmentItem?: Resolver<ResolversTypes['InboundShipmentItems'], ParentType, ContextType, RequireFields<WmsQueryinboundShipmentItemArgs, 'id'>>;
  inboundShipmentItems?: Resolver<Array<ResolversTypes['InboundShipmentItems']>, ParentType, ContextType, Partial<WmsQueryinboundShipmentItemsArgs>>;
  inboundShipments?: Resolver<Array<ResolversTypes['InboundShipments']>, ParentType, ContextType, Partial<WmsQueryinboundShipmentsArgs>>;
  inventoryAdjustment?: Resolver<ResolversTypes['InventoryAdjustments'], ParentType, ContextType, RequireFields<WmsQueryinventoryAdjustmentArgs, 'id'>>;
  inventoryAdjustments?: Resolver<Array<ResolversTypes['InventoryAdjustments']>, ParentType, ContextType, Partial<WmsQueryinventoryAdjustmentsArgs>>;
  inventoryBatch?: Resolver<ResolversTypes['InventoryBatches'], ParentType, ContextType, RequireFields<WmsQueryinventoryBatchArgs, 'id'>>;
  inventoryBatches?: Resolver<Array<ResolversTypes['InventoryBatches']>, ParentType, ContextType, Partial<WmsQueryinventoryBatchesArgs>>;
  inventoryStock?: Resolver<ResolversTypes['InventoryStock'], ParentType, ContextType, RequireFields<WmsQueryinventoryStockArgs, 'id'>>;
  inventoryStocks?: Resolver<Array<ResolversTypes['InventoryStock']>, ParentType, ContextType, Partial<WmsQueryinventoryStocksArgs>>;
  location?: Resolver<ResolversTypes['Locations'], ParentType, ContextType, RequireFields<WmsQuerylocationArgs, 'id'>>;
  locations?: Resolver<Array<ResolversTypes['Locations']>, ParentType, ContextType, Partial<WmsQuerylocationsArgs>>;
  outboundShipment?: Resolver<ResolversTypes['OutboundShipments'], ParentType, ContextType, RequireFields<WmsQueryoutboundShipmentArgs, 'id'>>;
  outboundShipmentItem?: Resolver<ResolversTypes['OutboundShipmentItems'], ParentType, ContextType, RequireFields<WmsQueryoutboundShipmentItemArgs, 'id'>>;
  outboundShipmentItems?: Resolver<Array<ResolversTypes['OutboundShipmentItems']>, ParentType, ContextType, Partial<WmsQueryoutboundShipmentItemsArgs>>;
  outboundShipments?: Resolver<Array<ResolversTypes['OutboundShipments']>, ParentType, ContextType, Partial<WmsQueryoutboundShipmentsArgs>>;
  package?: Resolver<ResolversTypes['Packages'], ParentType, ContextType, RequireFields<WmsQuerypackageArgs, 'id'>>;
  packageItem?: Resolver<ResolversTypes['PackageItems'], ParentType, ContextType, RequireFields<WmsQuerypackageItemArgs, 'id'>>;
  packageItems?: Resolver<Array<ResolversTypes['PackageItems']>, ParentType, ContextType, Partial<WmsQuerypackageItemsArgs>>;
  packages?: Resolver<Array<ResolversTypes['Packages']>, ParentType, ContextType, Partial<WmsQuerypackagesArgs>>;
  pickBatch?: Resolver<ResolversTypes['PickBatches'], ParentType, ContextType, RequireFields<WmsQuerypickBatchArgs, 'id'>>;
  pickBatchItem?: Resolver<ResolversTypes['PickBatchItems'], ParentType, ContextType, RequireFields<WmsQuerypickBatchItemArgs, 'id'>>;
  pickBatchItems?: Resolver<Array<ResolversTypes['PickBatchItems']>, ParentType, ContextType, Partial<WmsQuerypickBatchItemsArgs>>;
  pickBatches?: Resolver<Array<ResolversTypes['PickBatches']>, ParentType, ContextType, Partial<WmsQuerypickBatchesArgs>>;
  putawayRule?: Resolver<ResolversTypes['PutawayRules'], ParentType, ContextType, RequireFields<WmsQueryputawayRuleArgs, 'id'>>;
  putawayRules?: Resolver<Array<ResolversTypes['PutawayRules']>, ParentType, ContextType, Partial<WmsQueryputawayRulesArgs>>;
  reorderPoint?: Resolver<ResolversTypes['ReorderPoints'], ParentType, ContextType, RequireFields<WmsQueryreorderPointArgs, 'id'>>;
  reorderPoints?: Resolver<Array<ResolversTypes['ReorderPoints']>, ParentType, ContextType, Partial<WmsQueryreorderPointsArgs>>;
  return?: Resolver<ResolversTypes['Returns'], ParentType, ContextType, RequireFields<WmsQueryreturnArgs, 'id'>>;
  returnItem?: Resolver<ResolversTypes['ReturnItems'], ParentType, ContextType, RequireFields<WmsQueryreturnItemArgs, 'id'>>;
  returnItems?: Resolver<Array<ResolversTypes['ReturnItems']>, ParentType, ContextType, Partial<WmsQueryreturnItemsArgs>>;
  returns?: Resolver<Array<ResolversTypes['Returns']>, ParentType, ContextType, Partial<WmsQueryreturnsArgs>>;
  salesOrder?: Resolver<ResolversTypes['SalesOrders'], ParentType, ContextType, RequireFields<WmsQuerysalesOrderArgs, 'id'>>;
  salesOrderItem?: Resolver<ResolversTypes['SalesOrderItems'], ParentType, ContextType, RequireFields<WmsQuerysalesOrderItemArgs, 'id'>>;
  salesOrderItems?: Resolver<Array<ResolversTypes['SalesOrderItems']>, ParentType, ContextType, Partial<WmsQuerysalesOrderItemsArgs>>;
  salesOrders?: Resolver<Array<ResolversTypes['SalesOrders']>, ParentType, ContextType, Partial<WmsQuerysalesOrdersArgs>>;
  stockTransfer?: Resolver<ResolversTypes['StockTransfers'], ParentType, ContextType, RequireFields<WmsQuerystockTransferArgs, 'id'>>;
  stockTransfers?: Resolver<Array<ResolversTypes['StockTransfers']>, ParentType, ContextType, Partial<WmsQuerystockTransfersArgs>>;
  supplier?: Resolver<ResolversTypes['Suppliers'], ParentType, ContextType, RequireFields<WmsQuerysupplierArgs, 'id'>>;
  suppliers?: Resolver<Array<ResolversTypes['Suppliers']>, ParentType, ContextType, Partial<WmsQuerysuppliersArgs>>;
  task?: Resolver<ResolversTypes['Tasks'], ParentType, ContextType, RequireFields<WmsQuerytaskArgs, 'id'>>;
  taskItem?: Resolver<ResolversTypes['TaskItems'], ParentType, ContextType, RequireFields<WmsQuerytaskItemArgs, 'id'>>;
  taskItems?: Resolver<Array<ResolversTypes['TaskItems']>, ParentType, ContextType, Partial<WmsQuerytaskItemsArgs>>;
  tasks?: Resolver<Array<ResolversTypes['Tasks']>, ParentType, ContextType, Partial<WmsQuerytasksArgs>>;
  warehouse?: Resolver<ResolversTypes['Warehouses'], ParentType, ContextType, RequireFields<WmsQuerywarehouseArgs, 'id'>>;
  warehouses?: Resolver<Array<ResolversTypes['Warehouses']>, ParentType, ContextType, Partial<WmsQuerywarehousesArgs>>;
  wmsProduct?: Resolver<ResolversTypes['WmsProducts'], ParentType, ContextType, RequireFields<WmsQuerywmsProductArgs, 'id'>>;
  wmsProducts?: Resolver<Array<ResolversTypes['WmsProducts']>, ParentType, ContextType, Partial<WmsQuerywmsProductsArgs>>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Attachments?: AttachmentsResolvers<ContextType>;
  BinThresholds?: BinThresholdsResolvers<ContextType>;
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
  InboundShipmentItems?: InboundShipmentItemsResolvers<ContextType>;
  InboundShipmentStatus?: InboundShipmentStatusResolvers;
  InboundShipments?: InboundShipmentsResolvers<ContextType>;
  InteractionType?: InteractionTypeResolvers;
  Interactions?: InteractionsResolvers<ContextType>;
  InventoryAdjustmentReason?: InventoryAdjustmentReasonResolvers;
  InventoryAdjustments?: InventoryAdjustmentsResolvers<ContextType>;
  InventoryBatches?: InventoryBatchesResolvers<ContextType>;
  InventoryStock?: InventoryStockResolvers<ContextType>;
  InventoryStockStatus?: InventoryStockStatusResolvers;
  InvoiceItems?: InvoiceItemsResolvers<ContextType>;
  InvoiceStatus?: InvoiceStatusResolvers;
  Invoices?: InvoicesResolvers<ContextType>;
  LeadSource?: LeadSourceResolvers;
  LeadStatus?: LeadStatusResolvers;
  Leads?: LeadsResolvers<ContextType>;
  LocationType?: LocationTypeResolvers;
  Locations?: LocationsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notifications?: NotificationsResolvers<ContextType>;
  Opportunities?: OpportunitiesResolvers<ContextType>;
  OpportunityProducts?: OpportunityProductsResolvers<ContextType>;
  OpportunitySource?: OpportunitySourceResolvers;
  OpportunityStage?: OpportunityStageResolvers;
  OutboundShipmentItems?: OutboundShipmentItemsResolvers<ContextType>;
  OutboundShipmentStatus?: OutboundShipmentStatusResolvers;
  OutboundShipments?: OutboundShipmentsResolvers<ContextType>;
  PackageItems?: PackageItemsResolvers<ContextType>;
  Packages?: PackagesResolvers<ContextType>;
  PartnerInvoiceItems?: PartnerInvoiceItemsResolvers<ContextType>;
  PartnerInvoiceStatus?: PartnerInvoiceStatusResolvers;
  PartnerInvoices?: PartnerInvoicesResolvers<ContextType>;
  PaymentMethod?: PaymentMethodResolvers;
  PickBatchItems?: PickBatchItemsResolvers<ContextType>;
  PickBatchStatus?: PickBatchStatusResolvers;
  PickBatches?: PickBatchesResolvers<ContextType>;
  PickStrategy?: PickStrategyResolvers;
  ProductStatus?: ProductStatusResolvers;
  ProductType?: ProductTypeResolvers;
  Products?: ProductsResolvers<ContextType>;
  ProofOfDeliveries?: ProofOfDeliveriesResolvers<ContextType>;
  ProofType?: ProofTypeResolvers;
  PutawayRules?: PutawayRulesResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RecordType?: RecordTypeResolvers;
  ReorderPoints?: ReorderPointsResolvers<ContextType>;
  ReturnItemCondition?: ReturnItemConditionResolvers;
  ReturnItems?: ReturnItemsResolvers<ContextType>;
  ReturnStatus?: ReturnStatusResolvers;
  Returns?: ReturnsResolvers<ContextType>;
  Routes?: RoutesResolvers<ContextType>;
  SalesOrderItems?: SalesOrderItemsResolvers<ContextType>;
  SalesOrderStatus?: SalesOrderStatusResolvers;
  SalesOrders?: SalesOrdersResolvers<ContextType>;
  ShipmentLegEvents?: ShipmentLegEventsResolvers<ContextType>;
  ShipmentLegStatus?: ShipmentLegStatusResolvers;
  ShipmentLegs?: ShipmentLegsResolvers<ContextType>;
  StockTransferStatus?: StockTransferStatusResolvers;
  StockTransfers?: StockTransfersResolvers<ContextType>;
  Suppliers?: SuppliersResolvers<ContextType>;
  TaskItemStatus?: TaskItemStatusResolvers;
  TaskItems?: TaskItemsResolvers<ContextType>;
  TaskStatus?: TaskStatusResolvers;
  TaskType?: TaskTypeResolvers;
  Tasks?: TasksResolvers<ContextType>;
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
  Warehouses?: WarehousesResolvers<ContextType>;
  WmsMutation?: WmsMutationResolvers<ContextType>;
  WmsProducts?: WmsProductsResolvers<ContextType>;
  WmsQuery?: WmsQueryResolvers<ContextType>;
};

