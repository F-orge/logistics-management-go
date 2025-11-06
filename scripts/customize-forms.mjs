#!/usr/bin/env node

/**
 * Form Customization Script
 * Automatically updates all customer-relations form files based on mutation specifications
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

// Configuration for each entity with field specifications
const ENTITY_CONFIGS = {
  // ============= BILLING MANAGEMENT =============
  "billing-management/client-accounts": {
    schema: "billing-management",
    entity: "ClientAccount",
    enum: "BillingManagementClientAccounts",
    fields: [
      { name: "client", type: "text", required: true, group: "Basic Information" },
      { name: "walletBalance", type: "number", required: false, group: "Financial" },
      { name: "creditLimit", type: "number", required: false, group: "Credit Management" },
      { name: "isCreditApproved", type: "text", required: false, group: "Credit Management" },
      { name: "paymentTermsDays", type: "number", required: false, group: "Payment Terms" },
    ],
  },
  "billing-management/rate-cards": {
    schema: "billing-management",
    entity: "RateCard",
    enum: "BillingManagementRateCards",
    fields: [
      { name: "name", type: "text", required: true, group: "Basic Information" },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Classification",
        options: ["shipping", "storage", "fulfillment", "handling", "insurance", "customs", "packaging", "returns"],
      },
      { name: "isActive", type: "text", required: true, group: "Status" },
      { name: "description", type: "textarea", required: false, group: "Details" },
      { name: "validFrom", type: "date", required: false, group: "Validity" },
      { name: "validTo", type: "date", required: false, group: "Validity" },
    ],
  },
  "billing-management/rate-rules": {
    schema: "billing-management",
    entity: "RateRule",
    enum: "BillingManagementRateRules",
    fields: [
      { name: "rateCard", type: "text", required: true, group: "Reference" },
      { name: "value", type: "text", required: true, group: "Rule Configuration" },
      { name: "condition", type: "text", required: true, group: "Rule Configuration" },
      { name: "price", type: "number", required: true, group: "Pricing" },
      {
        name: "pricingModel",
        type: "select",
        required: true,
        group: "Pricing",
        options: ["per-kg", "per-item", "flat-rate", "per-cubic-meter", "per-zone", "percentage", "tiered"],
      },
      { name: "priority", type: "number", required: true, group: "Priority" },
      { name: "minValue", type: "number", required: false, group: "Range" },
      { name: "maxValue", type: "number", required: false, group: "Range" },
      { name: "isActive", type: "text", required: false, group: "Status" },
    ],
  },
  "billing-management/surcharges": {
    schema: "billing-management",
    entity: "Surcharge",
    enum: "BillingManagementSurcharges",
    fields: [
      { name: "name", type: "text", required: true, group: "Basic Information" },
      {
        name: "calculationMethod",
        type: "select",
        required: true,
        group: "Calculation",
        options: ["percentage", "fixed", "per-unit", "sliding-scale"],
      },
      { name: "isActive", type: "text", required: true, group: "Status" },
      { name: "amount", type: "number", required: false, group: "Amount" },
      { name: "type", type: "text", required: false, group: "Classification" },
      { name: "description", type: "textarea", required: false, group: "Details" },
      { name: "validFrom", type: "date", required: false, group: "Validity" },
      { name: "validTo", type: "date", required: false, group: "Validity" },
    ],
  },

  // ============= TRANSPORT MANAGEMENT =============
  "transport-management/drivers": {
    schema: "transport-management",
    entity: "Driver",
    enum: "TransportManagementDrivers",
    fields: [
      { name: "user", type: "text", required: true, group: "Basic Information" },
      { name: "licenseNumber", type: "text", required: true, group: "License Information" },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        options: ["active", "inactive", "on-leave"],
      },
      { name: "licenseExpiryDate", type: "date", required: false, group: "License Information" },
    ],
  },
  "transport-management/driver-schedules": {
    schema: "transport-management",
    entity: "DriverSchedule",
    enum: "TransportManagementDriverSchedules",
    fields: [
      { name: "driver", type: "text", required: true, group: "Reference" },
      { name: "startDate", type: "date", required: true, group: "Period" },
      { name: "endDate", type: "date", required: true, group: "Period" },
      {
        name: "reason",
        type: "select",
        required: false,
        group: "Details",
        options: ["vacation", "sick-leave", "training", "personal-leave"],
      },
    ],
  },
  "transport-management/vehicles": {
    schema: "transport-management",
    entity: "Vehicle",
    enum: "TransportManagementVehicles",
    fields: [
      { name: "registrationNumber", type: "text", required: true, group: "Basic Information" },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        options: ["available", "in-maintenance", "on-trip", "out-of-service"],
      },
      { name: "model", type: "text", required: false, group: "Specifications" },
      { name: "capacityWeight", type: "number", required: false, group: "Capacity" },
      { name: "capacityVolume", type: "number", required: false, group: "Capacity" },
    ],
  },
  "transport-management/vehicle-maintenance": {
    schema: "transport-management",
    entity: "VehicleMaintenance",
    enum: "TransportManagementVehicleMaintenance",
    fields: [
      { name: "vehicle", type: "text", required: true, group: "Reference" },
      { name: "serviceDate", type: "date", required: true, group: "Service Details" },
      { name: "serviceType", type: "text", required: true, group: "Service Details" },
      { name: "cost", type: "number", required: false, group: "Financial" },
      { name: "notes", type: "textarea", required: false, group: "Additional Information" },
    ],
  },
  "transport-management/trips": {
    schema: "transport-management",
    entity: "Trip",
    enum: "TransportManagementTrips",
    fields: [
      { name: "driver", type: "text", required: true, group: "Assignment" },
      { name: "vehicle", type: "text", required: true, group: "Assignment" },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        options: ["planned", "in-progress", "completed", "cancelled"],
      },
    ],
  },
  "transport-management/trip-stops": {
    schema: "transport-management",
    entity: "TripStop",
    enum: "TransportManagementTripStops",
    fields: [
      { name: "trip", type: "text", required: true, group: "Reference" },
      { name: "sequence", type: "number", required: true, group: "Routing" },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        options: ["pending", "arrived", "completed", "skipped"],
      },
      { name: "address", type: "text", required: false, group: "Location" },
      { name: "shipment", type: "text", required: false, group: "Reference" },
      { name: "estimatedArrivalTime", type: "datetime", required: false, group: "Timing" },
      { name: "estimatedDepartureTime", type: "datetime", required: false, group: "Timing" },
    ],
  },

  // ============= WAREHOUSE MANAGEMENT =============
  "warehouse-management/warehouses": {
    schema: "warehouse-management",
    entity: "Warehouse",
    enum: "WarehouseManagementWarehouses",
    fields: [
      { name: "name", type: "text", required: true, group: "Basic Information" },
      { name: "address", type: "text", required: true, group: "Address" },
      { name: "city", type: "text", required: true, group: "Address" },
      { name: "state", type: "text", required: true, group: "Address" },
      { name: "country", type: "text", required: true, group: "Address" },
      { name: "postalCode", type: "text", required: true, group: "Address" },
      { name: "contactPerson", type: "text", required: false, group: "Contact Information" },
      { name: "contactPhone", type: "text", required: false, group: "Contact Information" },
      { name: "contactEmail", type: "email", required: false, group: "Contact Information" },
      { name: "timezone", type: "text", required: false, group: "Operational Settings" },
      { name: "isActive", type: "text", required: false, group: "Status" },
    ],
  },
  "warehouse-management/locations": {
    schema: "warehouse-management",
    entity: "Location",
    enum: "WarehouseManagementLocations",
    fields: [
      { name: "name", type: "text", required: true, group: "Basic Information" },
      { name: "warehouse", type: "text", required: true, group: "Reference" },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Classification",
        options: [
          "zone",
          "aisle",
          "rack",
          "shelf",
          "bin",
          "dock",
          "packing-station",
          "cross-dock",
          "quarantine",
          "bulk-storage",
        ],
      },
      { name: "parentLocation", type: "text", required: false, group: "Hierarchy" },
      { name: "barcode", type: "text", required: false, group: "Identification" },
      { name: "level", type: "number", required: false, group: "Physical Layout" },
      { name: "maxWeight", type: "number", required: false, group: "Capacity" },
      { name: "maxVolume", type: "number", required: false, group: "Capacity" },
      { name: "maxPallets", type: "number", required: false, group: "Capacity" },
      { name: "isActive", type: "text", required: false, group: "Status" },
      { name: "isPickable", type: "text", required: false, group: "Operations" },
      { name: "isReceivable", type: "text", required: false, group: "Operations" },
      { name: "temperatureControlled", type: "text", required: false, group: "Environment" },
      { name: "hazmatApproved", type: "text", required: false, group: "Environment" },
    ],
  },
  "warehouse-management/inventory-stock": {
    schema: "warehouse-management",
    entity: "InventoryStock",
    enum: "WarehouseManagementInventoryStock",
    fields: [
      { name: "product", type: "text", required: true, group: "Reference" },
      { name: "location", type: "text", required: true, group: "Reference" },
      { name: "quantity", type: "number", required: true, group: "Stock" },
      { name: "batch", type: "text", required: false, group: "Batch Information" },
      { name: "reservedQuantity", type: "number", required: false, group: "Stock" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["on-hand", "allocated", "reserved", "damaged", "expired", "quarantined"],
      },
      { name: "lastMovementAt", type: "datetime", required: false, group: "Tracking" },
      { name: "lastCountedAt", type: "datetime", required: false, group: "Tracking" },
    ],
  },
  "warehouse-management/bin-thresholds": {
    schema: "warehouse-management",
    entity: "BinThreshold",
    enum: "WarehouseManagementBinThreshold",
    fields: [
      { name: "location", type: "text", required: true, group: "Reference" },
      { name: "product", type: "text", required: true, group: "Reference" },
      { name: "minQuantity", type: "number", required: false, group: "Thresholds" },
      { name: "maxQuantity", type: "number", required: false, group: "Thresholds" },
      { name: "reorderQuantity", type: "number", required: false, group: "Replenishment" },
      { name: "alertThreshold", type: "number", required: false, group: "Alerts" },
      { name: "isActive", type: "text", required: false, group: "Status" },
    ],
  },

  // ============= DELIVERY MANAGEMENT =============
  "delivery-management/routes": {
    schema: "delivery-management",
    entity: "Route",
    enum: "DeliveryManagementRoutes",
    fields: [
      { name: "driver", type: "text", required: true, group: "Assignment" },
      { name: "vehicle", type: "text", required: true, group: "Assignment" },
      { name: "routeDate", type: "date", required: true, group: "Schedule" },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        options: ["planned", "in-progress", "completed", "cancelled"],
      },
      { name: "totalDistance", type: "number", required: false, group: "Metrics" },
      { name: "estimatedDurationInMinutes", type: "number", required: false, group: "Metrics" },
    ],
  },
  "delivery-management/tasks": {
    schema: "delivery-management",
    entity: "Task",
    enum: "DeliveryManagementTasks",
    fields: [
      { name: "route", type: "text", required: true, group: "Reference" },
      { name: "package", type: "text", required: true, group: "Reference" },
      { name: "deliveryAddress", type: "text", required: true, group: "Location" },
      { name: "sequence", type: "number", required: true, group: "Routing" },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        options: ["pending", "assigned", "out-for-delivery", "delivered", "failed", "cancelled", "rescheduled"],
      },
      { name: "recipientName", type: "text", required: false, group: "Recipient" },
      { name: "recipientPhone", type: "text", required: false, group: "Recipient" },
      { name: "deliveryInstructions", type: "textarea", required: false, group: "Instructions" },
      { name: "estimatedArrivalTime", type: "datetime", required: false, group: "Timing" },
      { name: "actualArrivalTime", type: "datetime", required: false, group: "Timing" },
      { name: "deliveryTime", type: "datetime", required: false, group: "Timing" },
      {
        name: "failureReason",
        type: "select",
        required: false,
        group: "Failure Details",
        options: [
          "recipient-not-home",
          "address-not-found",
          "refused-delivery",
          "damaged-package",
          "access-denied",
          "weather-conditions",
          "vehicle-breakdown",
          "other",
        ],
      },
      { name: "attemptCount", type: "number", required: false, group: "Attempts" },
    ],
  },
  "delivery-management/proof-of-deliveries": {
    schema: "delivery-management",
    entity: "ProofOfDelivery",
    enum: "DeliveryManagementProofOfDeliveries",
    fields: [
      { name: "task", type: "text", required: true, group: "Reference" },
      { name: "timestamp", type: "datetime", required: true, group: "Timestamp" },
      { name: "recipientName", type: "text", required: false, group: "Recipient" },
      { name: "coordinates", type: "text", required: false, group: "Location" },
    ],
  },

  // ============= ADDITIONAL BILLING MANAGEMENT =============
  "billing-management/account-transactions": {
    schema: "billing-management",
    entity: "AccountTransaction",
    enum: "BillingManagementAccountTransactions",
    fields: [
      { name: "clientAccount", type: "text", required: true, group: "Reference" },
      { name: "amount", type: "number", required: true, group: "Amount" },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Transaction Details",
        options: ["credit", "debit", "top-up", "refund", "adjustment", "fee"],
      },
      { name: "referenceNumber", type: "text", required: false, group: "Reference" },
      { name: "processedBy", type: "text", required: false, group: "Processing" },
      { name: "transactionDate", type: "date", required: false, group: "Dates" },
      { name: "runningBalance", type: "number", required: false, group: "Balance" },
    ],
  },
  "billing-management/invoices": {
    schema: "billing-management",
    entity: "Invoice",
    enum: "BillingManagementInvoices",
    fields: [
      { name: "invoiceNumber", type: "text", required: false, group: "Identification" },
      { name: "issueDate", type: "date", required: false, group: "Dates" },
      { name: "dueDate", type: "date", required: false, group: "Dates" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["draft", "sent", "viewed", "paid", "partial-paid", "past-due", "disputed", "cancelled", "void"],
      },
      { name: "currency", type: "text", required: false, group: "Financial" },
      { name: "subtotal", type: "number", required: false, group: "Financial" },
      { name: "discountAmount", type: "number", required: false, group: "Financial" },
      { name: "totalAmount", type: "number", required: false, group: "Financial" },
      { name: "notes", type: "textarea", required: false, group: "Additional Information" },
      { name: "paymentTerms", type: "textarea", required: false, group: "Terms" },
      { name: "quote", type: "text", required: false, group: "Reference" },
    ],
  },
  "billing-management/invoice-line-items": {
    schema: "billing-management",
    entity: "InvoiceLineItem",
    enum: "BillingManagementInvoiceLineItems",
    fields: [
      { name: "invoice", type: "text", required: false, group: "Reference" },
      { name: "description", type: "textarea", required: false, group: "Details" },
      { name: "quantity", type: "number", required: false, group: "Quantity" },
      { name: "unitPrice", type: "number", required: false, group: "Pricing" },
      { name: "discountRate", type: "number", required: false, group: "Discount" },
      { name: "discountAmount", type: "number", required: false, group: "Discount" },
      { name: "taxRate", type: "number", required: false, group: "Tax" },
      { name: "taxAmount", type: "number", required: false, group: "Tax" },
    ],
  },
  "billing-management/quotes": {
    schema: "billing-management",
    entity: "Quote",
    enum: "BillingManagementQuotes",
    fields: [
      { name: "quoteNumber", type: "text", required: false, group: "Identification" },
      { name: "client", type: "text", required: false, group: "Reference" },
      { name: "originDetails", type: "textarea", required: true, group: "Route Details" },
      { name: "destinationDetails", type: "textarea", required: true, group: "Route Details" },
      { name: "weight", type: "number", required: true, group: "Shipment Details" },
      { name: "length", type: "number", required: false, group: "Dimensions" },
      { name: "width", type: "number", required: false, group: "Dimensions" },
      { name: "height", type: "number", required: false, group: "Dimensions" },
      { name: "serviceLevel", type: "text", required: false, group: "Service" },
      { name: "quotePrice", type: "number", required: false, group: "Pricing" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["pending", "accepted", "expired", "cancelled", "converted"],
      },
      { name: "notes", type: "textarea", required: false, group: "Additional Information" },
      { name: "expiredAt", type: "date", required: false, group: "Validity" },
    ],
  },
  "billing-management/payments": {
    schema: "billing-management",
    entity: "Payment",
    enum: "BillingManagementPayments",
    fields: [
      { name: "invoice", type: "text", required: false, group: "Reference" },
      { name: "amount", type: "number", required: false, group: "Amount" },
      { name: "paymentDate", type: "date", required: false, group: "Dates" },
      {
        name: "paymentMethod",
        type: "select",
        required: false,
        group: "Method",
        options: ["credit-card", "debit-card", "wallet", "qr-ph", "client-credit", "bank-transfer", "cash", "check"],
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["pending", "processing", "successful", "failed", "cancelled", "refunded"],
      },
      { name: "transactionId", type: "text", required: false, group: "Transaction" },
      { name: "gatewayReferenceId", type: "text", required: false, group: "Gateway" },
      { name: "currency", type: "text", required: false, group: "Currency" },
      { name: "fees", type: "number", required: false, group: "Fees" },
      { name: "netAmount", type: "number", required: false, group: "Amount" },
      { name: "notes", type: "textarea", required: false, group: "Additional Information" },
    ],
  },
  "billing-management/disputes": {
    schema: "billing-management",
    entity: "Dispute",
    enum: "BillingManagementDisputes",
    fields: [
      { name: "client", type: "text", required: true, group: "Reference" },
      { name: "lineItem", type: "text", required: true, group: "Reference" },
      { name: "reason", type: "textarea", required: true, group: "Details" },
      { name: "disputeAmount", type: "number", required: false, group: "Amount" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["open", "under-review", "approved", "denied", "escalated", "closed"],
      },
      { name: "submittedAt", type: "date", required: false, group: "Dates" },
      { name: "resolvedAt", type: "date", required: false, group: "Dates" },
      { name: "resolvedBy", type: "text", required: false, group: "Resolution" },
      { name: "resolutionNotes", type: "textarea", required: false, group: "Resolution" },
    ],
  },
  "billing-management/credit-notes": {
    schema: "billing-management",
    entity: "CreditNote",
    enum: "BillingManagementCreditNotes",
    fields: [
      { name: "creditNoteNumber", type: "text", required: true, group: "Identification" },
      { name: "invoice", type: "text", required: true, group: "Reference" },
      { name: "dispute", type: "text", required: true, group: "Reference" },
      { name: "reason", type: "textarea", required: true, group: "Details" },
      { name: "amount", type: "number", required: false, group: "Amount" },
      { name: "currency", type: "text", required: true, group: "Currency" },
      { name: "issueDate", type: "date", required: true, group: "Dates" },
      { name: "appliedAt", type: "date", required: false, group: "Dates" },
      { name: "notes", type: "textarea", required: false, group: "Additional Information" },
    ],
  },

  // ============= ADDITIONAL TRANSPORT MANAGEMENT =============
  "transport-management/carriers": {
    schema: "transport-management",
    entity: "Carrier",
    enum: "TransportManagementCarriers",
    fields: [
      { name: "name", type: "text", required: true, group: "Basic Information" },
      { name: "contactDetails", type: "textarea", required: false, group: "Contact" },
      { name: "serviceOffered", type: "textarea", required: false, group: "Services" },
    ],
  },
  "transport-management/carrier-rates": {
    schema: "transport-management",
    entity: "CarrierRate",
    enum: "TransportManagementCarrierRates",
    fields: [
      { name: "carrier", type: "text", required: false, group: "Reference" },
      { name: "origin", type: "text", required: true, group: "Route" },
      { name: "destination", type: "text", required: true, group: "Route" },
      { name: "rate", type: "number", required: true, group: "Pricing" },
      {
        name: "unit",
        type: "select",
        required: false,
        group: "Unit",
        options: ["per-kg", "per-item", "per-km", "flat-rate", "per-cubic-meter"],
      },
      { name: "serviceType", type: "text", required: false, group: "Service" },
    ],
  },
  "transport-management/expenses": {
    schema: "transport-management",
    entity: "Expense",
    enum: "TransportManagementExpenses",
    fields: [
      { name: "driver", type: "text", required: false, group: "Reference" },
      { name: "trip", type: "text", required: false, group: "Reference" },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Type",
        options: ["fuel", "maintenance", "tolls", "parking", "other"],
      },
      { name: "amount", type: "number", required: true, group: "Amount" },
      { name: "currency", type: "select", required: true, group: "Currency", options: ["PHP", "USD", "EUR", "SGD"] },
      { name: "odometerReading", type: "number", required: true, group: "Vehicle Data" },
      { name: "fuelQuantity", type: "number", required: false, group: "Fuel" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["pending", "approved", "reimbursed", "rejected"],
      },
    ],
  },
  "transport-management/routes": {
    schema: "transport-management",
    entity: "Route",
    enum: "TransportManagementRoutes",
    fields: [
      { name: "name", type: "text", required: true, group: "Basic Information" },
      { name: "totalDistance", type: "number", required: true, group: "Metrics" },
      { name: "totalDuration", type: "number", required: true, group: "Metrics" },
    ],
  },
  "transport-management/shipment-legs": {
    schema: "transport-management",
    entity: "ShipmentLeg",
    enum: "TransportManagementShipmentLegs",
    fields: [
      { name: "shipment", type: "text", required: false, group: "Reference" },
      { name: "carrier", type: "text", required: false, group: "Reference" },
      { name: "internalTrip", type: "text", required: false, group: "Reference" },
      { name: "legSequence", type: "number", required: true, group: "Sequence" },
      { name: "startLocation", type: "text", required: true, group: "Location" },
      { name: "endLocation", type: "text", required: true, group: "Location" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["pending", "in-transit", "completed", "delayed", "cancelled"],
      },
    ],
  },
  "transport-management/shipment-leg-events": {
    schema: "transport-management",
    entity: "ShipmentLegEvent",
    enum: "TransportManagementShipmentLegEvents",
    fields: [
      { name: "shipmentLegId", type: "text", required: true, group: "Reference" },
      { name: "location", type: "text", required: true, group: "Location" },
      { name: "timestamp", type: "datetime", required: true, group: "Timestamp" },
      { name: "message", type: "textarea", required: true, group: "Message" },
    ],
  },
  "transport-management/geofence": {
    schema: "transport-management",
    entity: "Geofence",
    enum: "TransportManagementGeofence",
    fields: [
      { name: "name", type: "text", required: true, group: "Basic Information" },
      { name: "coordinates", type: "text", required: true, group: "Location" },
      { name: "radius", type: "number", required: true, group: "Boundary" },
    ],
  },
  "transport-management/geofence-events": {
    schema: "transport-management",
    entity: "GeofenceEvent",
    enum: "TransportManagementGeofenceEvents",
    fields: [
      { name: "geofence", type: "text", required: true, group: "Reference" },
      { name: "vehicle", type: "text", required: true, group: "Reference" },
      { name: "type", type: "select", required: false, group: "Event Type", options: ["entry", "exit"] },
      { name: "timestamp", type: "datetime", required: false, group: "Timestamp" },
    ],
  },
  "transport-management/gps-pings": {
    schema: "transport-management",
    entity: "GpsPing",
    enum: "TransportManagementGpsPings",
    fields: [
      { name: "vehicle", type: "text", required: true, group: "Reference" },
      { name: "coordinates", type: "text", required: true, group: "Location" },
      { name: "timestamp", type: "datetime", required: true, group: "Timestamp" },
    ],
  },
  "transport-management/partner-invoice": {
    schema: "transport-management",
    entity: "PartnerInvoice",
    enum: "TransportManagementPartnerInvoice",
    fields: [
      { name: "carrier", type: "text", required: true, group: "Reference" },
      { name: "invoiceNumber", type: "text", required: true, group: "Identification" },
      { name: "invoiceDate", type: "date", required: true, group: "Dates" },
      { name: "totalAmount", type: "number", required: true, group: "Amount" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["draft", "submitted", "approved", "paid", "disputed"],
      },
    ],
  },
  "transport-management/partner-invoice-items": {
    schema: "transport-management",
    entity: "PartnerInvoiceItem",
    enum: "TransportManagementPartnerInvoiceItems",
    fields: [
      { name: "partnerInvoice", type: "text", required: true, group: "Reference" },
      { name: "shipmentLeg", type: "text", required: true, group: "Reference" },
      { name: "amount", type: "number", required: true, group: "Amount" },
    ],
  },
  "transport-management/proof-of-deliveries": {
    schema: "transport-management",
    entity: "ProofOfDelivery",
    enum: "TransportManagementProofOfDeliveries",
    fields: [
      { name: "tripStop", type: "text", required: true, group: "Reference" },
      { name: "coordinate", type: "text", required: false, group: "Location" },
    ],
  },

  // ============= ADDITIONAL WAREHOUSE MANAGEMENT =============
  "warehouse-management/products": {
    schema: "warehouse-management",
    entity: "Product",
    enum: "WarehouseManagementProducts",
    fields: [
      { name: "name", type: "text", required: true, group: "Basic Information" },
      { name: "sku", type: "text", required: true, group: "Identification" },
      { name: "barcode", type: "text", required: false, group: "Identification" },
      { name: "description", type: "textarea", required: false, group: "Details" },
      { name: "costPrice", type: "number", required: false, group: "Pricing" },
      { name: "weight", type: "number", required: false, group: "Dimensions" },
      { name: "length", type: "number", required: false, group: "Dimensions" },
      { name: "width", type: "number", required: false, group: "Dimensions" },
      { name: "height", type: "number", required: false, group: "Dimensions" },
      { name: "supplier", type: "text", required: false, group: "Reference" },
      { name: "client", type: "text", required: false, group: "Reference" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["active", "inactive", "discontinued"],
      },
    ],
  },
  "warehouse-management/inbound-shipments": {
    schema: "warehouse-management",
    entity: "InboundShipment",
    enum: "WarehouseManagementInboundShipments",
    fields: [
      { name: "client", type: "text", required: true, group: "Reference" },
      { name: "warehouse", type: "text", required: true, group: "Reference" },
      { name: "expectedArrivalDate", type: "date", required: false, group: "Dates" },
      { name: "actualArrivalDate", type: "date", required: false, group: "Dates" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["pending", "in-transit", "received", "processing", "completed"],
      },
    ],
  },
  "warehouse-management/inbound-shipment-items": {
    schema: "warehouse-management",
    entity: "InboundShipmentItem",
    enum: "WarehouseManagementInboundShipmentItems",
    fields: [
      { name: "inboundShipment", type: "text", required: false, group: "Reference" },
      { name: "product", type: "text", required: false, group: "Reference" },
      { name: "expectedQuantity", type: "number", required: true, group: "Quantity" },
      { name: "receivedQuantity", type: "number", required: false, group: "Quantity" },
      { name: "discrepancyNotes", type: "textarea", required: false, group: "Notes" },
    ],
  },
  "warehouse-management/outbound-shipments": {
    schema: "warehouse-management",
    entity: "OutboundShipment",
    enum: "WarehouseManagementOutboundShipments",
    fields: [
      { name: "salesOrder", type: "text", required: true, group: "Reference" },
      { name: "warehouse", type: "text", required: true, group: "Reference" },
      { name: "carrier", type: "text", required: false, group: "Reference" },
      { name: "trackingNumber", type: "text", required: true, group: "Tracking" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["pending", "packing", "ready", "shipped", "delivered"],
      },
    ],
  },
  "warehouse-management/outbound-shipment-items": {
    schema: "warehouse-management",
    entity: "OutboundShipmentItem",
    enum: "WarehouseManagementOutboundShipmentItems",
    fields: [
      { name: "outboundShipment", type: "text", required: true, group: "Reference" },
      { name: "salesOrderItem", type: "text", required: true, group: "Reference" },
      { name: "product", type: "text", required: true, group: "Reference" },
      { name: "batch", type: "text", required: false, group: "Batch" },
      { name: "quantityShipped", type: "number", required: true, group: "Quantity" },
    ],
  },
  "warehouse-management/packages": {
    schema: "warehouse-management",
    entity: "Package",
    enum: "WarehouseManagementPackages",
    fields: [
      { name: "packageNumber", type: "text", required: true, group: "Identification" },
      { name: "salesOrder", type: "text", required: true, group: "Reference" },
      { name: "warehouse", type: "text", required: true, group: "Reference" },
      { name: "type", type: "text", required: false, group: "Classification" },
      { name: "weight", type: "number", required: false, group: "Dimensions" },
      { name: "length", type: "number", required: false, group: "Dimensions" },
      { name: "width", type: "number", required: false, group: "Dimensions" },
      { name: "height", type: "number", required: false, group: "Dimensions" },
      { name: "isFragile", type: "text", required: false, group: "Handling" },
      { name: "isHazmat", type: "text", required: false, group: "Handling" },
      { name: "requireSignature", type: "text", required: false, group: "Delivery" },
      { name: "insuranceValue", type: "number", required: false, group: "Insurance" },
      { name: "packedAt", type: "date", required: false, group: "Dates" },
      { name: "shippedAt", type: "date", required: false, group: "Dates" },
    ],
  },
  "warehouse-management/package-items": {
    schema: "warehouse-management",
    entity: "PackageItem",
    enum: "WarehouseManagementPackageItems",
    fields: [
      { name: "package", type: "text", required: true, group: "Reference" },
      { name: "product", type: "text", required: true, group: "Reference" },
      { name: "batch", type: "text", required: false, group: "Batch" },
      { name: "quantity", type: "number", required: true, group: "Quantity" },
      { name: "lotNumber", type: "text", required: false, group: "Batch Details" },
      { name: "expiryDate", type: "date", required: false, group: "Validity" },
    ],
  },
  "warehouse-management/inventory-adjustment": {
    schema: "warehouse-management",
    entity: "InventoryAdjustment",
    enum: "WarehouseManagementInventoryAdjustment",
    fields: [
      { name: "warehouse", type: "text", required: true, group: "Reference" },
      { name: "product", type: "text", required: true, group: "Reference" },
      { name: "user", type: "text", required: true, group: "User" },
      { name: "quantityChange", type: "number", required: true, group: "Adjustment" },
      {
        name: "reason",
        type: "select",
        required: false,
        group: "Reason",
        options: ["damage", "loss", "count-discrepancy", "return", "transfer", "other"],
      },
      { name: "notes", type: "textarea", required: false, group: "Notes" },
    ],
  },
  "warehouse-management/inventory-batches": {
    schema: "warehouse-management",
    entity: "InventoryBatch",
    enum: "WarehouseManagementInventoryBatches",
    fields: [
      { name: "product", type: "text", required: true, group: "Reference" },
      { name: "batchNumber", type: "text", required: true, group: "Identification" },
      { name: "expirationDate", type: "date", required: false, group: "Validity" },
    ],
  },
  "warehouse-management/tasks": {
    schema: "warehouse-management",
    entity: "Task",
    enum: "WarehouseManagementTasks",
    fields: [
      { name: "warehouse", type: "text", required: false, group: "Reference" },
      { name: "taskNumber", type: "text", required: true, group: "Identification" },
      {
        name: "type",
        type: "select",
        required: false,
        group: "Type",
        options: ["pick", "putaway", "packing", "restock", "count", "transfer"],
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["pending", "assigned", "in-progress", "completed", "cancelled"],
      },
      { name: "priority", type: "number", required: true, group: "Priority" },
      { name: "user", type: "text", required: false, group: "User" },
      { name: "startTime", type: "datetime", required: false, group: "Timing" },
      { name: "endTime", type: "datetime", required: false, group: "Timing" },
      { name: "instructions", type: "textarea", required: false, group: "Instructions" },
      { name: "notes", type: "textarea", required: false, group: "Notes" },
    ],
  },
  "warehouse-management/task-items": {
    schema: "warehouse-management",
    entity: "TaskItem",
    enum: "WarehouseManagementTaskItems",
    fields: [
      { name: "task", type: "text", required: false, group: "Reference" },
      { name: "product", type: "text", required: false, group: "Reference" },
      { name: "sourceLocation", type: "text", required: false, group: "Location" },
      { name: "destinationLocation", type: "text", required: false, group: "Location" },
      { name: "batch", type: "text", required: false, group: "Batch" },
      { name: "quantityRequired", type: "number", required: false, group: "Quantity" },
      { name: "quantityCompleted", type: "number", required: false, group: "Quantity" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["pending", "in-progress", "completed", "failed"],
      },
      { name: "completedAt", type: "datetime", required: false, group: "Completion" },
      { name: "notes", type: "textarea", required: false, group: "Notes" },
    ],
  },
  "warehouse-management/pick-batches": {
    schema: "warehouse-management",
    entity: "PickBatch",
    enum: "WarehouseManagementPickBatches",
    fields: [
      { name: "warehouse", type: "text", required: false, group: "Reference" },
      { name: "batchNumber", type: "text", required: false, group: "Identification" },
      { name: "priority", type: "number", required: true, group: "Priority" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["pending", "assigned", "in-progress", "completed", "cancelled"],
      },
      {
        name: "strategy",
        type: "select",
        required: false,
        group: "Strategy",
        options: ["zone", "batch", "wave", "cluster"],
      },
      { name: "assignedUser", type: "text", required: false, group: "Assignment" },
      { name: "totalItems", type: "number", required: false, group: "Items" },
      { name: "completedItems", type: "number", required: false, group: "Items" },
      { name: "estimatedDuration", type: "number", required: false, group: "Duration" },
      { name: "actualDuration", type: "number", required: false, group: "Duration" },
      { name: "startedAt", type: "datetime", required: false, group: "Timing" },
      { name: "completedAt", type: "datetime", required: false, group: "Timing" },
    ],
  },
  "warehouse-management/pick-batch-items": {
    schema: "warehouse-management",
    entity: "PickBatchItem",
    enum: "WarehouseManagementPickBatchItems",
    fields: [
      { name: "pickBatch", type: "text", required: true, group: "Reference" },
      { name: "salesOrder", type: "text", required: true, group: "Reference" },
      { name: "orderPriority", type: "number", required: false, group: "Priority" },
      { name: "estimatedPickTime", type: "datetime", required: false, group: "Timing" },
      { name: "actualPickTime", type: "number", required: false, group: "Timing" },
    ],
  },
  "warehouse-management/putaway-rules": {
    schema: "warehouse-management",
    entity: "PutawayRule",
    enum: "WarehouseManagementPutawayRules",
    fields: [
      { name: "warehouse", type: "text", required: true, group: "Reference" },
      { name: "product", type: "text", required: true, group: "Reference" },
      { name: "client", type: "text", required: false, group: "Reference" },
      {
        name: "locationType",
        type: "select",
        required: true,
        group: "Location Type",
        options: ["zone", "aisle", "rack", "shelf", "bin", "bulk"],
      },
      { name: "preferredLocation", type: "text", required: false, group: "Location" },
      { name: "priority", type: "number", required: true, group: "Priority" },
      { name: "minQuantity", type: "number", required: false, group: "Quantity" },
      { name: "maxQuantity", type: "number", required: false, group: "Quantity" },
      { name: "weightThreshold", type: "number", required: false, group: "Thresholds" },
      { name: "volumeThreshold", type: "number", required: false, group: "Thresholds" },
      { name: "requireTemperatureControl", type: "text", required: false, group: "Requirements" },
      { name: "requireHazmatApproval", type: "text", required: false, group: "Requirements" },
      { name: "isActive", type: "text", required: false, group: "Status" },
    ],
  },
  "warehouse-management/reorder-points": {
    schema: "warehouse-management",
    entity: "ReorderPoint",
    enum: "WarehouseManagementReorderPoints",
    fields: [
      { name: "warehouse", type: "text", required: true, group: "Reference" },
      { name: "product", type: "text", required: true, group: "Reference" },
      { name: "threshold", type: "number", required: false, group: "Threshold" },
    ],
  },
  "warehouse-management/suppliers": {
    schema: "warehouse-management",
    entity: "Supplier",
    enum: "WarehouseManagementSuppliers",
    fields: [
      { name: "name", type: "text", required: true, group: "Basic Information" },
      { name: "contactPerson", type: "text", required: false, group: "Contact" },
      { name: "email", type: "email", required: false, group: "Contact" },
      { name: "phoneNumber", type: "text", required: false, group: "Contact" },
      { name: "client", type: "text", required: false, group: "Reference" },
    ],
  },
  "warehouse-management/sales-orders": {
    schema: "warehouse-management",
    entity: "SalesOrder",
    enum: "WarehouseManagementSalesOrders",
    fields: [
      { name: "client", type: "text", required: true, group: "Reference" },
      { name: "orderNumber", type: "text", required: true, group: "Identification" },
      { name: "opportunity", type: "text", required: false, group: "Reference" },
      { name: "shippingAddress", type: "text", required: false, group: "Address" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["pending", "processing", "ready", "shipped", "delivered", "cancelled"],
      },
    ],
  },
  "warehouse-management/sales-order-items": {
    schema: "warehouse-management",
    entity: "SalesOrderItem",
    enum: "WarehouseManagementSalesOrderItems",
    fields: [
      { name: "salesOrder", type: "text", required: false, group: "Reference" },
      { name: "product", type: "text", required: false, group: "Reference" },
      { name: "quantityOrdered", type: "number", required: true, group: "Quantity" },
    ],
  },
  "warehouse-management/returns": {
    schema: "warehouse-management",
    entity: "Return",
    enum: "WarehouseManagementReturns",
    fields: [
      { name: "returnNumber", type: "text", required: true, group: "Identification" },
      { name: "salesOrder", type: "text", required: false, group: "Reference" },
      { name: "client", type: "text", required: false, group: "Reference" },
      { name: "reason", type: "textarea", required: false, group: "Reason" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["initiated", "received", "inspecting", "approved", "rejected", "processed"],
      },
    ],
  },
  "warehouse-management/return-items": {
    schema: "warehouse-management",
    entity: "ReturnItem",
    enum: "WarehouseManagementReturnItems",
    fields: [
      { name: "return", type: "text", required: true, group: "Reference" },
      { name: "product", type: "text", required: true, group: "Reference" },
      { name: "quantityExpected", type: "number", required: false, group: "Quantity" },
      { name: "quantityRecevied", type: "number", required: false, group: "Quantity" },
      {
        name: "condition",
        type: "select",
        required: false,
        group: "Condition",
        options: ["new", "used", "damaged", "defective"],
      },
    ],
  },
  "warehouse-management/stock-transfer": {
    schema: "warehouse-management",
    entity: "StockTransfer",
    enum: "WarehouseManagementStockTransfer",
    fields: [
      { name: "sourceWarehouse", type: "text", required: true, group: "Source" },
      { name: "destinationWarehouse", type: "text", required: true, group: "Destination" },
      { name: "product", type: "text", required: false, group: "Product" },
      { name: "quantity", type: "number", required: false, group: "Quantity" },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        options: ["pending", "in-transit", "received", "cancelled"],
      },
    ],
  },

  // ============= ADDITIONAL DELIVERY MANAGEMENT =============
  "delivery-management/driver-locations": {
    schema: "delivery-management",
    entity: "DriverLocation",
    enum: "DeliveryManagementDriverLocation",
    fields: [
      { name: "driver", type: "text", required: true, group: "Reference" },
      { name: "coordinates", type: "text", required: true, group: "Location" },
      { name: "heading", type: "text", required: false, group: "Movement" },
      { name: "speed", type: "number", required: false, group: "Movement" },
      { name: "accuracy", type: "number", required: false, group: "Accuracy" },
      { name: "timestamp", type: "datetime", required: false, group: "Timestamp" },
    ],
  },
  "delivery-management/task-events": {
    schema: "delivery-management",
    entity: "TaskEvent",
    enum: "DeliveryManagementTaskEvents",
    fields: [
      { name: "task", type: "text", required: true, group: "Reference" },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        options: ["pending", "assigned", "out-for-delivery", "delivered", "failed", "cancelled"],
      },
      { name: "timestamp", type: "datetime", required: true, group: "Timestamp" },
      { name: "coordinates", type: "text", required: false, group: "Location" },
      { name: "notes", type: "textarea", required: false, group: "Notes" },
      { name: "reason", type: "text", required: false, group: "Reason" },
    ],
  },

  // ============= OTHER =============
  "users/notifications": {
    schema: "users",
    entity: "Notification",
    enum: "Notifications",
    fields: [
      { name: "user", type: "text", required: true, group: "Reference" },
      { name: "message", type: "textarea", required: true, group: "Message" },
      { name: "link", type: "text", required: false, group: "Action" },
      { name: "isRead", type: "text", required: false, group: "Status" },
    ],
  },

  // ============= CUSTOMER RELATIONS (already have most, adding remaining) =============
  leads: {
    schema: "customer-relations",
    entity: "Lead",
    enum: "CustomerRelationsLeads",
    fields: [
      { name: "name", type: "text", required: false, group: "Basic Information" },
      { name: "email", type: "email", required: false, group: "Basic Information" },
      { name: "score", type: "number", required: true, group: "Lead Details" },
      {
        name: "source",
        type: "select",
        required: true,
        group: "Lead Details",
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
        required: true,
        group: "Lead Details",
        options: ["new", "contacted", "qualified", "unqualified", "converted"],
      },
      { name: "campaign", type: "text", required: false, group: "Relationships" },
      { name: "owner", type: "text", required: true, group: "Assignment" },
    ],
  },
  contacts: {
    entity: "Contact",
    enum: "CustomerRelationsContacts",
    fields: [
      { name: "name", type: "text", required: true, group: "Basic Information" },
      { name: "email", type: "email", required: true, group: "Basic Information" },
      { name: "jobTitle", type: "text", required: false, group: "Basic Information" },
      { name: "phoneNumber", type: "text", required: false, group: "Basic Information" },
      { name: "company", type: "text", required: false, group: "Relationships" },
      { name: "owner", type: "text", required: true, group: "Assignment" },
    ],
  },
  interactions: {
    entity: "Interaction",
    enum: "CustomerRelationsInteractions",
    fields: [
      { name: "contact", type: "text", required: true, group: "Contact Information" },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Interaction Details",
        options: ["call", "meeting", "text", "email"],
      },
      { name: "interactionDate", type: "datetime", required: true, group: "Interaction Details" },
      { name: "notes", type: "textarea", required: false, group: "Interaction Details" },
      { name: "outcome", type: "text", required: false, group: "Interaction Details" },
      { name: "case", type: "text", required: false, group: "Relationships" },
      { name: "user", type: "text", required: true, group: "Assignment" },
    ],
  },
  products: {
    entity: "Product",
    enum: "CustomerRelationsProducts",
    fields: [
      { name: "name", type: "text", required: true, group: "Basic Information" },
      { name: "sku", type: "text", required: true, group: "Basic Information" },
      { name: "price", type: "number", required: true, group: "Pricing" },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Classification",
        options: ["service", "good", "digital", "subscription"],
      },
      { name: "description", type: "textarea", required: false, group: "Details" },
    ],
  },
  campaigns: {
    entity: "Campaign",
    enum: "CustomerRelationsCampaigns",
    fields: [
      { name: "name", type: "text", required: true, group: "Basic Information" },
      { name: "budget", type: "number", required: true, group: "Budget" },
      { name: "startDate", type: "date", required: true, group: "Timeline" },
      { name: "endDate", type: "date", required: false, group: "Timeline" },
    ],
  },
  opportunities: {
    entity: "Opportunity",
    enum: "CustomerRelationsOpportunities",
    fields: [
      { name: "name", type: "text", required: true, group: "Basic Information" },
      { name: "company", type: "text", required: true, group: "Basic Information" },
      { name: "contact", type: "text", required: false, group: "Relationships" },
      { name: "dealValue", type: "number", required: true, group: "Deal Details" },
      {
        name: "stage",
        type: "select",
        required: true,
        group: "Deal Details",
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
      { name: "probability", type: "number", required: false, group: "Deal Details" },
      {
        name: "source",
        type: "select",
        required: true,
        group: "Deal Details",
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
      { name: "expectedCloseDate", type: "date", required: false, group: "Timeline" },
      { name: "campaign", type: "text", required: false, group: "Relationships" },
      { name: "owner", type: "text", required: true, group: "Assignment" },
    ],
  },
  invoices: {
    entity: "Invoice",
    enum: "CustomerRelationsInvoices",
    fields: [
      { name: "opportunity", type: "text", required: false, group: "Relationships" },
      { name: "issueDate", type: "date", required: true, group: "Timeline" },
      { name: "dueDate", type: "date", required: false, group: "Timeline" },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        options: ["draft", "sent", "viewed", "paid", "partial-paid", "past-due", "disputed", "cancelled", "void"],
      },
      { name: "currency", type: "text", required: false, group: "Financial" },
      { name: "subtotal", type: "number", required: false, group: "Financial" },
      { name: "discountAmount", type: "number", required: false, group: "Financial" },
      { name: "totalAmount", type: "number", required: false, group: "Financial" },
      { name: "notes", type: "textarea", required: false, group: "Additional Information" },
      { name: "paymentTerms", type: "textarea", required: false, group: "Additional Information" },
    ],
  },
  "invoice-items": {
    entity: "InvoiceItem",
    enum: "CustomerRelationsInvoiceItems",
    fields: [
      { name: "invoice", type: "text", required: true, group: "Reference" },
      { name: "description", type: "textarea", required: true, group: "Item Details" },
      { name: "quantity", type: "number", required: true, group: "Item Details" },
      { name: "unitPrice", type: "number", required: true, group: "Pricing" },
      { name: "discountRate", type: "number", required: false, group: "Discounts & Tax" },
      { name: "discountAmount", type: "number", required: false, group: "Discounts & Tax" },
      { name: "taxRate", type: "number", required: false, group: "Discounts & Tax" },
    ],
  },
};

// Helper: Convert camelCase to Title Case
function camelToTitleCase(str) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

// Helper: Convert enum value to label
function enumToLabel(value) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Generate TextField code
function generateTextField(field, isCreate = true) {
  const required = isCreate && field.required ? "\n                  required" : "";
  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.TextField
                  label="${camelToTitleCase(field.name)}"
                  description="Enter ${field.name.toLowerCase()}"
                  placeholder=""${required}
                />
              )}
            </form.AppField>`;
}

// Generate EmailField code
function generateEmailField(field, isCreate = true) {
  const required = isCreate && field.required ? "\n                  required" : "";
  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.EmailField
                  label="${camelToTitleCase(field.name)}"
                  description="Enter email address"
                  placeholder="example@email.com"${required}
                />
              )}
            </form.AppField>`;
}

// Generate NumberField code
function generateNumberField(field, isCreate = true) {
  const required = isCreate && field.required ? "\n                  required" : "";
  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.NumberField
                  label="${camelToTitleCase(field.name)}"
                  description="Enter number"
                  placeholder="0"
                  min={0}${required}
                />
              )}
            </form.AppField>`;
}

// Generate DateField code
function generateDateField(field, isCreate = true) {
  const required = isCreate && field.required ? "\n                  required" : "";
  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.DateTimeField
                  label="${camelToTitleCase(field.name)}"
                  description="Select date"
                  placeholder=""${required}
                />
              )}
            </form.AppField>`;
}

// Generate DateTimeField code
function generateDateTimeField(field, isCreate = true) {
  const required = isCreate && field.required ? "\n                  required" : "";
  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.DateTimeField
                  label="${camelToTitleCase(field.name)}"
                  description="Select date and time"
                  placeholder=""${required}
                />
              )}
            </form.AppField>`;
}

// Generate TextareaField code
function generateTextareaField(field, isCreate = true) {
  const required = isCreate && field.required ? "\n                  required" : "";
  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.TextareaField
                  label="${camelToTitleCase(field.name)}"
                  description="Enter details"
                  placeholder=""${required}
                />
              )}
            </form.AppField>`;
}

// Generate SelectField code
function generateSelectField(field, isCreate = true) {
  const required = isCreate && field.required ? "\n                  required" : "";
  const options = (field.options || [])
    .map((opt) => `{ label: "${enumToLabel(opt)}", value: "${opt}" }`)
    .join(",\n                    ");

  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.SelectField
                  label="${camelToTitleCase(field.name)}"
                  description="Select an option"
                  options={[
                    ${options}
                  ]}
                  placeholder="Select..."${required}
                />
              )}
            </form.AppField>`;
}

// Main field generator
function generateFieldCode(field, isCreate = true) {
  switch (field.type) {
    case "text":
      return generateTextField(field, isCreate);
    case "email":
      return generateEmailField(field, isCreate);
    case "number":
      return generateNumberField(field, isCreate);
    case "date":
      return generateDateField(field, isCreate);
    case "datetime":
      return generateDateTimeField(field, isCreate);
    case "textarea":
      return generateTextareaField(field, isCreate);
    case "select":
      return generateSelectField(field, isCreate);
    default:
      return generateTextField(field, isCreate);
  }
}

// Group fields by their group property
function groupFields(fields) {
  const grouped = {};
  fields.forEach((field) => {
    const group = field.group || "Other";
    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push(field);
  });
  return grouped;
}

// Generate FieldSet content
function generateFieldSetContent(fields, isCreate = true) {
  const grouped = groupFields(fields);
  const groups = Object.entries(grouped);
  let content = "<FieldSet>\n";

  groups.forEach(([groupName, groupFields], index) => {
    if (index > 0) {
      content += "\n          <FieldSeparator>" + groupName + "</FieldSeparator>\n\n";
    }

    content += "          {/* " + groupName + " */}\n";
    content += "          <FieldGroup>\n";
    content += "            <FieldLegend>" + groupName + "</FieldLegend>\n";
    content += "            <FieldDescription>\n";
    content += "              Manage " + groupName.toLowerCase() + " information\n";
    content += "            </FieldDescription>\n";
    content += "\n";

    groupFields.forEach((field) => {
      content += generateFieldCode(field, isCreate) + "\n";
    });

    content += "          </FieldGroup>\n";
  });

  content += "        </FieldSet>";
  return content;
}

// Update create.tsx file
function updateCreateForm(collection, entity, config) {
  const schema = config.schema || "customer-relations";
  const filePath = path.join(projectRoot, `src/components/actions/${schema}/${collection}/create.tsx`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, "utf-8");
  const fieldSetContent = generateFieldSetContent(config.fields, true);

  // Replace the FieldSet section
  const fieldSetRegex = /<FieldSet>[\s\S]*?<\/FieldSet>/;
  content = content.replace(fieldSetRegex, fieldSetContent);

  fs.writeFileSync(filePath, content, "utf-8");
  return true;
}

// Update update.tsx file
function updateUpdateForm(collection, entity, config) {
  const schema = config.schema || "customer-relations";
  const filePath = path.join(projectRoot, `src/components/actions/${schema}/${collection}/update.tsx`);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, "utf-8");
  const fieldSetContent = generateFieldSetContent(config.fields, false); // All fields optional on update

  // Replace the FieldSet section
  const fieldSetRegex = /<FieldSet>[\s\S]*?<\/FieldSet>/;
  content = content.replace(fieldSetRegex, fieldSetContent);

  fs.writeFileSync(filePath, content, "utf-8");
  return true;
}

// Main execution
console.log("\n🚀 Form Customization Script\n");
console.log("=" + "=".repeat(48) + "\n");

// Check project root
if (!fs.existsSync(path.join(projectRoot, "package.json"))) {
  console.error("❌ Error: Must be run from project root\n");
  process.exit(1);
}

console.log("📋 Processing entities:\n");

let successCount = 0;
let errorCount = 0;

Object.entries(ENTITY_CONFIGS).forEach(([pathKey, config]) => {
  console.log(`  Processing ${config.entity}...`);

  try {
    // Extract collection from pathKey (e.g., "billing-management/client-accounts" -> "client-accounts")
    const collection = pathKey.includes("/") ? pathKey.split("/")[1] : pathKey;
    const createSuccess = updateCreateForm(collection, config.entity, config);
    const updateSuccess = updateUpdateForm(collection, config.entity, config);

    if (createSuccess && updateSuccess) {
      console.log(`    ✅ create.tsx`);
      console.log(`    ✅ update.tsx`);
      successCount += 2;
    } else {
      console.log(`    ⚠️  Some files could not be updated`);
      errorCount++;
    }
  } catch (error) {
    console.error(`    ❌ Error: ${error.message}`);
    errorCount++;
  }
});

console.log("\n" + "=".repeat(50));
console.log(`\n✨ Customization complete!\n`);
console.log(`   ✅ Successfully updated: ${successCount} files`);
if (errorCount > 0) {
  console.log(`   ❌ Errors encountered: ${errorCount}`);
}

console.log("\n🔍 Next steps:\n");
console.log("   1. Run: bun run check");
console.log("   2. Review changes in VS Code");
console.log("   3. Test forms in the application\n");
