/* eslint-disable */
import { DocumentTypeDecoration } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
	  };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	Date: { input: any; output: any };
	File: { input: any; output: any };
};

export type AccountTransactions = {
	__typename?: "AccountTransactions";
	amount: Scalars["Float"]["output"];
	clientAccount: ClientAccounts;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	description?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	processedByUser?: Maybe<User>;
	referenceNumber?: Maybe<Scalars["String"]["output"]>;
	runningBalance?: Maybe<Scalars["Float"]["output"]>;
	sourceRecordId?: Maybe<Scalars["ID"]["output"]>;
	sourceRecordType?: Maybe<Scalars["String"]["output"]>;
	transactionDate?: Maybe<Scalars["String"]["output"]>;
	type: TransactionType;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type AccountingSyncFailedEvent = {
	__typename?: "AccountingSyncFailedEvent";
	errorMessage?: Maybe<Scalars["String"]["output"]>;
	sourceType: Scalars["String"]["output"];
	syncLogId: Scalars["ID"]["output"];
};

export type AccountingSyncLogs = {
	__typename?: "AccountingSyncLogs";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	errorMessage?: Maybe<Scalars["String"]["output"]>;
	externalId?: Maybe<Scalars["String"]["output"]>;
	externalSystem: Scalars["String"]["output"];
	id: Scalars["ID"]["output"];
	lastSyncAt?: Maybe<Scalars["String"]["output"]>;
	nextRetryAt?: Maybe<Scalars["String"]["output"]>;
	recordId: Scalars["ID"]["output"];
	recordType: Scalars["String"]["output"];
	requestPayload?: Maybe<Scalars["String"]["output"]>;
	responsePayload?: Maybe<Scalars["String"]["output"]>;
	retryCount?: Maybe<Scalars["Int"]["output"]>;
	status?: Maybe<SyncStatus>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type AccountingSyncSucceededEvent = {
	__typename?: "AccountingSyncSucceededEvent";
	sourceType: Scalars["String"]["output"];
	syncLogId: Scalars["ID"]["output"];
};

export type AccountingSyncTriggeredEvent = {
	__typename?: "AccountingSyncTriggeredEvent";
	sourceId: Scalars["ID"]["output"];
	sourceType: Scalars["String"]["output"];
	syncLogId: Scalars["ID"]["output"];
};

export type AddInvoiceItemInput = {
	productId: Scalars["ID"]["input"];
	quantity: Scalars["Float"]["input"];
};

export type AddOpportunityProductInput = {
	productId: Scalars["ID"]["input"];
	quantity: Scalars["Float"]["input"];
};

export type Attachments = {
	__typename?: "Attachments";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	fileName: Scalars["String"]["output"];
	filePath: Scalars["String"]["output"];
	id: Scalars["ID"]["output"];
	mimeType?: Maybe<Scalars["String"]["output"]>;
	recordId?: Maybe<Scalars["ID"]["output"]>;
	recordType?: Maybe<RecordType>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum BillingInvoiceStatus {
	Cancelled = "CANCELLED",
	Disputed = "DISPUTED",
	Draft = "DRAFT",
	Paid = "PAID",
	PartialPaid = "PARTIAL_PAID",
	PastDue = "PAST_DUE",
	Sent = "SENT",
	Viewed = "VIEWED",
	Void = "VOID",
}

export type BillingInvoices = {
	__typename?: "BillingInvoices";
	amountOutstanding?: Maybe<Scalars["Float"]["output"]>;
	amountPaid?: Maybe<Scalars["Float"]["output"]>;
	client: Companies;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	createdByUser?: Maybe<User>;
	creditNotes?: Maybe<Array<CreditNotes>>;
	currency?: Maybe<Scalars["String"]["output"]>;
	discountAmount?: Maybe<Scalars["Float"]["output"]>;
	dueDate: Scalars["String"]["output"];
	id: Scalars["ID"]["output"];
	invoiceNumber: Scalars["String"]["output"];
	issueDate: Scalars["String"]["output"];
	lineItems?: Maybe<Array<InvoiceLineItems>>;
	notes?: Maybe<Scalars["String"]["output"]>;
	paidAt?: Maybe<Scalars["String"]["output"]>;
	paymentTerms?: Maybe<Scalars["String"]["output"]>;
	payments?: Maybe<Array<Payments>>;
	quote?: Maybe<Quotes>;
	sentAt?: Maybe<Scalars["String"]["output"]>;
	status?: Maybe<BillingInvoiceStatus>;
	subtotal?: Maybe<Scalars["Float"]["output"]>;
	taxAmount?: Maybe<Scalars["Float"]["output"]>;
	totalAmount: Scalars["Float"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type BillingMutation = {
	__typename?: "BillingMutation";
	addInvoiceLineItem: InvoiceLineItems;
	createAccountTransaction: AccountTransactions;
	createAccountingSyncLog: AccountingSyncLogs;
	createBillingInvoice: BillingInvoices;
	createClientAccount: ClientAccounts;
	createCreditNote: CreditNotes;
	createDispute: Disputes;
	createDocument: Documents;
	createPayment: Payments;
	createQuote: Quotes;
	createRateCard: RateCards;
	createRateRule: RateRules;
	createSurcharge: Surcharges;
	removeBillingInvoice: DeleteResult;
	removeClientAccount: DeleteResult;
	removeCreditNote: DeleteResult;
	removeDocument: DeleteResult;
	removeInvoiceLineItem: DeleteResult;
	removePayment: DeleteResult;
	removeQuote: DeleteResult;
	removeRateCard: DeleteResult;
	removeRateRule: DeleteResult;
	removeSurcharge: DeleteResult;
	updateBillingInvoice: BillingInvoices;
	updateClientAccount: ClientAccounts;
	updateCreditNote: CreditNotes;
	updateDispute: Disputes;
	updateDocument: Documents;
	updateInvoiceLineItem: InvoiceLineItems;
	updatePayment: Payments;
	updateQuote: Quotes;
	updateRateCard: RateCards;
	updateRateRule: RateRules;
	updateSurcharge: Surcharges;
};

export type BillingMutationAddInvoiceLineItemArgs = {
	id: Scalars["ID"]["input"];
	value: CreateInvoiceLineItemInput;
};

export type BillingMutationCreateAccountTransactionArgs = {
	value: CreateAccountTransactionInput;
};

export type BillingMutationCreateAccountingSyncLogArgs = {
	value: CreateAccountingSyncLogInput;
};

export type BillingMutationCreateBillingInvoiceArgs = {
	value: CreateBillingInvoiceInput;
};

export type BillingMutationCreateClientAccountArgs = {
	value: CreateClientAccountInput;
};

export type BillingMutationCreateCreditNoteArgs = {
	value: CreateCreditNoteInput;
};

export type BillingMutationCreateDisputeArgs = {
	value: CreateDisputeInput;
};

export type BillingMutationCreateDocumentArgs = {
	value: CreateDocumentInput;
};

export type BillingMutationCreatePaymentArgs = {
	value: CreatePaymentInput;
};

export type BillingMutationCreateQuoteArgs = {
	value: CreateQuoteInput;
};

export type BillingMutationCreateRateCardArgs = {
	value: CreateRateCardInput;
};

export type BillingMutationCreateRateRuleArgs = {
	value: CreateRateRuleInput;
};

export type BillingMutationCreateSurchargeArgs = {
	value: CreateSurchargeInput;
};

export type BillingMutationRemoveBillingInvoiceArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingMutationRemoveClientAccountArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingMutationRemoveCreditNoteArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingMutationRemoveDocumentArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingMutationRemoveInvoiceLineItemArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingMutationRemovePaymentArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingMutationRemoveQuoteArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingMutationRemoveRateCardArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingMutationRemoveRateRuleArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingMutationRemoveSurchargeArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingMutationUpdateBillingInvoiceArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateBillingInvoiceInput>;
};

export type BillingMutationUpdateClientAccountArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateClientAccountInput>;
};

export type BillingMutationUpdateCreditNoteArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateCreditNoteInput>;
};

export type BillingMutationUpdateDisputeArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateDisputeInput>;
};

export type BillingMutationUpdateDocumentArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateDocumentInput>;
};

export type BillingMutationUpdateInvoiceLineItemArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateInvoiceLineItemInput>;
};

export type BillingMutationUpdatePaymentArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdatePaymentInput>;
};

export type BillingMutationUpdateQuoteArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateQuoteInput>;
};

export type BillingMutationUpdateRateCardArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateRateCardInput>;
};

export type BillingMutationUpdateRateRuleArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateRateRuleInput>;
};

export type BillingMutationUpdateSurchargeArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateSurchargeInput>;
};

export type BillingQuery = {
	__typename?: "BillingQuery";
	accountTransaction: AccountTransactions;
	accountTransactions: Array<AccountTransactions>;
	accountingSyncLog: AccountingSyncLogs;
	accountingSyncLogs: Array<AccountingSyncLogs>;
	billingInvoice: BillingInvoices;
	billingInvoices: Array<BillingInvoices>;
	clientAccount: ClientAccounts;
	clientAccounts: Array<ClientAccounts>;
	creditNote: CreditNotes;
	creditNotes: Array<CreditNotes>;
	dispute: Disputes;
	disputes: Array<Disputes>;
	document: Documents;
	documents: Array<Documents>;
	payment: Payments;
	payments: Array<Payments>;
	quote: Quotes;
	quotes: Array<Quotes>;
	rateCard: RateCards;
	rateCards: Array<RateCards>;
	rateRule: RateRules;
	rateRules: Array<RateRules>;
	surcharge: Surcharges;
	surcharges: Array<Surcharges>;
};

export type BillingQueryAccountTransactionArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingQueryAccountTransactionsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
	type?: InputMaybe<TransactionType>;
};

export type BillingQueryAccountingSyncLogArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingQueryAccountingSyncLogsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<SyncStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type BillingQueryBillingInvoiceArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingQueryBillingInvoicesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<BillingInvoiceStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type BillingQueryClientAccountArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingQueryClientAccountsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type BillingQueryCreditNoteArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingQueryCreditNotesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type BillingQueryDisputeArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingQueryDisputesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<DisputeStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type BillingQueryDocumentArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingQueryDocumentsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type BillingQueryPaymentArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingQueryPaymentsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	paymentMethod?: InputMaybe<PaymentMethod>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<PaymentStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type BillingQueryQuoteArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingQueryQuotesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<QuoteStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type BillingQueryRateCardArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingQueryRateCardsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	serviceType?: InputMaybe<ServiceType>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type BillingQueryRateRuleArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingQueryRateRulesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	pricingModel?: InputMaybe<PricingModel>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type BillingQuerySurchargeArgs = {
	id: Scalars["ID"]["input"];
};

export type BillingQuerySurchargesArgs = {
	calculationMethod?: InputMaybe<SurchargeCalculationMethod>;
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type BinThresholds = {
	__typename?: "BinThresholds";
	alertThreshold?: Maybe<Scalars["Int"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	isActive?: Maybe<Scalars["Boolean"]["output"]>;
	location: Locations;
	maxQuantity: Scalars["Int"]["output"];
	minQuantity: Scalars["Int"]["output"];
	product: WmsProducts;
	reorderQuantity?: Maybe<Scalars["Int"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type Campaigns = {
	__typename?: "Campaigns";
	budget?: Maybe<Scalars["Float"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	endDate?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	name: Scalars["String"]["output"];
	startDate: Scalars["Date"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum CarrierRateUnit {
	FlatRate = "FLAT_RATE",
	PerContainer = "PER_CONTAINER",
	PerKg = "PER_KG",
	PerKm = "PER_KM",
	PerMile = "PER_MILE",
}

export type CarrierRates = {
	__typename?: "CarrierRates";
	carrier: Carriers;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	destination?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	origin?: Maybe<Scalars["String"]["output"]>;
	rate: Scalars["Float"]["output"];
	serviceType?: Maybe<Scalars["String"]["output"]>;
	unit?: Maybe<CarrierRateUnit>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type Carriers = {
	__typename?: "Carriers";
	contactEmail?: Maybe<Scalars["String"]["output"]>;
	contactPerson?: Maybe<Scalars["String"]["output"]>;
	contactPhone?: Maybe<Scalars["String"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	name: Scalars["String"]["output"];
	partnerInvoices?: Maybe<Array<PartnerInvoices>>;
	rates?: Maybe<Array<CarrierRates>>;
	servicesOffered?: Maybe<Scalars["String"]["output"]>;
	shipmentLegs?: Maybe<Array<ShipmentLegs>>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum CasePriority {
	Critical = "CRITICAL",
	High = "HIGH",
	Low = "LOW",
	Medium = "MEDIUM",
}

export enum CaseStatus {
	Cancelled = "CANCELLED",
	Closed = "CLOSED",
	Escalated = "ESCALATED",
	InProgress = "IN_PROGRESS",
	New = "NEW",
	Resolved = "RESOLVED",
	WaitingForCustomer = "WAITING_FOR_CUSTOMER",
	WaitingForInternal = "WAITING_FOR_INTERNAL",
}

export enum CaseType {
	BugReport = "BUG_REPORT",
	Complaint = "COMPLAINT",
	FeatureRequest = "FEATURE_REQUEST",
	Problem = "PROBLEM",
	Question = "QUESTION",
	TechnicalSupport = "TECHNICAL_SUPPORT",
}

export type Cases = {
	__typename?: "Cases";
	caseNumber: Scalars["String"]["output"];
	contact?: Maybe<Contacts>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	description?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	owner?: Maybe<User>;
	priority?: Maybe<CasePriority>;
	status?: Maybe<CaseStatus>;
	type?: Maybe<CaseType>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type ClientAccountBalanceUpdatedEvent = {
	__typename?: "ClientAccountBalanceUpdatedEvent";
	clientId: Scalars["ID"]["output"];
	newAvailableCredit: Scalars["String"]["output"];
	newWalletBalance: Scalars["String"]["output"];
};

export type ClientAccountLastPaymentDateUpdatedEvent = {
	__typename?: "ClientAccountLastPaymentDateUpdatedEvent";
	clientId: Scalars["ID"]["output"];
	lastPaymentDate: Scalars["String"]["output"];
	paymentId: Scalars["ID"]["output"];
};

export type ClientAccounts = {
	__typename?: "ClientAccounts";
	availableCredit?: Maybe<Scalars["Float"]["output"]>;
	client: Companies;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	creditLimit?: Maybe<Scalars["Float"]["output"]>;
	currency?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	isCreditApproved?: Maybe<Scalars["Boolean"]["output"]>;
	lastPaymentDate?: Maybe<Scalars["String"]["output"]>;
	paymentTermsDays?: Maybe<Scalars["Int"]["output"]>;
	transactions?: Maybe<Array<AccountTransactions>>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	walletBalance?: Maybe<Scalars["Float"]["output"]>;
};

export type Companies = {
	__typename?: "Companies";
	annualRevenue?: Maybe<Scalars["Float"]["output"]>;
	billingInvoices?: Maybe<Array<BillingInvoices>>;
	city?: Maybe<Scalars["String"]["output"]>;
	clientAccount?: Maybe<ClientAccounts>;
	country?: Maybe<Scalars["String"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	disputes?: Maybe<Array<Disputes>>;
	id: Scalars["ID"]["output"];
	inboundShipments?: Maybe<Array<InboundShipments>>;
	industry?: Maybe<Scalars["String"]["output"]>;
	name: Scalars["String"]["output"];
	owner?: Maybe<User>;
	phoneNumber?: Maybe<Scalars["String"]["output"]>;
	postalCode?: Maybe<Scalars["String"]["output"]>;
	putawayRules?: Maybe<Array<PutawayRules>>;
	quotes?: Maybe<Array<Quotes>>;
	returns?: Maybe<Array<Returns>>;
	salesOrders?: Maybe<Array<SalesOrders>>;
	state?: Maybe<Scalars["String"]["output"]>;
	street?: Maybe<Scalars["String"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	website?: Maybe<Scalars["String"]["output"]>;
};

export type Contacts = {
	__typename?: "Contacts";
	company: Companies;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	email?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	jobTitle?: Maybe<Scalars["String"]["output"]>;
	name: Scalars["String"]["output"];
	owner?: Maybe<User>;
	phoneNumber?: Maybe<Scalars["String"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type CreateAccountTransactionInput = {
	amount: Scalars["Float"]["input"];
	clientAccountId: Scalars["ID"]["input"];
	description?: InputMaybe<Scalars["String"]["input"]>;
	processedByUserId?: InputMaybe<Scalars["ID"]["input"]>;
	referenceNumber?: InputMaybe<Scalars["String"]["input"]>;
	runningBalance?: InputMaybe<Scalars["Float"]["input"]>;
	sourceRecordId?: InputMaybe<Scalars["ID"]["input"]>;
	sourceRecordType?: InputMaybe<Scalars["String"]["input"]>;
	transactionDate?: InputMaybe<Scalars["String"]["input"]>;
	type: TransactionType;
};

export type CreateAccountingSyncLogInput = {
	errorMessage?: InputMaybe<Scalars["String"]["input"]>;
	externalId?: InputMaybe<Scalars["String"]["input"]>;
	externalSystem: Scalars["String"]["input"];
	lastSyncAt?: InputMaybe<Scalars["String"]["input"]>;
	nextRetryAt?: InputMaybe<Scalars["String"]["input"]>;
	recordId: Scalars["ID"]["input"];
	recordType: Scalars["String"]["input"];
	requestPayload?: InputMaybe<Scalars["String"]["input"]>;
	responsePayload?: InputMaybe<Scalars["String"]["input"]>;
	retryCount?: InputMaybe<Scalars["Int"]["input"]>;
	status?: InputMaybe<SyncStatus>;
};

export type CreateAttachmentInput = {
	file: Scalars["File"]["input"];
	recordId: Scalars["ID"]["input"];
	recordType: RecordType;
};

export type CreateBillingInvoiceInput = {
	clientId: Scalars["ID"]["input"];
	createdByUserId?: InputMaybe<Scalars["ID"]["input"]>;
	currency?: InputMaybe<Scalars["String"]["input"]>;
	dueDate: Scalars["String"]["input"];
	invoiceNumber: Scalars["String"]["input"];
	issueDate: Scalars["String"]["input"];
	items: Array<CreateInvoiceLineItemInput>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	paymentTerms?: InputMaybe<Scalars["String"]["input"]>;
	quoteId?: InputMaybe<Scalars["ID"]["input"]>;
	sentAt?: InputMaybe<Scalars["Date"]["input"]>;
	status?: InputMaybe<BillingInvoiceStatus>;
};

export type CreateBinThresholdInput = {
	alertThreshold?: InputMaybe<Scalars["Int"]["input"]>;
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
	locationId: Scalars["ID"]["input"];
	maxQuantity: Scalars["Int"]["input"];
	minQuantity: Scalars["Int"]["input"];
	productId: Scalars["ID"]["input"];
	reorderQuantity?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CreateCampaignInput = {
	budget?: InputMaybe<Scalars["Float"]["input"]>;
	endDate?: InputMaybe<Scalars["Date"]["input"]>;
	name: Scalars["String"]["input"];
	startDate: Scalars["Date"]["input"];
};

export type CreateCarrierInput = {
	contactEmail?: InputMaybe<Scalars["String"]["input"]>;
	contactPerson?: InputMaybe<Scalars["String"]["input"]>;
	contactPhone?: InputMaybe<Scalars["String"]["input"]>;
	name: Scalars["String"]["input"];
	servicesOffered?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateCarrierRateInput = {
	carrierId: Scalars["ID"]["input"];
	destination?: InputMaybe<Scalars["String"]["input"]>;
	origin?: InputMaybe<Scalars["String"]["input"]>;
	rate: Scalars["Float"]["input"];
	serviceType?: InputMaybe<Scalars["String"]["input"]>;
	unit?: InputMaybe<CarrierRateUnit>;
};

export type CreateCaseInput = {
	caseNumber: Scalars["String"]["input"];
	contactId?: InputMaybe<Scalars["ID"]["input"]>;
	description?: InputMaybe<Scalars["String"]["input"]>;
	ownerId: Scalars["ID"]["input"];
	priority?: InputMaybe<CasePriority>;
	status?: InputMaybe<CaseStatus>;
	type?: InputMaybe<CaseType>;
};

export type CreateClientAccountInput = {
	availableCredit?: InputMaybe<Scalars["Float"]["input"]>;
	clientId: Scalars["ID"]["input"];
	creditLimit?: InputMaybe<Scalars["Float"]["input"]>;
	currency?: InputMaybe<Scalars["String"]["input"]>;
	isCreditApproved?: InputMaybe<Scalars["Boolean"]["input"]>;
	lastPaymentDate?: InputMaybe<Scalars["String"]["input"]>;
	paymentTermsDays?: InputMaybe<Scalars["Int"]["input"]>;
	walletBalance?: InputMaybe<Scalars["Float"]["input"]>;
};

export type CreateCompanyInput = {
	annualRevenue?: InputMaybe<Scalars["Float"]["input"]>;
	city?: InputMaybe<Scalars["String"]["input"]>;
	country?: InputMaybe<Scalars["String"]["input"]>;
	industry?: InputMaybe<Scalars["String"]["input"]>;
	name: Scalars["String"]["input"];
	ownerId?: InputMaybe<Scalars["ID"]["input"]>;
	phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
	postalCode?: InputMaybe<Scalars["String"]["input"]>;
	state?: InputMaybe<Scalars["String"]["input"]>;
	street?: InputMaybe<Scalars["String"]["input"]>;
	website?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateContactInput = {
	companyId: Scalars["ID"]["input"];
	email: Scalars["String"]["input"];
	jobTitle?: InputMaybe<Scalars["String"]["input"]>;
	name: Scalars["String"]["input"];
	ownerId: Scalars["ID"]["input"];
	phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateCreditNoteInput = {
	amount: Scalars["Float"]["input"];
	appliedAt?: InputMaybe<Scalars["String"]["input"]>;
	createdByUserId?: InputMaybe<Scalars["ID"]["input"]>;
	creditNoteNumber: Scalars["String"]["input"];
	currency?: InputMaybe<Scalars["String"]["input"]>;
	disputeId?: InputMaybe<Scalars["ID"]["input"]>;
	invoiceId: Scalars["ID"]["input"];
	issueDate: Scalars["String"]["input"];
	notes?: InputMaybe<Scalars["String"]["input"]>;
	reason: Scalars["String"]["input"];
};

export type CreateCustomerTrackingLinkInput = {
	deliveryTaskId: Scalars["ID"]["input"];
	expiresAt?: InputMaybe<Scalars["String"]["input"]>;
	trackingToken: Scalars["String"]["input"];
};

export type CreateDeliveryRouteInput = {
	driverId: Scalars["ID"]["input"];
	estimatedDurationMinutes?: InputMaybe<Scalars["Int"]["input"]>;
	optimizedRouteData?: InputMaybe<Scalars["String"]["input"]>;
	routeDate: Scalars["String"]["input"];
	startedAt?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<DeliveryRouteStatus>;
	totalDistanceKm?: InputMaybe<Scalars["Float"]["input"]>;
};

export type CreateDeliveryTaskInput = {
	actualArrivalTime?: InputMaybe<Scalars["String"]["input"]>;
	deliveryAddress: Scalars["String"]["input"];
	deliveryInstructions?: InputMaybe<Scalars["String"]["input"]>;
	deliveryRouteId: Scalars["ID"]["input"];
	estimatedArrivalTime?: InputMaybe<Scalars["String"]["input"]>;
	packageId: Scalars["ID"]["input"];
	recipientName?: InputMaybe<Scalars["String"]["input"]>;
	recipientPhone?: InputMaybe<Scalars["String"]["input"]>;
	routeSequence: Scalars["Int"]["input"];
	status?: InputMaybe<DeliveryTaskStatus>;
};

export type CreateDisputeInput = {
	clientId: Scalars["ID"]["input"];
	disputedAmount?: InputMaybe<Scalars["Float"]["input"]>;
	lineItemId: Scalars["ID"]["input"];
	reason: Scalars["String"]["input"];
	resolutionNotes?: InputMaybe<Scalars["String"]["input"]>;
	resolvedAt?: InputMaybe<Scalars["String"]["input"]>;
	resolvedByUserId?: InputMaybe<Scalars["ID"]["input"]>;
	status?: InputMaybe<DisputeStatus>;
};

export type CreateDmsProofOfDeliveryInput = {
	deliveryTaskId: Scalars["ID"]["input"];
	file?: InputMaybe<Scalars["File"]["input"]>;
	latitude?: InputMaybe<Scalars["Float"]["input"]>;
	longitude?: InputMaybe<Scalars["Float"]["input"]>;
	recipientName?: InputMaybe<Scalars["String"]["input"]>;
	signatureData?: InputMaybe<Scalars["String"]["input"]>;
	timestamp?: InputMaybe<Scalars["String"]["input"]>;
	type: ProofOfDeliveryType;
	verificationCode?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateDocumentInput = {
	documentType: DocumentType;
	fileName: Scalars["String"]["input"];
	filePath: Scalars["String"]["input"];
	fileSize?: InputMaybe<Scalars["Int"]["input"]>;
	mimeType?: InputMaybe<Scalars["String"]["input"]>;
	recordId: Scalars["ID"]["input"];
	recordType: Scalars["String"]["input"];
	uploadedByUserId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type CreateDriverInput = {
	contactPhone?: InputMaybe<Scalars["String"]["input"]>;
	licenseExpiryDate?: InputMaybe<Scalars["String"]["input"]>;
	licenseNumber: Scalars["String"]["input"];
	status?: InputMaybe<DriverStatus>;
	userId: Scalars["ID"]["input"];
};

export type CreateDriverLocationInput = {
	accuracy?: InputMaybe<Scalars["Float"]["input"]>;
	altitude?: InputMaybe<Scalars["Float"]["input"]>;
	driverId: Scalars["ID"]["input"];
	heading?: InputMaybe<Scalars["Float"]["input"]>;
	latitude: Scalars["Float"]["input"];
	longitude: Scalars["Float"]["input"];
	speedKmh?: InputMaybe<Scalars["Float"]["input"]>;
};

export type CreateDriverScheduleInput = {
	driverId: Scalars["ID"]["input"];
	endDate: Scalars["String"]["input"];
	reason?: InputMaybe<DriverScheduleReason>;
	startDate: Scalars["String"]["input"];
};

export type CreateExpenseInput = {
	amount: Scalars["Float"]["input"];
	currency?: InputMaybe<Currency>;
	description?: InputMaybe<Scalars["String"]["input"]>;
	driverId?: InputMaybe<Scalars["ID"]["input"]>;
	expenseDate?: InputMaybe<Scalars["Date"]["input"]>;
	fuelQuantity?: InputMaybe<Scalars["Float"]["input"]>;
	odometerReading?: InputMaybe<Scalars["Int"]["input"]>;
	receiptUrl?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<ExpenseStatus>;
	tripId?: InputMaybe<Scalars["ID"]["input"]>;
	type?: InputMaybe<ExpenseType>;
};

export type CreateGeofenceEventInput = {
	eventType: GeofenceEventType;
	geofenceId: Scalars["ID"]["input"];
	timestamp: Scalars["String"]["input"];
	vehicleId: Scalars["ID"]["input"];
};

export type CreateGeofenceInput = {
	latitude?: InputMaybe<Scalars["Float"]["input"]>;
	longitude?: InputMaybe<Scalars["Float"]["input"]>;
	name: Scalars["String"]["input"];
};

export type CreateGpsPingInput = {
	latitude: Scalars["Float"]["input"];
	longitude: Scalars["Float"]["input"];
	timestamp: Scalars["Date"]["input"];
	vehicleId: Scalars["ID"]["input"];
};

export type CreateInboundShipmentInput = {
	clientId?: InputMaybe<Scalars["ID"]["input"]>;
	expectedArrivalDate?: InputMaybe<Scalars["String"]["input"]>;
	items: Array<CreateInboundShipmentItemInput>;
	status?: InputMaybe<InboundShipmentStatus>;
	warehouseId: Scalars["ID"]["input"];
};

export type CreateInboundShipmentItemInput = {
	expectedQuantity: Scalars["Int"]["input"];
	productId: Scalars["ID"]["input"];
};

export type CreateInteractionInput = {
	caseId?: InputMaybe<Scalars["ID"]["input"]>;
	contactId: Scalars["ID"]["input"];
	interactionDate?: InputMaybe<Scalars["Date"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	outcome?: InputMaybe<InteractionOutcome>;
	type?: InputMaybe<InteractionType>;
	userId: Scalars["ID"]["input"];
};

export type CreateInventoryAdjustmentInput = {
	notes?: InputMaybe<Scalars["String"]["input"]>;
	productId: Scalars["ID"]["input"];
	quantityChange: Scalars["Int"]["input"];
	reason?: InputMaybe<InventoryAdjustmentReason>;
	userId: Scalars["ID"]["input"];
	warehouseId: Scalars["ID"]["input"];
};

export type CreateInventoryBatchInput = {
	batchNumber: Scalars["String"]["input"];
	expirationDate?: InputMaybe<Scalars["Date"]["input"]>;
	productId: Scalars["ID"]["input"];
};

export type CreateInventoryStockInput = {
	batchId?: InputMaybe<Scalars["ID"]["input"]>;
	locationId: Scalars["ID"]["input"];
	productId: Scalars["ID"]["input"];
	quantity: Scalars["Int"]["input"];
	reservedQuantity: Scalars["Int"]["input"];
	status?: InputMaybe<InventoryStockStatus>;
};

export type CreateInvoiceInput = {
	dueDate: Scalars["Date"]["input"];
	issueDate: Scalars["Date"]["input"];
	items: Array<CreateInvoiceItemInput>;
	opportunityId: Scalars["ID"]["input"];
	paidAt?: InputMaybe<Scalars["Date"]["input"]>;
	paymentMethod?: InputMaybe<CrmInvoicePaymentMethod>;
	status?: InputMaybe<InvoiceStatus>;
};

export type CreateInvoiceItemInput = {
	productId: Scalars["ID"]["input"];
	quantity: Scalars["Float"]["input"];
};

export type CreateInvoiceLineItemInput = {
	description: Scalars["String"]["input"];
	discountRate?: InputMaybe<Scalars["Float"]["input"]>;
	quantity: Scalars["Float"]["input"];
	sourceRecordId?: InputMaybe<Scalars["ID"]["input"]>;
	sourceRecordType?: InputMaybe<Scalars["String"]["input"]>;
	taxRate?: InputMaybe<Scalars["Float"]["input"]>;
	unitPrice: Scalars["Float"]["input"];
};

export type CreateLeadInput = {
	campaignId?: InputMaybe<Scalars["ID"]["input"]>;
	email: Scalars["String"]["input"];
	leadScore?: InputMaybe<Scalars["Int"]["input"]>;
	leadSource?: InputMaybe<LeadSource>;
	name: Scalars["String"]["input"];
	ownerId: Scalars["ID"]["input"];
	status?: InputMaybe<LeadStatus>;
};

export type CreateLocationInput = {
	barcode?: InputMaybe<Scalars["String"]["input"]>;
	hazmatApproved?: InputMaybe<Scalars["Boolean"]["input"]>;
	isPickable?: InputMaybe<Scalars["Boolean"]["input"]>;
	isReceivable?: InputMaybe<Scalars["Boolean"]["input"]>;
	level?: InputMaybe<Scalars["Int"]["input"]>;
	maxPallets?: InputMaybe<Scalars["Int"]["input"]>;
	maxVolume?: InputMaybe<Scalars["Float"]["input"]>;
	maxWeight?: InputMaybe<Scalars["Float"]["input"]>;
	name: Scalars["String"]["input"];
	parentLocationId?: InputMaybe<Scalars["ID"]["input"]>;
	path?: InputMaybe<Scalars["String"]["input"]>;
	temperatureControlled?: InputMaybe<Scalars["Boolean"]["input"]>;
	type: LocationType;
	warehouseId: Scalars["ID"]["input"];
	xCoordinate?: InputMaybe<Scalars["Float"]["input"]>;
	yCoordinate?: InputMaybe<Scalars["Float"]["input"]>;
	zCoordinate?: InputMaybe<Scalars["Float"]["input"]>;
};

export type CreateNotificationInput = {
	isRead?: InputMaybe<Scalars["Boolean"]["input"]>;
	link?: InputMaybe<Scalars["String"]["input"]>;
	message: Scalars["String"]["input"];
	userId: Scalars["ID"]["input"];
};

export type CreateOpportunityInput = {
	campaignId?: InputMaybe<Scalars["ID"]["input"]>;
	companyId?: InputMaybe<Scalars["ID"]["input"]>;
	contactId?: InputMaybe<Scalars["ID"]["input"]>;
	dealValue?: InputMaybe<Scalars["Float"]["input"]>;
	expectedCloseDate?: InputMaybe<Scalars["Date"]["input"]>;
	lostReason?: InputMaybe<Scalars["String"]["input"]>;
	name: Scalars["String"]["input"];
	ownerId: Scalars["ID"]["input"];
	probability?: InputMaybe<Scalars["Float"]["input"]>;
	products: Array<CreateOpportunityProductInput>;
	source: OpportunitySource;
	stage: OpportunityStage;
};

export type CreateOpportunityProductInput = {
	productId: Scalars["ID"]["input"];
	quantity: Scalars["Float"]["input"];
};

export type CreateOutboundShipmentInput = {
	carrier?: InputMaybe<Scalars["String"]["input"]>;
	items: Array<CreateOutboundShipmentItemInput>;
	salesOrderId: Scalars["ID"]["input"];
	status?: InputMaybe<OutboundShipmentStatus>;
	trackingNumber?: InputMaybe<Scalars["String"]["input"]>;
	warehouseId: Scalars["ID"]["input"];
};

export type CreateOutboundShipmentItemInput = {
	batchId?: InputMaybe<Scalars["ID"]["input"]>;
	productId: Scalars["ID"]["input"];
	quantityShipped: Scalars["Int"]["input"];
	salesOrderItemId: Scalars["ID"]["input"];
};

export type CreatePackageInput = {
	carrier?: InputMaybe<Scalars["String"]["input"]>;
	height?: InputMaybe<Scalars["Float"]["input"]>;
	insuranceValue?: InputMaybe<Scalars["Float"]["input"]>;
	isFragile?: InputMaybe<Scalars["Boolean"]["input"]>;
	isHazmat?: InputMaybe<Scalars["Boolean"]["input"]>;
	length?: InputMaybe<Scalars["Float"]["input"]>;
	packageNumber: Scalars["String"]["input"];
	packageType?: InputMaybe<Scalars["String"]["input"]>;
	packedAt?: InputMaybe<Scalars["String"]["input"]>;
	packedByUserId?: InputMaybe<Scalars["ID"]["input"]>;
	requiresSignature?: InputMaybe<Scalars["Boolean"]["input"]>;
	salesOrderId: Scalars["ID"]["input"];
	serviceLevel?: InputMaybe<Scalars["String"]["input"]>;
	shippedAt?: InputMaybe<Scalars["String"]["input"]>;
	trackingNumber?: InputMaybe<Scalars["String"]["input"]>;
	warehouseId: Scalars["ID"]["input"];
	weight?: InputMaybe<Scalars["Float"]["input"]>;
	width?: InputMaybe<Scalars["Float"]["input"]>;
};

export type CreatePackageItemInput = {
	batchId?: InputMaybe<Scalars["ID"]["input"]>;
	expiryDate?: InputMaybe<Scalars["String"]["input"]>;
	lotNumber?: InputMaybe<Scalars["String"]["input"]>;
	packageId: Scalars["ID"]["input"];
	productId: Scalars["ID"]["input"];
	quantity: Scalars["Int"]["input"];
	serialNumbers: Array<Scalars["String"]["input"]>;
	unitWeight?: InputMaybe<Scalars["Float"]["input"]>;
};

export type CreatePartnerInvoiceInput = {
	carrierId: Scalars["ID"]["input"];
	invoiceDate: Scalars["String"]["input"];
	invoiceNumber: Scalars["String"]["input"];
	items: Array<CreatePartnerInvoiceItemInput>;
	status?: InputMaybe<PartnerInvoiceStatus>;
};

export type CreatePartnerInvoiceItemInput = {
	amount: Scalars["Float"]["input"];
	shipmentLegId: Scalars["ID"]["input"];
};

export type CreatePaymentInput = {
	amount: Scalars["Float"]["input"];
	currency?: InputMaybe<Scalars["String"]["input"]>;
	exchangeRate?: InputMaybe<Scalars["Float"]["input"]>;
	fees?: InputMaybe<Scalars["Float"]["input"]>;
	gatewayReference?: InputMaybe<Scalars["String"]["input"]>;
	invoiceId: Scalars["ID"]["input"];
	notes?: InputMaybe<Scalars["String"]["input"]>;
	paymentDate?: InputMaybe<Scalars["String"]["input"]>;
	paymentMethod: PaymentMethod;
	processedAt?: InputMaybe<Scalars["String"]["input"]>;
	processedByUserId?: InputMaybe<Scalars["ID"]["input"]>;
	status?: InputMaybe<PaymentStatus>;
	transactionId?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreatePickBatchInput = {
	assignedUserId?: InputMaybe<Scalars["ID"]["input"]>;
	batchNumber: Scalars["String"]["input"];
	estimatedDuration?: InputMaybe<Scalars["Int"]["input"]>;
	items: Array<CreatePickBatchItemInput>;
	priority?: InputMaybe<Scalars["Int"]["input"]>;
	startedAt?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<PickBatchStatus>;
	strategy: PickStrategy;
	warehouseId: Scalars["ID"]["input"];
	waveId?: InputMaybe<Scalars["String"]["input"]>;
	zoneRestrictions: Array<Scalars["String"]["input"]>;
};

export type CreatePickBatchItemInput = {
	actualPickTime?: InputMaybe<Scalars["Int"]["input"]>;
	estimatedPickTime?: InputMaybe<Scalars["Int"]["input"]>;
	orderPriority?: InputMaybe<Scalars["Int"]["input"]>;
	salesOrderId: Scalars["ID"]["input"];
};

export type CreateProductInput = {
	description?: InputMaybe<Scalars["String"]["input"]>;
	name: Scalars["String"]["input"];
	price: Scalars["Float"]["input"];
	sku?: InputMaybe<Scalars["String"]["input"]>;
	type?: InputMaybe<ProductType>;
};

export type CreateProofOfDeliveryInput = {
	files: Array<Scalars["File"]["input"]>;
	latitude?: InputMaybe<Scalars["Float"]["input"]>;
	longitude?: InputMaybe<Scalars["Float"]["input"]>;
	tripStopId: Scalars["ID"]["input"];
	type?: InputMaybe<ProofType>;
};

export type CreatePutawayRuleInput = {
	clientId?: InputMaybe<Scalars["ID"]["input"]>;
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
	locationType?: InputMaybe<LocationType>;
	maxQuantity?: InputMaybe<Scalars["Int"]["input"]>;
	minQuantity?: InputMaybe<Scalars["Int"]["input"]>;
	preferredLocationId?: InputMaybe<Scalars["ID"]["input"]>;
	priority: Scalars["Int"]["input"];
	productId: Scalars["ID"]["input"];
	requiresHazmatApproval?: InputMaybe<Scalars["Boolean"]["input"]>;
	requiresTemperatureControl?: InputMaybe<Scalars["Boolean"]["input"]>;
	volumeThreshold?: InputMaybe<Scalars["Float"]["input"]>;
	warehouseId: Scalars["ID"]["input"];
	weightThreshold?: InputMaybe<Scalars["Float"]["input"]>;
};

export type CreateQuoteInput = {
	clientId?: InputMaybe<Scalars["ID"]["input"]>;
	createdByUserId?: InputMaybe<Scalars["ID"]["input"]>;
	destinationDetails: Scalars["String"]["input"];
	expiresAt?: InputMaybe<Scalars["String"]["input"]>;
	height?: InputMaybe<Scalars["Float"]["input"]>;
	length?: InputMaybe<Scalars["Float"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	originDetails: Scalars["String"]["input"];
	quoteNumber?: InputMaybe<Scalars["String"]["input"]>;
	quotedPrice: Scalars["Float"]["input"];
	serviceLevel?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<QuoteStatus>;
	weight?: InputMaybe<Scalars["Float"]["input"]>;
	width?: InputMaybe<Scalars["Float"]["input"]>;
};

export type CreateRateCardInput = {
	createdByUserId?: InputMaybe<Scalars["ID"]["input"]>;
	description?: InputMaybe<Scalars["String"]["input"]>;
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
	name: Scalars["String"]["input"];
	serviceType: ServiceType;
	validFrom: Scalars["String"]["input"];
	validTo?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateRateRuleInput = {
	condition: Scalars["String"]["input"];
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
	maxValue?: InputMaybe<Scalars["Float"]["input"]>;
	minValue?: InputMaybe<Scalars["Float"]["input"]>;
	price: Scalars["Float"]["input"];
	pricingModel: PricingModel;
	priority?: InputMaybe<Scalars["Int"]["input"]>;
	rateCardId: Scalars["ID"]["input"];
	value: Scalars["String"]["input"];
};

export type CreateReorderPointInput = {
	productId: Scalars["ID"]["input"];
	threshold: Scalars["Int"]["input"];
	warehouseId: Scalars["ID"]["input"];
};

export type CreateReturnInput = {
	clientId: Scalars["ID"]["input"];
	items: Array<CreateReturnItemInput>;
	reason?: InputMaybe<Scalars["String"]["input"]>;
	returnNumber: Scalars["String"]["input"];
	salesOrderId?: InputMaybe<Scalars["ID"]["input"]>;
	status?: InputMaybe<ReturnStatus>;
};

export type CreateReturnItemInput = {
	condition?: InputMaybe<ReturnItemCondition>;
	productId: Scalars["ID"]["input"];
	quantityExpected: Scalars["Int"]["input"];
};

export type CreateRouteInput = {
	optimizedRouteData?: InputMaybe<Scalars["String"]["input"]>;
	totalDistance?: InputMaybe<Scalars["Float"]["input"]>;
	totalDuration?: InputMaybe<Scalars["Float"]["input"]>;
	tripId: Scalars["ID"]["input"];
};

export type CreateSalesOrderInput = {
	clientId: Scalars["ID"]["input"];
	crmOpportunityId?: InputMaybe<Scalars["ID"]["input"]>;
	items: Array<CreateSalesOrderItemInput>;
	orderNumber: Scalars["String"]["input"];
	shippingAddress?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<SalesOrderStatus>;
};

export type CreateSalesOrderItemInput = {
	productId: Scalars["ID"]["input"];
	quantityOrdered: Scalars["Int"]["input"];
};

export type CreateShipmentLegEventInput = {
	location?: InputMaybe<Scalars["String"]["input"]>;
	shipmentLegId: Scalars["ID"]["input"];
	statusMessage?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateShipmentLegInput = {
	carrierId?: InputMaybe<Scalars["ID"]["input"]>;
	endLocation?: InputMaybe<Scalars["String"]["input"]>;
	internalTripId?: InputMaybe<Scalars["ID"]["input"]>;
	legSequence: Scalars["Int"]["input"];
	shipmentId: Scalars["ID"]["input"];
	startLocation?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<ShipmentLegStatus>;
};

export type CreateStockTransferInput = {
	destinationWarehouseId: Scalars["ID"]["input"];
	productId: Scalars["ID"]["input"];
	quantity: Scalars["Int"]["input"];
	sourceWarehouseId: Scalars["ID"]["input"];
	status?: InputMaybe<StockTransferStatus>;
};

export type CreateSupplierInput = {
	contactPerson?: InputMaybe<Scalars["String"]["input"]>;
	email?: InputMaybe<Scalars["String"]["input"]>;
	name: Scalars["String"]["input"];
	phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateSurchargeInput = {
	amount: Scalars["Float"]["input"];
	calculationMethod: SurchargeCalculationMethod;
	description?: InputMaybe<Scalars["String"]["input"]>;
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
	name: Scalars["String"]["input"];
	type: Scalars["String"]["input"];
	validFrom?: InputMaybe<Scalars["String"]["input"]>;
	validTo?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateTaskEventInput = {
	deliveryTaskId: Scalars["ID"]["input"];
	latitude?: InputMaybe<Scalars["Float"]["input"]>;
	longitude?: InputMaybe<Scalars["Float"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	reason?: InputMaybe<Scalars["String"]["input"]>;
	status: TaskEventStatus;
	timestamp?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateTaskInput = {
	actualDuration?: InputMaybe<Scalars["Int"]["input"]>;
	endTime?: InputMaybe<Scalars["Date"]["input"]>;
	estimatedDuration?: InputMaybe<Scalars["Int"]["input"]>;
	instructions?: InputMaybe<Scalars["String"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	pickBatchId?: InputMaybe<Scalars["ID"]["input"]>;
	priority?: InputMaybe<Scalars["Int"]["input"]>;
	sourceEntityId?: InputMaybe<Scalars["ID"]["input"]>;
	sourceEntityType?: InputMaybe<Scalars["String"]["input"]>;
	startTime?: InputMaybe<Scalars["Date"]["input"]>;
	status?: InputMaybe<TaskStatus>;
	taskNumber: Scalars["String"]["input"];
	type: TaskType;
	userId?: InputMaybe<Scalars["ID"]["input"]>;
	warehouseId: Scalars["ID"]["input"];
};

export type CreateTaskItemInput = {
	batchId?: InputMaybe<Scalars["ID"]["input"]>;
	destinationLocationId?: InputMaybe<Scalars["ID"]["input"]>;
	expiryDate?: InputMaybe<Scalars["String"]["input"]>;
	lotNumber?: InputMaybe<Scalars["String"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	productId: Scalars["ID"]["input"];
	quantityCompleted: Scalars["Int"]["input"];
	quantityRequired: Scalars["Int"]["input"];
	serialNumbers: Array<Scalars["String"]["input"]>;
	sourceLocationId?: InputMaybe<Scalars["ID"]["input"]>;
	status?: InputMaybe<TaskItemStatus>;
};

export type CreateTripInput = {
	driverId?: InputMaybe<Scalars["ID"]["input"]>;
	endLocation?: InputMaybe<Scalars["String"]["input"]>;
	endTime?: InputMaybe<Scalars["String"]["input"]>;
	startLocation?: InputMaybe<Scalars["String"]["input"]>;
	startTime?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<TripStatus>;
	vehicleId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type CreateTripStopInput = {
	address?: InputMaybe<Scalars["String"]["input"]>;
	estimatedArrivalTime?: InputMaybe<Scalars["String"]["input"]>;
	estimatedDepartureTime?: InputMaybe<Scalars["String"]["input"]>;
	sequence: Scalars["Int"]["input"];
	shipmentId?: InputMaybe<Scalars["ID"]["input"]>;
	status?: InputMaybe<TripStopStatus>;
	tripId: Scalars["ID"]["input"];
};

export type CreateVehicleInput = {
	capacityVolume?: InputMaybe<Scalars["Float"]["input"]>;
	capacityWeight?: InputMaybe<Scalars["Float"]["input"]>;
	currentMileage?: InputMaybe<Scalars["Int"]["input"]>;
	lastMaintenanceDate?: InputMaybe<Scalars["String"]["input"]>;
	make?: InputMaybe<Scalars["String"]["input"]>;
	model?: InputMaybe<Scalars["String"]["input"]>;
	registrationNumber: Scalars["String"]["input"];
	status?: InputMaybe<VehicleStatus>;
	vin?: InputMaybe<Scalars["String"]["input"]>;
	year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CreateVehicleMaintenanceInput = {
	cost?: InputMaybe<Scalars["Float"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	serviceDate: Scalars["Date"]["input"];
	serviceType?: InputMaybe<VehicleServiceType>;
};

export type CreateWarehouseInput = {
	address?: InputMaybe<Scalars["String"]["input"]>;
	city?: InputMaybe<Scalars["String"]["input"]>;
	contactEmail?: InputMaybe<Scalars["String"]["input"]>;
	contactPerson?: InputMaybe<Scalars["String"]["input"]>;
	contactPhone?: InputMaybe<Scalars["String"]["input"]>;
	country?: InputMaybe<Scalars["String"]["input"]>;
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
	name: Scalars["String"]["input"];
	postalCode?: InputMaybe<Scalars["String"]["input"]>;
	state?: InputMaybe<Scalars["String"]["input"]>;
	timezone?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateWmsProductInput = {
	barcode?: InputMaybe<Scalars["String"]["input"]>;
	clientId?: InputMaybe<Scalars["ID"]["input"]>;
	costPrice?: InputMaybe<Scalars["Float"]["input"]>;
	description?: InputMaybe<Scalars["String"]["input"]>;
	height?: InputMaybe<Scalars["Float"]["input"]>;
	length?: InputMaybe<Scalars["Float"]["input"]>;
	name: Scalars["String"]["input"];
	sku: Scalars["String"]["input"];
	status?: InputMaybe<ProductStatus>;
	supplierId?: InputMaybe<Scalars["ID"]["input"]>;
	weight?: InputMaybe<Scalars["Float"]["input"]>;
	width?: InputMaybe<Scalars["Float"]["input"]>;
};

export type CreditNoteAppliedEvent = {
	__typename?: "CreditNoteAppliedEvent";
	appliedAmount: Scalars["String"]["output"];
	creditNote: CreditNotes;
};

export type CreditNoteOnDisputeApprovalEvent = {
	__typename?: "CreditNoteOnDisputeApprovalEvent";
	creditNote: CreditNotes;
	disputeId: Scalars["ID"]["output"];
};

export type CreditNotes = {
	__typename?: "CreditNotes";
	amount: Scalars["Float"]["output"];
	appliedAt?: Maybe<Scalars["String"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	createdByUser?: Maybe<User>;
	creditNoteNumber: Scalars["String"]["output"];
	currency?: Maybe<Scalars["String"]["output"]>;
	dispute?: Maybe<Disputes>;
	id: Scalars["ID"]["output"];
	invoice: BillingInvoices;
	issueDate: Scalars["String"]["output"];
	notes?: Maybe<Scalars["String"]["output"]>;
	reason: Scalars["String"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type CrmCaseAssignedEvent = {
	__typename?: "CrmCaseAssignedEvent";
	id: Scalars["ID"]["output"];
	ownerId: Scalars["ID"]["output"];
	previousOwnerId: Scalars["ID"]["output"];
};

export type CrmCaseStatusChangedEvent = {
	__typename?: "CrmCaseStatusChangedEvent";
	id: Scalars["ID"]["output"];
	newStatus: CaseStatus;
	previousStatus: CaseStatus;
};

export enum CrmInvoicePaymentMethod {
	BankTransfer = "BANK_TRANSFER",
	Cash = "CASH",
	Check = "CHECK",
	CreditCard = "CREDIT_CARD",
	Maya = "MAYA",
	Other = "OTHER",
	Paypal = "PAYPAL",
	Stripe = "STRIPE",
	WireTransfer = "WIRE_TRANSFER",
}

export type CrmInvoiceStatusChangedEvent = {
	__typename?: "CrmInvoiceStatusChangedEvent";
	id: Scalars["ID"]["output"];
	newStatus: InvoiceStatus;
	previousStatus: InvoiceStatus;
};

export type CrmLeadStatusChangedEvent = {
	__typename?: "CrmLeadStatusChangedEvent";
	id: Scalars["ID"]["output"];
	newStatus: LeadStatus;
	previousStatus: LeadStatus;
};

export type CrmMutation = {
	__typename?: "CrmMutation";
	addInvoiceItem: InvoiceItems;
	addOpportunityProduct: OpportunityProducts;
	createAttachment: Attachments;
	createCampaign: Campaigns;
	createCase: Cases;
	createCompany: Companies;
	createContact: Contacts;
	createInteraction: Interactions;
	createInvoice: Invoices;
	createLead: Leads;
	createNotification: Notifications;
	createOpportunity: Opportunities;
	createProduct: Products;
	removeAttachment: DeleteResult;
	removeCampaign: DeleteResult;
	removeCase: DeleteResult;
	removeCompany: DeleteResult;
	removeContact: DeleteResult;
	removeInteraction: DeleteResult;
	removeInvoiceItem: DeleteResult;
	removeLead: DeleteResult;
	removeOpportunityProduct: DeleteResult;
	removeProduct: DeleteResult;
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

export type CrmMutationAddInvoiceItemArgs = {
	id: Scalars["ID"]["input"];
	value: AddInvoiceItemInput;
};

export type CrmMutationAddOpportunityProductArgs = {
	id: Scalars["ID"]["input"];
	value: AddOpportunityProductInput;
};

export type CrmMutationCreateAttachmentArgs = {
	value: CreateAttachmentInput;
};

export type CrmMutationCreateCampaignArgs = {
	value: CreateCampaignInput;
};

export type CrmMutationCreateCaseArgs = {
	value: CreateCaseInput;
};

export type CrmMutationCreateCompanyArgs = {
	value: CreateCompanyInput;
};

export type CrmMutationCreateContactArgs = {
	value: CreateContactInput;
};

export type CrmMutationCreateInteractionArgs = {
	value: CreateInteractionInput;
};

export type CrmMutationCreateInvoiceArgs = {
	value: CreateInvoiceInput;
};

export type CrmMutationCreateLeadArgs = {
	value: CreateLeadInput;
};

export type CrmMutationCreateNotificationArgs = {
	value: CreateNotificationInput;
};

export type CrmMutationCreateOpportunityArgs = {
	value: CreateOpportunityInput;
};

export type CrmMutationCreateProductArgs = {
	value: CreateProductInput;
};

export type CrmMutationRemoveAttachmentArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmMutationRemoveCampaignArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmMutationRemoveCaseArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmMutationRemoveCompanyArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmMutationRemoveContactArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmMutationRemoveInteractionArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmMutationRemoveInvoiceItemArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmMutationRemoveLeadArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmMutationRemoveOpportunityProductArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmMutationRemoveProductArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmMutationUpdateCampaignArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateCampaignInput>;
};

export type CrmMutationUpdateCaseArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateCaseInput>;
};

export type CrmMutationUpdateCompanyArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateCompanyInput>;
};

export type CrmMutationUpdateContactArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateContactInput>;
};

export type CrmMutationUpdateInteractionArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateInteractionInput>;
};

export type CrmMutationUpdateInvoiceArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateInvoiceInput>;
};

export type CrmMutationUpdateInvoiceItemArgs = {
	id: Scalars["ID"]["input"];
	value: UpdateInvoiceItemInput;
};

export type CrmMutationUpdateLeadArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateLeadInput>;
};

export type CrmMutationUpdateNotificationArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateNotificationInput>;
};

export type CrmMutationUpdateOpportunityArgs = {
	id: Scalars["ID"]["input"];
	value: UpdateOpportunityInput;
};

export type CrmMutationUpdateOpportunityProductArgs = {
	id: Scalars["ID"]["input"];
	value: UpdateOpportunityProductInput;
};

export type CrmMutationUpdateProductArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateProductInput>;
};

export type CrmNotificationMarkedEvent = {
	__typename?: "CrmNotificationMarkedEvent";
	id: Scalars["ID"]["output"];
	isRead: Scalars["Boolean"]["output"];
	userId: Scalars["ID"]["output"];
};

export type CrmOpportunityStageChangedEvent = {
	__typename?: "CrmOpportunityStageChangedEvent";
	id: Scalars["ID"]["output"];
	newStage: OpportunityStage;
	previousStage: OpportunityStage;
	probability?: Maybe<Scalars["Float"]["output"]>;
};

export type CrmQuery = {
	__typename?: "CrmQuery";
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
	invoices: Array<Invoices>;
	lead: Leads;
	leads: Array<Leads>;
	notification: Notifications;
	notifications: Array<Notifications>;
	opportunities: Array<Opportunities>;
	opportunitiesAnalytics: OpportunitiesAnalytics;
	opportunity: Opportunities;
	product: Products;
	products: Array<Products>;
};

export type CrmQueryAttachmentArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmQueryAttachmentsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type CrmQueryCampaignArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmQueryCampaignsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type CrmQueryCaseArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmQueryCasesArgs = {
	active?: InputMaybe<Scalars["Boolean"]["input"]>;
	assignedTo?: InputMaybe<Scalars["ID"]["input"]>;
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	priority?: InputMaybe<CasePriority>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	sortBy?: InputMaybe<Scalars["String"]["input"]>;
	sortDirection?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<CaseStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
	type?: InputMaybe<CaseType>;
};

export type CrmQueryCompaniesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type CrmQueryCompanyArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmQueryContactArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmQueryContactsArgs = {
	companyId?: InputMaybe<Scalars["ID"]["input"]>;
	from?: InputMaybe<Scalars["Date"]["input"]>;
	jobTitle?: InputMaybe<Scalars["String"]["input"]>;
	ownerId?: InputMaybe<Scalars["ID"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	sortBy?: InputMaybe<Scalars["String"]["input"]>;
	sortDirection?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type CrmQueryInteractionArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmQueryInteractionsArgs = {
	contactId?: InputMaybe<Scalars["ID"]["input"]>;
	createdBy?: InputMaybe<Scalars["ID"]["input"]>;
	from?: InputMaybe<Scalars["Date"]["input"]>;
	interactionType?: InputMaybe<InteractionType>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	sortBy?: InputMaybe<Scalars["String"]["input"]>;
	sortDirection?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type CrmQueryInvoiceArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmQueryInvoicesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	paymentMethod?: InputMaybe<CrmInvoicePaymentMethod>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<InvoiceStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type CrmQueryLeadArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmQueryLeadsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	leadSource?: InputMaybe<LeadSource>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	sortBy?: InputMaybe<Scalars["String"]["input"]>;
	sortDirection?: InputMaybe<SortDirection>;
	status?: InputMaybe<LeadStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type CrmQueryNotificationArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmQueryNotificationsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type CrmQueryOpportunitiesArgs = {
	amountMax?: InputMaybe<Scalars["Float"]["input"]>;
	amountMin?: InputMaybe<Scalars["Float"]["input"]>;
	closeDateFrom?: InputMaybe<Scalars["Date"]["input"]>;
	closeDateTo?: InputMaybe<Scalars["Date"]["input"]>;
	companyId?: InputMaybe<Scalars["ID"]["input"]>;
	from?: InputMaybe<Scalars["Date"]["input"]>;
	ownerId?: InputMaybe<Scalars["ID"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	sortBy?: InputMaybe<Scalars["String"]["input"]>;
	sortDirection?: InputMaybe<Scalars["String"]["input"]>;
	source?: InputMaybe<OpportunitySource>;
	stage?: InputMaybe<OpportunityStage>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type CrmQueryOpportunityArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmQueryProductArgs = {
	id: Scalars["ID"]["input"];
};

export type CrmQueryProductsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
	type?: InputMaybe<ProductType>;
};

export enum Currency {
	Aud = "AUD",
	Cad = "CAD",
	Eur = "EUR",
	Gbp = "GBP",
	Jpy = "JPY",
	Php = "PHP",
	Usd = "USD",
}

export type CustomerTrackingLinks = {
	__typename?: "CustomerTrackingLinks";
	accessCount?: Maybe<Scalars["Int"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	deliveryTask: DeliveryTasks;
	expiresAt?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	isActive?: Maybe<Scalars["Boolean"]["output"]>;
	lastAccessedAt?: Maybe<Scalars["String"]["output"]>;
	trackingToken: Scalars["String"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type DeleteResult = {
	__typename?: "DeleteResult";
	numDeletedRows: Scalars["Int"]["output"];
	success: Scalars["Boolean"]["output"];
};

export enum DeliveryFailureReason {
	AccessDenied = "ACCESS_DENIED",
	AddressNotFound = "ADDRESS_NOT_FOUND",
	DamagedPackage = "DAMAGED_PACKAGE",
	Other = "OTHER",
	RecipientNotHome = "RECIPIENT_NOT_HOME",
	RefusedDelivery = "REFUSED_DELIVERY",
	VehicleBreakdown = "VEHICLE_BREAKDOWN",
	WeatherConditions = "WEATHER_CONDITIONS",
}

export enum DeliveryRouteStatus {
	Cancelled = "CANCELLED",
	Completed = "COMPLETED",
	InProgress = "IN_PROGRESS",
	Paused = "PAUSED",
	Planned = "PLANNED",
}

export type DeliveryRoutes = {
	__typename?: "DeliveryRoutes";
	actualDurationMinutes?: Maybe<Scalars["Int"]["output"]>;
	completedAt?: Maybe<Scalars["String"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	driver: Drivers;
	estimatedDurationMinutes?: Maybe<Scalars["Int"]["output"]>;
	id: Scalars["ID"]["output"];
	optimizedRouteData?: Maybe<Scalars["String"]["output"]>;
	routeDate: Scalars["String"]["output"];
	startedAt?: Maybe<Scalars["String"]["output"]>;
	status?: Maybe<DeliveryRouteStatus>;
	tasks?: Maybe<Array<DeliveryTasks>>;
	totalDistanceKm?: Maybe<Scalars["Float"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum DeliveryTaskStatus {
	Assigned = "ASSIGNED",
	Cancelled = "CANCELLED",
	Delivered = "DELIVERED",
	Failed = "FAILED",
	OutForDelivery = "OUT_FOR_DELIVERY",
	Pending = "PENDING",
	Rescheduled = "RESCHEDULED",
}

export type DeliveryTasks = {
	__typename?: "DeliveryTasks";
	actualArrivalTime?: Maybe<Scalars["String"]["output"]>;
	attemptCount?: Maybe<Scalars["Int"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	customerTrackingLinks?: Maybe<Array<CustomerTrackingLinks>>;
	deliveryAddress: Scalars["String"]["output"];
	deliveryInstructions?: Maybe<Scalars["String"]["output"]>;
	deliveryRoute: DeliveryRoutes;
	deliveryTime?: Maybe<Scalars["String"]["output"]>;
	estimatedArrivalTime?: Maybe<Scalars["String"]["output"]>;
	events?: Maybe<Array<TaskEvents>>;
	failureReason?: Maybe<DeliveryFailureReason>;
	id: Scalars["ID"]["output"];
	package: Packages;
	proofOfDeliveries?: Maybe<Array<DmsProofOfDeliveries>>;
	recipientName?: Maybe<Scalars["String"]["output"]>;
	recipientPhone?: Maybe<Scalars["String"]["output"]>;
	routeSequence: Scalars["Int"]["output"];
	status?: Maybe<DeliveryTaskStatus>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type DisputeApprovedEvent = {
	__typename?: "DisputeApprovedEvent";
	creditNoteId?: Maybe<Scalars["ID"]["output"]>;
	dispute: Disputes;
};

export type DisputeDeniedEvent = {
	__typename?: "DisputeDeniedEvent";
	denialReason?: Maybe<Scalars["String"]["output"]>;
	dispute: Disputes;
};

export type DisputeResolvedEvent = {
	__typename?: "DisputeResolvedEvent";
	dispute: Disputes;
	resolutionDetails?: Maybe<Scalars["String"]["output"]>;
};

export enum DisputeStatus {
	Approved = "APPROVED",
	Closed = "CLOSED",
	Denied = "DENIED",
	Escalated = "ESCALATED",
	Open = "OPEN",
	UnderReview = "UNDER_REVIEW",
}

export type DisputeStatusChangedEvent = {
	__typename?: "DisputeStatusChangedEvent";
	clientId: Scalars["ID"]["output"];
	id: Scalars["ID"]["output"];
	newStatus: DisputeStatus;
	previousStatus: DisputeStatus;
};

export type Disputes = {
	__typename?: "Disputes";
	client: Companies;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	creditNotes?: Maybe<Array<CreditNotes>>;
	disputedAmount?: Maybe<Scalars["Float"]["output"]>;
	id: Scalars["ID"]["output"];
	lineItem: InvoiceLineItems;
	reason: Scalars["String"]["output"];
	resolutionNotes?: Maybe<Scalars["String"]["output"]>;
	resolvedAt?: Maybe<Scalars["String"]["output"]>;
	resolvedByUser?: Maybe<User>;
	status?: Maybe<DisputeStatus>;
	submittedAt?: Maybe<Scalars["String"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type DmsDeliveryTaskFailedEvent = {
	__typename?: "DmsDeliveryTaskFailedEvent";
	deliveryTask: DeliveryTasks;
	failureReason?: Maybe<Scalars["String"]["output"]>;
};

export type DmsDeliveryTaskStatusChangedEvent = {
	__typename?: "DmsDeliveryTaskStatusChangedEvent";
	deliveryRouteId: Scalars["ID"]["output"];
	id: Scalars["ID"]["output"];
	newStatus: DeliveryTaskStatus;
	previousStatus: DeliveryTaskStatus;
};

export type DmsDriverLocationRemovedEvent = {
	__typename?: "DmsDriverLocationRemovedEvent";
	driverId: Scalars["ID"]["output"];
	id: Scalars["ID"]["output"];
};

export type DmsMutation = {
	__typename?: "DmsMutation";
	createCustomerTrackingLink: CustomerTrackingLinks;
	createDeliveryRoute: DeliveryRoutes;
	createDeliveryTask: DeliveryTasks;
	createDmsProofOfDelivery: DmsProofOfDeliveries;
	createDriverLocation: DriverLocations;
	createTaskEvent: TaskEvents;
	removeDeliveryRoute: DeleteResult;
	removeDriverLocation: DeleteResult;
	updateCustomerTrackingLink: CustomerTrackingLinks;
	updateDeliveryRoute: DeliveryRoutes;
	updateDeliveryTask: DeliveryTasks;
	updateDriverLocation: DriverLocations;
};

export type DmsMutationCreateCustomerTrackingLinkArgs = {
	value: CreateCustomerTrackingLinkInput;
};

export type DmsMutationCreateDeliveryRouteArgs = {
	value: CreateDeliveryRouteInput;
};

export type DmsMutationCreateDeliveryTaskArgs = {
	value: CreateDeliveryTaskInput;
};

export type DmsMutationCreateDmsProofOfDeliveryArgs = {
	value: CreateDmsProofOfDeliveryInput;
};

export type DmsMutationCreateDriverLocationArgs = {
	value: CreateDriverLocationInput;
};

export type DmsMutationCreateTaskEventArgs = {
	value: CreateTaskEventInput;
};

export type DmsMutationRemoveDeliveryRouteArgs = {
	id: Scalars["ID"]["input"];
};

export type DmsMutationRemoveDriverLocationArgs = {
	id: Scalars["ID"]["input"];
};

export type DmsMutationUpdateCustomerTrackingLinkArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateCustomerTrackingLinkInput>;
};

export type DmsMutationUpdateDeliveryRouteArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateDeliveryRouteInput>;
};

export type DmsMutationUpdateDeliveryTaskArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateDeliveryTaskInput>;
};

export type DmsMutationUpdateDriverLocationArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateDriverLocationInput>;
};

export type DmsProofOfDeliveries = {
	__typename?: "DmsProofOfDeliveries";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	deliveryTask: DeliveryTasks;
	filePath?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	latitude?: Maybe<Scalars["Float"]["output"]>;
	longitude?: Maybe<Scalars["Float"]["output"]>;
	recipientName?: Maybe<Scalars["String"]["output"]>;
	signatureData?: Maybe<Scalars["String"]["output"]>;
	timestamp?: Maybe<Scalars["String"]["output"]>;
	type: ProofOfDeliveryType;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	verificationCode?: Maybe<Scalars["String"]["output"]>;
};

export type DmsQuery = {
	__typename?: "DmsQuery";
	customerTrackingLink: CustomerTrackingLinks;
	customerTrackingLinks: Array<CustomerTrackingLinks>;
	deliveryRoute: DeliveryRoutes;
	deliveryRoutes: Array<DeliveryRoutes>;
	deliveryTask: DeliveryTasks;
	deliveryTasks: Array<DeliveryTasks>;
	dmsProofOfDeliveries: Array<DmsProofOfDeliveries>;
	dmsProofOfDelivery: DmsProofOfDeliveries;
	driverLocation: DriverLocations;
	driverLocations: Array<DriverLocations>;
	taskEvent: TaskEvents;
	taskEvents: Array<TaskEvents>;
};

export type DmsQueryCustomerTrackingLinkArgs = {
	id: Scalars["ID"]["input"];
};

export type DmsQueryCustomerTrackingLinksArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type DmsQueryDeliveryRouteArgs = {
	id: Scalars["ID"]["input"];
};

export type DmsQueryDeliveryRoutesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<DeliveryRouteStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type DmsQueryDeliveryTaskArgs = {
	id: Scalars["ID"]["input"];
};

export type DmsQueryDeliveryTasksArgs = {
	failureReason?: InputMaybe<DeliveryFailureReason>;
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<DeliveryTaskStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type DmsQueryDmsProofOfDeliveriesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
	type?: InputMaybe<ProofOfDeliveryType>;
};

export type DmsQueryDmsProofOfDeliveryArgs = {
	id: Scalars["ID"]["input"];
};

export type DmsQueryDriverLocationArgs = {
	id: Scalars["ID"]["input"];
};

export type DmsQueryDriverLocationsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type DmsQueryTaskEventArgs = {
	id: Scalars["ID"]["input"];
};

export type DmsQueryTaskEventsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<TaskEventStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type DmsTaskEventStatusUpdatedEvent = {
	__typename?: "DmsTaskEventStatusUpdatedEvent";
	deliveryTaskId: Scalars["ID"]["output"];
	newStatus: TaskEventStatus;
	taskEventId: Scalars["ID"]["output"];
};

export type DmsTrackingLinkExpiredEvent = {
	__typename?: "DmsTrackingLinkExpiredEvent";
	deliveryTaskId: Scalars["ID"]["output"];
	id: Scalars["ID"]["output"];
	trackingToken: Scalars["String"]["output"];
};

export type DocumentGeneratedEvent = {
	__typename?: "DocumentGeneratedEvent";
	documentId: Scalars["ID"]["output"];
	documentType: Scalars["String"]["output"];
	shipmentId: Scalars["ID"]["output"];
};

export enum DocumentType {
	Bol = "BOL",
	CommercialInvoice = "COMMERCIAL_INVOICE",
	CreditNote = "CREDIT_NOTE",
	CustomsDeclaration = "CUSTOMS_DECLARATION",
	PackingList = "PACKING_LIST",
	ProofOfDelivery = "PROOF_OF_DELIVERY",
	Receipt = "RECEIPT",
	ShippingLabel = "SHIPPING_LABEL",
}

export type Documents = {
	__typename?: "Documents";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	documentType: DocumentType;
	fileName: Scalars["String"]["output"];
	filePath: Scalars["String"]["output"];
	fileSize?: Maybe<Scalars["Int"]["output"]>;
	id: Scalars["ID"]["output"];
	mimeType?: Maybe<Scalars["String"]["output"]>;
	recordId: Scalars["ID"]["output"];
	recordType: Scalars["String"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	uploadedByUser?: Maybe<User>;
};

export type DriverLocations = {
	__typename?: "DriverLocations";
	accuracy?: Maybe<Scalars["Float"]["output"]>;
	altitude?: Maybe<Scalars["Float"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	driver: Drivers;
	heading?: Maybe<Scalars["Float"]["output"]>;
	id: Scalars["ID"]["output"];
	latitude: Scalars["Float"]["output"];
	longitude: Scalars["Float"]["output"];
	speedKmh?: Maybe<Scalars["Float"]["output"]>;
	timestamp?: Maybe<Scalars["String"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum DriverScheduleReason {
	PersonalLeave = "PERSONAL_LEAVE",
	SickLeave = "SICK_LEAVE",
	Training = "TRAINING",
	Vacation = "VACATION",
}

export type DriverSchedules = {
	__typename?: "DriverSchedules";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	driver: Drivers;
	endDate: Scalars["String"]["output"];
	id: Scalars["ID"]["output"];
	reason?: Maybe<DriverScheduleReason>;
	startDate: Scalars["String"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum DriverStatus {
	Active = "ACTIVE",
	Inactive = "INACTIVE",
	OnLeave = "ON_LEAVE",
}

export type Drivers = {
	__typename?: "Drivers";
	contactPhone?: Maybe<Scalars["String"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	deliveryRoutes?: Maybe<Array<DeliveryRoutes>>;
	driverLocations?: Maybe<Array<DriverLocations>>;
	expenses?: Maybe<Array<Expenses>>;
	id: Scalars["ID"]["output"];
	licenseExpiryDate?: Maybe<Scalars["String"]["output"]>;
	licenseNumber: Scalars["String"]["output"];
	schedules?: Maybe<Array<DriverSchedules>>;
	status?: Maybe<DriverStatus>;
	trips?: Maybe<Array<Trips>>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	user: User;
};

export enum ExpenseStatus {
	Approved = "APPROVED",
	Pending = "PENDING",
	Reimbursed = "REIMBURSED",
	Rejected = "REJECTED",
}

export enum ExpenseType {
	Accommodation = "ACCOMMODATION",
	Fuel = "FUEL",
	Maintenance = "MAINTENANCE",
	Meals = "MEALS",
	Parking = "PARKING",
	Tolls = "TOLLS",
}

export type Expenses = {
	__typename?: "Expenses";
	amount: Scalars["Float"]["output"];
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	currency?: Maybe<Currency>;
	description?: Maybe<Scalars["String"]["output"]>;
	driver?: Maybe<Drivers>;
	expenseDate?: Maybe<Scalars["String"]["output"]>;
	fuelQuantity?: Maybe<Scalars["Float"]["output"]>;
	id: Scalars["ID"]["output"];
	odometerReading?: Maybe<Scalars["Int"]["output"]>;
	receiptUrl?: Maybe<Scalars["String"]["output"]>;
	status?: Maybe<ExpenseStatus>;
	trip?: Maybe<Trips>;
	type?: Maybe<ExpenseType>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum GeofenceEventType {
	Enter = "ENTER",
	Exit = "EXIT",
}

export type GeofenceEvents = {
	__typename?: "GeofenceEvents";
	eventType: GeofenceEventType;
	geofence: Geofences;
	id: Scalars["ID"]["output"];
	timestamp: Scalars["String"]["output"];
	vehicle: Vehicles;
};

export type Geofences = {
	__typename?: "Geofences";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	events?: Maybe<Array<GeofenceEvents>>;
	id: Scalars["ID"]["output"];
	latitude?: Maybe<Scalars["Float"]["output"]>;
	longitude?: Maybe<Scalars["Float"]["output"]>;
	name: Scalars["String"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type GpsPings = {
	__typename?: "GpsPings";
	id: Scalars["ID"]["output"];
	latitude: Scalars["Float"]["output"];
	longitude: Scalars["Float"]["output"];
	timestamp: Scalars["Date"]["output"];
	vehicle: Vehicles;
};

export type InboundShipmentItems = {
	__typename?: "InboundShipmentItems";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	discrepancyNotes?: Maybe<Scalars["String"]["output"]>;
	discrepancyQuantity?: Maybe<Scalars["Int"]["output"]>;
	expectedQuantity: Scalars["Int"]["output"];
	id: Scalars["ID"]["output"];
	inboundShipment: InboundShipments;
	product: WmsProducts;
	receivedQuantity?: Maybe<Scalars["Int"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum InboundShipmentStatus {
	Arrived = "ARRIVED",
	Cancelled = "CANCELLED",
	Completed = "COMPLETED",
	Pending = "PENDING",
	Processing = "PROCESSING",
}

export type InboundShipments = {
	__typename?: "InboundShipments";
	actualArrivalDate?: Maybe<Scalars["String"]["output"]>;
	client?: Maybe<Companies>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	expectedArrivalDate?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	items?: Maybe<Array<InboundShipmentItems>>;
	status?: Maybe<InboundShipmentStatus>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	warehouseId: Scalars["ID"]["output"];
};

export enum InteractionOutcome {
	Completed = "COMPLETED",
	NoAnswer = "NO_ANSWER",
	Other = "OTHER",
	Scheduled = "SCHEDULED",
}

export enum InteractionType {
	Call = "CALL",
	Email = "EMAIL",
	Meeting = "MEETING",
	Text = "TEXT",
}

export type Interactions = {
	__typename?: "Interactions";
	case?: Maybe<Cases>;
	contact: Contacts;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	interactionDate?: Maybe<Scalars["Date"]["output"]>;
	notes?: Maybe<Scalars["String"]["output"]>;
	outcome?: Maybe<InteractionOutcome>;
	type?: Maybe<InteractionType>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	user?: Maybe<User>;
};

export enum InventoryAdjustmentReason {
	CycleCount = "CYCLE_COUNT",
	DamagedGoods = "DAMAGED_GOODS",
	Expired = "EXPIRED",
	ManualCorrection = "MANUAL_CORRECTION",
	ReturnToVendor = "RETURN_TO_VENDOR",
	Theft = "THEFT",
}

export type InventoryAdjustments = {
	__typename?: "InventoryAdjustments";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	notes?: Maybe<Scalars["String"]["output"]>;
	product: WmsProducts;
	quantityChange: Scalars["Int"]["output"];
	reason?: Maybe<InventoryAdjustmentReason>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	user: User;
	warehouseId: Scalars["ID"]["output"];
};

export type InventoryBatches = {
	__typename?: "InventoryBatches";
	batchNumber: Scalars["String"]["output"];
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	expirationDate?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	inventoryStock?: Maybe<Array<InventoryStock>>;
	outboundShipmentItems?: Maybe<Array<OutboundShipmentItems>>;
	packageItems?: Maybe<Array<PackageItems>>;
	product: WmsProducts;
	taskItems?: Maybe<Array<TaskItems>>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type InventoryStock = {
	__typename?: "InventoryStock";
	availableQuantity?: Maybe<Scalars["Int"]["output"]>;
	batch?: Maybe<InventoryBatches>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	lastCountedAt?: Maybe<Scalars["Date"]["output"]>;
	lastMovementAt?: Maybe<Scalars["Date"]["output"]>;
	location: Locations;
	product: WmsProducts;
	quantity: Scalars["Int"]["output"];
	reservedQuantity: Scalars["Int"]["output"];
	status?: Maybe<InventoryStockStatus>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum InventoryStockStatus {
	Allocated = "ALLOCATED",
	Available = "AVAILABLE",
	Damaged = "DAMAGED",
	Expired = "EXPIRED",
	Hold = "HOLD",
	Quarantine = "QUARANTINE",
	Shipped = "SHIPPED",
}

export type InvoiceDisputedEvent = {
	__typename?: "InvoiceDisputedEvent";
	disputeId: Scalars["ID"]["output"];
	invoice: BillingInvoices;
};

export type InvoiceItems = {
	__typename?: "InvoiceItems";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	invoice: Invoices;
	price: Scalars["Float"]["output"];
	product: Products;
	quantity: Scalars["Float"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type InvoiceLineItems = {
	__typename?: "InvoiceLineItems";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	description: Scalars["String"]["output"];
	discountAmount?: Maybe<Scalars["Float"]["output"]>;
	discountRate?: Maybe<Scalars["Float"]["output"]>;
	disputes?: Maybe<Array<Disputes>>;
	id: Scalars["ID"]["output"];
	invoice: BillingInvoices;
	lineTotal?: Maybe<Scalars["Float"]["output"]>;
	quantity: Scalars["Float"]["output"];
	sourceRecordId?: Maybe<Scalars["ID"]["output"]>;
	sourceRecordType?: Maybe<Scalars["String"]["output"]>;
	taxAmount?: Maybe<Scalars["Float"]["output"]>;
	taxRate?: Maybe<Scalars["Float"]["output"]>;
	totalPrice?: Maybe<Scalars["Float"]["output"]>;
	unitPrice: Scalars["Float"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type InvoiceOverdueEvent = {
	__typename?: "InvoiceOverdueEvent";
	amountOutstanding: Scalars["String"]["output"];
	clientId: Scalars["ID"]["output"];
	dueDate: Scalars["String"]["output"];
	id: Scalars["ID"]["output"];
};

export type InvoicePaidEvent = {
	__typename?: "InvoicePaidEvent";
	invoice: BillingInvoices;
	paidAmount: Scalars["String"]["output"];
	remainingBalance: Scalars["String"]["output"];
};

export type InvoicePartiallyPaidEvent = {
	__typename?: "InvoicePartiallyPaidEvent";
	invoice: BillingInvoices;
	paymentAmount: Scalars["String"]["output"];
	remainingBalance: Scalars["String"]["output"];
};

export enum InvoiceStatus {
	Cancelled = "CANCELLED",
	Draft = "DRAFT",
	Overdue = "OVERDUE",
	Paid = "PAID",
	Sent = "SENT",
}

export type InvoiceStatusChangedEvent = {
	__typename?: "InvoiceStatusChangedEvent";
	clientId: Scalars["ID"]["output"];
	id: Scalars["ID"]["output"];
	newStatus: BillingInvoiceStatus;
	previousStatus: BillingInvoiceStatus;
};

export type Invoices = {
	__typename?: "Invoices";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	dueDate: Scalars["Date"]["output"];
	id: Scalars["ID"]["output"];
	issueDate: Scalars["Date"]["output"];
	items?: Maybe<Array<InvoiceItems>>;
	opportunity: Opportunities;
	paidAt?: Maybe<Scalars["Date"]["output"]>;
	paymentMethod?: Maybe<CrmInvoicePaymentMethod>;
	sentAt?: Maybe<Scalars["Date"]["output"]>;
	status?: Maybe<InvoiceStatus>;
	total: Scalars["Float"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum LeadSource {
	Advertisment = "ADVERTISMENT",
	ColdCall = "COLD_CALL",
	EmailCampaign = "EMAIL_CAMPAIGN",
	Event = "EVENT",
	Other = "OTHER",
	Partner = "PARTNER",
	Referral = "REFERRAL",
	SocialMedia = "SOCIAL_MEDIA",
	Website = "WEBSITE",
}

export enum LeadStatus {
	Contacted = "CONTACTED",
	Converted = "CONVERTED",
	New = "NEW",
	Qualified = "QUALIFIED",
	Unqualified = "UNQUALIFIED",
}

export type Leads = {
	__typename?: "Leads";
	campaign?: Maybe<Campaigns>;
	convertedAt?: Maybe<Scalars["Date"]["output"]>;
	convertedCompany?: Maybe<Companies>;
	convertedContact?: Maybe<Contacts>;
	convertedOpportunity?: Maybe<Opportunities>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	email?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	leadScore?: Maybe<Scalars["Int"]["output"]>;
	leadSource?: Maybe<LeadSource>;
	name: Scalars["String"]["output"];
	owner?: Maybe<User>;
	status?: Maybe<LeadStatus>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum LocationType {
	BulkStorage = "BULK_STORAGE",
	CrossDockArea = "CROSS_DOCK_AREA",
	DamagedGoods = "DAMAGED_GOODS",
	PackingStation = "PACKING_STATION",
	PickBin = "PICK_BIN",
	QualityControl = "QUALITY_CONTROL",
	ReceivingDock = "RECEIVING_DOCK",
	ReserveStorage = "RESERVE_STORAGE",
	ReturnsArea = "RETURNS_AREA",
	StagingArea = "STAGING_AREA",
}

export type Locations = {
	__typename?: "Locations";
	barcode?: Maybe<Scalars["String"]["output"]>;
	binThresholds?: Maybe<Array<BinThresholds>>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	destinationTaskItems?: Maybe<Array<TaskItems>>;
	hazmatApproved?: Maybe<Scalars["Boolean"]["output"]>;
	id: Scalars["ID"]["output"];
	inventoryStock?: Maybe<Array<InventoryStock>>;
	isActive?: Maybe<Scalars["Boolean"]["output"]>;
	isPickable?: Maybe<Scalars["Boolean"]["output"]>;
	isReceivable?: Maybe<Scalars["Boolean"]["output"]>;
	level?: Maybe<Scalars["Int"]["output"]>;
	maxPallets?: Maybe<Scalars["Int"]["output"]>;
	maxVolume?: Maybe<Scalars["Float"]["output"]>;
	maxWeight?: Maybe<Scalars["Float"]["output"]>;
	name: Scalars["String"]["output"];
	parentLocation?: Maybe<Locations>;
	path?: Maybe<Scalars["String"]["output"]>;
	putawayRules?: Maybe<Array<PutawayRules>>;
	sourceTaskItems?: Maybe<Array<TaskItems>>;
	temperatureControlled?: Maybe<Scalars["Boolean"]["output"]>;
	type: LocationType;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	warehouse: Warehouses;
	xCoordinate?: Maybe<Scalars["Float"]["output"]>;
	yCoordinate?: Maybe<Scalars["Float"]["output"]>;
	zCoordinate?: Maybe<Scalars["Float"]["output"]>;
};

export type Mutation = {
	__typename?: "Mutation";
	billing?: Maybe<BillingMutation>;
	crm?: Maybe<CrmMutation>;
	dms?: Maybe<DmsMutation>;
	tms?: Maybe<TmsMutation>;
	wms?: Maybe<WmsMutation>;
};

export type Notifications = {
	__typename?: "Notifications";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	isRead?: Maybe<Scalars["Boolean"]["output"]>;
	link?: Maybe<Scalars["String"]["output"]>;
	message: Scalars["String"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	user: User;
};

export type Opportunities = {
	__typename?: "Opportunities";
	campaign?: Maybe<Campaigns>;
	company?: Maybe<Companies>;
	contact?: Maybe<Contacts>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	dealValue?: Maybe<Scalars["Float"]["output"]>;
	expectedCloseDate?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	lostReason?: Maybe<Scalars["String"]["output"]>;
	name: Scalars["String"]["output"];
	owner?: Maybe<User>;
	probability?: Maybe<Scalars["Float"]["output"]>;
	products?: Maybe<Array<OpportunityProducts>>;
	salesOrders?: Maybe<Array<SalesOrders>>;
	source?: Maybe<OpportunitySource>;
	stage?: Maybe<OpportunityStage>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type OpportunitiesAnalytics = {
	__typename?: "OpportunitiesAnalytics";
	averageDealSize: Scalars["Float"]["output"];
	countByStage: Array<StageCount>;
	totalRevenueByStage: Array<StageRevenue>;
	winRate: Scalars["Float"]["output"];
};

export type OpportunityProducts = {
	__typename?: "OpportunityProducts";
	id: Scalars["ID"]["output"];
	opportunity: Opportunities;
	product: Products;
	quantity: Scalars["Float"]["output"];
};

export enum OpportunitySource {
	Advertisment = "ADVERTISMENT",
	ColdCall = "COLD_CALL",
	EmailCampaign = "EMAIL_CAMPAIGN",
	Event = "EVENT",
	ExistingCustomer = "EXISTING_CUSTOMER",
	Other = "OTHER",
	Partner = "PARTNER",
	Referral = "REFERRAL",
	SocialMedia = "SOCIAL_MEDIA",
	Website = "WEBSITE",
}

export enum OpportunityStage {
	ClosedLost = "CLOSED_LOST",
	ClosedWon = "CLOSED_WON",
	Demo = "DEMO",
	NeedAnalysis = "NEED_ANALYSIS",
	Negotiation = "NEGOTIATION",
	Proposal = "PROPOSAL",
	Prospecting = "PROSPECTING",
	Qualification = "QUALIFICATION",
}

export type OutboundShipmentItems = {
	__typename?: "OutboundShipmentItems";
	batch?: Maybe<InventoryBatches>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	outboundShipment: OutboundShipments;
	product: WmsProducts;
	quantityShipped: Scalars["Int"]["output"];
	salesOrderItem: SalesOrderItems;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum OutboundShipmentStatus {
	Cancelled = "CANCELLED",
	Delivered = "DELIVERED",
	Packed = "PACKED",
	Picking = "PICKING",
	Shipped = "SHIPPED",
}

export type OutboundShipments = {
	__typename?: "OutboundShipments";
	carrier?: Maybe<Scalars["String"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	items?: Maybe<Array<OutboundShipmentItems>>;
	salesOrder: SalesOrders;
	status?: Maybe<OutboundShipmentStatus>;
	trackingNumber?: Maybe<Scalars["String"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	warehouseId: Scalars["ID"]["output"];
};

export type PackageItems = {
	__typename?: "PackageItems";
	batch?: Maybe<InventoryBatches>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	expiryDate?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	lotNumber?: Maybe<Scalars["String"]["output"]>;
	package: Packages;
	product: WmsProducts;
	quantity: Scalars["Int"]["output"];
	serialNumbers: Array<Scalars["String"]["output"]>;
	totalWeight?: Maybe<Scalars["Float"]["output"]>;
	unitWeight?: Maybe<Scalars["Float"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type Packages = {
	__typename?: "Packages";
	carrier?: Maybe<Scalars["String"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	deliveryTasks?: Maybe<Array<DeliveryTasks>>;
	height?: Maybe<Scalars["Float"]["output"]>;
	id: Scalars["ID"]["output"];
	insuranceValue?: Maybe<Scalars["Float"]["output"]>;
	isFragile?: Maybe<Scalars["Boolean"]["output"]>;
	isHazmat?: Maybe<Scalars["Boolean"]["output"]>;
	items?: Maybe<Array<PackageItems>>;
	length?: Maybe<Scalars["Float"]["output"]>;
	packageNumber: Scalars["String"]["output"];
	packageType?: Maybe<Scalars["String"]["output"]>;
	packedAt?: Maybe<Scalars["String"]["output"]>;
	packedByUser?: Maybe<User>;
	requiresSignature?: Maybe<Scalars["Boolean"]["output"]>;
	salesOrder: SalesOrders;
	serviceLevel?: Maybe<Scalars["String"]["output"]>;
	shippedAt?: Maybe<Scalars["String"]["output"]>;
	trackingNumber?: Maybe<Scalars["String"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	volume?: Maybe<Scalars["Float"]["output"]>;
	warehouse: Warehouses;
	weight?: Maybe<Scalars["Float"]["output"]>;
	width?: Maybe<Scalars["Float"]["output"]>;
};

export type PartnerInvoiceItems = {
	__typename?: "PartnerInvoiceItems";
	amount: Scalars["Float"]["output"];
	id: Scalars["ID"]["output"];
	partnerInvoice: PartnerInvoices;
	shipmentLeg: ShipmentLegs;
};

export enum PartnerInvoiceStatus {
	Cancelled = "CANCELLED",
	Disputed = "DISPUTED",
	Overdue = "OVERDUE",
	Paid = "PAID",
	Pending = "PENDING",
}

export type PartnerInvoices = {
	__typename?: "PartnerInvoices";
	carrier: Carriers;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	invoiceDate: Scalars["String"]["output"];
	invoiceNumber: Scalars["String"]["output"];
	items?: Maybe<Array<PartnerInvoiceItems>>;
	status?: Maybe<PartnerInvoiceStatus>;
	totalAmount: Scalars["Float"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type PaymentFailedEvent = {
	__typename?: "PaymentFailedEvent";
	failureReason?: Maybe<Scalars["String"]["output"]>;
	payment: Payments;
};

export enum PaymentMethod {
	BankTransfer = "BANK_TRANSFER",
	Cash = "CASH",
	Check = "CHECK",
	ClientCredit = "CLIENT_CREDIT",
	CreditCard = "CREDIT_CARD",
	DebitCard = "DEBIT_CARD",
	QrPh = "QR_PH",
	Wallet = "WALLET",
}

export type PaymentRefundedEvent = {
	__typename?: "PaymentRefundedEvent";
	payment: Payments;
	refundAmount: Scalars["String"]["output"];
};

export enum PaymentStatus {
	Cancelled = "CANCELLED",
	Failed = "FAILED",
	Pending = "PENDING",
	Processing = "PROCESSING",
	Refunded = "REFUNDED",
	Successful = "SUCCESSFUL",
}

export type PaymentStatusChangedEvent = {
	__typename?: "PaymentStatusChangedEvent";
	id: Scalars["ID"]["output"];
	invoiceId: Scalars["ID"]["output"];
	newStatus: PaymentStatus;
	previousStatus: PaymentStatus;
};

export type Payments = {
	__typename?: "Payments";
	amount: Scalars["Float"]["output"];
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	currency?: Maybe<Scalars["String"]["output"]>;
	exchangeRate?: Maybe<Scalars["Float"]["output"]>;
	fees?: Maybe<Scalars["Float"]["output"]>;
	gatewayReference?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	invoice: BillingInvoices;
	netAmount?: Maybe<Scalars["Float"]["output"]>;
	notes?: Maybe<Scalars["String"]["output"]>;
	paymentDate?: Maybe<Scalars["String"]["output"]>;
	paymentMethod: PaymentMethod;
	processedAt?: Maybe<Scalars["String"]["output"]>;
	processedByUser?: Maybe<User>;
	status?: Maybe<PaymentStatus>;
	transactionId?: Maybe<Scalars["String"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type PickBatchItems = {
	__typename?: "PickBatchItems";
	actualPickTime?: Maybe<Scalars["Int"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	estimatedPickTime?: Maybe<Scalars["Int"]["output"]>;
	id: Scalars["ID"]["output"];
	orderPriority?: Maybe<Scalars["Int"]["output"]>;
	pickBatch: PickBatches;
	salesOrder: SalesOrders;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum PickBatchStatus {
	Cancelled = "CANCELLED",
	Completed = "COMPLETED",
	InProgress = "IN_PROGRESS",
	Open = "OPEN",
}

export type PickBatches = {
	__typename?: "PickBatches";
	actualDuration?: Maybe<Scalars["Int"]["output"]>;
	assignedUser?: Maybe<User>;
	batchNumber: Scalars["String"]["output"];
	completedAt?: Maybe<Scalars["String"]["output"]>;
	completedItems?: Maybe<Scalars["Int"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	estimatedDuration?: Maybe<Scalars["Int"]["output"]>;
	id: Scalars["ID"]["output"];
	items?: Maybe<Array<PickBatchItems>>;
	priority?: Maybe<Scalars["Int"]["output"]>;
	startedAt?: Maybe<Scalars["String"]["output"]>;
	status?: Maybe<PickBatchStatus>;
	strategy: PickStrategy;
	tasks?: Maybe<Array<Tasks>>;
	totalItems?: Maybe<Scalars["Int"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	warehouse: Warehouses;
	waveId?: Maybe<Scalars["String"]["output"]>;
	zoneRestrictions?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
};

export enum PickStrategy {
	BatchPicking = "BATCH_PICKING",
	ClusterPicking = "CLUSTER_PICKING",
	SingleOrderPicking = "SINGLE_ORDER_PICKING",
	WavePicking = "WAVE_PICKING",
	ZonePicking = "ZONE_PICKING",
}

export enum PricingModel {
	FlatRate = "FLAT_RATE",
	Percentage = "PERCENTAGE",
	PerCubicMeter = "PER_CUBIC_METER",
	PerItem = "PER_ITEM",
	PerKg = "PER_KG",
	PerZone = "PER_ZONE",
	Tiered = "TIERED",
}

export enum ProductStatus {
	Active = "ACTIVE",
	Discontinued = "DISCONTINUED",
	Inactive = "INACTIVE",
	Obsolete = "OBSOLETE",
}

export enum ProductType {
	Digital = "DIGITAL",
	Good = "GOOD",
	Service = "SERVICE",
	Subscription = "SUBSCRIPTION",
}

export type Products = {
	__typename?: "Products";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	description?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	name: Scalars["String"]["output"];
	price: Scalars["Float"]["output"];
	sku?: Maybe<Scalars["String"]["output"]>;
	type?: Maybe<ProductType>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type ProofOfDeliveries = {
	__typename?: "ProofOfDeliveries";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	filePath?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	latitude?: Maybe<Scalars["Float"]["output"]>;
	longitude?: Maybe<Scalars["Float"]["output"]>;
	timestamp: Scalars["String"]["output"];
	tripStop: TripStops;
	type?: Maybe<ProofType>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum ProofOfDeliveryType {
	CodeVerification = "CODE_VERIFICATION",
	ContactlessDelivery = "CONTACTLESS_DELIVERY",
	LeftAtDoor = "LEFT_AT_DOOR",
	Photo = "PHOTO",
	Signature = "SIGNATURE",
}

export enum ProofType {
	BarcodeScan = "BARCODE_SCAN",
	Photo = "PHOTO",
	PinVerification = "PIN_VERIFICATION",
	Signature = "SIGNATURE",
}

export type PutawayRules = {
	__typename?: "PutawayRules";
	client?: Maybe<Companies>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	isActive?: Maybe<Scalars["Boolean"]["output"]>;
	locationType?: Maybe<LocationType>;
	maxQuantity?: Maybe<Scalars["Int"]["output"]>;
	minQuantity?: Maybe<Scalars["Int"]["output"]>;
	preferredLocation?: Maybe<Locations>;
	priority: Scalars["Int"]["output"];
	product: WmsProducts;
	requiresHazmatApproval?: Maybe<Scalars["Boolean"]["output"]>;
	requiresTemperatureControl?: Maybe<Scalars["Boolean"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	volumeThreshold?: Maybe<Scalars["Float"]["output"]>;
	warehouse: Warehouses;
	weightThreshold?: Maybe<Scalars["Float"]["output"]>;
};

export type Query = {
	__typename?: "Query";
	billing?: Maybe<BillingQuery>;
	crm?: Maybe<CrmQuery>;
	dms?: Maybe<DmsQuery>;
	tms?: Maybe<TmsQuery>;
	wms?: Maybe<WmsQuery>;
};

export type QuoteConvertedEvent = {
	__typename?: "QuoteConvertedEvent";
	invoiceId: Scalars["ID"]["output"];
	quote: Quotes;
};

export type QuoteExpiredEvent = {
	__typename?: "QuoteExpiredEvent";
	clientId?: Maybe<Scalars["ID"]["output"]>;
	id: Scalars["ID"]["output"];
	quoteNumber?: Maybe<Scalars["String"]["output"]>;
};

export enum QuoteStatus {
	Accepted = "ACCEPTED",
	Cancelled = "CANCELLED",
	Converted = "CONVERTED",
	Expired = "EXPIRED",
	Pending = "PENDING",
}

export type QuoteStatusChangedEvent = {
	__typename?: "QuoteStatusChangedEvent";
	clientId?: Maybe<Scalars["ID"]["output"]>;
	id: Scalars["ID"]["output"];
	newStatus: QuoteStatus;
	previousStatus: QuoteStatus;
};

export type Quotes = {
	__typename?: "Quotes";
	billingInvoices?: Maybe<Array<BillingInvoices>>;
	client?: Maybe<Companies>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	createdByUser?: Maybe<User>;
	destinationDetails: Scalars["String"]["output"];
	expiresAt?: Maybe<Scalars["String"]["output"]>;
	height?: Maybe<Scalars["Float"]["output"]>;
	id: Scalars["ID"]["output"];
	length?: Maybe<Scalars["Float"]["output"]>;
	notes?: Maybe<Scalars["String"]["output"]>;
	originDetails: Scalars["String"]["output"];
	quoteNumber?: Maybe<Scalars["String"]["output"]>;
	quotedPrice: Scalars["Float"]["output"];
	serviceLevel?: Maybe<Scalars["String"]["output"]>;
	status?: Maybe<QuoteStatus>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	volume?: Maybe<Scalars["Float"]["output"]>;
	weight?: Maybe<Scalars["Float"]["output"]>;
	width?: Maybe<Scalars["Float"]["output"]>;
};

export type RateCardDeactivatedEvent = {
	__typename?: "RateCardDeactivatedEvent";
	id: Scalars["ID"]["output"];
	name: Scalars["String"]["output"];
	reason: Scalars["String"]["output"];
};

export type RateCards = {
	__typename?: "RateCards";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	createdByUser?: Maybe<User>;
	description?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	isActive?: Maybe<Scalars["Boolean"]["output"]>;
	name: Scalars["String"]["output"];
	rules?: Maybe<Array<RateRules>>;
	serviceType: ServiceType;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	validFrom: Scalars["String"]["output"];
	validTo?: Maybe<Scalars["String"]["output"]>;
};

export type RateRules = {
	__typename?: "RateRules";
	condition: Scalars["String"]["output"];
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	isActive?: Maybe<Scalars["Boolean"]["output"]>;
	maxValue?: Maybe<Scalars["Float"]["output"]>;
	minValue?: Maybe<Scalars["Float"]["output"]>;
	price: Scalars["Float"]["output"];
	pricingModel: PricingModel;
	priority?: Maybe<Scalars["Int"]["output"]>;
	rateCard: RateCards;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	value: Scalars["String"]["output"];
};

export enum RecordType {
	Campaigns = "CAMPAIGNS",
	Cases = "CASES",
	Companies = "COMPANIES",
	Contacts = "CONTACTS",
	Interactions = "INTERACTIONS",
	Invoices = "INVOICES",
	Leads = "LEADS",
	Opportunities = "OPPORTUNITIES",
	Products = "PRODUCTS",
}

export type ReorderPoints = {
	__typename?: "ReorderPoints";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	product: WmsProducts;
	threshold: Scalars["Int"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	warehouse: Warehouses;
};

export enum ReturnItemCondition {
	Damaged = "DAMAGED",
	Defective = "DEFECTIVE",
	Expired = "EXPIRED",
	Sellable = "SELLABLE",
	Unsellable = "UNSELLABLE",
}

export type ReturnItems = {
	__typename?: "ReturnItems";
	condition?: Maybe<ReturnItemCondition>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	product: WmsProducts;
	quantityExpected: Scalars["Int"]["output"];
	quantityReceived?: Maybe<Scalars["Int"]["output"]>;
	quantityVariance?: Maybe<Scalars["Int"]["output"]>;
	return: Returns;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum ReturnStatus {
	Approved = "APPROVED",
	Processed = "PROCESSED",
	Received = "RECEIVED",
	Rejected = "REJECTED",
	Requested = "REQUESTED",
}

export type Returns = {
	__typename?: "Returns";
	client: Companies;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	items?: Maybe<Array<ReturnItems>>;
	reason?: Maybe<Scalars["String"]["output"]>;
	returnNumber: Scalars["String"]["output"];
	salesOrder?: Maybe<SalesOrders>;
	status?: Maybe<ReturnStatus>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type Routes = {
	__typename?: "Routes";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	optimizedRouteData?: Maybe<Scalars["String"]["output"]>;
	totalDistance?: Maybe<Scalars["Float"]["output"]>;
	totalDuration?: Maybe<Scalars["Float"]["output"]>;
	trip: Trips;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type SalesOrderItems = {
	__typename?: "SalesOrderItems";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	outboundShipmentItems?: Maybe<Array<OutboundShipmentItems>>;
	product: WmsProducts;
	quantityOrdered: Scalars["Int"]["output"];
	salesOrder: SalesOrders;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum SalesOrderStatus {
	Cancelled = "CANCELLED",
	Completed = "COMPLETED",
	Pending = "PENDING",
	Processing = "PROCESSING",
	Shipped = "SHIPPED",
}

export type SalesOrders = {
	__typename?: "SalesOrders";
	client: Companies;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	crmOpportunity?: Maybe<Opportunities>;
	id: Scalars["ID"]["output"];
	items?: Maybe<Array<SalesOrderItems>>;
	orderNumber: Scalars["String"]["output"];
	outboundShipments?: Maybe<Array<OutboundShipments>>;
	packages?: Maybe<Array<Packages>>;
	pickBatchItems?: Maybe<Array<PickBatchItems>>;
	returns?: Maybe<Array<Returns>>;
	shippingAddress?: Maybe<Scalars["String"]["output"]>;
	status?: Maybe<SalesOrderStatus>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum ServiceType {
	Customs = "CUSTOMS",
	Fulfillment = "FULFILLMENT",
	Handling = "HANDLING",
	Insurance = "INSURANCE",
	Packaging = "PACKAGING",
	Returns = "RETURNS",
	Shipping = "SHIPPING",
	Storage = "STORAGE",
}

export type ShipmentCreatedFromPaymentEvent = {
	__typename?: "ShipmentCreatedFromPaymentEvent";
	paymentId: Scalars["ID"]["output"];
	quoteId?: Maybe<Scalars["ID"]["output"]>;
	shipmentId: Scalars["ID"]["output"];
};

export type ShipmentLegEvents = {
	__typename?: "ShipmentLegEvents";
	eventTimestamp: Scalars["String"]["output"];
	id: Scalars["ID"]["output"];
	location?: Maybe<Scalars["String"]["output"]>;
	shipmentLeg: ShipmentLegs;
	statusMessage?: Maybe<Scalars["String"]["output"]>;
};

export enum ShipmentLegStatus {
	Cancelled = "CANCELLED",
	Delivered = "DELIVERED",
	Failed = "FAILED",
	InTransit = "IN_TRANSIT",
	Pending = "PENDING",
}

export type ShipmentLegs = {
	__typename?: "ShipmentLegs";
	carrier?: Maybe<Carriers>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	endLocation?: Maybe<Scalars["String"]["output"]>;
	events?: Maybe<Array<ShipmentLegEvents>>;
	id: Scalars["ID"]["output"];
	internalTrip?: Maybe<Trips>;
	legSequence: Scalars["Int"]["output"];
	partnerInvoiceItems?: Maybe<Array<PartnerInvoiceItems>>;
	shipment?: Maybe<OutboundShipments>;
	startLocation?: Maybe<Scalars["String"]["output"]>;
	status?: Maybe<ShipmentLegStatus>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum SortDirection {
	Asc = "ASC",
	Desc = "DESC",
}

export type StageCount = {
	__typename?: "StageCount";
	count: Scalars["Int"]["output"];
	stage: Scalars["String"]["output"];
};

export type StageRevenue = {
	__typename?: "StageRevenue";
	revenue: Scalars["Float"]["output"];
	stage: Scalars["String"]["output"];
};

export enum StockTransferStatus {
	Cancelled = "CANCELLED",
	InTransit = "IN_TRANSIT",
	Pending = "PENDING",
	Received = "RECEIVED",
}

export type StockTransfers = {
	__typename?: "StockTransfers";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	destinationWarehouse: Warehouses;
	id: Scalars["ID"]["output"];
	product: WmsProducts;
	quantity: Scalars["Int"]["output"];
	sourceWarehouse: Warehouses;
	status?: Maybe<StockTransferStatus>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type Subscription = {
	__typename?: "Subscription";
	accountingSyncFailed: AccountingSyncFailedEvent;
	accountingSyncSucceeded: AccountingSyncSucceededEvent;
	accountingSyncTriggered: AccountingSyncTriggeredEvent;
	caseAssigned: CrmCaseAssignedEvent;
	caseStatusChanged: CrmCaseStatusChangedEvent;
	clientAccountBalanceUpdated: ClientAccountBalanceUpdatedEvent;
	clientAccountLastPaymentDateUpdated: ClientAccountLastPaymentDateUpdatedEvent;
	creditNoteApplied: CreditNoteAppliedEvent;
	creditNoteIssued: CreditNotes;
	creditNoteOnDisputeApproval: CreditNoteOnDisputeApprovalEvent;
	crmInvoicePaid: Invoices;
	crmInvoiceStatusChanged: CrmInvoiceStatusChangedEvent;
	deliveryRouteCancelled: DeliveryRoutes;
	deliveryRouteCompleted: DeliveryRoutes;
	deliveryRoutePaused: DeliveryRoutes;
	deliveryRouteStarted: DeliveryRoutes;
	deliveryTaskDelivered: DeliveryTasks;
	deliveryTaskFailed: DmsDeliveryTaskFailedEvent;
	deliveryTaskOutForDelivery: DeliveryTasks;
	deliveryTaskStatusChanged: DmsDeliveryTaskStatusChangedEvent;
	disputeApproved: DisputeApprovedEvent;
	disputeDenied: DisputeDeniedEvent;
	disputeOpened: Disputes;
	disputeResolved: DisputeResolvedEvent;
	disputeStatusChanged: DisputeStatusChangedEvent;
	disputeUnderReview: Disputes;
	documentGenerated: DocumentGeneratedEvent;
	driverLocationRemoved: DmsDriverLocationRemovedEvent;
	driverLocationUpdated: DriverLocations;
	driverStatusChanged: TmsDriverStatusChangedEvent;
	expenseApproved: Expenses;
	expenseRejected: TmsExpenseRejectedEvent;
	expenseStatusChanged: TmsExpenseStatusChangedEvent;
	expenseSubmitted: Expenses;
	geofenceEntered: TmsGeofenceEvent;
	geofenceExited: TmsGeofenceEvent;
	inboundShipmentCompleted: InboundShipments;
	inboundShipmentProcessing: InboundShipments;
	inboundShipmentReceived: InboundShipments;
	inboundShipmentStatusChanged: WmsInboundShipmentStatusChangedEvent;
	inventoryAdjustmentDamagedReturn: WmsInventoryAdjustmentDamagedReturnEvent;
	inventoryAdjustmentRecorded: WmsInventoryAdjustmentRecordedEvent;
	inventoryStockLowStockAlert: WmsInventoryStockLowStockAlertEvent;
	inventoryStockReleased: WmsInventoryStockReleasedEvent;
	inventoryStockReserved: WmsInventoryStockReservedEvent;
	inventoryStockStatusChanged: WmsInventoryStockStatusChangedEvent;
	invoiceCreated: BillingInvoices;
	invoiceDisputed: InvoiceDisputedEvent;
	invoiceOverdue: InvoiceOverdueEvent;
	invoicePaid: InvoicePaidEvent;
	invoicePartiallyPaid: InvoicePartiallyPaidEvent;
	invoiceSent: BillingInvoices;
	invoiceStatusChanged: InvoiceStatusChangedEvent;
	invoiceViewed: BillingInvoices;
	leadConverted: Leads;
	leadStatusChanged: CrmLeadStatusChangedEvent;
	notificationMarked: CrmNotificationMarkedEvent;
	opportunityLost: Opportunities;
	opportunityStageChanged: CrmOpportunityStageChangedEvent;
	opportunityWon: Opportunities;
	outboundShipmentCreated: OutboundShipments;
	outboundShipmentDelivered: OutboundShipments;
	outboundShipmentPacked: OutboundShipments;
	outboundShipmentPicking: OutboundShipments;
	outboundShipmentShipped: OutboundShipments;
	outboundShipmentStatusChanged: WmsOutboundShipmentStatusChangedEvent;
	paymentFailed: PaymentFailedEvent;
	paymentInitiated: Payments;
	paymentProcessing: Payments;
	paymentRefunded: PaymentRefundedEvent;
	paymentStatusChanged: PaymentStatusChangedEvent;
	paymentSuccessful: Payments;
	pickBatchCompleted: PickBatches;
	pickBatchCreated: PickBatches;
	pickBatchStarted: PickBatches;
	pickBatchStatusChanged: WmsPickBatchStatusChangedEvent;
	proofOfDeliveryRecorded: DmsProofOfDeliveries;
	quoteAccepted: Quotes;
	quoteConverted: QuoteConvertedEvent;
	quoteCreated: Quotes;
	quoteExpired: QuoteExpiredEvent;
	quoteSent: Quotes;
	quoteStatusChanged: QuoteStatusChangedEvent;
	rateCardDeactivated: RateCardDeactivatedEvent;
	returnApproved: Returns;
	returnItemEvaluated: WmsReturnItemEvaluatedEvent;
	returnProcessed: Returns;
	returnReceived: Returns;
	returnRejected: WmsReturnRejectedEvent;
	returnStatusChanged: WmsReturnStatusChangedEvent;
	salesOrderCompleted: SalesOrders;
	salesOrderCreated: SalesOrders;
	salesOrderProcessing: SalesOrders;
	salesOrderShipped: SalesOrders;
	salesOrderStatusChanged: WmsSalesOrderStatusChangedEvent;
	shipmentCreatedFromPayment: ShipmentCreatedFromPaymentEvent;
	stockTransferInTransit: StockTransfers;
	stockTransferInitiated: StockTransfers;
	stockTransferReceived: StockTransfers;
	stockTransferStatusChanged: WmsStockTransferStatusChangedEvent;
	surchargeDeactivated: SurchargeDeactivatedEvent;
	taskAssigned: WmsTaskAssignedEvent;
	taskCancelled: Tasks;
	taskCompleted: Tasks;
	taskCreated: Tasks;
	taskEventRecorded: TaskEvents;
	taskEventStatusUpdated: DmsTaskEventStatusUpdatedEvent;
	taskItemCompleted: TaskItems;
	taskItemDamaged: TaskItems;
	taskItemShortPicked: WmsTaskItemShortPickedEvent;
	taskItemStatusChanged: WmsTaskItemStatusChangedEvent;
	taskPutawayCreated: WmsTaskPutawayCreatedEvent;
	taskReplenishmentCreated: WmsTaskReplenishmentCreatedEvent;
	taskStarted: Tasks;
	taskStatusChanged: WmsTaskStatusChangedEvent;
	trackingLinkExpired: DmsTrackingLinkExpiredEvent;
	trackingLinkGenerated: CustomerTrackingLinks;
	transactionCredited: TransactionCreditedEvent;
	transactionDebited: TransactionDebitedEvent;
	tripCancelled: Trips;
	tripCompleted: Trips;
	tripCreated: Trips;
	tripStarted: Trips;
	tripStatusChanged: TmsTripStatusChangedEvent;
	tripStopArrived: TripStops;
	tripStopCompleted: TripStops;
	tripStopSkipped: TmsTripStopSkippedEvent;
	vehicleMaintenanceScheduled: VehicleMaintenance;
	vehicleStatusChanged: TmsVehicleStatusChangedEvent;
};

export type Suppliers = {
	__typename?: "Suppliers";
	contactPerson?: Maybe<Scalars["String"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	email?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	name: Scalars["String"]["output"];
	phoneNumber?: Maybe<Scalars["String"]["output"]>;
	products?: Maybe<Array<WmsProducts>>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum SurchargeCalculationMethod {
	Fixed = "FIXED",
	Percentage = "PERCENTAGE",
	PerUnit = "PER_UNIT",
	SlidingScale = "SLIDING_SCALE",
}

export type SurchargeDeactivatedEvent = {
	__typename?: "SurchargeDeactivatedEvent";
	id: Scalars["ID"]["output"];
	reason: Scalars["String"]["output"];
};

export type Surcharges = {
	__typename?: "Surcharges";
	amount: Scalars["Float"]["output"];
	calculationMethod: SurchargeCalculationMethod;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	description?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	isActive?: Maybe<Scalars["Boolean"]["output"]>;
	name: Scalars["String"]["output"];
	type: Scalars["String"]["output"];
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	validFrom?: Maybe<Scalars["String"]["output"]>;
	validTo?: Maybe<Scalars["String"]["output"]>;
};

export enum SyncStatus {
	Failed = "FAILED",
	InProgress = "IN_PROGRESS",
	Pending = "PENDING",
	Retry = "RETRY",
	Success = "SUCCESS",
}

export enum TaskEventStatus {
	Arrived = "ARRIVED",
	Assigned = "ASSIGNED",
	Cancelled = "CANCELLED",
	Delivered = "DELIVERED",
	Exception = "EXCEPTION",
	Failed = "FAILED",
	Rescheduled = "RESCHEDULED",
	Started = "STARTED",
}

export type TaskEvents = {
	__typename?: "TaskEvents";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	deliveryTask: DeliveryTasks;
	id: Scalars["ID"]["output"];
	latitude?: Maybe<Scalars["Float"]["output"]>;
	longitude?: Maybe<Scalars["Float"]["output"]>;
	notes?: Maybe<Scalars["String"]["output"]>;
	reason?: Maybe<Scalars["String"]["output"]>;
	status: TaskEventStatus;
	timestamp?: Maybe<Scalars["String"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum TaskItemStatus {
	Completed = "COMPLETED",
	Damaged = "DAMAGED",
	InProgress = "IN_PROGRESS",
	NotFound = "NOT_FOUND",
	Pending = "PENDING",
	ShortPicked = "SHORT_PICKED",
}

export type TaskItems = {
	__typename?: "TaskItems";
	batch?: Maybe<InventoryBatches>;
	completedAt?: Maybe<Scalars["String"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	destinationLocation?: Maybe<Locations>;
	expiryDate?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	lotNumber?: Maybe<Scalars["String"]["output"]>;
	notes?: Maybe<Scalars["String"]["output"]>;
	product: WmsProducts;
	quantityCompleted: Scalars["Int"]["output"];
	quantityRemaining?: Maybe<Scalars["Int"]["output"]>;
	quantityRequired: Scalars["Int"]["output"];
	serialNumbers?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
	sourceLocation?: Maybe<Locations>;
	status?: Maybe<TaskItemStatus>;
	task: Tasks;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export enum TaskStatus {
	Assigned = "ASSIGNED",
	Cancelled = "CANCELLED",
	Completed = "COMPLETED",
	Error = "ERROR",
	InProgress = "IN_PROGRESS",
	Pending = "PENDING",
}

export enum TaskType {
	CrossDock = "CROSS_DOCK",
	CycleCount = "CYCLE_COUNT",
	DamageInspection = "DAMAGE_INSPECTION",
	Pack = "PACK",
	Pick = "PICK",
	Putaway = "PUTAWAY",
	QualityCheck = "QUALITY_CHECK",
	Replenishment = "REPLENISHMENT",
	ReturnsProcessing = "RETURNS_PROCESSING",
}

export type Tasks = {
	__typename?: "Tasks";
	actualDuration?: Maybe<Scalars["Int"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	durationSeconds?: Maybe<Scalars["Int"]["output"]>;
	endTime?: Maybe<Scalars["String"]["output"]>;
	estimatedDuration?: Maybe<Scalars["Int"]["output"]>;
	id: Scalars["ID"]["output"];
	instructions?: Maybe<Scalars["String"]["output"]>;
	items?: Maybe<Array<TaskItems>>;
	notes?: Maybe<Scalars["String"]["output"]>;
	pickBatch?: Maybe<PickBatches>;
	priority?: Maybe<Scalars["Int"]["output"]>;
	sourceEntityId?: Maybe<Scalars["ID"]["output"]>;
	sourceEntityType?: Maybe<Scalars["String"]["output"]>;
	startTime?: Maybe<Scalars["String"]["output"]>;
	status?: Maybe<TaskStatus>;
	taskNumber: Scalars["String"]["output"];
	type: TaskType;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	user?: Maybe<User>;
	warehouse: Warehouses;
};

export type TmsDriverStatusChangedEvent = {
	__typename?: "TmsDriverStatusChangedEvent";
	id: Scalars["ID"]["output"];
	newStatus: DriverStatus;
	previousStatus: DriverStatus;
};

export type TmsExpenseRejectedEvent = {
	__typename?: "TmsExpenseRejectedEvent";
	expense: Expenses;
	rejectionReason?: Maybe<Scalars["String"]["output"]>;
};

export type TmsExpenseStatusChangedEvent = {
	__typename?: "TmsExpenseStatusChangedEvent";
	driverId?: Maybe<Scalars["ID"]["output"]>;
	id: Scalars["ID"]["output"];
	newStatus: ExpenseStatus;
	previousStatus: ExpenseStatus;
};

export type TmsGeofenceEvent = {
	__typename?: "TmsGeofenceEvent";
	geofenceEvent: GeofenceEvents;
	geofenceName: Scalars["String"]["output"];
};

export type TmsMutation = {
	__typename?: "TmsMutation";
	addPartnerInvoiceItem: PartnerInvoiceItems;
	addVehicleMaintenance: VehicleMaintenance;
	createCarrier: Carriers;
	createCarrierRate: CarrierRates;
	createDriver: Drivers;
	createDriverSchedule: DriverSchedules;
	createExpense: Expenses;
	createGeofence: Geofences;
	createGeofenceEvent: GeofenceEvents;
	createGpsPing: GpsPings;
	createPartnerInvoice: PartnerInvoices;
	createProofOfDelivery: ProofOfDeliveries;
	createRoute: Routes;
	createShipmentLeg: ShipmentLegs;
	createShipmentLegEvent: ShipmentLegEvents;
	createTrip: Trips;
	createTripStop: TripStops;
	createVehicle: Vehicles;
	removeCarrier: DeleteResult;
	removeCarrierRate: DeleteResult;
	removeDriver: DeleteResult;
	removeDriverSchedule: DeleteResult;
	removeExpense: DeleteResult;
	removeGeofence: DeleteResult;
	removePartnerInvoiceItem: DeleteResult;
	removeRoute: DeleteResult;
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
	updateTrip: Trips;
	updateTripStop: TripStops;
	updateVehicle: Vehicles;
	updateVehicleMaintenance: VehicleMaintenance;
};

export type TmsMutationAddPartnerInvoiceItemArgs = {
	id: Scalars["ID"]["input"];
	value: CreatePartnerInvoiceItemInput;
};

export type TmsMutationAddVehicleMaintenanceArgs = {
	id: Scalars["ID"]["input"];
	value: CreateVehicleMaintenanceInput;
};

export type TmsMutationCreateCarrierArgs = {
	value: CreateCarrierInput;
};

export type TmsMutationCreateCarrierRateArgs = {
	value: CreateCarrierRateInput;
};

export type TmsMutationCreateDriverArgs = {
	value: CreateDriverInput;
};

export type TmsMutationCreateDriverScheduleArgs = {
	value: CreateDriverScheduleInput;
};

export type TmsMutationCreateExpenseArgs = {
	value: CreateExpenseInput;
};

export type TmsMutationCreateGeofenceArgs = {
	value: CreateGeofenceInput;
};

export type TmsMutationCreateGeofenceEventArgs = {
	value: CreateGeofenceEventInput;
};

export type TmsMutationCreateGpsPingArgs = {
	value: CreateGpsPingInput;
};

export type TmsMutationCreatePartnerInvoiceArgs = {
	value: CreatePartnerInvoiceInput;
};

export type TmsMutationCreateProofOfDeliveryArgs = {
	value: CreateProofOfDeliveryInput;
};

export type TmsMutationCreateRouteArgs = {
	value: CreateRouteInput;
};

export type TmsMutationCreateShipmentLegArgs = {
	value: CreateShipmentLegInput;
};

export type TmsMutationCreateShipmentLegEventArgs = {
	value: CreateShipmentLegEventInput;
};

export type TmsMutationCreateTripArgs = {
	value: CreateTripInput;
};

export type TmsMutationCreateTripStopArgs = {
	value: CreateTripStopInput;
};

export type TmsMutationCreateVehicleArgs = {
	value: CreateVehicleInput;
};

export type TmsMutationRemoveCarrierArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsMutationRemoveCarrierRateArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsMutationRemoveDriverArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsMutationRemoveDriverScheduleArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsMutationRemoveExpenseArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsMutationRemoveGeofenceArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsMutationRemovePartnerInvoiceItemArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsMutationRemoveRouteArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsMutationRemoveTripArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsMutationRemoveTripStopArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsMutationRemoveVehicleArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsMutationRemoveVehicleMaintenanceArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsMutationUpdateCarrierArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateCarrierInput>;
};

export type TmsMutationUpdateCarrierRateArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateCarrierRateInput>;
};

export type TmsMutationUpdateDriverArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateDriverInput>;
};

export type TmsMutationUpdateDriverScheduleArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateDriverScheduleInput>;
};

export type TmsMutationUpdateExpenseArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateExpenseInput>;
};

export type TmsMutationUpdateGeofenceArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateGeofenceInput>;
};

export type TmsMutationUpdateGeofenceEventArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateGeofenceEventInput>;
};

export type TmsMutationUpdateGpsPingArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateGpsPingInput>;
};

export type TmsMutationUpdatePartnerInvoiceArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdatePartnerInvoiceInput>;
};

export type TmsMutationUpdatePartnerInvoiceItemArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdatePartnerInvoiceItemInput>;
};

export type TmsMutationUpdateProofOfDeliveryArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateProofOfDeliveryInput>;
};

export type TmsMutationUpdateRouteArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateRouteInput>;
};

export type TmsMutationUpdateShipmentLegArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateShipmentLegInput>;
};

export type TmsMutationUpdateTripArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateTripInput>;
};

export type TmsMutationUpdateTripStopArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateTripStopInput>;
};

export type TmsMutationUpdateVehicleArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateVehicleInput>;
};

export type TmsMutationUpdateVehicleMaintenanceArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateVehicleMaintenanceInput>;
};

export type TmsQuery = {
	__typename?: "TmsQuery";
	carrier: Carriers;
	carriers: Array<Carriers>;
	driver: Drivers;
	driverSchedule: DriverSchedules;
	driverSchedules: Array<DriverSchedules>;
	drivers: Array<Drivers>;
	expense: Expenses;
	expenses: Array<Expenses>;
	geofence: Geofences;
	geofences: Array<Geofences>;
	gpsPing: GpsPings;
	gpsPings: Array<GpsPings>;
	partnerInvoice: PartnerInvoices;
	partnerInvoices: Array<PartnerInvoices>;
	proofOfDeliveries: Array<ProofOfDeliveries>;
	proofOfDelivery: ProofOfDeliveries;
	route: Routes;
	routes: Array<Routes>;
	shipmentLeg: ShipmentLegs;
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

export type TmsQueryCarrierArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryCarriersArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type TmsQueryDriverArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryDriverScheduleArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryDriverSchedulesArgs = {
	driverId?: InputMaybe<Scalars["ID"]["input"]>;
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	reason?: InputMaybe<DriverScheduleReason>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type TmsQueryDriversArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<DriverStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type TmsQueryExpenseArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryExpensesArgs = {
	currency?: InputMaybe<Currency>;
	driverId?: InputMaybe<Scalars["ID"]["input"]>;
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<ExpenseStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
	type?: InputMaybe<ExpenseType>;
};

export type TmsQueryGeofenceArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryGeofencesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type TmsQueryGpsPingArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryGpsPingsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type TmsQueryPartnerInvoiceArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryPartnerInvoicesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<PartnerInvoiceStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type TmsQueryProofOfDeliveriesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
	tripId?: InputMaybe<Scalars["ID"]["input"]>;
	tripStopId?: InputMaybe<Scalars["ID"]["input"]>;
	type?: InputMaybe<ProofType>;
};

export type TmsQueryProofOfDeliveryArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryRouteArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryRoutesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type TmsQueryShipmentLegArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryShipmentLegsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<ShipmentLegStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type TmsQueryTripArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryTripStopArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryTripStopsArgs = {
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	status?: InputMaybe<TripStopStatus>;
	tripId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type TmsQueryTripsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<TripStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type TmsQueryVehicleArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryVehicleMaintenanceArgs = {
	id: Scalars["ID"]["input"];
};

export type TmsQueryVehicleMaintenancesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	serviceType?: InputMaybe<VehicleServiceType>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
	vehicleId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type TmsQueryVehiclesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<VehicleStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type TmsTripStatusChangedEvent = {
	__typename?: "TmsTripStatusChangedEvent";
	driverId?: Maybe<Scalars["ID"]["output"]>;
	id: Scalars["ID"]["output"];
	newStatus: TripStatus;
	previousStatus: TripStatus;
	vehicleId?: Maybe<Scalars["ID"]["output"]>;
};

export type TmsTripStopSkippedEvent = {
	__typename?: "TmsTripStopSkippedEvent";
	reason?: Maybe<Scalars["String"]["output"]>;
	tripStop: TripStops;
};

export type TmsVehicleStatusChangedEvent = {
	__typename?: "TmsVehicleStatusChangedEvent";
	id: Scalars["ID"]["output"];
	newStatus: VehicleStatus;
	previousStatus: VehicleStatus;
};

export type TransactionCreditedEvent = {
	__typename?: "TransactionCreditedEvent";
	amount: Scalars["String"]["output"];
	clientId: Scalars["ID"]["output"];
	paymentId: Scalars["ID"]["output"];
	runningBalance: Scalars["String"]["output"];
	transactionId: Scalars["ID"]["output"];
};

export type TransactionDebitedEvent = {
	__typename?: "TransactionDebitedEvent";
	amount: Scalars["String"]["output"];
	clientId: Scalars["ID"]["output"];
	invoiceId: Scalars["ID"]["output"];
	runningBalance: Scalars["String"]["output"];
	transactionId: Scalars["ID"]["output"];
};

export enum TransactionType {
	Adjustment = "ADJUSTMENT",
	Credit = "CREDIT",
	Debit = "DEBIT",
	Fee = "FEE",
	Refund = "REFUND",
	TopUp = "TOP_UP",
}

export enum TripStatus {
	Cancelled = "CANCELLED",
	Completed = "COMPLETED",
	InProgress = "IN_PROGRESS",
	Planned = "PLANNED",
}

export enum TripStopStatus {
	Arrived = "ARRIVED",
	Completed = "COMPLETED",
	Pending = "PENDING",
	Skipped = "SKIPPED",
}

export type TripStops = {
	__typename?: "TripStops";
	actualArrivalTime?: Maybe<Scalars["String"]["output"]>;
	actualDepartureTime?: Maybe<Scalars["String"]["output"]>;
	address?: Maybe<Scalars["String"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	estimatedArrivalTime?: Maybe<Scalars["String"]["output"]>;
	estimatedDepartureTime?: Maybe<Scalars["String"]["output"]>;
	id: Scalars["ID"]["output"];
	proofOfDeliveries?: Maybe<Array<ProofOfDeliveries>>;
	sequence: Scalars["Int"]["output"];
	shipment?: Maybe<OutboundShipments>;
	status?: Maybe<TripStopStatus>;
	trip: Trips;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type Trips = {
	__typename?: "Trips";
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	driver?: Maybe<Drivers>;
	endLocation?: Maybe<Scalars["String"]["output"]>;
	endTime?: Maybe<Scalars["String"]["output"]>;
	expenses?: Maybe<Array<Expenses>>;
	id: Scalars["ID"]["output"];
	routes?: Maybe<Array<Routes>>;
	shipmentLegs?: Maybe<Array<ShipmentLegs>>;
	startLocation?: Maybe<Scalars["String"]["output"]>;
	startTime?: Maybe<Scalars["String"]["output"]>;
	status?: Maybe<TripStatus>;
	stops?: Maybe<Array<TripStops>>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	vehicle?: Maybe<Vehicles>;
};

export type UpdateBillingInvoiceInput = {
	amountPaid?: InputMaybe<Scalars["Float"]["input"]>;
	currency?: InputMaybe<Scalars["String"]["input"]>;
	dueDate?: InputMaybe<Scalars["String"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	paidAt?: InputMaybe<Scalars["Date"]["input"]>;
	paymentTerms?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<BillingInvoiceStatus>;
};

export type UpdateBinThresholdInput = {
	alertThreshold?: InputMaybe<Scalars["Int"]["input"]>;
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
	maxQuantity?: InputMaybe<Scalars["Int"]["input"]>;
	minQuantity?: InputMaybe<Scalars["Int"]["input"]>;
	reorderQuantity?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateCampaignInput = {
	budget?: InputMaybe<Scalars["Float"]["input"]>;
	endDate?: InputMaybe<Scalars["Date"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	startDate?: InputMaybe<Scalars["Date"]["input"]>;
};

export type UpdateCarrierInput = {
	contactEmail?: InputMaybe<Scalars["String"]["input"]>;
	contactPerson?: InputMaybe<Scalars["String"]["input"]>;
	contactPhone?: InputMaybe<Scalars["String"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	servicesOffered?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateCarrierRateInput = {
	destination?: InputMaybe<Scalars["String"]["input"]>;
	origin?: InputMaybe<Scalars["String"]["input"]>;
	rate?: InputMaybe<Scalars["Float"]["input"]>;
	serviceType?: InputMaybe<Scalars["String"]["input"]>;
	unit?: InputMaybe<CarrierRateUnit>;
};

export type UpdateCaseInput = {
	priority?: InputMaybe<CasePriority>;
	status?: InputMaybe<CaseStatus>;
	type?: InputMaybe<CaseType>;
};

export type UpdateClientAccountInput = {
	availableCredit?: InputMaybe<Scalars["Float"]["input"]>;
	creditLimit?: InputMaybe<Scalars["Float"]["input"]>;
	currency?: InputMaybe<Scalars["String"]["input"]>;
	isCreditApproved?: InputMaybe<Scalars["Boolean"]["input"]>;
	lastPaymentDate?: InputMaybe<Scalars["Date"]["input"]>;
	paymentTermsDays?: InputMaybe<Scalars["Int"]["input"]>;
	walletBalance?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateCompanyInput = {
	annualRevenue?: InputMaybe<Scalars["Float"]["input"]>;
	city?: InputMaybe<Scalars["String"]["input"]>;
	country?: InputMaybe<Scalars["String"]["input"]>;
	industry?: InputMaybe<Scalars["String"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
	postalCode?: InputMaybe<Scalars["String"]["input"]>;
	state?: InputMaybe<Scalars["String"]["input"]>;
	street?: InputMaybe<Scalars["String"]["input"]>;
	website?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateContactInput = {
	email?: InputMaybe<Scalars["String"]["input"]>;
	jobTitle?: InputMaybe<Scalars["String"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateCreditNoteInput = {
	amount?: InputMaybe<Scalars["Float"]["input"]>;
	appliedAt?: InputMaybe<Scalars["String"]["input"]>;
	creditNoteNumber?: InputMaybe<Scalars["String"]["input"]>;
	currency?: InputMaybe<Scalars["String"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	reason?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateCustomerTrackingLinkInput = {
	accessCount?: InputMaybe<Scalars["Int"]["input"]>;
	expiresAt?: InputMaybe<Scalars["String"]["input"]>;
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UpdateDeliveryRouteInput = {
	completedAt?: InputMaybe<Scalars["String"]["input"]>;
	estimatedDurationMinutes?: InputMaybe<Scalars["Int"]["input"]>;
	optimizedRouteData?: InputMaybe<Scalars["String"]["input"]>;
	routeDate?: InputMaybe<Scalars["String"]["input"]>;
	startedAt?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<DeliveryRouteStatus>;
	totalDistanceKm?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateDeliveryTaskInput = {
	actualArrivalTime?: InputMaybe<Scalars["String"]["input"]>;
	attemptCount?: InputMaybe<Scalars["Int"]["input"]>;
	deliveryAddress?: InputMaybe<Scalars["String"]["input"]>;
	deliveryInstructions?: InputMaybe<Scalars["String"]["input"]>;
	deliveryTime?: InputMaybe<Scalars["String"]["input"]>;
	estimatedArrivalTime?: InputMaybe<Scalars["String"]["input"]>;
	failureReason?: InputMaybe<DeliveryFailureReason>;
	recipientName?: InputMaybe<Scalars["String"]["input"]>;
	recipientPhone?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<DeliveryTaskStatus>;
};

export type UpdateDisputeInput = {
	disputedAmount?: InputMaybe<Scalars["Float"]["input"]>;
	reason?: InputMaybe<Scalars["String"]["input"]>;
	resolutionNotes?: InputMaybe<Scalars["String"]["input"]>;
	resolvedAt?: InputMaybe<Scalars["String"]["input"]>;
	resolvedByUserId?: InputMaybe<Scalars["ID"]["input"]>;
	status?: InputMaybe<DisputeStatus>;
};

export type UpdateDocumentInput = {
	documentType?: InputMaybe<DocumentType>;
	fileName?: InputMaybe<Scalars["String"]["input"]>;
	filePath?: InputMaybe<Scalars["String"]["input"]>;
	fileSize?: InputMaybe<Scalars["Int"]["input"]>;
	mimeType?: InputMaybe<Scalars["String"]["input"]>;
	recordId?: InputMaybe<Scalars["ID"]["input"]>;
	recordType?: InputMaybe<Scalars["String"]["input"]>;
	uploadedByUserId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type UpdateDriverInput = {
	contactPhone?: InputMaybe<Scalars["String"]["input"]>;
	licenseExpiryDate?: InputMaybe<Scalars["String"]["input"]>;
	licenseNumber?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<DriverStatus>;
};

export type UpdateDriverLocationInput = {
	accuracy?: InputMaybe<Scalars["Float"]["input"]>;
	altitude?: InputMaybe<Scalars["Float"]["input"]>;
	heading?: InputMaybe<Scalars["Float"]["input"]>;
	latitude?: InputMaybe<Scalars["Float"]["input"]>;
	longitude?: InputMaybe<Scalars["Float"]["input"]>;
	speedKmh?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateDriverScheduleInput = {
	endDate?: InputMaybe<Scalars["String"]["input"]>;
	reason?: InputMaybe<DriverScheduleReason>;
	startDate?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateExpenseInput = {
	amount?: InputMaybe<Scalars["Float"]["input"]>;
	currency?: InputMaybe<Currency>;
	description?: InputMaybe<Scalars["String"]["input"]>;
	expenseDate?: InputMaybe<Scalars["Date"]["input"]>;
	fuelQuantity?: InputMaybe<Scalars["Float"]["input"]>;
	odometerReading?: InputMaybe<Scalars["Int"]["input"]>;
	receiptUrl?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<ExpenseStatus>;
	type?: InputMaybe<ExpenseType>;
};

export type UpdateGeofenceEventInput = {
	eventType?: InputMaybe<GeofenceEventType>;
};

export type UpdateGeofenceInput = {
	latitude?: InputMaybe<Scalars["Float"]["input"]>;
	longitude?: InputMaybe<Scalars["Float"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateGpsPingInput = {
	latitude?: InputMaybe<Scalars["Float"]["input"]>;
	longitude?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateInboundShipmentInput = {
	actualArrivalDate?: InputMaybe<Scalars["String"]["input"]>;
	expectedArrivalDate?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<InboundShipmentStatus>;
};

export type UpdateInboundShipmentItemInput = {
	discrepancyNotes?: InputMaybe<Scalars["String"]["input"]>;
	expectedQuantity?: InputMaybe<Scalars["Int"]["input"]>;
	receivedQuantity?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateInteractionInput = {
	interactionDate?: InputMaybe<Scalars["Date"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	outcome?: InputMaybe<InteractionOutcome>;
	type?: InputMaybe<InteractionType>;
};

export type UpdateInventoryAdjustmentInput = {
	notes?: InputMaybe<Scalars["String"]["input"]>;
	quantityChange?: InputMaybe<Scalars["Int"]["input"]>;
	reason?: InputMaybe<InventoryAdjustmentReason>;
	userId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type UpdateInventoryBatchInput = {
	batchNumber?: InputMaybe<Scalars["String"]["input"]>;
	expirationDate?: InputMaybe<Scalars["Date"]["input"]>;
};

export type UpdateInventoryStockInput = {
	lastCountedAt?: InputMaybe<Scalars["Date"]["input"]>;
	lastMovementAt?: InputMaybe<Scalars["Date"]["input"]>;
	quantity?: InputMaybe<Scalars["Int"]["input"]>;
	reservedQuantity?: InputMaybe<Scalars["Int"]["input"]>;
	status?: InputMaybe<InventoryStockStatus>;
};

export type UpdateInvoiceInput = {
	dueDate?: InputMaybe<Scalars["Date"]["input"]>;
	paidAt?: InputMaybe<Scalars["Date"]["input"]>;
	paymentMethod?: InputMaybe<CrmInvoicePaymentMethod>;
	status?: InputMaybe<InvoiceStatus>;
};

export type UpdateInvoiceItemInput = {
	quantity: Scalars["Float"]["input"];
};

export type UpdateInvoiceLineItemInput = {
	description?: InputMaybe<Scalars["String"]["input"]>;
	discountRate?: InputMaybe<Scalars["Float"]["input"]>;
	quantity?: InputMaybe<Scalars["Float"]["input"]>;
	taxRate?: InputMaybe<Scalars["Float"]["input"]>;
	unitPrice?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateLeadInput = {
	convertedAt?: InputMaybe<Scalars["Date"]["input"]>;
	convertedCompanyId?: InputMaybe<Scalars["ID"]["input"]>;
	convertedContactId?: InputMaybe<Scalars["ID"]["input"]>;
	convertedOpportunityId?: InputMaybe<Scalars["ID"]["input"]>;
	email?: InputMaybe<Scalars["String"]["input"]>;
	leadScore?: InputMaybe<Scalars["Int"]["input"]>;
	leadSource?: InputMaybe<LeadSource>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<LeadStatus>;
};

export type UpdateLocationInput = {
	barcode?: InputMaybe<Scalars["String"]["input"]>;
	hazmatApproved?: InputMaybe<Scalars["Boolean"]["input"]>;
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
	isPickable?: InputMaybe<Scalars["Boolean"]["input"]>;
	isReceivable?: InputMaybe<Scalars["Boolean"]["input"]>;
	level?: InputMaybe<Scalars["Int"]["input"]>;
	maxPallets?: InputMaybe<Scalars["Int"]["input"]>;
	maxVolume?: InputMaybe<Scalars["Float"]["input"]>;
	maxWeight?: InputMaybe<Scalars["Float"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	path?: InputMaybe<Scalars["String"]["input"]>;
	temperatureControlled?: InputMaybe<Scalars["Boolean"]["input"]>;
	type?: InputMaybe<LocationType>;
	xCoordinate?: InputMaybe<Scalars["Float"]["input"]>;
	yCoordinate?: InputMaybe<Scalars["Float"]["input"]>;
	zCoordinate?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateNotificationInput = {
	isRead?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UpdateOpportunityInput = {
	dealValue?: InputMaybe<Scalars["Float"]["input"]>;
	expectedCloseDate?: InputMaybe<Scalars["Date"]["input"]>;
	lostReason?: InputMaybe<Scalars["String"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	probability?: InputMaybe<Scalars["Float"]["input"]>;
	source?: InputMaybe<OpportunitySource>;
	stage?: InputMaybe<OpportunityStage>;
};

export type UpdateOpportunityProductInput = {
	quantity: Scalars["Float"]["input"];
};

export type UpdateOutboundShipmentInput = {
	carrier?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<OutboundShipmentStatus>;
};

export type UpdateOutboundShipmentItemInput = {
	quantityShipped?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdatePackageInput = {
	carrier?: InputMaybe<Scalars["String"]["input"]>;
	height?: InputMaybe<Scalars["Float"]["input"]>;
	insuranceValue?: InputMaybe<Scalars["Float"]["input"]>;
	isFragile?: InputMaybe<Scalars["Boolean"]["input"]>;
	isHazmat?: InputMaybe<Scalars["Boolean"]["input"]>;
	length?: InputMaybe<Scalars["Float"]["input"]>;
	packageNumber?: InputMaybe<Scalars["String"]["input"]>;
	packageType?: InputMaybe<Scalars["String"]["input"]>;
	packedAt?: InputMaybe<Scalars["Date"]["input"]>;
	requiresSignature?: InputMaybe<Scalars["Boolean"]["input"]>;
	serviceLevel?: InputMaybe<Scalars["String"]["input"]>;
	shippedAt?: InputMaybe<Scalars["Date"]["input"]>;
	trackingNumber?: InputMaybe<Scalars["String"]["input"]>;
	warehouseId?: InputMaybe<Scalars["ID"]["input"]>;
	weight?: InputMaybe<Scalars["Float"]["input"]>;
	width?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdatePackageItemInput = {
	expiryDate?: InputMaybe<Scalars["String"]["input"]>;
	lotNumber?: InputMaybe<Scalars["String"]["input"]>;
	quantity?: InputMaybe<Scalars["Int"]["input"]>;
	unitWeight?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdatePartnerInvoiceInput = {
	status?: InputMaybe<PartnerInvoiceStatus>;
};

export type UpdatePartnerInvoiceItemInput = {
	amount: Scalars["Float"]["input"];
};

export type UpdatePaymentInput = {
	currency?: InputMaybe<Scalars["String"]["input"]>;
	exchangeRate?: InputMaybe<Scalars["Float"]["input"]>;
	fees?: InputMaybe<Scalars["Float"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<PaymentStatus>;
};

export type UpdatePickBatchInput = {
	actualDuration?: InputMaybe<Scalars["Int"]["input"]>;
	assignedUserId?: InputMaybe<Scalars["ID"]["input"]>;
	batchNumber?: InputMaybe<Scalars["String"]["input"]>;
	completedAt?: InputMaybe<Scalars["Date"]["input"]>;
	completedItems?: InputMaybe<Scalars["Int"]["input"]>;
	priority?: InputMaybe<Scalars["Int"]["input"]>;
	status?: InputMaybe<PickBatchStatus>;
	strategy?: InputMaybe<PickStrategy>;
	warehouseId?: InputMaybe<Scalars["ID"]["input"]>;
	waveId?: InputMaybe<Scalars["String"]["input"]>;
	zoneRestrictions: Array<Scalars["String"]["input"]>;
};

export type UpdatePickBatchItemInput = {
	actualPickTime?: InputMaybe<Scalars["Int"]["input"]>;
	estimatedPickTime?: InputMaybe<Scalars["Int"]["input"]>;
	orderPriority?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateProductInput = {
	description?: InputMaybe<Scalars["String"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	price?: InputMaybe<Scalars["Float"]["input"]>;
	sku?: InputMaybe<Scalars["String"]["input"]>;
	type?: InputMaybe<ProductType>;
};

export type UpdateProofOfDeliveryInput = {
	type?: InputMaybe<ProofType>;
};

export type UpdatePutawayRuleInput = {
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
	locationType?: InputMaybe<LocationType>;
	maxQuantity?: InputMaybe<Scalars["Int"]["input"]>;
	minQuantity?: InputMaybe<Scalars["Int"]["input"]>;
	preferredLocationId?: InputMaybe<Scalars["ID"]["input"]>;
	priority?: InputMaybe<Scalars["Int"]["input"]>;
	requiresHazmatApproval?: InputMaybe<Scalars["Boolean"]["input"]>;
	requiresTemperatureControl?: InputMaybe<Scalars["Boolean"]["input"]>;
	volumeThreshold?: InputMaybe<Scalars["Float"]["input"]>;
	warehouseId?: InputMaybe<Scalars["ID"]["input"]>;
	weightThreshold?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateQuoteInput = {
	destinationDetails?: InputMaybe<Scalars["String"]["input"]>;
	expiresAt?: InputMaybe<Scalars["String"]["input"]>;
	height?: InputMaybe<Scalars["Float"]["input"]>;
	length?: InputMaybe<Scalars["Float"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	originDetails?: InputMaybe<Scalars["String"]["input"]>;
	quotedPrice?: InputMaybe<Scalars["Float"]["input"]>;
	serviceLevel?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<QuoteStatus>;
	weight?: InputMaybe<Scalars["Float"]["input"]>;
	width?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateRateCardInput = {
	createdByUserId?: InputMaybe<Scalars["ID"]["input"]>;
	description?: InputMaybe<Scalars["String"]["input"]>;
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	serviceType?: InputMaybe<ServiceType>;
	validFrom?: InputMaybe<Scalars["String"]["input"]>;
	validTo?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateRateRuleInput = {
	condition?: InputMaybe<Scalars["String"]["input"]>;
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
	maxValue?: InputMaybe<Scalars["Float"]["input"]>;
	minValue?: InputMaybe<Scalars["Float"]["input"]>;
	price?: InputMaybe<Scalars["Float"]["input"]>;
	pricingModel?: InputMaybe<PricingModel>;
	priority?: InputMaybe<Scalars["Int"]["input"]>;
	rateCardId?: InputMaybe<Scalars["ID"]["input"]>;
	value?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateReorderPointInput = {
	threshold?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateReturnInput = {
	reason?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<ReturnStatus>;
};

export type UpdateReturnItemInput = {
	condition?: InputMaybe<ReturnItemCondition>;
	quantityReceived?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateRouteInput = {
	optimizedRouteData?: InputMaybe<Scalars["String"]["input"]>;
	totalDistance?: InputMaybe<Scalars["Float"]["input"]>;
	totalDuration?: InputMaybe<Scalars["Float"]["input"]>;
};

export type UpdateSalesOrderInput = {
	shippingAddress?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<SalesOrderStatus>;
};

export type UpdateSalesOrderItemInput = {
	quantityOrdered?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateShipmentLegInput = {
	carrierId?: InputMaybe<Scalars["ID"]["input"]>;
	endLocation?: InputMaybe<Scalars["String"]["input"]>;
	internalTripId?: InputMaybe<Scalars["ID"]["input"]>;
	legSequence?: InputMaybe<Scalars["Int"]["input"]>;
	startLocation?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<ShipmentLegStatus>;
};

export type UpdateStockTransferInput = {
	destinationWarehouseId?: InputMaybe<Scalars["ID"]["input"]>;
	quantity?: InputMaybe<Scalars["Int"]["input"]>;
	status?: InputMaybe<StockTransferStatus>;
};

export type UpdateSupplierInput = {
	contactPerson?: InputMaybe<Scalars["String"]["input"]>;
	email?: InputMaybe<Scalars["String"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateSurchargeInput = {
	amount?: InputMaybe<Scalars["Float"]["input"]>;
	calculationMethod?: InputMaybe<SurchargeCalculationMethod>;
	description?: InputMaybe<Scalars["String"]["input"]>;
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	type?: InputMaybe<Scalars["String"]["input"]>;
	validFrom?: InputMaybe<Scalars["String"]["input"]>;
	validTo?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateTaskInput = {
	actualDuration?: InputMaybe<Scalars["Int"]["input"]>;
	endTime?: InputMaybe<Scalars["Date"]["input"]>;
	estimatedDuration?: InputMaybe<Scalars["Int"]["input"]>;
	instructions?: InputMaybe<Scalars["String"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	pickBatchId?: InputMaybe<Scalars["ID"]["input"]>;
	priority?: InputMaybe<Scalars["Int"]["input"]>;
	sourceEntityId?: InputMaybe<Scalars["ID"]["input"]>;
	sourceEntityType?: InputMaybe<Scalars["String"]["input"]>;
	startTime?: InputMaybe<Scalars["Date"]["input"]>;
	status?: InputMaybe<TaskStatus>;
	taskNumber?: InputMaybe<Scalars["String"]["input"]>;
	type?: InputMaybe<TaskType>;
	userId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type UpdateTaskItemInput = {
	completedAt?: InputMaybe<Scalars["String"]["input"]>;
	destinationLocationId?: InputMaybe<Scalars["ID"]["input"]>;
	expiryDate?: InputMaybe<Scalars["Date"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	quantityCompleted?: InputMaybe<Scalars["Int"]["input"]>;
	quantityRequired?: InputMaybe<Scalars["Int"]["input"]>;
	sourceLocationId?: InputMaybe<Scalars["ID"]["input"]>;
	status?: InputMaybe<TaskItemStatus>;
};

export type UpdateTripInput = {
	endLocation?: InputMaybe<Scalars["String"]["input"]>;
	endTime?: InputMaybe<Scalars["String"]["input"]>;
	startLocation?: InputMaybe<Scalars["String"]["input"]>;
	startTime?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<TripStatus>;
};

export type UpdateTripStopInput = {
	actualArrivalTime?: InputMaybe<Scalars["String"]["input"]>;
	actualDepartureTime?: InputMaybe<Scalars["String"]["input"]>;
	address?: InputMaybe<Scalars["String"]["input"]>;
	estimatedArrivalTime?: InputMaybe<Scalars["String"]["input"]>;
	estimatedDepartureTime?: InputMaybe<Scalars["String"]["input"]>;
	sequence?: InputMaybe<Scalars["Int"]["input"]>;
	status?: InputMaybe<TripStopStatus>;
};

export type UpdateVehicleInput = {
	capacityVolume?: InputMaybe<Scalars["Float"]["input"]>;
	capacityWeight?: InputMaybe<Scalars["Float"]["input"]>;
	currentMileage?: InputMaybe<Scalars["Int"]["input"]>;
	lastMaintenanceDate?: InputMaybe<Scalars["String"]["input"]>;
	make?: InputMaybe<Scalars["String"]["input"]>;
	model?: InputMaybe<Scalars["String"]["input"]>;
	registrationNumber?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<VehicleStatus>;
	vin?: InputMaybe<Scalars["String"]["input"]>;
	year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UpdateVehicleMaintenanceInput = {
	cost?: InputMaybe<Scalars["Float"]["input"]>;
	notes?: InputMaybe<Scalars["String"]["input"]>;
	serviceDate?: InputMaybe<Scalars["Date"]["input"]>;
	serviceType?: InputMaybe<VehicleServiceType>;
};

export type UpdateWarehouseInput = {
	address?: InputMaybe<Scalars["String"]["input"]>;
	city?: InputMaybe<Scalars["String"]["input"]>;
	contactEmail?: InputMaybe<Scalars["String"]["input"]>;
	contactPerson?: InputMaybe<Scalars["String"]["input"]>;
	contactPhone?: InputMaybe<Scalars["String"]["input"]>;
	country?: InputMaybe<Scalars["String"]["input"]>;
	isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	postalCode?: InputMaybe<Scalars["String"]["input"]>;
	state?: InputMaybe<Scalars["String"]["input"]>;
	timezone?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateWmsProductInput = {
	barcode?: InputMaybe<Scalars["String"]["input"]>;
	costPrice?: InputMaybe<Scalars["Float"]["input"]>;
	description?: InputMaybe<Scalars["String"]["input"]>;
	height?: InputMaybe<Scalars["Float"]["input"]>;
	length?: InputMaybe<Scalars["Float"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	sku?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<ProductStatus>;
	weight?: InputMaybe<Scalars["Float"]["input"]>;
	width?: InputMaybe<Scalars["Float"]["input"]>;
};

export type User = {
	__typename?: "User";
	banExpires?: Maybe<Scalars["Date"]["output"]>;
	banReason?: Maybe<Scalars["String"]["output"]>;
	banned?: Maybe<Scalars["Boolean"]["output"]>;
	createdAt: Scalars["Date"]["output"];
	email: Scalars["String"]["output"];
	emailVerified: Scalars["Boolean"]["output"];
	id: Scalars["ID"]["output"];
	image?: Maybe<Scalars["String"]["output"]>;
	name: Scalars["String"]["output"];
	role?: Maybe<Scalars["String"]["output"]>;
	updatedAt: Scalars["Date"]["output"];
};

export type VehicleMaintenance = {
	__typename?: "VehicleMaintenance";
	cost?: Maybe<Scalars["Float"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	id: Scalars["ID"]["output"];
	notes?: Maybe<Scalars["String"]["output"]>;
	serviceDate: Scalars["Date"]["output"];
	serviceType?: Maybe<VehicleServiceType>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	vehicle: Vehicles;
};

export enum VehicleServiceType {
	BrakeService = "BRAKE_SERVICE",
	Inspection = "INSPECTION",
	OilChange = "OIL_CHANGE",
	Repair = "REPAIR",
	RoutineMaintenance = "ROUTINE_MAINTENANCE",
	TireReplacement = "TIRE_REPLACEMENT",
}

export enum VehicleStatus {
	Available = "AVAILABLE",
	InMaintenance = "IN_MAINTENANCE",
	OnTrip = "ON_TRIP",
	OutOfService = "OUT_OF_SERVICE",
}

export type Vehicles = {
	__typename?: "Vehicles";
	capacityVolume?: Maybe<Scalars["Float"]["output"]>;
	capacityWeight?: Maybe<Scalars["Float"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	currentMileage?: Maybe<Scalars["Int"]["output"]>;
	geofenceEvents?: Maybe<Array<GeofenceEvents>>;
	gpsPings?: Maybe<Array<GpsPings>>;
	id: Scalars["ID"]["output"];
	lastMaintenanceDate?: Maybe<Scalars["String"]["output"]>;
	maintenances?: Maybe<Array<VehicleMaintenance>>;
	make?: Maybe<Scalars["String"]["output"]>;
	model?: Maybe<Scalars["String"]["output"]>;
	registrationNumber: Scalars["String"]["output"];
	status?: Maybe<VehicleStatus>;
	trips?: Maybe<Array<Trips>>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	vin?: Maybe<Scalars["String"]["output"]>;
	year?: Maybe<Scalars["Int"]["output"]>;
};

export type Warehouses = {
	__typename?: "Warehouses";
	address?: Maybe<Scalars["String"]["output"]>;
	city?: Maybe<Scalars["String"]["output"]>;
	contactEmail?: Maybe<Scalars["String"]["output"]>;
	contactPerson?: Maybe<Scalars["String"]["output"]>;
	contactPhone?: Maybe<Scalars["String"]["output"]>;
	country?: Maybe<Scalars["String"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	destinationStockTransfers?: Maybe<Array<StockTransfers>>;
	id: Scalars["ID"]["output"];
	inboundShipments?: Maybe<Array<InboundShipments>>;
	isActive?: Maybe<Scalars["Boolean"]["output"]>;
	locations?: Maybe<Array<Locations>>;
	name: Scalars["String"]["output"];
	outboundShipments?: Maybe<Array<OutboundShipments>>;
	packages?: Maybe<Array<Packages>>;
	pickBatches?: Maybe<Array<PickBatches>>;
	postalCode?: Maybe<Scalars["String"]["output"]>;
	putawayRules?: Maybe<Array<PutawayRules>>;
	sourceStockTransfers?: Maybe<Array<StockTransfers>>;
	state?: Maybe<Scalars["String"]["output"]>;
	tasks?: Maybe<Array<Tasks>>;
	timezone?: Maybe<Scalars["String"]["output"]>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type WmsInboundShipmentStatusChangedEvent = {
	__typename?: "WmsInboundShipmentStatusChangedEvent";
	id: Scalars["ID"]["output"];
	newStatus: InboundShipmentStatus;
	previousStatus: InboundShipmentStatus;
	warehouseId: Scalars["ID"]["output"];
};

export type WmsInventoryAdjustmentDamagedReturnEvent = {
	__typename?: "WmsInventoryAdjustmentDamagedReturnEvent";
	inventoryAdjustment: InventoryAdjustments;
	returnId: Scalars["ID"]["output"];
};

export type WmsInventoryAdjustmentRecordedEvent = {
	__typename?: "WmsInventoryAdjustmentRecordedEvent";
	inventoryAdjustment: InventoryAdjustments;
	previousQuantity: Scalars["Int"]["output"];
};

export type WmsInventoryStockLowStockAlertEvent = {
	__typename?: "WmsInventoryStockLowStockAlertEvent";
	currentQuantity: Scalars["Int"]["output"];
	id: Scalars["ID"]["output"];
	locationId: Scalars["ID"]["output"];
	productId: Scalars["ID"]["output"];
	reorderPoint: Scalars["Int"]["output"];
	warehouseId: Scalars["ID"]["output"];
};

export type WmsInventoryStockReleasedEvent = {
	__typename?: "WmsInventoryStockReleasedEvent";
	inventoryStock: InventoryStock;
	releasedQuantity: Scalars["Int"]["output"];
};

export type WmsInventoryStockReservedEvent = {
	__typename?: "WmsInventoryStockReservedEvent";
	inventoryStock: InventoryStock;
	reservedQuantity: Scalars["Int"]["output"];
};

export type WmsInventoryStockStatusChangedEvent = {
	__typename?: "WmsInventoryStockStatusChangedEvent";
	id: Scalars["ID"]["output"];
	locationId: Scalars["ID"]["output"];
	newStatus: InventoryStockStatus;
	previousStatus: InventoryStockStatus;
	productId: Scalars["ID"]["output"];
	quantity: Scalars["Int"]["output"];
};

export type WmsMutation = {
	__typename?: "WmsMutation";
	addInboundShipmentItem: InboundShipmentItems;
	addOutboundShipmentItem: OutboundShipmentItems;
	addPackageItem: PackageItems;
	addPickBatchItem: PickBatchItems;
	addReturnItem: ReturnItems;
	addSalesOrderItem: SalesOrderItems;
	addTaskItem: TaskItems;
	createBinThreshold: BinThresholds;
	createInboundShipment: InboundShipments;
	createInventoryAdjustment: InventoryAdjustments;
	createInventoryBatch: InventoryBatches;
	createInventoryStock: InventoryStock;
	createLocation: Locations;
	createOutboundShipment: OutboundShipments;
	createPackage: Packages;
	createPickBatch: PickBatches;
	createPutawayRule: PutawayRules;
	createReorderPoint: ReorderPoints;
	createReturn: Returns;
	createSalesOrder: SalesOrders;
	createStockTransfer: StockTransfers;
	createSupplier: Suppliers;
	createTask: Tasks;
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

export type WmsMutationAddInboundShipmentItemArgs = {
	id: Scalars["ID"]["input"];
	value: CreateInboundShipmentItemInput;
};

export type WmsMutationAddOutboundShipmentItemArgs = {
	id: Scalars["ID"]["input"];
	value: CreateOutboundShipmentItemInput;
};

export type WmsMutationAddPackageItemArgs = {
	id: Scalars["ID"]["input"];
	value: CreatePackageItemInput;
};

export type WmsMutationAddPickBatchItemArgs = {
	id: Scalars["ID"]["input"];
	value: CreatePickBatchItemInput;
};

export type WmsMutationAddReturnItemArgs = {
	id: Scalars["ID"]["input"];
	value: CreateReturnItemInput;
};

export type WmsMutationAddSalesOrderItemArgs = {
	id: Scalars["ID"]["input"];
	value: CreateSalesOrderItemInput;
};

export type WmsMutationAddTaskItemArgs = {
	id: Scalars["ID"]["input"];
	value: CreateTaskItemInput;
};

export type WmsMutationCreateBinThresholdArgs = {
	value: CreateBinThresholdInput;
};

export type WmsMutationCreateInboundShipmentArgs = {
	value: CreateInboundShipmentInput;
};

export type WmsMutationCreateInventoryAdjustmentArgs = {
	value: CreateInventoryAdjustmentInput;
};

export type WmsMutationCreateInventoryBatchArgs = {
	value: CreateInventoryBatchInput;
};

export type WmsMutationCreateInventoryStockArgs = {
	value: CreateInventoryStockInput;
};

export type WmsMutationCreateLocationArgs = {
	value: CreateLocationInput;
};

export type WmsMutationCreateOutboundShipmentArgs = {
	value: CreateOutboundShipmentInput;
};

export type WmsMutationCreatePackageArgs = {
	value: CreatePackageInput;
};

export type WmsMutationCreatePickBatchArgs = {
	value: CreatePickBatchInput;
};

export type WmsMutationCreatePutawayRuleArgs = {
	value: CreatePutawayRuleInput;
};

export type WmsMutationCreateReorderPointArgs = {
	value: CreateReorderPointInput;
};

export type WmsMutationCreateReturnArgs = {
	value: CreateReturnInput;
};

export type WmsMutationCreateSalesOrderArgs = {
	value: CreateSalesOrderInput;
};

export type WmsMutationCreateStockTransferArgs = {
	value: CreateStockTransferInput;
};

export type WmsMutationCreateSupplierArgs = {
	value: CreateSupplierInput;
};

export type WmsMutationCreateTaskArgs = {
	value: CreateTaskInput;
};

export type WmsMutationCreateWarehouseArgs = {
	value: CreateWarehouseInput;
};

export type WmsMutationCreateWmsProductArgs = {
	value: CreateWmsProductInput;
};

export type WmsMutationRemoveBinThresholdArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveInboundShipmentArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveInboundShipmentItemArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveInventoryAdjustmentArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveInventoryBatchArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveInventoryStockArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveLocationArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveOutboundShipmentArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveOutboundShipmentItemArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemovePackageArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemovePackageItemArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemovePickBatchArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemovePickBatchItemArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemovePutawayRuleArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveReorderPointArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveReturnArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveReturnItemArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveSalesOrderArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveSalesOrderItemArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveStockTransferArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveSupplierArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveTaskArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveTaskItemArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveWarehouseArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationRemoveWmsProductArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsMutationUpdateBinThresholdArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateBinThresholdInput>;
};

export type WmsMutationUpdateInboundShipmentArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateInboundShipmentInput>;
};

export type WmsMutationUpdateInboundShipmentItemArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateInboundShipmentItemInput>;
};

export type WmsMutationUpdateInventoryAdjustmentArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateInventoryAdjustmentInput>;
};

export type WmsMutationUpdateInventoryBatchArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateInventoryBatchInput>;
};

export type WmsMutationUpdateInventoryStockArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateInventoryStockInput>;
};

export type WmsMutationUpdateLocationArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateLocationInput>;
};

export type WmsMutationUpdateOutboundShipmentArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateOutboundShipmentInput>;
};

export type WmsMutationUpdateOutboundShipmentItemArgs = {
	id: Scalars["ID"]["input"];
	value: UpdateOutboundShipmentItemInput;
};

export type WmsMutationUpdatePackageArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdatePackageInput>;
};

export type WmsMutationUpdatePackageItemArgs = {
	id: Scalars["ID"]["input"];
	value: UpdatePackageItemInput;
};

export type WmsMutationUpdatePickBatchArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdatePickBatchInput>;
};

export type WmsMutationUpdatePickBatchItemArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdatePickBatchItemInput>;
};

export type WmsMutationUpdatePutawayRuleArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdatePutawayRuleInput>;
};

export type WmsMutationUpdateReorderPointArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateReorderPointInput>;
};

export type WmsMutationUpdateReturnArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateReturnInput>;
};

export type WmsMutationUpdateReturnItemArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateReturnItemInput>;
};

export type WmsMutationUpdateSalesOrderArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateSalesOrderInput>;
};

export type WmsMutationUpdateSalesOrderItemArgs = {
	id: Scalars["ID"]["input"];
	value: UpdateSalesOrderItemInput;
};

export type WmsMutationUpdateStockTransferArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateStockTransferInput>;
};

export type WmsMutationUpdateSupplierArgs = {
	id: Scalars["ID"]["input"];
	value: UpdateSupplierInput;
};

export type WmsMutationUpdateTaskArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateTaskInput>;
};

export type WmsMutationUpdateTaskItemArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateTaskItemInput>;
};

export type WmsMutationUpdateWarehouseArgs = {
	id: Scalars["ID"]["input"];
	value: UpdateWarehouseInput;
};

export type WmsMutationUpdateWmsProductArgs = {
	id: Scalars["ID"]["input"];
	value?: InputMaybe<UpdateWmsProductInput>;
};

export type WmsOutboundShipmentStatusChangedEvent = {
	__typename?: "WmsOutboundShipmentStatusChangedEvent";
	id: Scalars["ID"]["output"];
	newStatus: OutboundShipmentStatus;
	previousStatus: OutboundShipmentStatus;
	salesOrderId: Scalars["ID"]["output"];
};

export type WmsPickBatchStatusChangedEvent = {
	__typename?: "WmsPickBatchStatusChangedEvent";
	id: Scalars["ID"]["output"];
	newStatus: PickBatchStatus;
	previousStatus: PickBatchStatus;
};

export type WmsProducts = {
	__typename?: "WmsProducts";
	adjustments?: Maybe<Array<InventoryAdjustments>>;
	barcode?: Maybe<Scalars["String"]["output"]>;
	batches?: Maybe<Array<InventoryBatches>>;
	binThresholds?: Maybe<Array<BinThresholds>>;
	client?: Maybe<Companies>;
	costPrice?: Maybe<Scalars["Float"]["output"]>;
	createdAt?: Maybe<Scalars["Date"]["output"]>;
	description?: Maybe<Scalars["String"]["output"]>;
	height?: Maybe<Scalars["Float"]["output"]>;
	id: Scalars["ID"]["output"];
	inboundShipmentItems?: Maybe<Array<InboundShipmentItems>>;
	inventoryStock?: Maybe<Array<InventoryStock>>;
	length?: Maybe<Scalars["Float"]["output"]>;
	name: Scalars["String"]["output"];
	outboundShipmentItems?: Maybe<Array<OutboundShipmentItems>>;
	packageItems?: Maybe<Array<PackageItems>>;
	putawayRules?: Maybe<Array<PutawayRules>>;
	reorderPoints?: Maybe<Array<ReorderPoints>>;
	returnItems?: Maybe<Array<ReturnItems>>;
	salesOrderItems?: Maybe<Array<SalesOrderItems>>;
	sku: Scalars["String"]["output"];
	status?: Maybe<ProductStatus>;
	stockTransfers?: Maybe<Array<StockTransfers>>;
	supplier?: Maybe<Suppliers>;
	taskItems?: Maybe<Array<TaskItems>>;
	updatedAt?: Maybe<Scalars["Date"]["output"]>;
	volume?: Maybe<Scalars["Float"]["output"]>;
	weight?: Maybe<Scalars["Float"]["output"]>;
	width?: Maybe<Scalars["Float"]["output"]>;
};

export type WmsQuery = {
	__typename?: "WmsQuery";
	binThreshold: BinThresholds;
	binThresholds: Array<BinThresholds>;
	inboundShipment: InboundShipments;
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
	outboundShipments: Array<OutboundShipments>;
	package: Packages;
	packages: Array<Packages>;
	pickBatch: PickBatches;
	pickBatches: Array<PickBatches>;
	putawayRule: PutawayRules;
	putawayRules: Array<PutawayRules>;
	reorderPoint: ReorderPoints;
	reorderPoints: Array<ReorderPoints>;
	return: Returns;
	returns: Array<Returns>;
	salesOrder: SalesOrders;
	salesOrders: Array<SalesOrders>;
	stockTransfer: StockTransfers;
	stockTransfers: Array<StockTransfers>;
	supplier: Suppliers;
	suppliers: Array<Suppliers>;
	task: Tasks;
	tasks: Array<Tasks>;
	warehouse: Warehouses;
	warehouses: Array<Warehouses>;
	wmsProduct: WmsProducts;
	wmsProducts: Array<WmsProducts>;
};

export type WmsQueryBinThresholdArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryBinThresholdsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQueryInboundShipmentArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryInboundShipmentsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	status?: InputMaybe<InboundShipmentStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQueryInventoryAdjustmentArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryInventoryAdjustmentsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	reason?: InputMaybe<InventoryAdjustmentReason>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQueryInventoryBatchArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryInventoryBatchesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQueryInventoryStockArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryInventoryStocksArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	status?: InputMaybe<InventoryStockStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQueryLocationArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryLocationsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
	type?: InputMaybe<LocationType>;
};

export type WmsQueryOutboundShipmentArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryOutboundShipmentsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<OutboundShipmentStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQueryPackageArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryPackagesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQueryPickBatchArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryPickBatchesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<PickBatchStatus>;
	strategy?: InputMaybe<PickStrategy>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQueryPutawayRuleArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryPutawayRulesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	locationType?: InputMaybe<LocationType>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQueryReorderPointArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryReorderPointsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQueryReturnArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryReturnsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<ReturnStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQuerySalesOrderArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQuerySalesOrdersArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<SalesOrderStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQueryStockTransferArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryStockTransfersArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	status?: InputMaybe<StockTransferStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQuerySupplierArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQuerySuppliersArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQueryTaskArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryTasksArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<TaskStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
	type?: InputMaybe<TaskType>;
};

export type WmsQueryWarehouseArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryWarehousesArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsQueryWmsProductArgs = {
	id: Scalars["ID"]["input"];
};

export type WmsQueryWmsProductsArgs = {
	from?: InputMaybe<Scalars["Date"]["input"]>;
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<ProductStatus>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
};

export type WmsReturnItemEvaluatedEvent = {
	__typename?: "WmsReturnItemEvaluatedEvent";
	condition?: Maybe<ReturnItemCondition>;
	returnItem: ReturnItems;
};

export type WmsReturnRejectedEvent = {
	__typename?: "WmsReturnRejectedEvent";
	rejectionReason?: Maybe<Scalars["String"]["output"]>;
	return: Returns;
};

export type WmsReturnStatusChangedEvent = {
	__typename?: "WmsReturnStatusChangedEvent";
	clientId: Scalars["ID"]["output"];
	id: Scalars["ID"]["output"];
	newStatus: ReturnStatus;
	previousStatus: ReturnStatus;
};

export type WmsSalesOrderStatusChangedEvent = {
	__typename?: "WmsSalesOrderStatusChangedEvent";
	clientId: Scalars["ID"]["output"];
	id: Scalars["ID"]["output"];
	newStatus: SalesOrderStatus;
	previousStatus: SalesOrderStatus;
};

export type WmsStockTransferStatusChangedEvent = {
	__typename?: "WmsStockTransferStatusChangedEvent";
	id: Scalars["ID"]["output"];
	newStatus: StockTransferStatus;
	previousStatus: StockTransferStatus;
	productId: Scalars["ID"]["output"];
};

export type WmsTaskAssignedEvent = {
	__typename?: "WmsTaskAssignedEvent";
	previousUserId?: Maybe<Scalars["ID"]["output"]>;
	task: Tasks;
};

export type WmsTaskItemShortPickedEvent = {
	__typename?: "WmsTaskItemShortPickedEvent";
	shortQuantity: Scalars["Int"]["output"];
	taskItem: TaskItems;
};

export type WmsTaskItemStatusChangedEvent = {
	__typename?: "WmsTaskItemStatusChangedEvent";
	id: Scalars["ID"]["output"];
	newStatus: TaskItemStatus;
	previousStatus: TaskItemStatus;
	taskId: Scalars["ID"]["output"];
};

export type WmsTaskPutawayCreatedEvent = {
	__typename?: "WmsTaskPutawayCreatedEvent";
	reason: Scalars["String"]["output"];
	returnId: Scalars["ID"]["output"];
	task: Tasks;
};

export type WmsTaskReplenishmentCreatedEvent = {
	__typename?: "WmsTaskReplenishmentCreatedEvent";
	binId: Scalars["ID"]["output"];
	reason: Scalars["String"]["output"];
	task: Tasks;
};

export type WmsTaskStatusChangedEvent = {
	__typename?: "WmsTaskStatusChangedEvent";
	id: Scalars["ID"]["output"];
	newStatus: TaskStatus;
	previousStatus: TaskStatus;
	type: TaskType;
};

export type CreateAccountTransactionMutationVariables = Exact<{
	accountTransaction: CreateAccountTransactionInput;
}>;

export type CreateAccountTransactionMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		createAccountTransaction: {
			__typename?: "AccountTransactions";
			id: string;
			type: TransactionType;
			amount: number;
			runningBalance?: number | null;
			sourceRecordId?: string | null;
			sourceRecordType?: string | null;
			description?: string | null;
			referenceNumber?: string | null;
			transactionDate?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type AccountTransactionsQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	type?: InputMaybe<TransactionType>;
}>;

export type AccountTransactionsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		accountTransactions: Array<{
			__typename?: "AccountTransactions";
			amount: number;
			createdAt?: any | null;
			description?: string | null;
			id: string;
			referenceNumber?: string | null;
			runningBalance?: number | null;
			sourceRecordId?: string | null;
			sourceRecordType?: string | null;
			transactionDate?: string | null;
			type: TransactionType;
			updatedAt?: any | null;
			processedByUser?: {
				__typename?: "User";
				name: string;
				image?: string | null;
				email: string;
				id: string;
			} | null;
			clientAccount: {
				__typename?: "ClientAccounts";
				availableCredit?: number | null;
				paymentTermsDays?: number | null;
				updatedAt?: any | null;
				walletBalance?: number | null;
				createdAt?: any | null;
				client: {
					__typename?: "Companies";
					annualRevenue?: number | null;
					id: string;
					industry?: string | null;
					name: string;
					phoneNumber?: string | null;
				};
			};
		}>;
	} | null;
};

export type SearchAccountTransactionsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchAccountTransactionsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		accountTransactions: Array<{
			__typename?: "AccountTransactions";
			value: string;
			label?: string | null;
		}>;
	} | null;
};

export type AnalyticsAccountTransactionsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsAccountTransactionsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		accountTransactions: Array<{
			__typename?: "AccountTransactions";
			amount: number;
			runningBalance?: number | null;
			type: TransactionType;
		}>;
	} | null;
};

export type CreateAccountingSyncLogMutationVariables = Exact<{
	accountingSyncLog: CreateAccountingSyncLogInput;
}>;

export type CreateAccountingSyncLogMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		createAccountingSyncLog: {
			__typename?: "AccountingSyncLogs";
			id: string;
			recordId: string;
			recordType: string;
			externalSystem: string;
			externalId?: string | null;
			status?: SyncStatus | null;
			errorMessage?: string | null;
			requestPayload?: string | null;
			responsePayload?: string | null;
			lastSyncAt?: string | null;
			retryCount?: number | null;
			nextRetryAt?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type AccountingSyncLogsQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<SyncStatus>;
}>;

export type AccountingSyncLogsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		accountingSyncLogs: Array<{
			__typename?: "AccountingSyncLogs";
			createdAt?: any | null;
			errorMessage?: string | null;
			externalId?: string | null;
			externalSystem: string;
			id: string;
			lastSyncAt?: string | null;
			nextRetryAt?: string | null;
			recordId: string;
			recordType: string;
			requestPayload?: string | null;
			responsePayload?: string | null;
			retryCount?: number | null;
			status?: SyncStatus | null;
			updatedAt?: any | null;
		}>;
	} | null;
};

export type SearchAccountingSyncLogsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchAccountingSyncLogsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		accountingSyncLogs: Array<{
			__typename?: "AccountingSyncLogs";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsAccountingSyncLogsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsAccountingSyncLogsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		accountingSyncLogs: Array<{
			__typename?: "AccountingSyncLogs";
			status?: SyncStatus | null;
			retryCount?: number | null;
		}>;
	} | null;
};

export type CreateClientAccountMutationVariables = Exact<{
	clientAccount: CreateClientAccountInput;
}>;

export type CreateClientAccountMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		createClientAccount: {
			__typename?: "ClientAccounts";
			id: string;
			creditLimit?: number | null;
			availableCredit?: number | null;
			walletBalance?: number | null;
			currency?: string | null;
			paymentTermsDays?: number | null;
			isCreditApproved?: boolean | null;
			lastPaymentDate?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateClientAccountMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	clientAccount: UpdateClientAccountInput;
}>;

export type UpdateClientAccountMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		updateClientAccount: {
			__typename?: "ClientAccounts";
			id: string;
			creditLimit?: number | null;
			availableCredit?: number | null;
			walletBalance?: number | null;
			currency?: string | null;
			paymentTermsDays?: number | null;
			isCreditApproved?: boolean | null;
			lastPaymentDate?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveClientAccountMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveClientAccountMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		removeClientAccount: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableClientAccountQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableClientAccountQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		clientAccounts: Array<{
			__typename?: "ClientAccounts";
			availableCredit?: number | null;
			creditLimit?: number | null;
			currency?: string | null;
			isCreditApproved?: boolean | null;
			lastPaymentDate?: string | null;
			paymentTermsDays?: number | null;
			updatedAt?: any | null;
			walletBalance?: number | null;
			id: string;
			client: {
				__typename?: "Companies";
				annualRevenue?: number | null;
				country?: string | null;
				industry?: string | null;
				name: string;
				phoneNumber?: string | null;
				updatedAt?: any | null;
				website?: string | null;
			};
			transactions?: Array<{
				__typename?: "AccountTransactions";
				amount: number;
				description?: string | null;
				id: string;
				referenceNumber?: string | null;
				runningBalance?: number | null;
				sourceRecordId?: string | null;
				sourceRecordType?: string | null;
				transactionDate?: string | null;
				type: TransactionType;
			}> | null;
		}>;
	} | null;
};

export type SearchClientAccountsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchClientAccountsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		clientAccounts: Array<{
			__typename?: "ClientAccounts";
			value: string;
			label?: string | null;
		}>;
	} | null;
};

export type AnalyticsClientAccountsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsClientAccountsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		clientAccounts: Array<{
			__typename?: "ClientAccounts";
			creditLimit?: number | null;
			availableCredit?: number | null;
			walletBalance?: number | null;
			paymentTermsDays?: number | null;
		}>;
	} | null;
};

export type CreateCreditNoteMutationVariables = Exact<{
	creditNote: CreateCreditNoteInput;
}>;

export type CreateCreditNoteMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		createCreditNote: {
			__typename?: "CreditNotes";
			id: string;
			creditNoteNumber: string;
			amount: number;
			reason: string;
			issueDate: string;
			appliedAt?: string | null;
			currency?: string | null;
			notes?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateCreditNoteMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	creditNote: UpdateCreditNoteInput;
}>;

export type UpdateCreditNoteMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		updateCreditNote: {
			__typename?: "CreditNotes";
			id: string;
			creditNoteNumber: string;
			amount: number;
			reason: string;
			issueDate: string;
			appliedAt?: string | null;
			currency?: string | null;
			notes?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveCreditNoteMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveCreditNoteMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		removeCreditNote: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableCreditNoteQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableCreditNoteQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		creditNotes: Array<{
			__typename?: "CreditNotes";
			appliedAt?: string | null;
			amount: number;
			createdAt?: any | null;
			creditNoteNumber: string;
			currency?: string | null;
			id: string;
			issueDate: string;
			notes?: string | null;
			reason: string;
			updatedAt?: any | null;
			createdByUser?: {
				__typename?: "User";
				email: string;
				id: string;
				image?: string | null;
				name: string;
			} | null;
			invoice: {
				__typename?: "BillingInvoices";
				amountPaid?: number | null;
				invoiceNumber: string;
				issueDate: string;
				paidAt?: string | null;
				notes?: string | null;
				sentAt?: string | null;
				status?: BillingInvoiceStatus | null;
				subtotal?: number | null;
				taxAmount?: number | null;
				totalAmount: number;
				updatedAt?: any | null;
				paymentTerms?: string | null;
				discountAmount?: number | null;
				dueDate: string;
				currency?: string | null;
			};
			dispute?: {
				__typename?: "Disputes";
				disputedAmount?: number | null;
				id: string;
				reason: string;
				resolutionNotes?: string | null;
				resolvedAt?: string | null;
				status?: DisputeStatus | null;
				submittedAt?: string | null;
			} | null;
		}>;
	} | null;
};

export type SearchCreditNotesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchCreditNotesQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		creditNotes: Array<{
			__typename?: "CreditNotes";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsCreditNotesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsCreditNotesQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		creditNotes: Array<{ __typename?: "CreditNotes"; amount: number }>;
	} | null;
};

export type CreateDisputeMutationVariables = Exact<{
	dispute: CreateDisputeInput;
}>;

export type CreateDisputeMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		createDispute: {
			__typename?: "Disputes";
			id: string;
			reason: string;
			status?: DisputeStatus | null;
			disputedAmount?: number | null;
			resolutionNotes?: string | null;
			submittedAt?: string | null;
			resolvedAt?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateDisputeMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	dispute: UpdateDisputeInput;
}>;

export type UpdateDisputeMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		updateDispute: {
			__typename?: "Disputes";
			id: string;
			reason: string;
			status?: DisputeStatus | null;
			disputedAmount?: number | null;
			resolutionNotes?: string | null;
			submittedAt?: string | null;
			resolvedAt?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type TableDisputeQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<DisputeStatus>;
}>;

export type TableDisputeQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		disputes: Array<{
			__typename?: "Disputes";
			createdAt?: any | null;
			disputedAmount?: number | null;
			id: string;
			reason: string;
			resolutionNotes?: string | null;
			resolvedAt?: string | null;
			status?: DisputeStatus | null;
			submittedAt?: string | null;
			updatedAt?: any | null;
			client: {
				__typename?: "Companies";
				annualRevenue?: number | null;
				city?: string | null;
				id: string;
				industry?: string | null;
				name: string;
				website?: string | null;
				phoneNumber?: string | null;
			};
			resolvedByUser?: {
				__typename?: "User";
				email: string;
				id: string;
				image?: string | null;
				name: string;
			} | null;
			lineItem: {
				__typename?: "InvoiceLineItems";
				discountAmount?: number | null;
				discountRate?: number | null;
				description: string;
				id: string;
				lineTotal?: number | null;
				quantity: number;
				sourceRecordId?: string | null;
				sourceRecordType?: string | null;
				taxAmount?: number | null;
				taxRate?: number | null;
				totalPrice?: number | null;
				unitPrice: number;
				updatedAt?: any | null;
				invoice: {
					__typename?: "BillingInvoices";
					amountPaid?: number | null;
					currency?: string | null;
					discountAmount?: number | null;
					dueDate: string;
					id: string;
					invoiceNumber: string;
					issueDate: string;
					notes?: string | null;
					paidAt?: string | null;
					paymentTerms?: string | null;
					sentAt?: string | null;
					status?: BillingInvoiceStatus | null;
					subtotal?: number | null;
					taxAmount?: number | null;
					totalAmount: number;
					updatedAt?: any | null;
				};
			};
		}>;
	} | null;
};

export type SearchDisputesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchDisputesQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		disputes: Array<{ __typename?: "Disputes"; value: string; label: string }>;
	} | null;
};

export type AnalyticsDisputesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsDisputesQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		disputes: Array<{
			__typename?: "Disputes";
			disputedAmount?: number | null;
			status?: DisputeStatus | null;
		}>;
	} | null;
};

export type CreateDocumentMutationVariables = Exact<{
	document: CreateDocumentInput;
}>;

export type CreateDocumentMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		createDocument: {
			__typename?: "Documents";
			id: string;
			recordId: string;
			recordType: string;
			documentType: DocumentType;
			filePath: string;
			fileName: string;
			fileSize?: number | null;
			mimeType?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateDocumentMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	document: UpdateDocumentInput;
}>;

export type UpdateDocumentMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		updateDocument: {
			__typename?: "Documents";
			id: string;
			recordId: string;
			recordType: string;
			documentType: DocumentType;
			filePath: string;
			fileName: string;
			fileSize?: number | null;
			mimeType?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveDocumentMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveDocumentMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		removeDocument: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableDocumentQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type TableDocumentQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		documents: Array<{
			__typename?: "Documents";
			id: string;
			recordId: string;
			recordType: string;
			documentType: DocumentType;
			filePath: string;
			fileName: string;
			fileSize?: number | null;
			mimeType?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			uploadedByUser?: {
				__typename?: "User";
				id: string;
				email: string;
				name: string;
				image?: string | null;
			} | null;
		}>;
	} | null;
};

export type FindDocumentQueryVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type FindDocumentQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		document: {
			__typename?: "Documents";
			id: string;
			recordId: string;
			recordType: string;
			documentType: DocumentType;
			filePath: string;
			fileName: string;
			fileSize?: number | null;
			mimeType?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			uploadedByUser?: {
				__typename?: "User";
				id: string;
				email: string;
				name: string;
				image?: string | null;
			} | null;
		};
	} | null;
};

export type SearchDocumentsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type SearchDocumentsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		documents: Array<{
			__typename?: "Documents";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsDocumentsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsDocumentsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		documents: Array<{
			__typename?: "Documents";
			id: string;
			documentType: DocumentType;
			fileSize?: number | null;
			createdAt?: any | null;
		}>;
	} | null;
};

export type UpdateInvoiceLineItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	invoiceLineItem: UpdateInvoiceLineItemInput;
}>;

export type UpdateInvoiceLineItemMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		updateInvoiceLineItem: {
			__typename?: "InvoiceLineItems";
			id: string;
			sourceRecordId?: string | null;
			sourceRecordType?: string | null;
			description: string;
			quantity: number;
			unitPrice: number;
			totalPrice?: number | null;
			taxRate?: number | null;
			taxAmount?: number | null;
			discountRate?: number | null;
			discountAmount?: number | null;
			lineTotal?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveInvoiceLineItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveInvoiceLineItemMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		removeInvoiceLineItem: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreateBillingInvoiceMutationVariables = Exact<{
	billingInvoice: CreateBillingInvoiceInput;
}>;

export type CreateBillingInvoiceMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		createBillingInvoice: {
			__typename?: "BillingInvoices";
			id: string;
			invoiceNumber: string;
			status?: BillingInvoiceStatus | null;
			issueDate: string;
			dueDate: string;
			totalAmount: number;
			amountPaid?: number | null;
			amountOutstanding?: number | null;
			currency?: string | null;
			taxAmount?: number | null;
			discountAmount?: number | null;
			subtotal?: number | null;
			paymentTerms?: string | null;
			notes?: string | null;
			sentAt?: string | null;
			paidAt?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateBillingInvoiceMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	billingInvoice: UpdateBillingInvoiceInput;
}>;

export type UpdateBillingInvoiceMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		updateBillingInvoice: {
			__typename?: "BillingInvoices";
			id: string;
			invoiceNumber: string;
			status?: BillingInvoiceStatus | null;
			issueDate: string;
			dueDate: string;
			totalAmount: number;
			amountPaid?: number | null;
			amountOutstanding?: number | null;
			currency?: string | null;
			taxAmount?: number | null;
			discountAmount?: number | null;
			subtotal?: number | null;
			paymentTerms?: string | null;
			notes?: string | null;
			sentAt?: string | null;
			paidAt?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveBillingInvoiceMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveBillingInvoiceMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		removeBillingInvoice: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableBillingInvoiceQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<BillingInvoiceStatus>;
}>;

export type TableBillingInvoiceQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		billingInvoices: Array<{
			__typename?: "BillingInvoices";
			amountOutstanding?: number | null;
			amountPaid?: number | null;
			createdAt?: any | null;
			currency?: string | null;
			discountAmount?: number | null;
			dueDate: string;
			id: string;
			invoiceNumber: string;
			issueDate: string;
			notes?: string | null;
			paidAt?: string | null;
			paymentTerms?: string | null;
			sentAt?: string | null;
			status?: BillingInvoiceStatus | null;
			subtotal?: number | null;
			taxAmount?: number | null;
			totalAmount: number;
			updatedAt?: any | null;
			lineItems?: Array<{
				__typename?: "InvoiceLineItems";
				description: string;
				discountAmount?: number | null;
				discountRate?: number | null;
				id: string;
				quantity: number;
				taxAmount?: number | null;
				lineTotal?: number | null;
				sourceRecordId?: string | null;
				sourceRecordType?: string | null;
				taxRate?: number | null;
				totalPrice?: number | null;
				unitPrice: number;
				updatedAt?: any | null;
			}> | null;
		}>;
	} | null;
};

export type SearchBillingInvoicesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchBillingInvoicesQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		billingInvoices: Array<{
			__typename?: "BillingInvoices";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsBillingInvoicesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsBillingInvoicesQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		billingInvoices: Array<{
			__typename?: "BillingInvoices";
			totalAmount: number;
			amountPaid?: number | null;
			amountOutstanding?: number | null;
			taxAmount?: number | null;
			discountAmount?: number | null;
			subtotal?: number | null;
			status?: BillingInvoiceStatus | null;
		}>;
	} | null;
};

export type CreatePaymentMutationVariables = Exact<{
	payment: CreatePaymentInput;
}>;

export type CreatePaymentMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		createPayment: {
			__typename?: "Payments";
			id: string;
			amount: number;
			paymentMethod: PaymentMethod;
			transactionId?: string | null;
			gatewayReference?: string | null;
			status?: PaymentStatus | null;
			paymentDate?: string | null;
			processedAt?: string | null;
			currency?: string | null;
			exchangeRate?: number | null;
			fees?: number | null;
			netAmount?: number | null;
			notes?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdatePaymentMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	payment: UpdatePaymentInput;
}>;

export type UpdatePaymentMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		updatePayment: {
			__typename?: "Payments";
			id: string;
			amount: number;
			paymentMethod: PaymentMethod;
			transactionId?: string | null;
			gatewayReference?: string | null;
			status?: PaymentStatus | null;
			paymentDate?: string | null;
			processedAt?: string | null;
			currency?: string | null;
			exchangeRate?: number | null;
			fees?: number | null;
			netAmount?: number | null;
			notes?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemovePaymentMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemovePaymentMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		removePayment: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TablePaymentQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	paymentMethod?: InputMaybe<PaymentMethod>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<PaymentStatus>;
}>;

export type TablePaymentQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		payments: Array<{
			__typename?: "Payments";
			amount: number;
			createdAt?: any | null;
			currency?: string | null;
			exchangeRate?: number | null;
			fees?: number | null;
			gatewayReference?: string | null;
			id: string;
			invoice: {
				__typename?: "BillingInvoices";
				invoiceNumber: string;
				id: string;
				issueDate: string;
				paidAt?: string | null;
				paymentTerms?: string | null;
				sentAt?: string | null;
				status?: BillingInvoiceStatus | null;
				discountAmount?: number | null;
				amountPaid?: number | null;
				amountOutstanding?: number | null;
			};
			processedByUser?: {
				__typename?: "User";
				email: string;
				id: string;
				image?: string | null;
				name: string;
			} | null;
		}>;
	} | null;
};

export type SearchPaymentsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchPaymentsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		payments: Array<{
			__typename?: "Payments";
			value: string;
			label?: string | null;
		}>;
	} | null;
};

export type AnalyticsPaymentsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsPaymentsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		payments: Array<{
			__typename?: "Payments";
			amount: number;
			exchangeRate?: number | null;
			fees?: number | null;
			netAmount?: number | null;
			paymentMethod: PaymentMethod;
			status?: PaymentStatus | null;
		}>;
	} | null;
};

export type CreateQuoteMutationVariables = Exact<{
	quote: CreateQuoteInput;
}>;

export type CreateQuoteMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		createQuote: {
			__typename?: "Quotes";
			id: string;
			originDetails: string;
			destinationDetails: string;
			weight?: number | null;
			length?: number | null;
			width?: number | null;
			height?: number | null;
			volume?: number | null;
			quotedPrice: number;
			serviceLevel?: string | null;
			expiresAt?: string | null;
			status?: QuoteStatus | null;
			quoteNumber?: string | null;
			notes?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateQuoteMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	quote: UpdateQuoteInput;
}>;

export type UpdateQuoteMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		updateQuote: {
			__typename?: "Quotes";
			id: string;
			originDetails: string;
			destinationDetails: string;
			weight?: number | null;
			length?: number | null;
			width?: number | null;
			height?: number | null;
			volume?: number | null;
			quotedPrice: number;
			serviceLevel?: string | null;
			expiresAt?: string | null;
			status?: QuoteStatus | null;
			quoteNumber?: string | null;
			notes?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveQuoteMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveQuoteMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		removeQuote: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableQuoteQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<QuoteStatus>;
}>;

export type TableQuoteQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		quotes: Array<{
			__typename?: "Quotes";
			createdAt?: any | null;
			destinationDetails: string;
			expiresAt?: string | null;
			height?: number | null;
			id: string;
			length?: number | null;
			notes?: string | null;
			originDetails: string;
			quoteNumber?: string | null;
			quotedPrice: number;
			serviceLevel?: string | null;
			status?: QuoteStatus | null;
			updatedAt?: any | null;
			volume?: number | null;
			weight?: number | null;
			width?: number | null;
			createdByUser?: {
				__typename?: "User";
				email: string;
				id: string;
				image?: string | null;
				name: string;
			} | null;
			client?: {
				__typename?: "Companies";
				city?: string | null;
				country?: string | null;
				id: string;
				industry?: string | null;
				name: string;
				phoneNumber?: string | null;
				website?: string | null;
				billingInvoices?: Array<{
					__typename?: "BillingInvoices";
					amountOutstanding?: number | null;
					amountPaid?: number | null;
					currency?: string | null;
					discountAmount?: number | null;
					dueDate: string;
					invoiceNumber: string;
					issueDate: string;
				}> | null;
			} | null;
		}>;
	} | null;
};

export type SearchQuotesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchQuotesQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		quotes: Array<{
			__typename?: "Quotes";
			value: string;
			label?: string | null;
		}>;
	} | null;
};

export type AnalyticsQuotesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsQuotesQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		quotes: Array<{
			__typename?: "Quotes";
			weight?: number | null;
			length?: number | null;
			width?: number | null;
			height?: number | null;
			volume?: number | null;
			quotedPrice: number;
			status?: QuoteStatus | null;
		}>;
	} | null;
};

export type CreateRateCardMutationVariables = Exact<{
	rateCard: CreateRateCardInput;
}>;

export type CreateRateCardMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		createRateCard: {
			__typename?: "RateCards";
			id: string;
			name: string;
			serviceType: ServiceType;
			isActive?: boolean | null;
			validFrom: string;
			validTo?: string | null;
			description?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateRateCardMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	rateCard: UpdateRateCardInput;
}>;

export type UpdateRateCardMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		updateRateCard: {
			__typename?: "RateCards";
			id: string;
			name: string;
			serviceType: ServiceType;
			isActive?: boolean | null;
			validFrom: string;
			validTo?: string | null;
			description?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveRateCardMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveRateCardMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		removeRateCard: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableRateCardQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	serviceType?: InputMaybe<ServiceType>;
}>;

export type TableRateCardQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		rateCards: Array<{
			__typename?: "RateCards";
			createdAt?: any | null;
			description?: string | null;
			id: string;
			isActive?: boolean | null;
			name: string;
			serviceType: ServiceType;
			updatedAt?: any | null;
			validFrom: string;
			validTo?: string | null;
			createdByUser?: {
				__typename?: "User";
				email: string;
				emailVerified: boolean;
				image?: string | null;
				name: string;
			} | null;
			rules?: Array<{
				__typename?: "RateRules";
				condition: string;
				id: string;
				isActive?: boolean | null;
				maxValue?: number | null;
				minValue?: number | null;
				price: number;
				pricingModel: PricingModel;
				priority?: number | null;
				value: string;
			}> | null;
		}>;
	} | null;
};

export type SearchRateCardsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchRateCardsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		rateCards: Array<{
			__typename?: "RateCards";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsRateCardsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsRateCardsQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		rateCards: Array<{ __typename?: "RateCards"; serviceType: ServiceType }>;
	} | null;
};

export type CreateRateRuleMutationVariables = Exact<{
	rateRule: CreateRateRuleInput;
}>;

export type CreateRateRuleMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		createRateRule: {
			__typename?: "RateRules";
			id: string;
			condition: string;
			value: string;
			price: number;
			pricingModel: PricingModel;
			minValue?: number | null;
			maxValue?: number | null;
			priority?: number | null;
			isActive?: boolean | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateRateRuleMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	rateRule: UpdateRateRuleInput;
}>;

export type UpdateRateRuleMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		updateRateRule: {
			__typename?: "RateRules";
			id: string;
			condition: string;
			value: string;
			price: number;
			pricingModel: PricingModel;
			minValue?: number | null;
			maxValue?: number | null;
			priority?: number | null;
			isActive?: boolean | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveRateRuleMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveRateRuleMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		removeRateRule: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableRateRuleQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	pricingModel?: InputMaybe<PricingModel>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableRateRuleQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		rateRules: Array<{
			__typename?: "RateRules";
			condition: string;
			createdAt?: any | null;
			id: string;
			isActive?: boolean | null;
			maxValue?: number | null;
			minValue?: number | null;
			price: number;
			pricingModel: PricingModel;
			priority?: number | null;
			updatedAt?: any | null;
			value: string;
			rateCard: {
				__typename?: "RateCards";
				createdAt?: any | null;
				description?: string | null;
				id: string;
				isActive?: boolean | null;
				name: string;
				serviceType: ServiceType;
				updatedAt?: any | null;
				validFrom: string;
				validTo?: string | null;
				createdByUser?: {
					__typename?: "User";
					email: string;
					id: string;
					image?: string | null;
					name: string;
				} | null;
			};
		}>;
	} | null;
};

export type SearchRateRulesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchRateRulesQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		rateRules: Array<{
			__typename?: "RateRules";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsRateRulesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsRateRulesQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		rateRules: Array<{
			__typename?: "RateRules";
			price: number;
			minValue?: number | null;
			maxValue?: number | null;
			priority?: number | null;
			pricingModel: PricingModel;
		}>;
	} | null;
};

export type CreateSurchargeMutationVariables = Exact<{
	surcharge: CreateSurchargeInput;
}>;

export type CreateSurchargeMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		createSurcharge: {
			__typename?: "Surcharges";
			id: string;
			name: string;
			type: string;
			amount: number;
			calculationMethod: SurchargeCalculationMethod;
			isActive?: boolean | null;
			validFrom?: string | null;
			validTo?: string | null;
			description?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateSurchargeMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	surcharge: UpdateSurchargeInput;
}>;

export type UpdateSurchargeMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		updateSurcharge: {
			__typename?: "Surcharges";
			id: string;
			name: string;
			type: string;
			amount: number;
			calculationMethod: SurchargeCalculationMethod;
			isActive?: boolean | null;
			validFrom?: string | null;
			validTo?: string | null;
			description?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveSurchargeMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveSurchargeMutation = {
	__typename?: "Mutation";
	billing?: {
		__typename?: "BillingMutation";
		removeSurcharge: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableSurchargeQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	calculationMethod?: InputMaybe<SurchargeCalculationMethod>;
}>;

export type TableSurchargeQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		surcharges: Array<{
			__typename?: "Surcharges";
			amount: number;
			calculationMethod: SurchargeCalculationMethod;
			createdAt?: any | null;
			description?: string | null;
			id: string;
			isActive?: boolean | null;
			name: string;
			type: string;
			updatedAt?: any | null;
			validFrom?: string | null;
			validTo?: string | null;
		}>;
	} | null;
};

export type SearchSurchargesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchSurchargesQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		surcharges: Array<{
			__typename?: "Surcharges";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsSurchargesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsSurchargesQuery = {
	__typename?: "Query";
	billing?: {
		__typename?: "BillingQuery";
		surcharges: Array<{
			__typename?: "Surcharges";
			amount: number;
			calculationMethod: SurchargeCalculationMethod;
		}>;
	} | null;
};

export type CreateAttachmentMutationVariables = Exact<{
	attachment: CreateAttachmentInput;
}>;

export type CreateAttachmentMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		createAttachment: { __typename?: "Attachments"; id: string };
	} | null;
};

export type RemoveAttachmentMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveAttachmentMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		removeAttachment: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableAttachmentQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableAttachmentQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		attachments: Array<{
			__typename?: "Attachments";
			id: string;
			fileName: string;
			filePath: string;
			mimeType?: string | null;
			recordId?: string | null;
			recordType?: RecordType | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		}>;
	} | null;
};

export type FindAttachmentQueryVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type FindAttachmentQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		attachment: {
			__typename?: "Attachments";
			id: string;
			fileName: string;
			filePath: string;
			mimeType?: string | null;
			recordId?: string | null;
			recordType?: RecordType | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type SearchAttachmentsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchAttachmentsQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		attachments: Array<{
			__typename?: "Attachments";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsAttachmentsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsAttachmentsQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		attachments: Array<{
			__typename?: "Attachments";
			id: string;
			mimeType?: string | null;
			recordType?: RecordType | null;
			createdAt?: any | null;
		}>;
	} | null;
};

export type CreateCampaignMutationVariables = Exact<{
	campaign: CreateCampaignInput;
}>;

export type CreateCampaignMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		createCampaign: {
			__typename?: "Campaigns";
			id: string;
			name: string;
			startDate: any;
			endDate?: any | null;
			budget?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateCampaignMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	campaign: UpdateCampaignInput;
}>;

export type UpdateCampaignMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		updateCampaign: {
			__typename?: "Campaigns";
			id: string;
			name: string;
			budget?: number | null;
			startDate: any;
			endDate?: any | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveCampaignMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveCampaignMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		removeCampaign: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableCampaignQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableCampaignQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		campaigns: Array<{
			__typename?: "Campaigns";
			budget?: number | null;
			createdAt?: any | null;
			endDate?: any | null;
			id: string;
			name: string;
			startDate: any;
			updatedAt?: any | null;
		}>;
	} | null;
};

export type SearchCampaignsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchCampaignsQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		campaigns: Array<{
			__typename?: "Campaigns";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsCampaignsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsCampaignsQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		campaigns: Array<{ __typename?: "Campaigns"; budget?: number | null }>;
	} | null;
};

export type CreateCaseMutationVariables = Exact<{
	case: CreateCaseInput;
}>;

export type CreateCaseMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		createCase: {
			__typename?: "Cases";
			id: string;
			caseNumber: string;
			type?: CaseType | null;
			status?: CaseStatus | null;
			priority?: CasePriority | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateCaseMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	case: UpdateCaseInput;
}>;

export type UpdateCaseMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		updateCase: {
			__typename?: "Cases";
			id: string;
			caseNumber: string;
			type?: CaseType | null;
			status?: CaseStatus | null;
			priority?: CasePriority | null;
			updatedAt?: any | null;
			description?: string | null;
			contact?: {
				__typename?: "Contacts";
				id: string;
				name: string;
				email?: string | null;
			} | null;
		};
	} | null;
};

export type RemoveCaseMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveCaseMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		removeCase: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableCaseQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	priority?: InputMaybe<CasePriority>;
	status?: InputMaybe<CaseStatus>;
	type?: InputMaybe<CaseType>;
}>;

export type TableCaseQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		cases: Array<{
			__typename?: "Cases";
			caseNumber: string;
			createdAt?: any | null;
			description?: string | null;
			id: string;
			priority?: CasePriority | null;
			status?: CaseStatus | null;
			type?: CaseType | null;
			updatedAt?: any | null;
			contact?: {
				__typename?: "Contacts";
				id: string;
				email?: string | null;
				name: string;
				phoneNumber?: string | null;
				jobTitle?: string | null;
			} | null;
			owner?: {
				__typename?: "User";
				id: string;
				email: string;
				image?: string | null;
				name: string;
			} | null;
		}>;
	} | null;
};

export type SearchCasesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchCasesQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		cases: Array<{ __typename?: "Cases"; value: string; label: string }>;
	} | null;
};

export type AnalyticsCasesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsCasesQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		cases: Array<{
			__typename?: "Cases";
			status?: CaseStatus | null;
			priority?: CasePriority | null;
			type?: CaseType | null;
		}>;
	} | null;
};

export type CreateCompanyMutationVariables = Exact<{
	company: CreateCompanyInput;
}>;

export type CreateCompanyMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		createCompany: {
			__typename?: "Companies";
			id: string;
			name: string;
			industry?: string | null;
			phoneNumber?: string | null;
			website?: string | null;
			annualRevenue?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateCompanyMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	company: UpdateCompanyInput;
}>;

export type UpdateCompanyMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		updateCompany: {
			__typename?: "Companies";
			id: string;
			name: string;
			industry?: string | null;
			phoneNumber?: string | null;
			website?: string | null;
			annualRevenue?: number | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveCompanyMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveCompanyMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		removeCompany: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableCompanyQueryQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableCompanyQueryQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		companies: Array<{
			__typename?: "Companies";
			name: string;
			annualRevenue?: number | null;
			phoneNumber?: string | null;
			postalCode?: string | null;
			state?: string | null;
			street?: string | null;
			updatedAt?: any | null;
			website?: string | null;
			city?: string | null;
			country?: string | null;
			createdAt?: any | null;
			id: string;
			industry?: string | null;
			owner?: {
				__typename?: "User";
				email: string;
				image?: string | null;
				name: string;
			} | null;
			clientAccount?: {
				__typename?: "ClientAccounts";
				walletBalance?: number | null;
				creditLimit?: number | null;
				currency?: string | null;
			} | null;
		}>;
	} | null;
};

export type SearchCompaniesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchCompaniesQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		companies: Array<{
			__typename?: "Companies";
			id: string;
			name: string;
			industry?: string | null;
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsCompaniesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsCompaniesQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		companies: Array<{
			__typename?: "Companies";
			id: string;
			annualRevenue?: number | null;
			industry?: string | null;
		}>;
	} | null;
};

export type CreateContactMutationVariables = Exact<{
	contact: CreateContactInput;
}>;

export type CreateContactMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		createContact: {
			__typename?: "Contacts";
			id: string;
			name: string;
			email?: string | null;
			phoneNumber?: string | null;
			jobTitle?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			company: { __typename?: "Companies"; id: string; name: string };
		};
	} | null;
};

export type UpdateContactMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	contact: UpdateContactInput;
}>;

export type UpdateContactMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		updateContact: {
			__typename?: "Contacts";
			id: string;
			name: string;
			email?: string | null;
			phoneNumber?: string | null;
			jobTitle?: string | null;
			updatedAt?: any | null;
			company: { __typename?: "Companies"; id: string; name: string };
			owner?: {
				__typename?: "User";
				id: string;
				email: string;
				name: string;
			} | null;
		};
	} | null;
};

export type RemoveContactMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveContactMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		removeContact: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableContactQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableContactQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		contacts: Array<{
			__typename?: "Contacts";
			createdAt?: any | null;
			email?: string | null;
			id: string;
			jobTitle?: string | null;
			name: string;
			phoneNumber?: string | null;
			updatedAt?: any | null;
			owner?: {
				__typename?: "User";
				id: string;
				email: string;
				image?: string | null;
				name: string;
			} | null;
			company: {
				__typename?: "Companies";
				id: string;
				phoneNumber?: string | null;
				name: string;
				industry?: string | null;
				website?: string | null;
			};
		}>;
	} | null;
};

export type SearchContactsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchContactsQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		contacts: Array<{ __typename?: "Contacts"; value: string; label: string }>;
	} | null;
};

export type CreateInteractionMutationVariables = Exact<{
	interaction: CreateInteractionInput;
}>;

export type CreateInteractionMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		createInteraction: {
			__typename?: "Interactions";
			id: string;
			type?: InteractionType | null;
			notes?: string | null;
			outcome?: InteractionOutcome | null;
			interactionDate?: any | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateInteractionMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	interaction: UpdateInteractionInput;
}>;

export type UpdateInteractionMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		updateInteraction: {
			__typename?: "Interactions";
			id: string;
			type?: InteractionType | null;
			notes?: string | null;
			outcome?: InteractionOutcome | null;
			interactionDate?: any | null;
			updatedAt?: any | null;
			contact: {
				__typename?: "Contacts";
				id: string;
				name: string;
				email?: string | null;
			};
		};
	} | null;
};

export type RemoveInteractionMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveInteractionMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		removeInteraction: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type SearchInteractionsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchInteractionsQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		interactions: Array<{
			__typename?: "Interactions";
			value: string;
			label?: InteractionOutcome | null;
		}>;
	} | null;
};

export type TableInteractionQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	interactionType?: InputMaybe<InteractionType>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableInteractionQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		interactions: Array<{
			__typename?: "Interactions";
			createdAt?: any | null;
			id: string;
			interactionDate?: any | null;
			notes?: string | null;
			outcome?: InteractionOutcome | null;
			type?: InteractionType | null;
			updatedAt?: any | null;
			user?: {
				__typename?: "User";
				id: string;
				email: string;
				image?: string | null;
				name: string;
			} | null;
			case?: {
				__typename?: "Cases";
				id: string;
				caseNumber: string;
				priority?: CasePriority | null;
				status?: CaseStatus | null;
				type?: CaseType | null;
			} | null;
			contact: {
				__typename?: "Contacts";
				id: string;
				name: string;
				email?: string | null;
				jobTitle?: string | null;
				phoneNumber?: string | null;
			};
		}>;
	} | null;
};

export type AnalyticsInteractionsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsInteractionsQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		interactions: Array<{
			__typename?: "Interactions";
			type?: InteractionType | null;
		}>;
	} | null;
};

export type AddInvoiceItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	invoiceItem: AddInvoiceItemInput;
}>;

export type AddInvoiceItemMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		addInvoiceItem: { __typename?: "InvoiceItems"; id: string };
	} | null;
};

export type UpdateInvoiceItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	invoiceItem: UpdateInvoiceItemInput;
}>;

export type UpdateInvoiceItemMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		updateInvoiceItem: { __typename?: "InvoiceItems"; id: string };
	} | null;
};

export type RemoveInvoiceItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveInvoiceItemMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		removeInvoiceItem: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreateInvoiceMutationVariables = Exact<{
	invoice: CreateInvoiceInput;
}>;

export type CreateInvoiceMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		createInvoice: {
			__typename?: "Invoices";
			id: string;
			issueDate: any;
			dueDate: any;
			total: number;
			status?: InvoiceStatus | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateInvoiceMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	invoice: UpdateInvoiceInput;
}>;

export type UpdateInvoiceMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		updateInvoice: {
			__typename?: "Invoices";
			id: string;
			issueDate: any;
			dueDate: any;
			total: number;
			status?: InvoiceStatus | null;
			sentAt?: any | null;
			paidAt?: any | null;
			updatedAt?: any | null;
			items?: Array<{
				__typename?: "InvoiceItems";
				id: string;
				quantity: number;
				price: number;
			}> | null;
		};
	} | null;
};

export type TableInvoiceQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	paymentMethod?: InputMaybe<CrmInvoicePaymentMethod>;
	status?: InputMaybe<InvoiceStatus>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableInvoiceQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		invoices: Array<{
			__typename?: "Invoices";
			createdAt?: any | null;
			dueDate: any;
			id: string;
			issueDate: any;
			paidAt?: any | null;
			paymentMethod?: CrmInvoicePaymentMethod | null;
			sentAt?: any | null;
			status?: InvoiceStatus | null;
			total: number;
			updatedAt?: any | null;
			items?: Array<{
				__typename?: "InvoiceItems";
				price: number;
				quantity: number;
				updatedAt?: any | null;
				id: string;
				createdAt?: any | null;
				product: {
					__typename?: "Products";
					name: string;
					price: number;
					type?: ProductType | null;
					sku?: string | null;
					id: string;
					description?: string | null;
				};
			}> | null;
			opportunity: {
				__typename?: "Opportunities";
				name: string;
				stage?: OpportunityStage | null;
				id: string;
				expectedCloseDate?: any | null;
				dealValue?: number | null;
			};
		}>;
	} | null;
};

export type SearchInvoicesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchInvoicesQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		invoices: Array<{
			__typename?: "Invoices";
			total: number;
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsInvoicesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsInvoicesQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		invoices: Array<{
			__typename?: "Invoices";
			total: number;
			status?: InvoiceStatus | null;
			paymentMethod?: CrmInvoicePaymentMethod | null;
		}>;
	} | null;
};

export type CreateLeadMutationVariables = Exact<{
	lead: CreateLeadInput;
}>;

export type CreateLeadMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		createLead: {
			__typename?: "Leads";
			id: string;
			name: string;
			email?: string | null;
			leadSource?: LeadSource | null;
			status?: LeadStatus | null;
			leadScore?: number | null;
			createdAt?: any | null;
		};
	} | null;
};

export type UpdateLeadMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	lead: UpdateLeadInput;
}>;

export type UpdateLeadMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		updateLead: {
			__typename?: "Leads";
			id: string;
			name: string;
			email?: string | null;
			leadSource?: LeadSource | null;
			status?: LeadStatus | null;
			leadScore?: number | null;
			updatedAt?: any | null;
			owner?: {
				__typename?: "User";
				id: string;
				email: string;
				image?: string | null;
				name: string;
			} | null;
		};
	} | null;
};

export type RemoveLeadMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveLeadMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		removeLead: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableLeadQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<LeadStatus>;
	source?: InputMaybe<LeadSource>;
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type TableLeadQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		leads: Array<{
			__typename?: "Leads";
			convertedAt?: any | null;
			createdAt?: any | null;
			email?: string | null;
			leadScore?: number | null;
			leadSource?: LeadSource | null;
			name: string;
			id: string;
			status?: LeadStatus | null;
			updatedAt?: any | null;
			owner?: {
				__typename?: "User";
				id: string;
				email: string;
				image?: string | null;
				name: string;
			} | null;
			campaign?: {
				__typename?: "Campaigns";
				name: string;
				endDate?: any | null;
				startDate: any;
				budget?: number | null;
				id: string;
			} | null;
			convertedCompany?: {
				__typename?: "Companies";
				name: string;
				industry?: string | null;
				phoneNumber?: string | null;
				website?: string | null;
				id: string;
			} | null;
			convertedContact?: {
				__typename?: "Contacts";
				email?: string | null;
				id: string;
				jobTitle?: string | null;
				name: string;
				phoneNumber?: string | null;
				updatedAt?: any | null;
				company: {
					__typename?: "Companies";
					name: string;
					industry?: string | null;
					id: string;
				};
			} | null;
			convertedOpportunity?: {
				__typename?: "Opportunities";
				name: string;
				dealValue?: number | null;
				source?: OpportunitySource | null;
				stage?: OpportunityStage | null;
				id: string;
			} | null;
		}>;
	} | null;
};

export type SearchLeadsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
	status?: InputMaybe<LeadStatus>;
	source?: InputMaybe<LeadSource>;
}>;

export type SearchLeadsQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		leads: Array<{
			__typename?: "Leads";
			id: string;
			name: string;
			email?: string | null;
			status?: LeadStatus | null;
			leadSource?: LeadSource | null;
			createdAt?: any | null;
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsLeadsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsLeadsQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		leads: Array<{
			__typename?: "Leads";
			id: string;
			leadScore?: number | null;
			status?: LeadStatus | null;
			leadSource?: LeadSource | null;
			createdAt?: any | null;
		}>;
	} | null;
};

export type CreateNotificationMutationVariables = Exact<{
	notification: CreateNotificationInput;
}>;

export type CreateNotificationMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		createNotification: {
			__typename?: "Notifications";
			id: string;
			message: string;
			link?: string | null;
			isRead?: boolean | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateNotificationMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	notification: UpdateNotificationInput;
}>;

export type UpdateNotificationMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		updateNotification: {
			__typename?: "Notifications";
			id: string;
			isRead?: boolean | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type TableNotificationQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableNotificationQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		notifications: Array<{
			__typename?: "Notifications";
			createdAt?: any | null;
			id: string;
			isRead?: boolean | null;
			link?: string | null;
			message: string;
			updatedAt?: any | null;
			user: {
				__typename?: "User";
				email: string;
				id: string;
				image?: string | null;
				name: string;
			};
		}>;
	} | null;
};

export type SearchNotificationsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchNotificationsQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		notifications: Array<{
			__typename?: "Notifications";
			value: string;
			label: string;
		}>;
	} | null;
};

export type CreateOpportunityMutationVariables = Exact<{
	opportunity: CreateOpportunityInput;
}>;

export type CreateOpportunityMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		createOpportunity: {
			__typename?: "Opportunities";
			id: string;
			name: string;
			dealValue?: number | null;
			stage?: OpportunityStage | null;
			probability?: number | null;
			expectedCloseDate?: any | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateOpportunityMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	opportunity: UpdateOpportunityInput;
}>;

export type UpdateOpportunityMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		updateOpportunity: {
			__typename?: "Opportunities";
			id: string;
			name: string;
			dealValue?: number | null;
			stage?: OpportunityStage | null;
			probability?: number | null;
			expectedCloseDate?: any | null;
			updatedAt?: any | null;
			company?: { __typename?: "Companies"; id: string; name: string } | null;
			contact?: {
				__typename?: "Contacts";
				id: string;
				name: string;
				email?: string | null;
			} | null;
		};
	} | null;
};

export type TableOpportunityQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	source?: InputMaybe<OpportunitySource>;
	stage?: InputMaybe<OpportunityStage>;
}>;

export type TableOpportunityQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		opportunities: Array<{
			__typename?: "Opportunities";
			createdAt?: any | null;
			dealValue?: number | null;
			expectedCloseDate?: any | null;
			id: string;
			lostReason?: string | null;
			name: string;
			probability?: number | null;
			source?: OpportunitySource | null;
			stage?: OpportunityStage | null;
			updatedAt?: any | null;
			company?: {
				__typename?: "Companies";
				name: string;
				industry?: string | null;
				id: string;
				country?: string | null;
				phoneNumber?: string | null;
			} | null;
			contact?: {
				__typename?: "Contacts";
				email?: string | null;
				id: string;
				jobTitle?: string | null;
				name: string;
				phoneNumber?: string | null;
				updatedAt?: any | null;
				company: {
					__typename?: "Companies";
					name: string;
					phoneNumber?: string | null;
					industry?: string | null;
					country?: string | null;
				};
			} | null;
			owner?: {
				__typename?: "User";
				email: string;
				id: string;
				image?: string | null;
				name: string;
			} | null;
			products?: Array<{
				__typename?: "OpportunityProducts";
				quantity: number;
				product: {
					__typename?: "Products";
					id: string;
					name: string;
					price: number;
					sku?: string | null;
					type?: ProductType | null;
					description?: string | null;
				};
			}> | null;
			campaign?: {
				__typename?: "Campaigns";
				name: string;
				budget?: number | null;
				endDate?: any | null;
				startDate: any;
				id: string;
			} | null;
		}>;
	} | null;
};

export type SearchOpportunitiesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchOpportunitiesQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		opportunities: Array<{
			__typename?: "Opportunities";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsOpportunitiesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsOpportunitiesQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		opportunities: Array<{
			__typename?: "Opportunities";
			dealValue?: number | null;
			probability?: number | null;
			stage?: OpportunityStage | null;
			source?: OpportunitySource | null;
		}>;
	} | null;
};

export type AddOpportunityProductMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	opportunityProduct: AddOpportunityProductInput;
}>;

export type AddOpportunityProductMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		addOpportunityProduct: {
			__typename?: "OpportunityProducts";
			opportunity: { __typename?: "Opportunities"; id: string };
			product: { __typename?: "Products"; id: string };
		};
	} | null;
};

export type UpdateOpportunityProductMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	opportunityProduct: UpdateOpportunityProductInput;
}>;

export type UpdateOpportunityProductMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		updateOpportunityProduct: {
			__typename?: "OpportunityProducts";
			opportunity: { __typename?: "Opportunities"; id: string };
			product: { __typename?: "Products"; id: string };
		};
	} | null;
};

export type RemoveOpportunityProductMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveOpportunityProductMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		removeOpportunityProduct: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreateProductMutationVariables = Exact<{
	product: CreateProductInput;
}>;

export type CreateProductMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		createProduct: {
			__typename?: "Products";
			id: string;
			name: string;
			description?: string | null;
			price: number;
			sku?: string | null;
			type?: ProductType | null;
		};
	} | null;
};

export type UpdateProductMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	product: UpdateProductInput;
}>;

export type UpdateProductMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		updateProduct: {
			__typename?: "Products";
			id: string;
			name: string;
			description?: string | null;
			price: number;
			sku?: string | null;
			type?: ProductType | null;
		};
	} | null;
};

export type RemoveProductMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveProductMutation = {
	__typename?: "Mutation";
	crm?: {
		__typename?: "CrmMutation";
		removeProduct: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableProductQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	type?: InputMaybe<ProductType>;
}>;

export type TableProductQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		products: Array<{
			__typename?: "Products";
			createdAt?: any | null;
			description?: string | null;
			id: string;
			name: string;
			price: number;
			sku?: string | null;
			type?: ProductType | null;
			updatedAt?: any | null;
		}>;
	} | null;
};

export type SearchProductsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchProductsQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		products: Array<{ __typename?: "Products"; value: string; label: string }>;
	} | null;
};

export type AnalyticsProductsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsProductsQuery = {
	__typename?: "Query";
	crm?: {
		__typename?: "CrmQuery";
		products: Array<{ __typename?: "Products"; price: number }>;
	} | null;
};

export type CreateCustomerTrackingLinkMutationVariables = Exact<{
	customerTrackingLink: CreateCustomerTrackingLinkInput;
}>;

export type CreateCustomerTrackingLinkMutation = {
	__typename?: "Mutation";
	dms?: {
		__typename?: "DmsMutation";
		createCustomerTrackingLink: {
			__typename?: "CustomerTrackingLinks";
			id: string;
			trackingToken: string;
			isActive?: boolean | null;
			accessCount?: number | null;
			expiresAt?: string | null;
			lastAccessedAt?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			deliveryTask: {
				__typename?: "DeliveryTasks";
				id: string;
				recipientName?: string | null;
				deliveryAddress: string;
				status?: DeliveryTaskStatus | null;
				deliveryRoute: {
					__typename?: "DeliveryRoutes";
					id: string;
					status?: DeliveryRouteStatus | null;
				};
			};
		};
	} | null;
};

export type UpdateCustomerTrackingLinkMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	customerTrackingLink: UpdateCustomerTrackingLinkInput;
}>;

export type UpdateCustomerTrackingLinkMutation = {
	__typename?: "Mutation";
	dms?: {
		__typename?: "DmsMutation";
		updateCustomerTrackingLink: {
			__typename?: "CustomerTrackingLinks";
			id: string;
			trackingToken: string;
			isActive?: boolean | null;
			accessCount?: number | null;
			expiresAt?: string | null;
			lastAccessedAt?: string | null;
			updatedAt?: any | null;
			deliveryTask: {
				__typename?: "DeliveryTasks";
				id: string;
				recipientName?: string | null;
				deliveryAddress: string;
				status?: DeliveryTaskStatus | null;
			};
		};
	} | null;
};

export type TableCustomerTrackingLinkQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableCustomerTrackingLinkQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		customerTrackingLinks: Array<{
			__typename?: "CustomerTrackingLinks";
			accessCount?: number | null;
			createdAt?: any | null;
			expiresAt?: string | null;
			id: string;
			isActive?: boolean | null;
			lastAccessedAt?: string | null;
			trackingToken: string;
			updatedAt?: any | null;
		}>;
	} | null;
};

export type SearchCustomerTrackingLinksQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchCustomerTrackingLinksQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		customerTrackingLinks: Array<{
			__typename?: "CustomerTrackingLinks";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsCustomerTrackingLinksQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsCustomerTrackingLinksQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		customerTrackingLinks: Array<{
			__typename?: "CustomerTrackingLinks";
			accessCount?: number | null;
		}>;
	} | null;
};

export type CreateDeliveryRouteMutationVariables = Exact<{
	deliveryRoute: CreateDeliveryRouteInput;
}>;

export type CreateDeliveryRouteMutation = {
	__typename?: "Mutation";
	dms?: {
		__typename?: "DmsMutation";
		createDeliveryRoute: {
			__typename?: "DeliveryRoutes";
			id: string;
			routeDate: string;
			status?: DeliveryRouteStatus | null;
			totalDistanceKm?: number | null;
			estimatedDurationMinutes?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			driver: {
				__typename?: "Drivers";
				id: string;
				status?: DriverStatus | null;
				licenseNumber: string;
				contactPhone?: string | null;
				user: {
					__typename?: "User";
					email: string;
					id: string;
					image?: string | null;
					name: string;
				};
			};
		};
	} | null;
};

export type UpdateDeliveryRouteMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	deliveryRoute: UpdateDeliveryRouteInput;
}>;

export type UpdateDeliveryRouteMutation = {
	__typename?: "Mutation";
	dms?: {
		__typename?: "DmsMutation";
		updateDeliveryRoute: {
			__typename?: "DeliveryRoutes";
			id: string;
			routeDate: string;
			status?: DeliveryRouteStatus | null;
			totalDistanceKm?: number | null;
			estimatedDurationMinutes?: number | null;
			actualDurationMinutes?: number | null;
			startedAt?: string | null;
			completedAt?: string | null;
			updatedAt?: any | null;
			driver: {
				__typename?: "Drivers";
				id: string;
				status?: DriverStatus | null;
				licenseNumber: string;
				contactPhone?: string | null;
				user: {
					__typename?: "User";
					email: string;
					id: string;
					image?: string | null;
					name: string;
				};
			};
			tasks?: Array<{
				__typename?: "DeliveryTasks";
				id: string;
				recipientName?: string | null;
				deliveryAddress: string;
				status?: DeliveryTaskStatus | null;
			}> | null;
		};
	} | null;
};

export type RemoveDeliveryRouteMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveDeliveryRouteMutation = {
	__typename?: "Mutation";
	dms?: {
		__typename?: "DmsMutation";
		removeDeliveryRoute: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableDeliveryQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<DeliveryRouteStatus>;
}>;

export type TableDeliveryQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		deliveryRoutes: Array<{
			__typename?: "DeliveryRoutes";
			actualDurationMinutes?: number | null;
			completedAt?: string | null;
			createdAt?: any | null;
			estimatedDurationMinutes?: number | null;
			id: string;
			optimizedRouteData?: string | null;
			routeDate: string;
			startedAt?: string | null;
			status?: DeliveryRouteStatus | null;
			totalDistanceKm?: number | null;
			updatedAt?: any | null;
			driver: {
				__typename?: "Drivers";
				id: string;
				status?: DriverStatus | null;
				licenseNumber: string;
				contactPhone?: string | null;
				user: {
					__typename?: "User";
					email: string;
					id: string;
					image?: string | null;
					name: string;
				};
			};
		}>;
	} | null;
};

export type SearchDeliveryRoutesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchDeliveryRoutesQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		deliveryRoutes: Array<{
			__typename?: "DeliveryRoutes";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsDeliveryRoutesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsDeliveryRoutesQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		deliveryRoutes: Array<{
			__typename?: "DeliveryRoutes";
			totalDistanceKm?: number | null;
			estimatedDurationMinutes?: number | null;
			actualDurationMinutes?: number | null;
			status?: DeliveryRouteStatus | null;
		}>;
	} | null;
};

export type CreateDeliveryTaskMutationVariables = Exact<{
	deliveryTask: CreateDeliveryTaskInput;
}>;

export type CreateDeliveryTaskMutation = {
	__typename?: "Mutation";
	dms?: {
		__typename?: "DmsMutation";
		createDeliveryTask: {
			__typename?: "DeliveryTasks";
			id: string;
			recipientName?: string | null;
			recipientPhone?: string | null;
			deliveryAddress: string;
			deliveryInstructions?: string | null;
			status?: DeliveryTaskStatus | null;
			estimatedArrivalTime?: string | null;
			routeSequence: number;
			createdAt?: any | null;
			updatedAt?: any | null;
			deliveryRoute: {
				__typename?: "DeliveryRoutes";
				id: string;
				driver: {
					__typename?: "Drivers";
					id: string;
					user: { __typename?: "User"; email: string; name: string };
				};
			};
			package: {
				__typename?: "Packages";
				id: string;
				packageNumber: string;
				trackingNumber?: string | null;
			};
		};
	} | null;
};

export type UpdateDeliveryTaskMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	deliveryTask: UpdateDeliveryTaskInput;
}>;

export type UpdateDeliveryTaskMutation = {
	__typename?: "Mutation";
	dms?: {
		__typename?: "DmsMutation";
		updateDeliveryTask: {
			__typename?: "DeliveryTasks";
			id: string;
			recipientName?: string | null;
			recipientPhone?: string | null;
			deliveryAddress: string;
			deliveryInstructions?: string | null;
			status?: DeliveryTaskStatus | null;
			failureReason?: DeliveryFailureReason | null;
			estimatedArrivalTime?: string | null;
			actualArrivalTime?: string | null;
			deliveryTime?: string | null;
			attemptCount?: number | null;
			updatedAt?: any | null;
			deliveryRoute: {
				__typename?: "DeliveryRoutes";
				id: string;
				status?: DeliveryRouteStatus | null;
				driver: {
					__typename?: "Drivers";
					id: string;
					user: { __typename?: "User"; email: string; name: string };
				};
			};
			package: {
				__typename?: "Packages";
				id: string;
				packageNumber: string;
				trackingNumber?: string | null;
			};
		};
	} | null;
};

export type TableDeliveryTaskQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<DeliveryTaskStatus>;
	failureReason?: InputMaybe<DeliveryFailureReason>;
}>;

export type TableDeliveryTaskQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		deliveryTasks: Array<{
			__typename?: "DeliveryTasks";
			actualArrivalTime?: string | null;
			attemptCount?: number | null;
			createdAt?: any | null;
			deliveryAddress: string;
			deliveryInstructions?: string | null;
			deliveryTime?: string | null;
			estimatedArrivalTime?: string | null;
			failureReason?: DeliveryFailureReason | null;
			id: string;
			recipientName?: string | null;
			recipientPhone?: string | null;
			routeSequence: number;
			status?: DeliveryTaskStatus | null;
			updatedAt?: any | null;
			deliveryRoute: {
				__typename?: "DeliveryRoutes";
				id: string;
				totalDistanceKm?: number | null;
				optimizedRouteData?: string | null;
				status?: DeliveryRouteStatus | null;
				driver: {
					__typename?: "Drivers";
					id: string;
					licenseNumber: string;
					status?: DriverStatus | null;
					contactPhone?: string | null;
					user: {
						__typename?: "User";
						email: string;
						id: string;
						image?: string | null;
						name: string;
					};
				};
			};
			package: {
				__typename?: "Packages";
				id: string;
				carrier?: string | null;
				packageNumber: string;
				trackingNumber?: string | null;
				warehouse: {
					__typename?: "Warehouses";
					id: string;
					address?: string | null;
					country?: string | null;
				};
			};
		}>;
	} | null;
};

export type SearchDeliveryTasksQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchDeliveryTasksQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		deliveryTasks: Array<{
			__typename?: "DeliveryTasks";
			value: string;
			label?: string | null;
		}>;
	} | null;
};

export type AnalyticsDeliveryTasksQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsDeliveryTasksQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		deliveryTasks: Array<{
			__typename?: "DeliveryTasks";
			attemptCount?: number | null;
			status?: DeliveryTaskStatus | null;
			failureReason?: DeliveryFailureReason | null;
		}>;
	} | null;
};

export type CreateDriverLocationMutationVariables = Exact<{
	driverLocation: CreateDriverLocationInput;
}>;

export type CreateDriverLocationMutation = {
	__typename?: "Mutation";
	dms?: {
		__typename?: "DmsMutation";
		createDriverLocation: {
			__typename?: "DriverLocations";
			id: string;
			latitude: number;
			longitude: number;
			altitude?: number | null;
			accuracy?: number | null;
			speedKmh?: number | null;
			heading?: number | null;
			timestamp?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			driver: {
				__typename?: "Drivers";
				id: string;
				contactPhone?: string | null;
				licenseNumber: string;
				status?: DriverStatus | null;
				user: {
					__typename?: "User";
					email: string;
					id: string;
					image?: string | null;
					name: string;
				};
			};
		};
	} | null;
};

export type UpdateDriverLocationMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	driverLocation: UpdateDriverLocationInput;
}>;

export type UpdateDriverLocationMutation = {
	__typename?: "Mutation";
	dms?: {
		__typename?: "DmsMutation";
		updateDriverLocation: {
			__typename?: "DriverLocations";
			id: string;
			latitude: number;
			longitude: number;
			altitude?: number | null;
			accuracy?: number | null;
			speedKmh?: number | null;
			heading?: number | null;
			timestamp?: string | null;
			updatedAt?: any | null;
			driver: {
				__typename?: "Drivers";
				id: string;
				contactPhone?: string | null;
				licenseNumber: string;
				status?: DriverStatus | null;
				user: {
					__typename?: "User";
					email: string;
					id: string;
					image?: string | null;
					name: string;
				};
			};
		};
	} | null;
};

export type RemoveDriverLocationMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveDriverLocationMutation = {
	__typename?: "Mutation";
	dms?: {
		__typename?: "DmsMutation";
		removeDriverLocation: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableDriverLocationQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type TableDriverLocationQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		driverLocations: Array<{
			__typename?: "DriverLocations";
			accuracy?: number | null;
			altitude?: number | null;
			createdAt?: any | null;
			heading?: number | null;
			id: string;
			latitude: number;
			longitude: number;
			speedKmh?: number | null;
			timestamp?: string | null;
			updatedAt?: any | null;
			driver: {
				__typename?: "Drivers";
				id: string;
				contactPhone?: string | null;
				licenseExpiryDate?: string | null;
				licenseNumber: string;
				user: {
					__typename?: "User";
					email: string;
					id: string;
					image?: string | null;
					name: string;
				};
			};
		}>;
	} | null;
};

export type AnalyticsDriverLocationsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsDriverLocationsQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		driverLocations: Array<{
			__typename?: "DriverLocations";
			speedKmh?: number | null;
		}>;
	} | null;
};

export type CreateDmsProofOfDeliveryMutationVariables = Exact<{
	dmsProofOfDelivery: CreateDmsProofOfDeliveryInput;
}>;

export type CreateDmsProofOfDeliveryMutation = {
	__typename?: "Mutation";
	dms?: {
		__typename?: "DmsMutation";
		createDmsProofOfDelivery: {
			__typename?: "DmsProofOfDeliveries";
			id: string;
			type: ProofOfDeliveryType;
			recipientName?: string | null;
			timestamp?: string | null;
			filePath?: string | null;
			signatureData?: string | null;
			verificationCode?: string | null;
			latitude?: number | null;
			longitude?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			deliveryTask: {
				__typename?: "DeliveryTasks";
				id: string;
				recipientName?: string | null;
				deliveryAddress: string;
				status?: DeliveryTaskStatus | null;
			};
		};
	} | null;
};

export type TableProofOfDeliveryQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	type?: InputMaybe<ProofOfDeliveryType>;
}>;

export type TableProofOfDeliveryQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		dmsProofOfDeliveries: Array<{
			__typename?: "DmsProofOfDeliveries";
			createdAt?: any | null;
			filePath?: string | null;
			id: string;
			latitude?: number | null;
			longitude?: number | null;
			recipientName?: string | null;
			signatureData?: string | null;
			timestamp?: string | null;
			type: ProofOfDeliveryType;
			updatedAt?: any | null;
			verificationCode?: string | null;
			deliveryTask: {
				__typename?: "DeliveryTasks";
				actualArrivalTime?: string | null;
				deliveryInstructions?: string | null;
				deliveryAddress: string;
				failureReason?: DeliveryFailureReason | null;
				recipientName?: string | null;
				recipientPhone?: string | null;
				status?: DeliveryTaskStatus | null;
				package: {
					__typename?: "Packages";
					id: string;
					packageNumber: string;
					packageType?: string | null;
					requiresSignature?: boolean | null;
					trackingNumber?: string | null;
					warehouse: {
						__typename?: "Warehouses";
						id: string;
						address?: string | null;
						city?: string | null;
						country?: string | null;
					};
				};
			};
		}>;
	} | null;
};

export type SearchDmsProofOfDeliveriesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchDmsProofOfDeliveriesQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		dmsProofOfDeliveries: Array<{
			__typename?: "DmsProofOfDeliveries";
			value: string;
			label?: string | null;
		}>;
	} | null;
};

export type AnalyticsProofOfDeliveriesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsProofOfDeliveriesQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		dmsProofOfDeliveries: Array<{
			__typename?: "DmsProofOfDeliveries";
			type: ProofOfDeliveryType;
		}>;
	} | null;
};

export type CreateTaskEventMutationVariables = Exact<{
	taskEvent: CreateTaskEventInput;
}>;

export type CreateTaskEventMutation = {
	__typename?: "Mutation";
	dms?: {
		__typename?: "DmsMutation";
		createTaskEvent: {
			__typename?: "TaskEvents";
			id: string;
			status: TaskEventStatus;
			reason?: string | null;
			notes?: string | null;
			latitude?: number | null;
			longitude?: number | null;
			timestamp?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			deliveryTask: {
				__typename?: "DeliveryTasks";
				id: string;
				recipientName?: string | null;
				deliveryAddress: string;
				status?: DeliveryTaskStatus | null;
				package: {
					__typename?: "Packages";
					id: string;
					trackingNumber?: string | null;
				};
			};
		};
	} | null;
};

export type TableTaskEventQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<TaskEventStatus>;
}>;

export type TableTaskEventQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		taskEvents: Array<{
			__typename?: "TaskEvents";
			createdAt?: any | null;
			id: string;
			latitude?: number | null;
			longitude?: number | null;
			notes?: string | null;
			reason?: string | null;
			status: TaskEventStatus;
			timestamp?: string | null;
			updatedAt?: any | null;
			deliveryTask: {
				__typename?: "DeliveryTasks";
				id: string;
				recipientName?: string | null;
				recipientPhone?: string | null;
				deliveryInstructions?: string | null;
				deliveryAddress: string;
				status?: DeliveryTaskStatus | null;
				package: {
					__typename?: "Packages";
					id: string;
					trackingNumber?: string | null;
					packageNumber: string;
					packageType?: string | null;
				};
			};
		}>;
	} | null;
};

export type SearchTaskEventsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchTaskEventsQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		taskEvents: Array<{
			__typename?: "TaskEvents";
			value: string;
			label?: string | null;
		}>;
	} | null;
};

export type AnalyticsTaskEventsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsTaskEventsQuery = {
	__typename?: "Query";
	dms?: {
		__typename?: "DmsQuery";
		taskEvents: Array<{ __typename?: "TaskEvents"; status: TaskEventStatus }>;
	} | null;
};

export type CreateCarrierRateMutationVariables = Exact<{
	carrierRate: CreateCarrierRateInput;
}>;

export type CreateCarrierRateMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createCarrierRate: {
			__typename?: "CarrierRates";
			id: string;
			serviceType?: string | null;
			origin?: string | null;
			destination?: string | null;
			rate: number;
			unit?: CarrierRateUnit | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			carrier: {
				__typename?: "Carriers";
				id: string;
				name: string;
				contactEmail?: string | null;
				contactPhone?: string | null;
			};
		};
	} | null;
};

export type UpdateCarrierRateMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	carrierRate: UpdateCarrierRateInput;
}>;

export type UpdateCarrierRateMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateCarrierRate: {
			__typename?: "CarrierRates";
			id: string;
			serviceType?: string | null;
			origin?: string | null;
			destination?: string | null;
			rate: number;
			unit?: CarrierRateUnit | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			carrier: {
				__typename?: "Carriers";
				id: string;
				name: string;
				contactEmail?: string | null;
				contactPhone?: string | null;
			};
		};
	} | null;
};

export type RemoveCarrierRateMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveCarrierRateMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		removeCarrierRate: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreateCarrierMutationVariables = Exact<{
	carrier: CreateCarrierInput;
}>;

export type CreateCarrierMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createCarrier: {
			__typename?: "Carriers";
			id: string;
			name: string;
			contactPerson?: string | null;
			contactEmail?: string | null;
			contactPhone?: string | null;
			servicesOffered?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateCarrierMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	carrier: UpdateCarrierInput;
}>;

export type UpdateCarrierMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateCarrier: {
			__typename?: "Carriers";
			id: string;
			name: string;
			contactPerson?: string | null;
			contactEmail?: string | null;
			contactPhone?: string | null;
			servicesOffered?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveCarrierMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveCarrierMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		removeCarrier: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableCarrierQueryQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableCarrierQueryQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		carriers: Array<{
			__typename?: "Carriers";
			contactEmail?: string | null;
			contactPerson?: string | null;
			contactPhone?: string | null;
			createdAt?: any | null;
			id: string;
			name: string;
			servicesOffered?: string | null;
			updatedAt?: any | null;
			partnerInvoices?: Array<{
				__typename?: "PartnerInvoices";
				invoiceNumber: string;
				invoiceDate: string;
				status?: PartnerInvoiceStatus | null;
				totalAmount: number;
				items?: Array<{
					__typename?: "PartnerInvoiceItems";
					amount: number;
					id: string;
					shipmentLeg: {
						__typename?: "ShipmentLegs";
						status?: ShipmentLegStatus | null;
						shipment?: {
							__typename?: "OutboundShipments";
							trackingNumber?: string | null;
							carrier?: string | null;
							createdAt?: any | null;
							id: string;
							status?: OutboundShipmentStatus | null;
							warehouseId: string;
						} | null;
					};
				}> | null;
			}> | null;
			rates?: Array<{
				__typename?: "CarrierRates";
				destination?: string | null;
				id: string;
				origin?: string | null;
				rate: number;
				serviceType?: string | null;
				unit?: CarrierRateUnit | null;
			}> | null;
		}>;
	} | null;
};

export type SearchCarriersQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchCarriersQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		carriers: Array<{ __typename?: "Carriers"; value: string; label: string }>;
	} | null;
};

export type CreateDriverScheduleMutationVariables = Exact<{
	driverSchedule: CreateDriverScheduleInput;
}>;

export type CreateDriverScheduleMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createDriverSchedule: {
			__typename?: "DriverSchedules";
			id: string;
			startDate: string;
			endDate: string;
			reason?: DriverScheduleReason | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			driver: {
				__typename?: "Drivers";
				id: string;
				licenseNumber: string;
				licenseExpiryDate?: string | null;
				status?: DriverStatus | null;
				contactPhone?: string | null;
				user: { __typename?: "User"; id: string; name: string; email: string };
			};
		};
	} | null;
};

export type UpdateDriverScheduleMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	driverSchedule: UpdateDriverScheduleInput;
}>;

export type UpdateDriverScheduleMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateDriverSchedule: {
			__typename?: "DriverSchedules";
			id: string;
			startDate: string;
			endDate: string;
			reason?: DriverScheduleReason | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			driver: {
				__typename?: "Drivers";
				id: string;
				licenseNumber: string;
				licenseExpiryDate?: string | null;
				status?: DriverStatus | null;
				contactPhone?: string | null;
				user: { __typename?: "User"; id: string; name: string; email: string };
			};
		};
	} | null;
};

export type RemoveDriverScheduleMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveDriverScheduleMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		removeDriverSchedule: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreateDriverMutationVariables = Exact<{
	driver: CreateDriverInput;
}>;

export type CreateDriverMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createDriver: {
			__typename?: "Drivers";
			id: string;
			licenseNumber: string;
			licenseExpiryDate?: string | null;
			status?: DriverStatus | null;
			contactPhone?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			user: {
				__typename?: "User";
				id: string;
				name: string;
				email: string;
				image?: string | null;
			};
		};
	} | null;
};

export type UpdateDriverMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	driver: UpdateDriverInput;
}>;

export type UpdateDriverMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateDriver: {
			__typename?: "Drivers";
			id: string;
			licenseNumber: string;
			licenseExpiryDate?: string | null;
			status?: DriverStatus | null;
			contactPhone?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			user: {
				__typename?: "User";
				id: string;
				name: string;
				email: string;
				image?: string | null;
			};
		};
	} | null;
};

export type RemoveDriverMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveDriverMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		removeDriver: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableDriverQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<DriverStatus>;
}>;

export type TableDriverQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		drivers: Array<{
			__typename?: "Drivers";
			contactPhone?: string | null;
			createdAt?: any | null;
			id: string;
			licenseExpiryDate?: string | null;
			licenseNumber: string;
			status?: DriverStatus | null;
			updatedAt?: any | null;
			user: {
				__typename?: "User";
				email: string;
				id: string;
				image?: string | null;
				name: string;
			};
		}>;
	} | null;
};

export type SearchDriversQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchDriversQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		drivers: Array<{ __typename?: "Drivers"; value: string; label: string }>;
	} | null;
};

export type AnalyticsDriversQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsDriversQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		drivers: Array<{ __typename?: "Drivers"; status?: DriverStatus | null }>;
	} | null;
};

export type CreateExpenseMutationVariables = Exact<{
	expense: CreateExpenseInput;
}>;

export type CreateExpenseMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createExpense: {
			__typename?: "Expenses";
			id: string;
			type?: ExpenseType | null;
			amount: number;
			currency?: Currency | null;
			status?: ExpenseStatus | null;
			description?: string | null;
			expenseDate?: string | null;
			receiptUrl?: string | null;
			fuelQuantity?: number | null;
			odometerReading?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			driver?: {
				__typename?: "Drivers";
				id: string;
				user: { __typename?: "User"; id: string; name: string };
			} | null;
			trip?: {
				__typename?: "Trips";
				id: string;
				status?: TripStatus | null;
			} | null;
		};
	} | null;
};

export type UpdateExpenseMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	expense: UpdateExpenseInput;
}>;

export type UpdateExpenseMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateExpense: {
			__typename?: "Expenses";
			id: string;
			type?: ExpenseType | null;
			amount: number;
			currency?: Currency | null;
			status?: ExpenseStatus | null;
			description?: string | null;
			expenseDate?: string | null;
			receiptUrl?: string | null;
			fuelQuantity?: number | null;
			odometerReading?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			driver?: {
				__typename?: "Drivers";
				id: string;
				user: { __typename?: "User"; id: string; name: string };
			} | null;
			trip?: {
				__typename?: "Trips";
				id: string;
				status?: TripStatus | null;
			} | null;
		};
	} | null;
};

export type RemoveExpenseMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveExpenseMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		removeExpense: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableExpenseQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<ExpenseStatus>;
	type?: InputMaybe<ExpenseType>;
	currency?: InputMaybe<Currency>;
}>;

export type TableExpenseQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		expenses: Array<{
			__typename?: "Expenses";
			amount: number;
			createdAt?: any | null;
			currency?: Currency | null;
			description?: string | null;
			expenseDate?: string | null;
			fuelQuantity?: number | null;
			id: string;
			odometerReading?: number | null;
			receiptUrl?: string | null;
			status?: ExpenseStatus | null;
			type?: ExpenseType | null;
			updatedAt?: any | null;
			driver?: {
				__typename?: "Drivers";
				licenseNumber: string;
				contactPhone?: string | null;
				status?: DriverStatus | null;
				user: {
					__typename?: "User";
					email: string;
					id: string;
					image?: string | null;
					name: string;
				};
			} | null;
			trip?: {
				__typename?: "Trips";
				createdAt?: any | null;
				endLocation?: string | null;
				startLocation?: string | null;
				status?: TripStatus | null;
				startTime?: string | null;
				endTime?: string | null;
				vehicle?: {
					__typename?: "Vehicles";
					vin?: string | null;
					year?: number | null;
					model?: string | null;
					make?: string | null;
					id: string;
					registrationNumber: string;
				} | null;
			} | null;
		}>;
	} | null;
};

export type SearchExpensesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchExpensesQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		expenses: Array<{
			__typename?: "Expenses";
			value: string;
			label?: string | null;
		}>;
	} | null;
};

export type AnalyticsExpensesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsExpensesQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		expenses: Array<{
			__typename?: "Expenses";
			amount: number;
			type?: ExpenseType | null;
			status?: ExpenseStatus | null;
		}>;
	} | null;
};

export type CreateGeofenceEventMutationVariables = Exact<{
	geofenceEvent: CreateGeofenceEventInput;
}>;

export type CreateGeofenceEventMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createGeofenceEvent: {
			__typename?: "GeofenceEvents";
			id: string;
			eventType: GeofenceEventType;
			timestamp: string;
			vehicle: {
				__typename?: "Vehicles";
				id: string;
				registrationNumber: string;
				model?: string | null;
				make?: string | null;
				status?: VehicleStatus | null;
			};
			geofence: {
				__typename?: "Geofences";
				id: string;
				name: string;
				latitude?: number | null;
				longitude?: number | null;
			};
		};
	} | null;
};

export type UpdateGeofenceEventMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	geofenceEvent: UpdateGeofenceEventInput;
}>;

export type UpdateGeofenceEventMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateGeofenceEvent: {
			__typename?: "GeofenceEvents";
			id: string;
			eventType: GeofenceEventType;
			timestamp: string;
			vehicle: {
				__typename?: "Vehicles";
				id: string;
				registrationNumber: string;
				model?: string | null;
				make?: string | null;
				status?: VehicleStatus | null;
			};
			geofence: {
				__typename?: "Geofences";
				id: string;
				name: string;
				latitude?: number | null;
				longitude?: number | null;
			};
		};
	} | null;
};

export type CreateGeofenceMutationVariables = Exact<{
	geofence: CreateGeofenceInput;
}>;

export type CreateGeofenceMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createGeofence: {
			__typename?: "Geofences";
			id: string;
			name: string;
			longitude?: number | null;
			latitude?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateGeofenceMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	geofence: UpdateGeofenceInput;
}>;

export type UpdateGeofenceMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateGeofence: {
			__typename?: "Geofences";
			id: string;
			name: string;
			longitude?: number | null;
			latitude?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type TableGeofenceQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableGeofenceQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		geofences: Array<{
			__typename?: "Geofences";
			createdAt?: any | null;
			id: string;
			latitude?: number | null;
			longitude?: number | null;
			name: string;
			updatedAt?: any | null;
			events?: Array<{
				__typename?: "GeofenceEvents";
				eventType: GeofenceEventType;
				id: string;
				timestamp: string;
				vehicle: {
					__typename?: "Vehicles";
					model?: string | null;
					vin?: string | null;
					year?: number | null;
					registrationNumber: string;
					make?: string | null;
					id: string;
				};
			}> | null;
		}>;
	} | null;
};

export type SearchGeofencesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchGeofencesQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		geofences: Array<{
			__typename?: "Geofences";
			value: string;
			label: string;
		}>;
	} | null;
};

export type CreateGpsPingMutationVariables = Exact<{
	gpsPing: CreateGpsPingInput;
}>;

export type CreateGpsPingMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createGpsPing: {
			__typename?: "GpsPings";
			id: string;
			latitude: number;
			longitude: number;
			timestamp: any;
			vehicle: {
				__typename?: "Vehicles";
				id: string;
				registrationNumber: string;
				model?: string | null;
				make?: string | null;
				year?: number | null;
				vin?: string | null;
				status?: VehicleStatus | null;
			};
		};
	} | null;
};

export type UpdateGpsPingMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	gpsPing: UpdateGpsPingInput;
}>;

export type UpdateGpsPingMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateGpsPing: {
			__typename?: "GpsPings";
			id: string;
			latitude: number;
			longitude: number;
			timestamp: any;
			vehicle: {
				__typename?: "Vehicles";
				id: string;
				registrationNumber: string;
				model?: string | null;
				make?: string | null;
				year?: number | null;
				vin?: string | null;
				status?: VehicleStatus | null;
			};
		};
	} | null;
};

export type TableGpsPingQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type TableGpsPingQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		gpsPings: Array<{
			__typename?: "GpsPings";
			id: string;
			latitude: number;
			longitude: number;
			timestamp: any;
			vehicle: {
				__typename?: "Vehicles";
				year?: number | null;
				vin?: string | null;
				registrationNumber: string;
				model?: string | null;
				make?: string | null;
				status?: VehicleStatus | null;
				id: string;
			};
		}>;
	} | null;
};

export type UpdatePartnerInvoiceItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	partnerInvoiceItem: UpdatePartnerInvoiceItemInput;
}>;

export type UpdatePartnerInvoiceItemMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updatePartnerInvoiceItem: {
			__typename?: "PartnerInvoiceItems";
			id: string;
			amount: number;
			partnerInvoice: {
				__typename?: "PartnerInvoices";
				id: string;
				invoiceNumber: string;
				invoiceDate: string;
				totalAmount: number;
				status?: PartnerInvoiceStatus | null;
				createdAt?: any | null;
				updatedAt?: any | null;
				carrier: { __typename?: "Carriers"; id: string; name: string };
			};
			shipmentLeg: {
				__typename?: "ShipmentLegs";
				id: string;
				legSequence: number;
				startLocation?: string | null;
				endLocation?: string | null;
				status?: ShipmentLegStatus | null;
				createdAt?: any | null;
				updatedAt?: any | null;
				shipment?: { __typename?: "OutboundShipments"; id: string } | null;
				carrier?: { __typename?: "Carriers"; id: string; name: string } | null;
			};
		};
	} | null;
};

export type RemovePartnerInvoiceItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemovePartnerInvoiceItemMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		removePartnerInvoiceItem: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreatePartnerInvoiceMutationVariables = Exact<{
	partnerInvoice: CreatePartnerInvoiceInput;
}>;

export type CreatePartnerInvoiceMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createPartnerInvoice: {
			__typename?: "PartnerInvoices";
			id: string;
			invoiceNumber: string;
			invoiceDate: string;
			totalAmount: number;
			status?: PartnerInvoiceStatus | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			carrier: { __typename?: "Carriers"; id: string; name: string };
		};
	} | null;
};

export type UpdatePartnerInvoiceMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	partnerInvoice: UpdatePartnerInvoiceInput;
}>;

export type UpdatePartnerInvoiceMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updatePartnerInvoice: {
			__typename?: "PartnerInvoices";
			id: string;
			invoiceNumber: string;
			invoiceDate: string;
			totalAmount: number;
			status?: PartnerInvoiceStatus | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			carrier: { __typename?: "Carriers"; id: string; name: string };
		};
	} | null;
};

export type TablePartnerInvoiceQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<PartnerInvoiceStatus>;
}>;

export type TablePartnerInvoiceQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		partnerInvoices: Array<{
			__typename?: "PartnerInvoices";
			createdAt?: any | null;
			id: string;
			invoiceDate: string;
			invoiceNumber: string;
			status?: PartnerInvoiceStatus | null;
			totalAmount: number;
			updatedAt?: any | null;
			items?: Array<{
				__typename?: "PartnerInvoiceItems";
				amount: number;
				id: string;
				shipmentLeg: {
					__typename?: "ShipmentLegs";
					startLocation?: string | null;
					endLocation?: string | null;
					shipment?: {
						__typename?: "OutboundShipments";
						trackingNumber?: string | null;
						carrier?: string | null;
					} | null;
				};
			}> | null;
		}>;
	} | null;
};

export type SearchPartnerInvoicesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchPartnerInvoicesQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		partnerInvoices: Array<{
			__typename?: "PartnerInvoices";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsPartnerInvoicesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsPartnerInvoicesQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		partnerInvoices: Array<{
			__typename?: "PartnerInvoices";
			totalAmount: number;
			status?: PartnerInvoiceStatus | null;
		}>;
	} | null;
};

export type CreateProofOfDeliveryMutationVariables = Exact<{
	proofOfDelivery: CreateProofOfDeliveryInput;
}>;

export type CreateProofOfDeliveryMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createProofOfDelivery: {
			__typename?: "ProofOfDeliveries";
			id: string;
			type?: ProofType | null;
			filePath?: string | null;
			timestamp: string;
			latitude?: number | null;
			longitude?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			tripStop: {
				__typename?: "TripStops";
				id: string;
				sequence: number;
				address?: string | null;
				status?: TripStopStatus | null;
				trip: { __typename?: "Trips"; id: string; status?: TripStatus | null };
				shipment?: {
					__typename?: "OutboundShipments";
					id: string;
					trackingNumber?: string | null;
				} | null;
			};
		};
	} | null;
};

export type UpdateProofOfDeliveryMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	proofOfDelivery: UpdateProofOfDeliveryInput;
}>;

export type UpdateProofOfDeliveryMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateProofOfDelivery: {
			__typename?: "ProofOfDeliveries";
			id: string;
			type?: ProofType | null;
			filePath?: string | null;
			timestamp: string;
			latitude?: number | null;
			longitude?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			tripStop: {
				__typename?: "TripStops";
				id: string;
				sequence: number;
				address?: string | null;
				status?: TripStopStatus | null;
				trip: { __typename?: "Trips"; id: string; status?: TripStatus | null };
				shipment?: {
					__typename?: "OutboundShipments";
					id: string;
					trackingNumber?: string | null;
				} | null;
			};
		};
	} | null;
};

export type TableTmsProofOfDeliveryQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	type?: InputMaybe<ProofType>;
}>;

export type TableTmsProofOfDeliveryQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		proofOfDeliveries: Array<{
			__typename?: "ProofOfDeliveries";
			createdAt?: any | null;
			filePath?: string | null;
			id: string;
			latitude?: number | null;
			longitude?: number | null;
			timestamp: string;
			type?: ProofType | null;
			updatedAt?: any | null;
			tripStop: {
				__typename?: "TripStops";
				actualArrivalTime?: string | null;
				actualDepartureTime?: string | null;
				address?: string | null;
				status?: TripStopStatus | null;
				id: string;
				shipment?: {
					__typename?: "OutboundShipments";
					trackingNumber?: string | null;
					status?: OutboundShipmentStatus | null;
					carrier?: string | null;
					id: string;
				} | null;
				trip: {
					__typename?: "Trips";
					endLocation?: string | null;
					startLocation?: string | null;
					status?: TripStatus | null;
					vehicle?: {
						__typename?: "Vehicles";
						registrationNumber: string;
						vin?: string | null;
						year?: number | null;
						make?: string | null;
						model?: string | null;
						gpsPings?: Array<{
							__typename?: "GpsPings";
							latitude: number;
							longitude: number;
							timestamp: any;
							id: string;
						}> | null;
					} | null;
				};
			};
		}>;
	} | null;
};

export type SearchProofOfDeliveriesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchProofOfDeliveriesQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		proofOfDeliveries: Array<{
			__typename?: "ProofOfDeliveries";
			value: string;
			label?: string | null;
		}>;
	} | null;
};

export type AnalyticsTmsProofOfDeliveriesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsTmsProofOfDeliveriesQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		proofOfDeliveries: Array<{
			__typename?: "ProofOfDeliveries";
			type?: ProofType | null;
		}>;
	} | null;
};

export type CreateRouteMutationVariables = Exact<{
	route: CreateRouteInput;
}>;

export type CreateRouteMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createRoute: {
			__typename?: "Routes";
			id: string;
			optimizedRouteData?: string | null;
			totalDistance?: number | null;
			totalDuration?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			trip: { __typename?: "Trips"; id: string; status?: TripStatus | null };
		};
	} | null;
};

export type UpdateRouteMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	route: UpdateRouteInput;
}>;

export type UpdateRouteMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateRoute: {
			__typename?: "Routes";
			id: string;
			optimizedRouteData?: string | null;
			totalDistance?: number | null;
			totalDuration?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			trip: { __typename?: "Trips"; id: string; status?: TripStatus | null };
		};
	} | null;
};

export type RemoveRouteMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveRouteMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		removeRoute: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableRouteQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableRouteQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		routes: Array<{
			__typename?: "Routes";
			optimizedRouteData?: string | null;
			totalDistance?: number | null;
			totalDuration?: number | null;
			id: string;
			trip: {
				__typename?: "Trips";
				startLocation?: string | null;
				endTime?: string | null;
				endLocation?: string | null;
				createdAt?: any | null;
				startTime?: string | null;
				status?: TripStatus | null;
				updatedAt?: any | null;
				driver?: {
					__typename?: "Drivers";
					licenseNumber: string;
					contactPhone?: string | null;
					id: string;
					user: {
						__typename?: "User";
						email: string;
						id: string;
						image?: string | null;
						name: string;
					};
				} | null;
			};
		}>;
	} | null;
};

export type AnalyticsRoutesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsRoutesQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		routes: Array<{
			__typename?: "Routes";
			totalDistance?: number | null;
			totalDuration?: number | null;
		}>;
	} | null;
};

export type CreateShipmentLegEventMutationVariables = Exact<{
	shipmentLegEvent: CreateShipmentLegEventInput;
}>;

export type CreateShipmentLegEventMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createShipmentLegEvent: {
			__typename?: "ShipmentLegEvents";
			id: string;
			statusMessage?: string | null;
			location?: string | null;
			eventTimestamp: string;
			shipmentLeg: {
				__typename?: "ShipmentLegs";
				id: string;
				legSequence: number;
				startLocation?: string | null;
				endLocation?: string | null;
				status?: ShipmentLegStatus | null;
			};
		};
	} | null;
};

export type CreateShipmentLegMutationVariables = Exact<{
	shipmentLeg: CreateShipmentLegInput;
}>;

export type CreateShipmentLegMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createShipmentLeg: {
			__typename?: "ShipmentLegs";
			id: string;
			legSequence: number;
			startLocation?: string | null;
			endLocation?: string | null;
			status?: ShipmentLegStatus | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			shipment?: { __typename?: "OutboundShipments"; id: string } | null;
			carrier?: { __typename?: "Carriers"; id: string; name: string } | null;
			internalTrip?: { __typename?: "Trips"; id: string } | null;
		};
	} | null;
};

export type UpdateShipmentLegMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	shipmentLeg: UpdateShipmentLegInput;
}>;

export type UpdateShipmentLegMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateShipmentLeg: {
			__typename?: "ShipmentLegs";
			id: string;
			legSequence: number;
			startLocation?: string | null;
			endLocation?: string | null;
			status?: ShipmentLegStatus | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			shipment?: { __typename?: "OutboundShipments"; id: string } | null;
			carrier?: { __typename?: "Carriers"; id: string; name: string } | null;
			internalTrip?: { __typename?: "Trips"; id: string } | null;
		};
	} | null;
};

export type TableShipmentLegQueryQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<ShipmentLegStatus>;
}>;

export type TableShipmentLegQueryQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		shipmentLegs: Array<{
			__typename?: "ShipmentLegs";
			createdAt?: any | null;
			endLocation?: string | null;
			id: string;
			legSequence: number;
			startLocation?: string | null;
			status?: ShipmentLegStatus | null;
			updatedAt?: any | null;
			shipment?: {
				__typename?: "OutboundShipments";
				trackingNumber?: string | null;
				carrier?: string | null;
				status?: OutboundShipmentStatus | null;
			} | null;
			partnerInvoiceItems?: Array<{
				__typename?: "PartnerInvoiceItems";
				amount: number;
				id: string;
			}> | null;
			events?: Array<{
				__typename?: "ShipmentLegEvents";
				location?: string | null;
				statusMessage?: string | null;
				eventTimestamp: string;
				id: string;
			}> | null;
		}>;
	} | null;
};

export type SearchShipmentLegsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchShipmentLegsQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		shipmentLegs: Array<{
			__typename?: "ShipmentLegs";
			value: string;
			label?: string | null;
		}>;
	} | null;
};

export type AnalyticsShipmentLegsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsShipmentLegsQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		shipmentLegs: Array<{
			__typename?: "ShipmentLegs";
			status?: ShipmentLegStatus | null;
		}>;
	} | null;
};

export type CreateTripStopMutationVariables = Exact<{
	tripStop: CreateTripStopInput;
}>;

export type CreateTripStopMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createTripStop: {
			__typename?: "TripStops";
			id: string;
			sequence: number;
			address?: string | null;
			status?: TripStopStatus | null;
			estimatedArrivalTime?: string | null;
			estimatedDepartureTime?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			trip: { __typename?: "Trips"; id: string; status?: TripStatus | null };
			shipment?: {
				__typename?: "OutboundShipments";
				id: string;
				status?: OutboundShipmentStatus | null;
			} | null;
		};
	} | null;
};

export type UpdateTripStopMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	tripStop: UpdateTripStopInput;
}>;

export type UpdateTripStopMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateTripStop: {
			__typename?: "TripStops";
			id: string;
			sequence: number;
			address?: string | null;
			status?: TripStopStatus | null;
			estimatedArrivalTime?: string | null;
			estimatedDepartureTime?: string | null;
			actualArrivalTime?: string | null;
			actualDepartureTime?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			trip: { __typename?: "Trips"; id: string; status?: TripStatus | null };
			shipment?: {
				__typename?: "OutboundShipments";
				id: string;
				status?: OutboundShipmentStatus | null;
			} | null;
		};
	} | null;
};

export type RemoveTripStopMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveTripStopMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		removeTripStop: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreateTripMutationVariables = Exact<{
	trip: CreateTripInput;
}>;

export type CreateTripMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createTrip: {
			__typename?: "Trips";
			id: string;
			status?: TripStatus | null;
			startLocation?: string | null;
			startTime?: string | null;
			endLocation?: string | null;
			endTime?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			driver?: {
				__typename?: "Drivers";
				id: string;
				licenseNumber: string;
				status?: DriverStatus | null;
				user: { __typename?: "User"; id: string; name: string; email: string };
			} | null;
			vehicle?: {
				__typename?: "Vehicles";
				id: string;
				registrationNumber: string;
				make?: string | null;
				model?: string | null;
			} | null;
		};
	} | null;
};

export type UpdateTripMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	trip: UpdateTripInput;
}>;

export type UpdateTripMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateTrip: {
			__typename?: "Trips";
			id: string;
			status?: TripStatus | null;
			startLocation?: string | null;
			startTime?: string | null;
			endLocation?: string | null;
			endTime?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			driver?: {
				__typename?: "Drivers";
				id: string;
				licenseNumber: string;
				status?: DriverStatus | null;
				user: { __typename?: "User"; id: string; name: string; email: string };
			} | null;
			vehicle?: {
				__typename?: "Vehicles";
				id: string;
				registrationNumber: string;
				make?: string | null;
				model?: string | null;
			} | null;
		};
	} | null;
};

export type RemoveTripMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveTripMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		removeTrip: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableTripQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<TripStatus>;
}>;

export type TableTripQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		trips: Array<{
			__typename?: "Trips";
			createdAt?: any | null;
			endLocation?: string | null;
			endTime?: string | null;
			id: string;
			startLocation?: string | null;
			startTime?: string | null;
			status?: TripStatus | null;
			updatedAt?: any | null;
			driver?: {
				__typename?: "Drivers";
				licenseNumber: string;
				contactPhone?: string | null;
				status?: DriverStatus | null;
				user: {
					__typename?: "User";
					email: string;
					id: string;
					image?: string | null;
					name: string;
				};
			} | null;
			vehicle?: {
				__typename?: "Vehicles";
				vin?: string | null;
				year?: number | null;
				registrationNumber: string;
				model?: string | null;
				make?: string | null;
				status?: VehicleStatus | null;
			} | null;
		}>;
	} | null;
};

export type SearchTripsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchTripsQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		trips: Array<{
			__typename?: "Trips";
			value: string;
			label?: string | null;
		}>;
	} | null;
};

export type AnalyticsTripsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsTripsQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		trips: Array<{ __typename?: "Trips"; status?: TripStatus | null }>;
	} | null;
};

export type CreateVehicleMaintenanceMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	vehicleMaintenance: CreateVehicleMaintenanceInput;
}>;

export type CreateVehicleMaintenanceMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		addVehicleMaintenance: {
			__typename?: "VehicleMaintenance";
			id: string;
			serviceDate: any;
			serviceType?: VehicleServiceType | null;
			cost?: number | null;
			notes?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			vehicle: {
				__typename?: "Vehicles";
				id: string;
				registrationNumber: string;
				make?: string | null;
				model?: string | null;
			};
		};
	} | null;
};

export type UpdateVehicleMaintenanceMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	vehicleMaintenance: UpdateVehicleMaintenanceInput;
}>;

export type UpdateVehicleMaintenanceMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateVehicleMaintenance: {
			__typename?: "VehicleMaintenance";
			id: string;
			serviceDate: any;
			serviceType?: VehicleServiceType | null;
			cost?: number | null;
			notes?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			vehicle: {
				__typename?: "Vehicles";
				id: string;
				registrationNumber: string;
				make?: string | null;
				model?: string | null;
			};
		};
	} | null;
};

export type RemoveVehicleMaintenanceMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveVehicleMaintenanceMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		removeVehicleMaintenance: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreateVehicleMutationVariables = Exact<{
	vehicle: CreateVehicleInput;
}>;

export type CreateVehicleMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		createVehicle: {
			__typename?: "Vehicles";
			id: string;
			registrationNumber: string;
			make?: string | null;
			model?: string | null;
			year?: number | null;
			vin?: string | null;
			capacityWeight?: number | null;
			capacityVolume?: number | null;
			currentMileage?: number | null;
			lastMaintenanceDate?: string | null;
			status?: VehicleStatus | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateVehicleMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	vehicle: UpdateVehicleInput;
}>;

export type UpdateVehicleMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		updateVehicle: {
			__typename?: "Vehicles";
			id: string;
			registrationNumber: string;
			make?: string | null;
			model?: string | null;
			year?: number | null;
			vin?: string | null;
			capacityWeight?: number | null;
			capacityVolume?: number | null;
			currentMileage?: number | null;
			lastMaintenanceDate?: string | null;
			status?: VehicleStatus | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveVehicleMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveVehicleMutation = {
	__typename?: "Mutation";
	tms?: {
		__typename?: "TmsMutation";
		removeVehicle: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableVehicleQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<VehicleStatus>;
}>;

export type TableVehicleQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		vehicles: Array<{
			__typename?: "Vehicles";
			capacityVolume?: number | null;
			capacityWeight?: number | null;
			createdAt?: any | null;
			currentMileage?: number | null;
			id: string;
			lastMaintenanceDate?: string | null;
			make?: string | null;
			model?: string | null;
			registrationNumber: string;
			status?: VehicleStatus | null;
			updatedAt?: any | null;
			vin?: string | null;
			year?: number | null;
			maintenances?: Array<{
				__typename?: "VehicleMaintenance";
				cost?: number | null;
				createdAt?: any | null;
				id: string;
				notes?: string | null;
				serviceDate: any;
				serviceType?: VehicleServiceType | null;
				updatedAt?: any | null;
			}> | null;
		}>;
	} | null;
};

export type SearchVehiclesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchVehiclesQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		vehicles: Array<{ __typename?: "Vehicles"; value: string; label: string }>;
	} | null;
};

export type AnalyticsVehiclesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsVehiclesQuery = {
	__typename?: "Query";
	tms?: {
		__typename?: "TmsQuery";
		vehicles: Array<{
			__typename?: "Vehicles";
			capacityVolume?: number | null;
			capacityWeight?: number | null;
			currentMileage?: number | null;
			status?: VehicleStatus | null;
		}>;
	} | null;
};

export type CreateBinThresholdMutationVariables = Exact<{
	binThreshold: CreateBinThresholdInput;
}>;

export type CreateBinThresholdMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createBinThreshold: {
			__typename?: "BinThresholds";
			id: string;
			minQuantity: number;
			maxQuantity: number;
			reorderQuantity?: number | null;
			alertThreshold?: number | null;
			isActive?: boolean | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			location: { __typename?: "Locations"; id: string; name: string };
			product: {
				__typename?: "WmsProducts";
				id: string;
				name: string;
				sku: string;
			};
		};
	} | null;
};

export type UpdateBinThresholdMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	binThreshold: UpdateBinThresholdInput;
}>;

export type UpdateBinThresholdMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateBinThreshold: {
			__typename?: "BinThresholds";
			id: string;
			minQuantity: number;
			maxQuantity: number;
			reorderQuantity?: number | null;
			alertThreshold?: number | null;
			isActive?: boolean | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			location: { __typename?: "Locations"; id: string; name: string };
			product: {
				__typename?: "WmsProducts";
				id: string;
				name: string;
				sku: string;
			};
		};
	} | null;
};

export type RemoveBinThresholdMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveBinThresholdMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeBinThreshold: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableBinThresholdQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type TableBinThresholdQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		binThresholds: Array<{
			__typename?: "BinThresholds";
			alertThreshold?: number | null;
			createdAt?: any | null;
			id: string;
			isActive?: boolean | null;
			maxQuantity: number;
			minQuantity: number;
			reorderQuantity?: number | null;
			updatedAt?: any | null;
			product: {
				__typename?: "WmsProducts";
				name: string;
				description?: string | null;
				id: string;
				sku: string;
				status?: ProductStatus | null;
				barcode?: string | null;
			};
		}>;
	} | null;
};

export type AnalyticsBinThresholdsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsBinThresholdsQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		binThresholds: Array<{
			__typename?: "BinThresholds";
			minQuantity: number;
			maxQuantity: number;
			reorderQuantity?: number | null;
			alertThreshold?: number | null;
		}>;
	} | null;
};

export type UpdateInboundShipmentItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	inboundShipmentItem: UpdateInboundShipmentItemInput;
}>;

export type UpdateInboundShipmentItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateInboundShipmentItem: {
			__typename?: "InboundShipmentItems";
			id: string;
			expectedQuantity: number;
			receivedQuantity?: number | null;
			discrepancyQuantity?: number | null;
			discrepancyNotes?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveInboundShipmentItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveInboundShipmentItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeInboundShipmentItem: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreateInboundShipmentMutationVariables = Exact<{
	inboundShipment: CreateInboundShipmentInput;
}>;

export type CreateInboundShipmentMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createInboundShipment: {
			__typename?: "InboundShipments";
			id: string;
			warehouseId: string;
			status?: InboundShipmentStatus | null;
			expectedArrivalDate?: string | null;
			actualArrivalDate?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			client?: { __typename?: "Companies"; id: string; name: string } | null;
		};
	} | null;
};

export type UpdateInboundShipmentMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	inboundShipment: UpdateInboundShipmentInput;
}>;

export type UpdateInboundShipmentMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateInboundShipment: {
			__typename?: "InboundShipments";
			id: string;
			warehouseId: string;
			status?: InboundShipmentStatus | null;
			expectedArrivalDate?: string | null;
			actualArrivalDate?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
			client?: { __typename?: "Companies"; id: string; name: string } | null;
		};
	} | null;
};

export type RemoveInboundShipmentMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveInboundShipmentMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeInboundShipment: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableInboundShipmentQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	status?: InputMaybe<InboundShipmentStatus>;
}>;

export type TableInboundShipmentQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		inboundShipments: Array<{
			__typename?: "InboundShipments";
			actualArrivalDate?: string | null;
			createdAt?: any | null;
			expectedArrivalDate?: string | null;
			id: string;
			status?: InboundShipmentStatus | null;
			updatedAt?: any | null;
			client?: {
				__typename?: "Companies";
				name: string;
				industry?: string | null;
				phoneNumber?: string | null;
				country?: string | null;
				website?: string | null;
			} | null;
		}>;
	} | null;
};

export type AnalyticsInboundShipmentsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsInboundShipmentsQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		inboundShipments: Array<{
			__typename?: "InboundShipments";
			status?: InboundShipmentStatus | null;
		}>;
	} | null;
};

export type CreateInventoryAdjustmentMutationVariables = Exact<{
	inventoryAdjustment: CreateInventoryAdjustmentInput;
}>;

export type CreateInventoryAdjustmentMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createInventoryAdjustment: {
			__typename?: "InventoryAdjustments";
			id: string;
			warehouseId: string;
			quantityChange: number;
			reason?: InventoryAdjustmentReason | null;
			notes?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateInventoryAdjustmentMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	inventoryAdjustment: UpdateInventoryAdjustmentInput;
}>;

export type UpdateInventoryAdjustmentMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateInventoryAdjustment: {
			__typename?: "InventoryAdjustments";
			id: string;
			warehouseId: string;
			quantityChange: number;
			reason?: InventoryAdjustmentReason | null;
			notes?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveInventoryAdjustmentMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveInventoryAdjustmentMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeInventoryAdjustment: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableInventoryAdjustmentQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	reason?: InputMaybe<InventoryAdjustmentReason>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableInventoryAdjustmentQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		inventoryAdjustments: Array<{
			__typename?: "InventoryAdjustments";
			createdAt?: any | null;
			id: string;
			notes?: string | null;
			quantityChange: number;
			reason?: InventoryAdjustmentReason | null;
			updatedAt?: any | null;
			warehouseId: string;
			user: {
				__typename?: "User";
				email: string;
				id: string;
				image?: string | null;
				name: string;
			};
			product: {
				__typename?: "WmsProducts";
				barcode?: string | null;
				description?: string | null;
				id: string;
				name: string;
				sku: string;
				status?: ProductStatus | null;
			};
		}>;
	} | null;
};

export type SearchInventoryAdjustmentsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchInventoryAdjustmentsQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		inventoryAdjustments: Array<{
			__typename?: "InventoryAdjustments";
			value: string;
			label?: string | null;
		}>;
	} | null;
};

export type AnalyticsInventoryAdjustmentsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsInventoryAdjustmentsQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		inventoryAdjustments: Array<{
			__typename?: "InventoryAdjustments";
			quantityChange: number;
			reason?: InventoryAdjustmentReason | null;
		}>;
	} | null;
};

export type CreateInventoryBatchMutationVariables = Exact<{
	inventoryBatch: CreateInventoryBatchInput;
}>;

export type CreateInventoryBatchMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createInventoryBatch: {
			__typename?: "InventoryBatches";
			id: string;
			batchNumber: string;
			expirationDate?: any | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateInventoryBatchMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	inventoryBatch: UpdateInventoryBatchInput;
}>;

export type UpdateInventoryBatchMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateInventoryBatch: {
			__typename?: "InventoryBatches";
			id: string;
			batchNumber: string;
			expirationDate?: any | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveInventoryBatchMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveInventoryBatchMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeInventoryBatch: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableInventoryBatchQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableInventoryBatchQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		inventoryBatches: Array<{
			__typename?: "InventoryBatches";
			batchNumber: string;
			createdAt?: any | null;
			expirationDate?: any | null;
			id: string;
			updatedAt?: any | null;
			inventoryStock?: Array<{
				__typename?: "InventoryStock";
				availableQuantity?: number | null;
				quantity: number;
				reservedQuantity: number;
				status?: InventoryStockStatus | null;
				product: {
					__typename?: "WmsProducts";
					barcode?: string | null;
					name: string;
					sku: string;
					status?: ProductStatus | null;
					description?: string | null;
					id: string;
					costPrice?: number | null;
				};
			}> | null;
		}>;
	} | null;
};

export type SearchInventoryBatchesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchInventoryBatchesQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		inventoryBatches: Array<{
			__typename?: "InventoryBatches";
			value: string;
			label: string;
		}>;
	} | null;
};

export type CreateInventoryStockMutationVariables = Exact<{
	inventoryStock: CreateInventoryStockInput;
}>;

export type CreateInventoryStockMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createInventoryStock: {
			__typename?: "InventoryStock";
			id: string;
			quantity: number;
			reservedQuantity: number;
			availableQuantity?: number | null;
			status?: InventoryStockStatus | null;
			lastCountedAt?: any | null;
			lastMovementAt?: any | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateInventoryStockMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	inventoryStock: UpdateInventoryStockInput;
}>;

export type UpdateInventoryStockMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateInventoryStock: {
			__typename?: "InventoryStock";
			id: string;
			quantity: number;
			reservedQuantity: number;
			availableQuantity?: number | null;
			status?: InventoryStockStatus | null;
			lastCountedAt?: any | null;
			lastMovementAt?: any | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveInventoryStockMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveInventoryStockMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeInventoryStock: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableInventoryStockQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	status?: InputMaybe<InventoryStockStatus>;
}>;

export type TableInventoryStockQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		inventoryStocks: Array<{
			__typename?: "InventoryStock";
			availableQuantity?: number | null;
			createdAt?: any | null;
			id: string;
			lastCountedAt?: any | null;
			lastMovementAt?: any | null;
			quantity: number;
			reservedQuantity: number;
			status?: InventoryStockStatus | null;
			updatedAt?: any | null;
			product: {
				__typename?: "WmsProducts";
				barcode?: string | null;
				costPrice?: number | null;
				description?: string | null;
				id: string;
				name: string;
				status?: ProductStatus | null;
				sku: string;
				volume?: number | null;
				weight?: number | null;
				width?: number | null;
			};
			location: {
				__typename?: "Locations";
				id: string;
				barcode?: string | null;
				isActive?: boolean | null;
				isPickable?: boolean | null;
				isReceivable?: boolean | null;
				level?: number | null;
				name: string;
			};
		}>;
	} | null;
};

export type AnalyticsInventoryStockQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsInventoryStockQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		inventoryStocks: Array<{
			__typename?: "InventoryStock";
			quantity: number;
			reservedQuantity: number;
			availableQuantity?: number | null;
			status?: InventoryStockStatus | null;
		}>;
	} | null;
};

export type CreateLocationMutationVariables = Exact<{
	location: CreateLocationInput;
}>;

export type CreateLocationMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createLocation: {
			__typename?: "Locations";
			id: string;
			name: string;
			barcode?: string | null;
			type: LocationType;
			isActive?: boolean | null;
			isPickable?: boolean | null;
			isReceivable?: boolean | null;
			level?: number | null;
			maxPallets?: number | null;
			maxVolume?: number | null;
			maxWeight?: number | null;
			temperatureControlled?: boolean | null;
			hazmatApproved?: boolean | null;
			xCoordinate?: number | null;
			yCoordinate?: number | null;
			zCoordinate?: number | null;
			path?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateLocationMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	location: UpdateLocationInput;
}>;

export type UpdateLocationMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateLocation: {
			__typename?: "Locations";
			id: string;
			name: string;
			barcode?: string | null;
			type: LocationType;
			isActive?: boolean | null;
			isPickable?: boolean | null;
			isReceivable?: boolean | null;
			level?: number | null;
			maxPallets?: number | null;
			maxVolume?: number | null;
			maxWeight?: number | null;
			temperatureControlled?: boolean | null;
			hazmatApproved?: boolean | null;
			xCoordinate?: number | null;
			yCoordinate?: number | null;
			zCoordinate?: number | null;
			path?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveLocationMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveLocationMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeLocation: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableLocationQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	type?: InputMaybe<LocationType>;
}>;

export type TableLocationQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		locations: Array<{
			__typename?: "Locations";
			barcode?: string | null;
			createdAt?: any | null;
			isActive?: boolean | null;
			isPickable?: boolean | null;
			isReceivable?: boolean | null;
			id: string;
			hazmatApproved?: boolean | null;
			level?: number | null;
			maxPallets?: number | null;
			maxVolume?: number | null;
			maxWeight?: number | null;
			name: string;
			path?: string | null;
			temperatureControlled?: boolean | null;
			type: LocationType;
			updatedAt?: any | null;
			xCoordinate?: number | null;
			yCoordinate?: number | null;
			zCoordinate?: number | null;
			parentLocation?: {
				__typename?: "Locations";
				id: string;
				name: string;
				path?: string | null;
			} | null;
			warehouse: {
				__typename?: "Warehouses";
				address?: string | null;
				city?: string | null;
				name: string;
				id: string;
				isActive?: boolean | null;
			};
		}>;
	} | null;
};

export type SearchLocationsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchLocationsQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		locations: Array<{
			__typename?: "Locations";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsLocationsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsLocationsQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		locations: Array<{
			__typename?: "Locations";
			maxWeight?: number | null;
			maxVolume?: number | null;
			maxPallets?: number | null;
			type: LocationType;
		}>;
	} | null;
};

export type UpdateOutboundShipmentItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	outboundShipmentItem: UpdateOutboundShipmentItemInput;
}>;

export type UpdateOutboundShipmentItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateOutboundShipmentItem: {
			__typename?: "OutboundShipmentItems";
			id: string;
			quantityShipped: number;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveOutboundShipmentItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveOutboundShipmentItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeOutboundShipmentItem: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreateOutboundShipmentMutationVariables = Exact<{
	outboundShipment: CreateOutboundShipmentInput;
}>;

export type CreateOutboundShipmentMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createOutboundShipment: {
			__typename?: "OutboundShipments";
			id: string;
			carrier?: string | null;
			trackingNumber?: string | null;
			status?: OutboundShipmentStatus | null;
			warehouseId: string;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateOutboundShipmentMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	outboundShipment: UpdateOutboundShipmentInput;
}>;

export type UpdateOutboundShipmentMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateOutboundShipment: {
			__typename?: "OutboundShipments";
			id: string;
			carrier?: string | null;
			trackingNumber?: string | null;
			status?: OutboundShipmentStatus | null;
			warehouseId: string;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveOutboundShipmentMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveOutboundShipmentMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeOutboundShipment: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableOutboundShipmentQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<OutboundShipmentStatus>;
}>;

export type TableOutboundShipmentQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		outboundShipments: Array<{
			__typename?: "OutboundShipments";
			carrier?: string | null;
			createdAt?: any | null;
			id: string;
			status?: OutboundShipmentStatus | null;
			trackingNumber?: string | null;
			updatedAt?: any | null;
			warehouseId: string;
			salesOrder: {
				__typename?: "SalesOrders";
				id: string;
				orderNumber: string;
				shippingAddress?: string | null;
				status?: SalesOrderStatus | null;
			};
		}>;
	} | null;
};

export type SearchOutboundShipmentsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchOutboundShipmentsQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		outboundShipments: Array<{
			__typename?: "OutboundShipments";
			value: string;
			label?: string | null;
		}>;
	} | null;
};

export type AnalyticsOutboundShipmentsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsOutboundShipmentsQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		outboundShipments: Array<{
			__typename?: "OutboundShipments";
			status?: OutboundShipmentStatus | null;
		}>;
	} | null;
};

export type UpdatePackageItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	packageItem: UpdatePackageItemInput;
}>;

export type UpdatePackageItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updatePackageItem: {
			__typename?: "PackageItems";
			id: string;
			quantity: number;
			lotNumber?: string | null;
			serialNumbers: Array<string>;
			expiryDate?: string | null;
			unitWeight?: number | null;
			totalWeight?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemovePackageItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemovePackageItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removePackageItem: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreatePackageMutationVariables = Exact<{
	package: CreatePackageInput;
}>;

export type CreatePackageMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createPackage: {
			__typename?: "Packages";
			id: string;
			packageNumber: string;
			packageType?: string | null;
			weight?: number | null;
			length?: number | null;
			width?: number | null;
			height?: number | null;
			volume?: number | null;
			trackingNumber?: string | null;
			carrier?: string | null;
			serviceLevel?: string | null;
			packedAt?: string | null;
			shippedAt?: string | null;
			isFragile?: boolean | null;
			isHazmat?: boolean | null;
			requiresSignature?: boolean | null;
			insuranceValue?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdatePackageMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	package: UpdatePackageInput;
}>;

export type UpdatePackageMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updatePackage: {
			__typename?: "Packages";
			id: string;
			packageNumber: string;
			packageType?: string | null;
			weight?: number | null;
			length?: number | null;
			width?: number | null;
			height?: number | null;
			volume?: number | null;
			trackingNumber?: string | null;
			carrier?: string | null;
			serviceLevel?: string | null;
			packedAt?: string | null;
			shippedAt?: string | null;
			isFragile?: boolean | null;
			isHazmat?: boolean | null;
			requiresSignature?: boolean | null;
			insuranceValue?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemovePackageMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemovePackageMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removePackage: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TablePackageQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TablePackageQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		packages: Array<{
			__typename?: "Packages";
			carrier?: string | null;
			createdAt?: any | null;
			height?: number | null;
			id: string;
			insuranceValue?: number | null;
			isFragile?: boolean | null;
			isHazmat?: boolean | null;
			length?: number | null;
			packageNumber: string;
			packageType?: string | null;
			packedAt?: string | null;
			requiresSignature?: boolean | null;
			serviceLevel?: string | null;
			shippedAt?: string | null;
			trackingNumber?: string | null;
			updatedAt?: any | null;
			volume?: number | null;
			weight?: number | null;
			width?: number | null;
			items?: Array<{
				__typename?: "PackageItems";
				lotNumber?: string | null;
				quantity: number;
				serialNumbers: Array<string>;
				totalWeight?: number | null;
				unitWeight?: number | null;
				product: {
					__typename?: "WmsProducts";
					barcode?: string | null;
					costPrice?: number | null;
					name: string;
					sku: string;
					status?: ProductStatus | null;
				};
			}> | null;
		}>;
	} | null;
};

export type SearchPackagesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchPackagesQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		packages: Array<{ __typename?: "Packages"; value: string; label: string }>;
	} | null;
};

export type AnalyticsPackagesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsPackagesQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		packages: Array<{
			__typename?: "Packages";
			weight?: number | null;
			length?: number | null;
			width?: number | null;
			height?: number | null;
			volume?: number | null;
			insuranceValue?: number | null;
		}>;
	} | null;
};

export type UpdatePickBatchItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	pickBatchItem: UpdatePickBatchItemInput;
}>;

export type UpdatePickBatchItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updatePickBatchItem: {
			__typename?: "PickBatchItems";
			id: string;
			orderPriority?: number | null;
			estimatedPickTime?: number | null;
			actualPickTime?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemovePickBatchItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemovePickBatchItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removePickBatchItem: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreatePickBatchMutationVariables = Exact<{
	pickBatch: CreatePickBatchInput;
}>;

export type CreatePickBatchMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createPickBatch: {
			__typename?: "PickBatches";
			id: string;
			batchNumber: string;
			status?: PickBatchStatus | null;
			strategy: PickStrategy;
			priority?: number | null;
			waveId?: string | null;
			zoneRestrictions?: Array<string | null> | null;
			estimatedDuration?: number | null;
			actualDuration?: number | null;
			totalItems?: number | null;
			completedItems?: number | null;
			startedAt?: string | null;
			completedAt?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdatePickBatchMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	pickBatch: UpdatePickBatchInput;
}>;

export type UpdatePickBatchMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updatePickBatch: {
			__typename?: "PickBatches";
			id: string;
			batchNumber: string;
			status?: PickBatchStatus | null;
			strategy: PickStrategy;
			priority?: number | null;
			waveId?: string | null;
			zoneRestrictions?: Array<string | null> | null;
			estimatedDuration?: number | null;
			actualDuration?: number | null;
			totalItems?: number | null;
			completedItems?: number | null;
			startedAt?: string | null;
			completedAt?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemovePickBatchMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemovePickBatchMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removePickBatch: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TablePickBatchQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<PickBatchStatus>;
	strategy?: InputMaybe<PickStrategy>;
}>;

export type TablePickBatchQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		pickBatches: Array<{
			__typename?: "PickBatches";
			actualDuration?: number | null;
			batchNumber: string;
			completedAt?: string | null;
			completedItems?: number | null;
			createdAt?: any | null;
			estimatedDuration?: number | null;
			id: string;
			priority?: number | null;
			startedAt?: string | null;
			status?: PickBatchStatus | null;
			strategy: PickStrategy;
			totalItems?: number | null;
			updatedAt?: any | null;
			waveId?: string | null;
			zoneRestrictions?: Array<string | null> | null;
			items?: Array<{
				__typename?: "PickBatchItems";
				id: string;
				estimatedPickTime?: number | null;
				actualPickTime?: number | null;
				orderPriority?: number | null;
				salesOrder: {
					__typename?: "SalesOrders";
					status?: SalesOrderStatus | null;
					shippingAddress?: string | null;
					orderNumber: string;
				};
			}> | null;
		}>;
	} | null;
};

export type SearchPickBatchesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchPickBatchesQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		pickBatches: Array<{
			__typename?: "PickBatches";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsPickBatchesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsPickBatchesQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		pickBatches: Array<{
			__typename?: "PickBatches";
			priority?: number | null;
			estimatedDuration?: number | null;
			actualDuration?: number | null;
			totalItems?: number | null;
			completedItems?: number | null;
			status?: PickBatchStatus | null;
			strategy: PickStrategy;
		}>;
	} | null;
};

export type CreateWmsProductMutationVariables = Exact<{
	wmsProduct: CreateWmsProductInput;
}>;

export type CreateWmsProductMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createWmsProduct: {
			__typename?: "WmsProducts";
			id: string;
			name: string;
			sku: string;
			barcode?: string | null;
			description?: string | null;
			costPrice?: number | null;
			length?: number | null;
			width?: number | null;
			height?: number | null;
			volume?: number | null;
			weight?: number | null;
			status?: ProductStatus | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateWmsProductMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	wmsProduct: UpdateWmsProductInput;
}>;

export type UpdateWmsProductMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateWmsProduct: {
			__typename?: "WmsProducts";
			id: string;
			name: string;
			sku: string;
			barcode?: string | null;
			description?: string | null;
			costPrice?: number | null;
			length?: number | null;
			width?: number | null;
			height?: number | null;
			volume?: number | null;
			weight?: number | null;
			status?: ProductStatus | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveWmsProductMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveWmsProductMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeWmsProduct: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableWmsProductQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<ProductStatus>;
}>;

export type TableWmsProductQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		wmsProducts: Array<{
			__typename?: "WmsProducts";
			barcode?: string | null;
			costPrice?: number | null;
			createdAt?: any | null;
			height?: number | null;
			description?: string | null;
			id: string;
			length?: number | null;
			name: string;
			sku: string;
			status?: ProductStatus | null;
			updatedAt?: any | null;
			volume?: number | null;
			weight?: number | null;
			width?: number | null;
			supplier?: {
				__typename?: "Suppliers";
				contactPerson?: string | null;
				email?: string | null;
				name: string;
				phoneNumber?: string | null;
			} | null;
		}>;
	} | null;
};

export type SearchWmsProductsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchWmsProductsQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		wmsProducts: Array<{
			__typename?: "WmsProducts";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsWmsProductsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsWmsProductsQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		wmsProducts: Array<{
			__typename?: "WmsProducts";
			costPrice?: number | null;
			length?: number | null;
			width?: number | null;
			height?: number | null;
			volume?: number | null;
			weight?: number | null;
			status?: ProductStatus | null;
		}>;
	} | null;
};

export type CreatePutawayRuleMutationVariables = Exact<{
	putawayRule: CreatePutawayRuleInput;
}>;

export type CreatePutawayRuleMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createPutawayRule: {
			__typename?: "PutawayRules";
			id: string;
			locationType?: LocationType | null;
			priority: number;
			minQuantity?: number | null;
			maxQuantity?: number | null;
			weightThreshold?: number | null;
			volumeThreshold?: number | null;
			requiresTemperatureControl?: boolean | null;
			requiresHazmatApproval?: boolean | null;
			isActive?: boolean | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdatePutawayRuleMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	putawayRule: UpdatePutawayRuleInput;
}>;

export type UpdatePutawayRuleMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updatePutawayRule: {
			__typename?: "PutawayRules";
			id: string;
			locationType?: LocationType | null;
			priority: number;
			minQuantity?: number | null;
			maxQuantity?: number | null;
			weightThreshold?: number | null;
			volumeThreshold?: number | null;
			requiresTemperatureControl?: boolean | null;
			requiresHazmatApproval?: boolean | null;
			isActive?: boolean | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemovePutawayRuleMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemovePutawayRuleMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removePutawayRule: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TablePutawayRuleQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	locationType?: InputMaybe<LocationType>;
}>;

export type TablePutawayRuleQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		putawayRules: Array<{
			__typename?: "PutawayRules";
			createdAt?: any | null;
			isActive?: boolean | null;
			id: string;
			locationType?: LocationType | null;
			maxQuantity?: number | null;
			minQuantity?: number | null;
			priority: number;
			requiresHazmatApproval?: boolean | null;
			requiresTemperatureControl?: boolean | null;
			updatedAt?: any | null;
			volumeThreshold?: number | null;
			weightThreshold?: number | null;
			client?: {
				__typename?: "Companies";
				name: string;
				industry?: string | null;
				country?: string | null;
				city?: string | null;
				website?: string | null;
				phoneNumber?: string | null;
			} | null;
			product: {
				__typename?: "WmsProducts";
				barcode?: string | null;
				id: string;
				costPrice?: number | null;
				description?: string | null;
				name: string;
				sku: string;
				status?: ProductStatus | null;
			};
			warehouse: {
				__typename?: "Warehouses";
				address?: string | null;
				city?: string | null;
				country?: string | null;
				name: string;
				isActive?: boolean | null;
			};
		}>;
	} | null;
};

export type AnalyticsPutawayRulesQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsPutawayRulesQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		putawayRules: Array<{
			__typename?: "PutawayRules";
			priority: number;
			minQuantity?: number | null;
			maxQuantity?: number | null;
			weightThreshold?: number | null;
			volumeThreshold?: number | null;
			locationType?: LocationType | null;
		}>;
	} | null;
};

export type CreateReorderPointMutationVariables = Exact<{
	reorderPoint: CreateReorderPointInput;
}>;

export type CreateReorderPointMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createReorderPoint: {
			__typename?: "ReorderPoints";
			id: string;
			threshold: number;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateReorderPointMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	reorderPoint: UpdateReorderPointInput;
}>;

export type UpdateReorderPointMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateReorderPoint: {
			__typename?: "ReorderPoints";
			id: string;
			threshold: number;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveReorderPointMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveReorderPointMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeReorderPoint: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableReorderPointQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type TableReorderPointQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		reorderPoints: Array<{
			__typename?: "ReorderPoints";
			createdAt?: any | null;
			id: string;
			threshold: number;
			updatedAt?: any | null;
			product: {
				__typename?: "WmsProducts";
				barcode?: string | null;
				description?: string | null;
				costPrice?: number | null;
				id: string;
				name: string;
				sku: string;
				status?: ProductStatus | null;
			};
			warehouse: {
				__typename?: "Warehouses";
				address?: string | null;
				city?: string | null;
				country?: string | null;
				id: string;
				name: string;
			};
		}>;
	} | null;
};

export type AnalyticsReorderPointsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsReorderPointsQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		reorderPoints: Array<{ __typename?: "ReorderPoints"; threshold: number }>;
	} | null;
};

export type UpdateReturnItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	returnItem: UpdateReturnItemInput;
}>;

export type UpdateReturnItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateReturnItem: {
			__typename?: "ReturnItems";
			id: string;
			quantityExpected: number;
			quantityReceived?: number | null;
			quantityVariance?: number | null;
			condition?: ReturnItemCondition | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveReturnItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveReturnItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeReturnItem: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreateReturnMutationVariables = Exact<{
	return: CreateReturnInput;
}>;

export type CreateReturnMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createReturn: {
			__typename?: "Returns";
			id: string;
			returnNumber: string;
			status?: ReturnStatus | null;
			reason?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateReturnMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	return: UpdateReturnInput;
}>;

export type UpdateReturnMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateReturn: {
			__typename?: "Returns";
			id: string;
			returnNumber: string;
			status?: ReturnStatus | null;
			reason?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveReturnMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveReturnMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeReturn: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableReturnQueryQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	status?: InputMaybe<ReturnStatus>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableReturnQueryQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		returns: Array<{
			__typename?: "Returns";
			createdAt?: any | null;
			id: string;
			reason?: string | null;
			returnNumber: string;
			status?: ReturnStatus | null;
			updatedAt?: any | null;
			client: {
				__typename?: "Companies";
				name: string;
				phoneNumber?: string | null;
				industry?: string | null;
				country?: string | null;
				city?: string | null;
				website?: string | null;
			};
			salesOrder?: {
				__typename?: "SalesOrders";
				orderNumber: string;
				shippingAddress?: string | null;
				status?: SalesOrderStatus | null;
				updatedAt?: any | null;
				id: string;
			} | null;
			items?: Array<{
				__typename?: "ReturnItems";
				condition?: ReturnItemCondition | null;
				id: string;
				quantityExpected: number;
				quantityReceived?: number | null;
				quantityVariance?: number | null;
				product: {
					__typename?: "WmsProducts";
					barcode?: string | null;
					costPrice?: number | null;
					description?: string | null;
					id: string;
					name: string;
					sku: string;
					status?: ProductStatus | null;
				};
			}> | null;
		}>;
	} | null;
};

export type SearchReturnsQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchReturnsQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		returns: Array<{ __typename?: "Returns"; value: string; label: string }>;
	} | null;
};

export type AnalyticsReturnsQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsReturnsQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		returns: Array<{ __typename?: "Returns"; status?: ReturnStatus | null }>;
	} | null;
};

export type UpdateSalesOrderItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	salesOrderItem: UpdateSalesOrderItemInput;
}>;

export type UpdateSalesOrderItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateSalesOrderItem: {
			__typename?: "SalesOrderItems";
			id: string;
			quantityOrdered: number;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveSalesOrderItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveSalesOrderItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeSalesOrderItem: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreateSalesOrderMutationVariables = Exact<{
	salesOrder: CreateSalesOrderInput;
}>;

export type CreateSalesOrderMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createSalesOrder: {
			__typename?: "SalesOrders";
			id: string;
			orderNumber: string;
			status?: SalesOrderStatus | null;
			shippingAddress?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateSalesOrderMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	salesOrder: UpdateSalesOrderInput;
}>;

export type UpdateSalesOrderMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateSalesOrder: {
			__typename?: "SalesOrders";
			id: string;
			orderNumber: string;
			status?: SalesOrderStatus | null;
			shippingAddress?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveSalesOrderMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveSalesOrderMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeSalesOrder: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableSalesOrderQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<SalesOrderStatus>;
}>;

export type TableSalesOrderQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		salesOrders: Array<{
			__typename?: "SalesOrders";
			createdAt?: any | null;
			id: string;
			orderNumber: string;
			shippingAddress?: string | null;
			status?: SalesOrderStatus | null;
			updatedAt?: any | null;
			items?: Array<{
				__typename?: "SalesOrderItems";
				id: string;
				quantityOrdered: number;
				updatedAt?: any | null;
				product: {
					__typename?: "WmsProducts";
					barcode?: string | null;
					id: string;
					description?: string | null;
					name: string;
					sku: string;
					status?: ProductStatus | null;
				};
			}> | null;
		}>;
	} | null;
};

export type SearchSalesOrdersQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchSalesOrdersQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		salesOrders: Array<{
			__typename?: "SalesOrders";
			value: string;
			label: string;
		}>;
	} | null;
};

export type AnalyticsSalesOrdersQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsSalesOrdersQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		salesOrders: Array<{
			__typename?: "SalesOrders";
			status?: SalesOrderStatus | null;
		}>;
	} | null;
};

export type CreateStockTransferMutationVariables = Exact<{
	stockTransfer: CreateStockTransferInput;
}>;

export type CreateStockTransferMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createStockTransfer: {
			__typename?: "StockTransfers";
			id: string;
			quantity: number;
			status?: StockTransferStatus | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateStockTransferMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	stockTransfer: UpdateStockTransferInput;
}>;

export type UpdateStockTransferMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateStockTransfer: {
			__typename?: "StockTransfers";
			id: string;
			quantity: number;
			status?: StockTransferStatus | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveStockTransferMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveStockTransferMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeStockTransfer: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableStockTransferQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	status?: InputMaybe<StockTransferStatus>;
}>;

export type TableStockTransferQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		stockTransfers: Array<{
			__typename?: "StockTransfers";
			createdAt?: any | null;
			id: string;
			quantity: number;
			status?: StockTransferStatus | null;
			updatedAt?: any | null;
			destinationWarehouse: {
				__typename?: "Warehouses";
				address?: string | null;
				city?: string | null;
				country?: string | null;
				id: string;
				name: string;
				timezone?: string | null;
				isActive?: boolean | null;
			};
			product: {
				__typename?: "WmsProducts";
				barcode?: string | null;
				costPrice?: number | null;
				name: string;
				height?: number | null;
				sku: string;
				status?: ProductStatus | null;
			};
			sourceWarehouse: {
				__typename?: "Warehouses";
				address?: string | null;
				country?: string | null;
				isActive?: boolean | null;
				name: string;
				city?: string | null;
				id: string;
				timezone?: string | null;
			};
		}>;
	} | null;
};

export type AnalyticsStockTransfersQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsStockTransfersQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		stockTransfers: Array<{
			__typename?: "StockTransfers";
			quantity: number;
			status?: StockTransferStatus | null;
		}>;
	} | null;
};

export type CreateSupplierMutationVariables = Exact<{
	supplier: CreateSupplierInput;
}>;

export type CreateSupplierMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createSupplier: {
			__typename?: "Suppliers";
			id: string;
			name: string;
			contactPerson?: string | null;
			email?: string | null;
			phoneNumber?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateSupplierMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	supplier: UpdateSupplierInput;
}>;

export type UpdateSupplierMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateSupplier: {
			__typename?: "Suppliers";
			id: string;
			name: string;
			contactPerson?: string | null;
			email?: string | null;
			phoneNumber?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveSupplierMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveSupplierMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeSupplier: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableSupplierQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableSupplierQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		suppliers: Array<{
			__typename?: "Suppliers";
			contactPerson?: string | null;
			createdAt?: any | null;
			email?: string | null;
			id: string;
			name: string;
			phoneNumber?: string | null;
			updatedAt?: any | null;
			products?: Array<{
				__typename?: "WmsProducts";
				barcode?: string | null;
				id: string;
				costPrice?: number | null;
				description?: string | null;
				name: string;
				sku: string;
				status?: ProductStatus | null;
			}> | null;
		}>;
	} | null;
};

export type SearchSuppliersQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchSuppliersQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		suppliers: Array<{
			__typename?: "Suppliers";
			value: string;
			label: string;
		}>;
	} | null;
};

export type UpdateTaskItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	taskItem: UpdateTaskItemInput;
}>;

export type UpdateTaskItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateTaskItem: {
			__typename?: "TaskItems";
			id: string;
			quantityRequired: number;
			quantityCompleted: number;
			quantityRemaining?: number | null;
			status?: TaskItemStatus | null;
			lotNumber?: string | null;
			serialNumbers?: Array<string | null> | null;
			expiryDate?: string | null;
			notes?: string | null;
			completedAt?: string | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveTaskItemMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveTaskItemMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeTaskItem: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type CreateTaskMutationVariables = Exact<{
	task: CreateTaskInput;
}>;

export type CreateTaskMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createTask: {
			__typename?: "Tasks";
			id: string;
			taskNumber: string;
			type: TaskType;
			status?: TaskStatus | null;
			priority?: number | null;
			sourceEntityId?: string | null;
			sourceEntityType?: string | null;
			estimatedDuration?: number | null;
			actualDuration?: number | null;
			instructions?: string | null;
			notes?: string | null;
			startTime?: string | null;
			endTime?: string | null;
			durationSeconds?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateTaskMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	task: UpdateTaskInput;
}>;

export type UpdateTaskMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateTask: {
			__typename?: "Tasks";
			id: string;
			taskNumber: string;
			type: TaskType;
			status?: TaskStatus | null;
			priority?: number | null;
			sourceEntityId?: string | null;
			sourceEntityType?: string | null;
			estimatedDuration?: number | null;
			actualDuration?: number | null;
			instructions?: string | null;
			notes?: string | null;
			startTime?: string | null;
			endTime?: string | null;
			durationSeconds?: number | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveTaskMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveTaskMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeTask: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableTaskQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
	status?: InputMaybe<TaskStatus>;
	type?: InputMaybe<TaskType>;
}>;

export type TableTaskQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		tasks: Array<{
			__typename?: "Tasks";
			actualDuration?: number | null;
			createdAt?: any | null;
			durationSeconds?: number | null;
			endTime?: string | null;
			estimatedDuration?: number | null;
			id: string;
			instructions?: string | null;
			notes?: string | null;
			priority?: number | null;
			sourceEntityId?: string | null;
			sourceEntityType?: string | null;
			startTime?: string | null;
			status?: TaskStatus | null;
			taskNumber: string;
			type: TaskType;
			updatedAt?: any | null;
			user?: {
				__typename?: "User";
				email: string;
				id: string;
				image?: string | null;
				name: string;
			} | null;
			warehouse: {
				__typename?: "Warehouses";
				address?: string | null;
				city?: string | null;
				country?: string | null;
				id: string;
				isActive?: boolean | null;
				name: string;
				timezone?: string | null;
			};
			items?: Array<{
				__typename?: "TaskItems";
				completedAt?: string | null;
				createdAt?: any | null;
				expiryDate?: string | null;
				id: string;
				lotNumber?: string | null;
				notes?: string | null;
				quantityCompleted: number;
				quantityRemaining?: number | null;
				quantityRequired: number;
				serialNumbers?: Array<string | null> | null;
				status?: TaskItemStatus | null;
				updatedAt?: any | null;
				product: {
					__typename?: "WmsProducts";
					barcode?: string | null;
					costPrice?: number | null;
					description?: string | null;
					id: string;
					name: string;
					sku: string;
					status?: ProductStatus | null;
				};
				sourceLocation?: {
					__typename?: "Locations";
					barcode?: string | null;
					hazmatApproved?: boolean | null;
					id: string;
					path?: string | null;
					name: string;
					type: LocationType;
				} | null;
			}> | null;
		}>;
	} | null;
};

export type SearchTasksQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchTasksQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		tasks: Array<{ __typename?: "Tasks"; value: string; label: string }>;
	} | null;
};

export type AnalyticsTasksQueryVariables = Exact<{
	from?: InputMaybe<Scalars["Date"]["input"]>;
	to?: InputMaybe<Scalars["Date"]["input"]>;
}>;

export type AnalyticsTasksQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		tasks: Array<{
			__typename?: "Tasks";
			priority?: number | null;
			estimatedDuration?: number | null;
			actualDuration?: number | null;
			durationSeconds?: number | null;
			type: TaskType;
			status?: TaskStatus | null;
		}>;
	} | null;
};

export type CreateWarehouseMutationVariables = Exact<{
	warehouse: CreateWarehouseInput;
}>;

export type CreateWarehouseMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		createWarehouse: {
			__typename?: "Warehouses";
			id: string;
			name: string;
			address?: string | null;
			city?: string | null;
			state?: string | null;
			postalCode?: string | null;
			country?: string | null;
			timezone?: string | null;
			contactPerson?: string | null;
			contactEmail?: string | null;
			contactPhone?: string | null;
			isActive?: boolean | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type UpdateWarehouseMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
	warehouse: UpdateWarehouseInput;
}>;

export type UpdateWarehouseMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		updateWarehouse: {
			__typename?: "Warehouses";
			id: string;
			name: string;
			address?: string | null;
			city?: string | null;
			state?: string | null;
			postalCode?: string | null;
			country?: string | null;
			timezone?: string | null;
			contactPerson?: string | null;
			contactEmail?: string | null;
			contactPhone?: string | null;
			isActive?: boolean | null;
			createdAt?: any | null;
			updatedAt?: any | null;
		};
	} | null;
};

export type RemoveWarehouseMutationVariables = Exact<{
	id: Scalars["ID"]["input"];
}>;

export type RemoveWarehouseMutation = {
	__typename?: "Mutation";
	wms?: {
		__typename?: "WmsMutation";
		removeWarehouse: {
			__typename?: "DeleteResult";
			success: boolean;
			numDeletedRows: number;
		};
	} | null;
};

export type TableWarehouseQueryVariables = Exact<{
	page?: InputMaybe<Scalars["Int"]["input"]>;
	perPage?: InputMaybe<Scalars["Int"]["input"]>;
	search?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type TableWarehouseQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		warehouses: Array<{
			__typename?: "Warehouses";
			address?: string | null;
			city?: string | null;
			contactEmail?: string | null;
			contactPerson?: string | null;
			contactPhone?: string | null;
			country?: string | null;
			createdAt?: any | null;
			id: string;
			isActive?: boolean | null;
			name: string;
			postalCode?: string | null;
			state?: string | null;
			timezone?: string | null;
			updatedAt?: any | null;
			tasks?: Array<{
				__typename?: "Tasks";
				instructions?: string | null;
				id: string;
				notes?: string | null;
				priority?: number | null;
				taskNumber: string;
				type: TaskType;
				user?: {
					__typename?: "User";
					email: string;
					id: string;
					image?: string | null;
					name: string;
				} | null;
			}> | null;
			locations?: Array<{
				__typename?: "Locations";
				barcode?: string | null;
				id: string;
				isActive?: boolean | null;
				isPickable?: boolean | null;
				isReceivable?: boolean | null;
				level?: number | null;
				maxPallets?: number | null;
				maxVolume?: number | null;
				maxWeight?: number | null;
				name: string;
				path?: string | null;
				type: LocationType;
				xCoordinate?: number | null;
				yCoordinate?: number | null;
				zCoordinate?: number | null;
				hazmatApproved?: boolean | null;
			}> | null;
			inboundShipments?: Array<{
				__typename?: "InboundShipments";
				status?: InboundShipmentStatus | null;
				updatedAt?: any | null;
				warehouseId: string;
				items?: Array<{
					__typename?: "InboundShipmentItems";
					discrepancyNotes?: string | null;
					discrepancyQuantity?: number | null;
					expectedQuantity: number;
					id: string;
					createdAt?: any | null;
					receivedQuantity?: number | null;
					updatedAt?: any | null;
					product: {
						__typename?: "WmsProducts";
						barcode?: string | null;
						costPrice?: number | null;
						description?: string | null;
						id: string;
						name: string;
						sku: string;
						status?: ProductStatus | null;
					};
					inboundShipment: {
						__typename?: "InboundShipments";
						status?: InboundShipmentStatus | null;
						id: string;
						expectedArrivalDate?: string | null;
						updatedAt?: any | null;
						actualArrivalDate?: string | null;
						client?: {
							__typename?: "Companies";
							city?: string | null;
							country?: string | null;
							id: string;
							industry?: string | null;
							name: string;
							phoneNumber?: string | null;
						} | null;
					};
				}> | null;
			}> | null;
		}>;
	} | null;
};

export type SearchWarehousesQueryVariables = Exact<{
	search: Scalars["String"]["input"];
}>;

export type SearchWarehousesQuery = {
	__typename?: "Query";
	wms?: {
		__typename?: "WmsQuery";
		warehouses: Array<{
			__typename?: "Warehouses";
			value: string;
			label: string;
		}>;
	} | null;
};

export class TypedDocumentString<TResult, TVariables>
	extends String
	implements DocumentTypeDecoration<TResult, TVariables>
{
	__apiType?: NonNullable<
		DocumentTypeDecoration<TResult, TVariables>["__apiType"]
	>;
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

export const CreateAccountTransactionDocument = new TypedDocumentString(`
    mutation CreateAccountTransaction($accountTransaction: CreateAccountTransactionInput!) {
  billing {
    createAccountTransaction(value: $accountTransaction) {
      id
      type
      amount
      runningBalance
      sourceRecordId
      sourceRecordType
      description
      referenceNumber
      transactionDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateAccountTransactionMutation,
	CreateAccountTransactionMutationVariables
>;
export const AccountTransactionsDocument = new TypedDocumentString(`
    query AccountTransactions($page: Int, $perPage: Int, $search: String, $type: TransactionType) {
  billing {
    accountTransactions(
      page: $page
      perPage: $perPage
      search: $search
      type: $type
    ) {
      amount
      createdAt
      description
      id
      referenceNumber
      runningBalance
      sourceRecordId
      sourceRecordType
      transactionDate
      type
      processedByUser {
        name
        image
        email
        id
      }
      updatedAt
      clientAccount {
        availableCredit
        paymentTermsDays
        updatedAt
        walletBalance
        createdAt
        client {
          annualRevenue
          id
          industry
          name
          phoneNumber
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	AccountTransactionsQuery,
	AccountTransactionsQueryVariables
>;
export const SearchAccountTransactionsDocument = new TypedDocumentString(`
    query SearchAccountTransactions($search: String!) {
  billing {
    accountTransactions(search: $search, page: 1, perPage: 10) {
      value: id
      label: referenceNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchAccountTransactionsQuery,
	SearchAccountTransactionsQueryVariables
>;
export const AnalyticsAccountTransactionsDocument = new TypedDocumentString(`
    query AnalyticsAccountTransactions($from: Date, $to: Date) {
  billing {
    accountTransactions(from: $from, to: $to) {
      amount
      runningBalance
      type
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsAccountTransactionsQuery,
	AnalyticsAccountTransactionsQueryVariables
>;
export const CreateAccountingSyncLogDocument = new TypedDocumentString(`
    mutation CreateAccountingSyncLog($accountingSyncLog: CreateAccountingSyncLogInput!) {
  billing {
    createAccountingSyncLog(value: $accountingSyncLog) {
      id
      recordId
      recordType
      externalSystem
      externalId
      status
      errorMessage
      requestPayload
      responsePayload
      lastSyncAt
      retryCount
      nextRetryAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateAccountingSyncLogMutation,
	CreateAccountingSyncLogMutationVariables
>;
export const AccountingSyncLogsDocument = new TypedDocumentString(`
    query AccountingSyncLogs($page: Int, $perPage: Int, $search: String, $status: SyncStatus) {
  billing {
    accountingSyncLogs(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
    ) {
      createdAt
      errorMessage
      externalId
      externalSystem
      id
      lastSyncAt
      nextRetryAt
      recordId
      recordType
      requestPayload
      responsePayload
      retryCount
      status
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	AccountingSyncLogsQuery,
	AccountingSyncLogsQueryVariables
>;
export const SearchAccountingSyncLogsDocument = new TypedDocumentString(`
    query SearchAccountingSyncLogs($search: String!) {
  billing {
    accountingSyncLogs(search: $search, page: 1, perPage: 10) {
      value: id
      label: recordType
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchAccountingSyncLogsQuery,
	SearchAccountingSyncLogsQueryVariables
>;
export const AnalyticsAccountingSyncLogsDocument = new TypedDocumentString(`
    query AnalyticsAccountingSyncLogs($from: Date, $to: Date) {
  billing {
    accountingSyncLogs(from: $from, to: $to) {
      status
      retryCount
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsAccountingSyncLogsQuery,
	AnalyticsAccountingSyncLogsQueryVariables
>;
export const CreateClientAccountDocument = new TypedDocumentString(`
    mutation CreateClientAccount($clientAccount: CreateClientAccountInput!) {
  billing {
    createClientAccount(value: $clientAccount) {
      id
      creditLimit
      availableCredit
      walletBalance
      currency
      paymentTermsDays
      isCreditApproved
      lastPaymentDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateClientAccountMutation,
	CreateClientAccountMutationVariables
>;
export const UpdateClientAccountDocument = new TypedDocumentString(`
    mutation UpdateClientAccount($id: ID!, $clientAccount: UpdateClientAccountInput!) {
  billing {
    updateClientAccount(id: $id, value: $clientAccount) {
      id
      creditLimit
      availableCredit
      walletBalance
      currency
      paymentTermsDays
      isCreditApproved
      lastPaymentDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateClientAccountMutation,
	UpdateClientAccountMutationVariables
>;
export const RemoveClientAccountDocument = new TypedDocumentString(`
    mutation RemoveClientAccount($id: ID!) {
  billing {
    removeClientAccount(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveClientAccountMutation,
	RemoveClientAccountMutationVariables
>;
export const TableClientAccountDocument = new TypedDocumentString(`
    query TableClientAccount($page: Int, $perPage: Int, $search: String) {
  billing {
    clientAccounts(page: $page, perPage: $perPage, search: $search) {
      availableCredit
      client {
        annualRevenue
        country
        industry
        name
        phoneNumber
        updatedAt
        website
      }
      creditLimit
      currency
      isCreditApproved
      lastPaymentDate
      paymentTermsDays
      updatedAt
      walletBalance
      id
      transactions {
        amount
        description
        id
        referenceNumber
        runningBalance
        sourceRecordId
        sourceRecordType
        transactionDate
        type
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableClientAccountQuery,
	TableClientAccountQueryVariables
>;
export const SearchClientAccountsDocument = new TypedDocumentString(`
    query SearchClientAccounts($search: String!) {
  billing {
    clientAccounts(search: $search, page: 1, perPage: 10) {
      value: id
      label: currency
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchClientAccountsQuery,
	SearchClientAccountsQueryVariables
>;
export const AnalyticsClientAccountsDocument = new TypedDocumentString(`
    query AnalyticsClientAccounts($from: Date, $to: Date) {
  billing {
    clientAccounts(from: $from, to: $to) {
      creditLimit
      availableCredit
      walletBalance
      paymentTermsDays
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsClientAccountsQuery,
	AnalyticsClientAccountsQueryVariables
>;
export const CreateCreditNoteDocument = new TypedDocumentString(`
    mutation CreateCreditNote($creditNote: CreateCreditNoteInput!) {
  billing {
    createCreditNote(value: $creditNote) {
      id
      creditNoteNumber
      amount
      reason
      issueDate
      appliedAt
      currency
      notes
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateCreditNoteMutation,
	CreateCreditNoteMutationVariables
>;
export const UpdateCreditNoteDocument = new TypedDocumentString(`
    mutation UpdateCreditNote($id: ID!, $creditNote: UpdateCreditNoteInput!) {
  billing {
    updateCreditNote(id: $id, value: $creditNote) {
      id
      creditNoteNumber
      amount
      reason
      issueDate
      appliedAt
      currency
      notes
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateCreditNoteMutation,
	UpdateCreditNoteMutationVariables
>;
export const RemoveCreditNoteDocument = new TypedDocumentString(`
    mutation RemoveCreditNote($id: ID!) {
  billing {
    removeCreditNote(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveCreditNoteMutation,
	RemoveCreditNoteMutationVariables
>;
export const TableCreditNoteDocument = new TypedDocumentString(`
    query TableCreditNote($page: Int, $perPage: Int, $search: String) {
  billing {
    creditNotes(page: $page, perPage: $perPage, search: $search) {
      appliedAt
      amount
      createdAt
      createdByUser {
        email
        id
        image
        name
      }
      creditNoteNumber
      currency
      id
      issueDate
      notes
      reason
      updatedAt
      invoice {
        amountPaid
        invoiceNumber
        issueDate
        paidAt
        notes
        sentAt
        status
        subtotal
        taxAmount
        totalAmount
        updatedAt
        paymentTerms
        discountAmount
        dueDate
        currency
      }
      dispute {
        disputedAmount
        id
        reason
        resolutionNotes
        resolvedAt
        status
        submittedAt
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableCreditNoteQuery,
	TableCreditNoteQueryVariables
>;
export const SearchCreditNotesDocument = new TypedDocumentString(`
    query SearchCreditNotes($search: String!) {
  billing {
    creditNotes(search: $search, page: 1, perPage: 10) {
      value: id
      label: creditNoteNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchCreditNotesQuery,
	SearchCreditNotesQueryVariables
>;
export const AnalyticsCreditNotesDocument = new TypedDocumentString(`
    query AnalyticsCreditNotes($from: Date, $to: Date) {
  billing {
    creditNotes(from: $from, to: $to) {
      amount
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsCreditNotesQuery,
	AnalyticsCreditNotesQueryVariables
>;
export const CreateDisputeDocument = new TypedDocumentString(`
    mutation CreateDispute($dispute: CreateDisputeInput!) {
  billing {
    createDispute(value: $dispute) {
      id
      reason
      status
      disputedAmount
      resolutionNotes
      submittedAt
      resolvedAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateDisputeMutation,
	CreateDisputeMutationVariables
>;
export const UpdateDisputeDocument = new TypedDocumentString(`
    mutation UpdateDispute($id: ID!, $dispute: UpdateDisputeInput!) {
  billing {
    updateDispute(id: $id, value: $dispute) {
      id
      reason
      status
      disputedAmount
      resolutionNotes
      submittedAt
      resolvedAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateDisputeMutation,
	UpdateDisputeMutationVariables
>;
export const TableDisputeDocument = new TypedDocumentString(`
    query TableDispute($page: Int, $perPage: Int, $search: String, $status: DisputeStatus) {
  billing {
    disputes(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      client {
        annualRevenue
        city
        id
        industry
        name
        website
        phoneNumber
      }
      disputedAmount
      id
      reason
      resolutionNotes
      resolvedAt
      status
      submittedAt
      updatedAt
      resolvedByUser {
        email
        id
        image
        name
      }
      lineItem {
        discountAmount
        discountRate
        description
        id
        lineTotal
        quantity
        sourceRecordId
        sourceRecordType
        taxAmount
        taxRate
        totalPrice
        unitPrice
        updatedAt
        invoice {
          amountPaid
          currency
          discountAmount
          dueDate
          id
          invoiceNumber
          issueDate
          notes
          paidAt
          paymentTerms
          sentAt
          status
          subtotal
          taxAmount
          totalAmount
          updatedAt
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableDisputeQuery,
	TableDisputeQueryVariables
>;
export const SearchDisputesDocument = new TypedDocumentString(`
    query SearchDisputes($search: String!) {
  billing {
    disputes(search: $search, page: 1, perPage: 10) {
      value: id
      label: reason
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchDisputesQuery,
	SearchDisputesQueryVariables
>;
export const AnalyticsDisputesDocument = new TypedDocumentString(`
    query AnalyticsDisputes($from: Date, $to: Date) {
  billing {
    disputes(from: $from, to: $to) {
      disputedAmount
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsDisputesQuery,
	AnalyticsDisputesQueryVariables
>;
export const CreateDocumentDocument = new TypedDocumentString(`
    mutation CreateDocument($document: CreateDocumentInput!) {
  billing {
    createDocument(value: $document) {
      id
      recordId
      recordType
      documentType
      filePath
      fileName
      fileSize
      mimeType
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateDocumentMutation,
	CreateDocumentMutationVariables
>;
export const UpdateDocumentDocument = new TypedDocumentString(`
    mutation UpdateDocument($id: ID!, $document: UpdateDocumentInput!) {
  billing {
    updateDocument(id: $id, value: $document) {
      id
      recordId
      recordType
      documentType
      filePath
      fileName
      fileSize
      mimeType
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateDocumentMutation,
	UpdateDocumentMutationVariables
>;
export const RemoveDocumentDocument = new TypedDocumentString(`
    mutation RemoveDocument($id: ID!) {
  billing {
    removeDocument(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveDocumentMutation,
	RemoveDocumentMutationVariables
>;
export const TableDocumentDocument = new TypedDocumentString(`
    query TableDocument($page: Int, $perPage: Int, $from: Date, $to: Date) {
  billing {
    documents(page: $page, perPage: $perPage, from: $from, to: $to) {
      id
      recordId
      recordType
      documentType
      filePath
      fileName
      fileSize
      mimeType
      createdAt
      updatedAt
      uploadedByUser {
        id
        email
        name
        image
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableDocumentQuery,
	TableDocumentQueryVariables
>;
export const FindDocumentDocument = new TypedDocumentString(`
    query FindDocument($id: ID!) {
  billing {
    document(id: $id) {
      id
      recordId
      recordType
      documentType
      filePath
      fileName
      fileSize
      mimeType
      createdAt
      updatedAt
      uploadedByUser {
        id
        email
        name
        image
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	FindDocumentQuery,
	FindDocumentQueryVariables
>;
export const SearchDocumentsDocument = new TypedDocumentString(`
    query SearchDocuments($from: Date, $to: Date) {
  billing {
    documents(from: $from, to: $to, page: 1, perPage: 10) {
      value: id
      label: fileName
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchDocumentsQuery,
	SearchDocumentsQueryVariables
>;
export const AnalyticsDocumentsDocument = new TypedDocumentString(`
    query AnalyticsDocuments($from: Date, $to: Date) {
  billing {
    documents(from: $from, to: $to) {
      id
      documentType
      fileSize
      createdAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsDocumentsQuery,
	AnalyticsDocumentsQueryVariables
>;
export const UpdateInvoiceLineItemDocument = new TypedDocumentString(`
    mutation UpdateInvoiceLineItem($id: ID!, $invoiceLineItem: UpdateInvoiceLineItemInput!) {
  billing {
    updateInvoiceLineItem(id: $id, value: $invoiceLineItem) {
      id
      sourceRecordId
      sourceRecordType
      description
      quantity
      unitPrice
      totalPrice
      taxRate
      taxAmount
      discountRate
      discountAmount
      lineTotal
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateInvoiceLineItemMutation,
	UpdateInvoiceLineItemMutationVariables
>;
export const RemoveInvoiceLineItemDocument = new TypedDocumentString(`
    mutation RemoveInvoiceLineItem($id: ID!) {
  billing {
    removeInvoiceLineItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveInvoiceLineItemMutation,
	RemoveInvoiceLineItemMutationVariables
>;
export const CreateBillingInvoiceDocument = new TypedDocumentString(`
    mutation CreateBillingInvoice($billingInvoice: CreateBillingInvoiceInput!) {
  billing {
    createBillingInvoice(value: $billingInvoice) {
      id
      invoiceNumber
      status
      issueDate
      dueDate
      totalAmount
      amountPaid
      amountOutstanding
      currency
      taxAmount
      discountAmount
      subtotal
      paymentTerms
      notes
      sentAt
      paidAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateBillingInvoiceMutation,
	CreateBillingInvoiceMutationVariables
>;
export const UpdateBillingInvoiceDocument = new TypedDocumentString(`
    mutation UpdateBillingInvoice($id: ID!, $billingInvoice: UpdateBillingInvoiceInput!) {
  billing {
    updateBillingInvoice(id: $id, value: $billingInvoice) {
      id
      invoiceNumber
      status
      issueDate
      dueDate
      totalAmount
      amountPaid
      amountOutstanding
      currency
      taxAmount
      discountAmount
      subtotal
      paymentTerms
      notes
      sentAt
      paidAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateBillingInvoiceMutation,
	UpdateBillingInvoiceMutationVariables
>;
export const RemoveBillingInvoiceDocument = new TypedDocumentString(`
    mutation RemoveBillingInvoice($id: ID!) {
  billing {
    removeBillingInvoice(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveBillingInvoiceMutation,
	RemoveBillingInvoiceMutationVariables
>;
export const TableBillingInvoiceDocument = new TypedDocumentString(`
    query TableBillingInvoice($page: Int, $perPage: Int, $search: String, $status: BillingInvoiceStatus) {
  billing {
    billingInvoices(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
    ) {
      amountOutstanding
      amountPaid
      createdAt
      currency
      discountAmount
      dueDate
      id
      invoiceNumber
      issueDate
      notes
      paidAt
      paymentTerms
      sentAt
      status
      subtotal
      taxAmount
      totalAmount
      updatedAt
      lineItems {
        description
        discountAmount
        discountRate
        id
        quantity
        taxAmount
        lineTotal
        sourceRecordId
        sourceRecordType
        taxRate
        totalPrice
        unitPrice
        updatedAt
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableBillingInvoiceQuery,
	TableBillingInvoiceQueryVariables
>;
export const SearchBillingInvoicesDocument = new TypedDocumentString(`
    query SearchBillingInvoices($search: String!) {
  billing {
    billingInvoices(search: $search, page: 1, perPage: 10) {
      value: id
      label: invoiceNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchBillingInvoicesQuery,
	SearchBillingInvoicesQueryVariables
>;
export const AnalyticsBillingInvoicesDocument = new TypedDocumentString(`
    query AnalyticsBillingInvoices($from: Date, $to: Date) {
  billing {
    billingInvoices(from: $from, to: $to) {
      totalAmount
      amountPaid
      amountOutstanding
      taxAmount
      discountAmount
      subtotal
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsBillingInvoicesQuery,
	AnalyticsBillingInvoicesQueryVariables
>;
export const CreatePaymentDocument = new TypedDocumentString(`
    mutation CreatePayment($payment: CreatePaymentInput!) {
  billing {
    createPayment(value: $payment) {
      id
      amount
      paymentMethod
      transactionId
      gatewayReference
      status
      paymentDate
      processedAt
      currency
      exchangeRate
      fees
      netAmount
      notes
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreatePaymentMutation,
	CreatePaymentMutationVariables
>;
export const UpdatePaymentDocument = new TypedDocumentString(`
    mutation UpdatePayment($id: ID!, $payment: UpdatePaymentInput!) {
  billing {
    updatePayment(id: $id, value: $payment) {
      id
      amount
      paymentMethod
      transactionId
      gatewayReference
      status
      paymentDate
      processedAt
      currency
      exchangeRate
      fees
      netAmount
      notes
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdatePaymentMutation,
	UpdatePaymentMutationVariables
>;
export const RemovePaymentDocument = new TypedDocumentString(`
    mutation RemovePayment($id: ID!) {
  billing {
    removePayment(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemovePaymentMutation,
	RemovePaymentMutationVariables
>;
export const TablePaymentDocument = new TypedDocumentString(`
    query TablePayment($page: Int, $paymentMethod: PaymentMethod, $perPage: Int, $search: String, $status: PaymentStatus) {
  billing {
    payments(
      page: $page
      paymentMethod: $paymentMethod
      perPage: $perPage
      search: $search
      status: $status
    ) {
      amount
      createdAt
      currency
      exchangeRate
      fees
      gatewayReference
      id
      invoice {
        invoiceNumber
        id
        issueDate
        paidAt
        paymentTerms
        sentAt
        status
        discountAmount
        amountPaid
        amountOutstanding
      }
      processedByUser {
        email
        id
        image
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TablePaymentQuery,
	TablePaymentQueryVariables
>;
export const SearchPaymentsDocument = new TypedDocumentString(`
    query SearchPayments($search: String!) {
  billing {
    payments(search: $search, page: 1, perPage: 10) {
      value: id
      label: transactionId
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchPaymentsQuery,
	SearchPaymentsQueryVariables
>;
export const AnalyticsPaymentsDocument = new TypedDocumentString(`
    query AnalyticsPayments($from: Date, $to: Date) {
  billing {
    payments(from: $from, to: $to) {
      amount
      exchangeRate
      fees
      netAmount
      paymentMethod
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsPaymentsQuery,
	AnalyticsPaymentsQueryVariables
>;
export const CreateQuoteDocument = new TypedDocumentString(`
    mutation CreateQuote($quote: CreateQuoteInput!) {
  billing {
    createQuote(value: $quote) {
      id
      originDetails
      destinationDetails
      weight
      length
      width
      height
      volume
      quotedPrice
      serviceLevel
      expiresAt
      status
      quoteNumber
      notes
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateQuoteMutation,
	CreateQuoteMutationVariables
>;
export const UpdateQuoteDocument = new TypedDocumentString(`
    mutation UpdateQuote($id: ID!, $quote: UpdateQuoteInput!) {
  billing {
    updateQuote(id: $id, value: $quote) {
      id
      originDetails
      destinationDetails
      weight
      length
      width
      height
      volume
      quotedPrice
      serviceLevel
      expiresAt
      status
      quoteNumber
      notes
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateQuoteMutation,
	UpdateQuoteMutationVariables
>;
export const RemoveQuoteDocument = new TypedDocumentString(`
    mutation RemoveQuote($id: ID!) {
  billing {
    removeQuote(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveQuoteMutation,
	RemoveQuoteMutationVariables
>;
export const TableQuoteDocument = new TypedDocumentString(`
    query TableQuote($page: Int, $perPage: Int, $search: String, $status: QuoteStatus) {
  billing {
    quotes(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      destinationDetails
      expiresAt
      height
      id
      length
      notes
      originDetails
      quoteNumber
      quotedPrice
      serviceLevel
      status
      updatedAt
      volume
      weight
      width
      createdByUser {
        email
        id
        image
        name
      }
      client {
        city
        country
        id
        industry
        name
        phoneNumber
        website
        billingInvoices {
          amountOutstanding
          amountPaid
          currency
          discountAmount
          dueDate
          invoiceNumber
          issueDate
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableQuoteQuery,
	TableQuoteQueryVariables
>;
export const SearchQuotesDocument = new TypedDocumentString(`
    query SearchQuotes($search: String!) {
  billing {
    quotes(search: $search, page: 1, perPage: 10) {
      value: id
      label: quoteNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchQuotesQuery,
	SearchQuotesQueryVariables
>;
export const AnalyticsQuotesDocument = new TypedDocumentString(`
    query AnalyticsQuotes($from: Date, $to: Date) {
  billing {
    quotes(from: $from, to: $to) {
      weight
      length
      width
      height
      volume
      quotedPrice
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsQuotesQuery,
	AnalyticsQuotesQueryVariables
>;
export const CreateRateCardDocument = new TypedDocumentString(`
    mutation CreateRateCard($rateCard: CreateRateCardInput!) {
  billing {
    createRateCard(value: $rateCard) {
      id
      name
      serviceType
      isActive
      validFrom
      validTo
      description
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateRateCardMutation,
	CreateRateCardMutationVariables
>;
export const UpdateRateCardDocument = new TypedDocumentString(`
    mutation UpdateRateCard($id: ID!, $rateCard: UpdateRateCardInput!) {
  billing {
    updateRateCard(id: $id, value: $rateCard) {
      id
      name
      serviceType
      isActive
      validFrom
      validTo
      description
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateRateCardMutation,
	UpdateRateCardMutationVariables
>;
export const RemoveRateCardDocument = new TypedDocumentString(`
    mutation RemoveRateCard($id: ID!) {
  billing {
    removeRateCard(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveRateCardMutation,
	RemoveRateCardMutationVariables
>;
export const TableRateCardDocument = new TypedDocumentString(`
    query TableRateCard($page: Int, $perPage: Int, $search: String, $serviceType: ServiceType) {
  billing {
    rateCards(
      page: $page
      perPage: $perPage
      search: $search
      serviceType: $serviceType
    ) {
      createdAt
      description
      id
      isActive
      name
      serviceType
      updatedAt
      validFrom
      validTo
      createdByUser {
        email
        emailVerified
        image
        name
      }
      rules {
        condition
        id
        isActive
        maxValue
        minValue
        price
        pricingModel
        priority
        value
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableRateCardQuery,
	TableRateCardQueryVariables
>;
export const SearchRateCardsDocument = new TypedDocumentString(`
    query SearchRateCards($search: String!) {
  billing {
    rateCards(search: $search, page: 1, perPage: 10) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchRateCardsQuery,
	SearchRateCardsQueryVariables
>;
export const AnalyticsRateCardsDocument = new TypedDocumentString(`
    query AnalyticsRateCards($from: Date, $to: Date) {
  billing {
    rateCards(from: $from, to: $to) {
      serviceType
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsRateCardsQuery,
	AnalyticsRateCardsQueryVariables
>;
export const CreateRateRuleDocument = new TypedDocumentString(`
    mutation CreateRateRule($rateRule: CreateRateRuleInput!) {
  billing {
    createRateRule(value: $rateRule) {
      id
      condition
      value
      price
      pricingModel
      minValue
      maxValue
      priority
      isActive
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateRateRuleMutation,
	CreateRateRuleMutationVariables
>;
export const UpdateRateRuleDocument = new TypedDocumentString(`
    mutation UpdateRateRule($id: ID!, $rateRule: UpdateRateRuleInput!) {
  billing {
    updateRateRule(id: $id, value: $rateRule) {
      id
      condition
      value
      price
      pricingModel
      minValue
      maxValue
      priority
      isActive
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateRateRuleMutation,
	UpdateRateRuleMutationVariables
>;
export const RemoveRateRuleDocument = new TypedDocumentString(`
    mutation RemoveRateRule($id: ID!) {
  billing {
    removeRateRule(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveRateRuleMutation,
	RemoveRateRuleMutationVariables
>;
export const TableRateRuleDocument = new TypedDocumentString(`
    query TableRateRule($page: Int, $perPage: Int, $pricingModel: PricingModel, $search: String) {
  billing {
    rateRules(
      page: $page
      perPage: $perPage
      pricingModel: $pricingModel
      search: $search
    ) {
      condition
      createdAt
      id
      isActive
      maxValue
      minValue
      price
      pricingModel
      priority
      updatedAt
      value
      rateCard {
        createdAt
        createdByUser {
          email
          id
          image
          name
        }
        description
        id
        isActive
        name
        serviceType
        updatedAt
        validFrom
        validTo
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableRateRuleQuery,
	TableRateRuleQueryVariables
>;
export const SearchRateRulesDocument = new TypedDocumentString(`
    query SearchRateRules($search: String!) {
  billing {
    rateRules(search: $search, page: 1, perPage: 10) {
      value: id
      label: condition
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchRateRulesQuery,
	SearchRateRulesQueryVariables
>;
export const AnalyticsRateRulesDocument = new TypedDocumentString(`
    query AnalyticsRateRules($from: Date, $to: Date) {
  billing {
    rateRules(from: $from, to: $to) {
      price
      minValue
      maxValue
      priority
      pricingModel
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsRateRulesQuery,
	AnalyticsRateRulesQueryVariables
>;
export const CreateSurchargeDocument = new TypedDocumentString(`
    mutation CreateSurcharge($surcharge: CreateSurchargeInput!) {
  billing {
    createSurcharge(value: $surcharge) {
      id
      name
      type
      amount
      calculationMethod
      isActive
      validFrom
      validTo
      description
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateSurchargeMutation,
	CreateSurchargeMutationVariables
>;
export const UpdateSurchargeDocument = new TypedDocumentString(`
    mutation UpdateSurcharge($id: ID!, $surcharge: UpdateSurchargeInput!) {
  billing {
    updateSurcharge(id: $id, value: $surcharge) {
      id
      name
      type
      amount
      calculationMethod
      isActive
      validFrom
      validTo
      description
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateSurchargeMutation,
	UpdateSurchargeMutationVariables
>;
export const RemoveSurchargeDocument = new TypedDocumentString(`
    mutation RemoveSurcharge($id: ID!) {
  billing {
    removeSurcharge(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveSurchargeMutation,
	RemoveSurchargeMutationVariables
>;
export const TableSurchargeDocument = new TypedDocumentString(`
    query TableSurcharge($page: Int, $perPage: Int, $search: String, $calculationMethod: SurchargeCalculationMethod) {
  billing {
    surcharges(
      page: $page
      perPage: $perPage
      search: $search
      calculationMethod: $calculationMethod
    ) {
      amount
      calculationMethod
      createdAt
      description
      id
      isActive
      name
      type
      updatedAt
      validFrom
      validTo
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableSurchargeQuery,
	TableSurchargeQueryVariables
>;
export const SearchSurchargesDocument = new TypedDocumentString(`
    query SearchSurcharges($search: String!) {
  billing {
    surcharges(search: $search, page: 1, perPage: 10) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchSurchargesQuery,
	SearchSurchargesQueryVariables
>;
export const AnalyticsSurchargesDocument = new TypedDocumentString(`
    query AnalyticsSurcharges($from: Date, $to: Date) {
  billing {
    surcharges(from: $from, to: $to) {
      amount
      calculationMethod
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsSurchargesQuery,
	AnalyticsSurchargesQueryVariables
>;
export const CreateAttachmentDocument = new TypedDocumentString(`
    mutation CreateAttachment($attachment: CreateAttachmentInput!) {
  crm {
    createAttachment(value: $attachment) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateAttachmentMutation,
	CreateAttachmentMutationVariables
>;
export const RemoveAttachmentDocument = new TypedDocumentString(`
    mutation RemoveAttachment($id: ID!) {
  crm {
    removeAttachment(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveAttachmentMutation,
	RemoveAttachmentMutationVariables
>;
export const TableAttachmentDocument = new TypedDocumentString(`
    query TableAttachment($page: Int, $perPage: Int, $from: Date, $to: Date, $search: String) {
  crm {
    attachments(
      page: $page
      perPage: $perPage
      from: $from
      to: $to
      search: $search
    ) {
      id
      fileName
      filePath
      mimeType
      recordId
      recordType
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableAttachmentQuery,
	TableAttachmentQueryVariables
>;
export const FindAttachmentDocument = new TypedDocumentString(`
    query FindAttachment($id: ID!) {
  crm {
    attachment(id: $id) {
      id
      fileName
      filePath
      mimeType
      recordId
      recordType
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	FindAttachmentQuery,
	FindAttachmentQueryVariables
>;
export const SearchAttachmentsDocument = new TypedDocumentString(`
    query SearchAttachments($search: String!) {
  crm {
    attachments(page: 1, perPage: 10, search: $search) {
      value: id
      label: fileName
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchAttachmentsQuery,
	SearchAttachmentsQueryVariables
>;
export const AnalyticsAttachmentsDocument = new TypedDocumentString(`
    query AnalyticsAttachments($from: Date, $to: Date) {
  crm {
    attachments(from: $from, to: $to) {
      id
      mimeType
      recordType
      createdAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsAttachmentsQuery,
	AnalyticsAttachmentsQueryVariables
>;
export const CreateCampaignDocument = new TypedDocumentString(`
    mutation CreateCampaign($campaign: CreateCampaignInput!) {
  crm {
    createCampaign(value: $campaign) {
      id
      name
      startDate
      endDate
      budget
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateCampaignMutation,
	CreateCampaignMutationVariables
>;
export const UpdateCampaignDocument = new TypedDocumentString(`
    mutation UpdateCampaign($id: ID!, $campaign: UpdateCampaignInput!) {
  crm {
    updateCampaign(id: $id, value: $campaign) {
      id
      name
      budget
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateCampaignMutation,
	UpdateCampaignMutationVariables
>;
export const RemoveCampaignDocument = new TypedDocumentString(`
    mutation RemoveCampaign($id: ID!) {
  crm {
    removeCampaign(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveCampaignMutation,
	RemoveCampaignMutationVariables
>;
export const TableCampaignDocument = new TypedDocumentString(`
    query TableCampaign($page: Int, $perPage: Int, $search: String) {
  crm {
    campaigns(page: $page, perPage: $perPage, search: $search) {
      budget
      createdAt
      endDate
      id
      name
      startDate
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableCampaignQuery,
	TableCampaignQueryVariables
>;
export const SearchCampaignsDocument = new TypedDocumentString(`
    query SearchCampaigns($search: String!) {
  crm {
    campaigns(page: 1, perPage: 10, search: $search) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchCampaignsQuery,
	SearchCampaignsQueryVariables
>;
export const AnalyticsCampaignsDocument = new TypedDocumentString(`
    query AnalyticsCampaigns($from: Date, $to: Date) {
  crm {
    campaigns(from: $from, to: $to) {
      budget
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsCampaignsQuery,
	AnalyticsCampaignsQueryVariables
>;
export const CreateCaseDocument = new TypedDocumentString(`
    mutation CreateCase($case: CreateCaseInput!) {
  crm {
    createCase(value: $case) {
      id
      caseNumber
      type
      status
      priority
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateCaseMutation,
	CreateCaseMutationVariables
>;
export const UpdateCaseDocument = new TypedDocumentString(`
    mutation UpdateCase($id: ID!, $case: UpdateCaseInput!) {
  crm {
    updateCase(id: $id, value: $case) {
      id
      caseNumber
      type
      status
      priority
      updatedAt
      description
      contact {
        id
        name
        email
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateCaseMutation,
	UpdateCaseMutationVariables
>;
export const RemoveCaseDocument = new TypedDocumentString(`
    mutation RemoveCase($id: ID!) {
  crm {
    removeCase(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveCaseMutation,
	RemoveCaseMutationVariables
>;
export const TableCaseDocument = new TypedDocumentString(`
    query TableCase($page: Int, $perPage: Int, $priority: CasePriority, $status: CaseStatus, $type: CaseType) {
  crm {
    cases(
      perPage: $perPage
      page: $page
      priority: $priority
      status: $status
      type: $type
    ) {
      caseNumber
      createdAt
      description
      id
      priority
      status
      type
      updatedAt
      contact {
        id
        email
        name
        phoneNumber
        jobTitle
      }
      owner {
        id
        email
        image
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableCaseQuery,
	TableCaseQueryVariables
>;
export const SearchCasesDocument = new TypedDocumentString(`
    query SearchCases($search: String!) {
  crm {
    cases(page: 1, perPage: 10, search: $search) {
      value: id
      label: caseNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchCasesQuery,
	SearchCasesQueryVariables
>;
export const AnalyticsCasesDocument = new TypedDocumentString(`
    query AnalyticsCases($from: Date, $to: Date) {
  crm {
    cases(from: $from, to: $to) {
      status
      priority
      type
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsCasesQuery,
	AnalyticsCasesQueryVariables
>;
export const CreateCompanyDocument = new TypedDocumentString(`
    mutation CreateCompany($company: CreateCompanyInput!) {
  crm {
    createCompany(value: $company) {
      id
      name
      industry
      phoneNumber
      website
      annualRevenue
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateCompanyMutation,
	CreateCompanyMutationVariables
>;
export const UpdateCompanyDocument = new TypedDocumentString(`
    mutation UpdateCompany($id: ID!, $company: UpdateCompanyInput!) {
  crm {
    updateCompany(id: $id, value: $company) {
      id
      name
      industry
      phoneNumber
      website
      annualRevenue
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateCompanyMutation,
	UpdateCompanyMutationVariables
>;
export const RemoveCompanyDocument = new TypedDocumentString(`
    mutation RemoveCompany($id: ID!) {
  crm {
    removeCompany(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveCompanyMutation,
	RemoveCompanyMutationVariables
>;
export const TableCompanyQueryDocument = new TypedDocumentString(`
    query TableCompanyQuery($page: Int, $perPage: Int, $search: String) {
  crm {
    companies(page: $page, perPage: $perPage, search: $search) {
      name
      owner {
        email
        image
        name
      }
      annualRevenue
      phoneNumber
      postalCode
      state
      street
      updatedAt
      website
      city
      clientAccount {
        walletBalance
        creditLimit
        currency
      }
      country
      createdAt
      id
      industry
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableCompanyQueryQuery,
	TableCompanyQueryQueryVariables
>;
export const SearchCompaniesDocument = new TypedDocumentString(`
    query SearchCompanies($search: String!) {
  crm {
    companies(page: 1, perPage: 10, search: $search) {
      value: id
      label: name
      id
      name
      industry
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchCompaniesQuery,
	SearchCompaniesQueryVariables
>;
export const AnalyticsCompaniesDocument = new TypedDocumentString(`
    query AnalyticsCompanies($from: Date, $to: Date) {
  crm {
    companies(from: $from, to: $to) {
      id
      annualRevenue
      industry
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsCompaniesQuery,
	AnalyticsCompaniesQueryVariables
>;
export const CreateContactDocument = new TypedDocumentString(`
    mutation CreateContact($contact: CreateContactInput!) {
  crm {
    createContact(value: $contact) {
      id
      name
      email
      phoneNumber
      jobTitle
      createdAt
      updatedAt
      company {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateContactMutation,
	CreateContactMutationVariables
>;
export const UpdateContactDocument = new TypedDocumentString(`
    mutation UpdateContact($id: ID!, $contact: UpdateContactInput!) {
  crm {
    updateContact(id: $id, value: $contact) {
      id
      name
      email
      phoneNumber
      jobTitle
      updatedAt
      company {
        id
        name
      }
      owner {
        id
        email
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateContactMutation,
	UpdateContactMutationVariables
>;
export const RemoveContactDocument = new TypedDocumentString(`
    mutation RemoveContact($id: ID!) {
  crm {
    removeContact(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveContactMutation,
	RemoveContactMutationVariables
>;
export const TableContactDocument = new TypedDocumentString(`
    query TableContact($page: Int, $perPage: Int, $search: String) {
  crm {
    contacts(page: $page, perPage: $perPage, search: $search) {
      createdAt
      email
      id
      jobTitle
      name
      phoneNumber
      updatedAt
      owner {
        id
        email
        image
        name
      }
      company {
        id
        phoneNumber
        name
        industry
        website
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableContactQuery,
	TableContactQueryVariables
>;
export const SearchContactsDocument = new TypedDocumentString(`
    query SearchContacts($search: String!) {
  crm {
    contacts(page: 1, perPage: 10, search: $search) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchContactsQuery,
	SearchContactsQueryVariables
>;
export const CreateInteractionDocument = new TypedDocumentString(`
    mutation CreateInteraction($interaction: CreateInteractionInput!) {
  crm {
    createInteraction(value: $interaction) {
      id
      type
      notes
      outcome
      interactionDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateInteractionMutation,
	CreateInteractionMutationVariables
>;
export const UpdateInteractionDocument = new TypedDocumentString(`
    mutation UpdateInteraction($id: ID!, $interaction: UpdateInteractionInput!) {
  crm {
    updateInteraction(id: $id, value: $interaction) {
      id
      type
      notes
      outcome
      interactionDate
      updatedAt
      contact {
        id
        name
        email
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateInteractionMutation,
	UpdateInteractionMutationVariables
>;
export const RemoveInteractionDocument = new TypedDocumentString(`
    mutation RemoveInteraction($id: ID!) {
  crm {
    removeInteraction(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveInteractionMutation,
	RemoveInteractionMutationVariables
>;
export const SearchInteractionsDocument = new TypedDocumentString(`
    query SearchInteractions($search: String!) {
  crm {
    interactions(page: 1, perPage: 10, search: $search) {
      value: id
      label: outcome
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchInteractionsQuery,
	SearchInteractionsQueryVariables
>;
export const TableInteractionDocument = new TypedDocumentString(`
    query TableInteraction($page: Int, $perPage: Int, $interactionType: InteractionType, $search: String) {
  crm {
    interactions(
      interactionType: $interactionType
      page: $page
      perPage: $perPage
      search: $search
    ) {
      createdAt
      id
      interactionDate
      notes
      outcome
      type
      updatedAt
      user {
        id
        email
        image
        name
      }
      case {
        id
        caseNumber
        priority
        status
        type
      }
      contact {
        id
        name
        email
        jobTitle
        phoneNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableInteractionQuery,
	TableInteractionQueryVariables
>;
export const AnalyticsInteractionsDocument = new TypedDocumentString(`
    query AnalyticsInteractions($from: Date, $to: Date) {
  crm {
    interactions(from: $from, to: $to) {
      type
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsInteractionsQuery,
	AnalyticsInteractionsQueryVariables
>;
export const AddInvoiceItemDocument = new TypedDocumentString(`
    mutation AddInvoiceItem($id: ID!, $invoiceItem: AddInvoiceItemInput!) {
  crm {
    addInvoiceItem(id: $id, value: $invoiceItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<
	AddInvoiceItemMutation,
	AddInvoiceItemMutationVariables
>;
export const UpdateInvoiceItemDocument = new TypedDocumentString(`
    mutation UpdateInvoiceItem($id: ID!, $invoiceItem: UpdateInvoiceItemInput!) {
  crm {
    updateInvoiceItem(id: $id, value: $invoiceItem) {
      id
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateInvoiceItemMutation,
	UpdateInvoiceItemMutationVariables
>;
export const RemoveInvoiceItemDocument = new TypedDocumentString(`
    mutation RemoveInvoiceItem($id: ID!) {
  crm {
    removeInvoiceItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveInvoiceItemMutation,
	RemoveInvoiceItemMutationVariables
>;
export const CreateInvoiceDocument = new TypedDocumentString(`
    mutation CreateInvoice($invoice: CreateInvoiceInput!) {
  crm {
    createInvoice(value: $invoice) {
      id
      issueDate
      dueDate
      total
      status
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateInvoiceMutation,
	CreateInvoiceMutationVariables
>;
export const UpdateInvoiceDocument = new TypedDocumentString(`
    mutation UpdateInvoice($id: ID!, $invoice: UpdateInvoiceInput!) {
  crm {
    updateInvoice(id: $id, value: $invoice) {
      id
      issueDate
      dueDate
      total
      status
      sentAt
      paidAt
      updatedAt
      items {
        id
        quantity
        price
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateInvoiceMutation,
	UpdateInvoiceMutationVariables
>;
export const TableInvoiceDocument = new TypedDocumentString(`
    query TableInvoice($page: Int, $perPage: Int, $paymentMethod: CrmInvoicePaymentMethod, $status: InvoiceStatus, $search: String) {
  crm {
    invoices(
      page: $page
      paymentMethod: $paymentMethod
      perPage: $perPage
      search: $search
      status: $status
    ) {
      createdAt
      dueDate
      id
      issueDate
      paidAt
      paymentMethod
      sentAt
      status
      total
      updatedAt
      items {
        price
        quantity
        updatedAt
        id
        createdAt
        product {
          name
          price
          type
          sku
          id
          description
        }
      }
      opportunity {
        name
        stage
        id
        expectedCloseDate
        dealValue
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableInvoiceQuery,
	TableInvoiceQueryVariables
>;
export const SearchInvoicesDocument = new TypedDocumentString(`
    query SearchInvoices($search: String!) {
  crm {
    invoices(page: 1, perPage: 10, search: $search) {
      value: id
      label: id
      total
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchInvoicesQuery,
	SearchInvoicesQueryVariables
>;
export const AnalyticsInvoicesDocument = new TypedDocumentString(`
    query AnalyticsInvoices($from: Date, $to: Date) {
  crm {
    invoices(from: $from, to: $to) {
      total
      status
      paymentMethod
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsInvoicesQuery,
	AnalyticsInvoicesQueryVariables
>;
export const CreateLeadDocument = new TypedDocumentString(`
    mutation CreateLead($lead: CreateLeadInput!) {
  crm {
    createLead(value: $lead) {
      id
      name
      email
      leadSource
      status
      leadScore
      createdAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateLeadMutation,
	CreateLeadMutationVariables
>;
export const UpdateLeadDocument = new TypedDocumentString(`
    mutation UpdateLead($id: ID!, $lead: UpdateLeadInput!) {
  crm {
    updateLead(id: $id, value: $lead) {
      id
      name
      email
      leadSource
      status
      leadScore
      updatedAt
      owner {
        id
        email
        image
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateLeadMutation,
	UpdateLeadMutationVariables
>;
export const RemoveLeadDocument = new TypedDocumentString(`
    mutation RemoveLead($id: ID!) {
  crm {
    removeLead(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveLeadMutation,
	RemoveLeadMutationVariables
>;
export const TableLeadDocument = new TypedDocumentString(`
    query TableLead($page: Int, $perPage: Int, $search: String, $status: LeadStatus, $source: LeadSource, $from: Date, $to: Date) {
  crm {
    leads(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
      leadSource: $source
      from: $from
      to: $to
    ) {
      convertedAt
      createdAt
      email
      leadScore
      leadSource
      name
      id
      status
      updatedAt
      owner {
        id
        email
        image
        name
      }
      campaign {
        name
        endDate
        startDate
        budget
        id
      }
      convertedCompany {
        name
        industry
        phoneNumber
        website
        id
      }
      convertedContact {
        email
        id
        jobTitle
        name
        phoneNumber
        updatedAt
        company {
          name
          industry
          id
        }
      }
      convertedOpportunity {
        name
        dealValue
        source
        stage
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableLeadQuery,
	TableLeadQueryVariables
>;
export const SearchLeadsDocument = new TypedDocumentString(`
    query SearchLeads($search: String!, $status: LeadStatus, $source: LeadSource) {
  crm {
    leads(
      page: 1
      perPage: 10
      search: $search
      status: $status
      leadSource: $source
    ) {
      value: id
      label: name
      id
      name
      email
      status
      leadSource
      createdAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchLeadsQuery,
	SearchLeadsQueryVariables
>;
export const AnalyticsLeadsDocument = new TypedDocumentString(`
    query AnalyticsLeads($from: Date, $to: Date) {
  crm {
    leads(from: $from, to: $to) {
      id
      leadScore
      status
      leadSource
      createdAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsLeadsQuery,
	AnalyticsLeadsQueryVariables
>;
export const CreateNotificationDocument = new TypedDocumentString(`
    mutation CreateNotification($notification: CreateNotificationInput!) {
  crm {
    createNotification(value: $notification) {
      id
      message
      link
      isRead
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateNotificationMutation,
	CreateNotificationMutationVariables
>;
export const UpdateNotificationDocument = new TypedDocumentString(`
    mutation UpdateNotification($id: ID!, $notification: UpdateNotificationInput!) {
  crm {
    updateNotification(id: $id, value: $notification) {
      id
      isRead
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateNotificationMutation,
	UpdateNotificationMutationVariables
>;
export const TableNotificationDocument = new TypedDocumentString(`
    query TableNotification($page: Int, $perPage: Int, $search: String) {
  crm {
    notifications(page: $page, perPage: $perPage, search: $search) {
      createdAt
      id
      isRead
      link
      message
      updatedAt
      user {
        email
        id
        image
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableNotificationQuery,
	TableNotificationQueryVariables
>;
export const SearchNotificationsDocument = new TypedDocumentString(`
    query SearchNotifications($search: String!) {
  crm {
    notifications(page: 1, perPage: 10, search: $search) {
      value: id
      label: message
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchNotificationsQuery,
	SearchNotificationsQueryVariables
>;
export const CreateOpportunityDocument = new TypedDocumentString(`
    mutation CreateOpportunity($opportunity: CreateOpportunityInput!) {
  crm {
    createOpportunity(value: $opportunity) {
      id
      name
      dealValue
      stage
      probability
      expectedCloseDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateOpportunityMutation,
	CreateOpportunityMutationVariables
>;
export const UpdateOpportunityDocument = new TypedDocumentString(`
    mutation UpdateOpportunity($id: ID!, $opportunity: UpdateOpportunityInput!) {
  crm {
    updateOpportunity(id: $id, value: $opportunity) {
      id
      name
      dealValue
      stage
      probability
      expectedCloseDate
      updatedAt
      company {
        id
        name
      }
      contact {
        id
        name
        email
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateOpportunityMutation,
	UpdateOpportunityMutationVariables
>;
export const TableOpportunityDocument = new TypedDocumentString(`
    query TableOpportunity($page: Int, $perPage: Int, $search: String, $source: OpportunitySource, $stage: OpportunityStage) {
  crm {
    opportunities(
      page: $page
      perPage: $perPage
      search: $search
      source: $source
      stage: $stage
    ) {
      createdAt
      dealValue
      expectedCloseDate
      id
      lostReason
      name
      probability
      source
      stage
      updatedAt
      company {
        name
        industry
        id
        country
        phoneNumber
      }
      contact {
        email
        id
        jobTitle
        name
        phoneNumber
        updatedAt
        company {
          name
          phoneNumber
          industry
          country
        }
      }
      owner {
        email
        id
        image
        name
      }
      products {
        quantity
        product {
          id
          name
          price
          sku
          type
          description
        }
      }
      campaign {
        name
        budget
        endDate
        startDate
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableOpportunityQuery,
	TableOpportunityQueryVariables
>;
export const SearchOpportunitiesDocument = new TypedDocumentString(`
    query SearchOpportunities($search: String!) {
  crm {
    opportunities(page: 1, perPage: 10, search: $search) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchOpportunitiesQuery,
	SearchOpportunitiesQueryVariables
>;
export const AnalyticsOpportunitiesDocument = new TypedDocumentString(`
    query AnalyticsOpportunities($from: Date, $to: Date) {
  crm {
    opportunities(from: $from, to: $to) {
      dealValue
      probability
      stage
      source
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsOpportunitiesQuery,
	AnalyticsOpportunitiesQueryVariables
>;
export const AddOpportunityProductDocument = new TypedDocumentString(`
    mutation AddOpportunityProduct($id: ID!, $opportunityProduct: AddOpportunityProductInput!) {
  crm {
    addOpportunityProduct(id: $id, value: $opportunityProduct) {
      opportunity {
        id
      }
      product {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	AddOpportunityProductMutation,
	AddOpportunityProductMutationVariables
>;
export const UpdateOpportunityProductDocument = new TypedDocumentString(`
    mutation UpdateOpportunityProduct($id: ID!, $opportunityProduct: UpdateOpportunityProductInput!) {
  crm {
    updateOpportunityProduct(id: $id, value: $opportunityProduct) {
      opportunity {
        id
      }
      product {
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateOpportunityProductMutation,
	UpdateOpportunityProductMutationVariables
>;
export const RemoveOpportunityProductDocument = new TypedDocumentString(`
    mutation RemoveOpportunityProduct($id: ID!) {
  crm {
    removeOpportunityProduct(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveOpportunityProductMutation,
	RemoveOpportunityProductMutationVariables
>;
export const CreateProductDocument = new TypedDocumentString(`
    mutation CreateProduct($product: CreateProductInput!) {
  crm {
    createProduct(value: $product) {
      id
      name
      description
      price
      sku
      type
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateProductMutation,
	CreateProductMutationVariables
>;
export const UpdateProductDocument = new TypedDocumentString(`
    mutation UpdateProduct($id: ID!, $product: UpdateProductInput!) {
  crm {
    updateProduct(id: $id, value: $product) {
      id
      name
      description
      price
      sku
      type
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateProductMutation,
	UpdateProductMutationVariables
>;
export const RemoveProductDocument = new TypedDocumentString(`
    mutation RemoveProduct($id: ID!) {
  crm {
    removeProduct(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveProductMutation,
	RemoveProductMutationVariables
>;
export const TableProductDocument = new TypedDocumentString(`
    query TableProduct($page: Int, $perPage: Int, $search: String, $type: ProductType) {
  crm {
    products(page: $page, perPage: $perPage, search: $search, type: $type) {
      createdAt
      description
      id
      name
      price
      sku
      type
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableProductQuery,
	TableProductQueryVariables
>;
export const SearchProductsDocument = new TypedDocumentString(`
    query SearchProducts($search: String!) {
  crm {
    products(page: 1, perPage: 10, search: $search) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchProductsQuery,
	SearchProductsQueryVariables
>;
export const AnalyticsProductsDocument = new TypedDocumentString(`
    query AnalyticsProducts($from: Date, $to: Date) {
  crm {
    products(from: $from, to: $to) {
      price
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsProductsQuery,
	AnalyticsProductsQueryVariables
>;
export const CreateCustomerTrackingLinkDocument = new TypedDocumentString(`
    mutation CreateCustomerTrackingLink($customerTrackingLink: CreateCustomerTrackingLinkInput!) {
  dms {
    createCustomerTrackingLink(value: $customerTrackingLink) {
      id
      trackingToken
      isActive
      accessCount
      expiresAt
      lastAccessedAt
      createdAt
      updatedAt
      deliveryTask {
        id
        recipientName
        deliveryAddress
        status
        deliveryRoute {
          id
          status
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateCustomerTrackingLinkMutation,
	CreateCustomerTrackingLinkMutationVariables
>;
export const UpdateCustomerTrackingLinkDocument = new TypedDocumentString(`
    mutation UpdateCustomerTrackingLink($id: ID!, $customerTrackingLink: UpdateCustomerTrackingLinkInput!) {
  dms {
    updateCustomerTrackingLink(id: $id, value: $customerTrackingLink) {
      id
      trackingToken
      isActive
      accessCount
      expiresAt
      lastAccessedAt
      updatedAt
      deliveryTask {
        id
        recipientName
        deliveryAddress
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateCustomerTrackingLinkMutation,
	UpdateCustomerTrackingLinkMutationVariables
>;
export const TableCustomerTrackingLinkDocument = new TypedDocumentString(`
    query TableCustomerTrackingLink($page: Int, $perPage: Int, $search: String) {
  dms {
    customerTrackingLinks(page: $page, perPage: $perPage, search: $search) {
      accessCount
      createdAt
      expiresAt
      id
      isActive
      lastAccessedAt
      trackingToken
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableCustomerTrackingLinkQuery,
	TableCustomerTrackingLinkQueryVariables
>;
export const SearchCustomerTrackingLinksDocument = new TypedDocumentString(`
    query SearchCustomerTrackingLinks($search: String!) {
  dms {
    customerTrackingLinks(page: 1, perPage: 10, search: $search) {
      value: id
      label: trackingToken
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchCustomerTrackingLinksQuery,
	SearchCustomerTrackingLinksQueryVariables
>;
export const AnalyticsCustomerTrackingLinksDocument = new TypedDocumentString(`
    query AnalyticsCustomerTrackingLinks($from: Date, $to: Date) {
  dms {
    customerTrackingLinks(from: $from, to: $to) {
      accessCount
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsCustomerTrackingLinksQuery,
	AnalyticsCustomerTrackingLinksQueryVariables
>;
export const CreateDeliveryRouteDocument = new TypedDocumentString(`
    mutation CreateDeliveryRoute($deliveryRoute: CreateDeliveryRouteInput!) {
  dms {
    createDeliveryRoute(value: $deliveryRoute) {
      id
      routeDate
      status
      totalDistanceKm
      estimatedDurationMinutes
      createdAt
      updatedAt
      driver {
        id
        user {
          email
          id
          image
          name
        }
        status
        licenseNumber
        contactPhone
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateDeliveryRouteMutation,
	CreateDeliveryRouteMutationVariables
>;
export const UpdateDeliveryRouteDocument = new TypedDocumentString(`
    mutation UpdateDeliveryRoute($id: ID!, $deliveryRoute: UpdateDeliveryRouteInput!) {
  dms {
    updateDeliveryRoute(id: $id, value: $deliveryRoute) {
      id
      routeDate
      status
      totalDistanceKm
      estimatedDurationMinutes
      actualDurationMinutes
      startedAt
      completedAt
      updatedAt
      driver {
        id
        user {
          email
          id
          image
          name
        }
        status
        licenseNumber
        contactPhone
      }
      tasks {
        id
        recipientName
        deliveryAddress
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateDeliveryRouteMutation,
	UpdateDeliveryRouteMutationVariables
>;
export const RemoveDeliveryRouteDocument = new TypedDocumentString(`
    mutation RemoveDeliveryRoute($id: ID!) {
  dms {
    removeDeliveryRoute(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveDeliveryRouteMutation,
	RemoveDeliveryRouteMutationVariables
>;
export const TableDeliveryDocument = new TypedDocumentString(`
    query TableDelivery($page: Int, $perPage: Int, $search: String, $status: DeliveryRouteStatus) {
  dms {
    deliveryRoutes(page: $page, perPage: $perPage, search: $search, status: $status) {
      actualDurationMinutes
      completedAt
      createdAt
      estimatedDurationMinutes
      id
      optimizedRouteData
      routeDate
      startedAt
      status
      totalDistanceKm
      updatedAt
      driver {
        id
        user {
          email
          id
          image
          name
        }
        status
        licenseNumber
        contactPhone
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableDeliveryQuery,
	TableDeliveryQueryVariables
>;
export const SearchDeliveryRoutesDocument = new TypedDocumentString(`
    query SearchDeliveryRoutes($search: String!) {
  dms {
    deliveryRoutes(page: 1, perPage: 10, search: $search) {
      value: id
      label: routeDate
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchDeliveryRoutesQuery,
	SearchDeliveryRoutesQueryVariables
>;
export const AnalyticsDeliveryRoutesDocument = new TypedDocumentString(`
    query AnalyticsDeliveryRoutes($from: Date, $to: Date) {
  dms {
    deliveryRoutes(from: $from, to: $to) {
      totalDistanceKm
      estimatedDurationMinutes
      actualDurationMinutes
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsDeliveryRoutesQuery,
	AnalyticsDeliveryRoutesQueryVariables
>;
export const CreateDeliveryTaskDocument = new TypedDocumentString(`
    mutation CreateDeliveryTask($deliveryTask: CreateDeliveryTaskInput!) {
  dms {
    createDeliveryTask(value: $deliveryTask) {
      id
      recipientName
      recipientPhone
      deliveryAddress
      deliveryInstructions
      status
      estimatedArrivalTime
      routeSequence
      createdAt
      updatedAt
      deliveryRoute {
        id
        driver {
          id
          user {
            email
            name
          }
        }
      }
      package {
        id
        packageNumber
        trackingNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateDeliveryTaskMutation,
	CreateDeliveryTaskMutationVariables
>;
export const UpdateDeliveryTaskDocument = new TypedDocumentString(`
    mutation UpdateDeliveryTask($id: ID!, $deliveryTask: UpdateDeliveryTaskInput!) {
  dms {
    updateDeliveryTask(id: $id, value: $deliveryTask) {
      id
      recipientName
      recipientPhone
      deliveryAddress
      deliveryInstructions
      status
      failureReason
      estimatedArrivalTime
      actualArrivalTime
      deliveryTime
      attemptCount
      updatedAt
      deliveryRoute {
        id
        status
        driver {
          id
          user {
            email
            name
          }
        }
      }
      package {
        id
        packageNumber
        trackingNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateDeliveryTaskMutation,
	UpdateDeliveryTaskMutationVariables
>;
export const TableDeliveryTaskDocument = new TypedDocumentString(`
    query TableDeliveryTask($page: Int, $perPage: Int, $search: String, $status: DeliveryTaskStatus, $failureReason: DeliveryFailureReason) {
  dms {
    deliveryTasks(
      failureReason: $failureReason
      page: $page
      perPage: $perPage
      search: $search
      status: $status
    ) {
      actualArrivalTime
      attemptCount
      createdAt
      deliveryAddress
      deliveryInstructions
      deliveryTime
      estimatedArrivalTime
      failureReason
      id
      recipientName
      recipientPhone
      routeSequence
      status
      updatedAt
      deliveryRoute {
        id
        totalDistanceKm
        optimizedRouteData
        status
        driver {
          id
          user {
            email
            id
            image
            name
          }
          licenseNumber
          status
          contactPhone
        }
      }
      package {
        id
        carrier
        packageNumber
        trackingNumber
        warehouse {
          id
          address
          country
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableDeliveryTaskQuery,
	TableDeliveryTaskQueryVariables
>;
export const SearchDeliveryTasksDocument = new TypedDocumentString(`
    query SearchDeliveryTasks($search: String!) {
  dms {
    deliveryTasks(page: 1, perPage: 10, search: $search) {
      value: id
      label: recipientName
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchDeliveryTasksQuery,
	SearchDeliveryTasksQueryVariables
>;
export const AnalyticsDeliveryTasksDocument = new TypedDocumentString(`
    query AnalyticsDeliveryTasks($from: Date, $to: Date) {
  dms {
    deliveryTasks(from: $from, to: $to) {
      attemptCount
      status
      failureReason
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsDeliveryTasksQuery,
	AnalyticsDeliveryTasksQueryVariables
>;
export const CreateDriverLocationDocument = new TypedDocumentString(`
    mutation CreateDriverLocation($driverLocation: CreateDriverLocationInput!) {
  dms {
    createDriverLocation(value: $driverLocation) {
      id
      latitude
      longitude
      altitude
      accuracy
      speedKmh
      heading
      timestamp
      createdAt
      updatedAt
      driver {
        id
        user {
          email
          id
          image
          name
        }
        contactPhone
        licenseNumber
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateDriverLocationMutation,
	CreateDriverLocationMutationVariables
>;
export const UpdateDriverLocationDocument = new TypedDocumentString(`
    mutation UpdateDriverLocation($id: ID!, $driverLocation: UpdateDriverLocationInput!) {
  dms {
    updateDriverLocation(id: $id, value: $driverLocation) {
      id
      latitude
      longitude
      altitude
      accuracy
      speedKmh
      heading
      timestamp
      updatedAt
      driver {
        id
        user {
          email
          id
          image
          name
        }
        contactPhone
        licenseNumber
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateDriverLocationMutation,
	UpdateDriverLocationMutationVariables
>;
export const RemoveDriverLocationDocument = new TypedDocumentString(`
    mutation RemoveDriverLocation($id: ID!) {
  dms {
    removeDriverLocation(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveDriverLocationMutation,
	RemoveDriverLocationMutationVariables
>;
export const TableDriverLocationDocument = new TypedDocumentString(`
    query TableDriverLocation($page: Int, $perPage: Int) {
  dms {
    driverLocations(page: $page, perPage: $perPage) {
      accuracy
      altitude
      createdAt
      heading
      id
      latitude
      longitude
      speedKmh
      timestamp
      updatedAt
      driver {
        id
        contactPhone
        licenseExpiryDate
        licenseNumber
        user {
          email
          id
          image
          name
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableDriverLocationQuery,
	TableDriverLocationQueryVariables
>;
export const AnalyticsDriverLocationsDocument = new TypedDocumentString(`
    query AnalyticsDriverLocations($from: Date, $to: Date) {
  dms {
    driverLocations(from: $from, to: $to) {
      speedKmh
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsDriverLocationsQuery,
	AnalyticsDriverLocationsQueryVariables
>;
export const CreateDmsProofOfDeliveryDocument = new TypedDocumentString(`
    mutation CreateDmsProofOfDelivery($dmsProofOfDelivery: CreateDmsProofOfDeliveryInput!) {
  dms {
    createDmsProofOfDelivery(value: $dmsProofOfDelivery) {
      id
      type
      recipientName
      timestamp
      filePath
      signatureData
      verificationCode
      latitude
      longitude
      createdAt
      updatedAt
      deliveryTask {
        id
        recipientName
        deliveryAddress
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateDmsProofOfDeliveryMutation,
	CreateDmsProofOfDeliveryMutationVariables
>;
export const TableProofOfDeliveryDocument = new TypedDocumentString(`
    query TableProofOfDelivery($page: Int, $perPage: Int, $search: String, $type: ProofOfDeliveryType) {
  dms {
    dmsProofOfDeliveries(
      page: $page
      perPage: $perPage
      search: $search
      type: $type
    ) {
      createdAt
      filePath
      id
      latitude
      longitude
      recipientName
      signatureData
      timestamp
      type
      updatedAt
      verificationCode
      deliveryTask {
        package {
          id
          packageNumber
          packageType
          requiresSignature
          trackingNumber
          warehouse {
            id
            address
            city
            country
          }
        }
        actualArrivalTime
        deliveryInstructions
        deliveryAddress
        failureReason
        recipientName
        recipientPhone
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableProofOfDeliveryQuery,
	TableProofOfDeliveryQueryVariables
>;
export const SearchDmsProofOfDeliveriesDocument = new TypedDocumentString(`
    query SearchDmsProofOfDeliveries($search: String!) {
  dms {
    dmsProofOfDeliveries(page: 1, perPage: 10, search: $search) {
      value: id
      label: recipientName
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchDmsProofOfDeliveriesQuery,
	SearchDmsProofOfDeliveriesQueryVariables
>;
export const AnalyticsProofOfDeliveriesDocument = new TypedDocumentString(`
    query AnalyticsProofOfDeliveries($from: Date, $to: Date) {
  dms {
    dmsProofOfDeliveries(from: $from, to: $to) {
      type
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsProofOfDeliveriesQuery,
	AnalyticsProofOfDeliveriesQueryVariables
>;
export const CreateTaskEventDocument = new TypedDocumentString(`
    mutation CreateTaskEvent($taskEvent: CreateTaskEventInput!) {
  dms {
    createTaskEvent(value: $taskEvent) {
      id
      status
      reason
      notes
      latitude
      longitude
      timestamp
      createdAt
      updatedAt
      deliveryTask {
        id
        recipientName
        deliveryAddress
        status
        package {
          id
          trackingNumber
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateTaskEventMutation,
	CreateTaskEventMutationVariables
>;
export const TableTaskEventDocument = new TypedDocumentString(`
    query TableTaskEvent($page: Int, $perPage: Int, $search: String, $status: TaskEventStatus) {
  dms {
    taskEvents(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      id
      latitude
      longitude
      notes
      reason
      status
      timestamp
      updatedAt
      deliveryTask {
        id
        recipientName
        recipientPhone
        deliveryInstructions
        deliveryAddress
        status
        package {
          id
          trackingNumber
          packageNumber
          packageType
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableTaskEventQuery,
	TableTaskEventQueryVariables
>;
export const SearchTaskEventsDocument = new TypedDocumentString(`
    query SearchTaskEvents($search: String!) {
  dms {
    taskEvents(page: 1, perPage: 10, search: $search) {
      value: id
      label: reason
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchTaskEventsQuery,
	SearchTaskEventsQueryVariables
>;
export const AnalyticsTaskEventsDocument = new TypedDocumentString(`
    query AnalyticsTaskEvents($from: Date, $to: Date) {
  dms {
    taskEvents(from: $from, to: $to) {
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsTaskEventsQuery,
	AnalyticsTaskEventsQueryVariables
>;
export const CreateCarrierRateDocument = new TypedDocumentString(`
    mutation CreateCarrierRate($carrierRate: CreateCarrierRateInput!) {
  tms {
    createCarrierRate(value: $carrierRate) {
      id
      carrier {
        id
        name
        contactEmail
        contactPhone
      }
      serviceType
      origin
      destination
      rate
      unit
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateCarrierRateMutation,
	CreateCarrierRateMutationVariables
>;
export const UpdateCarrierRateDocument = new TypedDocumentString(`
    mutation UpdateCarrierRate($id: ID!, $carrierRate: UpdateCarrierRateInput!) {
  tms {
    updateCarrierRate(id: $id, value: $carrierRate) {
      id
      carrier {
        id
        name
        contactEmail
        contactPhone
      }
      serviceType
      origin
      destination
      rate
      unit
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateCarrierRateMutation,
	UpdateCarrierRateMutationVariables
>;
export const RemoveCarrierRateDocument = new TypedDocumentString(`
    mutation RemoveCarrierRate($id: ID!) {
  tms {
    removeCarrierRate(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveCarrierRateMutation,
	RemoveCarrierRateMutationVariables
>;
export const CreateCarrierDocument = new TypedDocumentString(`
    mutation CreateCarrier($carrier: CreateCarrierInput!) {
  tms {
    createCarrier(value: $carrier) {
      id
      name
      contactPerson
      contactEmail
      contactPhone
      servicesOffered
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateCarrierMutation,
	CreateCarrierMutationVariables
>;
export const UpdateCarrierDocument = new TypedDocumentString(`
    mutation UpdateCarrier($id: ID!, $carrier: UpdateCarrierInput!) {
  tms {
    updateCarrier(id: $id, value: $carrier) {
      id
      name
      contactPerson
      contactEmail
      contactPhone
      servicesOffered
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateCarrierMutation,
	UpdateCarrierMutationVariables
>;
export const RemoveCarrierDocument = new TypedDocumentString(`
    mutation RemoveCarrier($id: ID!) {
  tms {
    removeCarrier(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveCarrierMutation,
	RemoveCarrierMutationVariables
>;
export const TableCarrierQueryDocument = new TypedDocumentString(`
    query TableCarrierQuery($page: Int, $perPage: Int, $search: String) {
  tms {
    carriers(page: $page, perPage: $perPage, search: $search) {
      contactEmail
      contactPerson
      contactPhone
      createdAt
      id
      name
      servicesOffered
      updatedAt
      partnerInvoices {
        invoiceNumber
        invoiceDate
        status
        totalAmount
        items {
          amount
          id
          shipmentLeg {
            status
            shipment {
              trackingNumber
              carrier
              createdAt
              id
              status
              warehouseId
            }
          }
        }
      }
      rates {
        destination
        id
        origin
        rate
        serviceType
        unit
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableCarrierQueryQuery,
	TableCarrierQueryQueryVariables
>;
export const SearchCarriersDocument = new TypedDocumentString(`
    query SearchCarriers($search: String!) {
  tms {
    carriers(search: $search, page: 1, perPage: 10) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchCarriersQuery,
	SearchCarriersQueryVariables
>;
export const CreateDriverScheduleDocument = new TypedDocumentString(`
    mutation CreateDriverSchedule($driverSchedule: CreateDriverScheduleInput!) {
  tms {
    createDriverSchedule(value: $driverSchedule) {
      id
      driver {
        id
        user {
          id
          name
          email
        }
        licenseNumber
        licenseExpiryDate
        status
        contactPhone
      }
      startDate
      endDate
      reason
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateDriverScheduleMutation,
	CreateDriverScheduleMutationVariables
>;
export const UpdateDriverScheduleDocument = new TypedDocumentString(`
    mutation UpdateDriverSchedule($id: ID!, $driverSchedule: UpdateDriverScheduleInput!) {
  tms {
    updateDriverSchedule(id: $id, value: $driverSchedule) {
      id
      driver {
        id
        user {
          id
          name
          email
        }
        licenseNumber
        licenseExpiryDate
        status
        contactPhone
      }
      startDate
      endDate
      reason
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateDriverScheduleMutation,
	UpdateDriverScheduleMutationVariables
>;
export const RemoveDriverScheduleDocument = new TypedDocumentString(`
    mutation RemoveDriverSchedule($id: ID!) {
  tms {
    removeDriverSchedule(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveDriverScheduleMutation,
	RemoveDriverScheduleMutationVariables
>;
export const CreateDriverDocument = new TypedDocumentString(`
    mutation CreateDriver($driver: CreateDriverInput!) {
  tms {
    createDriver(value: $driver) {
      id
      user {
        id
        name
        email
        image
      }
      licenseNumber
      licenseExpiryDate
      status
      contactPhone
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateDriverMutation,
	CreateDriverMutationVariables
>;
export const UpdateDriverDocument = new TypedDocumentString(`
    mutation UpdateDriver($id: ID!, $driver: UpdateDriverInput!) {
  tms {
    updateDriver(id: $id, value: $driver) {
      id
      user {
        id
        name
        email
        image
      }
      licenseNumber
      licenseExpiryDate
      status
      contactPhone
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateDriverMutation,
	UpdateDriverMutationVariables
>;
export const RemoveDriverDocument = new TypedDocumentString(`
    mutation RemoveDriver($id: ID!) {
  tms {
    removeDriver(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveDriverMutation,
	RemoveDriverMutationVariables
>;
export const TableDriverDocument = new TypedDocumentString(`
    query TableDriver($page: Int, $perPage: Int, $search: String, $status: DriverStatus) {
  tms {
    drivers(page: $page, perPage: $perPage, search: $search, status: $status) {
      contactPhone
      createdAt
      id
      licenseExpiryDate
      licenseNumber
      status
      updatedAt
      user {
        email
        id
        image
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableDriverQuery,
	TableDriverQueryVariables
>;
export const SearchDriversDocument = new TypedDocumentString(`
    query SearchDrivers($search: String!) {
  tms {
    drivers(search: $search, page: 1, perPage: 10) {
      value: id
      label: licenseNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchDriversQuery,
	SearchDriversQueryVariables
>;
export const AnalyticsDriversDocument = new TypedDocumentString(`
    query AnalyticsDrivers($from: Date, $to: Date) {
  tms {
    drivers(from: $from, to: $to) {
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsDriversQuery,
	AnalyticsDriversQueryVariables
>;
export const CreateExpenseDocument = new TypedDocumentString(`
    mutation CreateExpense($expense: CreateExpenseInput!) {
  tms {
    createExpense(value: $expense) {
      id
      type
      amount
      currency
      status
      description
      expenseDate
      receiptUrl
      fuelQuantity
      odometerReading
      driver {
        id
        user {
          id
          name
        }
      }
      trip {
        id
        status
      }
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateExpenseMutation,
	CreateExpenseMutationVariables
>;
export const UpdateExpenseDocument = new TypedDocumentString(`
    mutation UpdateExpense($id: ID!, $expense: UpdateExpenseInput!) {
  tms {
    updateExpense(id: $id, value: $expense) {
      id
      type
      amount
      currency
      status
      description
      expenseDate
      receiptUrl
      fuelQuantity
      odometerReading
      driver {
        id
        user {
          id
          name
        }
      }
      trip {
        id
        status
      }
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateExpenseMutation,
	UpdateExpenseMutationVariables
>;
export const RemoveExpenseDocument = new TypedDocumentString(`
    mutation RemoveExpense($id: ID!) {
  tms {
    removeExpense(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveExpenseMutation,
	RemoveExpenseMutationVariables
>;
export const TableExpenseDocument = new TypedDocumentString(`
    query TableExpense($page: Int, $perPage: Int, $search: String, $status: ExpenseStatus, $type: ExpenseType, $currency: Currency) {
  tms {
    expenses(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
      type: $type
      currency: $currency
    ) {
      amount
      createdAt
      currency
      description
      driver {
        user {
          email
          id
          image
          name
        }
        licenseNumber
        contactPhone
        status
      }
      expenseDate
      fuelQuantity
      id
      odometerReading
      receiptUrl
      status
      type
      updatedAt
      trip {
        createdAt
        endLocation
        startLocation
        status
        startTime
        endTime
        vehicle {
          vin
          year
          model
          make
          id
          registrationNumber
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableExpenseQuery,
	TableExpenseQueryVariables
>;
export const SearchExpensesDocument = new TypedDocumentString(`
    query SearchExpenses($search: String!) {
  tms {
    expenses(search: $search, page: 1, perPage: 10) {
      value: id
      label: description
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchExpensesQuery,
	SearchExpensesQueryVariables
>;
export const AnalyticsExpensesDocument = new TypedDocumentString(`
    query AnalyticsExpenses($from: Date, $to: Date) {
  tms {
    expenses(from: $from, to: $to) {
      amount
      type
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsExpensesQuery,
	AnalyticsExpensesQueryVariables
>;
export const CreateGeofenceEventDocument = new TypedDocumentString(`
    mutation CreateGeofenceEvent($geofenceEvent: CreateGeofenceEventInput!) {
  tms {
    createGeofenceEvent(value: $geofenceEvent) {
      id
      vehicle {
        id
        registrationNumber
        model
        make
        status
      }
      geofence {
        id
        name
        latitude
        longitude
      }
      eventType
      timestamp
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateGeofenceEventMutation,
	CreateGeofenceEventMutationVariables
>;
export const UpdateGeofenceEventDocument = new TypedDocumentString(`
    mutation UpdateGeofenceEvent($id: ID!, $geofenceEvent: UpdateGeofenceEventInput!) {
  tms {
    updateGeofenceEvent(id: $id, value: $geofenceEvent) {
      id
      vehicle {
        id
        registrationNumber
        model
        make
        status
      }
      geofence {
        id
        name
        latitude
        longitude
      }
      eventType
      timestamp
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateGeofenceEventMutation,
	UpdateGeofenceEventMutationVariables
>;
export const CreateGeofenceDocument = new TypedDocumentString(`
    mutation CreateGeofence($geofence: CreateGeofenceInput!) {
  tms {
    createGeofence(value: $geofence) {
      id
      name
      longitude
      latitude
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateGeofenceMutation,
	CreateGeofenceMutationVariables
>;
export const UpdateGeofenceDocument = new TypedDocumentString(`
    mutation UpdateGeofence($id: ID!, $geofence: UpdateGeofenceInput!) {
  tms {
    updateGeofence(id: $id, value: $geofence) {
      id
      name
      longitude
      latitude
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateGeofenceMutation,
	UpdateGeofenceMutationVariables
>;
export const TableGeofenceDocument = new TypedDocumentString(`
    query TableGeofence($page: Int, $perPage: Int, $search: String) {
  tms {
    geofences(page: $page, perPage: $perPage, search: $search) {
      createdAt
      id
      latitude
      longitude
      name
      updatedAt
      events {
        eventType
        id
        timestamp
        vehicle {
          model
          vin
          year
          registrationNumber
          make
          id
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableGeofenceQuery,
	TableGeofenceQueryVariables
>;
export const SearchGeofencesDocument = new TypedDocumentString(`
    query SearchGeofences($search: String!) {
  tms {
    geofences(search: $search, page: 1, perPage: 10) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchGeofencesQuery,
	SearchGeofencesQueryVariables
>;
export const CreateGpsPingDocument = new TypedDocumentString(`
    mutation CreateGpsPing($gpsPing: CreateGpsPingInput!) {
  tms {
    createGpsPing(value: $gpsPing) {
      id
      vehicle {
        id
        registrationNumber
        model
        make
        year
        vin
        status
      }
      latitude
      longitude
      timestamp
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateGpsPingMutation,
	CreateGpsPingMutationVariables
>;
export const UpdateGpsPingDocument = new TypedDocumentString(`
    mutation UpdateGpsPing($id: ID!, $gpsPing: UpdateGpsPingInput!) {
  tms {
    updateGpsPing(id: $id, value: $gpsPing) {
      id
      vehicle {
        id
        registrationNumber
        model
        make
        year
        vin
        status
      }
      latitude
      longitude
      timestamp
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateGpsPingMutation,
	UpdateGpsPingMutationVariables
>;
export const TableGpsPingDocument = new TypedDocumentString(`
    query TableGpsPing($page: Int, $perPage: Int) {
  tms {
    gpsPings(page: $page, perPage: $perPage) {
      id
      latitude
      longitude
      timestamp
      vehicle {
        year
        vin
        registrationNumber
        model
        make
        status
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableGpsPingQuery,
	TableGpsPingQueryVariables
>;
export const UpdatePartnerInvoiceItemDocument = new TypedDocumentString(`
    mutation UpdatePartnerInvoiceItem($id: ID!, $partnerInvoiceItem: UpdatePartnerInvoiceItemInput!) {
  tms {
    updatePartnerInvoiceItem(id: $id, value: $partnerInvoiceItem) {
      id
      partnerInvoice {
        id
        carrier {
          id
          name
        }
        invoiceNumber
        invoiceDate
        totalAmount
        status
        createdAt
        updatedAt
      }
      shipmentLeg {
        id
        shipment {
          id
        }
        legSequence
        startLocation
        endLocation
        carrier {
          id
          name
        }
        status
        createdAt
        updatedAt
      }
      amount
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdatePartnerInvoiceItemMutation,
	UpdatePartnerInvoiceItemMutationVariables
>;
export const RemovePartnerInvoiceItemDocument = new TypedDocumentString(`
    mutation RemovePartnerInvoiceItem($id: ID!) {
  tms {
    removePartnerInvoiceItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemovePartnerInvoiceItemMutation,
	RemovePartnerInvoiceItemMutationVariables
>;
export const CreatePartnerInvoiceDocument = new TypedDocumentString(`
    mutation CreatePartnerInvoice($partnerInvoice: CreatePartnerInvoiceInput!) {
  tms {
    createPartnerInvoice(value: $partnerInvoice) {
      id
      carrier {
        id
        name
      }
      invoiceNumber
      invoiceDate
      totalAmount
      status
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreatePartnerInvoiceMutation,
	CreatePartnerInvoiceMutationVariables
>;
export const UpdatePartnerInvoiceDocument = new TypedDocumentString(`
    mutation UpdatePartnerInvoice($id: ID!, $partnerInvoice: UpdatePartnerInvoiceInput!) {
  tms {
    updatePartnerInvoice(id: $id, value: $partnerInvoice) {
      id
      carrier {
        id
        name
      }
      invoiceNumber
      invoiceDate
      totalAmount
      status
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdatePartnerInvoiceMutation,
	UpdatePartnerInvoiceMutationVariables
>;
export const TablePartnerInvoiceDocument = new TypedDocumentString(`
    query TablePartnerInvoice($page: Int, $perPage: Int, $search: String, $status: PartnerInvoiceStatus) {
  tms {
    partnerInvoices(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
    ) {
      createdAt
      id
      invoiceDate
      invoiceNumber
      status
      totalAmount
      updatedAt
      items {
        amount
        id
        shipmentLeg {
          startLocation
          endLocation
          shipment {
            trackingNumber
            carrier
          }
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TablePartnerInvoiceQuery,
	TablePartnerInvoiceQueryVariables
>;
export const SearchPartnerInvoicesDocument = new TypedDocumentString(`
    query SearchPartnerInvoices($search: String!) {
  tms {
    partnerInvoices(search: $search, page: 1, perPage: 10) {
      value: id
      label: invoiceNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchPartnerInvoicesQuery,
	SearchPartnerInvoicesQueryVariables
>;
export const AnalyticsPartnerInvoicesDocument = new TypedDocumentString(`
    query AnalyticsPartnerInvoices($from: Date, $to: Date) {
  tms {
    partnerInvoices(from: $from, to: $to) {
      totalAmount
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsPartnerInvoicesQuery,
	AnalyticsPartnerInvoicesQueryVariables
>;
export const CreateProofOfDeliveryDocument = new TypedDocumentString(`
    mutation CreateProofOfDelivery($proofOfDelivery: CreateProofOfDeliveryInput!) {
  tms {
    createProofOfDelivery(value: $proofOfDelivery) {
      id
      tripStop {
        id
        trip {
          id
          status
        }
        shipment {
          id
          trackingNumber
        }
        sequence
        address
        status
      }
      type
      filePath
      timestamp
      latitude
      longitude
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateProofOfDeliveryMutation,
	CreateProofOfDeliveryMutationVariables
>;
export const UpdateProofOfDeliveryDocument = new TypedDocumentString(`
    mutation UpdateProofOfDelivery($id: ID!, $proofOfDelivery: UpdateProofOfDeliveryInput!) {
  tms {
    updateProofOfDelivery(id: $id, value: $proofOfDelivery) {
      id
      tripStop {
        id
        trip {
          id
          status
        }
        shipment {
          id
          trackingNumber
        }
        sequence
        address
        status
      }
      type
      filePath
      timestamp
      latitude
      longitude
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateProofOfDeliveryMutation,
	UpdateProofOfDeliveryMutationVariables
>;
export const TableTmsProofOfDeliveryDocument = new TypedDocumentString(`
    query TableTmsProofOfDelivery($page: Int, $perPage: Int, $search: String, $type: ProofType) {
  tms {
    proofOfDeliveries(page: $page, perPage: $perPage, search: $search, type: $type) {
      createdAt
      filePath
      id
      latitude
      longitude
      timestamp
      type
      updatedAt
      tripStop {
        actualArrivalTime
        actualDepartureTime
        address
        status
        id
        shipment {
          trackingNumber
          status
          carrier
          id
        }
        trip {
          endLocation
          startLocation
          status
          vehicle {
            registrationNumber
            vin
            year
            make
            model
            gpsPings {
              latitude
              longitude
              timestamp
              id
            }
          }
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableTmsProofOfDeliveryQuery,
	TableTmsProofOfDeliveryQueryVariables
>;
export const SearchProofOfDeliveriesDocument = new TypedDocumentString(`
    query SearchProofOfDeliveries($search: String!) {
  tms {
    proofOfDeliveries(search: $search, page: 1, perPage: 10) {
      value: id
      label: filePath
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchProofOfDeliveriesQuery,
	SearchProofOfDeliveriesQueryVariables
>;
export const AnalyticsTmsProofOfDeliveriesDocument = new TypedDocumentString(`
    query AnalyticsTmsProofOfDeliveries($from: Date, $to: Date) {
  tms {
    proofOfDeliveries(from: $from, to: $to) {
      type
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsTmsProofOfDeliveriesQuery,
	AnalyticsTmsProofOfDeliveriesQueryVariables
>;
export const CreateRouteDocument = new TypedDocumentString(`
    mutation CreateRoute($route: CreateRouteInput!) {
  tms {
    createRoute(value: $route) {
      id
      trip {
        id
        status
      }
      optimizedRouteData
      totalDistance
      totalDuration
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateRouteMutation,
	CreateRouteMutationVariables
>;
export const UpdateRouteDocument = new TypedDocumentString(`
    mutation UpdateRoute($id: ID!, $route: UpdateRouteInput!) {
  tms {
    updateRoute(id: $id, value: $route) {
      id
      trip {
        id
        status
      }
      optimizedRouteData
      totalDistance
      totalDuration
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateRouteMutation,
	UpdateRouteMutationVariables
>;
export const RemoveRouteDocument = new TypedDocumentString(`
    mutation RemoveRoute($id: ID!) {
  tms {
    removeRoute(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveRouteMutation,
	RemoveRouteMutationVariables
>;
export const TableRouteDocument = new TypedDocumentString(`
    query TableRoute($page: Int, $perPage: Int, $search: String) {
  tms {
    routes(page: $page, perPage: $perPage, search: $search) {
      optimizedRouteData
      totalDistance
      totalDuration
      id
      trip {
        startLocation
        endTime
        endLocation
        createdAt
        startTime
        status
        updatedAt
        driver {
          user {
            email
            id
            image
            name
          }
          licenseNumber
          contactPhone
          id
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableRouteQuery,
	TableRouteQueryVariables
>;
export const AnalyticsRoutesDocument = new TypedDocumentString(`
    query AnalyticsRoutes($from: Date, $to: Date) {
  tms {
    routes(from: $from, to: $to) {
      totalDistance
      totalDuration
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsRoutesQuery,
	AnalyticsRoutesQueryVariables
>;
export const CreateShipmentLegEventDocument = new TypedDocumentString(`
    mutation CreateShipmentLegEvent($shipmentLegEvent: CreateShipmentLegEventInput!) {
  tms {
    createShipmentLegEvent(value: $shipmentLegEvent) {
      id
      shipmentLeg {
        id
        legSequence
        startLocation
        endLocation
        status
      }
      statusMessage
      location
      eventTimestamp
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateShipmentLegEventMutation,
	CreateShipmentLegEventMutationVariables
>;
export const CreateShipmentLegDocument = new TypedDocumentString(`
    mutation CreateShipmentLeg($shipmentLeg: CreateShipmentLegInput!) {
  tms {
    createShipmentLeg(value: $shipmentLeg) {
      id
      shipment {
        id
      }
      legSequence
      startLocation
      endLocation
      carrier {
        id
        name
      }
      internalTrip {
        id
      }
      status
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateShipmentLegMutation,
	CreateShipmentLegMutationVariables
>;
export const UpdateShipmentLegDocument = new TypedDocumentString(`
    mutation UpdateShipmentLeg($id: ID!, $shipmentLeg: UpdateShipmentLegInput!) {
  tms {
    updateShipmentLeg(id: $id, value: $shipmentLeg) {
      id
      shipment {
        id
      }
      legSequence
      startLocation
      endLocation
      carrier {
        id
        name
      }
      internalTrip {
        id
      }
      status
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateShipmentLegMutation,
	UpdateShipmentLegMutationVariables
>;
export const TableShipmentLegQueryDocument = new TypedDocumentString(`
    query TableShipmentLegQuery($page: Int, $perPage: Int, $search: String, $status: ShipmentLegStatus) {
  tms {
    shipmentLegs(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      endLocation
      id
      legSequence
      startLocation
      status
      updatedAt
      shipment {
        trackingNumber
        carrier
        status
      }
      partnerInvoiceItems {
        amount
        id
      }
      events {
        location
        statusMessage
        eventTimestamp
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableShipmentLegQueryQuery,
	TableShipmentLegQueryQueryVariables
>;
export const SearchShipmentLegsDocument = new TypedDocumentString(`
    query SearchShipmentLegs($search: String!) {
  tms {
    shipmentLegs(search: $search, page: 1, perPage: 10) {
      value: id
      label: startLocation
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchShipmentLegsQuery,
	SearchShipmentLegsQueryVariables
>;
export const AnalyticsShipmentLegsDocument = new TypedDocumentString(`
    query AnalyticsShipmentLegs($from: Date, $to: Date) {
  tms {
    shipmentLegs(from: $from, to: $to) {
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsShipmentLegsQuery,
	AnalyticsShipmentLegsQueryVariables
>;
export const CreateTripStopDocument = new TypedDocumentString(`
    mutation CreateTripStop($tripStop: CreateTripStopInput!) {
  tms {
    createTripStop(value: $tripStop) {
      id
      trip {
        id
        status
      }
      shipment {
        id
        status
      }
      sequence
      address
      status
      estimatedArrivalTime
      estimatedDepartureTime
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateTripStopMutation,
	CreateTripStopMutationVariables
>;
export const UpdateTripStopDocument = new TypedDocumentString(`
    mutation UpdateTripStop($id: ID!, $tripStop: UpdateTripStopInput!) {
  tms {
    updateTripStop(id: $id, value: $tripStop) {
      id
      trip {
        id
        status
      }
      shipment {
        id
        status
      }
      sequence
      address
      status
      estimatedArrivalTime
      estimatedDepartureTime
      actualArrivalTime
      actualDepartureTime
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateTripStopMutation,
	UpdateTripStopMutationVariables
>;
export const RemoveTripStopDocument = new TypedDocumentString(`
    mutation RemoveTripStop($id: ID!) {
  tms {
    removeTripStop(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveTripStopMutation,
	RemoveTripStopMutationVariables
>;
export const CreateTripDocument = new TypedDocumentString(`
    mutation CreateTrip($trip: CreateTripInput!) {
  tms {
    createTrip(value: $trip) {
      id
      driver {
        id
        user {
          id
          name
          email
        }
        licenseNumber
        status
      }
      vehicle {
        id
        registrationNumber
        make
        model
      }
      status
      startLocation
      startTime
      endLocation
      endTime
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateTripMutation,
	CreateTripMutationVariables
>;
export const UpdateTripDocument = new TypedDocumentString(`
    mutation UpdateTrip($id: ID!, $trip: UpdateTripInput!) {
  tms {
    updateTrip(id: $id, value: $trip) {
      id
      driver {
        id
        user {
          id
          name
          email
        }
        licenseNumber
        status
      }
      vehicle {
        id
        registrationNumber
        make
        model
      }
      status
      startLocation
      startTime
      endLocation
      endTime
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateTripMutation,
	UpdateTripMutationVariables
>;
export const RemoveTripDocument = new TypedDocumentString(`
    mutation RemoveTrip($id: ID!) {
  tms {
    removeTrip(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveTripMutation,
	RemoveTripMutationVariables
>;
export const TableTripDocument = new TypedDocumentString(`
    query TableTrip($page: Int, $perPage: Int, $search: String, $status: TripStatus) {
  tms {
    trips(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      endLocation
      endTime
      id
      startLocation
      startTime
      status
      updatedAt
      driver {
        user {
          email
          id
          image
          name
        }
        licenseNumber
        contactPhone
        status
      }
      vehicle {
        vin
        year
        registrationNumber
        model
        make
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableTripQuery,
	TableTripQueryVariables
>;
export const SearchTripsDocument = new TypedDocumentString(`
    query SearchTrips($search: String!) {
  tms {
    trips(search: $search, page: 1, perPage: 10) {
      value: id
      label: startLocation
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchTripsQuery,
	SearchTripsQueryVariables
>;
export const AnalyticsTripsDocument = new TypedDocumentString(`
    query AnalyticsTrips($from: Date, $to: Date) {
  tms {
    trips(from: $from, to: $to) {
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsTripsQuery,
	AnalyticsTripsQueryVariables
>;
export const CreateVehicleMaintenanceDocument = new TypedDocumentString(`
    mutation CreateVehicleMaintenance($id: ID!, $vehicleMaintenance: CreateVehicleMaintenanceInput!) {
  tms {
    addVehicleMaintenance(id: $id, value: $vehicleMaintenance) {
      id
      vehicle {
        id
        registrationNumber
        make
        model
      }
      serviceDate
      serviceType
      cost
      notes
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateVehicleMaintenanceMutation,
	CreateVehicleMaintenanceMutationVariables
>;
export const UpdateVehicleMaintenanceDocument = new TypedDocumentString(`
    mutation UpdateVehicleMaintenance($id: ID!, $vehicleMaintenance: UpdateVehicleMaintenanceInput!) {
  tms {
    updateVehicleMaintenance(id: $id, value: $vehicleMaintenance) {
      id
      vehicle {
        id
        registrationNumber
        make
        model
      }
      serviceDate
      serviceType
      cost
      notes
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateVehicleMaintenanceMutation,
	UpdateVehicleMaintenanceMutationVariables
>;
export const RemoveVehicleMaintenanceDocument = new TypedDocumentString(`
    mutation RemoveVehicleMaintenance($id: ID!) {
  tms {
    removeVehicleMaintenance(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveVehicleMaintenanceMutation,
	RemoveVehicleMaintenanceMutationVariables
>;
export const CreateVehicleDocument = new TypedDocumentString(`
    mutation CreateVehicle($vehicle: CreateVehicleInput!) {
  tms {
    createVehicle(value: $vehicle) {
      id
      registrationNumber
      make
      model
      year
      vin
      capacityWeight
      capacityVolume
      currentMileage
      lastMaintenanceDate
      status
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateVehicleMutation,
	CreateVehicleMutationVariables
>;
export const UpdateVehicleDocument = new TypedDocumentString(`
    mutation UpdateVehicle($id: ID!, $vehicle: UpdateVehicleInput!) {
  tms {
    updateVehicle(id: $id, value: $vehicle) {
      id
      registrationNumber
      make
      model
      year
      vin
      capacityWeight
      capacityVolume
      currentMileage
      lastMaintenanceDate
      status
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateVehicleMutation,
	UpdateVehicleMutationVariables
>;
export const RemoveVehicleDocument = new TypedDocumentString(`
    mutation RemoveVehicle($id: ID!) {
  tms {
    removeVehicle(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveVehicleMutation,
	RemoveVehicleMutationVariables
>;
export const TableVehicleDocument = new TypedDocumentString(`
    query TableVehicle($page: Int, $perPage: Int, $search: String, $status: VehicleStatus) {
  tms {
    vehicles(page: $page, perPage: $perPage, search: $search, status: $status) {
      capacityVolume
      capacityWeight
      createdAt
      currentMileage
      id
      lastMaintenanceDate
      make
      model
      registrationNumber
      status
      updatedAt
      vin
      year
      maintenances {
        cost
        createdAt
        id
        notes
        serviceDate
        serviceType
        updatedAt
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableVehicleQuery,
	TableVehicleQueryVariables
>;
export const SearchVehiclesDocument = new TypedDocumentString(`
    query SearchVehicles($search: String!) {
  tms {
    vehicles(search: $search, page: 1, perPage: 10) {
      value: id
      label: registrationNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchVehiclesQuery,
	SearchVehiclesQueryVariables
>;
export const AnalyticsVehiclesDocument = new TypedDocumentString(`
    query AnalyticsVehicles($from: Date, $to: Date) {
  tms {
    vehicles(from: $from, to: $to) {
      capacityVolume
      capacityWeight
      currentMileage
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsVehiclesQuery,
	AnalyticsVehiclesQueryVariables
>;
export const CreateBinThresholdDocument = new TypedDocumentString(`
    mutation CreateBinThreshold($binThreshold: CreateBinThresholdInput!) {
  wms {
    createBinThreshold(value: $binThreshold) {
      id
      minQuantity
      maxQuantity
      reorderQuantity
      alertThreshold
      isActive
      createdAt
      updatedAt
      location {
        id
        name
      }
      product {
        id
        name
        sku
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateBinThresholdMutation,
	CreateBinThresholdMutationVariables
>;
export const UpdateBinThresholdDocument = new TypedDocumentString(`
    mutation UpdateBinThreshold($id: ID!, $binThreshold: UpdateBinThresholdInput!) {
  wms {
    updateBinThreshold(id: $id, value: $binThreshold) {
      id
      minQuantity
      maxQuantity
      reorderQuantity
      alertThreshold
      isActive
      createdAt
      updatedAt
      location {
        id
        name
      }
      product {
        id
        name
        sku
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateBinThresholdMutation,
	UpdateBinThresholdMutationVariables
>;
export const RemoveBinThresholdDocument = new TypedDocumentString(`
    mutation RemoveBinThreshold($id: ID!) {
  wms {
    removeBinThreshold(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveBinThresholdMutation,
	RemoveBinThresholdMutationVariables
>;
export const TableBinThresholdDocument = new TypedDocumentString(`
    query TableBinThreshold($page: Int, $perPage: Int) {
  wms {
    binThresholds(page: $page, perPage: $perPage) {
      alertThreshold
      createdAt
      id
      isActive
      maxQuantity
      minQuantity
      reorderQuantity
      updatedAt
      product {
        name
        description
        id
        sku
        status
        barcode
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableBinThresholdQuery,
	TableBinThresholdQueryVariables
>;
export const AnalyticsBinThresholdsDocument = new TypedDocumentString(`
    query AnalyticsBinThresholds($from: Date, $to: Date) {
  wms {
    binThresholds(from: $from, to: $to) {
      minQuantity
      maxQuantity
      reorderQuantity
      alertThreshold
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsBinThresholdsQuery,
	AnalyticsBinThresholdsQueryVariables
>;
export const UpdateInboundShipmentItemDocument = new TypedDocumentString(`
    mutation UpdateInboundShipmentItem($id: ID!, $inboundShipmentItem: UpdateInboundShipmentItemInput!) {
  wms {
    updateInboundShipmentItem(id: $id, value: $inboundShipmentItem) {
      id
      expectedQuantity
      receivedQuantity
      discrepancyQuantity
      discrepancyNotes
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateInboundShipmentItemMutation,
	UpdateInboundShipmentItemMutationVariables
>;
export const RemoveInboundShipmentItemDocument = new TypedDocumentString(`
    mutation RemoveInboundShipmentItem($id: ID!) {
  wms {
    removeInboundShipmentItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveInboundShipmentItemMutation,
	RemoveInboundShipmentItemMutationVariables
>;
export const CreateInboundShipmentDocument = new TypedDocumentString(`
    mutation CreateInboundShipment($inboundShipment: CreateInboundShipmentInput!) {
  wms {
    createInboundShipment(value: $inboundShipment) {
      id
      warehouseId
      status
      expectedArrivalDate
      actualArrivalDate
      createdAt
      updatedAt
      client {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateInboundShipmentMutation,
	CreateInboundShipmentMutationVariables
>;
export const UpdateInboundShipmentDocument = new TypedDocumentString(`
    mutation UpdateInboundShipment($id: ID!, $inboundShipment: UpdateInboundShipmentInput!) {
  wms {
    updateInboundShipment(id: $id, value: $inboundShipment) {
      id
      warehouseId
      status
      expectedArrivalDate
      actualArrivalDate
      createdAt
      updatedAt
      client {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateInboundShipmentMutation,
	UpdateInboundShipmentMutationVariables
>;
export const RemoveInboundShipmentDocument = new TypedDocumentString(`
    mutation RemoveInboundShipment($id: ID!) {
  wms {
    removeInboundShipment(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveInboundShipmentMutation,
	RemoveInboundShipmentMutationVariables
>;
export const TableInboundShipmentDocument = new TypedDocumentString(`
    query TableInboundShipment($page: Int, $perPage: Int, $status: InboundShipmentStatus) {
  wms {
    inboundShipments(page: $page, perPage: $perPage, status: $status) {
      actualArrivalDate
      createdAt
      expectedArrivalDate
      id
      status
      updatedAt
      client {
        name
        industry
        phoneNumber
        country
        website
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableInboundShipmentQuery,
	TableInboundShipmentQueryVariables
>;
export const AnalyticsInboundShipmentsDocument = new TypedDocumentString(`
    query AnalyticsInboundShipments($from: Date, $to: Date) {
  wms {
    inboundShipments(from: $from, to: $to) {
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsInboundShipmentsQuery,
	AnalyticsInboundShipmentsQueryVariables
>;
export const CreateInventoryAdjustmentDocument = new TypedDocumentString(`
    mutation CreateInventoryAdjustment($inventoryAdjustment: CreateInventoryAdjustmentInput!) {
  wms {
    createInventoryAdjustment(value: $inventoryAdjustment) {
      id
      warehouseId
      quantityChange
      reason
      notes
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateInventoryAdjustmentMutation,
	CreateInventoryAdjustmentMutationVariables
>;
export const UpdateInventoryAdjustmentDocument = new TypedDocumentString(`
    mutation UpdateInventoryAdjustment($id: ID!, $inventoryAdjustment: UpdateInventoryAdjustmentInput!) {
  wms {
    updateInventoryAdjustment(id: $id, value: $inventoryAdjustment) {
      id
      warehouseId
      quantityChange
      reason
      notes
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateInventoryAdjustmentMutation,
	UpdateInventoryAdjustmentMutationVariables
>;
export const RemoveInventoryAdjustmentDocument = new TypedDocumentString(`
    mutation RemoveInventoryAdjustment($id: ID!) {
  wms {
    removeInventoryAdjustment(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveInventoryAdjustmentMutation,
	RemoveInventoryAdjustmentMutationVariables
>;
export const TableInventoryAdjustmentDocument = new TypedDocumentString(`
    query TableInventoryAdjustment($page: Int, $perPage: Int, $reason: InventoryAdjustmentReason, $search: String) {
  wms {
    inventoryAdjustments(
      page: $page
      perPage: $perPage
      reason: $reason
      search: $search
    ) {
      createdAt
      id
      notes
      quantityChange
      reason
      updatedAt
      warehouseId
      user {
        email
        id
        image
        name
      }
      product {
        barcode
        description
        id
        name
        sku
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableInventoryAdjustmentQuery,
	TableInventoryAdjustmentQueryVariables
>;
export const SearchInventoryAdjustmentsDocument = new TypedDocumentString(`
    query SearchInventoryAdjustments($search: String!) {
  wms {
    inventoryAdjustments(search: $search, page: 1, perPage: 10) {
      value: id
      label: notes
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchInventoryAdjustmentsQuery,
	SearchInventoryAdjustmentsQueryVariables
>;
export const AnalyticsInventoryAdjustmentsDocument = new TypedDocumentString(`
    query AnalyticsInventoryAdjustments($from: Date, $to: Date) {
  wms {
    inventoryAdjustments(from: $from, to: $to) {
      quantityChange
      reason
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsInventoryAdjustmentsQuery,
	AnalyticsInventoryAdjustmentsQueryVariables
>;
export const CreateInventoryBatchDocument = new TypedDocumentString(`
    mutation CreateInventoryBatch($inventoryBatch: CreateInventoryBatchInput!) {
  wms {
    createInventoryBatch(value: $inventoryBatch) {
      id
      batchNumber
      expirationDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateInventoryBatchMutation,
	CreateInventoryBatchMutationVariables
>;
export const UpdateInventoryBatchDocument = new TypedDocumentString(`
    mutation UpdateInventoryBatch($id: ID!, $inventoryBatch: UpdateInventoryBatchInput!) {
  wms {
    updateInventoryBatch(id: $id, value: $inventoryBatch) {
      id
      batchNumber
      expirationDate
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateInventoryBatchMutation,
	UpdateInventoryBatchMutationVariables
>;
export const RemoveInventoryBatchDocument = new TypedDocumentString(`
    mutation RemoveInventoryBatch($id: ID!) {
  wms {
    removeInventoryBatch(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveInventoryBatchMutation,
	RemoveInventoryBatchMutationVariables
>;
export const TableInventoryBatchDocument = new TypedDocumentString(`
    query TableInventoryBatch($page: Int, $perPage: Int, $search: String) {
  wms {
    inventoryBatches(page: $page, perPage: $perPage, search: $search) {
      batchNumber
      createdAt
      expirationDate
      id
      updatedAt
      inventoryStock {
        availableQuantity
        product {
          barcode
          name
          sku
          status
          description
          id
          costPrice
        }
        quantity
        reservedQuantity
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableInventoryBatchQuery,
	TableInventoryBatchQueryVariables
>;
export const SearchInventoryBatchesDocument = new TypedDocumentString(`
    query SearchInventoryBatches($search: String!) {
  wms {
    inventoryBatches(search: $search, page: 1, perPage: 10) {
      value: id
      label: batchNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchInventoryBatchesQuery,
	SearchInventoryBatchesQueryVariables
>;
export const CreateInventoryStockDocument = new TypedDocumentString(`
    mutation CreateInventoryStock($inventoryStock: CreateInventoryStockInput!) {
  wms {
    createInventoryStock(value: $inventoryStock) {
      id
      quantity
      reservedQuantity
      availableQuantity
      status
      lastCountedAt
      lastMovementAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateInventoryStockMutation,
	CreateInventoryStockMutationVariables
>;
export const UpdateInventoryStockDocument = new TypedDocumentString(`
    mutation UpdateInventoryStock($id: ID!, $inventoryStock: UpdateInventoryStockInput!) {
  wms {
    updateInventoryStock(id: $id, value: $inventoryStock) {
      id
      quantity
      reservedQuantity
      availableQuantity
      status
      lastCountedAt
      lastMovementAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateInventoryStockMutation,
	UpdateInventoryStockMutationVariables
>;
export const RemoveInventoryStockDocument = new TypedDocumentString(`
    mutation RemoveInventoryStock($id: ID!) {
  wms {
    removeInventoryStock(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveInventoryStockMutation,
	RemoveInventoryStockMutationVariables
>;
export const TableInventoryStockDocument = new TypedDocumentString(`
    query TableInventoryStock($page: Int, $perPage: Int, $status: InventoryStockStatus) {
  wms {
    inventoryStocks(page: $page, perPage: $perPage, status: $status) {
      availableQuantity
      createdAt
      id
      lastCountedAt
      lastMovementAt
      quantity
      reservedQuantity
      status
      updatedAt
      product {
        barcode
        costPrice
        description
        id
        name
        status
        sku
        volume
        weight
        width
      }
      location {
        id
        barcode
        isActive
        isPickable
        isReceivable
        level
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableInventoryStockQuery,
	TableInventoryStockQueryVariables
>;
export const AnalyticsInventoryStockDocument = new TypedDocumentString(`
    query AnalyticsInventoryStock($from: Date, $to: Date) {
  wms {
    inventoryStocks(from: $from, to: $to) {
      quantity
      reservedQuantity
      availableQuantity
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsInventoryStockQuery,
	AnalyticsInventoryStockQueryVariables
>;
export const CreateLocationDocument = new TypedDocumentString(`
    mutation CreateLocation($location: CreateLocationInput!) {
  wms {
    createLocation(value: $location) {
      id
      name
      barcode
      type
      isActive
      isPickable
      isReceivable
      level
      maxPallets
      maxVolume
      maxWeight
      temperatureControlled
      hazmatApproved
      xCoordinate
      yCoordinate
      zCoordinate
      path
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateLocationMutation,
	CreateLocationMutationVariables
>;
export const UpdateLocationDocument = new TypedDocumentString(`
    mutation UpdateLocation($id: ID!, $location: UpdateLocationInput!) {
  wms {
    updateLocation(id: $id, value: $location) {
      id
      name
      barcode
      type
      isActive
      isPickable
      isReceivable
      level
      maxPallets
      maxVolume
      maxWeight
      temperatureControlled
      hazmatApproved
      xCoordinate
      yCoordinate
      zCoordinate
      path
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateLocationMutation,
	UpdateLocationMutationVariables
>;
export const RemoveLocationDocument = new TypedDocumentString(`
    mutation RemoveLocation($id: ID!) {
  wms {
    removeLocation(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveLocationMutation,
	RemoveLocationMutationVariables
>;
export const TableLocationDocument = new TypedDocumentString(`
    query TableLocation($page: Int, $perPage: Int, $search: String, $type: LocationType) {
  wms {
    locations(page: $page, perPage: $perPage, search: $search, type: $type) {
      barcode
      createdAt
      isActive
      isPickable
      isReceivable
      id
      hazmatApproved
      level
      maxPallets
      maxVolume
      maxWeight
      name
      path
      temperatureControlled
      type
      updatedAt
      xCoordinate
      yCoordinate
      zCoordinate
      parentLocation {
        id
        name
        path
      }
      warehouse {
        address
        city
        name
        id
        isActive
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableLocationQuery,
	TableLocationQueryVariables
>;
export const SearchLocationsDocument = new TypedDocumentString(`
    query SearchLocations($search: String!) {
  wms {
    locations(search: $search, page: 1, perPage: 10) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchLocationsQuery,
	SearchLocationsQueryVariables
>;
export const AnalyticsLocationsDocument = new TypedDocumentString(`
    query AnalyticsLocations($from: Date, $to: Date) {
  wms {
    locations(from: $from, to: $to) {
      maxWeight
      maxVolume
      maxPallets
      type
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsLocationsQuery,
	AnalyticsLocationsQueryVariables
>;
export const UpdateOutboundShipmentItemDocument = new TypedDocumentString(`
    mutation UpdateOutboundShipmentItem($id: ID!, $outboundShipmentItem: UpdateOutboundShipmentItemInput!) {
  wms {
    updateOutboundShipmentItem(id: $id, value: $outboundShipmentItem) {
      id
      quantityShipped
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateOutboundShipmentItemMutation,
	UpdateOutboundShipmentItemMutationVariables
>;
export const RemoveOutboundShipmentItemDocument = new TypedDocumentString(`
    mutation RemoveOutboundShipmentItem($id: ID!) {
  wms {
    removeOutboundShipmentItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveOutboundShipmentItemMutation,
	RemoveOutboundShipmentItemMutationVariables
>;
export const CreateOutboundShipmentDocument = new TypedDocumentString(`
    mutation CreateOutboundShipment($outboundShipment: CreateOutboundShipmentInput!) {
  wms {
    createOutboundShipment(value: $outboundShipment) {
      id
      carrier
      trackingNumber
      status
      warehouseId
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateOutboundShipmentMutation,
	CreateOutboundShipmentMutationVariables
>;
export const UpdateOutboundShipmentDocument = new TypedDocumentString(`
    mutation UpdateOutboundShipment($id: ID!, $outboundShipment: UpdateOutboundShipmentInput!) {
  wms {
    updateOutboundShipment(id: $id, value: $outboundShipment) {
      id
      carrier
      trackingNumber
      status
      warehouseId
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateOutboundShipmentMutation,
	UpdateOutboundShipmentMutationVariables
>;
export const RemoveOutboundShipmentDocument = new TypedDocumentString(`
    mutation RemoveOutboundShipment($id: ID!) {
  wms {
    removeOutboundShipment(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveOutboundShipmentMutation,
	RemoveOutboundShipmentMutationVariables
>;
export const TableOutboundShipmentDocument = new TypedDocumentString(`
    query TableOutboundShipment($page: Int, $perPage: Int, $search: String, $status: OutboundShipmentStatus) {
  wms {
    outboundShipments(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
    ) {
      carrier
      createdAt
      id
      status
      trackingNumber
      updatedAt
      warehouseId
      salesOrder {
        id
        orderNumber
        shippingAddress
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableOutboundShipmentQuery,
	TableOutboundShipmentQueryVariables
>;
export const SearchOutboundShipmentsDocument = new TypedDocumentString(`
    query SearchOutboundShipments($search: String!) {
  wms {
    outboundShipments(search: $search, page: 1, perPage: 10) {
      value: id
      label: trackingNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchOutboundShipmentsQuery,
	SearchOutboundShipmentsQueryVariables
>;
export const AnalyticsOutboundShipmentsDocument = new TypedDocumentString(`
    query AnalyticsOutboundShipments($from: Date, $to: Date) {
  wms {
    outboundShipments(from: $from, to: $to) {
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsOutboundShipmentsQuery,
	AnalyticsOutboundShipmentsQueryVariables
>;
export const UpdatePackageItemDocument = new TypedDocumentString(`
    mutation UpdatePackageItem($id: ID!, $packageItem: UpdatePackageItemInput!) {
  wms {
    updatePackageItem(id: $id, value: $packageItem) {
      id
      quantity
      lotNumber
      serialNumbers
      expiryDate
      unitWeight
      totalWeight
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdatePackageItemMutation,
	UpdatePackageItemMutationVariables
>;
export const RemovePackageItemDocument = new TypedDocumentString(`
    mutation RemovePackageItem($id: ID!) {
  wms {
    removePackageItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemovePackageItemMutation,
	RemovePackageItemMutationVariables
>;
export const CreatePackageDocument = new TypedDocumentString(`
    mutation CreatePackage($package: CreatePackageInput!) {
  wms {
    createPackage(value: $package) {
      id
      packageNumber
      packageType
      weight
      length
      width
      height
      volume
      trackingNumber
      carrier
      serviceLevel
      packedAt
      shippedAt
      isFragile
      isHazmat
      requiresSignature
      insuranceValue
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreatePackageMutation,
	CreatePackageMutationVariables
>;
export const UpdatePackageDocument = new TypedDocumentString(`
    mutation UpdatePackage($id: ID!, $package: UpdatePackageInput!) {
  wms {
    updatePackage(id: $id, value: $package) {
      id
      packageNumber
      packageType
      weight
      length
      width
      height
      volume
      trackingNumber
      carrier
      serviceLevel
      packedAt
      shippedAt
      isFragile
      isHazmat
      requiresSignature
      insuranceValue
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdatePackageMutation,
	UpdatePackageMutationVariables
>;
export const RemovePackageDocument = new TypedDocumentString(`
    mutation RemovePackage($id: ID!) {
  wms {
    removePackage(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemovePackageMutation,
	RemovePackageMutationVariables
>;
export const TablePackageDocument = new TypedDocumentString(`
    query TablePackage($page: Int, $perPage: Int, $search: String) {
  wms {
    packages(page: $page, perPage: $perPage, search: $search) {
      carrier
      createdAt
      height
      id
      insuranceValue
      isFragile
      isHazmat
      length
      packageNumber
      packageType
      packedAt
      requiresSignature
      serviceLevel
      shippedAt
      trackingNumber
      updatedAt
      volume
      weight
      width
      items {
        lotNumber
        quantity
        product {
          barcode
          costPrice
          name
          sku
          status
        }
        serialNumbers
        totalWeight
        unitWeight
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TablePackageQuery,
	TablePackageQueryVariables
>;
export const SearchPackagesDocument = new TypedDocumentString(`
    query SearchPackages($search: String!) {
  wms {
    packages(search: $search, page: 1, perPage: 10) {
      value: id
      label: packageNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchPackagesQuery,
	SearchPackagesQueryVariables
>;
export const AnalyticsPackagesDocument = new TypedDocumentString(`
    query AnalyticsPackages($from: Date, $to: Date) {
  wms {
    packages(from: $from, to: $to) {
      weight
      length
      width
      height
      volume
      insuranceValue
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsPackagesQuery,
	AnalyticsPackagesQueryVariables
>;
export const UpdatePickBatchItemDocument = new TypedDocumentString(`
    mutation UpdatePickBatchItem($id: ID!, $pickBatchItem: UpdatePickBatchItemInput!) {
  wms {
    updatePickBatchItem(id: $id, value: $pickBatchItem) {
      id
      orderPriority
      estimatedPickTime
      actualPickTime
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdatePickBatchItemMutation,
	UpdatePickBatchItemMutationVariables
>;
export const RemovePickBatchItemDocument = new TypedDocumentString(`
    mutation RemovePickBatchItem($id: ID!) {
  wms {
    removePickBatchItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemovePickBatchItemMutation,
	RemovePickBatchItemMutationVariables
>;
export const CreatePickBatchDocument = new TypedDocumentString(`
    mutation CreatePickBatch($pickBatch: CreatePickBatchInput!) {
  wms {
    createPickBatch(value: $pickBatch) {
      id
      batchNumber
      status
      strategy
      priority
      waveId
      zoneRestrictions
      estimatedDuration
      actualDuration
      totalItems
      completedItems
      startedAt
      completedAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreatePickBatchMutation,
	CreatePickBatchMutationVariables
>;
export const UpdatePickBatchDocument = new TypedDocumentString(`
    mutation UpdatePickBatch($id: ID!, $pickBatch: UpdatePickBatchInput!) {
  wms {
    updatePickBatch(id: $id, value: $pickBatch) {
      id
      batchNumber
      status
      strategy
      priority
      waveId
      zoneRestrictions
      estimatedDuration
      actualDuration
      totalItems
      completedItems
      startedAt
      completedAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdatePickBatchMutation,
	UpdatePickBatchMutationVariables
>;
export const RemovePickBatchDocument = new TypedDocumentString(`
    mutation RemovePickBatch($id: ID!) {
  wms {
    removePickBatch(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemovePickBatchMutation,
	RemovePickBatchMutationVariables
>;
export const TablePickBatchDocument = new TypedDocumentString(`
    query TablePickBatch($page: Int, $perPage: Int, $search: String, $status: PickBatchStatus, $strategy: PickStrategy) {
  wms {
    pickBatches(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
      strategy: $strategy
    ) {
      actualDuration
      batchNumber
      completedAt
      completedItems
      createdAt
      estimatedDuration
      id
      priority
      startedAt
      status
      strategy
      totalItems
      updatedAt
      waveId
      zoneRestrictions
      items {
        id
        estimatedPickTime
        actualPickTime
        orderPriority
        salesOrder {
          status
          shippingAddress
          orderNumber
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TablePickBatchQuery,
	TablePickBatchQueryVariables
>;
export const SearchPickBatchesDocument = new TypedDocumentString(`
    query SearchPickBatches($search: String!) {
  wms {
    pickBatches(search: $search, page: 1, perPage: 10) {
      value: id
      label: batchNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchPickBatchesQuery,
	SearchPickBatchesQueryVariables
>;
export const AnalyticsPickBatchesDocument = new TypedDocumentString(`
    query AnalyticsPickBatches($from: Date, $to: Date) {
  wms {
    pickBatches(from: $from, to: $to) {
      priority
      estimatedDuration
      actualDuration
      totalItems
      completedItems
      status
      strategy
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsPickBatchesQuery,
	AnalyticsPickBatchesQueryVariables
>;
export const CreateWmsProductDocument = new TypedDocumentString(`
    mutation CreateWmsProduct($wmsProduct: CreateWmsProductInput!) {
  wms {
    createWmsProduct(value: $wmsProduct) {
      id
      name
      sku
      barcode
      description
      costPrice
      length
      width
      height
      volume
      weight
      status
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateWmsProductMutation,
	CreateWmsProductMutationVariables
>;
export const UpdateWmsProductDocument = new TypedDocumentString(`
    mutation UpdateWmsProduct($id: ID!, $wmsProduct: UpdateWmsProductInput!) {
  wms {
    updateWmsProduct(id: $id, value: $wmsProduct) {
      id
      name
      sku
      barcode
      description
      costPrice
      length
      width
      height
      volume
      weight
      status
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateWmsProductMutation,
	UpdateWmsProductMutationVariables
>;
export const RemoveWmsProductDocument = new TypedDocumentString(`
    mutation RemoveWmsProduct($id: ID!) {
  wms {
    removeWmsProduct(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveWmsProductMutation,
	RemoveWmsProductMutationVariables
>;
export const TableWmsProductDocument = new TypedDocumentString(`
    query TableWmsProduct($page: Int, $perPage: Int, $search: String, $status: ProductStatus) {
  wms {
    wmsProducts(page: $page, perPage: $perPage, search: $search, status: $status) {
      barcode
      costPrice
      createdAt
      height
      description
      id
      length
      name
      sku
      status
      updatedAt
      volume
      weight
      width
      supplier {
        contactPerson
        email
        name
        phoneNumber
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableWmsProductQuery,
	TableWmsProductQueryVariables
>;
export const SearchWmsProductsDocument = new TypedDocumentString(`
    query SearchWmsProducts($search: String!) {
  wms {
    wmsProducts(search: $search, page: 1, perPage: 10) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchWmsProductsQuery,
	SearchWmsProductsQueryVariables
>;
export const AnalyticsWmsProductsDocument = new TypedDocumentString(`
    query AnalyticsWmsProducts($from: Date, $to: Date) {
  wms {
    wmsProducts(from: $from, to: $to) {
      costPrice
      length
      width
      height
      volume
      weight
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsWmsProductsQuery,
	AnalyticsWmsProductsQueryVariables
>;
export const CreatePutawayRuleDocument = new TypedDocumentString(`
    mutation CreatePutawayRule($putawayRule: CreatePutawayRuleInput!) {
  wms {
    createPutawayRule(value: $putawayRule) {
      id
      locationType
      priority
      minQuantity
      maxQuantity
      weightThreshold
      volumeThreshold
      requiresTemperatureControl
      requiresHazmatApproval
      isActive
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreatePutawayRuleMutation,
	CreatePutawayRuleMutationVariables
>;
export const UpdatePutawayRuleDocument = new TypedDocumentString(`
    mutation UpdatePutawayRule($id: ID!, $putawayRule: UpdatePutawayRuleInput!) {
  wms {
    updatePutawayRule(id: $id, value: $putawayRule) {
      id
      locationType
      priority
      minQuantity
      maxQuantity
      weightThreshold
      volumeThreshold
      requiresTemperatureControl
      requiresHazmatApproval
      isActive
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdatePutawayRuleMutation,
	UpdatePutawayRuleMutationVariables
>;
export const RemovePutawayRuleDocument = new TypedDocumentString(`
    mutation RemovePutawayRule($id: ID!) {
  wms {
    removePutawayRule(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemovePutawayRuleMutation,
	RemovePutawayRuleMutationVariables
>;
export const TablePutawayRuleDocument = new TypedDocumentString(`
    query TablePutawayRule($page: Int, $perPage: Int, $locationType: LocationType) {
  wms {
    putawayRules(locationType: $locationType, page: $page, perPage: $perPage) {
      createdAt
      isActive
      id
      locationType
      maxQuantity
      minQuantity
      priority
      requiresHazmatApproval
      requiresTemperatureControl
      updatedAt
      volumeThreshold
      weightThreshold
      client {
        name
        industry
        country
        city
        website
        phoneNumber
      }
      product {
        barcode
        id
        costPrice
        description
        name
        sku
        status
      }
      warehouse {
        address
        city
        country
        name
        isActive
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TablePutawayRuleQuery,
	TablePutawayRuleQueryVariables
>;
export const AnalyticsPutawayRulesDocument = new TypedDocumentString(`
    query AnalyticsPutawayRules($from: Date, $to: Date) {
  wms {
    putawayRules(from: $from, to: $to) {
      priority
      minQuantity
      maxQuantity
      weightThreshold
      volumeThreshold
      locationType
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsPutawayRulesQuery,
	AnalyticsPutawayRulesQueryVariables
>;
export const CreateReorderPointDocument = new TypedDocumentString(`
    mutation CreateReorderPoint($reorderPoint: CreateReorderPointInput!) {
  wms {
    createReorderPoint(value: $reorderPoint) {
      id
      threshold
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateReorderPointMutation,
	CreateReorderPointMutationVariables
>;
export const UpdateReorderPointDocument = new TypedDocumentString(`
    mutation UpdateReorderPoint($id: ID!, $reorderPoint: UpdateReorderPointInput!) {
  wms {
    updateReorderPoint(id: $id, value: $reorderPoint) {
      id
      threshold
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateReorderPointMutation,
	UpdateReorderPointMutationVariables
>;
export const RemoveReorderPointDocument = new TypedDocumentString(`
    mutation RemoveReorderPoint($id: ID!) {
  wms {
    removeReorderPoint(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveReorderPointMutation,
	RemoveReorderPointMutationVariables
>;
export const TableReorderPointDocument = new TypedDocumentString(`
    query TableReorderPoint($page: Int, $perPage: Int) {
  wms {
    reorderPoints(page: $page, perPage: $perPage) {
      createdAt
      id
      threshold
      updatedAt
      product {
        barcode
        description
        costPrice
        id
        name
        sku
        status
      }
      warehouse {
        address
        city
        country
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableReorderPointQuery,
	TableReorderPointQueryVariables
>;
export const AnalyticsReorderPointsDocument = new TypedDocumentString(`
    query AnalyticsReorderPoints($from: Date, $to: Date) {
  wms {
    reorderPoints(from: $from, to: $to) {
      threshold
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsReorderPointsQuery,
	AnalyticsReorderPointsQueryVariables
>;
export const UpdateReturnItemDocument = new TypedDocumentString(`
    mutation UpdateReturnItem($id: ID!, $returnItem: UpdateReturnItemInput!) {
  wms {
    updateReturnItem(id: $id, value: $returnItem) {
      id
      quantityExpected
      quantityReceived
      quantityVariance
      condition
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateReturnItemMutation,
	UpdateReturnItemMutationVariables
>;
export const RemoveReturnItemDocument = new TypedDocumentString(`
    mutation RemoveReturnItem($id: ID!) {
  wms {
    removeReturnItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveReturnItemMutation,
	RemoveReturnItemMutationVariables
>;
export const CreateReturnDocument = new TypedDocumentString(`
    mutation CreateReturn($return: CreateReturnInput!) {
  wms {
    createReturn(value: $return) {
      id
      returnNumber
      status
      reason
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateReturnMutation,
	CreateReturnMutationVariables
>;
export const UpdateReturnDocument = new TypedDocumentString(`
    mutation UpdateReturn($id: ID!, $return: UpdateReturnInput!) {
  wms {
    updateReturn(id: $id, value: $return) {
      id
      returnNumber
      status
      reason
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateReturnMutation,
	UpdateReturnMutationVariables
>;
export const RemoveReturnDocument = new TypedDocumentString(`
    mutation RemoveReturn($id: ID!) {
  wms {
    removeReturn(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveReturnMutation,
	RemoveReturnMutationVariables
>;
export const TableReturnQueryDocument = new TypedDocumentString(`
    query TableReturnQuery($page: Int, $perPage: Int, $status: ReturnStatus, $search: String) {
  wms {
    returns(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      id
      reason
      returnNumber
      status
      updatedAt
      client {
        name
        phoneNumber
        industry
        country
        city
        website
      }
      salesOrder {
        orderNumber
        shippingAddress
        status
        updatedAt
        id
      }
      items {
        condition
        id
        quantityExpected
        quantityReceived
        quantityVariance
        product {
          barcode
          costPrice
          description
          id
          name
          sku
          status
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableReturnQueryQuery,
	TableReturnQueryQueryVariables
>;
export const SearchReturnsDocument = new TypedDocumentString(`
    query SearchReturns($search: String!) {
  wms {
    returns(search: $search, page: 1, perPage: 10) {
      value: id
      label: returnNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchReturnsQuery,
	SearchReturnsQueryVariables
>;
export const AnalyticsReturnsDocument = new TypedDocumentString(`
    query AnalyticsReturns($from: Date, $to: Date) {
  wms {
    returns(from: $from, to: $to) {
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsReturnsQuery,
	AnalyticsReturnsQueryVariables
>;
export const UpdateSalesOrderItemDocument = new TypedDocumentString(`
    mutation UpdateSalesOrderItem($id: ID!, $salesOrderItem: UpdateSalesOrderItemInput!) {
  wms {
    updateSalesOrderItem(id: $id, value: $salesOrderItem) {
      id
      quantityOrdered
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateSalesOrderItemMutation,
	UpdateSalesOrderItemMutationVariables
>;
export const RemoveSalesOrderItemDocument = new TypedDocumentString(`
    mutation RemoveSalesOrderItem($id: ID!) {
  wms {
    removeSalesOrderItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveSalesOrderItemMutation,
	RemoveSalesOrderItemMutationVariables
>;
export const CreateSalesOrderDocument = new TypedDocumentString(`
    mutation CreateSalesOrder($salesOrder: CreateSalesOrderInput!) {
  wms {
    createSalesOrder(value: $salesOrder) {
      id
      orderNumber
      status
      shippingAddress
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateSalesOrderMutation,
	CreateSalesOrderMutationVariables
>;
export const UpdateSalesOrderDocument = new TypedDocumentString(`
    mutation UpdateSalesOrder($id: ID!, $salesOrder: UpdateSalesOrderInput!) {
  wms {
    updateSalesOrder(id: $id, value: $salesOrder) {
      id
      orderNumber
      status
      shippingAddress
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateSalesOrderMutation,
	UpdateSalesOrderMutationVariables
>;
export const RemoveSalesOrderDocument = new TypedDocumentString(`
    mutation RemoveSalesOrder($id: ID!) {
  wms {
    removeSalesOrder(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveSalesOrderMutation,
	RemoveSalesOrderMutationVariables
>;
export const TableSalesOrderDocument = new TypedDocumentString(`
    query TableSalesOrder($page: Int, $perPage: Int, $search: String, $status: SalesOrderStatus) {
  wms {
    salesOrders(page: $page, perPage: $perPage, search: $search, status: $status) {
      createdAt
      id
      orderNumber
      shippingAddress
      status
      updatedAt
      items {
        id
        quantityOrdered
        updatedAt
        product {
          barcode
          id
          description
          name
          sku
          status
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableSalesOrderQuery,
	TableSalesOrderQueryVariables
>;
export const SearchSalesOrdersDocument = new TypedDocumentString(`
    query SearchSalesOrders($search: String!) {
  wms {
    salesOrders(search: $search, page: 1, perPage: 10) {
      value: id
      label: orderNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchSalesOrdersQuery,
	SearchSalesOrdersQueryVariables
>;
export const AnalyticsSalesOrdersDocument = new TypedDocumentString(`
    query AnalyticsSalesOrders($from: Date, $to: Date) {
  wms {
    salesOrders(from: $from, to: $to) {
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsSalesOrdersQuery,
	AnalyticsSalesOrdersQueryVariables
>;
export const CreateStockTransferDocument = new TypedDocumentString(`
    mutation CreateStockTransfer($stockTransfer: CreateStockTransferInput!) {
  wms {
    createStockTransfer(value: $stockTransfer) {
      id
      quantity
      status
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateStockTransferMutation,
	CreateStockTransferMutationVariables
>;
export const UpdateStockTransferDocument = new TypedDocumentString(`
    mutation UpdateStockTransfer($id: ID!, $stockTransfer: UpdateStockTransferInput!) {
  wms {
    updateStockTransfer(id: $id, value: $stockTransfer) {
      id
      quantity
      status
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateStockTransferMutation,
	UpdateStockTransferMutationVariables
>;
export const RemoveStockTransferDocument = new TypedDocumentString(`
    mutation RemoveStockTransfer($id: ID!) {
  wms {
    removeStockTransfer(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveStockTransferMutation,
	RemoveStockTransferMutationVariables
>;
export const TableStockTransferDocument = new TypedDocumentString(`
    query TableStockTransfer($page: Int, $perPage: Int, $status: StockTransferStatus) {
  wms {
    stockTransfers(page: $page, perPage: $perPage, status: $status) {
      createdAt
      id
      quantity
      status
      updatedAt
      destinationWarehouse {
        address
        city
        country
        id
        name
        timezone
        isActive
      }
      product {
        barcode
        costPrice
        name
        height
        sku
        status
      }
      sourceWarehouse {
        address
        country
        isActive
        name
        city
        id
        timezone
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableStockTransferQuery,
	TableStockTransferQueryVariables
>;
export const AnalyticsStockTransfersDocument = new TypedDocumentString(`
    query AnalyticsStockTransfers($from: Date, $to: Date) {
  wms {
    stockTransfers(from: $from, to: $to) {
      quantity
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsStockTransfersQuery,
	AnalyticsStockTransfersQueryVariables
>;
export const CreateSupplierDocument = new TypedDocumentString(`
    mutation CreateSupplier($supplier: CreateSupplierInput!) {
  wms {
    createSupplier(value: $supplier) {
      id
      name
      contactPerson
      email
      phoneNumber
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateSupplierMutation,
	CreateSupplierMutationVariables
>;
export const UpdateSupplierDocument = new TypedDocumentString(`
    mutation UpdateSupplier($id: ID!, $supplier: UpdateSupplierInput!) {
  wms {
    updateSupplier(id: $id, value: $supplier) {
      id
      name
      contactPerson
      email
      phoneNumber
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateSupplierMutation,
	UpdateSupplierMutationVariables
>;
export const RemoveSupplierDocument = new TypedDocumentString(`
    mutation RemoveSupplier($id: ID!) {
  wms {
    removeSupplier(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveSupplierMutation,
	RemoveSupplierMutationVariables
>;
export const TableSupplierDocument = new TypedDocumentString(`
    query TableSupplier($page: Int, $perPage: Int, $search: String) {
  wms {
    suppliers(page: $page, perPage: $perPage, search: $search) {
      contactPerson
      createdAt
      email
      id
      name
      phoneNumber
      updatedAt
      products {
        barcode
        id
        costPrice
        description
        name
        sku
        status
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableSupplierQuery,
	TableSupplierQueryVariables
>;
export const SearchSuppliersDocument = new TypedDocumentString(`
    query SearchSuppliers($search: String!) {
  wms {
    suppliers(search: $search, page: 1, perPage: 10) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchSuppliersQuery,
	SearchSuppliersQueryVariables
>;
export const UpdateTaskItemDocument = new TypedDocumentString(`
    mutation UpdateTaskItem($id: ID!, $taskItem: UpdateTaskItemInput!) {
  wms {
    updateTaskItem(id: $id, value: $taskItem) {
      id
      quantityRequired
      quantityCompleted
      quantityRemaining
      status
      lotNumber
      serialNumbers
      expiryDate
      notes
      completedAt
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateTaskItemMutation,
	UpdateTaskItemMutationVariables
>;
export const RemoveTaskItemDocument = new TypedDocumentString(`
    mutation RemoveTaskItem($id: ID!) {
  wms {
    removeTaskItem(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveTaskItemMutation,
	RemoveTaskItemMutationVariables
>;
export const CreateTaskDocument = new TypedDocumentString(`
    mutation CreateTask($task: CreateTaskInput!) {
  wms {
    createTask(value: $task) {
      id
      taskNumber
      type
      status
      priority
      sourceEntityId
      sourceEntityType
      estimatedDuration
      actualDuration
      instructions
      notes
      startTime
      endTime
      durationSeconds
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateTaskMutation,
	CreateTaskMutationVariables
>;
export const UpdateTaskDocument = new TypedDocumentString(`
    mutation UpdateTask($id: ID!, $task: UpdateTaskInput!) {
  wms {
    updateTask(id: $id, value: $task) {
      id
      taskNumber
      type
      status
      priority
      sourceEntityId
      sourceEntityType
      estimatedDuration
      actualDuration
      instructions
      notes
      startTime
      endTime
      durationSeconds
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateTaskMutation,
	UpdateTaskMutationVariables
>;
export const RemoveTaskDocument = new TypedDocumentString(`
    mutation RemoveTask($id: ID!) {
  wms {
    removeTask(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveTaskMutation,
	RemoveTaskMutationVariables
>;
export const TableTaskDocument = new TypedDocumentString(`
    query TableTask($page: Int, $perPage: Int, $search: String, $status: TaskStatus, $type: TaskType) {
  wms {
    tasks(
      page: $page
      perPage: $perPage
      search: $search
      status: $status
      type: $type
    ) {
      actualDuration
      createdAt
      durationSeconds
      endTime
      estimatedDuration
      id
      instructions
      notes
      priority
      sourceEntityId
      sourceEntityType
      startTime
      status
      taskNumber
      type
      updatedAt
      user {
        email
        id
        image
        name
      }
      warehouse {
        address
        city
        country
        id
        isActive
        name
        timezone
      }
      items {
        completedAt
        createdAt
        expiryDate
        id
        lotNumber
        notes
        quantityCompleted
        quantityRemaining
        quantityRequired
        serialNumbers
        status
        updatedAt
        product {
          barcode
          costPrice
          description
          id
          name
          sku
          status
        }
        sourceLocation {
          barcode
          hazmatApproved
          id
          path
          name
          type
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableTaskQuery,
	TableTaskQueryVariables
>;
export const SearchTasksDocument = new TypedDocumentString(`
    query SearchTasks($search: String!) {
  wms {
    tasks(search: $search, page: 1, perPage: 10) {
      value: id
      label: taskNumber
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchTasksQuery,
	SearchTasksQueryVariables
>;
export const AnalyticsTasksDocument = new TypedDocumentString(`
    query AnalyticsTasks($from: Date, $to: Date) {
  wms {
    tasks(from: $from, to: $to) {
      priority
      estimatedDuration
      actualDuration
      durationSeconds
      type
      status
    }
  }
}
    `) as unknown as TypedDocumentString<
	AnalyticsTasksQuery,
	AnalyticsTasksQueryVariables
>;
export const CreateWarehouseDocument = new TypedDocumentString(`
    mutation CreateWarehouse($warehouse: CreateWarehouseInput!) {
  wms {
    createWarehouse(value: $warehouse) {
      id
      name
      address
      city
      state
      postalCode
      country
      timezone
      contactPerson
      contactEmail
      contactPhone
      isActive
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	CreateWarehouseMutation,
	CreateWarehouseMutationVariables
>;
export const UpdateWarehouseDocument = new TypedDocumentString(`
    mutation UpdateWarehouse($id: ID!, $warehouse: UpdateWarehouseInput!) {
  wms {
    updateWarehouse(id: $id, value: $warehouse) {
      id
      name
      address
      city
      state
      postalCode
      country
      timezone
      contactPerson
      contactEmail
      contactPhone
      isActive
      createdAt
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<
	UpdateWarehouseMutation,
	UpdateWarehouseMutationVariables
>;
export const RemoveWarehouseDocument = new TypedDocumentString(`
    mutation RemoveWarehouse($id: ID!) {
  wms {
    removeWarehouse(id: $id) {
      success
      numDeletedRows
    }
  }
}
    `) as unknown as TypedDocumentString<
	RemoveWarehouseMutation,
	RemoveWarehouseMutationVariables
>;
export const TableWarehouseDocument = new TypedDocumentString(`
    query TableWarehouse($page: Int, $perPage: Int, $search: String) {
  wms {
    warehouses(page: $page, perPage: $perPage, search: $search) {
      address
      city
      contactEmail
      contactPerson
      contactPhone
      country
      createdAt
      id
      isActive
      name
      postalCode
      state
      timezone
      updatedAt
      tasks {
        instructions
        id
        notes
        priority
        taskNumber
        type
        user {
          email
          id
          image
          name
        }
      }
      locations {
        barcode
        id
        isActive
        isPickable
        isReceivable
        level
        maxPallets
        maxVolume
        maxWeight
        name
        path
        type
        xCoordinate
        yCoordinate
        zCoordinate
        hazmatApproved
      }
      inboundShipments {
        status
        updatedAt
        warehouseId
        items {
          discrepancyNotes
          discrepancyQuantity
          expectedQuantity
          id
          createdAt
          receivedQuantity
          updatedAt
          product {
            barcode
            costPrice
            description
            id
            name
            sku
            status
          }
          inboundShipment {
            status
            id
            expectedArrivalDate
            updatedAt
            actualArrivalDate
            client {
              city
              country
              id
              industry
              name
              phoneNumber
            }
          }
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<
	TableWarehouseQuery,
	TableWarehouseQueryVariables
>;
export const SearchWarehousesDocument = new TypedDocumentString(`
    query SearchWarehouses($search: String!) {
  wms {
    warehouses(search: $search, page: 1, perPage: 10) {
      value: id
      label: name
    }
  }
}
    `) as unknown as TypedDocumentString<
	SearchWarehousesQuery,
	SearchWarehousesQueryVariables
>;
