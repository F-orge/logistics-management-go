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
    description:
      "Manages client financial accounts, wallet balances, credit limits, and payment terms for each client in the system",
    fields: [
      {
        name: "client",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Client ABC Inc', 'Enterprise Solutions Ltd'",
        fieldDescription: "Select the client associated with this account",
      },
      {
        name: "walletBalance",
        type: "number",
        required: false,
        group: "Financial",
        tooltip: "e.g., 1000.50, 5000, 10000",
        fieldDescription: "The current balance available in this client's wallet account",
      },
      {
        name: "creditLimit",
        type: "number",
        required: false,
        group: "Credit Management",
        tooltip: "e.g., 50000, 100000, 500000",
        fieldDescription: "The maximum amount of credit this client is allowed to use",
      },
      {
        name: "isCreditApproved",
        type: "text",
        required: false,
        group: "Credit Management",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Indicates whether credit facilities have been approved for this client",
      },
      {
        name: "paymentTermsDays",
        type: "number",
        required: false,
        group: "Payment Terms",
        tooltip: "e.g., 30, 60, 90",
        fieldDescription: "Number of days from invoice date that payment is due",
      },
    ],
  },
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
        options: ["shipping", "storage", "fulfillment", "handling", "insurance", "customs", "packaging", "returns"],
      },
      {
        name: "isActive",
        type: "text",
        required: true,
        group: "Status",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Mark whether this rate card is currently in use for billing",
      },
      {
        name: "description",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Applies to domestic shipments under 50kg', 'Q1 2024 promotional rates'",
        fieldDescription: "Additional information about the purpose and terms of this rate card",
      },
      {
        name: "validFrom",
        type: "date",
        required: false,
        group: "Validity",
        tooltip: "e.g., 01/01/2024, 01/04/2024",
        fieldDescription: "The date when this rate card becomes effective",
      },
      {
        name: "validTo",
        type: "date",
        required: false,
        group: "Validity",
        tooltip: "e.g., 12/31/2024, 06/30/2024",
        fieldDescription: "The date when this rate card expires or becomes inactive",
      },
    ],
  },
  "billing-management/rate-rules": {
    schema: "billing-management",
    entity: "RateRule",
    enum: "BillingManagementRateRules",
    description:
      "Specifies conditional pricing rules for rate cards with support for different pricing models (per-kg, per-item, flat-rate, etc.) and priority-based application",
    fields: [
      {
        name: "rateCard",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'RC-2024-001', 'Shipping-Standard'",
        fieldDescription: "Select the rate card this rule applies to",
      },
      {
        name: "value",
        type: "text",
        required: true,
        group: "Rule Configuration",
        tooltip: "e.g., '50', 'domestic', 'express'",
        fieldDescription: "The value that triggers this pricing rule to be applied",
      },
      {
        name: "condition",
        type: "text",
        required: true,
        group: "Rule Configuration",
        tooltip: "e.g., 'weight > 50', 'zone = domestic', 'shipment_type = express'",
        fieldDescription: "The condition or criteria for when this rule should apply",
      },
      {
        name: "price",
        type: "number",
        required: true,
        group: "Pricing",
        tooltip: "e.g., 25.50, 100, 1500",
        fieldDescription: "The price amount for this rule based on the pricing model",
      },
      {
        name: "pricingModel",
        type: "select",
        required: true,
        group: "Pricing",
        tooltip: "e.g., per-kg, per-item, flat-rate, percentage",
        fieldDescription: "The calculation method used to apply this price",
        options: ["per-kg", "per-item", "flat-rate", "per-cubic-meter", "per-zone", "percentage", "tiered"],
      },
      {
        name: "priority",
        type: "number",
        required: true,
        group: "Priority",
        tooltip: "e.g., 1, 5, 10 (1 = highest priority)",
        fieldDescription: "Priority order for rule application (lower numbers apply first)",
      },
      {
        name: "minValue",
        type: "number",
        required: false,
        group: "Range",
        tooltip: "e.g., 1, 10, 100",
        fieldDescription: "Minimum threshold value for this rule to be applicable",
      },
      {
        name: "maxValue",
        type: "number",
        required: false,
        group: "Range",
        tooltip: "e.g., 100, 1000, 5000",
        fieldDescription: "Maximum threshold value for this rule to be applicable",
      },
      {
        name: "isActive",
        type: "text",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Mark whether this rule is currently active and should be applied",
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
        tooltip: "e.g., 'Fuel Surcharge 2024', 'Holiday Premium', 'Hazmat Fee'",
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
        name: "isActive",
        type: "text",
        required: true,
        group: "Status",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Mark whether this surcharge is currently being applied",
      },
      {
        name: "amount",
        type: "number",
        required: false,
        group: "Amount",
        tooltip: "e.g., 5.5, 10, 25.75",
        fieldDescription: "The fixed surcharge amount (for fixed calculation method)",
      },
      {
        name: "type",
        type: "text",
        required: false,
        group: "Classification",
        tooltip: "e.g., 'fuel', 'handling', 'seasonal', 'hazmat'",
        fieldDescription: "Category or type of surcharge for reporting purposes",
      },
      {
        name: "description",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Applied when fuel prices exceed $3 per liter', 'Holiday period premium'",
        fieldDescription: "Detailed explanation of when and why this surcharge is applied",
      },
      {
        name: "validFrom",
        type: "date",
        required: false,
        group: "Validity",
        tooltip: "e.g., 01/01/2024, 01/04/2024",
        fieldDescription: "The start date when this surcharge becomes effective",
      },
      {
        name: "validTo",
        type: "date",
        required: false,
        group: "Validity",
        tooltip: "e.g., 12/31/2024, 03/31/2024",
        fieldDescription: "The end date when this surcharge expires or becomes inactive",
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
        name: "user",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'DRV-001', 'juan.cruz@company.com'",
        fieldDescription: "The user account associated with this driver",
      },
      {
        name: "licenseNumber",
        type: "text",
        required: true,
        group: "License Information",
        tooltip: "e.g., 'N01-12-345678', 'DL123456789'",
        fieldDescription: "The driver's official license number",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "e.g., 'active', 'inactive', 'on-leave'",
        fieldDescription: "The current operational status of the driver",
        options: ["active", "inactive", "on-leave"],
      },
      {
        name: "licenseExpiryDate",
        type: "date",
        required: false,
        group: "License Information",
        tooltip: "e.g., 01/15/2025, 12/31/2026",
        fieldDescription: "The date when the driver's license expires",
      },
    ],
  },
  "transport-management/driver-schedules": {
    schema: "transport-management",
    entity: "DriverSchedule",
    enum: "TransportManagementDriverSchedules",
    description:
      "Manages driver availability schedules including vacations, sick leave, training, and personal time off",
    fields: [
      {
        name: "driver",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'DRV-001', 'Juan Dela Cruz'",
        fieldDescription: "The driver this schedule applies to",
      },
      {
        name: "startDate",
        type: "date",
        required: true,
        group: "Period",
        tooltip: "e.g., 01/15/2024, 02/01/2024",
        fieldDescription: "The start date of this schedule period",
      },
      {
        name: "endDate",
        type: "date",
        required: true,
        group: "Period",
        tooltip: "e.g., 01/22/2024, 02/15/2024",
        fieldDescription: "The end date of this schedule period",
      },
      {
        name: "reason",
        type: "select",
        required: false,
        group: "Details",
        tooltip: "e.g., 'vacation', 'sick-leave', 'training'",
        fieldDescription: "The reason for this schedule change",
        options: ["vacation", "sick-leave", "training", "personal-leave"],
      },
    ],
  },
  "transport-management/vehicles": {
    schema: "transport-management",
    entity: "Vehicle",
    enum: "TransportManagementVehicles",
    description:
      "Tracks vehicle information including registration, status, specifications, and capacity limits for fleet management",
    fields: [
      {
        name: "registrationNumber",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'ABC-1234', 'MET-2024-001'",
        fieldDescription: "The vehicle's registration or license plate number",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "e.g., 'available', 'in-maintenance', 'on-trip'",
        fieldDescription: "The current operational status of the vehicle",
        options: ["available", "in-maintenance", "on-trip", "out-of-service"],
      },
      {
        name: "model",
        type: "text",
        required: false,
        group: "Specifications",
        tooltip: "e.g., 'Isuzu ELF', 'Hino 500', 'Mitsubishi Canter'",
        fieldDescription: "The make and model of the vehicle",
      },
      {
        name: "capacityWeight",
        type: "number",
        required: false,
        group: "Capacity",
        tooltip: "e.g., 3000, 5000, 10000",
        fieldDescription: "Maximum weight capacity in kilograms",
      },
      {
        name: "capacityVolume",
        type: "number",
        required: false,
        group: "Capacity",
        tooltip: "e.g., 15, 25, 50",
        fieldDescription: "Maximum volume capacity in cubic meters",
      },
      {
        name: "fuelType",
        type: "text",
        required: false,
        group: "Specifications",
        tooltip: "e.g., 'Diesel', 'Gasoline', 'LPG'",
        fieldDescription: "The type of fuel this vehicle uses",
      },
      {
        name: "yearManufactured",
        type: "number",
        required: false,
        group: "Specifications",
        tooltip: "e.g., 2020, 2022, 2024",
        fieldDescription: "The year the vehicle was manufactured",
      },
      {
        name: "acquisitionDate",
        type: "date",
        required: false,
        group: "History",
        tooltip: "e.g., 01/15/2020, 06/01/2023",
        fieldDescription: "The date when this vehicle was acquired",
      },
      {
        name: "nextMaintenanceDate",
        type: "date",
        required: false,
        group: "Maintenance",
        tooltip: "e.g., 01/15/2024, 03/01/2024",
        fieldDescription: "Scheduled next maintenance date",
      },
    ],
  },
  "transport-management/vehicle-maintenance": {
    schema: "transport-management",
    entity: "VehicleMaintenance",
    enum: "TransportManagementVehicleMaintenance",
    description:
      "Logs vehicle maintenance records including service dates, types, and costs for preventive maintenance tracking",
    fields: [
      {
        name: "vehicle",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'VEH-001', 'ABC-1234'",
        fieldDescription: "The vehicle being maintained",
      },
      {
        name: "serviceDate",
        type: "date",
        required: true,
        group: "Service Details",
        tooltip: "e.g., 01/15/2024, 02/01/2024",
        fieldDescription: "The date when the service was performed",
      },
      {
        name: "serviceType",
        type: "text",
        required: true,
        group: "Service Details",
        tooltip: "e.g., 'Oil change', 'Tire rotation', 'Brake inspection'",
        fieldDescription: "The type of service performed",
      },
      {
        name: "cost",
        type: "number",
        required: false,
        group: "Financial",
        tooltip: "e.g., 500, 1500.50, 5000",
        fieldDescription: "The cost of this maintenance service",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Additional Information",
        tooltip: "e.g., 'Replaced brake pads', 'Engine oil filter changed'",
        fieldDescription: "Additional notes about the service performed",
      },
    ],
  },
  "transport-management/trips": {
    schema: "transport-management",
    entity: "Trip",
    enum: "TransportManagementTrips",
    description:
      "Records trips combining driver and vehicle assignments with status tracking through the journey lifecycle",
    fields: [
      {
        name: "driver",
        type: "text",
        required: true,
        group: "Assignment",
        tooltip: "e.g., 'DRV-001', 'Juan Dela Cruz'",
        fieldDescription: "The driver assigned to this trip",
      },
      {
        name: "vehicle",
        type: "text",
        required: true,
        group: "Assignment",
        tooltip: "e.g., 'VEH-001', 'ABC-1234'",
        fieldDescription: "The vehicle assigned to this trip",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "e.g., 'planned', 'in-progress', 'completed'",
        fieldDescription: "The current status of the trip",
        options: ["planned", "in-progress", "completed", "cancelled"],
      },
      {
        name: "startTime",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., 01/15/2024 08:00 AM, 02/01/2024 06:30",
        fieldDescription: "When the trip started or is scheduled to start",
      },
      {
        name: "endTime",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., 01/15/2024 06:00 PM, 02/01/2024 18:30",
        fieldDescription: "When the trip ended or is scheduled to end",
      },
      {
        name: "route",
        type: "text",
        required: false,
        group: "Route",
        tooltip: "e.g., 'Route A', 'Daily Circuit North'",
        fieldDescription: "The predefined route for this trip",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Notes",
        tooltip: "e.g., 'Priority shipments', 'Special handling required'",
        fieldDescription: "Additional notes or special instructions for this trip",
      },
    ],
  },
  "transport-management/trip-stops": {
    schema: "transport-management",
    entity: "TripStop",
    enum: "TransportManagementTripStops",
    description:
      "Defines individual stops within a trip with sequencing, location details, shipment references, and timing estimates",
    fields: [
      {
        name: "trip",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'TRIP-2024-001', 'DLV-456'",
        fieldDescription: "The trip this stop is part of",
      },
      {
        name: "sequence",
        type: "number",
        required: true,
        group: "Routing",
        tooltip: "e.g., 1, 2, 3, 4",
        fieldDescription: "The sequence number of this stop in the trip order",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "e.g., 'pending', 'arrived', 'completed'",
        fieldDescription: "The current status of this stop",
        options: ["pending", "arrived", "completed", "skipped"],
      },
      {
        name: "address",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., '123 Main St, QC', 'Warehouse Building A'",
        fieldDescription: "The physical address of this stop",
      },
      {
        name: "shipment",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'SHP-2024-001', 'BL-789456'",
        fieldDescription: "The shipment being delivered or picked up at this stop",
      },
      {
        name: "estimatedArrivalTime",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45",
        fieldDescription: "The estimated time of arrival at this stop",
      },
      {
        name: "estimatedDepartureTime",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., 01/15/2024 11:00 AM, 02/01/2024 15:15",
        fieldDescription: "The estimated time of departure from this stop",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Notes",
        tooltip: "e.g., 'Ring bell twice', 'Signature required'",
        fieldDescription: "Special instructions or notes for this stop",
      },
    ],
  },

  // ============= WAREHOUSE MANAGEMENT =============
  "warehouse-management/warehouses": {
    schema: "warehouse-management",
    entity: "Warehouse",
    enum: "WarehouseManagementWarehouses",
    description:
      "Stores warehouse facility information including addresses, contact details, timezone, and operational status",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Manila Warehouse', 'Cebu Distribution Center'",
        fieldDescription: "The name of the warehouse facility",
      },
      {
        name: "address",
        type: "text",
        required: true,
        group: "Address",
        tooltip: "e.g., '123 Main Street', 'Block A Building 1'",
        fieldDescription: "The street address of the warehouse",
      },
      {
        name: "city",
        type: "text",
        required: true,
        group: "Address",
        tooltip: "e.g., 'Manila', 'Cebu City', 'Davao'",
        fieldDescription: "The city where the warehouse is located",
      },
      {
        name: "state",
        type: "text",
        required: true,
        group: "Address",
        tooltip: "e.g., 'Metro Manila', 'Cebu', 'Davao del Sur'",
        fieldDescription: "The state or province where the warehouse is located",
      },
      {
        name: "country",
        type: "text",
        required: true,
        group: "Address",
        tooltip: "e.g., 'Philippines', 'Vietnam', 'Thailand'",
        fieldDescription: "The country where the warehouse is located",
      },
      {
        name: "postalCode",
        type: "text",
        required: true,
        group: "Address",
        tooltip: "e.g., '1200', '6000', '8000'",
        fieldDescription: "The postal code of the warehouse location",
      },
      {
        name: "contactPerson",
        type: "text",
        required: false,
        group: "Contact Information",
        tooltip: "e.g., 'John Doe', 'Maria Garcia'",
        fieldDescription: "Name of the main contact person for this warehouse",
      },
      {
        name: "contactPhone",
        type: "text",
        required: false,
        group: "Contact Information",
        tooltip: "e.g., '+63 2 1234-5678', '09123456789'",
        fieldDescription: "Phone number for warehouse contact",
      },
      {
        name: "contactEmail",
        type: "email",
        required: false,
        group: "Contact Information",
        tooltip: "e.g., 'manager@warehouse.com', 'contact@logistics.com'",
        fieldDescription: "Email address for warehouse contact",
      },
      {
        name: "timezone",
        type: "text",
        required: false,
        group: "Operational Settings",
        tooltip: "e.g., 'UTC+8', 'Asia/Manila'",
        fieldDescription: "The timezone for warehouse operations",
      },
      {
        name: "isActive",
        type: "text",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether this warehouse is currently active and operational",
      },
    ],
  },
  "warehouse-management/locations": {
    schema: "warehouse-management",
    entity: "Location",
    enum: "WarehouseManagementLocations",
    description:
      "Defines storage locations within warehouses (zones, aisles, racks, bins, etc.) with hierarchical structure, capacity limits, and operational constraints",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Zone A', 'Aisle 5', 'Rack B-12'",
        fieldDescription: "The name or identifier for this location",
      },
      {
        name: "warehouse",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'Manila Warehouse', 'Cebu Center'",
        fieldDescription: "The parent warehouse this location belongs to",
      },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Classification",
        tooltip: "e.g., 'zone', 'aisle', 'rack', 'bin'",
        fieldDescription: "The type of location in the warehouse hierarchy",
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
      {
        name: "parentLocation",
        type: "text",
        required: false,
        group: "Hierarchy",
        tooltip: "e.g., 'Zone A', 'Aisle 5'",
        fieldDescription: "Parent location if this is a sub-location",
      },
      {
        name: "barcode",
        type: "text",
        required: false,
        group: "Identification",
        tooltip: "e.g., 'LOC-001', 'BIN-A5-12'",
        fieldDescription: "Barcode for this location",
      },
      {
        name: "level",
        type: "number",
        required: false,
        group: "Physical Layout",
        tooltip: "e.g., 0, 1, 2, 3",
        fieldDescription: "Height level (0 = ground level)",
      },
      {
        name: "maxWeight",
        type: "number",
        required: false,
        group: "Capacity",
        tooltip: "e.g., 500, 1000, 2000",
        fieldDescription: "Maximum weight capacity in kilograms",
      },
      {
        name: "maxVolume",
        type: "number",
        required: false,
        group: "Capacity",
        tooltip: "e.g., 5, 10, 25",
        fieldDescription: "Maximum volume capacity in cubic meters",
      },
      {
        name: "maxPallets",
        type: "number",
        required: false,
        group: "Capacity",
        tooltip: "e.g., 1, 2, 4",
        fieldDescription: "Maximum number of pallets allowed at this location",
      },
      {
        name: "isActive",
        type: "text",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether this location is available for storage",
      },
      {
        name: "isPickable",
        type: "text",
        required: false,
        group: "Operations",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether items can be picked from this location",
      },
      {
        name: "isReceivable",
        type: "text",
        required: false,
        group: "Operations",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether items can be received at this location",
      },
      {
        name: "temperatureControlled",
        type: "text",
        required: false,
        group: "Environment",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether this location has temperature control",
      },
      {
        name: "hazmatApproved",
        type: "text",
        required: false,
        group: "Environment",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether this location is approved for hazardous materials",
      },
    ],
  },
  "warehouse-management/inventory-stock": {
    schema: "warehouse-management",
    entity: "InventoryStock",
    enum: "WarehouseManagementInventoryStock",
    description:
      "Tracks current inventory levels by product and location with batch/lot information, reservation tracking, and movement history",
    fields: [
      {
        name: "product",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "The product this stock record is for",
      },
      {
        name: "location",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'LOC-001', 'Bin A5'",
        fieldDescription: "The warehouse location where this stock is stored",
      },
      {
        name: "quantity",
        type: "number",
        required: true,
        group: "Stock",
        tooltip: "e.g., 50, 100, 500",
        fieldDescription: "The current quantity on hand",
      },
      {
        name: "batch",
        type: "text",
        required: false,
        group: "Batch Information",
        tooltip: "e.g., 'BATCH-2024-001', 'LOT123'",
        fieldDescription: "Batch or lot number of the stock",
      },
      {
        name: "reservedQuantity",
        type: "number",
        required: false,
        group: "Stock",
        tooltip: "e.g., 10, 25, 50",
        fieldDescription: "Quantity reserved for pending orders",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'on-hand', 'allocated', 'reserved'",
        fieldDescription: "The status of this inventory",
        options: ["on-hand", "allocated", "reserved", "damaged", "expired", "quarantined"],
      },
      {
        name: "lastMovementAt",
        type: "datetime",
        required: false,
        group: "Tracking",
        tooltip: "e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45",
        fieldDescription: "Timestamp of the last stock movement",
      },
      {
        name: "lastCountedAt",
        type: "datetime",
        required: false,
        group: "Tracking",
        tooltip: "e.g., 01/10/2024, 01/31/2024",
        fieldDescription: "Timestamp of the last inventory count",
      },
    ],
  },
  "warehouse-management/bin-thresholds": {
    schema: "warehouse-management",
    entity: "BinThreshold",
    enum: "WarehouseManagementBinThreshold",
    description:
      "Sets minimum/maximum quantity thresholds and reorder points for products in specific locations to maintain optimal stock levels",
    fields: [
      {
        name: "location",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'LOC-001', 'Bin A5'",
        fieldDescription: "The bin or location this threshold applies to",
      },
      {
        name: "product",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "The product this threshold is for",
      },
      {
        name: "minQuantity",
        type: "number",
        required: false,
        group: "Thresholds",
        tooltip: "e.g., 10, 25, 50",
        fieldDescription: "Minimum quantity before alert",
      },
      {
        name: "maxQuantity",
        type: "number",
        required: false,
        group: "Thresholds",
        tooltip: "e.g., 100, 250, 500",
        fieldDescription: "Maximum quantity allowed in this bin",
      },
      {
        name: "reorderQuantity",
        type: "number",
        required: false,
        group: "Replenishment",
        tooltip: "e.g., 50, 100, 200",
        fieldDescription: "Quantity to reorder when stock falls below minimum",
      },
    ],
  },

  // ============= DELIVERY MANAGEMENT =============
  "delivery-management/routes": {
    schema: "delivery-management",
    entity: "Route",
    enum: "DeliveryManagementRoutes",
    description:
      "Plans delivery routes with driver and vehicle assignments, tracking status, distance, and estimated duration",
    fields: [
      {
        name: "driver",
        type: "text",
        required: true,
        group: "Assignment",
        tooltip: "e.g., 'DRV-001', 'Juan Dela Cruz'",
        fieldDescription: "The driver assigned to this delivery route",
      },
      {
        name: "vehicle",
        type: "text",
        required: true,
        group: "Assignment",
        tooltip: "e.g., 'VEH-001', 'ABC-1234'",
        fieldDescription: "The vehicle assigned to this delivery route",
      },
      {
        name: "routeDate",
        type: "date",
        required: true,
        group: "Schedule",
        tooltip: "e.g., 01/15/2024, 02/01/2024",
        fieldDescription: "The date for this delivery route",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "e.g., 'planned', 'in-progress', 'completed'",
        fieldDescription: "The current status of the delivery route",
        options: ["planned", "in-progress", "completed", "cancelled"],
      },
      {
        name: "totalDistance",
        type: "number",
        required: false,
        group: "Metrics",
        tooltip: "e.g., 50, 125.5, 250",
        fieldDescription: "Total distance to cover in kilometers",
      },
      {
        name: "estimatedDurationInMinutes",
        type: "number",
        required: false,
        group: "Metrics",
        tooltip: "e.g., 180, 300, 480",
        fieldDescription: "Estimated total duration of the route in minutes",
      },
    ],
  },
  "delivery-management/tasks": {
    schema: "delivery-management",
    entity: "Task",
    enum: "DeliveryManagementTasks",
    description:
      "Represents individual delivery tasks with recipient details, delivery address, timing, and failure tracking for multi-attempt deliveries",
    fields: [
      {
        name: "route",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'ROUTE-001', 'DLV-456'",
        fieldDescription: "The delivery route this task is part of",
      },
      {
        name: "package",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'PKG-001', 'PACK-789'",
        fieldDescription: "The package to be delivered",
      },
      {
        name: "deliveryAddress",
        type: "text",
        required: true,
        group: "Location",
        tooltip: "e.g., '123 Main St, QC', 'Warehouse Building A'",
        fieldDescription: "The complete delivery address",
      },
      {
        name: "sequence",
        type: "number",
        required: true,
        group: "Routing",
        tooltip: "e.g., 1, 2, 3, 4",
        fieldDescription: "The sequence number of this task in the route",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "e.g., 'pending', 'assigned', 'delivered'",
        fieldDescription: "The current delivery status of this task",
        options: ["pending", "assigned", "out-for-delivery", "delivered", "failed", "cancelled", "rescheduled"],
      },
      {
        name: "recipientName",
        type: "text",
        required: false,
        group: "Recipient",
        tooltip: "e.g., 'John Doe', 'ABC Corporation'",
        fieldDescription: "Name of the package recipient",
      },
      {
        name: "recipientPhone",
        type: "text",
        required: false,
        group: "Recipient",
        tooltip: "e.g., '+63 9123456789', '02-1234-5678'",
        fieldDescription: "Contact phone number of the recipient",
      },
      {
        name: "deliveryInstructions",
        type: "textarea",
        required: false,
        group: "Instructions",
        tooltip: "e.g., 'Ring bell twice', 'Leave at gate'",
        fieldDescription: "Special delivery instructions or handling requirements",
      },
      {
        name: "estimatedArrivalTime",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45",
        fieldDescription: "Estimated time of arrival at delivery location",
      },
      {
        name: "actualArrivalTime",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., 01/15/2024 10:25 AM, 02/01/2024 14:50",
        fieldDescription: "Actual arrival time at delivery location",
      },
      {
        name: "deliveryTime",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., 01/15/2024 10:35 AM, 02/01/2024 15:00",
        fieldDescription: "Time when the delivery was completed",
      },
      {
        name: "failureReason",
        type: "select",
        required: false,
        group: "Failure Details",
        tooltip: "e.g., 'recipient-not-home', 'address-not-found'",
        fieldDescription: "Reason if delivery failed or did not complete",
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
      {
        name: "attemptCount",
        type: "number",
        required: false,
        group: "Attempts",
        tooltip: "e.g., 1, 2, 3",
        fieldDescription: "Number of delivery attempts made for this task",
      },
    ],
  },
  "delivery-management/proof-of-deliveries": {
    schema: "delivery-management",
    entity: "ProofOfDelivery",
    enum: "DeliveryManagementProofOfDeliveries",
    description:
      "Records delivery confirmations with recipient signatures, GPS coordinates, and timestamps for accountability",
    fields: [
      {
        name: "task",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'TASK-001', 'DLV-456'",
        fieldDescription: "The delivery task this proof is for",
      },
      {
        name: "timestamp",
        type: "datetime",
        required: true,
        group: "Timestamp",
        tooltip: "e.g., 01/15/2024 10:35 AM, 02/01/2024 15:00",
        fieldDescription: "Date and time when delivery was confirmed",
      },
      {
        name: "recipientName",
        type: "text",
        required: false,
        group: "Recipient",
        tooltip: "e.g., 'John Doe', 'ABC Corporation'",
        fieldDescription: "Name of the person who received the package",
      },
      {
        name: "coordinates",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., '14.5995,120.9842', '14.6091,121.0175'",
        fieldDescription: "GPS coordinates in latitude,longitude format",
      },
      {
        name: "signatureUrl",
        type: "text",
        required: false,
        group: "Signature",
        tooltip: "e.g., 'https://...', 'Base64 encoded data'",
        fieldDescription: "URL or data of recipient signature",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Notes",
        tooltip: "e.g., 'Left at doorstep', 'Handed to building guard'",
        fieldDescription: "Additional notes about the delivery",
      },
    ],
  },

  // ============= ADDITIONAL BILLING MANAGEMENT =============
  "billing-management/account-transactions": {
    schema: "billing-management",
    entity: "AccountTransaction",
    enum: "BillingManagementAccountTransactions",
    description:
      "Logs all financial transactions (credits, debits, top-ups, refunds, adjustments) with running balance tracking",
    fields: [
      {
        name: "clientAccount",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'ACC-001', 'CLIENT-ABC-2024'",
        fieldDescription: "The client account this transaction is associated with",
      },
      {
        name: "amount",
        type: "number",
        required: true,
        group: "Amount",
        tooltip: "e.g., 100.50, 5000, 15000.75",
        fieldDescription: "The transaction amount in the account currency",
      },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Transaction Details",
        tooltip: "e.g., credit, debit, top-up, refund",
        fieldDescription: "The category of this transaction",
        options: ["credit", "debit", "top-up", "refund", "adjustment", "fee"],
      },
      {
        name: "referenceNumber",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'TXN-2024-12345', 'INV-789', 'PO-456'",
        fieldDescription: "External reference number for tracking (invoice, PO, or check number)",
      },
      {
        name: "processedBy",
        type: "text",
        required: false,
        group: "Processing",
        tooltip: "e.g., 'John Doe', 'admin@company.com'",
        fieldDescription: "The user or system that processed this transaction",
      },
      {
        name: "transactionDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., 01/15/2024, 12/25/2023",
        fieldDescription: "The date when this transaction occurred",
      },
      {
        name: "runningBalance",
        type: "number",
        required: false,
        group: "Balance",
        tooltip: "e.g., 5000.50, 12000, 25000.00",
        fieldDescription: "The account balance remaining after this transaction is processed",
      },
    ],
  },
  "billing-management/invoices": {
    schema: "billing-management",
    entity: "Invoice",
    enum: "BillingManagementInvoices",
    description: "Generates billing invoices for clients with line items, tax calculations, and payment tracking",
    fields: [
      {
        name: "invoiceNumber",
        type: "text",
        required: false,
        group: "Identification",
        tooltip: "e.g., 'INV-2024-001', 'BL-789456'",
        fieldDescription: "Unique identifier for this invoice",
      },
      {
        name: "issueDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., 01/15/2024, 12/01/2023",
        fieldDescription: "The date when the invoice is created and sent",
      },
      {
        name: "dueDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., 02/15/2024, 01/30/2024",
        fieldDescription: "The deadline by which payment must be received",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., draft, sent, paid, past-due",
        fieldDescription: "The current state of the invoice",
        options: ["draft", "sent", "viewed", "paid", "partial-paid", "past-due", "disputed", "cancelled", "void"],
      },
      {
        name: "currency",
        type: "text",
        required: false,
        group: "Financial",
        tooltip: "e.g., 'USD', 'EUR', 'GBP', 'PHP'",
        fieldDescription: "The currency code for all amounts on this invoice",
      },
      {
        name: "subtotal",
        type: "number",
        required: false,
        group: "Financial",
        tooltip: "e.g., 1000, 5500.50, 25000.75",
        fieldDescription: "The sum of all line items before any adjustments",
      },
      {
        name: "discountAmount",
        type: "number",
        required: false,
        group: "Financial",
        tooltip: "e.g., 100, 250.50, 1000",
        fieldDescription: "Total discount applied to the invoice",
      },
      {
        name: "totalAmount",
        type: "number",
        required: false,
        group: "Financial",
        tooltip: "e.g., 1100, 6000, 28000",
        fieldDescription: "The final amount owed including all taxes and adjustments",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Additional Information",
        tooltip: "e.g., 'Thank you for your business', 'Please reference invoice number in payment'",
        fieldDescription: "Additional information or messages for the invoice recipient",
      },
      {
        name: "paymentTerms",
        type: "textarea",
        required: false,
        group: "Terms",
        tooltip: "e.g., 'Net 30', '50% upfront, 50% on delivery', '2/10 net 30'",
        fieldDescription: "Payment terms and conditions specific to this invoice",
      },
      {
        name: "quote",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'QUOTE-2024-001', 'QT-456'",
        fieldDescription: "Link to the original quote if this invoice is based on one",
      },
    ],
  },
  "billing-management/invoice-line-items": {
    schema: "billing-management",
    entity: "InvoiceLineItem",
    enum: "BillingManagementInvoiceLineItems",
    description: "Line items for invoices with service descriptions, quantities, rates, and amount calculations",
    fields: [
      {
        name: "invoice",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'INV-2024-001', 'BL-789'",
        fieldDescription: "The invoice this line item belongs to",
      },
      {
        name: "description",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Ground Shipping - 50kg package', 'Customs Brokerage Fee'",
        fieldDescription: "Description of the service or product being charged",
      },
      {
        name: "quantity",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., 1, 10, 100.5",
        fieldDescription: "The number of units or quantity of service",
      },
      {
        name: "unitPrice",
        type: "number",
        required: false,
        group: "Pricing",
        tooltip: "e.g., 25.50, 100, 1500.00",
        fieldDescription: "The price per unit or per service",
      },
      {
        name: "discountRate",
        type: "number",
        required: false,
        group: "Discount",
        tooltip: "e.g., 5, 10, 15 (as percentage)",
        fieldDescription: "Discount percentage applied to this line item",
      },
      {
        name: "discountAmount",
        type: "number",
        required: false,
        group: "Discount",
        tooltip: "e.g., 25, 100, 500.50",
        fieldDescription: "The discount amount deducted from this line",
      },
      {
        name: "taxRate",
        type: "number",
        required: false,
        group: "Tax",
        tooltip: "e.g., 5, 10, 15, 12.5 (as percentage)",
        fieldDescription: "Tax percentage applied to this line item",
      },
      {
        name: "taxAmount",
        type: "number",
        required: false,
        group: "Tax",
        tooltip: "e.g., 50, 150, 1000.00",
        fieldDescription: "The calculated tax amount for this line item",
      },
    ],
  },
  "billing-management/quotes": {
    schema: "billing-management",
    entity: "Quote",
    enum: "BillingManagementQuotes",
    description: "Pricing quotes for shipments with route, dimensions, service level, and validity tracking",
    fields: [
      {
        name: "quoteNumber",
        type: "text",
        required: false,
        group: "Identification",
        tooltip: "e.g., 'QUOTE-2024-001', 'QT-789456'",
        fieldDescription: "Unique identifier for this quote",
      },
      {
        name: "client",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'CLIENT-ABC', 'Enterprise Inc'",
        fieldDescription: "The client requesting this quote",
      },
      {
        name: "originDetails",
        type: "textarea",
        required: true,
        group: "Route Details",
        tooltip: "e.g., 'Manila, Philippines', '123 Main St, Makati City'",
        fieldDescription: "Complete pickup location address and details",
      },
      {
        name: "destinationDetails",
        type: "textarea",
        required: true,
        group: "Route Details",
        tooltip: "e.g., 'Cebu, Philippines', '456 Oak Ave, Cebu City'",
        fieldDescription: "Complete delivery destination address and details",
      },
      {
        name: "weight",
        type: "number",
        required: true,
        group: "Shipment Details",
        tooltip: "e.g., 50, 100, 250.5",
        fieldDescription: "Total weight of the shipment in kilograms",
      },
      {
        name: "length",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., 30, 50, 100",
        fieldDescription: "Length of package in centimeters",
      },
      {
        name: "width",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., 20, 40, 80",
        fieldDescription: "Width of package in centimeters",
      },
      {
        name: "height",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., 15, 30, 60",
        fieldDescription: "Height of package in centimeters",
      },
      {
        name: "serviceLevel",
        type: "text",
        required: false,
        group: "Service",
        tooltip: "e.g., 'Standard', 'Express', 'Overnight', 'Economy'",
        fieldDescription: "The type or speed of service requested",
      },
      {
        name: "quotePrice",
        type: "number",
        required: false,
        group: "Pricing",
        tooltip: "e.g., 500, 1500.50, 5000",
        fieldDescription: "The proposed price for this shipment",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., pending, accepted, expired, converted",
        fieldDescription: "The current state of this quote",
        options: ["pending", "accepted", "expired", "cancelled", "converted"],
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Additional Information",
        tooltip: "e.g., 'Special handling required', 'Fragile items', 'Temperature controlled'",
        fieldDescription: "Any special conditions, requirements, or notes about this quote",
      },
      {
        name: "expiredAt",
        type: "date",
        required: false,
        group: "Validity",
        tooltip: "e.g., 02/15/2024, 03/31/2024",
        fieldDescription: "The date when this quote is no longer valid",
      },
    ],
  },
  "billing-management/payments": {
    schema: "billing-management",
    entity: "Payment",
    enum: "BillingManagementPayments",
    description: "Logs payment transactions with method, amount, status, and gateway references for financial tracking",
    fields: [
      {
        name: "invoice",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'INV-2024-001', 'BL-789'",
        fieldDescription: "The invoice this payment is for",
      },
      {
        name: "amount",
        type: "number",
        required: false,
        group: "Amount",
        tooltip: "e.g., 500, 1500.50, 10000",
        fieldDescription: "The amount paid by the client",
      },
      {
        name: "paymentDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., 01/20/2024, 02/15/2024",
        fieldDescription: "The date when payment was received",
      },
      {
        name: "paymentMethod",
        type: "select",
        required: false,
        group: "Method",
        tooltip: "e.g., credit-card, bank-transfer, wallet, cash",
        fieldDescription: "The method used to make this payment",
        options: ["credit-card", "debit-card", "wallet", "qr-ph", "client-credit", "bank-transfer", "cash", "check"],
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., pending, successful, failed, refunded",
        fieldDescription: "The current state of this payment",
        options: ["pending", "processing", "successful", "failed", "cancelled", "refunded"],
      },
      {
        name: "transactionId",
        type: "text",
        required: false,
        group: "Transaction",
        tooltip: "e.g., 'TXN-123456789', 'TRANS-PHP-001'",
        fieldDescription: "Unique transaction identifier from payment processor",
      },
      {
        name: "gatewayReferenceId",
        type: "text",
        required: false,
        group: "Gateway",
        tooltip: "e.g., 'GWAY-456789', 'PG-REF-123'",
        fieldDescription: "Reference ID provided by the payment gateway",
      },
      {
        name: "currency",
        type: "text",
        required: false,
        group: "Currency",
        tooltip: "e.g., 'PHP', 'USD', 'EUR'",
        fieldDescription: "The currency in which payment was made",
      },
      {
        name: "fees",
        type: "number",
        required: false,
        group: "Fees",
        tooltip: "e.g., 10, 50.50, 100",
        fieldDescription: "Processing or transaction fees charged for this payment",
      },
      {
        name: "netAmount",
        type: "number",
        required: false,
        group: "Amount",
        tooltip: "e.g., 490, 1450, 9900",
        fieldDescription: "The net amount received after deducting fees",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Additional Information",
        tooltip: "e.g., 'Early payment discount applied', 'Partial payment'",
        fieldDescription: "Any additional notes or details about this payment",
      },
    ],
  },
  "billing-management/disputes": {
    schema: "billing-management",
    entity: "Dispute",
    enum: "BillingManagementDisputes",
    description: "Tracks invoice disputes with reason, status, and resolution tracking for dispute management workflow",
    fields: [
      {
        name: "client",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'CLIENT-ABC', 'Enterprise Inc'",
        fieldDescription: "The client who filed this dispute",
      },
      {
        name: "lineItem",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'ITEM-123', 'INV-001-LI-1'",
        fieldDescription: "The specific invoice line item being disputed",
      },
      {
        name: "reason",
        type: "textarea",
        required: true,
        group: "Details",
        tooltip: "e.g., 'Service not rendered as agreed', 'Incorrect quantity charged'",
        fieldDescription: "The reason why the client is disputing this charge",
      },
      {
        name: "disputeAmount",
        type: "number",
        required: false,
        group: "Amount",
        tooltip: "e.g., 100, 500.50, 5000",
        fieldDescription: "The amount being disputed",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., open, under-review, approved, denied",
        fieldDescription: "The current status of the dispute resolution process",
        options: ["open", "under-review", "approved", "denied", "escalated", "closed"],
      },
      {
        name: "submittedAt",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., 01/10/2024, 02/01/2024",
        fieldDescription: "The date when the dispute was filed",
      },
      {
        name: "resolvedAt",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., 01/25/2024, 02/15/2024",
        fieldDescription: "The date when the dispute was resolved",
      },
      {
        name: "resolvedBy",
        type: "text",
        required: false,
        group: "Resolution",
        tooltip: "e.g., 'John Doe', 'support@company.com'",
        fieldDescription: "The person who resolved this dispute",
      },
      {
        name: "resolutionNotes",
        type: "textarea",
        required: false,
        group: "Resolution",
        tooltip: "e.g., 'Credit issued for 50% of disputed amount', 'Service will be provided by date X'",
        fieldDescription: "Details about how the dispute was resolved and any actions taken",
      },
    ],
  },
  "billing-management/credit-notes": {
    schema: "billing-management",
    entity: "CreditNote",
    enum: "BillingManagementCreditNotes",
    description:
      "Issues credit to clients for returns, service failures, or adjustments with tracking of original invoices and disputes",
    fields: [
      {
        name: "creditNoteNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'CN-2024-001', 'CR-789456'",
        fieldDescription: "Unique identifier for this credit note",
      },
      {
        name: "invoice",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'INV-2024-001', 'BL-789'",
        fieldDescription: "Reference to the original invoice being credited",
      },
      {
        name: "dispute",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'DSP-001', 'DSP-2024-456'",
        fieldDescription: "Reference to the related dispute that triggered this credit",
      },
      {
        name: "reason",
        type: "textarea",
        required: true,
        group: "Details",
        tooltip: "e.g., 'Damaged shipment returned', 'Service not rendered as specified'",
        fieldDescription: "The reason for issuing this credit note",
      },
      {
        name: "amount",
        type: "number",
        required: false,
        group: "Amount",
        tooltip: "e.g., 100, 500.50, 5000",
        fieldDescription: "The credit amount being issued",
      },
      {
        name: "currency",
        type: "text",
        required: true,
        group: "Currency",
        tooltip: "e.g., 'PHP', 'USD', 'SGD'",
        fieldDescription: "The currency in which the credit is issued",
      },
      {
        name: "issueDate",
        type: "date",
        required: true,
        group: "Dates",
        tooltip: "e.g., 01/15/2024, 02/01/2024",
        fieldDescription: "The date when the credit note was issued",
      },
      {
        name: "appliedAt",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., 01/20/2024, 02/10/2024",
        fieldDescription: "The date when the credit was applied to the client account",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Additional Information",
        tooltip: "e.g., 'Applied to next invoice', 'Refund processed'",
        fieldDescription: "Additional notes about this credit note or resolution",
      },
    ],
  },

  // ============= ADDITIONAL TRANSPORT MANAGEMENT =============
  "transport-management/carriers": {
    schema: "transport-management",
    entity: "Carrier",
    enum: "TransportManagementCarriers",
    description: "Third-party carriers or logistics partners providing transportation and delivery services",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'DHL Express', 'FedEx Philippines', 'Local Courier Co'",
        fieldDescription: "The name of the carrier company",
      },
      {
        name: "contactDetails",
        type: "textarea",
        required: false,
        group: "Contact",
        tooltip: "e.g., '+63 2 1234-5678', 'contact@carrier.com', 'Manila Branch'",
        fieldDescription: "Primary contact information for the carrier",
      },
      {
        name: "serviceOffered",
        type: "textarea",
        required: false,
        group: "Services",
        tooltip: "e.g., 'Ground shipping', 'Express delivery', 'International services'",
        fieldDescription: "Description of services provided by this carrier",
      },
      {
        name: "capacity",
        type: "text",
        required: false,
        group: "Capabilities",
        tooltip: "e.g., 'Standard', 'Premium', 'Bulk'",
        fieldDescription: "The service tier or capacity level this carrier provides",
      },
      {
        name: "isActive",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether this carrier is currently active and available for bookings",
        options: ["yes", "no", "true", "false"],
      },
    ],
  },
  "transport-management/carrier-rates": {
    schema: "transport-management",
    entity: "CarrierRate",
    enum: "TransportManagementCarrierRates",
    description: "Pricing rates set by carriers for specific routes, services, and units",
    fields: [
      {
        name: "carrier",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'DHL', 'FedEx', 'Local Courier'",
        fieldDescription: "The carrier this rate applies to",
      },
      {
        name: "origin",
        type: "text",
        required: true,
        group: "Route",
        tooltip: "e.g., 'Metro Manila', 'Zone 1', 'NCR'",
        fieldDescription: "The origin location or zone code",
      },
      {
        name: "destination",
        type: "text",
        required: true,
        group: "Route",
        tooltip: "e.g., 'Cebu City', 'Zone 5', 'Visayas'",
        fieldDescription: "The destination location or zone code",
      },
      {
        name: "rate",
        type: "number",
        required: true,
        group: "Pricing",
        tooltip: "e.g., 150, 250.50, 500",
        fieldDescription: "The shipping rate for this route",
      },
      {
        name: "unit",
        type: "select",
        required: false,
        group: "Unit",
        tooltip: "e.g., 'per-kg', 'per-item', 'flat-rate'",
        fieldDescription: "The unit of measurement for this rate",
        options: ["per-kg", "per-item", "per-km", "flat-rate", "per-cubic-meter"],
      },
      {
        name: "serviceType",
        type: "text",
        required: false,
        group: "Service",
        tooltip: "e.g., 'Standard', 'Express', 'Overnight'",
        fieldDescription: "The type of service (standard, express, etc.)",
      },
    ],
  },
  "transport-management/expenses": {
    schema: "transport-management",
    entity: "Expense",
    enum: "TransportManagementExpenses",
    description:
      "Driver or trip-related expenses such as fuel, maintenance, tolls, and parking for reimbursement tracking",
    fields: [
      {
        name: "driver",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'DRV-001', 'Juan Dela Cruz'",
        fieldDescription: "The driver who incurred this expense",
      },
      {
        name: "trip",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'TRIP-2024-001', 'DLV-456'",
        fieldDescription: "The trip or delivery this expense relates to",
      },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Type",
        tooltip: "e.g., 'fuel', 'maintenance', 'tolls', 'parking'",
        fieldDescription: "The category of expense",
        options: ["fuel", "maintenance", "tolls", "parking", "other"],
      },
      {
        name: "amount",
        type: "number",
        required: true,
        group: "Amount",
        tooltip: "e.g., 500, 1500.50, 5000",
        fieldDescription: "The amount spent",
      },
      {
        name: "currency",
        type: "select",
        required: true,
        group: "Currency",
        tooltip: "e.g., 'PHP', 'USD', 'EUR'",
        fieldDescription: "The currency of the expense",
        options: ["PHP", "USD", "EUR", "SGD"],
      },
      {
        name: "odometerReading",
        type: "number",
        required: true,
        group: "Vehicle Data",
        tooltip: "e.g., 12500, 45678.5, 98765",
        fieldDescription: "The vehicle odometer reading at the time of expense",
      },
      {
        name: "fuelQuantity",
        type: "number",
        required: false,
        group: "Fuel",
        tooltip: "e.g., 10, 25.5, 50",
        fieldDescription: "Quantity of fuel purchased in liters (if fuel expense)",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'pending', 'approved', 'reimbursed'",
        fieldDescription: "The reimbursement status of this expense",
        options: ["pending", "approved", "reimbursed", "rejected"],
      },
    ],
  },
  "transport-management/routes": {
    schema: "transport-management",
    entity: "Route",
    enum: "TransportManagementRoutes",
    description: "Predefined delivery or transit routes with distance and duration information",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Route A - Metro Manila', 'Daily Circuit North'",
        fieldDescription: "The name or identifier of this route",
      },
      {
        name: "totalDistance",
        type: "number",
        required: true,
        group: "Metrics",
        tooltip: "e.g., 50, 125.5, 250",
        fieldDescription: "Total route distance in kilometers",
      },
      {
        name: "totalDuration",
        type: "number",
        required: true,
        group: "Metrics",
        tooltip: "e.g., 180, 300, 480",
        fieldDescription: "Total estimated duration in minutes",
      },
    ],
  },
  "transport-management/shipment-legs": {
    schema: "transport-management",
    entity: "ShipmentLeg",
    enum: "TransportManagementShipmentLegs",
    description: "Individual segments or hops of a shipment through different carriers or transportation modes",
    fields: [
      {
        name: "shipment",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'SHP-2024-001', 'BL-789456'",
        fieldDescription: "The shipment this leg is part of",
      },
      {
        name: "carrier",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'DHL', 'FedEx', 'Local Courier'",
        fieldDescription: "The carrier handling this leg of the shipment",
      },
      {
        name: "internalTrip",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'TRIP-2024-001', 'DLV-456'",
        fieldDescription: "Reference to internal trip if applicable",
      },
      {
        name: "legSequence",
        type: "number",
        required: true,
        group: "Sequence",
        tooltip: "e.g., 1, 2, 3",
        fieldDescription: "The sequence number of this leg in the shipment route",
      },
      {
        name: "startLocation",
        type: "text",
        required: true,
        group: "Location",
        tooltip: "e.g., 'Warehouse A - Manila', 'Regional Hub - Cebu'",
        fieldDescription: "The starting location for this leg",
      },
      {
        name: "endLocation",
        type: "text",
        required: true,
        group: "Location",
        tooltip: "e.g., 'Customer Site - QC', 'Port of Manila'",
        fieldDescription: "The ending location for this leg",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'pending', 'in-transit', 'completed'",
        fieldDescription: "The current status of this shipment leg",
        options: ["pending", "in-transit", "completed", "delayed", "cancelled"],
      },
    ],
  },
  "transport-management/shipment-leg-events": {
    schema: "transport-management",
    entity: "ShipmentLegEvent",
    enum: "TransportManagementShipmentLegEvents",
    description: "Status events and tracking milestones for each shipment leg",
    fields: [
      {
        name: "shipmentLegId",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'LEG-001', 'SLP-2024-001'",
        fieldDescription: "Reference to the shipment leg this event is for",
      },
      {
        name: "location",
        type: "text",
        required: true,
        group: "Location",
        tooltip: "e.g., 'Manila Hub', 'Cebu Port', 'Regional Warehouse'",
        fieldDescription: "The location where this event occurred",
      },
      {
        name: "timestamp",
        type: "datetime",
        required: true,
        group: "Timestamp",
        tooltip: "e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45",
        fieldDescription: "The date and time when this event occurred",
      },
      {
        name: "message",
        type: "textarea",
        required: true,
        group: "Message",
        tooltip: "e.g., 'Package picked up', 'In transit to destination', 'Arrived at sorting center'",
        fieldDescription: "Event description or tracking message",
      },
    ],
  },
  "transport-management/geofence": {
    schema: "transport-management",
    entity: "Geofence",
    enum: "TransportManagementGeofence",
    description: "Geographic areas defined by coordinates and radius for vehicle tracking and alerts",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Metro Manila Zone', 'Warehouse Area', 'Delivery Zone A'",
        fieldDescription: "The name of this geofenced area",
      },
      {
        name: "coordinates",
        type: "text",
        required: true,
        group: "Location",
        tooltip: "e.g., '14.5995,120.9842', '14.6091,121.0175'",
        fieldDescription: "Center coordinates in latitude,longitude format",
      },
      {
        name: "radius",
        type: "number",
        required: true,
        group: "Boundary",
        tooltip: "e.g., 500, 1000, 5000",
        fieldDescription: "Radius of the geofenced area in meters",
      },
      {
        name: "purpose",
        type: "text",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Delivery zone', 'Warehouse boundary', 'Restricted area'",
        fieldDescription: "The purpose or use of this geofence",
      },
      {
        name: "isActive",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether this geofence is currently active",
        options: ["yes", "no", "true", "false"],
      },
      {
        name: "alertType",
        type: "text",
        required: false,
        group: "Alerts",
        tooltip: "e.g., 'entry-only', 'exit-only', 'both'",
        fieldDescription: "The type of alert to trigger (entry, exit, or both)",
      },
    ],
  },
  "transport-management/geofence-events": {
    schema: "transport-management",
    entity: "GeofenceEvent",
    enum: "TransportManagementGeofenceEvents",
    description: "Records of vehicles entering or exiting geofenced areas for location tracking and alerts",
    fields: [
      {
        name: "geofence",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'GEO-001', 'Zone A', 'Warehouse boundary'",
        fieldDescription: "The geofence this event is associated with",
      },
      {
        name: "vehicle",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'VEH-001', 'TRUCK-A', 'License ABC123'",
        fieldDescription: "The vehicle that triggered this event",
      },
      {
        name: "type",
        type: "select",
        required: false,
        group: "Event Type",
        tooltip: "e.g., 'entry', 'exit'",
        fieldDescription: "Whether the vehicle entered or exited the geofence",
        options: ["entry", "exit"],
      },
      {
        name: "timestamp",
        type: "datetime",
        required: false,
        group: "Timestamp",
        tooltip: "e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45",
        fieldDescription: "The date and time when this geofence event occurred",
      },
      {
        name: "duration",
        type: "number",
        required: false,
        group: "Details",
        tooltip: "e.g., 30, 120, 300",
        fieldDescription: "Duration spent inside geofence in minutes (for exit events)",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Notes",
        tooltip: "e.g., 'Early arrival', 'Extended stay', 'Unexpected entry'",
        fieldDescription: "Additional notes about this geofence event",
      },
    ],
  },
  "transport-management/gps-pings": {
    schema: "transport-management",
    entity: "GpsPing",
    enum: "TransportManagementGpsPings",
    description: "GPS location data points recorded for vehicle tracking and route analysis",
    fields: [
      {
        name: "vehicle",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'VEH-001', 'TRUCK-A', 'License ABC123'",
        fieldDescription: "The vehicle being tracked",
      },
      {
        name: "coordinates",
        type: "text",
        required: true,
        group: "Location",
        tooltip: "e.g., '14.5995,120.9842', '14.6091,121.0175'",
        fieldDescription: "GPS coordinates in latitude,longitude format",
      },
      {
        name: "timestamp",
        type: "datetime",
        required: true,
        group: "Timestamp",
        tooltip: "e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45",
        fieldDescription: "The date and time of this GPS reading",
      },
      {
        name: "accuracy",
        type: "number",
        required: false,
        group: "Details",
        tooltip: "e.g., 5, 10, 50",
        fieldDescription: "GPS accuracy in meters",
      },
      {
        name: "speed",
        type: "number",
        required: false,
        group: "Details",
        tooltip: "e.g., 0, 25, 60",
        fieldDescription: "Vehicle speed in km/h at this reading",
      },
    ],
  },
  "transport-management/partner-invoice": {
    schema: "transport-management",
    entity: "PartnerInvoice",
    enum: "TransportManagementPartnerInvoice",
    description: "Invoices from third-party carriers or logistics partners for their services",
    fields: [
      {
        name: "carrier",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'DHL', 'FedEx', 'Local Courier'",
        fieldDescription: "The carrier or partner this invoice is from",
      },
      {
        name: "invoiceNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'DHL-INV-2024-001', 'FEDEX-789456'",
        fieldDescription: "The partner's invoice number",
      },
      {
        name: "invoiceDate",
        type: "date",
        required: true,
        group: "Dates",
        tooltip: "e.g., 01/15/2024, 02/01/2024",
        fieldDescription: "The date on the partner invoice",
      },
      {
        name: "totalAmount",
        type: "number",
        required: true,
        group: "Amount",
        tooltip: "e.g., 5000, 12500.50, 100000",
        fieldDescription: "The total amount of the invoice",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'draft', 'submitted', 'approved', 'paid'",
        fieldDescription: "The invoice processing status",
        options: ["draft", "submitted", "approved", "paid", "disputed"],
      },
    ],
  },
  "transport-management/partner-invoice-items": {
    schema: "transport-management",
    entity: "PartnerInvoiceItem",
    enum: "TransportManagementPartnerInvoiceItems",
    description: "Individual line items on partner invoices detailing charges for specific shipment legs",
    fields: [
      {
        name: "partnerInvoice",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'PINV-001', 'DHL-INV-2024-001'",
        fieldDescription: "The partner invoice this item belongs to",
      },
      {
        name: "shipmentLeg",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'LEG-001', 'SLP-2024-001'",
        fieldDescription: "The shipment leg being charged for",
      },
      {
        name: "amount",
        type: "number",
        required: true,
        group: "Amount",
        tooltip: "e.g., 500, 1500.50, 5000",
        fieldDescription: "The charge amount for this line item",
      },
      {
        name: "description",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Shipment from Manila to Cebu', 'Freight charges'",
        fieldDescription: "Description of the service or charges",
      },
      {
        name: "quantity",
        type: "number",
        required: false,
        group: "Details",
        tooltip: "e.g., 1, 5, 10",
        fieldDescription: "The quantity of items or units being charged",
      },
    ],
  },
  "transport-management/proof-of-deliveries": {
    schema: "transport-management",
    entity: "ProofOfDelivery",
    enum: "TransportManagementProofOfDeliveries",
    description: "Proof of delivery records including GPS coordinates, signatures, and delivery confirmation",
    fields: [
      {
        name: "tripStop",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'STOP-001', 'TRIP-001-S1'",
        fieldDescription: "The trip stop this delivery proof is for",
      },
      {
        name: "coordinate",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., '14.5995,120.9842', '14.6091,121.0175'",
        fieldDescription: "GPS coordinates of delivery in latitude,longitude format",
      },
      {
        name: "deliveryTime",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45",
        fieldDescription: "The date and time of delivery",
      },
      {
        name: "recipientName",
        type: "text",
        required: false,
        group: "Recipient",
        tooltip: "e.g., 'John Doe', 'ABC Corporation'",
        fieldDescription: "Name of person who received the package",
      },
      {
        name: "signatureData",
        type: "text",
        required: false,
        group: "Signature",
        tooltip: "e.g., 'Base64 encoded signature', 'URL to signature image'",
        fieldDescription: "Digital signature or signature image data",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Notes",
        tooltip: "e.g., 'Package left at gate', 'Recipient verified identity'",
        fieldDescription: "Additional delivery notes or conditions",
      },
    ],
  },

  // ============= ADDITIONAL WAREHOUSE MANAGEMENT =============
  "warehouse-management/products": {
    schema: "warehouse-management",
    entity: "Product",
    enum: "WarehouseManagementProducts",
    description:
      "Catalogs products available in the warehouse with SKU, name, category, unit cost, and reorder information",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Office Chair', 'Desk Lamp'",
        fieldDescription: "The name of the product",
      },
      {
        name: "sku",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'SKU123456', 'PROD-001'",
        fieldDescription: "Stock keeping unit for inventory tracking",
      },
      {
        name: "barcode",
        type: "text",
        required: false,
        group: "Identification",
        tooltip: "e.g., '5901234123457', 'BC-789123'",
        fieldDescription: "Product barcode for scanning",
      },
      {
        name: "description",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Ergonomic office chair with adjustable height'",
        fieldDescription: "Detailed product description",
      },
      {
        name: "costPrice",
        type: "number",
        required: false,
        group: "Pricing",
        tooltip: "e.g., 500, 1500.50, 5000",
        fieldDescription: "Cost per unit",
      },
      {
        name: "weight",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., 5, 10.5, 25",
        fieldDescription: "Weight in kilograms",
      },
      {
        name: "length",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., 50, 100, 200",
        fieldDescription: "Length in centimeters",
      },
      {
        name: "width",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., 40, 80, 150",
        fieldDescription: "Width in centimeters",
      },
      {
        name: "height",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., 30, 60, 120",
        fieldDescription: "Height in centimeters",
      },
      {
        name: "supplier",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'Supplier Inc', 'Wholesale Distributor'",
        fieldDescription: "The supplier of this product",
      },
      {
        name: "client",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'Client ABC', 'Customer XYZ'",
        fieldDescription: "The client this product belongs to or is for",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'active', 'inactive', 'discontinued'",
        fieldDescription: "Current status of the product",
        options: ["active", "inactive", "discontinued"],
      },
    ],
  },
  "warehouse-management/inbound-shipments": {
    schema: "warehouse-management",
    entity: "InboundShipment",
    enum: "WarehouseManagementInboundShipments",
    description: "Records inbound shipments from suppliers with tracking numbers, expected dates, and receipt status",
    fields: [
      {
        name: "client",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'Supplier Inc', 'Wholesale Distributor'",
        fieldDescription: "The supplier or source of this inbound shipment",
      },
      {
        name: "warehouse",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'Manila Warehouse', 'Cebu Center'",
        fieldDescription: "The warehouse receiving this shipment",
      },
      {
        name: "expectedArrivalDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., 01/15/2024, 02/01/2024",
        fieldDescription: "Expected arrival date",
      },
      {
        name: "actualArrivalDate",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., 01/14/2024, 02/02/2024",
        fieldDescription: "Actual arrival date when shipment was received",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'pending', 'in-transit', 'received'",
        fieldDescription: "Current status of the inbound shipment",
        options: ["pending", "in-transit", "received", "processing", "completed"],
      },
    ],
  },
  "warehouse-management/inbound-shipment-items": {
    schema: "warehouse-management",
    entity: "InboundShipmentItem",
    enum: "WarehouseManagementInboundShipmentItems",
    description:
      "Line items for inbound shipments tracking expected quantities, received quantities, and discrepancies",
    fields: [
      {
        name: "inboundShipment",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'IBS-2024-001', 'RECV-123'",
        fieldDescription: "The inbound shipment this item belongs to",
      },
      {
        name: "product",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "The product on this line",
      },
      {
        name: "expectedQuantity",
        type: "number",
        required: true,
        group: "Quantity",
        tooltip: "e.g., 50, 100, 500",
        fieldDescription: "Expected quantity to receive",
      },
      {
        name: "receivedQuantity",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., 48, 100, 495",
        fieldDescription: "Actual quantity received",
      },
      {
        name: "discrepancyNotes",
        type: "textarea",
        required: false,
        group: "Notes",
        tooltip: "e.g., '2 units damaged', '5 units missing'",
        fieldDescription: "Notes on any quantity discrepancies or damage",
      },
    ],
  },
  "warehouse-management/outbound-shipments": {
    schema: "warehouse-management",
    entity: "OutboundShipment",
    enum: "WarehouseManagementOutboundShipments",
    description: "Records outbound shipments to customers linked to sales orders with carrier tracking information",
    fields: [
      {
        name: "salesOrder",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'SO-2024-001', 'ORD-789'",
        fieldDescription: "The sales order this shipment fulfills",
      },
      {
        name: "warehouse",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'Manila Warehouse', 'Cebu Center'",
        fieldDescription: "The warehouse shipping this order",
      },
      {
        name: "carrier",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'DHL', 'FedEx'",
        fieldDescription: "The carrier handling this shipment",
      },
      {
        name: "trackingNumber",
        type: "text",
        required: true,
        group: "Tracking",
        tooltip: "e.g., '1234567890AB', 'TRK-2024-123'",
        fieldDescription: "Carrier's tracking number",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'pending', 'packing', 'shipped'",
        fieldDescription: "Current status of the outbound shipment",
        options: ["pending", "packing", "ready", "shipped", "delivered"],
      },
    ],
  },
  "warehouse-management/outbound-shipment-items": {
    schema: "warehouse-management",
    entity: "OutboundShipmentItem",
    enum: "WarehouseManagementOutboundShipmentItems",
    description: "Line items for outbound shipments tracking product, batch, and shipped quantities",
    fields: [
      {
        name: "outboundShipment",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'OBS-2024-001', 'SHIP-123'",
        fieldDescription: "The outbound shipment this item is part of",
      },
      {
        name: "salesOrderItem",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'SOI-001', 'LI-789'",
        fieldDescription: "The sales order line item being shipped",
      },
      {
        name: "product",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "The product being shipped",
      },
      {
        name: "batch",
        type: "text",
        required: false,
        group: "Batch",
        tooltip: "e.g., 'BATCH-2024-001', 'LOT123'",
        fieldDescription: "Batch or lot number",
      },
      {
        name: "quantityShipped",
        type: "number",
        required: true,
        group: "Quantity",
        tooltip: "e.g., 50, 100, 500",
        fieldDescription: "Quantity shipped on this line",
      },
    ],
  },
  "warehouse-management/packages": {
    schema: "warehouse-management",
    entity: "Package",
    enum: "WarehouseManagementPackages",
    description:
      "Represents physical packages prepared for shipment with dimensions, weight, handling requirements, and insurance",
    fields: [
      {
        name: "packageNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'PKG-2024-001', 'PACK-789'",
        fieldDescription: "Unique package identifier",
      },
      {
        name: "salesOrder",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'SO-2024-001', 'ORD-789'",
        fieldDescription: "The sales order this package fulfills",
      },
      {
        name: "warehouse",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'Manila Warehouse', 'Cebu Center'",
        fieldDescription: "The warehouse preparing this package",
      },
      {
        name: "type",
        type: "text",
        required: false,
        group: "Classification",
        tooltip: "e.g., 'Box', 'Envelope', 'Pallet'",
        fieldDescription: "The type of packaging used",
      },
      {
        name: "weight",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., 2.5, 5, 10",
        fieldDescription: "Package weight in kilograms",
      },
      {
        name: "length",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., 30, 60, 100",
        fieldDescription: "Package length in centimeters",
      },
      {
        name: "width",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., 20, 40, 80",
        fieldDescription: "Package width in centimeters",
      },
      {
        name: "height",
        type: "number",
        required: false,
        group: "Dimensions",
        tooltip: "e.g., 15, 30, 60",
        fieldDescription: "Package height in centimeters",
      },
      {
        name: "isFragile",
        type: "text",
        required: false,
        group: "Handling",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether package contains fragile items",
      },
      {
        name: "isHazmat",
        type: "text",
        required: false,
        group: "Handling",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether package contains hazardous materials",
      },
      {
        name: "requireSignature",
        type: "text",
        required: false,
        group: "Delivery",
        tooltip: "e.g., 'yes', 'no', 'true', 'false'",
        fieldDescription: "Whether signature is required upon delivery",
      },
      {
        name: "insuranceValue",
        type: "number",
        required: false,
        group: "Insurance",
        tooltip: "e.g., 1000, 5000, 10000",
        fieldDescription: "Insurance value of the package",
      },
      {
        name: "packedAt",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., 01/15/2024, 02/01/2024",
        fieldDescription: "Date when package was packed",
      },
      {
        name: "shippedAt",
        type: "date",
        required: false,
        group: "Dates",
        tooltip: "e.g., 01/15/2024, 02/01/2024",
        fieldDescription: "Date when package was shipped",
      },
    ],
  },
  "warehouse-management/package-items": {
    schema: "warehouse-management",
    entity: "PackageItem",
    enum: "WarehouseManagementPackageItems",
    description: "Individual items within packages tracking product, batch, quantity, and expiry dates",
    fields: [
      {
        name: "package",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'PKG-001', 'PACK-789'",
        fieldDescription: "The package this item is in",
      },
      {
        name: "product",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "The product in this package item",
      },
      {
        name: "batch",
        type: "text",
        required: false,
        group: "Batch",
        tooltip: "e.g., 'BATCH-2024-001', 'LOT123'",
        fieldDescription: "Batch or lot number",
      },
      {
        name: "quantity",
        type: "number",
        required: true,
        group: "Quantity",
        tooltip: "e.g., 1, 5, 10",
        fieldDescription: "Quantity of this product in the package",
      },
      {
        name: "lotNumber",
        type: "text",
        required: false,
        group: "Batch Details",
        tooltip: "e.g., 'LOT-2024-001', 'BATCH-789'",
        fieldDescription: "Lot number of the product",
      },
      {
        name: "expiryDate",
        type: "date",
        required: false,
        group: "Validity",
        tooltip: "e.g., 12/31/2024, 06/30/2025",
        fieldDescription: "Expiration date of the product",
      },
    ],
  },
  "warehouse-management/inventory-adjustment": {
    schema: "warehouse-management",
    entity: "InventoryAdjustment",
    enum: "WarehouseManagementInventoryAdjustment",
    description:
      "Logs inventory adjustments (damage, loss, count discrepancies, returns, transfers) with reasons and notes",
    fields: [
      {
        name: "warehouse",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'WH-001', 'Manila Warehouse'",
        fieldDescription: "The warehouse where adjustment occurred",
      },
      {
        name: "product",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "The product being adjusted",
      },
      {
        name: "batch",
        type: "text",
        required: false,
        group: "Batch",
        tooltip: "e.g., 'BATCH-2024-001', 'LOT123'",
        fieldDescription: "Batch or lot number affected",
      },
      {
        name: "quantity",
        type: "number",
        required: true,
        group: "Adjustment",
        tooltip: "e.g., -5 (loss), 10 (gain), 2 (correction)",
        fieldDescription: "Quantity adjusted (positive or negative)",
      },
      {
        name: "reason",
        type: "select",
        required: true,
        group: "Adjustment",
        tooltip: "e.g., 'damage', 'loss', 'count-discrepancy', 'return'",
        fieldDescription: "Reason for the adjustment",
      },
      {
        name: "adjustmentDate",
        type: "date",
        required: true,
        group: "Dates",
        tooltip: "e.g., 01/15/2024, 02/01/2024",
        fieldDescription: "Date of the adjustment",
      },
      {
        name: "adjustedBy",
        type: "text",
        required: false,
        group: "Audit",
        tooltip: "e.g., 'USR-001', 'John Doe'",
        fieldDescription: "User who made the adjustment",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Water damage during storage', 'Found during cycle count'",
        fieldDescription: "Additional notes about the adjustment",
      },
    ],
  },
  "warehouse-management/inventory-batches": {
    schema: "warehouse-management",
    entity: "InventoryBatch",
    enum: "WarehouseManagementInventoryBatches",
    description: "Tracks product batches with batch numbers and expiration dates for FIFO inventory management",
    fields: [
      {
        name: "product",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "The product this batch belongs to",
      },
      {
        name: "batchNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'BATCH-2024-001', 'LOT-789'",
        fieldDescription: "Unique batch identifier for this product lot",
      },
      {
        name: "expirationDate",
        type: "date",
        required: false,
        group: "Validity",
        tooltip: "e.g., 12/31/2024, 06/30/2025",
        fieldDescription: "Expiration date of this batch",
      },
      {
        name: "quantity",
        type: "number",
        required: true,
        group: "Quantity",
        tooltip: "e.g., 100, 500, 1000",
        fieldDescription: "Total quantity in this batch",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Defect from supplier', 'Quality issue noted'",
        fieldDescription: "Additional notes about the batch",
      },
    ],
  },
  "warehouse-management/tasks": {
    schema: "warehouse-management",
    entity: "Task",
    enum: "WarehouseManagementTasks",
    description: "Manages warehouse tasks (picking, putaway, packing, restocking, counting) with assignment and timing",
    fields: [
      {
        name: "warehouse",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'WH-001', 'Manila Warehouse'",
        fieldDescription: "The warehouse for this task",
      },
      {
        name: "taskNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'TASK-2024-001', 'PK-789'",
        fieldDescription: "Unique task identifier",
      },
      {
        name: "type",
        type: "select",
        required: false,
        group: "Type",
        tooltip: "e.g., 'pick', 'putaway', 'packing', 'restock'",
        fieldDescription: "Type of warehouse task to perform",
        options: ["pick", "putaway", "packing", "restock", "count", "transfer"],
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'pending', 'in-progress', 'completed'",
        fieldDescription: "Current status of the task",
        options: ["pending", "assigned", "in-progress", "completed", "cancelled"],
      },
      {
        name: "priority",
        type: "number",
        required: true,
        group: "Priority",
        tooltip: "e.g., 1 (highest), 2, 3",
        fieldDescription: "Priority level for this task",
      },
      {
        name: "user",
        type: "text",
        required: false,
        group: "User",
        tooltip: "e.g., 'WRK-001', 'Juan Dela Cruz'",
        fieldDescription: "User assigned to this task",
      },
      {
        name: "startTime",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., 01/15/2024 08:30 AM",
        fieldDescription: "When task was started",
      },
      {
        name: "endTime",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., 01/15/2024 02:30 PM",
        fieldDescription: "When task was completed",
      },
      {
        name: "instructions",
        type: "textarea",
        required: false,
        group: "Instructions",
        tooltip: "e.g., 'Pick items in FIFO order', 'Use zone 5 bins first'",
        fieldDescription: "Detailed instructions for completing the task",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Notes",
        tooltip: "e.g., 'Item out of stock', 'Bin damaged'",
        fieldDescription: "Additional notes about the task",
      },
    ],
  },
  "warehouse-management/task-items": {
    schema: "warehouse-management",
    entity: "TaskItem",
    enum: "WarehouseManagementTaskItems",
    description:
      "Individual items within warehouse tasks tracking product, locations, quantities, and completion status",
    fields: [
      {
        name: "task",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'TASK-2024-001', 'PK-789'",
        fieldDescription: "The parent task for this item",
      },
      {
        name: "product",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "The product in this task item",
      },
      {
        name: "sourceLocation",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., 'LOC-A-01-01', 'BIN-005'",
        fieldDescription: "Where to pick the item from",
      },
      {
        name: "destinationLocation",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., 'LOC-B-02-03', 'STAGE-01'",
        fieldDescription: "Where to move the item to",
      },
      {
        name: "batch",
        type: "text",
        required: false,
        group: "Batch",
        tooltip: "e.g., 'BATCH-2024-001', 'LOT123'",
        fieldDescription: "Batch or lot number of the item",
      },
      {
        name: "quantityRequired",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., 5, 10, 25",
        fieldDescription: "Quantity needed for this item",
      },
      {
        name: "quantityCompleted",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., 5, 8, 10",
        fieldDescription: "Quantity actually completed",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "Task item status",
        options: ["pending", "in-progress", "completed", "failed"],
      },
      {
        name: "completedAt",
        type: "datetime",
        required: false,
        group: "Completion",
        tooltip: "When this item was completed",
      },
      { name: "notes", type: "textarea", required: false, group: "Notes", tooltip: "Notes on this task item" },
    ],
  },
  "warehouse-management/pick-batches": {
    schema: "warehouse-management",
    entity: "PickBatch",
    enum: "WarehouseManagementPickBatches",
    description:
      "Groups orders into picking batches with strategy (zone, batch, wave, cluster) and performance metrics",
    fields: [
      {
        name: "warehouse",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'WH-001', 'Manila Warehouse'",
        fieldDescription: "The warehouse where this batch will be picked",
      },
      {
        name: "batchNumber",
        type: "text",
        required: false,
        group: "Identification",
        tooltip: "e.g., 'PB-2024-001', 'PICK-789'",
        fieldDescription: "Unique identifier for this pick batch",
      },
      {
        name: "priority",
        type: "number",
        required: true,
        group: "Priority",
        tooltip: "e.g., 1 (highest), 2, 3",
        fieldDescription: "Priority level for processing",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'pending', 'in-progress', 'completed'",
        fieldDescription: "Current status of the batch",
        options: ["pending", "assigned", "in-progress", "completed", "cancelled"],
      },
      {
        name: "strategy",
        type: "select",
        required: false,
        group: "Strategy",
        tooltip: "e.g., 'zone', 'batch', 'wave', 'cluster'",
        fieldDescription: "Picking strategy used for this batch",
        options: ["zone", "batch", "wave", "cluster"],
      },
      {
        name: "assignedUser",
        type: "text",
        required: false,
        group: "Assignment",
        tooltip: "e.g., 'WRK-001', 'Juan Dela Cruz'",
        fieldDescription: "Worker assigned to pick this batch",
      },
      {
        name: "totalItems",
        type: "number",
        required: false,
        group: "Items",
        tooltip: "e.g., 10, 25, 50",
        fieldDescription: "Total line items to pick",
      },
      {
        name: "completedItems",
        type: "number",
        required: false,
        group: "Items",
        tooltip: "e.g., 5, 25, 50",
        fieldDescription: "Number of items already picked",
      },
      {
        name: "estimatedDuration",
        type: "number",
        required: false,
        group: "Duration",
        tooltip: "e.g., 15, 30, 60",
        fieldDescription: "Estimated picking time in minutes",
      },
      {
        name: "actualDuration",
        type: "number",
        required: false,
        group: "Duration",
        tooltip: "e.g., 20, 45, 75",
        fieldDescription: "Actual time taken in minutes",
      },
      {
        name: "startedAt",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., 01/15/2024 08:30 AM",
        fieldDescription: "When picking started",
      },
      {
        name: "completedAt",
        type: "datetime",
        required: false,
        group: "Timing",
        tooltip: "e.g., 01/15/2024 09:30 AM",
        fieldDescription: "When picking was completed",
      },
    ],
  },
  "warehouse-management/pick-batch-items": {
    schema: "warehouse-management",
    entity: "PickBatchItem",
    enum: "WarehouseManagementPickBatchItems",
    description: "Links sales orders to pick batches tracking pick priority and time performance data",
    fields: [
      {
        name: "pickBatch",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'PB-2024-001', 'PICK-789'",
        fieldDescription: "The pick batch this item belongs to",
      },
      {
        name: "salesOrder",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'SO-2024-001', 'ORD-789'",
        fieldDescription: "The sales order to pick",
      },
      {
        name: "orderPriority",
        type: "number",
        required: false,
        group: "Priority",
        tooltip: "e.g., 1, 2, 3",
        fieldDescription: "Picking priority within this batch",
      },
      { name: "estimatedPickTime", type: "datetime", required: false, group: "Timing", tooltip: "Estimated pick time" },
      {
        name: "actualPickTime",
        type: "number",
        required: false,
        group: "Timing",
        tooltip: "Actual pick time in seconds",
      },
    ],
  },
  "warehouse-management/putaway-rules": {
    schema: "warehouse-management",
    entity: "PutawayRule",
    enum: "WarehouseManagementPutawayRules",
    description:
      "Defines location strategies for putaway operations based on product, client, and threshold requirements",
    fields: [
      {
        name: "warehouse",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'WH-001', 'Manila Warehouse'",
        fieldDescription: "The warehouse this rule applies to",
      },
      {
        name: "product",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "Product for which this rule applies",
      },
      {
        name: "client",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'CLI-001', 'ABC Company'",
        fieldDescription: "Specific client this rule applies to (optional)",
      },
      {
        name: "locationType",
        type: "select",
        required: true,
        group: "Location Type",
        tooltip: "e.g., 'zone', 'aisle', 'rack', 'bin'",
        fieldDescription: "Type of location to use for putaway",
        options: ["zone", "aisle", "rack", "shelf", "bin", "bulk"],
      },
      {
        name: "preferredLocation",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., 'LOC-A-01-01', 'BIN-005'",
        fieldDescription: "Preferred location code for putaway",
      },
      {
        name: "priority",
        type: "number",
        required: true,
        group: "Priority",
        tooltip: "e.g., 1 (highest), 2, 3",
        fieldDescription: "Priority level for this rule",
      },
      {
        name: "minQuantity",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., 10, 50, 100",
        fieldDescription: "Minimum quantity threshold for this rule",
      },
      {
        name: "maxQuantity",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "Maximum quantity for this rule",
      },
      {
        name: "weightThreshold",
        type: "number",
        required: false,
        group: "Thresholds",
        tooltip: "Weight threshold in kg",
      },
      {
        name: "volumeThreshold",
        type: "number",
        required: false,
        group: "Thresholds",
        tooltip: "Volume threshold in cubic meters",
      },
      {
        name: "requireTemperatureControl",
        type: "text",
        required: false,
        group: "Requirements",
        tooltip: "Whether temperature control is required",
      },
      {
        name: "requireHazmatApproval",
        type: "text",
        required: false,
        group: "Requirements",
        tooltip: "Whether hazmat approval is required",
      },
      { name: "isActive", type: "text", required: false, group: "Status", tooltip: "Whether this rule is active" },
    ],
  },
  "warehouse-management/reorder-points": {
    schema: "warehouse-management",
    entity: "ReorderPoint",
    enum: "WarehouseManagementReorderPoints",
    description: "Sets minimum quantity thresholds for products in each warehouse to trigger automatic reordering",
    fields: [
      {
        name: "warehouse",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'WH-001', 'Manila Warehouse'",
        fieldDescription: "The warehouse for this reorder point",
      },
      {
        name: "product",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "The product to monitor",
      },
      {
        name: "threshold",
        type: "number",
        required: false,
        group: "Threshold",
        tooltip: "e.g., 50, 100, 200",
        fieldDescription: "Minimum quantity that triggers reordering",
      },
    ],
  },
  "warehouse-management/suppliers": {
    schema: "warehouse-management",
    entity: "Supplier",
    enum: "WarehouseManagementSuppliers",
    description:
      "Records supplier information including contact details and optional client associations for procurement",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'ABC Supplier Corp', 'XYZ Trading'",
        fieldDescription: "Supplier company name",
      },
      {
        name: "contactPerson",
        type: "text",
        required: false,
        group: "Contact",
        tooltip: "e.g., 'John Smith', 'Maria Garcia'",
        fieldDescription: "Name of main contact person",
      },
      {
        name: "email",
        type: "email",
        required: false,
        group: "Contact",
        tooltip: "e.g., 'contact@supplier.com'",
        fieldDescription: "Email address for communication",
      },
      {
        name: "phoneNumber",
        type: "text",
        required: false,
        group: "Contact",
        tooltip: "e.g., '+63 2 1234 5678'",
        fieldDescription: "Phone number for contact",
      },
      {
        name: "client",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'CLI-001', 'ABC Company'",
        fieldDescription: "Associated client (optional)",
      },
    ],
  },
  "warehouse-management/sales-orders": {
    schema: "warehouse-management",
    entity: "SalesOrder",
    enum: "WarehouseManagementSalesOrders",
    description: "Records customer sales orders with status tracking from pending through delivery",
    fields: [
      {
        name: "client",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'CLI-001', 'ABC Company'",
        fieldDescription: "The customer placing the order",
      },
      {
        name: "orderNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'SO-2024-001', 'ORD-789'",
        fieldDescription: "Unique sales order number",
      },
      {
        name: "opportunity",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'OPP-001', 'Deal-123'",
        fieldDescription: "Related sales opportunity",
      },
      {
        name: "shippingAddress",
        type: "text",
        required: false,
        group: "Address",
        tooltip: "e.g., '123 Main St, Manila, PH'",
        fieldDescription: "Delivery address for this order",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'pending', 'processing', 'shipped'",
        fieldDescription: "Current status of the order",
        options: ["pending", "processing", "ready", "shipped", "delivered", "cancelled"],
      },
    ],
  },
  "warehouse-management/sales-order-items": {
    schema: "warehouse-management",
    entity: "SalesOrderItem",
    enum: "WarehouseManagementSalesOrderItems",
    description: "Line items for sales orders tracking product, quantity, and fulfillment details",
    fields: [
      {
        name: "salesOrder",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'SO-2024-001', 'ORD-789'",
        fieldDescription: "The sales order this item belongs to",
      },
      {
        name: "product",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "The product ordered",
      },
      {
        name: "quantityOrdered",
        type: "number",
        required: true,
        group: "Quantity",
        tooltip: "e.g., 5, 10, 100",
        fieldDescription: "Quantity of this product ordered",
      },
    ],
  },
  "warehouse-management/returns": {
    schema: "warehouse-management",
    entity: "Return",
    enum: "WarehouseManagementReturns",
    description: "Tracks product returns from customers with reason, status, and approval workflow",
    fields: [
      {
        name: "returnNumber",
        type: "text",
        required: true,
        group: "Identification",
        tooltip: "e.g., 'RET-2024-001', 'RTN-789'",
        fieldDescription: "Unique return number",
      },
      {
        name: "salesOrder",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'SO-2024-001', 'ORD-789'",
        fieldDescription: "Original sales order being returned",
      },
      {
        name: "client",
        type: "text",
        required: false,
        group: "Reference",
        tooltip: "e.g., 'CLI-001', 'ABC Company'",
        fieldDescription: "Customer initiating the return",
      },
      {
        name: "reason",
        type: "textarea",
        required: false,
        group: "Reason",
        tooltip: "e.g., 'Defective', 'Wrong item sent', 'Not as described'",
        fieldDescription: "Reason for the return",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'initiated', 'received', 'approved'",
        fieldDescription: "Current status of the return",
        options: ["initiated", "received", "inspecting", "approved", "rejected", "processed"],
      },
    ],
  },
  "warehouse-management/return-items": {
    schema: "warehouse-management",
    entity: "ReturnItem",
    enum: "WarehouseManagementReturnItems",
    description: "Line items for returns tracking product, quantities, and condition assessment data",
    fields: [
      {
        name: "return",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'RET-2024-001', 'RTN-789'",
        fieldDescription: "The return this item belongs to",
      },
      {
        name: "product",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "The product being returned",
      },
      {
        name: "quantityExpected",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., 5, 10, 50",
        fieldDescription: "Expected quantity of returned items",
      },
      {
        name: "quantityRecevied",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., 5, 8, 10",
        fieldDescription: "Actual quantity received",
      },
      {
        name: "condition",
        type: "select",
        required: false,
        group: "Condition",
        tooltip: "e.g., 'new', 'used', 'damaged'",
        fieldDescription: "Condition of the returned item",
        options: ["new", "used", "damaged", "defective"],
      },
    ],
  },
  "warehouse-management/stock-transfer": {
    schema: "warehouse-management",
    entity: "StockTransfer",
    enum: "WarehouseManagementStockTransfer",
    description: "Manages inter-warehouse inventory transfers with product, quantity, and status tracking",
    fields: [
      {
        name: "sourceWarehouse",
        type: "text",
        required: true,
        group: "Source",
        tooltip: "e.g., 'WH-001', 'Manila Warehouse'",
        fieldDescription: "Warehouse sending the stock",
      },
      {
        name: "destinationWarehouse",
        type: "text",
        required: true,
        group: "Destination",
        tooltip: "e.g., 'WH-002', 'Cebu Distribution Center'",
        fieldDescription: "Warehouse receiving the stock",
      },
      {
        name: "product",
        type: "text",
        required: false,
        group: "Product",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "Product being transferred",
      },
      {
        name: "quantity",
        type: "number",
        required: false,
        group: "Quantity",
        tooltip: "e.g., 10, 50, 100",
        fieldDescription: "Quantity to transfer",
      },
      {
        name: "status",
        type: "select",
        required: false,
        group: "Status",
        tooltip: "e.g., 'pending', 'in-transit', 'received'",
        fieldDescription: "Current status of the transfer",
        options: ["pending", "in-transit", "received", "cancelled"],
      },
    ],
  },

  // ============= ADDITIONAL DELIVERY MANAGEMENT =============
  "delivery-management/driver-locations": {
    schema: "delivery-management",
    entity: "DriverLocation",
    enum: "DeliveryManagementDriverLocation",
    description: "Tracks real-time GPS coordinates of drivers including heading, speed, accuracy, and timestamp",
    fields: [
      {
        name: "driver",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'DRV-001', 'Juan Dela Cruz'",
        fieldDescription: "The driver being tracked",
      },
      {
        name: "coordinates",
        type: "text",
        required: true,
        group: "Location",
        tooltip: "e.g., '14.5995, 120.9842'",
        fieldDescription: "Current GPS coordinates (latitude, longitude)",
      },
      {
        name: "heading",
        type: "text",
        required: false,
        group: "Movement",
        tooltip: "e.g., '120' (degrees), 'NE'",
        fieldDescription: "Direction of driver movement",
      },
      {
        name: "speed",
        type: "number",
        required: false,
        group: "Movement",
        tooltip: "e.g., 30, 60, 80",
        fieldDescription: "Current speed in km/h",
      },
      {
        name: "accuracy",
        type: "number",
        required: false,
        group: "Accuracy",
        tooltip: "e.g., 5, 10, 20",
        fieldDescription: "GPS accuracy in meters",
      },
      {
        name: "timestamp",
        type: "datetime",
        required: false,
        group: "Timestamp",
        tooltip: "e.g., 01/15/2024 08:30 AM",
        fieldDescription: "Time when location was recorded",
      },
    ],
  },
  "delivery-management/task-events": {
    schema: "delivery-management",
    entity: "TaskEvent",
    enum: "DeliveryManagementTaskEvents",
    description: "Records task status changes, timestamps, GPS coordinates, and notes for delivery event tracking",
    fields: [
      {
        name: "task",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'TASK-2024-001', 'DEL-789'",
        fieldDescription: "The delivery task this event belongs to",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "e.g., 'out-for-delivery', 'delivered', 'failed'",
        fieldDescription: "New task status for this event",
        options: ["pending", "assigned", "out-for-delivery", "delivered", "failed", "cancelled"],
      },
      {
        name: "timestamp",
        type: "datetime",
        required: true,
        group: "Timestamp",
        tooltip: "e.g., 01/15/2024 02:30 PM",
        fieldDescription: "When the event occurred",
      },
      {
        name: "coordinates",
        type: "text",
        required: false,
        group: "Location",
        tooltip: "e.g., '14.5995, 120.9842'",
        fieldDescription: "GPS coordinates where event occurred",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Notes",
        tooltip: "e.g., 'Customer not home', 'Door locked'",
        fieldDescription: "Additional event details or notes",
      },
      {
        name: "reason",
        type: "text",
        required: false,
        group: "Reason",
        tooltip: "e.g., 'Customer request', 'Address incorrect'",
        fieldDescription: "Reason for status change (if applicable)",
      },
    ],
  },

  // ============= OTHER =============
  "users/notifications": {
    schema: "users",
    entity: "Notification",
    enum: "Notifications",
    description: "System notifications sent to users with message content, action links, and read status tracking",
    fields: [
      {
        name: "user",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'USR-001', 'John Doe'",
        fieldDescription: "User receiving this notification",
      },
      {
        name: "message",
        type: "textarea",
        required: true,
        group: "Message",
        tooltip: "e.g., 'Order #123 has been shipped'",
        fieldDescription: "Content of the notification message",
      },
      {
        name: "link",
        type: "text",
        required: false,
        group: "Action",
        tooltip: "e.g., '/orders/123', '/dashboard'",
        fieldDescription: "URL link for notification action",
      },
      {
        name: "isRead",
        type: "text",
        required: false,
        group: "Status",
        tooltip: "e.g., true, false",
        fieldDescription: "Whether the notification has been read",
      },
    ],
  },

  // ============= CUSTOMER RELATIONS (already have most, adding remaining) =============
  leads: {
    schema: "customer-relations",
    entity: "Lead",
    enum: "CustomerRelationsLeads",
    description: "Tracks sales leads including scoring, source, status, and assignment to sales representatives",
    fields: [
      {
        name: "name",
        type: "text",
        required: false,
        group: "Basic Information",
        tooltip: "e.g., 'John Doe', 'ABC Company'",
        fieldDescription: "The name of the sales lead",
      },
      {
        name: "email",
        type: "email",
        required: false,
        group: "Basic Information",
        tooltip: "e.g., 'john@company.com', 'contact@business.com'",
        fieldDescription: "Email address of the lead contact",
      },
      {
        name: "score",
        type: "number",
        required: true,
        group: "Lead Details",
        tooltip: "e.g., 25, 50, 75",
        fieldDescription: "Lead scoring value between 0-100",
      },
      {
        name: "source",
        type: "select",
        required: true,
        group: "Lead Details",
        tooltip: "e.g., 'website', 'referral', 'social-media'",
        fieldDescription: "Where this lead originated from",
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
        tooltip: "e.g., 'new', 'contacted', 'qualified'",
        fieldDescription: "Current status in the sales pipeline",
        options: ["new", "contacted", "qualified", "unqualified", "converted"],
      },
      {
        name: "campaign",
        type: "text",
        required: false,
        group: "Relationships",
        tooltip: "e.g., 'CAM-2024-001', 'Summer Sale'",
        fieldDescription: "Associated marketing campaign",
      },
      {
        name: "owner",
        type: "text",
        required: true,
        group: "Assignment",
        tooltip: "e.g., 'John Sales', 'sales-rep@company.com'",
        fieldDescription: "Sales representative assigned to this lead",
      },
    ],
  },
  contacts: {
    schema: "customer-relations",
    entity: "Contact",
    enum: "CustomerRelationsContacts",
    description: "Stores customer contact information including name, email, phone, job title, and company association",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'John Doe', 'Jane Smith'",
        fieldDescription: "Full name of the contact",
      },
      {
        name: "email",
        type: "email",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'john@company.com', 'jane@business.com'",
        fieldDescription: "Email address",
      },
      {
        name: "jobTitle",
        type: "text",
        required: false,
        group: "Basic Information",
        tooltip: "e.g., 'Sales Manager', 'Operations Director'",
        fieldDescription: "Job title or position",
      },
      {
        name: "phoneNumber",
        type: "text",
        required: false,
        group: "Basic Information",
        tooltip: "e.g., '+63 9123456789', '02-1234-5678'",
        fieldDescription: "Contact phone number",
      },
      {
        name: "company",
        type: "text",
        required: false,
        group: "Relationships",
        tooltip: "e.g., 'ABC Company', 'XYZ Corporation'",
        fieldDescription: "Associated company or organization",
      },
      {
        name: "owner",
        type: "text",
        required: true,
        group: "Assignment",
        tooltip: "e.g., 'John Account', 'account-mgr@company.com'",
        fieldDescription: "Account manager assigned to this contact",
      },
    ],
  },
  interactions: {
    schema: "customer-relations",
    entity: "Interaction",
    enum: "CustomerRelationsInteractions",
    description: "Logs customer interactions (calls, meetings, emails, texts) with notes, outcomes, and assignments",
    fields: [
      {
        name: "contact",
        type: "text",
        required: true,
        group: "Contact Information",
        tooltip: "e.g., 'John Doe', 'Jane Smith'",
        fieldDescription: "The contact involved in this interaction",
      },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Interaction Details",
        tooltip: "e.g., 'call', 'meeting', 'email'",
        fieldDescription: "Type of customer interaction",
        options: ["call", "meeting", "text", "email"],
      },
      {
        name: "interactionDate",
        type: "datetime",
        required: true,
        group: "Interaction Details",
        tooltip: "e.g., 01/15/2024 10:30 AM, 02/01/2024 14:45",
        fieldDescription: "Date and time when the interaction took place",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Interaction Details",
        tooltip: "e.g., 'Discussed pricing', 'Client interested in Q2 rollout'",
        fieldDescription: "Notes or summary of the interaction",
      },
      {
        name: "outcome",
        type: "text",
        required: false,
        group: "Interaction Details",
        tooltip: "e.g., 'Follow-up needed', 'Deal moved forward'",
        fieldDescription: "Outcome or result of the interaction",
      },
      {
        name: "case",
        type: "text",
        required: false,
        group: "Relationships",
        tooltip: "e.g., 'CASE-001', 'Support-123'",
        fieldDescription: "Related support case if applicable",
      },
      {
        name: "user",
        type: "text",
        required: true,
        group: "Assignment",
        tooltip: "e.g., 'John Interaction', 'user@company.com'",
        fieldDescription: "User who conducted this interaction",
      },
    ],
  },
  products: {
    schema: "customer-relations",
    entity: "Product",
    enum: "CustomerRelationsProducts",
    description: "Catalogs products and services offered to customers with SKU, pricing, type, and descriptions",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Premium Support', 'Software License'",
        fieldDescription: "Product or service name",
      },
      {
        name: "sku",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'PROD-001', 'SKU123456'",
        fieldDescription: "Stock keeping unit",
      },
      {
        name: "price",
        type: "number",
        required: true,
        group: "Pricing",
        tooltip: "e.g., 100, 500.50, 5000",
        fieldDescription: "Product price",
      },
      {
        name: "type",
        type: "select",
        required: true,
        group: "Classification",
        tooltip: "e.g., 'service', 'good', 'digital'",
        fieldDescription: "Type of product offering",
        options: ["service", "good", "digital", "subscription"],
      },
      {
        name: "description",
        type: "textarea",
        required: false,
        group: "Details",
        tooltip: "e.g., 'Includes 24/7 support and training'",
        fieldDescription: "Detailed product description",
      },
    ],
  },
  campaigns: {
    schema: "customer-relations",
    entity: "Campaign",
    enum: "CustomerRelationsCampaigns",
    description: "Plans and tracks marketing campaigns with budget allocation and timeline management",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Summer Sale 2024', 'Q2 Marketing Push'",
        fieldDescription: "Campaign name or title",
      },
      {
        name: "budget",
        type: "number",
        required: true,
        group: "Budget",
        tooltip: "e.g., 5000, 25000, 100000",
        fieldDescription: "Total budget allocated for this campaign",
      },
      {
        name: "startDate",
        type: "date",
        required: true,
        group: "Timeline",
        tooltip: "e.g., 01/01/2024, 04/01/2024",
        fieldDescription: "Campaign start date",
      },
      {
        name: "endDate",
        type: "date",
        required: false,
        group: "Timeline",
        tooltip: "e.g., 01/31/2024, 06/30/2024",
        fieldDescription: "Campaign end date",
      },
    ],
  },
  opportunities: {
    schema: "customer-relations",
    entity: "Opportunity",
    enum: "CustomerRelationsOpportunities",
    description:
      "Tracks sales opportunities through deal pipeline stages with value, probability, and close date estimates",
    fields: [
      {
        name: "name",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'Enterprise License Deal', 'Integration Project'",
        fieldDescription: "Opportunity or deal name",
      },
      {
        name: "company",
        type: "text",
        required: true,
        group: "Basic Information",
        tooltip: "e.g., 'ABC Company', 'XYZ Corporation'",
        fieldDescription: "Company associated with this opportunity",
      },
      {
        name: "contact",
        type: "text",
        required: false,
        group: "Relationships",
        tooltip: "e.g., 'John Doe', 'Jane Smith'",
        fieldDescription: "Primary contact for this opportunity",
      },
      {
        name: "dealValue",
        type: "number",
        required: true,
        group: "Deal Details",
        tooltip: "e.g., 50000, 250000, 1000000",
        fieldDescription: "Expected deal value or revenue",
      },
      {
        name: "stage",
        type: "select",
        required: true,
        group: "Deal Details",
        tooltip: "e.g., 'prospecting', 'qualification', 'proposal'",
        fieldDescription: "Current stage in the sales pipeline",
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
        group: "Deal Details",
        tooltip: "e.g., 25, 50, 75",
        fieldDescription: "Probability of closing between 0-100%",
      },
      {
        name: "source",
        type: "select",
        required: true,
        group: "Deal Details",
        tooltip: "e.g., 'referral', 'existing-customer', 'event'",
        fieldDescription: "Source of this sales opportunity",
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
        tooltip: "e.g., 02/28/2024, 03/31/2024",
        fieldDescription: "Expected close date for this deal",
      },
      {
        name: "campaign",
        type: "text",
        required: false,
        group: "Relationships",
        tooltip: "e.g., 'CAM-2024-001', 'Summer Campaign'",
        fieldDescription: "Related marketing campaign if applicable",
      },
      {
        name: "owner",
        type: "text",
        required: true,
        group: "Assignment",
        tooltip: "e.g., 'John Sales Exec', 'sales-exec@company.com'",
        fieldDescription: "Account executive managing this opportunity",
      },
    ],
  },
  invoices: {
    schema: "customer-relations",
    entity: "Invoice",
    enum: "CustomerRelationsInvoices",
    description: "Records customer invoices with status tracking, payment terms, discounts, taxes, and notes",
    fields: [
      {
        name: "opportunity",
        type: "text",
        required: false,
        group: "Relationships",
        tooltip: "e.g., 'OPP-001', 'Enterprise Deal'",
        fieldDescription: "Related sales opportunity",
      },
      {
        name: "issueDate",
        type: "date",
        required: true,
        group: "Timeline",
        tooltip: "e.g., 01/15/2024, 02/01/2024",
        fieldDescription: "Date when invoice was issued",
      },
      {
        name: "dueDate",
        type: "date",
        required: false,
        group: "Timeline",
        tooltip: "e.g., 02/15/2024, 03/01/2024",
        fieldDescription: "Payment due date",
      },
      {
        name: "status",
        type: "select",
        required: true,
        group: "Status",
        tooltip: "e.g., 'draft', 'sent', 'paid'",
        fieldDescription: "Current status of the invoice",
        options: ["draft", "sent", "viewed", "paid", "partial-paid", "past-due", "disputed", "cancelled", "void"],
      },
      {
        name: "currency",
        type: "text",
        required: false,
        group: "Financial",
        tooltip: "e.g., 'USD', 'EUR', 'PHP'",
        fieldDescription: "Currency code for the invoice",
      },
      {
        name: "subtotal",
        type: "number",
        required: false,
        group: "Financial",
        tooltip: "e.g., 1000, 5500.50, 25000",
        fieldDescription: "Subtotal before tax or discount",
      },
      {
        name: "discountAmount",
        type: "number",
        required: false,
        group: "Financial",
        tooltip: "e.g., 100, 500, 2500",
        fieldDescription: "Total discount amount",
      },
      {
        name: "totalAmount",
        type: "number",
        required: false,
        group: "Financial",
        tooltip: "e.g., 1100, 6000, 28000",
        fieldDescription: "Total amount due",
      },
      {
        name: "notes",
        type: "textarea",
        required: false,
        group: "Additional Information",
        tooltip: "e.g., 'Thank you for your business'",
        fieldDescription: "Additional invoice notes or messages",
      },
      {
        name: "paymentTerms",
        type: "textarea",
        required: false,
        group: "Additional Information",
        tooltip: "e.g., 'Net 30', '50% upfront, 50% on delivery'",
        fieldDescription: "Payment terms and conditions",
      },
    ],
  },
  "invoice-items": {
    schema: "customer-relations",
    entity: "InvoiceItem",
    enum: "CustomerRelationsInvoiceItems",
    description:
      "Line items for invoices tracking service/product description, quantity, pricing, discounts, and taxes",
    fields: [
      {
        name: "invoice",
        type: "text",
        required: true,
        group: "Reference",
        tooltip: "e.g., 'INV-2024-001', 'BL-789'",
        fieldDescription: "The invoice this line item belongs to",
      },
      {
        name: "description",
        type: "textarea",
        required: true,
        group: "Item Details",
        tooltip: "e.g., 'Professional Services - 40 hours', 'Software License - Annual'",
        fieldDescription: "Description of the service or product",
      },
      {
        name: "quantity",
        type: "number",
        required: true,
        group: "Item Details",
        tooltip: "e.g., 1, 5, 10, 40",
        fieldDescription: "Quantity of the item or service units",
      },
      {
        name: "unitPrice",
        type: "number",
        required: true,
        group: "Pricing",
        tooltip: "e.g., 25.50, 100, 1500",
        fieldDescription: "Price per unit",
      },
      {
        name: "discountRate",
        type: "number",
        required: false,
        group: "Discounts & Tax",
        tooltip: "e.g., 5, 10, 15",
        fieldDescription: "Discount percentage applied to this line",
      },
      {
        name: "discountAmount",
        type: "number",
        required: false,
        group: "Discounts & Tax",
        tooltip: "e.g., 25, 100, 500",
        fieldDescription: "Discount amount deducted from this line",
      },
      {
        name: "taxRate",
        type: "number",
        required: false,
        group: "Discounts & Tax",
        tooltip: "e.g., 5, 10, 12",
        fieldDescription: "Tax percentage applied to this line",
      },
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

// Helper: Generate default tooltip if not provided
function getFieldTooltip(field) {
  if (field.tooltip) {
    return field.tooltip;
  }

  // Auto-generate contextual tooltip based on field name and type
  const fieldNameReadable = camelToTitleCase(field.name);
  const fieldGroup = field.group || "";

  if (field.type === "select") {
    return `Select the ${fieldNameReadable.toLowerCase()} for this ${fieldGroup.toLowerCase()}`;
  } else if (field.type === "date" || field.type === "datetime") {
    return `Select the ${fieldNameReadable.toLowerCase()} for this ${fieldGroup.toLowerCase()}`;
  } else if (field.type === "number") {
    return `Enter the ${fieldNameReadable.toLowerCase()} (numeric value)`;
  } else if (field.type === "email") {
    return `Enter a valid email address`;
  } else if (field.type === "textarea") {
    return `Enter details about the ${fieldNameReadable.toLowerCase()}`;
  } else {
    return `Enter the ${fieldNameReadable.toLowerCase()}`;
  }
}

// Helper: Generate field-level description based on type and group
function getFieldDescription(field) {
  const fieldNameReadable = camelToTitleCase(field.name);
  const fieldGroup = field.group || "Information";

  if (field.type === "select") {
    return `Choose a ${fieldNameReadable.toLowerCase()} value from the available options`;
  } else if (field.type === "date") {
    return `Select a date for ${fieldNameReadable.toLowerCase()}`;
  } else if (field.type === "datetime") {
    return `Select a date and time for ${fieldNameReadable.toLowerCase()}`;
  } else if (field.type === "number") {
    return `Enter a numeric value for ${fieldNameReadable.toLowerCase()}`;
  } else if (field.type === "email") {
    return `Enter a valid email address`;
  } else if (field.type === "textarea") {
    return `Enter detailed information about ${fieldNameReadable.toLowerCase()}`;
  } else {
    return `Enter the ${fieldNameReadable.toLowerCase()}`;
  }
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
  const tooltip = getFieldTooltip(field) ? `\n                  tooltip="${getFieldTooltip(field)}"` : "";
  const description = field.fieldDescription || getFieldDescription(field);
  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.TextField
                  label="${camelToTitleCase(field.name)}"
                  description="${description}"${tooltip}
                  placeholder=""${required}
                />
              )}
            </form.AppField>`;
}

// Generate EmailField code
function generateEmailField(field, isCreate = true) {
  const required = isCreate && field.required ? "\n                  required" : "";
  const tooltip = getFieldTooltip(field) ? `\n                  tooltip="${getFieldTooltip(field)}"` : "";
  const description = field.fieldDescription || getFieldDescription(field);
  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.EmailField
                  label="${camelToTitleCase(field.name)}"
                  description="${description}"${tooltip}
                  placeholder="example@email.com"${required}
                />
              )}
            </form.AppField>`;
}

// Generate NumberField code
function generateNumberField(field, isCreate = true) {
  const required = isCreate && field.required ? "\n                  required" : "";
  const tooltip = getFieldTooltip(field) ? `\n                  tooltip="${getFieldTooltip(field)}"` : "";
  const description = field.fieldDescription || getFieldDescription(field);
  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.NumberField
                  label="${camelToTitleCase(field.name)}"
                  description="${description}"${tooltip}
                  placeholder="0"
                  min={0}${required}
                />
              )}
            </form.AppField>`;
}

// Generate DateField code
function generateDateField(field, isCreate = true) {
  const required = isCreate && field.required ? "\n                  required" : "";
  const tooltip = getFieldTooltip(field) ? `\n                  tooltip="${getFieldTooltip(field)}"` : "";
  const description = field.fieldDescription || getFieldDescription(field);
  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.DateTimeField
                  label="${camelToTitleCase(field.name)}"
                  description="${description}"${tooltip}
                  placeholder=""${required}
                />
              )}
            </form.AppField>`;
}

// Generate DateTimeField code
function generateDateTimeField(field, isCreate = true) {
  const required = isCreate && field.required ? "\n                  required" : "";
  const tooltip = getFieldTooltip(field) ? `\n                  tooltip="${getFieldTooltip(field)}"` : "";
  const description = field.fieldDescription || getFieldDescription(field);
  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.DateTimeField
                  label="${camelToTitleCase(field.name)}"
                  description="${description}"${tooltip}
                  placeholder=""${required}
                />
              )}
            </form.AppField>`;
}

// Generate TextareaField code
function generateTextareaField(field, isCreate = true) {
  const required = isCreate && field.required ? "\n                  required" : "";
  const tooltip = getFieldTooltip(field) ? `\n                  tooltip="${getFieldTooltip(field)}"` : "";
  const description = field.fieldDescription || getFieldDescription(field);
  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.TextareaField
                  label="${camelToTitleCase(field.name)}"
                  description="${description}"${tooltip}
                  placeholder=""${required}
                />
              )}
            </form.AppField>`;
}

// Generate SelectField code
function generateSelectField(field, isCreate = true) {
  const required = isCreate && field.required ? "\n                  required" : "";
  const tooltip = getFieldTooltip(field) ? `\n                  tooltip="${getFieldTooltip(field)}"` : "";
  const description = field.fieldDescription || getFieldDescription(field);
  const options = (field.options || [])
    .map((opt) => `{ label: "${enumToLabel(opt)}", value: "${opt}" }`)
    .join(",\n                    ");

  return `            <form.AppField name="${field.name}">
              {(field) => (
                <field.SelectField
                  label="${camelToTitleCase(field.name)}"
                  description="${description}"${tooltip}
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

  // Replace the FormDialog description with the entity description
  if (config.description) {
    const descriptionRegex = /description="[^"]*"/;
    content = content.replace(descriptionRegex, `description="${config.description}"`);
  }

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

  // Replace the FormDialog description with the entity description
  if (config.description) {
    const descriptionRegex = /description="[^"]*"/;
    content = content.replace(descriptionRegex, `description="${config.description}"`);
  }

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
