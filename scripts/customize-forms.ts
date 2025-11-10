#!/usr/bin/env node

/**
 * Form Customization Script (TypeScript)
 * Automatically generates form files for all entities following the companies.tsx pattern
 *
 * Pattern:
 * - MutationSchema: Zod schema for form validation
 * - CreateFormOptionFactory: TanStack form options for create forms
 * - UpdateFormOptionFactory: TanStack form options for update forms
 * - EntityForm: Main form component with fields
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface FieldConfig {
  name: string;
  type:
    | "text"
    | "email"
    | "number"
    | "date"
    | "datetime"
    | "textarea"
    | "select"
    | "relation";
  required: boolean;
  group: string;
  tooltip: string;
  fieldDescription: string;
  options?: string[];
  // Relation-specific properties
  collectionName?: string;
  displayField?: string;
  recordType?: string; // Type-safe record type for generics (e.g., "UsersResponse")
  renderOption?: string; // code template for renderOption
  expand?: string; // expand relations (e.g., "tenant.user")
}

interface EntityConfig {
  schema: string;
  entity: string;
  enum: string;
  description: string;
  fields: FieldConfig[];
}

interface FormTemplateOptions {
  entity: string;
  enumName: string;
  schema: string;
  pascalEntity: string;
  schemaImport: string;
  fields: FieldConfig[];
}

// ============================================================================
// ENTITY CONFIGURATIONS
// ============================================================================

const ENTITY_CONFIGS: Record<string, EntityConfig> = {
  "customer-relations/leads": {
    schema: "customer-relations",
    entity: "Lead",
    enum: "CustomerRelationsLeads",
    description:
      "Manages sales leads with contact information, scoring, and source tracking for customer acquisition",
    fields: [
      {
        name: "name",
        type: "text",
        required: false,
        group: "Basic Information",
        tooltip: "e.g., 'John Doe', 'ABC Corp'",
        fieldDescription: "The name of the lead",
      },
      {
        name: "email",
        type: "email",
        required: false,
        group: "Contact Information",
        tooltip: "e.g., 'john@example.com'",
        fieldDescription: "Primary email address for contact",
      },
      {
        name: "score",
        type: "number",
        required: true,
        group: "Lead Qualification",
        tooltip: "e.g., 1-100",
        fieldDescription: "Lead score for prioritization",
      },
      {
        name: "source",
        type: "select",
        required: false,
        group: "Lead Source",
        tooltip: "Where the lead came from",
        fieldDescription: "Source channel for this lead",
        options: [
          "website",
          "referral",
          "social-media",
          "email-campaign",
          "cold-call",
          "event",
          "advertisment",
          "partner",
          "other",
        ],
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Lead Status",
        tooltip: "Current state of the lead",
        fieldDescription: "Current status in the sales pipeline",
        options: ["new", "contacted", "qualified", "unqualified", "converted"],
      },
      {
        name: "campaign",
        type: "relation",
        required: false,
        group: "Campaign",
        tooltip: "e.g., 'Campaign ID or name'",
        fieldDescription: "Associated campaign if applicable",
        collectionName: "Collections.CustomerRelationsCampaigns",
        displayField: "name",
        recordType: "CustomerRelationsCampaignsResponse",
      },
      {
        name: "owner",
        type: "relation",
        required: true,
        group: "Ownership",
        tooltip: "e.g., 'Sales rep ID'",
        fieldDescription: "Sales representative assigned to this lead",
        collectionName: "Collections.Users",
        displayField: "name",
        recordType: "UsersResponse",
      },
      {
        name: "convertedAt",
        type: "date",
        required: false,
        group: "Conversion",
        tooltip: "e.g., '2024-01-15'",
        fieldDescription: "Date when lead was converted",
      },
      {
        name: "convertedCompany",
        type: "relation",
        required: false,
        group: "Conversion",
        tooltip: "e.g., 'Company ID'",
        fieldDescription: "Company created from this lead",
        collectionName: "Collections.CustomerRelationsCompanies",
        displayField: "name",
        recordType: "CustomerRelationsCompaniesResponse",
      },
      {
        name: "convertedContact",
        type: "relation",
        required: false,
        group: "Conversion",
        tooltip: "e.g., 'Contact ID'",
        fieldDescription: "Contact created from this lead",
        collectionName: "Collections.CustomerRelationsContacts",
        displayField: "name",
        recordType: "CustomerRelationsContactsResponse",
      },
      {
        name: "convertedOpportunity",
        type: "relation",
        required: false,
        group: "Conversion",
        tooltip: "e.g., 'Opportunity ID'",
        fieldDescription: "Opportunity created from this lead",
        collectionName: "Collections.CustomerRelationsOpportunities",
        displayField: "name",
        recordType: "CustomerRelationsOpportunitiesResponse",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Media",
        tooltip: "File names separated by comma",
        fieldDescription: "Lead attachments (documents, images, etc.)",
      },
    ],
  },

  "customer-relations/contacts": {
    schema: "customer-relations",
    entity: "Contact",
    enum: "CustomerRelationsContacts",
    description:
      "Stores contact details and professional information for individuals within customer organizations",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Jane Smith'",
        fieldDescription: "Full name of the contact",
      },
      {
        name: "email",
        type: "email",
        required: true,
        group: "Contact Information",
        tooltip: "e.g., 'jane@company.com'",
        fieldDescription: "Email address for contact",
      },
      {
        name: "phoneNumber",
        type: "text",
        required: false,
        group: "Contact Information",
        tooltip: "e.g., '+1234567890'",
        fieldDescription: "Phone number for contact",
      },
      {
        name: "jobTitle",
        type: "text",
        required: false,
        group: "Professional Information",
        tooltip: "e.g., 'Sales Manager', 'CTO'",
        fieldDescription: "Job title or position",
      },
      {
        name: "company",
        type: "relation",
        required: false,
        group: "Professional Information",
        tooltip: "e.g., 'Company ID'",
        fieldDescription: "Associated company",
        collectionName: "Collections.CustomerRelationsCompanies",
        displayField: "name",
        recordType: "CustomerRelationsCompaniesResponse",
      },
      {
        name: "owner",
        type: "relation",
        required: true,
        group: "Ownership",
        tooltip: "e.g., 'User ID'",
        fieldDescription: "Account owner or manager",
        collectionName: "Collections.Users",
        displayField: "name",
        recordType: "UsersResponse",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Media",
        tooltip: "File names separated by comma",
        fieldDescription: "Contact attachments (documents, photos, etc.)",
      },
    ],
  },

  "customer-relations/interactions": {
    schema: "customer-relations",
    entity: "Interaction",
    enum: "CustomerRelationsInteractions",
    description:
      "Records all customer interactions including calls, meetings, emails, and notes for relationship tracking",
    fields: [
      {
        name: "contact",
        type: "relation",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'Contact ID'",
        fieldDescription: "Contact involved in this interaction",
        collectionName: "Collections.CustomerRelationsContacts",
        displayField: "name",
        recordType: "CustomerRelationsContactsResponse",
      },
      {
        name: "type",
        type: "select",
        required: false,
        group: "Interaction Type",
        tooltip: "Type of interaction",
        fieldDescription: "How the interaction occurred",
        options: ["call", "meeting", "email", "text"],
      },
      {
        name: "interactionDate",
        type: "datetime",
        required: true,
        group: "Timing",
        tooltip: "When the interaction occurred",
        fieldDescription: "Date and time of interaction",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Discussed pricing options...'",
        fieldDescription: "Detailed notes about the interaction",
      },
      {
        name: "outcome",
        type: "text",
        required: false,
        group: "Results",
        tooltip: "e.g., 'Agreement reached', 'Follow-up needed'",
        fieldDescription: "Outcome or result of interaction",
      },
      {
        name: "user",
        type: "relation",
        required: true,
        group: "Ownership",
        tooltip: "e.g., 'User ID'",
        fieldDescription: "User who recorded this interaction",
        collectionName: "Collections.Users",
        displayField: "name",
        recordType: "UsersResponse",
      },
      {
        name: "case",
        type: "relation",
        required: false,
        group: "Association",
        tooltip: "e.g., 'Case ID'",
        fieldDescription: "Associated case if applicable",
        collectionName: "Collections.CustomerRelationsCases",
        displayField: "caseNumber",
        recordType: "CustomerRelationsCasesResponse",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Media",
        tooltip: "File names separated by comma",
        fieldDescription:
          "Interaction attachments (recordings, transcripts, etc.)",
      },
    ],
  },

  "customer-relations/products": {
    schema: "customer-relations",
    entity: "Product",
    enum: "CustomerRelationsProducts",
    description:
      "Defines products and services offered to customers with pricing and classification",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Premium Shipping', 'Storage Service'",
        fieldDescription: "Product or service name",
      },
      {
        name: "sku",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'PROD-001', 'SKU-12345'",
        fieldDescription: "Stock keeping unit or product code",
      },
      {
        name: "price",
        type: "number",
        required: true,
        group: "Pricing",
        tooltip: "e.g., '99.99', '500'",
        fieldDescription: "Base price of the product",
      },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Classification",
        tooltip: "Product type",
        fieldDescription: "Category of product",
        options: ["service", "good", "digital", "subscription"],
      },
      {
        name: "description",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'High-performance logistics service...'",
        fieldDescription: "Detailed description of the product",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Media",
        tooltip: "File names separated by comma",
        fieldDescription: "Product attachments (images, specs, etc.)",
      },
    ],
  },

  "customer-relations/campaigns": {
    schema: "customer-relations",
    entity: "Campaign",
    enum: "CustomerRelationsCampaigns",
    description:
      "Manages marketing and sales campaigns with budget allocation and time tracking",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Q1 2024 Campaign', 'Summer Promo'",
        fieldDescription: "Campaign name",
      },
      {
        name: "budget",
        type: "number",
        required: true,
        group: "Financials",
        tooltip: "e.g., '5000', '10000'",
        fieldDescription: "Total budget allocated for campaign",
      },
      {
        name: "startDate",
        type: "date",
        required: false,
        group: "Timeline",
        tooltip: "e.g., '2024-01-01'",
        fieldDescription: "Campaign start date",
      },
      {
        name: "endDate",
        type: "date",
        required: false,
        group: "Timeline",
        tooltip: "e.g., '2024-03-31'",
        fieldDescription: "Campaign end date",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Media",
        tooltip: "File names separated by comma",
        fieldDescription: "Campaign attachments (documents, materials, etc.)",
      },
    ],
  },

  "customer-relations/opportunities": {
    schema: "customer-relations",
    entity: "Opportunity",
    enum: "CustomerRelationsOpportunities",
    description:
      "Tracks sales opportunities with deal values, stages, and forecasting information",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Enterprise Contract'",
        fieldDescription: "Opportunity name",
      },
      {
        name: "company",
        type: "relation",
        required: false,
        group: "Related Records",
        tooltip: "e.g., 'Company ID'",
        fieldDescription: "Company associated with this opportunity",
        collectionName: "Collections.CustomerRelationsCompanies",
        displayField: "name",
        recordType: "CustomerRelationsCompaniesResponse",
      },
      {
        name: "contact",
        type: "relation",
        required: false,
        group: "Related Records",
        tooltip: "e.g., 'Contact ID'",
        fieldDescription: "Primary contact for this opportunity",
        collectionName: "Collections.CustomerRelationsContacts",
        displayField: "name",
        recordType: "CustomerRelationsContactsResponse",
      },
      {
        name: "dealValue",
        type: "number",
        required: false,
        group: "Financials",
        tooltip: "e.g., '50000', '250000'",
        fieldDescription: "Estimated deal value",
      },
      {
        name: "stage",
        type: "select",
        required: false,
        group: "Pipeline",
        tooltip: "Current sales stage",
        fieldDescription: "Where in the sales pipeline this opportunity is",
        options: [
          "prospecting",
          "qualification",
          "need-analysis",
          "demo",
          "proposal",
          "negotiation",
          "closed-won",
          "closed-lost",
        ],
      },
      {
        name: "probability",
        type: "number",
        required: false,
        group: "Forecast",
        tooltip: "e.g., '25', '75', '90'",
        fieldDescription: "Probability of closing (0-100)",
      },
      {
        name: "source",
        type: "select",
        required: true,
        group: "Source",
        tooltip: "How opportunity was sourced",
        fieldDescription: "Source of the opportunity",
        options: [
          "website",
          "referral",
          "social-media",
          "email-campaign",
          "cold-call",
          "event",
          "advertisment",
          "partner",
          "existing-customer",
          "other",
        ],
      },
      {
        name: "expectedCloseDate",
        type: "date",
        required: false,
        group: "Timeline",
        tooltip: "e.g., '2024-03-31'",
        fieldDescription: "Expected close date",
      },
      {
        name: "owner",
        type: "relation",
        required: true,
        group: "Ownership",
        tooltip: "e.g., 'User ID'",
        fieldDescription: "Sales representative owner",
        collectionName: "Collections.Users",
        displayField: "name",
        recordType: "UsersResponse",
      },
      {
        name: "lostReason",
        type: "textarea",
        required: false,
        group: "Pipeline",
        tooltip: "e.g., 'Price too high', 'Competitor won'",
        fieldDescription: "Reason for losing the opportunity",
      },
      {
        name: "products",
        type: "text",
        required: false,
        group: "Products",
        tooltip: "Product IDs separated by comma",
        fieldDescription: "Products associated with this opportunity",
      },
      {
        name: "campaign",
        type: "relation",
        required: false,
        group: "Campaign",
        tooltip: "e.g., 'Campaign ID'",
        fieldDescription: "Associated campaign if applicable",
        collectionName: "Collections.CustomerRelationsCampaigns",
        displayField: "name",
        recordType: "CustomerRelationsCampaignsResponse",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Media",
        tooltip: "File names separated by comma",
        fieldDescription:
          "Opportunity attachments (proposals, contracts, etc.)",
      },
    ],
  },

  "customer-relations/invoices": {
    schema: "customer-relations",
    entity: "Invoice",
    enum: "CustomerRelationsInvoices",
    description:
      "Manages invoicing with payment tracking, discounts, and financial reconciliation",
    fields: [
      {
        name: "invoiceNumber",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'INV-2024-001'",
        fieldDescription: "Unique invoice number",
      },
      {
        name: "opportunity",
        type: "relation",
        required: false,
        group: "Related Records",
        tooltip: "e.g., 'Opportunity ID'",
        fieldDescription: "Associated opportunity if applicable",
        collectionName: "Collections.CustomerRelationsOpportunities",
        displayField: "name",
        recordType: "CustomerRelationsOpportunitiesResponse",
      },
      {
        name: "issueDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2024-01-15'",
        fieldDescription: "Invoice issuance date",
      },
      {
        name: "dueDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2024-02-15'",
        fieldDescription: "Payment due date",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Current invoice status",
        fieldDescription: "Payment status",
        options: ["draft", "sent", "paid", "overdue", "cancelled"],
      },
      {
        name: "total",
        type: "number",
        required: false,
        group: "Amounts",
        tooltip: "e.g., '1100.00'",
        fieldDescription: "Total invoice amount",
      },
      {
        name: "discountAmount",
        type: "number",
        required: false,
        group: "Discounts",
        tooltip: "e.g., '100.00'",
        fieldDescription: "Total discount amount",
      },
      {
        name: "paymentMethod",
        type: "select",
        required: false,
        group: "Payment",
        tooltip: "Payment method used",
        fieldDescription: "Payment method for this invoice",
        options: [
          "credit-card",
          "bank-transfer",
          "cash",
          "check",
          "paypal",
          "stripe",
          "wire-transfer",
          "other",
          "maya",
          "gcash",
        ],
      },
      {
        name: "sentAt",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2024-01-15'",
        fieldDescription: "Date invoice was sent",
      },
      {
        name: "paidAt",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2024-01-28'",
        fieldDescription: "Date payment was received",
      },
      {
        name: "items",
        type: "text",
        required: false,
        group: "Items",
        tooltip: "Line item IDs separated by comma",
        fieldDescription: "Invoice line items",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Media",
        tooltip: "File names separated by comma",
        fieldDescription: "Invoice attachments (PDFs, receipts, etc.)",
      },
    ],
  },

  // ============= BILLING MANAGEMENT =============
  "billing-management/rate-cards": {
    schema: "billing-management",
    entity: "RateCard",
    enum: "BillingManagementRateCards",
    description:
      "Defines pricing rate cards for various services (shipping, storage, fulfillment, etc.) with validity periods and active status",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Standard Shipping 2024', 'Express Fulfillment'",
        fieldDescription: "A unique name identifying this rate card",
      },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Classification",
        tooltip: "e.g., shipping, storage, fulfillment, handling",
        fieldDescription: "The service category this rate card applies to",
        options: [
          "shipping",
          "storage",
          "fulfillment",
          "handling",
          "insurance",
          "customs",
          "packaging",
          "returns",
        ],
      },
      {
        name: "isActive",
        type: "text",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription:
          "Mark whether this rate card is currently in use for billing",
      },
      {
        name: "description",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Applies to domestic shipments under 50kg'",
        fieldDescription:
          "Additional information about the purpose and terms of this rate card",
      },
      {
        name: "validFrom",
        type: "date",
        required: false,
        group: "Validity",
        tooltip: "e.g., '2024-01-01'",
        fieldDescription: "The date when this rate card becomes effective",
      },
      {
        name: "validTo",
        type: "date",
        required: false,
        group: "Validity",
        tooltip: "e.g., '2024-12-31'",
        fieldDescription:
          "The date when this rate card expires or becomes inactive",
      },
    ],
  },

  "billing-management/surcharges": {
    schema: "billing-management",
    entity: "Surcharge",
    enum: "BillingManagementSurcharges",
    description:
      "Defines additional charges that can be applied to services such as fuel surcharges, handling fees, or seasonal premiums with calculation methods and validity dates",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Fuel Surcharge 2024', 'Holiday Premium'",
        fieldDescription: "A descriptive name for this surcharge",
      },
      {
        name: "calculationMethod",
        type: "select",
        required: true,
        group: "Calculation",
        tooltip: "e.g., percentage, fixed, per-unit, sliding-scale",
        fieldDescription: "The method used to calculate the surcharge amount",
        options: ["percentage", "fixed", "per-unit", "sliding-scale"],
      },
      {
        name: "amount",
        type: "number",
        required: false,
        group: "Amount",
        tooltip: "e.g., 5.5, 10, 25.75",
        fieldDescription:
          "The fixed surcharge amount (for fixed calculation method)",
      },
      {
        name: "isActive",
        type: "text",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription:
          "Mark whether this surcharge is currently being applied",
      },
      {
        name: "description",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Applied when fuel prices exceed $3 per liter'",
        fieldDescription:
          "Detailed explanation of when and why this surcharge is applied",
      },
      {
        name: "validFrom",
        type: "date",
        required: false,
        group: "Validity",
        tooltip: "e.g., '2024-01-01'",
        fieldDescription:
          "The start date when this surcharge becomes effective",
      },
      {
        name: "validTo",
        type: "date",
        required: false,
        group: "Validity",
        tooltip: "e.g., '2024-12-31'",
        fieldDescription:
          "The end date when this surcharge expires or becomes inactive",
      },
    ],
  },

  // ============= TRANSPORT MANAGEMENT =============
  "transport-management/drivers": {
    schema: "transport-management",
    entity: "Driver",
    enum: "TransportManagementDrivers",
    description:
      "Records driver information including license details, operational status, and expiry dates for fleet management",
    fields: [
      {
        name: "licenseNumber",
        type: "text",
        required: true,
        group: "License Information",
        tooltip: "e.g., 'DL123456789'",
        fieldDescription: "Driver's license number",
      },
      {
        name: "licenseExpiryDate",
        type: "date",
        required: false,
        group: "License Information",
        tooltip: "e.g., '2025-12-31'",
        fieldDescription: "Date when driver's license expires",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "Current operational status",
        fieldDescription: "Driver's current status",
        options: ["active", "inactive", "on-leave"],
      },
      {
        name: "user",
        type: "relation",
        required: false,
        group: "User Account",
        tooltip: "e.g., 'User ID'",
        fieldDescription: "Associated user account for this driver",
        collectionName: "Collections.Users",
        displayField: "name",
        recordType: "UsersResponse",
      },
    ],
  },

  "transport-management/vehicles": {
    schema: "transport-management",
    entity: "Vehicle",
    enum: "TransportManagementVehicles",
    description:
      "Manages fleet vehicles with registration, capacity, and operational status tracking",
    fields: [
      {
        name: "registrationNumber",
        type: "text",
        required: true,
        group: "Registration",
        tooltip: "e.g., 'ABC-1234'",
        fieldDescription: "Vehicle registration or license plate number",
      },
      {
        name: "model",
        type: "text",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Toyota Hiace', 'Isuzu NPR'",
        fieldDescription: "Vehicle model and make",
      },
      {
        name: "capacityWeight",
        type: "number",
        required: false,
        group: "Capacity",
        tooltip: "e.g., '2000', '5000'",
        fieldDescription: "Maximum weight capacity in kg",
      },
      {
        name: "capacityVolume",
        type: "number",
        required: false,
        group: "Capacity",
        tooltip: "e.g., '20', '50'",
        fieldDescription: "Maximum volume capacity in cubic meters",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "Current vehicle status",
        fieldDescription: "Operational status of the vehicle",
        options: ["available", "in-maintenance", "on-trip", "out-of-service"],
      },
    ],
  },

  "transport-management/trips": {
    schema: "transport-management",
    entity: "Trip",
    enum: "TransportManagementTrips",
    description:
      "Tracks delivery trips with driver and vehicle assignments, route progress, and status updates",
    fields: [
      {
        name: "driver",
        type: "relation",
        required: true,
        group: "Assignment",
        tooltip: "e.g., 'Driver ID'",
        fieldDescription: "Driver assigned to this trip",
        collectionName: "Collections.TransportManagementDrivers",
        displayField: "licenseNumber",
        recordType: "TransportManagementDriversResponse",
      },
      {
        name: "vehicle",
        type: "relation",
        required: true,
        group: "Assignment",
        tooltip: "e.g., 'Vehicle ID'",
        fieldDescription: "Vehicle assigned to this trip",
        collectionName: "Collections.TransportManagementVehicles",
        displayField: "registrationNumber",
        recordType: "TransportManagementVehiclesResponse",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "Current trip status",
        fieldDescription: "Current status of the trip",
        options: ["planned", "in-progress", "completed", "cancelled"],
      },
    ],
  },

  // ============= WAREHOUSE MANAGEMENT =============
  "warehouse-management/products": {
    schema: "warehouse-management",
    entity: "Product",
    enum: "WarehouseManagementProducts",
    description:
      "Catalogs warehouse products with SKU, dimensions, weight, and supplier information for inventory management",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Electronic Component A', 'Office Chair'",
        fieldDescription: "Product name",
      },
      {
        name: "sku",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'SKU-12345', 'PROD-001'",
        fieldDescription: "Stock keeping unit / product code",
      },
      {
        name: "barcode",
        type: "text",
        required: false,
        group: "Identification",
        tooltip: "e.g., '1234567890123'",
        fieldDescription: "Barcode for product tracking",
      },
      {
        name: "description",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'High-quality industrial component'",
        fieldDescription: "Detailed product description",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select product status",
        fieldDescription: "Current product status",
        options: ["active", "inactive", "discontinued", "archived"],
      },
      {
        name: "length",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., '30', '100'",
        fieldDescription: "Product length in cm",
      },
      {
        name: "width",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., '20', '50'",
        fieldDescription: "Product width in cm",
      },
      {
        name: "height",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., '15', '40'",
        fieldDescription: "Product height in cm",
      },
      {
        name: "weight",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., '2.5', '10.75'",
        fieldDescription: "Product weight in kg",
      },
      {
        name: "costPrice",
        type: "number",
        required: false,
        group: "Pricing",
        tooltip: "e.g., '100', '500.50'",
        fieldDescription: "Cost price of the product",
      },
      {
        name: "client",
        type: "relation",
        required: false,
        group: "Association",
        tooltip: "Select client",
        fieldDescription: "Associated client company",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "supplier",
        type: "relation",
        required: false,
        group: "Association",
        tooltip: "Select supplier",
        fieldDescription: "Associated supplier",
        collectionName: "warehouse_management_suppliers",
        displayField: "name",
        recordType: "WarehouseManagementSuppliersResponse",
      },
      {
        name: "images",
        type: "text",
        required: false,
        group: "Media",
        tooltip: "File names separated by comma",
        fieldDescription: "Product images",
      },
    ],
  },

  "warehouse-management/warehouses": {
    schema: "warehouse-management",
    entity: "Warehouse",
    enum: "WarehouseManagementWarehouses",
    description:
      "Manages warehouse locations with address, contact details, and operational information",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Main Warehouse', 'Regional Hub - Manila'",
        fieldDescription: "Warehouse name or identifier",
      },
      {
        name: "address",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., '123 Business Street'",
        fieldDescription: "Street address of the warehouse",
      },
      {
        name: "city",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., 'Manila', 'Cebu'",
        fieldDescription: "City where warehouse is located",
      },
      {
        name: "state",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., 'NCR', 'Calabarzon'",
        fieldDescription: "State or province",
      },
      {
        name: "country",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., 'Philippines'",
        fieldDescription: "Country",
      },
      {
        name: "postalCode",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., '1200'",
        fieldDescription: "Postal or zip code",
      },
      {
        name: "timezone",
        type: "text",
        required: false,
        group: "Operations",
        tooltip: "e.g., 'Asia/Manila'",
        fieldDescription: "Warehouse timezone for scheduling",
      },
      {
        name: "contactPerson",
        type: "text",
        required: false,
        group: "Contact",
        tooltip: "e.g., 'John Manager'",
        fieldDescription: "Primary contact person",
      },
      {
        name: "contactPhone",
        type: "text",
        required: false,
        group: "Contact",
        tooltip: "e.g., '+63 2 1234 5678'",
        fieldDescription: "Contact phone number",
      },
      {
        name: "contactEmail",
        type: "email",
        required: false,
        group: "Contact",
        tooltip: "e.g., 'warehouse@company.com'",
        fieldDescription: "Contact email address",
      },
      {
        name: "isActive",
        type: "text",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether this warehouse is currently active",
      },
      {
        name: "location",
        type: "text",
        required: false,
        group: "Geolocation",
        tooltip: "e.g., 'latitude,longitude'",
        fieldDescription: "Geographic coordinates (GeoPoint)",
      },
      {
        name: "images",
        type: "text",
        required: false,
        group: "Media",
        tooltip: "File names separated by comma",
        fieldDescription: "Warehouse photos or images",
      },
    ],
  },

  "warehouse-management/locations": {
    schema: "warehouse-management",
    entity: "Location",
    enum: "WarehouseManagementLocations",
    description:
      "Defines storage locations within warehouses with bin designations, capacity limits, and environmental conditions",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'A-01-01', 'HIGH-SHELF-B'",
        fieldDescription: "Location identifier or bin code",
      },
      {
        name: "warehouse",
        type: "relation",
        required: false,
        group: "Association",
        tooltip: "Select warehouse",
        fieldDescription: "Parent warehouse for this location",
        collectionName: "warehouse_management_warehouses",
        displayField: "name",
        recordType: "WarehouseManagementWarehousesResponse",
      },
      {
        name: "type",
        type: "select",
        required: false,
        group: "Classification",
        tooltip: "Type of storage location",
        fieldDescription: "Category of this location",
        options: [
          "receiving-dock",
          "pick-bin",
          "packing-station",
          "cross-dock-area",
          "bulk-storage",
          "reserve-storage",
          "damaged-goods",
          "staging-area",
          "quality-control",
          "returns-area",
        ],
      },
      {
        name: "barcode",
        type: "text",
        required: false,
        group: "Identification",
        tooltip: "e.g., '9876543210'",
        fieldDescription: "Barcode for location tracking",
      },
      {
        name: "level",
        type: "number",
        required: false,
        group: "Physical Layout",
        tooltip: "e.g., '1', '2', '3'",
        fieldDescription: "Warehouse level or floor number",
      },
      {
        name: "maxWeight",
        type: "number",
        required: false,
        group: "Capacity",
        tooltip: "e.g., '1000', '5000'",
        fieldDescription: "Maximum weight capacity in kg",
      },
      {
        name: "maxVolume",
        type: "number",
        required: false,
        group: "Capacity",
        tooltip: "e.g., '10', '50'",
        fieldDescription: "Maximum volume capacity in cubic meters",
      },
      {
        name: "maxPallets",
        type: "number",
        required: false,
        group: "Capacity",
        tooltip: "e.g., '10', '25'",
        fieldDescription: "Maximum number of pallets this location can hold",
      },
      {
        name: "temperatureControlled",
        type: "text",
        required: false,
        group: "Environmental",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether this location has temperature control",
      },
      {
        name: "hazmatApproved",
        type: "text",
        required: false,
        group: "Environmental",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription:
          "Whether this location is approved for hazardous materials",
      },
      {
        name: "isActive",
        type: "text",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether this location is available for use",
      },
      {
        name: "isPickable",
        type: "text",
        required: false,
        group: "Operations",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether orders can be picked from this location",
      },
      {
        name: "isReceivable",
        type: "text",
        required: false,
        group: "Operations",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether items can be received into this location",
      },
      {
        name: "parentLocation",
        type: "relation",
        required: false,
        group: "Hierarchy",
        tooltip: "Select parent location",
        fieldDescription: "Parent location if this is a sub-location",
        collectionName: "warehouse_management_locations",
        displayField: "name",
        recordType: "WarehouseManagementLocationsResponse",
      },
    ],
  },

  // ============= BILLING MANAGEMENT (REMAINING) =============
  "billing-management/client-accounts": {
    schema: "billing-management",
    entity: "ClientAccount",
    enum: "BillingManagementClientAccounts",
    description:
      "Tracks credit accounts for clients with credit limits, available credit, and payment history",
    fields: [
      {
        name: "client",
        type: "relation",
        required: false,
        group: "Client Info",
        tooltip: "Select a client",
        fieldDescription: "Associated client",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "creditLimit",
        type: "number",
        required: false,
        group: "Credit",
        tooltip: "e.g., '100000', '500000'",
        fieldDescription: "Maximum credit allowed",
      },
      {
        name: "availableCredit",
        type: "number",
        required: false,
        group: "Credit",
        tooltip: "e.g., '50000'",
        fieldDescription: "Remaining available credit",
      },
      {
        name: "walletBalance",
        type: "number",
        required: false,
        group: "Payment",
        tooltip: "e.g., '10000'",
        fieldDescription: "Current wallet balance",
      },
      {
        name: "currency",
        type: "text",
        required: false,
        group: "Details",
        tooltip: "e.g., 'PHP', 'USD'",
        fieldDescription: "Currency code",
      },
      {
        name: "paymentTermsDays",
        type: "number",
        required: false,
        group: "Payment",
        tooltip: "e.g., '30', '60'",
        fieldDescription: "Number of days for payment terms",
      },
      {
        name: "isCreditApproved",
        type: "text",
        required: false,
        group: "Credit",
        tooltip: "e.g., 'yes', 'no'",
        fieldDescription: "Whether credit is approved",
      },
      {
        name: "lastPaymentDate",
        type: "date",
        required: false,
        group: "History",
        tooltip: "e.g., '2025-01-15'",
        fieldDescription: "Date of last payment",
      },
    ],
  },

  "billing-management/credit-notes": {
    schema: "billing-management",
    entity: "CreditNote",
    enum: "BillingManagementCreditNotes",
    description:
      "Issues credit notes for refunds and adjustments to disputes with tracking of applications",
    fields: [
      {
        name: "creditNoteNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'CN-2025-001'",
        fieldDescription: "Unique credit note number",
      },
      {
        name: "dispute",
        type: "relation",
        required: true,
        group: "Reference",
        tooltip: "Select associated dispute",
        fieldDescription: "Related dispute",
        collectionName: "billing_management_disputes",
        displayField: "id",
        recordType: "BillingManagementDisputesResponse",
      },
      {
        name: "invoice",
        type: "relation",
        required: true,
        group: "Reference",
        tooltip: "Select invoice",
        fieldDescription: "Related invoice",
        collectionName: "billing_management_invoices",
        displayField: "invoiceNumber",
        recordType: "BillingManagementInvoicesResponse",
      },
      {
        name: "issueDate",
        type: "date",
        required: true,
        group: "Dates",
        tooltip: "e.g., '2025-01-15'",
        fieldDescription: "Date when credit note was issued",
      },
      {
        name: "amount",
        type: "number",
        required: false,
        group: "Amount",
        tooltip: "e.g., '5000', '10000.50'",
        fieldDescription: "Credit note amount",
      },
      {
        name: "currency",
        type: "text",
        required: true,
        group: "Amount",
        tooltip: "e.g., 'PHP', 'USD'",
        fieldDescription: "Currency code",
      },
      {
        name: "reason",
        type: "textarea",
        required: true,
        group: "Details",
        tooltip: "e.g., 'Overcharge refund'",
        fieldDescription: "Reason for credit note",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Additional notes'",
        fieldDescription: "Additional notes",
      },
      {
        name: "appliedAt",
        type: "date",
        required: false,
        group: "Tracking",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "Date when credit was applied",
      },
    ],
  },

  "billing-management/disputes": {
    schema: "billing-management",
    entity: "Dispute",
    enum: "BillingManagementDisputes",
    description:
      "Manages billing disputes with status tracking, resolution notes, and attachments",
    fields: [
      {
        name: "client",
        type: "relation",
        required: true,
        group: "Client",
        tooltip: "Select client",
        fieldDescription: "Client raising the dispute",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "lineItem",
        type: "relation",
        required: true,
        group: "Reference",
        tooltip: "Select line item",
        fieldDescription: "Disputed invoice line item",
        collectionName: "billing_management_invoice_line_items",
        displayField: "id",
        recordType: "BillingManagementInvoiceLineItemsResponse",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "Select dispute status",
        fieldDescription: "Current status of dispute",
        options: [
          "open",
          "under-review",
          "approved",
          "denied",
          "escalated",
          "closed",
        ],
      },
      {
        name: "reason",
        type: "textarea",
        required: true,
        group: "Details",
        tooltip: "e.g., 'Incorrect charges'",
        fieldDescription: "Reason for dispute",
      },
      {
        name: "disputeAmount",
        type: "number",
        required: false,
        group: "Amount",
        tooltip: "e.g., '5000'",
        fieldDescription: "Amount in dispute",
      },
      {
        name: "submittedAt",
        type: "date",
        required: false,
        group: "Tracking",
        tooltip: "e.g., '2025-01-10'",
        fieldDescription: "Date dispute was submitted",
      },
      {
        name: "resolvedAt",
        type: "date",
        required: false,
        group: "Tracking",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "Date dispute was resolved",
      },
      {
        name: "resolvedBy",
        type: "relation",
        required: false,
        group: "Resolution",
        tooltip: "Select resolver",
        fieldDescription: "User who resolved the dispute",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "resolutionNotes",
        type: "textarea",
        required: false,
        group: "Resolution",
        tooltip: "e.g., 'Credit issued'",
        fieldDescription: "Notes on resolution",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Evidence",
        tooltip: "File references",
        fieldDescription: "Supporting documents",
      },
    ],
  },

  "billing-management/payments": {
    schema: "billing-management",
    entity: "Payment",
    enum: "BillingManagementPayments",
    description:
      "Records payment transactions with method, status, and gateway reference tracking",
    fields: [
      {
        name: "invoice",
        type: "relation",
        required: false,
        group: "Reference",
        tooltip: "Select invoice",
        fieldDescription: "Related invoice",
        collectionName: "billing_management_invoices",
        displayField: "invoiceNumber",
        recordType: "BillingManagementInvoicesResponse",
      },
      {
        name: "amount",
        type: "number",
        required: false,
        group: "Amount",
        tooltip: "e.g., '50000'",
        fieldDescription: "Payment amount",
      },
      {
        name: "currency",
        type: "text",
        required: false,
        group: "Amount",
        tooltip: "e.g., 'PHP', 'USD'",
        fieldDescription: "Currency code",
      },
      {
        name: "paymentMethod",
        type: "select",
        required: false,
        group: "Method",
        tooltip: "Select payment method",
        fieldDescription: "How payment was made",
        options: [
          "credit-card",
          "debit-card",
          "wallet",
          "qr-ph",
          "client-credit",
          "bank-transfer",
          "cash",
          "check",
        ],
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select payment status",
        fieldDescription: "Current payment status",
        options: [
          "pending",
          "processing",
          "successful",
          "failed",
          "cancelled",
          "refunded",
        ],
      },
      {
        name: "paymentDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2025-01-15'",
        fieldDescription: "Date of payment",
      },
      {
        name: "processedAt",
        type: "datetime",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2025-01-15 14:30'",
        fieldDescription: "When payment was processed",
      },
      {
        name: "processedBy",
        type: "relation",
        required: false,
        group: "Processing",
        tooltip: "Select processor",
        fieldDescription: "User who processed payment",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "transactionId",
        type: "text",
        required: false,
        group: "Gateway",
        tooltip: "e.g., 'TXN-2025-001'",
        fieldDescription: "External transaction ID",
      },
      {
        name: "gatewayReferenceId",
        type: "text",
        required: false,
        group: "Gateway",
        tooltip: "e.g., 'GW-REF-12345'",
        fieldDescription: "Payment gateway reference",
      },
      {
        name: "fees",
        type: "number",
        required: false,
        group: "Amount",
        tooltip: "e.g., '500'",
        fieldDescription: "Processing fees",
      },
      {
        name: "netAmount",
        type: "number",
        required: false,
        group: "Amount",
        tooltip: "e.g., '49500'",
        fieldDescription: "Amount after fees",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Partial payment'",
        fieldDescription: "Additional notes",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Evidence",
        tooltip: "File references",
        fieldDescription: "Payment proof documents",
      },
    ],
  },

  "billing-management/rate-rules": {
    schema: "billing-management",
    entity: "RateRule",
    enum: "BillingManagementRateRules",
    description:
      "Defines pricing rules with conditions, value ranges, and different calculation models for rate cards",
    fields: [
      {
        name: "rateCard",
        type: "relation",
        required: false,
        group: "Rate Card",
        tooltip: "Select rate card",
        fieldDescription: "Associated rate card",
        collectionName: "billing_management_rate_cards",
        displayField: "name",
        recordType: "BillingManagementRateCardsResponse",
      },
      {
        name: "priority",
        type: "number",
        required: true,
        group: "Priority",
        tooltip: "e.g., '1', '10'",
        fieldDescription: "Rule priority (lower = higher priority)",
      },
      {
        name: "condition",
        type: "text",
        required: true,
        group: "Condition",
        tooltip: "e.g., 'weight_kg > 100'",
        fieldDescription: "Condition for rule application",
      },
      {
        name: "value",
        type: "text",
        required: true,
        group: "Condition",
        tooltip: "e.g., '100', 'premium-zone'",
        fieldDescription: "Condition value",
      },
      {
        name: "minValue",
        type: "number",
        required: false,
        group: "Range",
        tooltip: "e.g., '0'",
        fieldDescription: "Minimum value for range",
      },
      {
        name: "maxValue",
        type: "number",
        required: false,
        group: "Range",
        tooltip: "e.g., '1000'",
        fieldDescription: "Maximum value for range",
      },
      {
        name: "pricingModel",
        type: "select",
        required: true,
        group: "Pricing",
        tooltip: "Select pricing model",
        fieldDescription: "How price is calculated",
        options: [
          "per-kg",
          "per-item",
          "flat-rate",
          "per-cubic-meter",
          "per-zone",
          "percentage",
          "tiered",
        ],
      },
      {
        name: "price",
        type: "number",
        required: true,
        group: "Pricing",
        tooltip: "e.g., '100', '50.50'",
        fieldDescription: "Price for this rule",
      },
      {
        name: "isActive",
        type: "text",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no'",
        fieldDescription: "Whether rule is active",
      },
    ],
  },

  // ============= CUSTOMER RELATIONS (REMAINING) =============
  "customer-relations/cases": {
    schema: "customer-relations",
    entity: "Case",
    enum: "CustomerRelationsCases",
    description:
      "Tracks customer support cases with status, priority, type classification, and resolution tracking",
    fields: [
      {
        name: "caseNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'CASE-2025-001'",
        fieldDescription: "Unique case number",
      },
      {
        name: "contact",
        type: "relation",
        required: false,
        group: "Contact",
        tooltip: "Select contact",
        fieldDescription: "Associated contact",
        collectionName: "Collections.CustomerRelationsContacts",
        displayField: "name",
        recordType: "CustomerRelationsContactsResponse",
      },
      {
        name: "owner",
        type: "relation",
        required: true,
        group: "Assignment",
        tooltip: "Select owner",
        fieldDescription: "Case owner/assignee",
        collectionName: "Collections.Users",
        displayField: "name",
        recordType: "UsersResponse",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "Select case status",
        fieldDescription: "Current case status",
        options: [
          "new",
          "in-progress",
          "waiting-for-customer",
          "waiting-for-internal",
          "escalated",
          "resolved",
          "closed",
          "cancelled",
        ],
      },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Classification",
        tooltip: "Select case type",
        fieldDescription: "Type of case",
        options: [
          "question",
          "problem",
          "complaint",
          "feature-request",
          "bug-report",
          "technical-support",
        ],
      },
      {
        name: "priority",
        type: "select",
        required: true,
        group: "Priority",
        tooltip: "Select priority",
        fieldDescription: "Case priority level",
        options: ["critical", "high", "medium", "low"],
      },
      {
        name: "description",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Customer reported...'",
        fieldDescription: "Case description and details",
      },
    ],
  },

  "customer-relations/companies": {
    schema: "customer-relations",
    entity: "Company",
    enum: "CustomerRelationsCompanies",
    description:
      "Manages company information with contact details, registration info, and business classification",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Acme Corporation'",
        fieldDescription: "Company name",
      },
      {
        name: "phoneNumber",
        type: "text",
        required: false,
        group: "Contact Information",
        tooltip: "e.g., '+63 2 1234 5678'",
        fieldDescription: "Company phone number",
      },
      {
        name: "website",
        type: "text",
        required: false,
        group: "Contact Information",
        tooltip: "e.g., 'www.acme.com'",
        fieldDescription: "Company website",
      },
      {
        name: "street",
        type: "text",
        required: false,
        group: "Address",
        tooltip: "e.g., '123 Business Ave'",
        fieldDescription: "Street address",
      },
      {
        name: "city",
        type: "text",
        required: false,
        group: "Address",
        tooltip: "e.g., 'Manila'",
        fieldDescription: "City",
      },
      {
        name: "state",
        type: "text",
        required: false,
        group: "Address",
        tooltip: "e.g., 'NCR'",
        fieldDescription: "State/Province",
      },
      {
        name: "postalCode",
        type: "text",
        required: false,
        group: "Address",
        tooltip: "e.g., '1234'",
        fieldDescription: "Postal code",
      },
      {
        name: "country",
        type: "text",
        required: false,
        group: "Address",
        tooltip: "e.g., 'Philippines'",
        fieldDescription: "Country",
      },
      {
        name: "industry",
        type: "text",
        required: false,
        group: "Business Information",
        tooltip: "e.g., 'Technology'",
        fieldDescription: "Industry sector",
      },
      {
        name: "annualRevenue",
        type: "number",
        required: false,
        group: "Business Information",
        tooltip: "e.g., '1000000'",
        fieldDescription: "Annual revenue",
      },
      {
        name: "owner",
        type: "relation",
        required: false,
        group: "Ownership",
        tooltip: "e.g., 'User ID'",
        fieldDescription: "Account owner or account manager",
        collectionName: "Collections.Users",
        displayField: "name",
        recordType: "UsersResponse",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Media",
        tooltip: "File names separated by comma",
        fieldDescription: "Company attachments (logos, documents, etc.)",
      },
    ],
  },

  "customer-relations/invoice-items": {
    schema: "customer-relations",
    entity: "InvoiceItem",
    enum: "CustomerRelationsInvoiceItems",
    description:
      "Line items for customer relation invoices with pricing and quantity details",
    fields: [
      {
        name: "invoice",
        type: "relation",
        required: true,
        group: "Reference",
        tooltip: "Select invoice",
        fieldDescription: "Parent invoice",
        collectionName: "Collections.CustomerRelationsInvoices",
        displayField: "invoiceNumber",
        recordType: "CustomerRelationsInvoicesResponse",
      },
      {
        name: "product",
        type: "relation",
        required: true,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Product or service",
        collectionName: "Collections.CustomerRelationsProducts",
        displayField: "name",
        recordType: "CustomerRelationsProductsResponse",
      },
      {
        name: "quantity",
        type: "number",
        required: true,
        group: "Details",
        tooltip: "e.g., '5', '10.5'",
        fieldDescription: "Quantity of item",
      },
      {
        name: "price",
        type: "number",
        required: true,
        group: "Pricing",
        tooltip: "e.g., '1000', '500.50'",
        fieldDescription: "Price per unit",
      },
    ],
  },

  "customer-relations/opportunity-products": {
    schema: "customer-relations",
    entity: "OpportunityProduct",
    enum: "CustomerRelationsOpportunityProducts",
    description:
      "Links products to sales opportunities for tracking product involvement in deals",
    fields: [
      {
        name: "opportunity",
        type: "relation",
        required: false,
        group: "Reference",
        tooltip: "Select opportunity",
        fieldDescription: "Associated opportunity",
        collectionName: "Collections.CustomerRelationsOpportunities",
        displayField: "name",
        recordType: "CustomerRelationsOpportunitiesResponse",
      },
      {
        name: "product",
        type: "relation",
        required: false,
        group: "Reference",
        tooltip: "Select product",
        fieldDescription: "Associated product",
        collectionName: "Collections.CustomerRelationsProducts",
        displayField: "name",
        recordType: "CustomerRelationsProductsResponse",
      },
      {
        name: "quantity",
        type: "number",
        required: true,
        group: "Details",
        tooltip: "e.g., '5', '10.5'",
        fieldDescription: "Quantity",
      },
    ],
  },

  // ============= DELIVERY MANAGEMENT =============
  "delivery-management/tasks": {
    schema: "delivery-management",
    entity: "Task",
    enum: "DeliveryManagementTasks",
    description:
      "Manages delivery tasks with status tracking, assignment, and proof of delivery",
    fields: [
      {
        name: "deliveryAddress",
        type: "text",
        required: true,
        group: "Delivery Location",
        tooltip: "e.g., '123 Main Street, Manila'",
        fieldDescription: "Address where delivery is to be made",
      },
      {
        name: "package",
        type: "relation",
        required: true,
        group: "Package",
        tooltip: "Select package",
        fieldDescription: "Package to be delivered",
        collectionName: "warehouse_management_packages",
        displayField: "packageNumber",
        recordType: "WarehouseManagementPackagesResponse",
      },
      {
        name: "route",
        type: "relation",
        required: true,
        group: "Route",
        tooltip: "Select route",
        fieldDescription: "Delivery route",
        collectionName: "delivery_management_routes",
        displayField: "name",
        recordType: "DeliveryManagementRoutesResponse",
      },
      {
        name: "sequence",
        type: "number",
        required: true,
        group: "Sequence",
        tooltip: "e.g., '1', '2', '3'",
        fieldDescription: "Order in which stop should be visited",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "Select task status",
        fieldDescription: "Current task status",
        options: [
          "pending",
          "assigned",
          "out-for-delivery",
          "delivered",
          "failed",
          "cancelled",
          "rescheduled",
        ],
      },
      {
        name: "recipientName",
        type: "text",
        required: false,
        group: "Recipient",
        tooltip: "e.g., 'John Doe'",
        fieldDescription: "Recipient name",
      },
      {
        name: "recipientPhone",
        type: "text",
        required: false,
        group: "Recipient",
        tooltip: "e.g., '+63 9XX XXX XXXX'",
        fieldDescription: "Recipient phone number",
      },
      {
        name: "deliveryTime",
        type: "date",
        required: false,
        group: "Timing",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "Scheduled delivery date",
      },
      {
        name: "estimatedArrivalTime",
        type: "date",
        required: false,
        group: "Timing",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "Estimated arrival date",
      },
      {
        name: "actualArrivalTime",
        type: "date",
        required: false,
        group: "Timing",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "Actual arrival date",
      },
      {
        name: "deliveryInstructions",
        type: "textarea",
        required: false,
        group: "Instructions",
        tooltip: "e.g., 'Ring doorbell twice'",
        fieldDescription: "Special delivery instructions",
      },
      {
        name: "failureReason",
        type: "select",
        required: false,
        group: "Failure",
        tooltip: "Select failure reason if applicable",
        fieldDescription: "Reason for failed delivery",
        options: [
          "reecipient-not-home",
          "address-not-found",
          "refused-delivery",
          "damaged-package",
          "access-denied",
          "weather-conditions",
          "vehicle-breakdown",
          "other",
        ],
      },
      {
        name: "attempCount",
        type: "number",
        required: false,
        group: "Attempts",
        tooltip: "e.g., '1', '2'",
        fieldDescription: "Number of delivery attempts",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Evidence",
        tooltip: "File names or references",
        fieldDescription: "Delivery proofs or documents",
      },
    ],
  },

  "delivery-management/routes": {
    schema: "delivery-management",
    entity: "Route",
    enum: "DeliveryManagementRoutes",
    description:
      "Defines delivery routes with waypoints, distance, and optimization details for efficient deliveries",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'Manila Central Loop'",
        fieldDescription: "Route name",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select route status",
        fieldDescription: "Current route status",
        options: [
          "active",
          "planning",
          "in-progress",
          "completed",
          "cancelled",
        ],
      },
      {
        name: "routeDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "Date for this route",
      },
      {
        name: "driver",
        type: "relation",
        required: false,
        group: "Assignment",
        tooltip: "Select driver",
        fieldDescription: "Assigned driver",
        collectionName: "transport_management_drivers",
        displayField: "licenseNumber",
        recordType: "TransportManagementDriversResponse",
      },
      {
        name: "startedAt",
        type: "date",
        required: false,
        group: "Execution",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "When route started",
      },
      {
        name: "completedAt",
        type: "date",
        required: false,
        group: "Execution",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "When route was completed",
      },
      {
        name: "estimatedDurationInMinutes",
        type: "number",
        required: false,
        group: "Metrics",
        tooltip: "e.g., '120'",
        fieldDescription: "Estimated time in minutes",
      },
      {
        name: "totalDistance",
        type: "number",
        required: false,
        group: "Metrics",
        tooltip: "e.g., '50.5'",
        fieldDescription: "Total route distance in km",
      },
    ],
  },

  // ============= TRANSPORT MANAGEMENT (ADDITIONAL) =============
  "transport-management/vehicle-maintenance": {
    schema: "transport-management",
    entity: "VehicleMaintenance",
    enum: "TransportManagementVehicleMaintenance",
    description:
      "Tracks vehicle maintenance schedules, service records, and maintenance history for fleet management",
    fields: [
      {
        name: "vehicle",
        type: "relation",
        required: true,
        group: "Vehicle",
        tooltip: "Select vehicle",
        fieldDescription: "Associated vehicle",
        collectionName: "transport_management_vehicles",
        displayField: "registrationNumber",
        recordType: "TransportManagementVehiclesResponse",
      },
      {
        name: "serviceDate",
        type: "date",
        required: true,
        group: "Dates",
        tooltip: "e.g., '2025-01-15'",
        fieldDescription: "When service was performed",
      },
      {
        name: "serviceType",
        type: "date",
        required: true,
        group: "Service",
        tooltip: "e.g., '2025-01-15'",
        fieldDescription: "Type/category of service (date format in pb.types)",
      },
      {
        name: "cost",
        type: "number",
        required: false,
        group: "Cost",
        tooltip: "e.g., '5000'",
        fieldDescription: "Service cost",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Oil change and filter replacement'",
        fieldDescription: "Service notes",
      },
    ],
  },

  "transport-management/trip-stops": {
    schema: "transport-management",
    entity: "TripStop",
    enum: "TransportManagementTripStops",
    description:
      "Represents individual stops within a trip with location, status, and time tracking",
    fields: [
      {
        name: "trip",
        type: "relation",
        required: true,
        group: "Reference",
        tooltip: "Select trip",
        fieldDescription: "Associated trip",
        collectionName: "transport_management_trips",
        displayField: "id",
        recordType: "TransportManagementTripsResponse",
      },
      {
        name: "stopNumber",
        type: "number",
        required: true,
        group: "Sequence",
        tooltip: "e.g., '1', '2', '3'",
        fieldDescription: "Sequence number in trip",
      },
      {
        name: "location",
        type: "text",
        required: true,
        group: "Location",
        tooltip: "e.g., 'Main Warehouse'",
        fieldDescription: "Stop location name",
      },
      {
        name: "latitude",
        type: "number",
        required: false,
        group: "Coordinates",
        tooltip: "e.g., '14.5995'",
        fieldDescription: "Latitude coordinate",
      },
      {
        name: "longitude",
        type: "number",
        required: false,
        group: "Coordinates",
        tooltip: "e.g., '120.9842'",
        fieldDescription: "Longitude coordinate",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select stop status",
        fieldDescription: "Current stop status",
        options: ["pending", "in-progress", "completed", "skipped", "failed"],
      },
      {
        name: "estimatedTime",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., '2025-01-20 14:30'",
        fieldDescription: "Estimated arrival time",
      },
      {
        name: "actualTime",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., '2025-01-20 14:25'",
        fieldDescription: "Actual arrival time",
      },
    ],
  },

  // ============= WAREHOUSE MANAGEMENT (ADDITIONAL) =============
  "warehouse-management/inventory-stock": {
    schema: "warehouse-management",
    entity: "InventoryStock",
    enum: "WarehouseManagementInventoryStock",
    description:
      "Tracks inventory stock levels at specific locations with quantity on hand and reserved quantities",
    fields: [
      {
        name: "product",
        type: "relation",
        required: true,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Associated product",
        collectionName: "warehouse_management_products",
        displayField: "name",
        recordType: "WarehouseManagementProductsResponse",
      },
      {
        name: "location",
        type: "relation",
        required: true,
        group: "Location",
        tooltip: "Select location",
        fieldDescription: "Storage location",
        collectionName: "warehouse_management_locations",
        displayField: "name",
        recordType: "WarehouseManagementLocationsResponse",
      },
      {
        name: "batch",
        type: "relation",
        required: false,
        group: "Batch",
        tooltip: "Select batch",
        fieldDescription: "Associated inventory batch",
        collectionName: "warehouse_management_inventory_batches",
        displayField: "batchNumber",
        recordType: "WarehouseManagementInventoryBatchesResponse",
      },
      {
        name: "quantity",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., '100', '250.5'",
        fieldDescription: "Quantity currently in stock",
      },
      {
        name: "reservedQuantity",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., '20'",
        fieldDescription: "Quantity reserved for orders",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select stock status",
        fieldDescription: "Stock status",
        options: [
          "in-stock",
          "low-stock",
          "out-of-stock",
          "discontinued",
          "obsolete",
        ],
      },
      {
        name: "lastCountedAt",
        type: "date",
        required: false,
        group: "Audit",
        tooltip: "e.g., '2025-01-10'",
        fieldDescription: "Last inventory count date",
      },
      {
        name: "lastMovementAt",
        type: "date",
        required: false,
        group: "Audit",
        tooltip: "e.g., '2025-01-10'",
        fieldDescription: "Last movement date",
      },
    ],
  },

  "warehouse-management/inventory-batches": {
    schema: "warehouse-management",
    entity: "InventoryBatch",
    enum: "WarehouseManagementInventoryBatches",
    description:
      "Groups inventory into batches with lot numbers and expiration tracking for batch traceability",
    fields: [
      {
        name: "batchNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'BATCH-2025-001'",
        fieldDescription: "Unique batch identifier",
      },
      {
        name: "product",
        type: "relation",
        required: true,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Associated product",
        collectionName: "warehouse_management_products",
        displayField: "name",
        recordType: "WarehouseManagementProductsResponse",
      },
      {
        name: "expirationDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2025-12-01'",
        fieldDescription: "Batch expiration date",
      },
    ],
  },

  "warehouse-management/sales-orders": {
    schema: "warehouse-management",
    entity: "SalesOrder",
    enum: "WarehouseManagementSalesOrders",
    description:
      "Records sales orders for warehouse fulfillment with customer and order details",
    fields: [
      {
        name: "orderNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'SO-2025-001'",
        fieldDescription: "Unique order number",
      },
      {
        name: "client",
        type: "relation",
        required: true,
        group: "Customer",
        tooltip: "Select client",
        fieldDescription: "Associated client",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "opportunity",
        type: "relation",
        required: false,
        group: "Reference",
        tooltip: "Select opportunity",
        fieldDescription: "Related sales opportunity",
        collectionName: "customer_relations_opportunities",
        displayField: "name",
        recordType: "CustomerRelationsOpportunitiesResponse",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select order status",
        fieldDescription: "Order status",
        options: [
          "pending",
          "confirmed",
          "picking",
          "packed",
          "shipped",
          "delivered",
          "cancelled",
        ],
      },
      {
        name: "shippingAddress",
        type: "number",
        required: false,
        group: "Shipping",
        tooltip: "e.g., '1'",
        fieldDescription: "Shipping address reference",
      },
    ],
  },

  // ============= BILLING MANAGEMENT (ADDITIONAL) =============
  "billing-management/account-transactions": {
    schema: "billing-management",
    entity: "AccountTransaction",
    enum: "BillingManagementAccountTransactions",
    description:
      "Records financial transactions for client accounts including credits, debits, and adjustments",
    fields: [
      {
        name: "clientAccount",
        type: "relation",
        required: true,
        group: "Account",
        tooltip: "Select client account",
        fieldDescription: "Associated client account",
        collectionName: "billing_management_client_accounts",
        displayField: "id",
        recordType: "BillingManagementClientAccountsResponse",
      },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Transaction Type",
        tooltip: "Select transaction type",
        fieldDescription: "Type of transaction",
        options: ["credit", "debit", "top-up", "refund", "adjustment", "fee"],
      },
      {
        name: "amount",
        type: "number",
        required: true,
        group: "Amount",
        tooltip: "e.g., '5000', '10000.50'",
        fieldDescription: "Transaction amount",
      },
      {
        name: "transactionDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2025-01-15'",
        fieldDescription: "Date of transaction",
      },
      {
        name: "referenceNumber",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'REF-2025-001'",
        fieldDescription: "Reference number for tracking",
      },
      {
        name: "runningBalance",
        type: "number",
        required: false,
        group: "Balance",
        tooltip: "e.g., '50000'",
        fieldDescription: "Account balance after transaction",
      },
      {
        name: "processedBy",
        type: "relation",
        required: false,
        group: "Processing",
        tooltip: "Select processor",
        fieldDescription: "User who processed transaction",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
    ],
  },

  "billing-management/invoices": {
    schema: "billing-management",
    entity: "Invoice",
    enum: "BillingManagementInvoices",
    description:
      "Manages billing invoices with items, taxes, discounts, and payment tracking",
    fields: [
      {
        name: "invoiceNumber",
        type: "text",
        required: false,
        group: "Identification",
        tooltip: "e.g., 'INV-2025-001'",
        fieldDescription: "Unique invoice number",
      },
      {
        name: "issueDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2025-01-15'",
        fieldDescription: "When invoice was issued",
      },
      {
        name: "dueDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2025-02-15'",
        fieldDescription: "Payment due date",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select invoice status",
        fieldDescription: "Current invoice status",
        options: [
          "draft",
          "sent",
          "viewed",
          "paid",
          "partial-paid",
          "past-due",
          "disputed",
          "cancelled",
          "void",
        ],
      },
      {
        name: "subtotal",
        type: "number",
        required: false,
        group: "Amounts",
        tooltip: "e.g., '10000'",
        fieldDescription: "Subtotal before discounts and taxes",
      },
      {
        name: "discountAmount",
        type: "number",
        required: false,
        group: "Discounts",
        tooltip: "e.g., '1000'",
        fieldDescription: "Total discount",
      },
      {
        name: "totalAmount",
        type: "number",
        required: false,
        group: "Amounts",
        tooltip: "e.g., '11000'",
        fieldDescription: "Total invoice amount",
      },
      {
        name: "amountPaid",
        type: "number",
        required: false,
        group: "Payment",
        tooltip: "e.g., '11000'",
        fieldDescription: "Amount paid so far",
      },
      {
        name: "paidAt",
        type: "date",
        required: false,
        group: "Payment",
        tooltip: "e.g., '2025-02-10'",
        fieldDescription: "Date payment was received",
      },
      {
        name: "sentAt",
        type: "date",
        required: false,
        group: "Tracking",
        tooltip: "e.g., '2025-01-15'",
        fieldDescription: "When invoice was sent",
      },
      {
        name: "currency",
        type: "text",
        required: false,
        group: "Amount",
        tooltip: "e.g., 'PHP', 'USD'",
        fieldDescription: "Currency code",
      },
      {
        name: "paymentTerms",
        type: "textarea",
        required: false,
        group: "Terms",
        tooltip: "e.g., 'Net 30'",
        fieldDescription: "Payment terms description",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Thank you for business'",
        fieldDescription: "Additional notes",
      },
      {
        name: "quote",
        type: "relation",
        required: false,
        group: "Reference",
        tooltip: "Select quote",
        fieldDescription: "Associated quote if applicable",
        collectionName: "billing_management_quotes",
        displayField: "quoteNumber",
        recordType: "BillingManagementQuotesResponse",
      },
      {
        name: "createdBy",
        type: "relation",
        required: false,
        group: "Audit",
        tooltip: "Select creator",
        fieldDescription: "User who created invoice",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Evidence",
        tooltip: "File names or references",
        fieldDescription: "Supporting documents",
      },
    ],
  },

  "billing-management/invoice-line-items": {
    schema: "billing-management",
    entity: "InvoiceLineItem",
    enum: "BillingManagementInvoiceLineItems",
    description:
      "Line items for billing invoices with pricing, taxes, and discount details",
    fields: [
      {
        name: "invoice",
        type: "relation",
        required: false,
        group: "Reference",
        tooltip: "Select invoice",
        fieldDescription: "Parent invoice",
        collectionName: "billing_management_invoices",
        displayField: "invoiceNumber",
        recordType: "BillingManagementInvoicesResponse",
      },
      {
        name: "description",
        type: "textarea",
        required: false,
        group: "Item",
        tooltip: "e.g., 'Shipping service'",
        fieldDescription: "Item description",
      },
      {
        name: "quantity",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., '5', '10.5'",
        fieldDescription: "Quantity of item",
      },
      {
        name: "unitPrice",
        type: "number",
        required: false,
        group: "Pricing",
        tooltip: "e.g., '1000', '500.50'",
        fieldDescription: "Price per unit",
      },
      {
        name: "discountRate",
        type: "number",
        required: false,
        group: "Discount",
        tooltip: "e.g., '10', '5.5'",
        fieldDescription: "Discount percentage",
      },
      {
        name: "discountAmount",
        type: "number",
        required: false,
        group: "Discount",
        tooltip: "e.g., '500'",
        fieldDescription: "Discount amount",
      },
      {
        name: "taxRate",
        type: "number",
        required: false,
        group: "Tax",
        tooltip: "e.g., '12', '8.5'",
        fieldDescription: "Tax percentage",
      },
      {
        name: "taxAmount",
        type: "number",
        required: false,
        group: "Tax",
        tooltip: "e.g., '1200'",
        fieldDescription: "Tax amount",
      },
    ],
  },

  "billing-management/quotes": {
    schema: "billing-management",
    entity: "Quote",
    enum: "BillingManagementQuotes",
    description:
      "Manages pricing quotes for services with validity periods and conversion to invoices",
    fields: [
      {
        name: "quoteNumber",
        type: "text",
        required: false,
        group: "Identification",
        tooltip: "e.g., 'Q-2025-001'",
        fieldDescription: "Unique quote number",
      },
      {
        name: "client",
        type: "relation",
        required: false,
        group: "Client",
        tooltip: "Select client",
        fieldDescription: "Associated client",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select quote status",
        fieldDescription: "Current quote status",
        options: ["pending", "accepted", "expired", "cancelled", "converted"],
      },
      {
        name: "originDetails",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Manila warehouse'",
        fieldDescription: "Origin location details",
      },
      {
        name: "destinationDetails",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Cebu destination'",
        fieldDescription: "Destination location details",
      },
      {
        name: "length",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., '100'",
        fieldDescription: "Length in cm",
      },
      {
        name: "width",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., '50'",
        fieldDescription: "Width in cm",
      },
      {
        name: "height",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., '40'",
        fieldDescription: "Height in cm",
      },
      {
        name: "weight",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., '25.5'",
        fieldDescription: "Weight in kg",
      },
      {
        name: "quotePrice",
        type: "number",
        required: false,
        group: "Pricing",
        tooltip: "e.g., '5000'",
        fieldDescription: "Quoted price",
      },
      {
        name: "serviceLevel",
        type: "text",
        required: false,
        group: "Service",
        tooltip: "e.g., 'Standard', 'Express'",
        fieldDescription: "Service level",
      },
      {
        name: "expiredAt",
        type: "date",
        required: false,
        group: "Validity",
        tooltip: "e.g., '2025-02-15'",
        fieldDescription: "Quote expiration date",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Special handling required'",
        fieldDescription: "Additional notes",
      },
      {
        name: "createdBy",
        type: "relation",
        required: false,
        group: "Audit",
        tooltip: "Select creator",
        fieldDescription: "User who created quote",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Evidence",
        tooltip: "File names or references",
        fieldDescription: "Supporting documents",
      },
    ],
  },

  "billing-management/logs": {
    schema: "billing-management",
    entity: "Log",
    enum: "BillingManagementLogs",
    description:
      "Tracks system logs for billing transactions with external integrations and retry history",
    fields: [
      {
        name: "externalSystem",
        type: "text",
        required: true,
        group: "System",
        tooltip: "e.g., 'PaymentGateway', 'Accounting'",
        fieldDescription: "External system name",
      },
      {
        name: "recordType",
        type: "text",
        required: true,
        group: "Record",
        tooltip: "e.g., 'payment', 'invoice'",
        fieldDescription: "Type of record being logged",
      },
      {
        name: "recordId",
        type: "text",
        required: true,
        group: "Record",
        tooltip: "e.g., 'record-id-123'",
        fieldDescription: "ID of the record",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select log status",
        fieldDescription: "Current status",
        options: ["pending", "in-progress", "success", "failed", "retry"],
      },
      {
        name: "externalId",
        type: "text",
        required: false,
        group: "External",
        tooltip: "e.g., 'external-id-456'",
        fieldDescription: "External system ID",
      },
      {
        name: "lastSyncAt",
        type: "date",
        required: false,
        group: "Tracking",
        tooltip: "e.g., '2025-01-15'",
        fieldDescription: "Last sync date",
      },
      {
        name: "nextRetryAt",
        type: "date",
        required: false,
        group: "Retry",
        tooltip: "e.g., '2025-01-16'",
        fieldDescription: "Next retry date",
      },
      {
        name: "retryCount",
        type: "number",
        required: false,
        group: "Retry",
        tooltip: "e.g., '0', '3'",
        fieldDescription: "Number of retry attempts",
      },
      {
        name: "errorMessage",
        type: "textarea",
        required: false,
        group: "Error",
        tooltip: "e.g., 'Connection timeout'",
        fieldDescription: "Error message if failed",
      },
      {
        name: "requestPayload",
        type: "textarea",
        required: false,
        group: "Payloads",
        tooltip: "JSON request data",
        fieldDescription: "Request payload sent",
      },
      {
        name: "responsePayload",
        type: "textarea",
        required: false,
        group: "Payloads",
        tooltip: "JSON response data",
        fieldDescription: "Response payload received",
      },
    ],
  },

  // ============= DELIVERY MANAGEMENT (ADDITIONAL) =============
  "delivery-management/driver-location": {
    schema: "delivery-management",
    entity: "DriverLocation",
    enum: "DeliveryManagementDriverLocation",
    description:
      "Tracks real-time driver locations with GPS coordinates for fleet monitoring and route optimization",
    fields: [
      {
        name: "driver",
        type: "relation",
        required: true,
        group: "Driver",
        tooltip: "Select driver",
        fieldDescription: "Associated driver",
        collectionName: "transport_management_drivers",
        displayField: "licenseNumber",
        recordType: "TransportManagementDriversResponse",
      },
      {
        name: "coordinates",
        type: "text",
        required: true,
        group: "Location",
        tooltip: "e.g., 'latitude,longitude'",
        fieldDescription: "GPS coordinates (latitude, longitude)",
      },
      {
        name: "heading",
        type: "text",
        required: false,
        group: "Movement",
        tooltip: "e.g., 'latitude,longitude'",
        fieldDescription: "Direction heading",
      },
      {
        name: "timestamp",
        type: "datetime",
        required: true,
        group: "Timing",
        tooltip: "e.g., '2025-01-20 14:30'",
        fieldDescription: "When location was recorded",
      },
    ],
  },

  "delivery-management/proof-of-deliveries": {
    schema: "delivery-management",
    entity: "ProofOfDelivery",
    enum: "DeliveryManagementProofOfDeliveries",
    description:
      "Records proof of delivery with signatures, photos, and timestamp for delivery verification",
    fields: [
      {
        name: "task",
        type: "relation",
        required: false,
        group: "Delivery",
        tooltip: "Select task",
        fieldDescription: "Associated delivery task",
        collectionName: "delivery_management_tasks",
        displayField: "id",
        recordType: "DeliveryManagementTasksResponse",
      },
      {
        name: "coordinates",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., 'latitude,longitude'",
        fieldDescription: "Delivery location coordinates",
      },
      {
        name: "recipientName",
        type: "text",
        required: false,
        group: "Recipient",
        tooltip: "e.g., 'John Doe'",
        fieldDescription: "Name of person who received",
      },
      {
        name: "signatureData",
        type: "text",
        required: false,
        group: "Signature",
        tooltip: "Signature image data",
        fieldDescription: "Digital signature from recipient",
      },
      {
        name: "timestamp",
        type: "datetime",
        required: true,
        group: "Timing",
        tooltip: "e.g., '2025-01-20 14:30'",
        fieldDescription: "When delivery was confirmed",
      },
    ],
  },

  "delivery-management/task-events": {
    schema: "delivery-management",
    entity: "TaskEvent",
    enum: "DeliveryManagementTaskEvents",
    description:
      "Tracks status change events for delivery tasks with timestamps and detailed notes",
    fields: [
      {
        name: "task",
        type: "relation",
        required: true,
        group: "Task",
        tooltip: "Select task",
        fieldDescription: "Associated delivery task",
        collectionName: "delivery_management_tasks",
        displayField: "id",
        recordType: "DeliveryManagementTasksResponse",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "Select event status",
        fieldDescription: "Task status at this event",
        options: [
          "assigned",
          "started",
          "arrived",
          "delivered",
          "failed",
          "exception",
          "cancelled",
          "rescheduled",
        ],
      },
      {
        name: "timestamp",
        type: "datetime",
        required: true,
        group: "Timing",
        tooltip: "e.g., '2025-01-20 14:30'",
        fieldDescription: "When event occurred",
      },
      {
        name: "coordinates",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., 'latitude,longitude'",
        fieldDescription: "Location when event occurred",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Recipient not at home'",
        fieldDescription: "Event notes or comments",
      },
      {
        name: "reason",
        type: "textarea",
        required: false,
        group: "Reason",
        tooltip: "e.g., 'Weather delay'",
        fieldDescription: "Reason for status change",
      },
    ],
  },

  // ============= TRANSPORT MANAGEMENT (ADDITIONAL) =============
  "transport-management/carrier-rates": {
    schema: "transport-management",
    entity: "CarrierRate",
    enum: "TransportManagementCarrierRates",
    description:
      "Defines shipping rates from external carriers with origin/destination and unit-based pricing",
    fields: [
      {
        name: "carrier",
        type: "relation",
        required: false,
        group: "Carrier",
        tooltip: "Select carrier",
        fieldDescription: "Associated carrier",
        collectionName: "transport_management_carriers",
        displayField: "name",
        recordType: "TransportManagementCarriersResponse",
      },
      {
        name: "origin",
        type: "text",
        required: true,
        group: "Route",
        tooltip: "e.g., 'Manila'",
        fieldDescription: "Origin location",
      },
      {
        name: "destination",
        type: "text",
        required: true,
        group: "Route",
        tooltip: "e.g., 'Cebu'",
        fieldDescription: "Destination location",
      },
      {
        name: "rate",
        type: "number",
        required: true,
        group: "Pricing",
        tooltip: "e.g., '500', '1000.50'",
        fieldDescription: "Shipping rate",
      },
      {
        name: "unit",
        type: "select",
        required: false,
        group: "Pricing",
        tooltip: "Select rate unit",
        fieldDescription: "Unit for rate calculation",
        options: ["per-kg", "per-container", "per-mile", "per-km", "flat-rate"],
      },
      {
        name: "serviceType",
        type: "text",
        required: false,
        group: "Service",
        tooltip: "e.g., 'Standard', 'Express'",
        fieldDescription: "Type of service",
      },
    ],
  },

  "transport-management/carriers": {
    schema: "transport-management",
    entity: "Carrier",
    enum: "TransportManagementCarriers",
    description:
      "Manages third-party carriers with contact information and service offerings",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'DHL Express', 'FedEx'",
        fieldDescription: "Carrier name",
      },
      {
        name: "image",
        type: "text",
        required: false,
        group: "Media",
        tooltip: "File name or reference",
        fieldDescription: "Carrier logo or image",
      },
      {
        name: "contactDetails",
        type: "textarea",
        required: false,
        group: "Contact",
        tooltip: "e.g., 'Email, phone, address'",
        fieldDescription: "Contact information",
      },
      {
        name: "serviceOffered",
        type: "textarea",
        required: false,
        group: "Services",
        tooltip: "e.g., 'Express, Standard, Overnight'",
        fieldDescription: "Services offered by carrier",
      },
    ],
  },

  "transport-management/driver-schedules": {
    schema: "transport-management",
    entity: "DriverSchedule",
    enum: "TransportManagementDriverSchedules",
    description:
      "Manages driver availability with time-off schedules for vacation, leave, and training",
    fields: [
      {
        name: "driver",
        type: "relation",
        required: true,
        group: "Driver",
        tooltip: "Select driver",
        fieldDescription: "Associated driver",
        collectionName: "transport_management_drivers",
        displayField: "licenseNumber",
        recordType: "TransportManagementDriversResponse",
      },
      {
        name: "startDate",
        type: "date",
        required: true,
        group: "Dates",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "Start date of unavailability",
      },
      {
        name: "endDate",
        type: "date",
        required: true,
        group: "Dates",
        tooltip: "e.g., '2025-01-27'",
        fieldDescription: "End date of unavailability",
      },
      {
        name: "reason",
        type: "select",
        required: false,
        group: "Reason",
        tooltip: "Select reason",
        fieldDescription: "Reason for schedule",
        options: ["vacation", "sick-leave", "training", "personal-leave"],
      },
    ],
  },

  "transport-management/expenses": {
    schema: "transport-management",
    entity: "Expense",
    enum: "TransportManagementExpenses",
    description:
      "Tracks driver and trip expenses with receipts, reimbursement status, and categorization",
    fields: [
      {
        name: "driver",
        type: "relation",
        required: false,
        group: "Driver",
        tooltip: "Select driver",
        fieldDescription: "Associated driver",
        collectionName: "transport_management_drivers",
        displayField: "licenseNumber",
        recordType: "TransportManagementDriversResponse",
      },
      {
        name: "trip",
        type: "relation",
        required: false,
        group: "Trip",
        tooltip: "Select trip",
        fieldDescription: "Associated trip",
        collectionName: "transport_management_trips",
        displayField: "id",
        recordType: "TransportManagementTripsResponse",
      },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Category",
        tooltip: "Select expense type",
        fieldDescription: "Type of expense",
        options: [
          "fuel",
          "tolls",
          "maintenance",
          "parking",
          "meals",
          "accomodation",
        ],
      },
      {
        name: "amount",
        type: "number",
        required: true,
        group: "Amount",
        tooltip: "e.g., '500', '1000.50'",
        fieldDescription: "Expense amount",
      },
      {
        name: "currency",
        type: "select",
        required: true,
        group: "Currency",
        tooltip: "Select currency",
        fieldDescription: "Currency code",
        options: ["PHP", "USD", "EUR"],
      },
      {
        name: "odometerReading",
        type: "number",
        required: true,
        group: "Mileage",
        tooltip: "e.g., '12345'",
        fieldDescription: "Odometer reading",
      },
      {
        name: "fuelQuantity",
        type: "number",
        required: false,
        group: "Fuel",
        tooltip: "e.g., '50', '75.5'",
        fieldDescription: "Fuel quantity in liters",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "Select expense status",
        fieldDescription: "Reimbursement status",
        options: ["pending", "approved", "rejected", "reimbursed"],
      },
      {
        name: "receipts",
        type: "text",
        required: false,
        group: "Evidence",
        tooltip: "File names or references",
        fieldDescription: "Receipt images or documents",
      },
    ],
  },

  "transport-management/geofence": {
    schema: "transport-management",
    entity: "Geofence",
    enum: "TransportManagementGeofence",
    description:
      "Defines geographic boundaries for area monitoring and automated alerts when vehicles enter/exit zones",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Warehouse Zone', 'Delivery Area'",
        fieldDescription: "Geofence name",
      },
      {
        name: "coordinates",
        type: "text",
        required: true,
        group: "Location",
        tooltip: "e.g., 'latitude,longitude'",
        fieldDescription: "Center coordinates (latitude, longitude)",
      },
      {
        name: "radius",
        type: "number",
        required: true,
        group: "Boundaries",
        tooltip: "e.g., '500', '1000'",
        fieldDescription: "Radius in meters",
      },
    ],
  },

  "transport-management/geofence-events": {
    schema: "transport-management",
    entity: "GeofenceEvent",
    enum: "TransportManagementGeofenceEvents",
    description:
      "Records geofence entry/exit events for vehicles with timestamp and event type",
    fields: [
      {
        name: "geofence",
        type: "relation",
        required: true,
        group: "Geofence",
        tooltip: "Select geofence",
        fieldDescription: "Associated geofence",
        collectionName: "transport_management_geofence",
        displayField: "name",
        recordType: "TransportManagementGeofenceResponse",
      },
      {
        name: "vehicle",
        type: "relation",
        required: true,
        group: "Vehicle",
        tooltip: "Select vehicle",
        fieldDescription: "Associated vehicle",
        collectionName: "transport_management_vehicles",
        displayField: "registrationNumber",
        recordType: "TransportManagementVehiclesResponse",
      },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Event Type",
        tooltip: "Select event type",
        fieldDescription: "Entry or exit event",
        options: ["enter", "exit"],
      },
      {
        name: "timestamp",
        type: "datetime",
        required: true,
        group: "Timing",
        tooltip: "e.g., '2025-01-20 14:30'",
        fieldDescription: "When event occurred",
      },
    ],
  },

  "transport-management/gps-pings": {
    schema: "transport-management",
    entity: "GpsPing",
    enum: "TransportManagementGpsPings",
    description:
      "Records GPS tracking data for vehicles with coordinates and timestamps for route history",
    fields: [
      {
        name: "vehicle",
        type: "relation",
        required: true,
        group: "Vehicle",
        tooltip: "Select vehicle",
        fieldDescription: "Associated vehicle",
        collectionName: "transport_management_vehicles",
        displayField: "registrationNumber",
        recordType: "TransportManagementVehiclesResponse",
      },
      {
        name: "coordinates",
        type: "text",
        required: true,
        group: "Location",
        tooltip: "e.g., 'latitude,longitude'",
        fieldDescription: "GPS coordinates (latitude, longitude)",
      },
      {
        name: "timestamp",
        type: "datetime",
        required: true,
        group: "Timing",
        tooltip: "e.g., '2025-01-20 14:30'",
        fieldDescription: "When GPS ping was recorded",
      },
    ],
  },

  "transport-management/partner-invoice": {
    schema: "transport-management",
    entity: "PartnerInvoice",
    enum: "TransportManagementPartnerInvoice",
    description:
      "Tracks invoices from carrier partners with status and line item details for vendor management",
    fields: [
      {
        name: "carrier",
        type: "relation",
        required: true,
        group: "Carrier",
        tooltip: "Select carrier",
        fieldDescription: "Associated carrier",
        collectionName: "transport_management_carriers",
        displayField: "name",
        recordType: "TransportManagementCarriersResponse",
      },
      {
        name: "invoiceNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'PI-2025-001'",
        fieldDescription: "Partner invoice number",
      },
      {
        name: "invoiceDate",
        type: "date",
        required: true,
        group: "Dates",
        tooltip: "e.g., '2025-01-15'",
        fieldDescription: "Invoice date",
      },
      {
        name: "totalAmount",
        type: "number",
        required: true,
        group: "Amount",
        tooltip: "e.g., '50000'",
        fieldDescription: "Total invoice amount",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select invoice status",
        fieldDescription: "Payment status",
        options: ["pending", "paid", "disputed", "overdue", "cancelled"],
      },
      {
        name: "items",
        type: "relation",
        required: false,
        group: "Items",
        tooltip: "Select items",
        fieldDescription: "Line items on invoice",
        collectionName: "transport_management_partner_invoice_items",
        displayField: "id",
        recordType: "TransportManagementPartnerInvoiceItemsResponse",
      },
    ],
  },

  "transport-management/partner-invoice-items": {
    schema: "transport-management",
    entity: "PartnerInvoiceItem",
    enum: "TransportManagementPartnerInvoiceItems",
    description:
      "Line items for partner invoices linking to shipment legs for detailed billing",
    fields: [
      {
        name: "partnerInvoice",
        type: "relation",
        required: true,
        group: "Invoice",
        tooltip: "Select invoice",
        fieldDescription: "Parent partner invoice",
        collectionName: "transport_management_partner_invoice",
        displayField: "invoiceNumber",
        recordType: "TransportManagementPartnerInvoiceResponse",
      },
      {
        name: "shipmentLeg",
        type: "relation",
        required: true,
        group: "Shipment",
        tooltip: "Select shipment leg",
        fieldDescription: "Associated shipment leg",
        collectionName: "transport_management_shipment_legs",
        displayField: "id",
        recordType: "TransportManagementShipmentLegsResponse",
      },
      {
        name: "amount",
        type: "number",
        required: true,
        group: "Amount",
        tooltip: "e.g., '5000'",
        fieldDescription: "Line item amount",
      },
    ],
  },

  "transport-management/proof-of-deliveries": {
    schema: "transport-management",
    entity: "ProofOfDelivery",
    enum: "TransportManagementProofOfDeliveries",
    description:
      "Records proof of delivery for transport shipments with signatures and photos",
    fields: [
      {
        name: "tripStop",
        type: "relation",
        required: true,
        group: "Delivery",
        tooltip: "Select trip stop",
        fieldDescription: "Associated trip stop",
        collectionName: "transport_management_trip_stops",
        displayField: "id",
        recordType: "TransportManagementTripStopsResponse",
      },
      {
        name: "coordinate",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., 'latitude,longitude'",
        fieldDescription: "Delivery coordinates",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Evidence",
        tooltip: "File names or references",
        fieldDescription: "Photos or signature images",
      },
    ],
  },

  "transport-management/routes": {
    schema: "transport-management",
    entity: "Route",
    enum: "TransportManagementRoutes",
    description:
      "Defines transport routes with waypoints, distance, and duration for trip planning",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Metro Manila Route'",
        fieldDescription: "Route name",
      },
      {
        name: "totalDistance",
        type: "number",
        required: true,
        group: "Route Details",
        tooltip: "e.g., '150.5'",
        fieldDescription: "Total distance in km",
      },
      {
        name: "totalDuration",
        type: "number",
        required: true,
        group: "Route Details",
        tooltip: "e.g., '240'",
        fieldDescription: "Total duration in minutes",
      },
    ],
  },

  "transport-management/shipment-leg-events": {
    schema: "transport-management",
    entity: "ShipmentLegEvent",
    enum: "TransportManagementShipmentLegEvents",
    description:
      "Tracks status events for shipment legs with location and message for shipment tracking",
    fields: [
      {
        name: "shipmentLegId",
        type: "relation",
        required: true,
        group: "Shipment",
        tooltip: "Select shipment leg",
        fieldDescription: "Associated shipment leg",
        collectionName: "transport_management_shipment_legs",
        displayField: "id",
        recordType: "TransportManagementShipmentLegsResponse",
      },
      {
        name: "location",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., 'latitude,longitude'",
        fieldDescription: "Event location coordinates",
      },
      {
        name: "message",
        type: "text",
        required: true,
        group: "Message",
        tooltip: "e.g., 'In transit'",
        fieldDescription: "Event message or status",
      },
      {
        name: "timestamp",
        type: "datetime",
        required: true,
        group: "Timing",
        tooltip: "e.g., '2025-01-20 14:30'",
        fieldDescription: "When event occurred",
      },
    ],
  },

  "transport-management/shipment-legs": {
    schema: "transport-management",
    entity: "ShipmentLeg",
    enum: "TransportManagementShipmentLegs",
    description:
      "Represents individual legs of a multi-leg shipment with carrier and route information",
    fields: [
      {
        name: "shipment",
        type: "relation",
        required: false,
        group: "Shipment",
        tooltip: "Select shipment",
        fieldDescription: "Parent shipment",
        collectionName: "warehouse_management_packages",
        displayField: "packageNumber",
        recordType: "WarehouseManagementPackagesResponse",
      },
      {
        name: "carrier",
        type: "relation",
        required: false,
        group: "Carrier",
        tooltip: "Select carrier",
        fieldDescription: "Carrier for this leg",
        collectionName: "transport_management_carriers",
        displayField: "name",
        recordType: "TransportManagementCarriersResponse",
      },
      {
        name: "startLocation",
        type: "text",
        required: true,
        group: "Route",
        tooltip: "e.g., 'latitude,longitude'",
        fieldDescription: "Start location coordinates",
      },
      {
        name: "endLocation",
        type: "text",
        required: true,
        group: "Route",
        tooltip: "e.g., 'latitude,longitude'",
        fieldDescription: "End location coordinates",
      },
      {
        name: "legSequence",
        type: "number",
        required: true,
        group: "Sequence",
        tooltip: "e.g., '1', '2'",
        fieldDescription: "Sequence number in shipment",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "Select leg status",
        fieldDescription: "Current status",
        options: ["pending", "in-transit", "delivered", "cancelled", "failed"],
      },
      {
        name: "internalTrip",
        type: "relation",
        required: false,
        group: "Trip",
        tooltip: "Select trip",
        fieldDescription: "Associated internal trip",
        collectionName: "transport_management_trips",
        displayField: "id",
        recordType: "TransportManagementTripsResponse",
      },
    ],
  },

  // ============= WAREHOUSE MANAGEMENT (ADDITIONAL) =============
  "warehouse-management/bin-threshold": {
    schema: "warehouse-management",
    entity: "BinThreshold",
    enum: "WarehouseManagementBinThreshold",
    description:
      "Defines alert thresholds for bin stock levels with min/max quantities for automated replenishment",
    fields: [
      {
        name: "product",
        type: "relation",
        required: true,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Associated product",
        collectionName: "warehouse_management_products",
        displayField: "name",
        recordType: "WarehouseManagementProductsResponse",
      },
      {
        name: "location",
        type: "relation",
        required: true,
        group: "Location",
        tooltip: "Select location",
        fieldDescription: "Bin location",
        collectionName: "warehouse_management_locations",
        displayField: "name",
        recordType: "WarehouseManagementLocationsResponse",
      },
      {
        name: "minQuantity",
        type: "number",
        required: false,
        group: "Thresholds",
        tooltip: "e.g., '10'",
        fieldDescription: "Minimum quantity before alert",
      },
      {
        name: "maxQuantity",
        type: "number",
        required: false,
        group: "Thresholds",
        tooltip: "e.g., '100'",
        fieldDescription: "Maximum quantity capacity",
      },
      {
        name: "reorderQuantity",
        type: "number",
        required: false,
        group: "Replenishment",
        tooltip: "e.g., '50'",
        fieldDescription: "Quantity to reorder when minimum reached",
      },
      {
        name: "alertThreshold",
        type: "number",
        required: false,
        group: "Alerts",
        tooltip: "e.g., '20'",
        fieldDescription: "Alert threshold quantity",
      },
      {
        name: "isActive",
        type: "text",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no'",
        fieldDescription: "Whether threshold is active",
      },
    ],
  },

  "warehouse-management/inbound-shipments": {
    schema: "warehouse-management",
    entity: "InboundShipment",
    enum: "WarehouseManagementInboundShipments",
    description:
      "Tracks incoming shipments from suppliers with expected/actual dates and status",
    fields: [
      {
        name: "client",
        type: "relation",
        required: true,
        group: "Client",
        tooltip: "Select client",
        fieldDescription: "Associated client",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "warehouse",
        type: "relation",
        required: true,
        group: "Warehouse",
        tooltip: "Select warehouse",
        fieldDescription: "Destination warehouse",
        collectionName: "warehouse_management_warehouses",
        displayField: "name",
        recordType: "WarehouseManagementWarehousesResponse",
      },
      {
        name: "expectedArrivalDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "Expected arrival date",
      },
      {
        name: "actualArrivalDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "Actual arrival date",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select shipment status",
        fieldDescription: "Current status",
        options: ["pending", "arrived", "processing", "completed", "cancelled"],
      },
    ],
  },

  "warehouse-management/inbound-shipment-items": {
    schema: "warehouse-management",
    entity: "InboundShipmentItem",
    enum: "WarehouseManagementInboundShipmentItems",
    description:
      "Line items for inbound shipments with quantity tracking and discrepancy notes",
    fields: [
      {
        name: "inboundShipment",
        type: "relation",
        required: false,
        group: "Shipment",
        tooltip: "Select shipment",
        fieldDescription: "Parent inbound shipment",
        collectionName: "warehouse_management_inbound_shipments",
        displayField: "id",
        recordType: "WarehouseManagementInboundShipmentsResponse",
      },
      {
        name: "product",
        type: "relation",
        required: false,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Product received",
        collectionName: "warehouse_management_products",
        displayField: "name",
        recordType: "WarehouseManagementProductsResponse",
      },
      {
        name: "expectedQuantity",
        type: "number",
        required: true,
        group: "Quantity",
        tooltip: "e.g., '100'",
        fieldDescription: "Quantity expected",
      },
      {
        name: "receivedQuantity",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., '95'",
        fieldDescription: "Quantity actually received",
      },
      {
        name: "discrepancyNotes",
        type: "textarea",
        required: false,
        group: "Discrepancies",
        tooltip: "e.g., '5 units damaged'",
        fieldDescription: "Notes on any discrepancies",
      },
    ],
  },

  "warehouse-management/outbound-shipments": {
    schema: "warehouse-management",
    entity: "OutboundShipment",
    enum: "WarehouseManagementOutboundShipments",
    description:
      "Tracks outbound shipments to customers with carrier and tracking information",
    fields: [
      {
        name: "salesOrder",
        type: "relation",
        required: true,
        group: "Order",
        tooltip: "Select sales order",
        fieldDescription: "Associated sales order",
        collectionName: "warehouse_management_sales_orders",
        displayField: "orderNumber",
        recordType: "WarehouseManagementSalesOrdersResponse",
      },
      {
        name: "warehouse",
        type: "relation",
        required: true,
        group: "Warehouse",
        tooltip: "Select warehouse",
        fieldDescription: "Source warehouse",
        collectionName: "warehouse_management_warehouses",
        displayField: "name",
        recordType: "WarehouseManagementWarehousesResponse",
      },
      {
        name: "carrier",
        type: "relation",
        required: false,
        group: "Shipping",
        tooltip: "Select carrier",
        fieldDescription: "Shipping carrier",
        collectionName: "transport_management_carriers",
        displayField: "name",
        recordType: "TransportManagementCarriersResponse",
      },
      {
        name: "trackingNumber",
        type: "text",
        required: true,
        group: "Tracking",
        tooltip: "e.g., 'TRK-12345'",
        fieldDescription: "Carrier tracking number",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select shipment status",
        fieldDescription: "Current status",
        options: ["picking", "packed", "shipped", "delivered", "cancelled"],
      },
      {
        name: "items",
        type: "relation",
        required: false,
        group: "Items",
        tooltip: "Select items",
        fieldDescription: "Shipment items",
        collectionName: "warehouse_management_outbound_shipment_items",
        displayField: "id",
        recordType: "WarehouseManagementOutboundShipmentItemsResponse",
      },
    ],
  },

  "warehouse-management/outbound-shipment-items": {
    schema: "warehouse-management",
    entity: "OutboundShipmentItem",
    enum: "WarehouseManagementOutboundShipmentItems",
    description:
      "Line items for outbound shipments linking to sales order items with batch tracking",
    fields: [
      {
        name: "outboundShipment",
        type: "relation",
        required: true,
        group: "Shipment",
        tooltip: "Select shipment",
        fieldDescription: "Parent outbound shipment",
        collectionName: "warehouse_management_outbound_shipments",
        displayField: "id",
        recordType: "WarehouseManagementOutboundShipmentsResponse",
      },
      {
        name: "salesOrderItem",
        type: "relation",
        required: true,
        group: "Order",
        tooltip: "Select order item",
        fieldDescription: "Associated sales order item",
        collectionName: "warehouse_management_sales_order_items",
        displayField: "id",
        recordType: "WarehouseManagementSalesOrderItemsResponse",
      },
      {
        name: "product",
        type: "relation",
        required: true,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Product shipped",
        collectionName: "warehouse_management_products",
        displayField: "name",
        recordType: "WarehouseManagementProductsResponse",
      },
      {
        name: "batch",
        type: "relation",
        required: false,
        group: "Batch",
        tooltip: "Select batch",
        fieldDescription: "Inventory batch",
        collectionName: "warehouse_management_inventory_batches",
        displayField: "batchNumber",
        recordType: "WarehouseManagementInventoryBatchesResponse",
      },
      {
        name: "quantityShipped",
        type: "number",
        required: true,
        group: "Quantity",
        tooltip: "e.g., '50'",
        fieldDescription: "Quantity shipped",
      },
    ],
  },

  "warehouse-management/packages": {
    schema: "warehouse-management",
    entity: "Package",
    enum: "WarehouseManagementPackages",
    description:
      "Represents physical packages with dimensions, weight, fragility flags, and packing details",
    fields: [
      {
        name: "packageNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'PKG-2025-001'",
        fieldDescription: "Unique package number",
      },
      {
        name: "salesOrder",
        type: "relation",
        required: true,
        group: "Order",
        tooltip: "Select sales order",
        fieldDescription: "Associated sales order",
        collectionName: "warehouse_management_sales_orders",
        displayField: "orderNumber",
        recordType: "WarehouseManagementSalesOrdersResponse",
      },
      {
        name: "warehouse",
        type: "relation",
        required: true,
        group: "Warehouse",
        tooltip: "Select warehouse",
        fieldDescription: "Warehouse location",
        collectionName: "warehouse_management_warehouses",
        displayField: "name",
        recordType: "WarehouseManagementWarehousesResponse",
      },
      {
        name: "type",
        type: "text",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Box', 'Pallet'",
        fieldDescription: "Package type",
      },
      {
        name: "length",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., '30'",
        fieldDescription: "Length in cm",
      },
      {
        name: "width",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., '20'",
        fieldDescription: "Width in cm",
      },
      {
        name: "height",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., '15'",
        fieldDescription: "Height in cm",
      },
      {
        name: "weight",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., '5.5'",
        fieldDescription: "Weight in kg",
      },
      {
        name: "isFragile",
        type: "text",
        required: false,
        group: "Flags",
        tooltip: "e.g., 'yes', 'no'",
        fieldDescription: "Whether package contains fragile items",
      },
      {
        name: "isHazmat",
        type: "text",
        required: false,
        group: "Flags",
        tooltip: "e.g., 'yes', 'no'",
        fieldDescription: "Whether package contains hazardous materials",
      },
      {
        name: "requireSignature",
        type: "text",
        required: false,
        group: "Delivery",
        tooltip: "e.g., 'yes', 'no'",
        fieldDescription: "Whether signature is required",
      },
      {
        name: "insuranceValue",
        type: "number",
        required: false,
        group: "Insurance",
        tooltip: "e.g., '10000'",
        fieldDescription: "Insurance value",
      },
      {
        name: "packedByUser",
        type: "relation",
        required: false,
        group: "Packing",
        tooltip: "Select user",
        fieldDescription: "User who packed the package",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "packedAt",
        type: "date",
        required: false,
        group: "Packing",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "When package was packed",
      },
      {
        name: "shippedAt",
        type: "date",
        required: false,
        group: "Shipping",
        tooltip: "e.g., '2025-01-21'",
        fieldDescription: "When package was shipped",
      },
      {
        name: "images",
        type: "text",
        required: false,
        group: "Evidence",
        tooltip: "File names or references",
        fieldDescription: "Package photos",
      },
    ],
  },

  "warehouse-management/package-items": {
    schema: "warehouse-management",
    entity: "PackageItem",
    enum: "WarehouseManagementPackageItems",
    description:
      "Line items for packages with product and batch tracking for packed shipments",
    fields: [
      {
        name: "package",
        type: "relation",
        required: true,
        group: "Package",
        tooltip: "Select package",
        fieldDescription: "Parent package",
        collectionName: "warehouse_management_packages",
        displayField: "packageNumber",
        recordType: "WarehouseManagementPackagesResponse",
      },
      {
        name: "product",
        type: "relation",
        required: true,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Product in package",
        collectionName: "warehouse_management_products",
        displayField: "name",
        recordType: "WarehouseManagementProductsResponse",
      },
      {
        name: "batch",
        type: "relation",
        required: false,
        group: "Batch",
        tooltip: "Select batch",
        fieldDescription: "Inventory batch",
        collectionName: "warehouse_management_inventory_batches",
        displayField: "batchNumber",
        recordType: "WarehouseManagementInventoryBatchesResponse",
      },
      {
        name: "quantity",
        type: "number",
        required: true,
        group: "Quantity",
        tooltip: "e.g., '10'",
        fieldDescription: "Quantity in package",
      },
      {
        name: "lotNumber",
        type: "text",
        required: false,
        group: "Lot",
        tooltip: "e.g., 'LOT-2025-001'",
        fieldDescription: "Lot number",
      },
      {
        name: "expiryDate",
        type: "date",
        required: false,
        group: "Expiry",
        tooltip: "e.g., '2025-12-31'",
        fieldDescription: "Expiration date",
      },
    ],
  },

  "warehouse-management/pick-batches": {
    schema: "warehouse-management",
    entity: "PickBatch",
    enum: "WarehouseManagementPickBatches",
    description:
      "Groups picking tasks into batches with optimization strategy and status tracking for fulfillment",
    fields: [
      {
        name: "warehouse",
        type: "relation",
        required: false,
        group: "Warehouse",
        tooltip: "Select warehouse",
        fieldDescription: "Associated warehouse",
        collectionName: "warehouse_management_warehouses",
        displayField: "name",
        recordType: "WarehouseManagementWarehousesResponse",
      },
      {
        name: "batchNumber",
        type: "text",
        required: false,
        group: "Identification",
        tooltip: "e.g., 'PB-2025-001'",
        fieldDescription: "Batch number",
      },
      {
        name: "priority",
        type: "number",
        required: true,
        group: "Priority",
        tooltip: "e.g., '1', '10'",
        fieldDescription: "Batch priority (lower = higher)",
      },
      {
        name: "strategy",
        type: "select",
        required: false,
        group: "Strategy",
        tooltip: "Select picking strategy",
        fieldDescription: "Picking strategy used",
        options: [
          "batch-picking",
          "zone-picking",
          "wave-picking",
          "single-order-picking",
          "cluster-picking",
        ],
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select batch status",
        fieldDescription: "Current status",
        options: ["open", "in-progress", "completed", "cancelled"],
      },
      {
        name: "assignedUser",
        type: "relation",
        required: false,
        group: "Assignment",
        tooltip: "Select user",
        fieldDescription: "Assigned picker/operator",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "startedAt",
        type: "date",
        required: false,
        group: "Execution",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "When picking started",
      },
      {
        name: "completedAt",
        type: "date",
        required: false,
        group: "Execution",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "When picking completed",
      },
      {
        name: "estimatedDuration",
        type: "number",
        required: false,
        group: "Estimation",
        tooltip: "e.g., '60'",
        fieldDescription: "Estimated duration in minutes",
      },
      {
        name: "actualDuration",
        type: "number",
        required: false,
        group: "Actual",
        tooltip: "e.g., '55'",
        fieldDescription: "Actual duration in minutes",
      },
      {
        name: "totalItems",
        type: "number",
        required: false,
        group: "Items",
        tooltip: "e.g., '100'",
        fieldDescription: "Total items in batch",
      },
      {
        name: "completedItems",
        type: "number",
        required: false,
        group: "Items",
        tooltip: "e.g., '95'",
        fieldDescription: "Items completed",
      },
      {
        name: "items",
        type: "relation",
        required: false,
        group: "Items",
        tooltip: "Select items",
        fieldDescription: "Batch line items",
        collectionName: "warehouse_management_pick_batch_items",
        displayField: "id",
        recordType: "WarehouseManagementPickBatchItemsResponse",
      },
    ],
  },

  "warehouse-management/pick-batch-items": {
    schema: "warehouse-management",
    entity: "PickBatchItem",
    enum: "WarehouseManagementPickBatchItems",
    description:
      "Individual items in pick batches with priority and time tracking for picking operations",
    fields: [
      {
        name: "pickBatch",
        type: "relation",
        required: true,
        group: "Batch",
        tooltip: "Select batch",
        fieldDescription: "Parent pick batch",
        collectionName: "warehouse_management_pick_batches",
        displayField: "batchNumber",
        recordType: "WarehouseManagementPickBatchesResponse",
      },
      {
        name: "salesOrder",
        type: "relation",
        required: true,
        group: "Order",
        tooltip: "Select sales order",
        fieldDescription: "Associated sales order",
        collectionName: "warehouse_management_sales_orders",
        displayField: "orderNumber",
        recordType: "WarehouseManagementSalesOrdersResponse",
      },
      {
        name: "orderPriority",
        type: "number",
        required: false,
        group: "Priority",
        tooltip: "e.g., '1', '10'",
        fieldDescription: "Order priority in batch",
      },
      {
        name: "estimatedPickTime",
        type: "date",
        required: false,
        group: "Timing",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "Estimated pick time",
      },
      {
        name: "actualPickTime",
        type: "number",
        required: false,
        group: "Timing",
        tooltip: "e.g., '30'",
        fieldDescription: "Actual pick time in seconds",
      },
    ],
  },

  "warehouse-management/putaway-rules": {
    schema: "warehouse-management",
    entity: "PutawayRule",
    enum: "WarehouseManagementPutawayRules",
    description:
      "Defines rules for automatic putaway assignment with location preferences and constraints",
    fields: [
      {
        name: "warehouse",
        type: "relation",
        required: true,
        group: "Warehouse",
        tooltip: "Select warehouse",
        fieldDescription: "Associated warehouse",
        collectionName: "warehouse_management_warehouses",
        displayField: "name",
        recordType: "WarehouseManagementWarehousesResponse",
      },
      {
        name: "product",
        type: "relation",
        required: true,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Product for rule",
        collectionName: "warehouse_management_products",
        displayField: "name",
        recordType: "WarehouseManagementProductsResponse",
      },
      {
        name: "client",
        type: "relation",
        required: false,
        group: "Client",
        tooltip: "Select client",
        fieldDescription: "Optional client restriction",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "locationType",
        type: "select",
        required: true,
        group: "Location",
        tooltip: "Select location type",
        fieldDescription: "Preferred location type",
        options: [
          "receiving-dock",
          "pick-bin",
          "packing-station",
          "cross-dock-area",
          "bulk-storage",
          "reserve-storage",
          "damaged-goods",
          "staging-area",
          "quality-control",
          "returns-area",
        ],
      },
      {
        name: "preferredLocation",
        type: "relation",
        required: false,
        group: "Location",
        tooltip: "Select location",
        fieldDescription: "Preferred storage location",
        collectionName: "warehouse_management_locations",
        displayField: "name",
        recordType: "WarehouseManagementLocationsResponse",
      },
      {
        name: "priority",
        type: "number",
        required: true,
        group: "Priority",
        tooltip: "e.g., '1', '10'",
        fieldDescription: "Rule priority (lower = higher)",
      },
      {
        name: "minQuantity",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., '10'",
        fieldDescription: "Minimum quantity threshold",
      },
      {
        name: "maxQuantity",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., '1000'",
        fieldDescription: "Maximum quantity allowed",
      },
      {
        name: "volumeThreshold",
        type: "number",
        required: false,
        group: "Capacity",
        tooltip: "e.g., '50'",
        fieldDescription: "Volume threshold in cubic meters",
      },
      {
        name: "weightThreshold",
        type: "number",
        required: false,
        group: "Capacity",
        tooltip: "e.g., '500'",
        fieldDescription: "Weight threshold in kg",
      },
      {
        name: "requireTemperatureControl",
        type: "text",
        required: false,
        group: "Requirements",
        tooltip: "e.g., 'yes', 'no'",
        fieldDescription: "Whether temperature control required",
      },
      {
        name: "requireHazmatApproval",
        type: "text",
        required: false,
        group: "Requirements",
        tooltip: "e.g., 'yes', 'no'",
        fieldDescription: "Whether hazmat approval required",
      },
      {
        name: "isActive",
        type: "text",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no'",
        fieldDescription: "Whether rule is active",
      },
    ],
  },

  "warehouse-management/reorder-points": {
    schema: "warehouse-management",
    entity: "ReorderPoint",
    enum: "WarehouseManagementReorderPoints",
    description:
      "Defines stock reorder thresholds for automatic purchase order generation",
    fields: [
      {
        name: "warehouse",
        type: "relation",
        required: true,
        group: "Warehouse",
        tooltip: "Select warehouse",
        fieldDescription: "Associated warehouse",
        collectionName: "warehouse_management_warehouses",
        displayField: "name",
        recordType: "WarehouseManagementWarehousesResponse",
      },
      {
        name: "product",
        type: "relation",
        required: true,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Product for reorder",
        collectionName: "warehouse_management_products",
        displayField: "name",
        recordType: "WarehouseManagementProductsResponse",
      },
      {
        name: "threshold",
        type: "number",
        required: false,
        group: "Threshold",
        tooltip: "e.g., '50'",
        fieldDescription: "Reorder threshold quantity",
      },
    ],
  },

  "warehouse-management/returns": {
    schema: "warehouse-management",
    entity: "Return",
    enum: "WarehouseManagementReturns",
    description:
      "Manages product returns from customers with status tracking and reason tracking",
    fields: [
      {
        name: "returnNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'RET-2025-001'",
        fieldDescription: "Unique return number",
      },
      {
        name: "client",
        type: "relation",
        required: false,
        group: "Client",
        tooltip: "Select client",
        fieldDescription: "Customer returning items",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "salesOrder",
        type: "relation",
        required: false,
        group: "Order",
        tooltip: "Select sales order",
        fieldDescription: "Original sales order",
        collectionName: "warehouse_management_sales_orders",
        displayField: "orderNumber",
        recordType: "WarehouseManagementSalesOrdersResponse",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "Select return status",
        fieldDescription: "Current return status",
        options: [
          "requested",
          "approved",
          "rejeceted",
          "received",
          "processed",
        ],
      },
      {
        name: "reason",
        type: "textarea",
        required: false,
        group: "Reason",
        tooltip: "e.g., 'Defective product'",
        fieldDescription: "Reason for return",
      },
    ],
  },

  "warehouse-management/return-items": {
    schema: "warehouse-management",
    entity: "ReturnItem",
    enum: "WarehouseManagementReturnItems",
    description:
      "Line items for product returns with condition assessment and quantity tracking",
    fields: [
      {
        name: "return",
        type: "relation",
        required: true,
        group: "Return",
        tooltip: "Select return",
        fieldDescription: "Parent return",
        collectionName: "warehouse_management_returns",
        displayField: "returnNumber",
        recordType: "WarehouseManagementReturnsResponse",
      },
      {
        name: "product",
        type: "relation",
        required: true,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Returned product",
        collectionName: "warehouse_management_products",
        displayField: "name",
        recordType: "WarehouseManagementProductsResponse",
      },
      {
        name: "quantityExpected",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., '5'",
        fieldDescription: "Quantity expected to return",
      },
      {
        name: "quantityRecevied",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., '5'",
        fieldDescription: "Quantity actually received",
      },
      {
        name: "condition",
        type: "select",
        required: false,
        group: "Condition",
        tooltip: "Select condition",
        fieldDescription: "Item condition",
        options: ["sellable", "damaged", "defective", "expired", "unsellable"],
      },
    ],
  },

  "warehouse-management/sales-order-items": {
    schema: "warehouse-management",
    entity: "SalesOrderItem",
    enum: "WarehouseManagementSalesOrderItems",
    description:
      "Line items for sales orders with product and quantity details for fulfillment",
    fields: [
      {
        name: "salesOrder",
        type: "relation",
        required: false,
        group: "Order",
        tooltip: "Select sales order",
        fieldDescription: "Parent sales order",
        collectionName: "warehouse_management_sales_orders",
        displayField: "orderNumber",
        recordType: "WarehouseManagementSalesOrdersResponse",
      },
      {
        name: "product",
        type: "relation",
        required: false,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Product ordered",
        collectionName: "warehouse_management_products",
        displayField: "name",
        recordType: "WarehouseManagementProductsResponse",
      },
      {
        name: "quantityOrdered",
        type: "number",
        required: true,
        group: "Quantity",
        tooltip: "e.g., '50'",
        fieldDescription: "Quantity ordered",
      },
    ],
  },

  "warehouse-management/stock-transfer": {
    schema: "warehouse-management",
    entity: "StockTransfer",
    enum: "WarehouseManagementStockTransfer",
    description:
      "Tracks inter-warehouse stock transfers with status and quantity tracking",
    fields: [
      {
        name: "sourceWarehouse",
        type: "relation",
        required: true,
        group: "Source",
        tooltip: "Select warehouse",
        fieldDescription: "Sending warehouse",
        collectionName: "warehouse_management_warehouses",
        displayField: "name",
        recordType: "WarehouseManagementWarehousesResponse",
      },
      {
        name: "destinationWarehouse",
        type: "relation",
        required: true,
        group: "Destination",
        tooltip: "Select warehouse",
        fieldDescription: "Receiving warehouse",
        collectionName: "warehouse_management_warehouses",
        displayField: "name",
        recordType: "WarehouseManagementWarehousesResponse",
      },
      {
        name: "product",
        type: "relation",
        required: false,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Product being transferred",
        collectionName: "warehouse_management_products",
        displayField: "name",
        recordType: "WarehouseManagementProductsResponse",
      },
      {
        name: "quantity",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., '100'",
        fieldDescription: "Quantity to transfer",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select transfer status",
        fieldDescription: "Current status",
        options: ["pending", "in-transit", "received", "cancelled"],
      },
    ],
  },

  "warehouse-management/suppliers": {
    schema: "warehouse-management",
    entity: "Supplier",
    enum: "WarehouseManagementSuppliers",
    description:
      "Manages supplier information with contact details and client associations",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'ABC Suppliers Inc'",
        fieldDescription: "Supplier name",
      },
      {
        name: "client",
        type: "relation",
        required: false,
        group: "Client",
        tooltip: "Select client",
        fieldDescription: "Associated client",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "email",
        type: "email",
        required: false,
        group: "Contact",
        tooltip: "e.g., 'info@supplier.com'",
        fieldDescription: "Supplier email",
      },
      {
        name: "phoneNumber",
        type: "text",
        required: false,
        group: "Contact",
        tooltip: "e.g., '+63 2 1234 5678'",
        fieldDescription: "Supplier phone",
      },
      {
        name: "contactPerson",
        type: "text",
        required: false,
        group: "Contact",
        tooltip: "e.g., 'John Manager'",
        fieldDescription: "Primary contact person",
      },
    ],
  },

  "warehouse-management/task-items": {
    schema: "warehouse-management",
    entity: "TaskItem",
    enum: "WarehouseManagementTaskItems",
    description:
      "Line items for warehouse tasks with source/destination locations and batch tracking",
    fields: [
      {
        name: "task",
        type: "relation",
        required: false,
        group: "Task",
        tooltip: "Select task",
        fieldDescription: "Parent warehouse task",
        collectionName: "warehouse_management_tasks",
        displayField: "taskNumber",
        recordType: "WarehouseManagementTasksResponse",
      },
      {
        name: "product",
        type: "relation",
        required: false,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Product for task",
        collectionName: "warehouse_management_products",
        displayField: "name",
        recordType: "WarehouseManagementProductsResponse",
      },
      {
        name: "batch",
        type: "relation",
        required: false,
        group: "Batch",
        tooltip: "Select batch",
        fieldDescription: "Inventory batch",
        collectionName: "warehouse_management_inventory_batches",
        displayField: "batchNumber",
        recordType: "WarehouseManagementInventoryBatchesResponse",
      },
      {
        name: "sourceLocation",
        type: "relation",
        required: false,
        group: "Source",
        tooltip: "Select location",
        fieldDescription: "Source location",
        collectionName: "warehouse_management_locations",
        displayField: "name",
        recordType: "WarehouseManagementLocationsResponse",
      },
      {
        name: "destinationLocation",
        type: "relation",
        required: false,
        group: "Destination",
        tooltip: "Select location",
        fieldDescription: "Destination location",
        collectionName: "warehouse_management_locations",
        displayField: "name",
        recordType: "WarehouseManagementLocationsResponse",
      },
      {
        name: "quantityRequired",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., '50'",
        fieldDescription: "Quantity required",
      },
      {
        name: "quantityCompleted",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., '45'",
        fieldDescription: "Quantity completed",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select item status",
        fieldDescription: "Item status",
        options: [
          "pending",
          "in-progress",
          "completed",
          "short-picked",
          "damaged",
          "not-found",
        ],
      },
      {
        name: "lotNumber",
        type: "number",
        required: false,
        group: "Lot",
        tooltip: "e.g., '001'",
        fieldDescription: "Lot number",
      },
      {
        name: "expiryDate",
        type: "date",
        required: false,
        group: "Expiry",
        tooltip: "e.g., '2025-12-31'",
        fieldDescription: "Expiration date",
      },
      {
        name: "completedAt",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "When item was completed",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Item not found in bin'",
        fieldDescription: "Task notes",
      },
      {
        name: "proofs",
        type: "text",
        required: false,
        group: "Evidence",
        tooltip: "File names or references",
        fieldDescription: "Proof documents or photos",
      },
    ],
  },

  "warehouse-management/tasks": {
    schema: "warehouse-management",
    entity: "Task",
    enum: "WarehouseManagementTasks",
    description:
      "Manages warehouse tasks (putaway, pick, pack, count) with assignment and status tracking",
    fields: [
      {
        name: "taskNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'TASK-2025-001'",
        fieldDescription: "Unique task number",
      },
      {
        name: "warehouse",
        type: "relation",
        required: false,
        group: "Warehouse",
        tooltip: "Select warehouse",
        fieldDescription: "Associated warehouse",
        collectionName: "warehouse_management_warehouses",
        displayField: "name",
        recordType: "WarehouseManagementWarehousesResponse",
      },
      {
        name: "type",
        type: "select",
        required: false,
        group: "Task Type",
        tooltip: "Select task type",
        fieldDescription: "Type of task",
        options: [
          "putaway",
          "pick",
          "pack",
          "replenishment",
          "cycle-count",
          "cross-dock",
          "returns-processing",
          "damage-inspection",
          "quality-check",
        ],
      },
      {
        name: "priority",
        type: "number",
        required: true,
        group: "Priority",
        tooltip: "e.g., '1', '10'",
        fieldDescription: "Task priority (lower = higher)",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Select task status",
        fieldDescription: "Current status",
        options: [
          "pending",
          "assigned",
          "in-progress",
          "completed",
          "cancelled",
          "error",
        ],
      },
      {
        name: "user",
        type: "relation",
        required: false,
        group: "Assignment",
        tooltip: "Select user",
        fieldDescription: "Assigned operator",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "pickBatchId",
        type: "relation",
        required: false,
        group: "Batch",
        tooltip: "Select batch",
        fieldDescription: "Associated pick batch",
        collectionName: "warehouse_management_pick_batches",
        displayField: "batchNumber",
        recordType: "WarehouseManagementPickBatchesResponse",
      },
      {
        name: "startTime",
        type: "date",
        required: false,
        group: "Execution",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "Task start time",
      },
      {
        name: "endTime",
        type: "date",
        required: false,
        group: "Execution",
        tooltip: "e.g., '2025-01-20'",
        fieldDescription: "Task end time",
      },
      {
        name: "instructions",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Pick items from bin A1'",
        fieldDescription: "Task instructions",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Items not available'",
        fieldDescription: "Task notes",
      },
      {
        name: "attachments",
        type: "text",
        required: false,
        group: "Evidence",
        tooltip: "File names or references",
        fieldDescription: "Task attachments",
      },
    ],
  },

  "warehouse-management/inventory-adjustment": {
    schema: "warehouse-management",
    entity: "InventoryAdjustment",
    enum: "WarehouseManagementInventoryAdjustment",
    description:
      "Records inventory quantity adjustments for cycle counts, damage, theft, or corrections",
    fields: [
      {
        name: "warehouse",
        type: "relation",
        required: true,
        group: "Warehouse",
        tooltip: "Select warehouse",
        fieldDescription: "Associated warehouse",
        collectionName: "warehouse_management_warehouses",
        displayField: "name",
        recordType: "WarehouseManagementWarehousesResponse",
      },
      {
        name: "product",
        type: "relation",
        required: true,
        group: "Product",
        tooltip: "Select product",
        fieldDescription: "Product adjusted",
        collectionName: "warehouse_management_products",
        displayField: "name",
        recordType: "WarehouseManagementProductsResponse",
      },
      {
        name: "quantityChange",
        type: "number",
        required: true,
        group: "Adjustment",
        tooltip: "e.g., '-5' or '10'",
        fieldDescription: "Quantity change (positive or negative)",
      },
      {
        name: "reason",
        type: "select",
        required: true,
        group: "Reason",
        tooltip: "Select adjustment reason",
        fieldDescription: "Reason for adjustment",
        options: [
          "cycle-count",
          "damaged-goods",
          "theft",
          "expired",
          "return-to-vendor",
          "manual-correction",
        ],
      },
      {
        name: "user",
        type: "relation",
        required: true,
        group: "User",
        tooltip: "Select user",
        fieldDescription: "User making adjustment",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Cycle count variance'",
        fieldDescription: "Adjustment notes",
      },
    ],
  },

  // ============= OTHER =============
  "notifications/notifications": {
    schema: "notifications",
    entity: "Notification",
    enum: "Notifications",
    description:
      "Manages system notifications for users with read status and optional links",
    fields: [
      {
        name: "user",
        type: "relation",
        required: true,
        group: "User",
        tooltip: "Select user",
        fieldDescription: "Recipient user",
        collectionName: "users",
        displayField: "username",
        recordType: "UsersResponse",
      },
      {
        name: "message",
        type: "textarea",
        required: true,
        group: "Message",
        tooltip: "e.g., 'Order #123 ready for pickup'",
        fieldDescription: "Notification message",
      },
      {
        name: "link",
        type: "text",
        required: false,
        group: "Action",
        tooltip: "e.g., '/orders/123'",
        fieldDescription: "Optional link to related resource",
      },
      {
        name: "isRead",
        type: "text",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no'",
        fieldDescription: "Whether notification has been read",
      },
    ],
  },

  "users/users": {
    schema: "users",
    entity: "User",
    enum: "Users",
    description:
      "Manages system users with authentication, profile, and role information",
    fields: [
      {
        name: "email",
        type: "email",
        required: true,
        group: "Authentication",
        tooltip: "e.g., 'user@example.com'",
        fieldDescription: "User email address",
      },
      {
        name: "username",
        type: "text",
        required: false,
        group: "Profile",
        tooltip: "e.g., 'john_doe'",
        fieldDescription: "User username",
      },
      {
        name: "name",
        type: "text",
        required: false,
        group: "Profile",
        tooltip: "e.g., 'John Doe'",
        fieldDescription: "User full name",
      },
      {
        name: "avatar",
        type: "text",
        required: false,
        group: "Profile",
        tooltip: "File name or reference",
        fieldDescription: "User avatar image",
      },
      {
        name: "roles",
        type: "text",
        required: false,
        group: "Permissions",
        tooltip: "Comma-separated roles",
        fieldDescription: "User roles",
      },
      {
        name: "verified",
        type: "text",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no'",
        fieldDescription: "Whether email is verified",
      },
      {
        name: "emailVisibility",
        type: "text",
        required: false,
        group: "Privacy",
        tooltip: "e.g., 'yes', 'no'",
        fieldDescription: "Whether email is visible to others",
      },
    ],
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert camelCase to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * Convert camelCase/PascalCase to Title Case
 */
function toTitleCase(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

/**
 * Map collection name (snake_case) to Collections enum key (PascalCase)
 */
function getEnumFromCollection(collectionName: string): string {
  const mapping: Record<string, string> = {
    users: "Users",
    notifications: "Notifications",
    customer_relations_campaigns: "CustomerRelationsCampaigns",
    customer_relations_cases: "CustomerRelationsCases",
    customer_relations_companies: "CustomerRelationsCompanies",
    customer_relations_contacts: "CustomerRelationsContacts",
    customer_relations_interactions: "CustomerRelationsInteractions",
    customer_relations_invoices: "CustomerRelationsInvoices",
    customer_relations_invoice_items: "CustomerRelationsInvoiceItems",
    customer_relations_leads: "CustomerRelationsLeads",
    customer_relations_opportunities: "CustomerRelationsOpportunities",
    customer_relations_opportunity_products:
      "CustomerRelationsOpportunityProducts",
    customer_relations_products: "CustomerRelationsProducts",
    billing_management_account_transactions:
      "BillingManagementAccountTransactions",
    billing_management_disputes: "BillingManagementDisputes",
    billing_management_invoice_line_items: "BillingManagementInvoiceLineItems",
    billing_management_invoices: "BillingManagementInvoices",
    billing_management_logs: "BillingManagementLogs",
    billing_management_quotes: "BillingManagementQuotes",
    billing_management_rate_cards: "BillingManagementRateCards",
    delivery_management_driver_location: "DeliveryManagementDriverLocation",
    delivery_management_proof_of_deliveries:
      "DeliveryManagementProofOfDeliveries",
    delivery_management_task_events: "DeliveryManagementTaskEvents",
    delivery_management_routes: "DeliveryManagementRoutes",
    delivery_management_tasks: "DeliveryManagementTasks",
    transport_management_carrier_rates: "TransportManagementCarrierRates",
    transport_management_carriers: "TransportManagementCarriers",
    transport_management_driver_schedules: "TransportManagementDriverSchedules",
    transport_management_drivers: "TransportManagementDrivers",
    transport_management_expenses: "TransportManagementExpenses",
    transport_management_geofence: "TransportManagementGeofence",
    transport_management_geofence_events: "TransportManagementGeofenceEvents",
    transport_management_gps_pings: "TransportManagementGpsPings",
    transport_management_partner_invoice: "TransportManagementPartnerInvoice",
    transport_management_partner_invoice_items:
      "TransportManagementPartnerInvoiceItems",
    transport_management_proof_of_deliveries:
      "TransportManagementProofOfDeliveries",
    transport_management_routes: "TransportManagementRoutes",
    transport_management_shipment_leg_events:
      "TransportManagementShipmentLegEvents",
    transport_management_shipment_legs: "TransportManagementShipmentLegs",
    transport_management_trips: "TransportManagementTrips",
    transport_management_trip_stops: "TransportManagementTripStops",
    transport_management_vehicles: "TransportManagementVehicles",
    warehouse_management_bin_threshold: "WarehouseManagementBinThreshold",
    warehouse_management_inbound_shipment_items:
      "WarehouseManagementInboundShipmentItems",
    warehouse_management_inbound_shipments:
      "WarehouseManagementInboundShipments",
    warehouse_management_inventory_adjustment:
      "WarehouseManagementInventoryAdjustment",
    warehouse_management_inventory_batches:
      "WarehouseManagementInventoryBatches",
    warehouse_management_inventory_stock: "WarehouseManagementInventoryStock",
    warehouse_management_locations: "WarehouseManagementLocations",
    warehouse_management_outbound_shipment_items:
      "WarehouseManagementOutboundShipmentItems",
    warehouse_management_outbound_shipments:
      "WarehouseManagementOutboundShipments",
    warehouse_management_package_items: "WarehouseManagementPackageItems",
    warehouse_management_packages: "WarehouseManagementPackages",
    warehouse_management_pick_batch_items: "WarehouseManagementPickBatchItems",
    warehouse_management_pick_batches: "WarehouseManagementPickBatches",
    warehouse_management_products: "WarehouseManagementProducts",
    warehouse_management_putaway_rules: "WarehouseManagementPutawayRules",
    warehouse_management_reorder_points: "WarehouseManagementReorderPoints",
    warehouse_management_return_items: "WarehouseManagementReturnItems",
    warehouse_management_returns: "WarehouseManagementReturns",
    warehouse_management_sales_order_items:
      "WarehouseManagementSalesOrderItems",
    warehouse_management_sales_orders: "WarehouseManagementSalesOrders",
    warehouse_management_stock_transfer: "WarehouseManagementStockTransfer",
    warehouse_management_suppliers: "WarehouseManagementSuppliers",
    warehouse_management_task_items: "WarehouseManagementTaskItems",
    warehouse_management_tasks: "WarehouseManagementTasks",
    warehouse_management_warehouses: "WarehouseManagementWarehouses",
  };

  return (
    mapping[collectionName] || toPascalCase(collectionName.replace(/_/g, "-"))
  );
}

/**
 * Generate field code for form render
 */
function generateFieldCode(
  field: FieldConfig,
  isCreate: boolean = true
): string {
  const label = toTitleCase(field.name);
  const required =
    field.required && isCreate ? `\n                  required` : "";

  switch (field.type) {
    case "text":
      return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.TextField
                  label="${label}"
                  description="${field.fieldDescription}"
                  placeholder=""${required}
                />
              )}
            </form.AppField>`;

    case "email":
      return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.EmailField
                  label="${label}"
                  description="${field.fieldDescription}"
                  placeholder="example@email.com"${required}
                />
              )}
            </form.AppField>`;

    case "number":
      return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.NumberField
                  label="${label}"
                  description="${field.fieldDescription}"
                  placeholder="0"
                  min={0}${required}
                />
              )}
            </form.AppField>`;

    case "date":
      return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.DateTimeField
                  label="${label}"
                  description="${field.fieldDescription}"
                  placeholder=""${required}
                />
              )}
            </form.AppField>`;

    case "datetime":
      return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.DateTimeField
                  label="${label}"
                  description="${field.fieldDescription}"
                  placeholder=""${required}
                />
              )}
            </form.AppField>`;

    case "textarea":
      return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.TextareaField
                  label="${label}"
                  description="${field.fieldDescription}"
                  placeholder=""${required}
                />
              )}
            </form.AppField>`;

    case "select": {
      const options = field.options
        ?.map((opt) => `{ label: "${toTitleCase(opt)}", value: "${opt}" }`)
        .join(",\n                    ");
      return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.SelectField
                  label="${label}"
                  description="${field.fieldDescription}"
                  options={[
                    ${options}
                  ]}
                  placeholder="Select..."${required}
                />
              )}
            </form.AppField>`;
    }

    case "relation": {
      const collectionName = field.collectionName || "Collections.Unknown";
      const displayField = field.displayField || "name";
      const recordType = field.recordType || "unknown";
      const expand = field.expand ? `, expand: "${field.expand}"` : "";
      const renderOptionCode = field.renderOption
        ? `renderOption={(item) => ${field.renderOption}}`
        : `displayField="${displayField}"`;

      return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.RelationField<${recordType}>
                  pocketbase={pocketbase}
                  collectionName={Collections.${getEnumFromCollection(collectionName)}}
                  relationshipName="${field.name}"
                  label="${label}"
                  description="${field.fieldDescription}"
                  ${renderOptionCode}
                  recordListOption={{ ${expand.slice(2)} }}${required}
                />
              )}
            </form.AppField>`;
    }

    default:
      return "";
  }
}

/**
 * Group fields by their group property
 */
function groupFields(fields: FieldConfig[]): Record<string, FieldConfig[]> {
  const grouped: Record<string, FieldConfig[]> = {};
  fields.forEach((field) => {
    const group = field.group || "Other";
    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push(field);
  });
  return grouped;
}

/**
 * Generate form fields JSX
 */
function generateFormFields(
  fields: FieldConfig[],
  isCreate: boolean = true
): string {
  const grouped = groupFields(fields);
  const groups = Object.entries(grouped);

  let content = "        <FieldSet>\n";

  groups.forEach(([groupName, groupFields], index) => {
    if (index > 0) {
      content += `\n          <FieldSeparator>{" "}</FieldSeparator>\n\n`;
    }

    content += `          {/* ${groupName} */}\n`;
    content += `          <FieldGroup>\n`;
    content += `            <FieldLegend>${groupName}</FieldLegend>\n`;
    content += `            <FieldDescription>\n`;
    content += `              Manage ${groupName.toLowerCase()} information\n`;
    content += `            </FieldDescription>\n\n`;

    groupFields.forEach((field) => {
      content += `${generateFieldCode(field, isCreate)}\n`;
    });

    content += `          </FieldGroup>\n`;
  });

  content += `        </FieldSet>`;
  return content;
}

/**
 * Generate complete form file content
 */
function generateFormFile(options: FormTemplateOptions): string {
  const { enumName, pascalEntity, schemaImport, fields } = options;
  const collectionType = `Collections.${enumName}`;
  const recordType = `${enumName}Record`;
  const createType = `Create<${collectionType}>`;
  const updateType = `Update<${collectionType}>`;

  // Check if any relation fields exist
  const hasRelationFields = fields.some((field) => field.type === "relation");

  // Collect unique record types from relation fields
  const recordTypes = new Set<string>();
  fields.forEach((field) => {
    if (field.type === "relation" && field.recordType) {
      recordTypes.add(field.recordType);
    }
  });

  const recordTypeImports = Array.from(recordTypes).join(",\n  ");
  const recordTypeImportSection =
    recordTypes.size > 0 ? `  ${recordTypeImports},\n` : "";

  // Add pocketbase extraction from route context only if there are relation fields
  const pocketbaseExtraction = hasRelationFields
    ? `    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    `
    : "";

  const formFields = generateFormFields(fields, true);

  return `import { formOptions } from "@tanstack/react-form";
import { useNavigate, useRouteContext, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { useAppForm, withForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import {
  Collections,
  Create,
${recordTypeImportSection}  ${recordType},
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { ${schemaImport}Schema } from "@/pocketbase/pb-schemas";

export const MutationSchema = ${schemaImport}Schema.omit({
  id: true,
  created: true,
  updated: true,
});

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as ${createType},
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.${enumName})
        .create(value);

      await toast
        .promise(resultPromise, {
          success: \`${pascalEntity} created successfully\`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: ${recordType}
) =>
  formOptions({
    defaultValues: record as ${updateType},
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.${enumName})
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "${pascalEntity} updated successfully",
        })
        .unwrap();
    },
  });

export const ${pascalEntity}Form = withForm({
  defaultValues: {} as ${createType} | ${updateType},
  render: ({ form }) => {
${pocketbaseExtraction}return (
      <form.AppForm>
${formFields}
      </form.AppForm>
    );
  },
});

const CreateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const form = useAppForm(CreateFormOptionFactory(pocketbase));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <${pascalEntity}Form form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

const UpdateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data: record } = useSuspenseQuery({
    queryKey: ["${pascalEntity.toLowerCase()}", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.${enumName})
        .getOne<${recordType}>(searchQuery.id!),
  });

  const form = useAppForm(UpdateFormOptionFactory(pocketbase, record));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <${pascalEntity}Form form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

export default () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  switch (searchQuery.action) {
    case "create":
      return <CreateForm />;
    case "update":
      return <UpdateForm />;
    default:
      return null;
  }
};
`;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main(): Promise<void> {
  console.log("\n🚀 Form Customization Script (TypeScript)\n");
  console.log(`${"=".repeat(52)}\n`);

  // Check project root
  const packageJsonPath = path.join(projectRoot, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    console.error("❌ Error: Must be run from project root\n");
    process.exit(1);
  }

  console.log("📋 Processing entities:\n");

  let successCount = 0;
  let errorCount = 0;

  for (const [configKey, config] of Object.entries(ENTITY_CONFIGS)) {
    const [schemaPath, entityPath] = configKey.split("/");
    const pascalEntity = toPascalCase(entityPath);
    const schemaImport = toPascalCase(`${schemaPath}-${pascalEntity}`);

    console.log(`  📝 Generating ${pascalEntity} form...`);

    try {
      const formContent = generateFormFile({
        entity: pascalEntity,
        enumName: config.enum,
        schema: config.schema,
        pascalEntity,
        schemaImport,
        fields: config.fields,
      });

      const formFileName = `${entityPath.split("-").join("-")}.tsx`;
      const formPath = path.join(
        projectRoot,
        "src/pocketbase/forms",
        schemaPath,
        formFileName
      );

      // Create directory if it doesn't exist
      const formDir = path.dirname(formPath);
      if (!fs.existsSync(formDir)) {
        fs.mkdirSync(formDir, { recursive: true });
        console.log(`    📁 Created directory: ${schemaPath}`);
      }

      // Write form file
      fs.writeFileSync(formPath, formContent, "utf-8");
      console.log(`    ✅ Generated: ${formFileName}`);
      successCount++;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(`    ❌ Error: ${errorMessage}`);
      errorCount++;
    }
  }

  console.log(`\n${"=".repeat(52)}`);
  console.log(`\n✨ Form generation complete!\n`);
  console.log(`   ✅ Successfully generated: ${successCount} forms`);

  if (errorCount > 0) {
    console.log(`   ❌ Errors encountered: ${errorCount}`);
  }

  console.log("\n🔍 Next steps:\n");
  console.log("   1. Run: bun run check");
  console.log("   2. Review generated files");
  console.log("   3. Test forms in the application\n");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
