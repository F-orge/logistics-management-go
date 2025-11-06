/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	BillingManagementAccountTransactions = "billing_management_account_transactions",
	BillingManagementClientAccounts = "billing_management_client_accounts",
	BillingManagementCreditNotes = "billing_management_credit_notes",
	BillingManagementDisputes = "billing_management_disputes",
	BillingManagementInvoiceLineItems = "billing_management_invoice_line_items",
	BillingManagementInvoices = "billing_management_invoices",
	BillingManagementLogs = "billing_management_logs",
	BillingManagementPayments = "billing_management_payments",
	BillingManagementQuotes = "billing_management_quotes",
	BillingManagementRateCards = "billing_management_rate_cards",
	BillingManagementRateRules = "billing_management_rate_rules",
	BillingManagementSurcharges = "billing_management_surcharges",
	CustomerRelationsCampaigns = "customer_relations_campaigns",
	CustomerRelationsCases = "customer_relations_cases",
	CustomerRelationsCompanies = "customer_relations_companies",
	CustomerRelationsContacts = "customer_relations_contacts",
	CustomerRelationsInteractions = "customer_relations_interactions",
	CustomerRelationsInvoiceItems = "customer_relations_invoice_items",
	CustomerRelationsInvoices = "customer_relations_invoices",
	CustomerRelationsLeads = "customer_relations_leads",
	CustomerRelationsOpportunities = "customer_relations_opportunities",
	CustomerRelationsOpportunityProducts = "customer_relations_opportunity_products",
	CustomerRelationsProducts = "customer_relations_products",
	DeliveryManagementDriverLocation = "delivery_management_driver_location",
	DeliveryManagementProofOfDeliveries = "delivery_management_proof_of_deliveries",
	DeliveryManagementRoutes = "delivery_management_routes",
	DeliveryManagementTaskEvents = "delivery_management_task_events",
	DeliveryManagementTasks = "delivery_management_tasks",
	Notifications = "notifications",
	TransportManagementCarrierRates = "transport_management_carrier_rates",
	TransportManagementCarriers = "transport_management_carriers",
	TransportManagementDriverSchedules = "transport_management_driver_schedules",
	TransportManagementDrivers = "transport_management_drivers",
	TransportManagementExpenses = "transport_management_expenses",
	TransportManagementGeofence = "transport_management_geofence",
	TransportManagementGeofenceEvents = "transport_management_geofence_events",
	TransportManagementGpsPings = "transport_management_gps_pings",
	TransportManagementPartnerInvoice = "transport_management_partner_invoice",
	TransportManagementPartnerInvoiceItems = "transport_management_partner_invoice_items",
	TransportManagementProofOfDeliveries = "transport_management_proof_of_deliveries",
	TransportManagementRoutes = "transport_management_routes",
	TransportManagementShipmentLegEvents = "transport_management_shipment_leg_events",
	TransportManagementShipmentLegs = "transport_management_shipment_legs",
	TransportManagementTripStops = "transport_management_trip_stops",
	TransportManagementTrips = "transport_management_trips",
	TransportManagementVehicleMaintenance = "transport_management_vehicle_maintenance",
	TransportManagementVehicles = "transport_management_vehicles",
	Users = "users",
	WarehouseManagementBinThreshold = "warehouse_management_bin_threshold",
	WarehouseManagementInboundShipmentItems = "warehouse_management_inbound_shipment_items",
	WarehouseManagementInboundShipments = "warehouse_management_inbound_shipments",
	WarehouseManagementInventoryAdjustment = "warehouse_management_inventory_adjustment",
	WarehouseManagementInventoryBatches = "warehouse_management_inventory_batches",
	WarehouseManagementInventoryStock = "warehouse_management_inventory_stock",
	WarehouseManagementLocations = "warehouse_management_locations",
	WarehouseManagementOutboundShipmentItems = "warehouse_management_outbound_shipment_items",
	WarehouseManagementOutboundShipments = "warehouse_management_outbound_shipments",
	WarehouseManagementPackageItems = "warehouse_management_package_items",
	WarehouseManagementPackages = "warehouse_management_packages",
	WarehouseManagementPickBatchItems = "warehouse_management_pick_batch_items",
	WarehouseManagementPickBatches = "warehouse_management_pick_batches",
	WarehouseManagementProducts = "warehouse_management_products",
	WarehouseManagementPutawayRules = "warehouse_management_putaway_rules",
	WarehouseManagementReorderPoints = "warehouse_management_reorder_points",
	WarehouseManagementReturnItems = "warehouse_management_return_items",
	WarehouseManagementReturns = "warehouse_management_returns",
	WarehouseManagementSalesOrderItems = "warehouse_management_sales_order_items",
	WarehouseManagementSalesOrders = "warehouse_management_sales_orders",
	WarehouseManagementStockTransfer = "warehouse_management_stock_transfer",
	WarehouseManagementSuppliers = "warehouse_management_suppliers",
	WarehouseManagementTaskItems = "warehouse_management_task_items",
	WarehouseManagementTasks = "warehouse_management_tasks",
	WarehouseManagementWarehouses = "warehouse_management_warehouses",
}

// Alias types for improved usability
export type IsoDateString = string;
export type IsoAutoDateString = string & { readonly autodate: unique symbol };
export type RecordIdString = string;
export type FileNameString = string & { readonly filename: unique symbol };
export type HTMLString = string;

export type GeoPoint = {
	lon: number;
	lat: number;
};

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T };

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString;
	collectionId: string;
	collectionName: Collections;
} & ExpandType<T>;

export type AuthSystemFields<T = unknown> = {
	email: string;
	emailVisibility: boolean;
	username: string;
	verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string;
	created: IsoAutoDateString;
	fingerprint: string;
	id: string;
	recordRef: string;
	updated: IsoAutoDateString;
};

export type ExternalauthsRecord = {
	collectionRef: string;
	created: IsoAutoDateString;
	id: string;
	provider: string;
	providerId: string;
	recordRef: string;
	updated: IsoAutoDateString;
};

export type MfasRecord = {
	collectionRef: string;
	created: IsoAutoDateString;
	id: string;
	method: string;
	recordRef: string;
	updated: IsoAutoDateString;
};

export type OtpsRecord = {
	collectionRef: string;
	created: IsoAutoDateString;
	id: string;
	password: string;
	recordRef: string;
	sentTo?: string;
	updated: IsoAutoDateString;
};

export type SuperusersRecord = {
	created: IsoAutoDateString;
	email: string;
	emailVisibility?: boolean;
	id: string;
	password: string;
	tokenKey: string;
	updated: IsoAutoDateString;
	verified?: boolean;
};

export enum BillingManagementAccountTransactionsTypeOptions {
	credit = "credit",
	debit = "debit",
	"top-up" = "top-up",
	refund = "refund",
	adjustment = "adjustment",
	fee = "fee",
}
export type BillingManagementAccountTransactionsRecord = {
	amount: number;
	clientAccount: RecordIdString;
	created: IsoAutoDateString;
	id: string;
	processedBy?: RecordIdString;
	referenceNumber?: string;
	runningBalance?: number;
	transactionDate?: IsoDateString;
	type: BillingManagementAccountTransactionsTypeOptions;
	updated: IsoAutoDateString;
};

export type BillingManagementClientAccountsRecord = {
	availableCredit?: number;
	client?: RecordIdString;
	created: IsoAutoDateString;
	creditLimit?: number;
	currency?: string;
	id: string;
	isCreditApproved?: boolean;
	lastPaymentDate?: IsoDateString;
	paymentTermsDays?: number;
	updated: IsoAutoDateString;
	walletBalance?: number;
};

export type BillingManagementCreditNotesRecord = {
	amount?: number;
	appliedAt?: IsoDateString;
	created: IsoAutoDateString;
	creditNoteNumber: string;
	currency: string;
	dispute: RecordIdString;
	id: string;
	invoice: RecordIdString;
	issueDate: IsoDateString;
	notes?: HTMLString;
	reason: HTMLString;
	updated: IsoAutoDateString;
};

export enum BillingManagementDisputesStatusOptions {
	open = "open",
	"under-review" = "under-review",
	approved = "approved",
	denied = "denied",
	escalated = "escalated",
	closed = "closed",
}
export type BillingManagementDisputesRecord = {
	attachments?: FileNameString[];
	client: RecordIdString;
	created: IsoAutoDateString;
	disputeAmount?: number;
	id: string;
	lineItem: RecordIdString;
	reason: HTMLString;
	resolutionNotes?: HTMLString;
	resolvedAt?: IsoDateString;
	resolvedBy?: RecordIdString;
	status: BillingManagementDisputesStatusOptions;
	submittedAt?: IsoDateString;
	updated: IsoAutoDateString;
};

export type BillingManagementInvoiceLineItemsRecord = {
	created: IsoAutoDateString;
	description?: HTMLString;
	discountAmount?: number;
	discountRate?: number;
	id: string;
	invoice?: RecordIdString;
	quantity?: number;
	taxAmount?: number;
	taxRate?: number;
	unitPrice?: number;
	updated: IsoAutoDateString;
};

export enum BillingManagementInvoicesStatusOptions {
	draft = "draft",
	sent = "sent",
	viewed = "viewed",
	paid = "paid",
	"partial-paid" = "partial-paid",
	"past-due" = "past-due",
	disputed = "disputed",
	cancelled = "cancelled",
	void = "void",
}
export type BillingManagementInvoicesRecord = {
	amountPaid?: number;
	attachments?: FileNameString[];
	created: IsoAutoDateString;
	createdBy?: RecordIdString;
	currency?: string;
	discountAmount?: number;
	dueDate?: IsoDateString;
	id: string;
	invoiceNumber?: string;
	issueDate?: IsoDateString;
	notes?: HTMLString;
	paidAt?: IsoDateString;
	paymentTerms?: HTMLString;
	quote?: RecordIdString;
	sentAt?: IsoDateString;
	status?: BillingManagementInvoicesStatusOptions;
	subtotal?: number;
	totalAmount?: number;
	updated: IsoAutoDateString;
};

export enum BillingManagementLogsStatusOptions {
	pending = "pending",
	"in-progress" = "in-progress",
	success = "success",
	failed = "failed",
	retry = "retry",
}
export type BillingManagementLogsRecord<
	TrequestPayload = unknown,
	TresponsePayload = unknown,
> = {
	created: IsoAutoDateString;
	errorMessage?: string;
	externalId?: string;
	externalSystem: string;
	id: string;
	lastSyncAt?: IsoDateString;
	nextRetryAt?: IsoDateString;
	recordId: string;
	recordType: string;
	requestPayload?: null | TrequestPayload;
	responsePayload?: null | TresponsePayload;
	retryCount?: number;
	status?: BillingManagementLogsStatusOptions;
	updated: IsoAutoDateString;
};

export enum BillingManagementPaymentsPaymentMethodOptions {
	"credit-card" = "credit-card",
	"debit-card" = "debit-card",
	wallet = "wallet",
	"qr-ph" = "qr-ph",
	"client-credit" = "client-credit",
	"bank-transfer" = "bank-transfer",
	cash = "cash",
	check = "check",
}

export enum BillingManagementPaymentsStatusOptions {
	pending = "pending",
	processing = "processing",
	successful = "successful",
	failed = "failed",
	cancelled = "cancelled",
	refunded = "refunded",
}
export type BillingManagementPaymentsRecord = {
	amount?: number;
	attachments?: FileNameString[];
	created: IsoAutoDateString;
	currency?: string;
	fees?: number;
	gatewayReferenceId?: string;
	id: string;
	invoice?: RecordIdString;
	netAmount?: number;
	notes?: HTMLString;
	paymentDate?: IsoDateString;
	paymentMethod?: BillingManagementPaymentsPaymentMethodOptions;
	processedAt?: IsoDateString;
	processedBy?: RecordIdString;
	status?: BillingManagementPaymentsStatusOptions;
	transactionId?: string;
	updated: IsoAutoDateString;
};

export enum BillingManagementQuotesStatusOptions {
	pending = "pending",
	accepted = "accepted",
	expired = "expired",
	cancelled = "cancelled",
	converted = "converted",
}
export type BillingManagementQuotesRecord = {
	attachments?: FileNameString[];
	client?: RecordIdString;
	created: IsoAutoDateString;
	createdBy?: RecordIdString;
	destinationDetails?: HTMLString;
	expiredAt?: IsoDateString;
	height?: number;
	id: string;
	length?: number;
	notes?: HTMLString;
	originDetails?: HTMLString;
	quoteNumber?: string;
	quotePrice?: number;
	serviceLevel?: string;
	status?: BillingManagementQuotesStatusOptions;
	updated: IsoAutoDateString;
	weight?: number;
	width?: number;
};

export enum BillingManagementRateCardsTypeOptions {
	shipping = "shipping",
	storage = "storage",
	fulfillment = "fulfillment",
	handling = "handling",
	insurance = "insurance",
	customs = "customs",
	packaging = "packaging",
	returns = "returns",
}
export type BillingManagementRateCardsRecord = {
	created: IsoAutoDateString;
	createdBy?: RecordIdString;
	description?: HTMLString;
	id: string;
	isActive?: boolean;
	name: string;
	type: BillingManagementRateCardsTypeOptions;
	updated: IsoAutoDateString;
	validFrom?: IsoDateString;
	validTo?: IsoDateString;
};

export enum BillingManagementRateRulesPricingModelOptions {
	"per-kg" = "per-kg",
	"per-item" = "per-item",
	"flat-rate" = "flat-rate",
	"per-cubic-meter" = "per-cubic-meter",
	"per-zone" = "per-zone",
	percentage = "percentage",
	tiered = "tiered",
}
export type BillingManagementRateRulesRecord = {
	condition: string;
	created: IsoAutoDateString;
	id: string;
	isActive?: boolean;
	maxValue?: number;
	minValue?: number;
	price: number;
	pricingModel: BillingManagementRateRulesPricingModelOptions;
	priority: number;
	rateCard?: RecordIdString;
	updated: IsoAutoDateString;
	value: string;
};

export enum BillingManagementSurchargesCalculationMethodOptions {
	percentage = "percentage",
	fixed = "fixed",
	"per-unit" = "per-unit",
	"sliding-scale" = "sliding-scale",
}
export type BillingManagementSurchargesRecord = {
	amount?: number;
	calculationMethod?: BillingManagementSurchargesCalculationMethodOptions;
	created: IsoAutoDateString;
	description?: HTMLString;
	id: string;
	isActive?: boolean;
	name?: string;
	type?: string;
	updated: IsoAutoDateString;
	validFrom?: IsoDateString;
	validTo?: IsoDateString;
};

export type CustomerRelationsCampaignsRecord = {
	attachments?: FileNameString[];
	budget: number;
	created: IsoAutoDateString;
	endDate?: IsoDateString;
	id: string;
	name: string;
	startDate?: IsoDateString;
	updated: IsoAutoDateString;
};

export enum CustomerRelationsCasesStatusOptions {
	new = "new",
	"in-progress" = "in-progress",
	"waiting-for-customer" = "waiting-for-customer",
	"waiting-for-internal" = "waiting-for-internal",
	escalated = "escalated",
	resolved = "resolved",
	closed = "closed",
	cancelled = "cancelled",
}

export enum CustomerRelationsCasesPriorityOptions {
	critical = "critical",
	high = "high",
	medium = "medium",
	low = "low",
}

export enum CustomerRelationsCasesTypeOptions {
	question = "question",
	problem = "problem",
	complaint = "complaint",
	"feature-request" = "feature-request",
	"bug-report" = "bug-report",
	"technical-support" = "technical-support",
}
export type CustomerRelationsCasesRecord = {
	caseNumber: string;
	contact?: RecordIdString;
	created: IsoAutoDateString;
	description?: HTMLString;
	id: string;
	owner: RecordIdString;
	priority: CustomerRelationsCasesPriorityOptions;
	status: CustomerRelationsCasesStatusOptions;
	type: CustomerRelationsCasesTypeOptions;
	updated: IsoAutoDateString;
};

export type CustomerRelationsCompaniesRecord = {
	annualRevenue?: number;
	attachments?: FileNameString[];
	city?: string;
	country?: string;
	created: IsoAutoDateString;
	id: string;
	industry?: string;
	name: string;
	owner?: RecordIdString;
	phoneNumber?: string;
	postalCode?: string;
	state?: string;
	street?: string;
	updated: IsoAutoDateString;
	website?: string;
};

export type CustomerRelationsContactsRecord = {
	attachments?: FileNameString[];
	company?: RecordIdString;
	created: IsoAutoDateString;
	email: string;
	id: string;
	jobTitle?: string;
	name: string;
	owner: RecordIdString;
	phoneNumber?: string;
	updated: IsoAutoDateString;
};

export enum CustomerRelationsInteractionsTypeOptions {
	call = "call",
	meeting = "meeting",
	text = "text",
	email = "email",
}
export type CustomerRelationsInteractionsRecord = {
	attachments?: FileNameString[];
	case?: RecordIdString;
	contact: RecordIdString;
	id: string;
	interactionDate: IsoAutoDateString;
	notes?: HTMLString;
	outcome?: string;
	type?: CustomerRelationsInteractionsTypeOptions;
	user: RecordIdString;
};

export type CustomerRelationsInvoiceItemsRecord = {
	created: IsoAutoDateString;
	id: string;
	invoice: RecordIdString;
	price: number;
	product: RecordIdString;
	quantity: number;
	updated: IsoAutoDateString;
};

export enum CustomerRelationsInvoicesStatusOptions {
	draft = "draft",
	sent = "sent",
	paid = "paid",
	overdue = "overdue",
	cancelled = "cancelled",
}

export enum CustomerRelationsInvoicesPaymentMethodOptions {
	"credit-card" = "credit-card",
	"bank-transfer" = "bank-transfer",
	cash = "cash",
	check = "check",
	paypal = "paypal",
	stripe = "stripe",
	"wire-transfer" = "wire-transfer",
	other = "other",
	maya = "maya",
	gcash = "gcash",
}
export type CustomerRelationsInvoicesRecord = {
	attachments?: FileNameString[];
	created: IsoAutoDateString;
	dueDate?: IsoDateString;
	id: string;
	invoiceNumber: string;
	issueDate?: IsoDateString;
	items?: RecordIdString[];
	opportunity?: RecordIdString;
	paidAt?: IsoDateString;
	paymentMethod?: CustomerRelationsInvoicesPaymentMethodOptions;
	sentAt?: IsoDateString;
	status?: CustomerRelationsInvoicesStatusOptions;
	total?: number;
	updated: IsoAutoDateString;
};

export enum CustomerRelationsLeadsSourceOptions {
	website = "website",
	referral = "referral",
	"social-media" = "social-media",
	"email-campaign" = "email-campaign",
	"cold-call" = "cold-call",
	event = "event",
	advertisment = "advertisment",
	partner = "partner",
	other = "other",
}

export enum CustomerRelationsLeadsStatusOptions {
	new = "new",
	contacted = "contacted",
	qualified = "qualified",
	unqualified = "unqualified",
	converted = "converted",
}
export type CustomerRelationsLeadsRecord = {
	attachments?: FileNameString[];
	campaign?: RecordIdString;
	convertedAt?: IsoDateString;
	convertedCompany?: RecordIdString;
	convertedContact?: RecordIdString;
	convertedOpportunity?: RecordIdString;
	created: IsoAutoDateString;
	email?: string;
	id: string;
	name?: string;
	owner: RecordIdString;
	score: number;
	source?: CustomerRelationsLeadsSourceOptions;
	status?: CustomerRelationsLeadsStatusOptions;
	updated: IsoAutoDateString;
};

export enum CustomerRelationsOpportunitiesStageOptions {
	prospecting = "prospecting",
	qualification = "qualification",
	"need-analysis" = "need-analysis",
	demo = "demo",
	proposal = "proposal",
	negotiation = "negotiation",
	"closed-won" = "closed-won",
	"closed-lost" = "closed-lost",
}

export enum CustomerRelationsOpportunitiesSourceOptions {
	website = "website",
	referral = "referral",
	"social-media" = "social-media",
	"email-campaign" = "email-campaign",
	"cold-call" = "cold-call",
	event = "event",
	advertisment = "advertisment",
	partner = "partner",
	"existing-customer" = "existing-customer",
	other = "other",
}
export type CustomerRelationsOpportunitiesRecord = {
	attachments?: FileNameString[];
	campaign?: RecordIdString;
	company?: RecordIdString;
	contact?: RecordIdString;
	created: IsoAutoDateString;
	dealValue?: number;
	expectedCloseDate?: IsoDateString;
	id: string;
	lostReason?: HTMLString;
	name: string;
	owner: RecordIdString;
	probability?: number;
	products?: RecordIdString[];
	source: CustomerRelationsOpportunitiesSourceOptions;
	stage?: CustomerRelationsOpportunitiesStageOptions;
	updated: IsoAutoDateString;
};

export type CustomerRelationsOpportunityProductsRecord = {
	created: IsoAutoDateString;
	id: string;
	opportunity?: RecordIdString;
	product?: RecordIdString;
	quantity: number;
	updated: IsoAutoDateString;
};

export enum CustomerRelationsProductsTypeOptions {
	service = "service",
	good = "good",
	digital = "digital",
	subscription = "subscription",
}
export type CustomerRelationsProductsRecord = {
	attachments?: FileNameString[];
	created: IsoAutoDateString;
	description?: HTMLString;
	id: string;
	name: string;
	price: number;
	sku: string;
	type: CustomerRelationsProductsTypeOptions;
	updated: IsoAutoDateString;
};

export type DeliveryManagementDriverLocationRecord = {
	coordinates: GeoPoint;
	driver: RecordIdString;
	heading: GeoPoint;
	id: string;
	timestamp: IsoAutoDateString;
};

export type DeliveryManagementProofOfDeliveriesRecord<
	TsignatureData = unknown,
> = {
	coordinates?: GeoPoint;
	id: string;
	recipientName?: string;
	signatureData?: null | TsignatureData;
	task?: RecordIdString;
	timestamp: IsoAutoDateString;
};

export enum DeliveryManagementRoutesStatusOptions {
	planned = "planned",
	"in-progress" = "in-progress",
	completed = "completed",
	cancelled = "cancelled",
	paused = "paused",
}
export type DeliveryManagementRoutesRecord = {
	completedAt?: IsoDateString;
	created: IsoAutoDateString;
	driver?: RecordIdString;
	estimatedDurationInMinutes?: number;
	id: string;
	routeDate?: IsoDateString;
	startedAt?: IsoDateString;
	status?: DeliveryManagementRoutesStatusOptions;
	totalDistance?: number;
	updated: IsoAutoDateString;
};

export enum DeliveryManagementTaskEventsStatusOptions {
	assigned = "assigned",
	started = "started",
	arrived = "arrived",
	delivered = "delivered",
	failed = "failed",
	exception = "exception",
	cancelled = "cancelled",
	rescheduled = "rescheduled",
}
export type DeliveryManagementTaskEventsRecord = {
	coordinates?: GeoPoint;
	id: string;
	notes?: HTMLString;
	reason?: HTMLString;
	status: DeliveryManagementTaskEventsStatusOptions;
	task: RecordIdString;
	timestamp: IsoAutoDateString;
};

export enum DeliveryManagementTasksStatusOptions {
	pending = "pending",
	assigned = "assigned",
	"out-for-delivery" = "out-for-delivery",
	delivered = "delivered",
	failed = "failed",
	cancelled = "cancelled",
	rescheduled = "rescheduled",
}

export enum DeliveryManagementTasksFailureReasonOptions {
	"reecipient-not-home" = "reecipient-not-home",
	"address-not-found" = "address-not-found",
	"refused-delivery" = "refused-delivery",
	"damaged-package" = "damaged-package",
	"access-denied" = "access-denied",
	"weather-conditions" = "weather-conditions",
	"vehicle-breakdown" = "vehicle-breakdown",
	other = "other",
}
export type DeliveryManagementTasksRecord = {
	actualArrivalTime?: IsoDateString;
	attachments?: FileNameString[];
	attempCount?: number;
	created: IsoAutoDateString;
	deliveryAddress: string;
	deliveryInstructions?: HTMLString;
	deliveryTime?: IsoDateString;
	estimatedArrivalTime?: IsoDateString;
	failureReason?: DeliveryManagementTasksFailureReasonOptions;
	id: string;
	package: RecordIdString;
	recipientName?: string;
	recipientPhone?: string;
	route: RecordIdString;
	sequence: number;
	status: DeliveryManagementTasksStatusOptions;
	updated: IsoAutoDateString;
};

export type NotificationsRecord = {
	created: IsoAutoDateString;
	id: string;
	isRead?: boolean;
	link?: string;
	message: HTMLString;
	updated: IsoAutoDateString;
	user: RecordIdString;
};

export enum TransportManagementCarrierRatesUnitOptions {
	"per-kg" = "per-kg",
	"per-container" = "per-container",
	"per-mile" = "per-mile",
	"per-km" = "per-km",
	"flat-rate" = "flat-rate",
}
export type TransportManagementCarrierRatesRecord = {
	carrier?: RecordIdString;
	created: IsoAutoDateString;
	destination: string;
	id: string;
	origin: string;
	rate: number;
	serviceType?: string;
	unit?: TransportManagementCarrierRatesUnitOptions;
	updated: IsoAutoDateString;
};

export type TransportManagementCarriersRecord = {
	contactDetails?: HTMLString;
	created: IsoAutoDateString;
	id: string;
	image?: FileNameString;
	name: string;
	serviceOffered?: HTMLString;
	updated: IsoAutoDateString;
};

export enum TransportManagementDriverSchedulesReasonOptions {
	vacation = "vacation",
	"sick-leave" = "sick-leave",
	training = "training",
	"personal-leave" = "personal-leave",
}
export type TransportManagementDriverSchedulesRecord = {
	created: IsoAutoDateString;
	driver: RecordIdString;
	endDate: IsoDateString;
	id: string;
	reason?: TransportManagementDriverSchedulesReasonOptions;
	startDate: IsoDateString;
	updated: IsoAutoDateString;
};

export enum TransportManagementDriversStatusOptions {
	active = "active",
	inactive = "inactive",
	"on-leave" = "on-leave",
}
export type TransportManagementDriversRecord = {
	created: IsoAutoDateString;
	id: string;
	licenseExpiryDate?: IsoDateString;
	licenseNumber: string;
	schedules?: RecordIdString[];
	status: TransportManagementDriversStatusOptions;
	updated: IsoAutoDateString;
	user?: RecordIdString;
};

export enum TransportManagementExpensesTypeOptions {
	fuel = "fuel",
	tolls = "tolls",
	maintenance = "maintenance",
	parking = "parking",
	meals = "meals",
	accomodation = "accomodation",
}

export enum TransportManagementExpensesCurrencyOptions {
	PHP = "PHP",
	USD = "USD",
	EUR = "EUR",
}

export enum TransportManagementExpensesStatusOptions {
	pending = "pending",
	approved = "approved",
	rejected = "rejected",
	reimbursed = "reimbursed",
}
export type TransportManagementExpensesRecord = {
	amount: number;
	created: IsoAutoDateString;
	currency: TransportManagementExpensesCurrencyOptions;
	driver?: RecordIdString;
	fuelQuantity?: number;
	id: string;
	odometerReading: number;
	receipts: FileNameString[];
	status: TransportManagementExpensesStatusOptions;
	trip?: RecordIdString;
	type: TransportManagementExpensesTypeOptions;
	updated: IsoAutoDateString;
};

export type TransportManagementGeofenceRecord = {
	coordinates: GeoPoint;
	created: IsoAutoDateString;
	id: string;
	name: string;
	radius: number;
	updated: IsoAutoDateString;
};

export enum TransportManagementGeofenceEventsTypeOptions {
	enter = "enter",
	exit = "exit",
}
export type TransportManagementGeofenceEventsRecord = {
	geofence: RecordIdString;
	id: string;
	timestamp: IsoAutoDateString;
	type: TransportManagementGeofenceEventsTypeOptions;
	vehicle: RecordIdString;
};

export type TransportManagementGpsPingsRecord = {
	coordinates: GeoPoint;
	id: string;
	timestamp: IsoAutoDateString;
	vehicle: RecordIdString;
};

export enum TransportManagementPartnerInvoiceStatusOptions {
	pending = "pending",
	paid = "paid",
	disputed = "disputed",
	overdue = "overdue",
	cancelled = "cancelled",
}
export type TransportManagementPartnerInvoiceRecord = {
	carrier: RecordIdString;
	created: IsoAutoDateString;
	id: string;
	invoiceDate: IsoDateString;
	invoiceNumber: string;
	items?: RecordIdString;
	status?: TransportManagementPartnerInvoiceStatusOptions;
	totalAmount: number;
	updated: IsoAutoDateString;
};

export type TransportManagementPartnerInvoiceItemsRecord = {
	amount: number;
	created: IsoAutoDateString;
	id: string;
	partnerInvoice: RecordIdString;
	shipmentLeg: RecordIdString;
	updated: IsoAutoDateString;
};

export type TransportManagementProofOfDeliveriesRecord = {
	attachments?: FileNameString[];
	coordinate: GeoPoint;
	created: IsoAutoDateString;
	id: string;
	tripStop: RecordIdString;
	updated: IsoAutoDateString;
};

export type TransportManagementRoutesRecord = {
	created: IsoAutoDateString;
	id: string;
	name: string;
	totalDistance: number;
	totalDuration: number;
	updated: IsoAutoDateString;
};

export type TransportManagementShipmentLegEventsRecord = {
	id: string;
	location: GeoPoint;
	message: string;
	shipmentLegId: RecordIdString;
	timestamp: IsoAutoDateString;
};

export enum TransportManagementShipmentLegsStatusOptions {
	pending = "pending",
	"in-transit" = "in-transit",
	delivered = "delivered",
	cancelled = "cancelled",
	failed = "failed",
}
export type TransportManagementShipmentLegsRecord = {
	carrier?: RecordIdString;
	created: IsoAutoDateString;
	endLocation: GeoPoint;
	id: string;
	interalTrip?: RecordIdString;
	legSequence: number;
	shipment?: RecordIdString;
	startLocation: GeoPoint;
	status: TransportManagementShipmentLegsStatusOptions;
	updated: IsoAutoDateString;
};

export enum TransportManagementTripStopsStatusOptions {
	pending = "pending",
	arrived = "arrived",
	completed = "completed",
	skipped = "skipped",
}
export type TransportManagementTripStopsRecord = {
	actualArrivalTime?: IsoDateString;
	actualDepartureTime?: IsoDateString;
	address?: string;
	created: IsoAutoDateString;
	estimatedArrivalTime?: IsoDateString;
	estimatedDepartureTime?: IsoDateString;
	id: string;
	sequence: number;
	shipment?: RecordIdString;
	status: TransportManagementTripStopsStatusOptions;
	trip: RecordIdString;
	updated: IsoAutoDateString;
};

export enum TransportManagementTripsStatusOptions {
	planned = "planned",
	"in-progress" = "in-progress",
	completed = "completed",
	cancelled = "cancelled",
}
export type TransportManagementTripsRecord = {
	created: IsoAutoDateString;
	driver: RecordIdString;
	id: string;
	status: TransportManagementTripsStatusOptions;
	updated: IsoAutoDateString;
	vehicle: RecordIdString;
};

export type TransportManagementVehicleMaintenanceRecord = {
	cost?: number;
	created: IsoAutoDateString;
	id: string;
	notes?: HTMLString;
	serviceDate: IsoDateString;
	serviceType: IsoDateString;
	updated: IsoAutoDateString;
	vehicle: RecordIdString;
};

export enum TransportManagementVehiclesStatusOptions {
	available = "available",
	"in-maintenance" = "in-maintenance",
	"on-trip" = "on-trip",
	"out-of-service" = "out-of-service",
}
export type TransportManagementVehiclesRecord = {
	capacityVolume?: number;
	capacityWeight?: number;
	created: IsoAutoDateString;
	gps_pings?: RecordIdString[];
	id: string;
	maintenances?: RecordIdString[];
	model?: string;
	registrationNumber: string;
	status: TransportManagementVehiclesStatusOptions;
	updated: IsoAutoDateString;
};

export enum UsersRolesOptions {
	admin = "admin",
	developer = "developer",
	user = "user",
	client = "client",
	"client-admin" = "client-admin",
	"end-customer" = "end-customer",
	"inventory-manager" = "inventory-manager",
	"warehouse-manager" = "warehouse-manager",
	"receiving-manager" = "receiving-manager",
	"warehouse-operator" = "warehouse-operator",
	picker = "picker",
	packer = "packer",
	"returns-processor" = "returns-processor",
	"qc-manager" = "qc-manager",
	"logistics-coordinator" = "logistics-coordinator",
	"logistics-manager" = "logistics-manager",
	"logistics-planner" = "logistics-planner",
	dispatcher = "dispatcher",
	driver = "driver",
	"fleet-manager" = "fleet-manager",
	"transport-manager" = "transport-manager",
	"account-manager" = "account-manager",
	"pricing-analyst" = "pricing-analyst",
	"finance-manager" = "finance-manager",
	accountant = "accountant",
	sdr = "sdr",
	"sales-rep" = "sales-rep",
	"sales-manager" = "sales-manager",
	"marketing-manager" = "marketing-manager",
	"customer-support-agent" = "customer-support-agent",
	"product-manager" = "product-manager",
	carrier = "carrier",
}
export type UsersRecord = {
	avatar?: FileNameString;
	created: IsoAutoDateString;
	email: string;
	emailVisibility?: boolean;
	id: string;
	name?: string;
	password: string;
	roles?: UsersRolesOptions[];
	tokenKey: string;
	updated: IsoAutoDateString;
	verified?: boolean;
};

export type WarehouseManagementBinThresholdRecord = {
	alertThreshold?: number;
	created: IsoAutoDateString;
	id: string;
	isActive?: boolean;
	location: RecordIdString;
	maxQuantity?: number;
	minQuantity?: number;
	product: RecordIdString;
	reorderQuantity?: number;
	updated: IsoAutoDateString;
};

export type WarehouseManagementInboundShipmentItemsRecord = {
	created: IsoAutoDateString;
	discrepancyNotes?: HTMLString;
	expectedQuantity: number;
	id: string;
	inboundShipment?: RecordIdString;
	product?: RecordIdString;
	receivedQuantity?: number;
	updated: IsoAutoDateString;
};

export enum WarehouseManagementInboundShipmentsStatusOptions {
	pending = "pending",
	arrived = "arrived",
	processing = "processing",
	completed = "completed",
	cancelled = "cancelled",
}
export type WarehouseManagementInboundShipmentsRecord = {
	actualArrivalDate?: IsoDateString;
	client: RecordIdString;
	created: IsoAutoDateString;
	expectedArrivalDate?: IsoDateString;
	id: string;
	status?: WarehouseManagementInboundShipmentsStatusOptions;
	updated: IsoAutoDateString;
	warehouse: RecordIdString;
};

export enum WarehouseManagementInventoryAdjustmentReasonOptions {
	"cycle-count" = "cycle-count",
	"damaged-goods" = "damaged-goods",
	theft = "theft",
	expired = "expired",
	"return-to-vendor" = "return-to-vendor",
	"manual-correction" = "manual-correction",
}
export type WarehouseManagementInventoryAdjustmentRecord = {
	created: IsoAutoDateString;
	id: string;
	notes?: HTMLString;
	product: RecordIdString;
	quantityChange: number;
	reason: WarehouseManagementInventoryAdjustmentReasonOptions;
	updated: IsoAutoDateString;
	user: RecordIdString;
	warehouse: RecordIdString;
};

export type WarehouseManagementInventoryBatchesRecord = {
	batchNumber: string;
	created: IsoAutoDateString;
	expirationDate?: IsoDateString;
	id: string;
	product: RecordIdString;
	updated: IsoAutoDateString;
};

export enum WarehouseManagementInventoryStockStatusOptions {
	available = "available",
	allocated = "allocated",
	damaged = "damaged",
	quarantine = "quarantine",
	hold = "hold",
	shipped = "shipped",
	expired = "expired",
}
export type WarehouseManagementInventoryStockRecord = {
	batch?: RecordIdString;
	created: IsoAutoDateString;
	id: string;
	lastCountedAt?: IsoDateString;
	lastMovementAt?: IsoDateString;
	location: RecordIdString;
	product: RecordIdString;
	quantity?: number;
	reservedQuantity?: number;
	status: WarehouseManagementInventoryStockStatusOptions;
	updated: IsoAutoDateString;
};

export enum WarehouseManagementLocationsTypeOptions {
	"receiving-dock" = "receiving-dock",
	"pick-bin" = "pick-bin",
	"packing-station" = "packing-station",
	"cross-dock-area" = "cross-dock-area",
	"bulk-storage" = "bulk-storage",
	"reserve-storage" = "reserve-storage",
	"damaged-goods" = "damaged-goods",
	"staging-area" = "staging-area",
	"quality-control" = "quality-control",
	"returns-area" = "returns-area",
}
export type WarehouseManagementLocationsRecord = {
	barcode?: string;
	created: IsoAutoDateString;
	hazmatApproved?: boolean;
	id: string;
	isActive?: boolean;
	isPickable?: boolean;
	isReceivable?: boolean;
	level?: number;
	maxPallets?: number;
	maxVolume?: number;
	maxWeight?: number;
	name: string;
	parentLocation?: RecordIdString;
	temperatureControlled?: boolean;
	type?: WarehouseManagementLocationsTypeOptions;
	updated: IsoAutoDateString;
	warehouse?: RecordIdString;
};

export type WarehouseManagementOutboundShipmentItemsRecord = {
	batch?: RecordIdString;
	created: IsoAutoDateString;
	id: string;
	outboundShipment: RecordIdString;
	product: RecordIdString;
	quantityShipped: number;
	salesOrderItem: RecordIdString;
	updated: IsoAutoDateString;
};

export enum WarehouseManagementOutboundShipmentsStatusOptions {
	picking = "picking",
	packed = "packed",
	shipped = "shipped",
	delivered = "delivered",
	cancelled = "cancelled",
}
export type WarehouseManagementOutboundShipmentsRecord = {
	carrier?: RecordIdString;
	created: IsoAutoDateString;
	id: string;
	items?: RecordIdString[];
	salesOrder: RecordIdString;
	status?: WarehouseManagementOutboundShipmentsStatusOptions;
	trackingNumber: string;
	updated: IsoAutoDateString;
	warehouse: RecordIdString;
};

export type WarehouseManagementPackageItemsRecord = {
	batch?: RecordIdString;
	created: IsoAutoDateString;
	expiryDate?: IsoDateString;
	id: string;
	lotNumber?: string;
	package: RecordIdString;
	product: RecordIdString;
	quantity: number;
	updated: IsoAutoDateString;
};

export type WarehouseManagementPackagesRecord = {
	created: IsoAutoDateString;
	height?: number;
	id: string;
	images?: FileNameString[];
	insuranceValue?: number;
	isFragile?: boolean;
	isHazmat?: boolean;
	length?: number;
	packageNumber: string;
	packedAt?: IsoDateString;
	packedByUser?: RecordIdString;
	requireSignature?: boolean;
	salesOrder: RecordIdString;
	shippedAt?: IsoDateString;
	type?: string;
	updated: IsoAutoDateString;
	warehouse: RecordIdString;
	weight?: number;
	width?: number;
};

export type WarehouseManagementPickBatchItemsRecord = {
	actualPickTime?: number;
	created: IsoAutoDateString;
	estimatedPickTime?: IsoDateString;
	id: string;
	orderPriority?: number;
	pickBatch: RecordIdString;
	salesOrder: RecordIdString;
	updated: IsoAutoDateString;
};

export enum WarehouseManagementPickBatchesStatusOptions {
	open = "open",
	"in-progress" = "in-progress",
	completed = "completed",
	cancelled = "cancelled",
}

export enum WarehouseManagementPickBatchesStrategyOptions {
	"batch-picking" = "batch-picking",
	"zone-picking" = "zone-picking",
	"wave-picking" = "wave-picking",
	"single-order-picking" = "single-order-picking",
	"cluster-picking" = "cluster-picking",
}
export type WarehouseManagementPickBatchesRecord = {
	actualDuration?: number;
	assignedUser?: RecordIdString;
	batchNumber?: string;
	completedAt?: IsoDateString;
	completedItems?: number;
	created: IsoAutoDateString;
	estimatedDuration?: number;
	id: string;
	items?: RecordIdString[];
	priority: number;
	startedAt?: IsoDateString;
	status?: WarehouseManagementPickBatchesStatusOptions;
	strategy?: WarehouseManagementPickBatchesStrategyOptions;
	totalItems?: number;
	updated: IsoAutoDateString;
	warehouse?: RecordIdString;
};

export enum WarehouseManagementProductsStatusOptions {
	active = "active",
	discontinued = "discontinued",
	obsolete = "obsolete",
	inactive = "inactive",
}
export type WarehouseManagementProductsRecord = {
	barcode?: string;
	client?: RecordIdString;
	costPrice?: number;
	created: IsoAutoDateString;
	description?: HTMLString;
	height?: number;
	id: string;
	images?: FileNameString[];
	length?: number;
	name: string;
	sku: string;
	status?: WarehouseManagementProductsStatusOptions;
	supplier?: RecordIdString;
	updated: IsoAutoDateString;
	weight?: number;
	width?: number;
};

export enum WarehouseManagementPutawayRulesLocationTypeOptions {
	"receiving-dock" = "receiving-dock",
	"pick-bin" = "pick-bin",
	"packing-station" = "packing-station",
	"cross-dock-area" = "cross-dock-area",
	"bulk-storage" = "bulk-storage",
	"reserve-storage" = "reserve-storage",
	"damaged-goods" = "damaged-goods",
	"staging-area" = "staging-area",
	"quality-control" = "quality-control",
	"returns-area" = "returns-area",
}
export type WarehouseManagementPutawayRulesRecord = {
	client?: RecordIdString;
	created: IsoAutoDateString;
	id: string;
	isActive?: boolean;
	locationType: WarehouseManagementPutawayRulesLocationTypeOptions;
	maxQuantity?: number;
	minQuantity?: number;
	preferredLocation?: RecordIdString;
	priority: number;
	product: RecordIdString;
	requireHazmatApproval?: boolean;
	requireTemperatureControl?: boolean;
	updated: IsoAutoDateString;
	volumeThreshold?: number;
	warehouse: RecordIdString;
	weightThreshold?: number;
};

export type WarehouseManagementReorderPointsRecord = {
	created: IsoAutoDateString;
	id: string;
	product: RecordIdString;
	threshold?: number;
	updated: IsoAutoDateString;
	warehouse: RecordIdString;
};

export enum WarehouseManagementReturnItemsConditionOptions {
	sellable = "sellable",
	damaged = "damaged",
	defective = "defective",
	expired = "expired",
	unsellable = "unsellable",
}
export type WarehouseManagementReturnItemsRecord = {
	condition?: WarehouseManagementReturnItemsConditionOptions;
	created: IsoAutoDateString;
	id: string;
	product: RecordIdString;
	quantityExpected?: number;
	quantityRecevied?: number;
	return: RecordIdString;
	updated: IsoAutoDateString;
};

export enum WarehouseManagementReturnsStatusOptions {
	requested = "requested",
	approved = "approved",
	rejeceted = "rejeceted",
	received = "received",
	processed = "processed",
}
export type WarehouseManagementReturnsRecord = {
	client?: RecordIdString;
	created: IsoAutoDateString;
	id: string;
	reason?: HTMLString;
	returnNumber: string;
	salesOrder?: RecordIdString;
	status: WarehouseManagementReturnsStatusOptions;
	updated: IsoAutoDateString;
};

export type WarehouseManagementSalesOrderItemsRecord = {
	created: IsoAutoDateString;
	id: string;
	product?: RecordIdString;
	quantityOrdered: number;
	salesOrder?: RecordIdString;
	updated: IsoAutoDateString;
};

export enum WarehouseManagementSalesOrdersStatusOptions {
	pending = "pending",
	processing = "processing",
	shipped = "shipped",
	completed = "completed",
	cancelled = "cancelled",
}
export type WarehouseManagementSalesOrdersRecord = {
	client: RecordIdString;
	created: IsoAutoDateString;
	id: string;
	opportunity?: RecordIdString;
	orderNumber: string;
	shippingAddress?: number;
	status: WarehouseManagementSalesOrdersStatusOptions;
	updated: IsoAutoDateString;
};

export enum WarehouseManagementStockTransferStatusOptions {
	pending = "pending",
	"in-transit" = "in-transit",
	received = "received",
	cancelled = "cancelled",
}
export type WarehouseManagementStockTransferRecord = {
	created: IsoAutoDateString;
	destinationWarehouse: RecordIdString;
	id: string;
	product?: RecordIdString;
	quantity?: number;
	sourceWarehouse: RecordIdString;
	status?: WarehouseManagementStockTransferStatusOptions;
	updated: IsoAutoDateString;
};

export type WarehouseManagementSuppliersRecord = {
	client?: RecordIdString;
	contactPerson?: string;
	created: IsoAutoDateString;
	email?: string;
	id: string;
	name: string;
	phoneNumber?: string;
	updated: IsoAutoDateString;
};

export enum WarehouseManagementTaskItemsStatusOptions {
	pending = "pending",
	"in-progress" = "in-progress",
	completed = "completed",
	"short-picked" = "short-picked",
	damaged = "damaged",
	"not-found" = "not-found",
}
export type WarehouseManagementTaskItemsRecord = {
	batch?: RecordIdString;
	completedAt?: IsoDateString;
	created: IsoAutoDateString;
	destinationLocation?: RecordIdString;
	expiryDate?: IsoDateString;
	id: string;
	lotNumber?: number;
	notes?: HTMLString;
	product?: RecordIdString;
	proofs?: FileNameString[];
	quantityCompleted?: number;
	quantityRequired?: number;
	sourceLocation?: RecordIdString;
	status?: WarehouseManagementTaskItemsStatusOptions;
	task?: RecordIdString;
	updated: IsoAutoDateString;
};

export enum WarehouseManagementTasksTypeOptions {
	putaway = "putaway",
	pick = "pick",
	pack = "pack",
	replenishment = "replenishment",
	"cycle-count" = "cycle-count",
	"cross-dock" = "cross-dock",
	"returns-processing" = "returns-processing",
	"damage-inspection" = "damage-inspection",
	"quality-check" = "quality-check",
}

export enum WarehouseManagementTasksStatusOptions {
	pending = "pending",
	assigned = "assigned",
	"in-progress" = "in-progress",
	completed = "completed",
	cancelled = "cancelled",
	error = "error",
}
export type WarehouseManagementTasksRecord = {
	attachments?: FileNameString[];
	created: IsoAutoDateString;
	endTime?: IsoDateString;
	id: string;
	instructions?: HTMLString;
	notes?: HTMLString;
	pickBatchId?: RecordIdString;
	priority: number;
	startTime?: IsoDateString;
	status?: WarehouseManagementTasksStatusOptions;
	taskNumber: string;
	type?: WarehouseManagementTasksTypeOptions;
	updated: IsoAutoDateString;
	user?: RecordIdString;
	warehouse?: RecordIdString;
};

export type WarehouseManagementWarehousesRecord = {
	address?: string;
	city?: string;
	contactEmail?: string;
	contactPerson?: string;
	contactPhone?: string;
	country?: string;
	created: IsoAutoDateString;
	id: string;
	images?: FileNameString[];
	isActive?: boolean;
	location?: GeoPoint;
	name: string;
	postalCode?: string;
	state?: string;
	timezone?: string;
	updated: IsoAutoDateString;
};

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> =
	Required<AuthoriginsRecord> & BaseSystemFields<Texpand>;
export type ExternalauthsResponse<Texpand = unknown> =
	Required<ExternalauthsRecord> & BaseSystemFields<Texpand>;
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> &
	BaseSystemFields<Texpand>;
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> &
	BaseSystemFields<Texpand>;
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> &
	AuthSystemFields<Texpand>;
export type BillingManagementAccountTransactionsResponse<Texpand = unknown> =
	Required<BillingManagementAccountTransactionsRecord> &
		BaseSystemFields<Texpand>;
export type BillingManagementClientAccountsResponse<Texpand = unknown> =
	Required<BillingManagementClientAccountsRecord> & BaseSystemFields<Texpand>;
export type BillingManagementCreditNotesResponse<Texpand = unknown> =
	Required<BillingManagementCreditNotesRecord> & BaseSystemFields<Texpand>;
export type BillingManagementDisputesResponse<Texpand = unknown> =
	Required<BillingManagementDisputesRecord> & BaseSystemFields<Texpand>;
export type BillingManagementInvoiceLineItemsResponse<Texpand = unknown> =
	Required<BillingManagementInvoiceLineItemsRecord> & BaseSystemFields<Texpand>;
export type BillingManagementInvoicesResponse<Texpand = unknown> =
	Required<BillingManagementInvoicesRecord> & BaseSystemFields<Texpand>;
export type BillingManagementLogsResponse<
	TrequestPayload = unknown,
	TresponsePayload = unknown,
	Texpand = unknown,
> = Required<BillingManagementLogsRecord<TrequestPayload, TresponsePayload>> &
	BaseSystemFields<Texpand>;
export type BillingManagementPaymentsResponse<Texpand = unknown> =
	Required<BillingManagementPaymentsRecord> & BaseSystemFields<Texpand>;
export type BillingManagementQuotesResponse<Texpand = unknown> =
	Required<BillingManagementQuotesRecord> & BaseSystemFields<Texpand>;
export type BillingManagementRateCardsResponse<Texpand = unknown> =
	Required<BillingManagementRateCardsRecord> & BaseSystemFields<Texpand>;
export type BillingManagementRateRulesResponse<Texpand = unknown> =
	Required<BillingManagementRateRulesRecord> & BaseSystemFields<Texpand>;
export type BillingManagementSurchargesResponse<Texpand = unknown> =
	Required<BillingManagementSurchargesRecord> & BaseSystemFields<Texpand>;
export type CustomerRelationsCampaignsResponse<Texpand = unknown> =
	Required<CustomerRelationsCampaignsRecord> & BaseSystemFields<Texpand>;
export type CustomerRelationsCasesResponse<Texpand = unknown> =
	Required<CustomerRelationsCasesRecord> & BaseSystemFields<Texpand>;
export type CustomerRelationsCompaniesResponse<Texpand = unknown> =
	Required<CustomerRelationsCompaniesRecord> & BaseSystemFields<Texpand>;
export type CustomerRelationsContactsResponse<Texpand = unknown> =
	Required<CustomerRelationsContactsRecord> & BaseSystemFields<Texpand>;
export type CustomerRelationsInteractionsResponse<Texpand = unknown> =
	Required<CustomerRelationsInteractionsRecord> & BaseSystemFields<Texpand>;
export type CustomerRelationsInvoiceItemsResponse<Texpand = unknown> =
	Required<CustomerRelationsInvoiceItemsRecord> & BaseSystemFields<Texpand>;
export type CustomerRelationsInvoicesResponse<Texpand = unknown> =
	Required<CustomerRelationsInvoicesRecord> & BaseSystemFields<Texpand>;
export type CustomerRelationsLeadsResponse<Texpand = unknown> =
	Required<CustomerRelationsLeadsRecord> & BaseSystemFields<Texpand>;
export type CustomerRelationsOpportunitiesResponse<Texpand = unknown> =
	Required<CustomerRelationsOpportunitiesRecord> & BaseSystemFields<Texpand>;
export type CustomerRelationsOpportunityProductsResponse<Texpand = unknown> =
	Required<CustomerRelationsOpportunityProductsRecord> &
		BaseSystemFields<Texpand>;
export type CustomerRelationsProductsResponse<Texpand = unknown> =
	Required<CustomerRelationsProductsRecord> & BaseSystemFields<Texpand>;
export type DeliveryManagementDriverLocationResponse<Texpand = unknown> =
	Required<DeliveryManagementDriverLocationRecord> & BaseSystemFields<Texpand>;
export type DeliveryManagementProofOfDeliveriesResponse<
	TsignatureData = unknown,
	Texpand = unknown,
> = Required<DeliveryManagementProofOfDeliveriesRecord<TsignatureData>> &
	BaseSystemFields<Texpand>;
export type DeliveryManagementRoutesResponse<Texpand = unknown> =
	Required<DeliveryManagementRoutesRecord> & BaseSystemFields<Texpand>;
export type DeliveryManagementTaskEventsResponse<Texpand = unknown> =
	Required<DeliveryManagementTaskEventsRecord> & BaseSystemFields<Texpand>;
export type DeliveryManagementTasksResponse<Texpand = unknown> =
	Required<DeliveryManagementTasksRecord> & BaseSystemFields<Texpand>;
export type NotificationsResponse<Texpand = unknown> =
	Required<NotificationsRecord> & BaseSystemFields<Texpand>;
export type TransportManagementCarrierRatesResponse<Texpand = unknown> =
	Required<TransportManagementCarrierRatesRecord> & BaseSystemFields<Texpand>;
export type TransportManagementCarriersResponse<Texpand = unknown> =
	Required<TransportManagementCarriersRecord> & BaseSystemFields<Texpand>;
export type TransportManagementDriverSchedulesResponse<Texpand = unknown> =
	Required<TransportManagementDriverSchedulesRecord> &
		BaseSystemFields<Texpand>;
export type TransportManagementDriversResponse<Texpand = unknown> =
	Required<TransportManagementDriversRecord> & BaseSystemFields<Texpand>;
export type TransportManagementExpensesResponse<Texpand = unknown> =
	Required<TransportManagementExpensesRecord> & BaseSystemFields<Texpand>;
export type TransportManagementGeofenceResponse<Texpand = unknown> =
	Required<TransportManagementGeofenceRecord> & BaseSystemFields<Texpand>;
export type TransportManagementGeofenceEventsResponse<Texpand = unknown> =
	Required<TransportManagementGeofenceEventsRecord> & BaseSystemFields<Texpand>;
export type TransportManagementGpsPingsResponse<Texpand = unknown> =
	Required<TransportManagementGpsPingsRecord> & BaseSystemFields<Texpand>;
export type TransportManagementPartnerInvoiceResponse<Texpand = unknown> =
	Required<TransportManagementPartnerInvoiceRecord> & BaseSystemFields<Texpand>;
export type TransportManagementPartnerInvoiceItemsResponse<Texpand = unknown> =
	Required<TransportManagementPartnerInvoiceItemsRecord> &
		BaseSystemFields<Texpand>;
export type TransportManagementProofOfDeliveriesResponse<Texpand = unknown> =
	Required<TransportManagementProofOfDeliveriesRecord> &
		BaseSystemFields<Texpand>;
export type TransportManagementRoutesResponse<Texpand = unknown> =
	Required<TransportManagementRoutesRecord> & BaseSystemFields<Texpand>;
export type TransportManagementShipmentLegEventsResponse<Texpand = unknown> =
	Required<TransportManagementShipmentLegEventsRecord> &
		BaseSystemFields<Texpand>;
export type TransportManagementShipmentLegsResponse<Texpand = unknown> =
	Required<TransportManagementShipmentLegsRecord> & BaseSystemFields<Texpand>;
export type TransportManagementTripStopsResponse<Texpand = unknown> =
	Required<TransportManagementTripStopsRecord> & BaseSystemFields<Texpand>;
export type TransportManagementTripsResponse<Texpand = unknown> =
	Required<TransportManagementTripsRecord> & BaseSystemFields<Texpand>;
export type TransportManagementVehicleMaintenanceResponse<Texpand = unknown> =
	Required<TransportManagementVehicleMaintenanceRecord> &
		BaseSystemFields<Texpand>;
export type TransportManagementVehiclesResponse<Texpand = unknown> =
	Required<TransportManagementVehiclesRecord> & BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
	AuthSystemFields<Texpand>;
export type WarehouseManagementBinThresholdResponse<Texpand = unknown> =
	Required<WarehouseManagementBinThresholdRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementInboundShipmentItemsResponse<Texpand = unknown> =
	Required<WarehouseManagementInboundShipmentItemsRecord> &
		BaseSystemFields<Texpand>;
export type WarehouseManagementInboundShipmentsResponse<Texpand = unknown> =
	Required<WarehouseManagementInboundShipmentsRecord> &
		BaseSystemFields<Texpand>;
export type WarehouseManagementInventoryAdjustmentResponse<Texpand = unknown> =
	Required<WarehouseManagementInventoryAdjustmentRecord> &
		BaseSystemFields<Texpand>;
export type WarehouseManagementInventoryBatchesResponse<Texpand = unknown> =
	Required<WarehouseManagementInventoryBatchesRecord> &
		BaseSystemFields<Texpand>;
export type WarehouseManagementInventoryStockResponse<Texpand = unknown> =
	Required<WarehouseManagementInventoryStockRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementLocationsResponse<Texpand = unknown> =
	Required<WarehouseManagementLocationsRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementOutboundShipmentItemsResponse<
	Texpand = unknown,
> = Required<WarehouseManagementOutboundShipmentItemsRecord> &
	BaseSystemFields<Texpand>;
export type WarehouseManagementOutboundShipmentsResponse<Texpand = unknown> =
	Required<WarehouseManagementOutboundShipmentsRecord> &
		BaseSystemFields<Texpand>;
export type WarehouseManagementPackageItemsResponse<Texpand = unknown> =
	Required<WarehouseManagementPackageItemsRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementPackagesResponse<Texpand = unknown> =
	Required<WarehouseManagementPackagesRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementPickBatchItemsResponse<Texpand = unknown> =
	Required<WarehouseManagementPickBatchItemsRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementPickBatchesResponse<Texpand = unknown> =
	Required<WarehouseManagementPickBatchesRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementProductsResponse<Texpand = unknown> =
	Required<WarehouseManagementProductsRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementPutawayRulesResponse<Texpand = unknown> =
	Required<WarehouseManagementPutawayRulesRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementReorderPointsResponse<Texpand = unknown> =
	Required<WarehouseManagementReorderPointsRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementReturnItemsResponse<Texpand = unknown> =
	Required<WarehouseManagementReturnItemsRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementReturnsResponse<Texpand = unknown> =
	Required<WarehouseManagementReturnsRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementSalesOrderItemsResponse<Texpand = unknown> =
	Required<WarehouseManagementSalesOrderItemsRecord> &
		BaseSystemFields<Texpand>;
export type WarehouseManagementSalesOrdersResponse<Texpand = unknown> =
	Required<WarehouseManagementSalesOrdersRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementStockTransferResponse<Texpand = unknown> =
	Required<WarehouseManagementStockTransferRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementSuppliersResponse<Texpand = unknown> =
	Required<WarehouseManagementSuppliersRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementTaskItemsResponse<Texpand = unknown> =
	Required<WarehouseManagementTaskItemsRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementTasksResponse<Texpand = unknown> =
	Required<WarehouseManagementTasksRecord> & BaseSystemFields<Texpand>;
export type WarehouseManagementWarehousesResponse<Texpand = unknown> =
	Required<WarehouseManagementWarehousesRecord> & BaseSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord;
	_externalAuths: ExternalauthsRecord;
	_mfas: MfasRecord;
	_otps: OtpsRecord;
	_superusers: SuperusersRecord;
	billing_management_account_transactions: BillingManagementAccountTransactionsRecord;
	billing_management_client_accounts: BillingManagementClientAccountsRecord;
	billing_management_credit_notes: BillingManagementCreditNotesRecord;
	billing_management_disputes: BillingManagementDisputesRecord;
	billing_management_invoice_line_items: BillingManagementInvoiceLineItemsRecord;
	billing_management_invoices: BillingManagementInvoicesRecord;
	billing_management_logs: BillingManagementLogsRecord;
	billing_management_payments: BillingManagementPaymentsRecord;
	billing_management_quotes: BillingManagementQuotesRecord;
	billing_management_rate_cards: BillingManagementRateCardsRecord;
	billing_management_rate_rules: BillingManagementRateRulesRecord;
	billing_management_surcharges: BillingManagementSurchargesRecord;
	customer_relations_campaigns: CustomerRelationsCampaignsRecord;
	customer_relations_cases: CustomerRelationsCasesRecord;
	customer_relations_companies: CustomerRelationsCompaniesRecord;
	customer_relations_contacts: CustomerRelationsContactsRecord;
	customer_relations_interactions: CustomerRelationsInteractionsRecord;
	customer_relations_invoice_items: CustomerRelationsInvoiceItemsRecord;
	customer_relations_invoices: CustomerRelationsInvoicesRecord;
	customer_relations_leads: CustomerRelationsLeadsRecord;
	customer_relations_opportunities: CustomerRelationsOpportunitiesRecord;
	customer_relations_opportunity_products: CustomerRelationsOpportunityProductsRecord;
	customer_relations_products: CustomerRelationsProductsRecord;
	delivery_management_driver_location: DeliveryManagementDriverLocationRecord;
	delivery_management_proof_of_deliveries: DeliveryManagementProofOfDeliveriesRecord;
	delivery_management_routes: DeliveryManagementRoutesRecord;
	delivery_management_task_events: DeliveryManagementTaskEventsRecord;
	delivery_management_tasks: DeliveryManagementTasksRecord;
	notifications: NotificationsRecord;
	transport_management_carrier_rates: TransportManagementCarrierRatesRecord;
	transport_management_carriers: TransportManagementCarriersRecord;
	transport_management_driver_schedules: TransportManagementDriverSchedulesRecord;
	transport_management_drivers: TransportManagementDriversRecord;
	transport_management_expenses: TransportManagementExpensesRecord;
	transport_management_geofence: TransportManagementGeofenceRecord;
	transport_management_geofence_events: TransportManagementGeofenceEventsRecord;
	transport_management_gps_pings: TransportManagementGpsPingsRecord;
	transport_management_partner_invoice: TransportManagementPartnerInvoiceRecord;
	transport_management_partner_invoice_items: TransportManagementPartnerInvoiceItemsRecord;
	transport_management_proof_of_deliveries: TransportManagementProofOfDeliveriesRecord;
	transport_management_routes: TransportManagementRoutesRecord;
	transport_management_shipment_leg_events: TransportManagementShipmentLegEventsRecord;
	transport_management_shipment_legs: TransportManagementShipmentLegsRecord;
	transport_management_trip_stops: TransportManagementTripStopsRecord;
	transport_management_trips: TransportManagementTripsRecord;
	transport_management_vehicle_maintenance: TransportManagementVehicleMaintenanceRecord;
	transport_management_vehicles: TransportManagementVehiclesRecord;
	users: UsersRecord;
	warehouse_management_bin_threshold: WarehouseManagementBinThresholdRecord;
	warehouse_management_inbound_shipment_items: WarehouseManagementInboundShipmentItemsRecord;
	warehouse_management_inbound_shipments: WarehouseManagementInboundShipmentsRecord;
	warehouse_management_inventory_adjustment: WarehouseManagementInventoryAdjustmentRecord;
	warehouse_management_inventory_batches: WarehouseManagementInventoryBatchesRecord;
	warehouse_management_inventory_stock: WarehouseManagementInventoryStockRecord;
	warehouse_management_locations: WarehouseManagementLocationsRecord;
	warehouse_management_outbound_shipment_items: WarehouseManagementOutboundShipmentItemsRecord;
	warehouse_management_outbound_shipments: WarehouseManagementOutboundShipmentsRecord;
	warehouse_management_package_items: WarehouseManagementPackageItemsRecord;
	warehouse_management_packages: WarehouseManagementPackagesRecord;
	warehouse_management_pick_batch_items: WarehouseManagementPickBatchItemsRecord;
	warehouse_management_pick_batches: WarehouseManagementPickBatchesRecord;
	warehouse_management_products: WarehouseManagementProductsRecord;
	warehouse_management_putaway_rules: WarehouseManagementPutawayRulesRecord;
	warehouse_management_reorder_points: WarehouseManagementReorderPointsRecord;
	warehouse_management_return_items: WarehouseManagementReturnItemsRecord;
	warehouse_management_returns: WarehouseManagementReturnsRecord;
	warehouse_management_sales_order_items: WarehouseManagementSalesOrderItemsRecord;
	warehouse_management_sales_orders: WarehouseManagementSalesOrdersRecord;
	warehouse_management_stock_transfer: WarehouseManagementStockTransferRecord;
	warehouse_management_suppliers: WarehouseManagementSuppliersRecord;
	warehouse_management_task_items: WarehouseManagementTaskItemsRecord;
	warehouse_management_tasks: WarehouseManagementTasksRecord;
	warehouse_management_warehouses: WarehouseManagementWarehousesRecord;
};

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse;
	_externalAuths: ExternalauthsResponse;
	_mfas: MfasResponse;
	_otps: OtpsResponse;
	_superusers: SuperusersResponse;
	billing_management_account_transactions: BillingManagementAccountTransactionsResponse;
	billing_management_client_accounts: BillingManagementClientAccountsResponse;
	billing_management_credit_notes: BillingManagementCreditNotesResponse;
	billing_management_disputes: BillingManagementDisputesResponse;
	billing_management_invoice_line_items: BillingManagementInvoiceLineItemsResponse;
	billing_management_invoices: BillingManagementInvoicesResponse;
	billing_management_logs: BillingManagementLogsResponse;
	billing_management_payments: BillingManagementPaymentsResponse;
	billing_management_quotes: BillingManagementQuotesResponse;
	billing_management_rate_cards: BillingManagementRateCardsResponse;
	billing_management_rate_rules: BillingManagementRateRulesResponse;
	billing_management_surcharges: BillingManagementSurchargesResponse;
	customer_relations_campaigns: CustomerRelationsCampaignsResponse;
	customer_relations_cases: CustomerRelationsCasesResponse;
	customer_relations_companies: CustomerRelationsCompaniesResponse;
	customer_relations_contacts: CustomerRelationsContactsResponse;
	customer_relations_interactions: CustomerRelationsInteractionsResponse;
	customer_relations_invoice_items: CustomerRelationsInvoiceItemsResponse;
	customer_relations_invoices: CustomerRelationsInvoicesResponse;
	customer_relations_leads: CustomerRelationsLeadsResponse;
	customer_relations_opportunities: CustomerRelationsOpportunitiesResponse;
	customer_relations_opportunity_products: CustomerRelationsOpportunityProductsResponse;
	customer_relations_products: CustomerRelationsProductsResponse;
	delivery_management_driver_location: DeliveryManagementDriverLocationResponse;
	delivery_management_proof_of_deliveries: DeliveryManagementProofOfDeliveriesResponse;
	delivery_management_routes: DeliveryManagementRoutesResponse;
	delivery_management_task_events: DeliveryManagementTaskEventsResponse;
	delivery_management_tasks: DeliveryManagementTasksResponse;
	notifications: NotificationsResponse;
	transport_management_carrier_rates: TransportManagementCarrierRatesResponse;
	transport_management_carriers: TransportManagementCarriersResponse;
	transport_management_driver_schedules: TransportManagementDriverSchedulesResponse;
	transport_management_drivers: TransportManagementDriversResponse;
	transport_management_expenses: TransportManagementExpensesResponse;
	transport_management_geofence: TransportManagementGeofenceResponse;
	transport_management_geofence_events: TransportManagementGeofenceEventsResponse;
	transport_management_gps_pings: TransportManagementGpsPingsResponse;
	transport_management_partner_invoice: TransportManagementPartnerInvoiceResponse;
	transport_management_partner_invoice_items: TransportManagementPartnerInvoiceItemsResponse;
	transport_management_proof_of_deliveries: TransportManagementProofOfDeliveriesResponse;
	transport_management_routes: TransportManagementRoutesResponse;
	transport_management_shipment_leg_events: TransportManagementShipmentLegEventsResponse;
	transport_management_shipment_legs: TransportManagementShipmentLegsResponse;
	transport_management_trip_stops: TransportManagementTripStopsResponse;
	transport_management_trips: TransportManagementTripsResponse;
	transport_management_vehicle_maintenance: TransportManagementVehicleMaintenanceResponse;
	transport_management_vehicles: TransportManagementVehiclesResponse;
	users: UsersResponse;
	warehouse_management_bin_threshold: WarehouseManagementBinThresholdResponse;
	warehouse_management_inbound_shipment_items: WarehouseManagementInboundShipmentItemsResponse;
	warehouse_management_inbound_shipments: WarehouseManagementInboundShipmentsResponse;
	warehouse_management_inventory_adjustment: WarehouseManagementInventoryAdjustmentResponse;
	warehouse_management_inventory_batches: WarehouseManagementInventoryBatchesResponse;
	warehouse_management_inventory_stock: WarehouseManagementInventoryStockResponse;
	warehouse_management_locations: WarehouseManagementLocationsResponse;
	warehouse_management_outbound_shipment_items: WarehouseManagementOutboundShipmentItemsResponse;
	warehouse_management_outbound_shipments: WarehouseManagementOutboundShipmentsResponse;
	warehouse_management_package_items: WarehouseManagementPackageItemsResponse;
	warehouse_management_packages: WarehouseManagementPackagesResponse;
	warehouse_management_pick_batch_items: WarehouseManagementPickBatchItemsResponse;
	warehouse_management_pick_batches: WarehouseManagementPickBatchesResponse;
	warehouse_management_products: WarehouseManagementProductsResponse;
	warehouse_management_putaway_rules: WarehouseManagementPutawayRulesResponse;
	warehouse_management_reorder_points: WarehouseManagementReorderPointsResponse;
	warehouse_management_return_items: WarehouseManagementReturnItemsResponse;
	warehouse_management_returns: WarehouseManagementReturnsResponse;
	warehouse_management_sales_order_items: WarehouseManagementSalesOrderItemsResponse;
	warehouse_management_sales_orders: WarehouseManagementSalesOrdersResponse;
	warehouse_management_stock_transfer: WarehouseManagementStockTransferResponse;
	warehouse_management_suppliers: WarehouseManagementSuppliersResponse;
	warehouse_management_task_items: WarehouseManagementTaskItemsResponse;
	warehouse_management_tasks: WarehouseManagementTasksResponse;
	warehouse_management_warehouses: WarehouseManagementWarehousesResponse;
};

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<
	{
		// Omit AutoDate fields
		[K in keyof T as Extract<T[K], IsoAutoDateString> extends never
			? K
			: never]: // Convert FileNameString to File
		T[K] extends infer U
			? U extends FileNameString | FileNameString[]
				? U extends any[]
					? File[]
					: File
				: U
			: never;
	},
	"id"
>;

// Create type for Auth collections
export type CreateAuth<T> = {
	id?: RecordIdString;
	email: string;
	emailVisibility?: boolean;
	password: string;
	passwordConfirm: string;
	verified?: boolean;
} & ProcessCreateAndUpdateFields<T>;

// Create type for Base collections
export type CreateBase<T> = {
	id?: RecordIdString;
} & ProcessCreateAndUpdateFields<T>;

// Update type for Auth collections
export type UpdateAuth<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
> & {
	email?: string;
	emailVisibility?: boolean;
	oldPassword?: string;
	password?: string;
	passwordConfirm?: string;
	verified?: boolean;
};

// Update type for Base collections
export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>;

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>;

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>;

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T,
	): RecordService<CollectionResponses[T]>;
} & PocketBase;
