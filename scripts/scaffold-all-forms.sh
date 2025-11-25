#!/bin/bash

# Script to scaffold forms for all entities in a schema

SCHEMA=$1

if [ -z "$SCHEMA" ]; then
  echo "Usage: $0 <schema-name>"
  echo "Example: $0 billing-management"
  exit 1
fi

# Define all entities for each schema
declare -a BILLING_ENTITIES=(
  "client-accounts:ClientAccount:BillingManagementClientAccounts"
  "rate-cards:RateCard:BillingManagementRateCards"
  "rate-rules:RateRule:BillingManagementRateRules"
  "surcharges:Surcharge:BillingManagementSurcharges"
  "account-transactions:AccountTransaction:BillingManagementAccountTransactions"
  "invoices:Invoice:BillingManagementInvoices"
  "invoice-line-items:InvoiceLineItem:BillingManagementInvoiceLineItems"
  "quotes:Quote:BillingManagementQuotes"
  "payments:Payment:BillingManagementPayments"
  "disputes:Dispute:BillingManagementDisputes"
  "credit-notes:CreditNote:BillingManagementCreditNotes"
)

declare -a TRANSPORT_ENTITIES=(
  "drivers:Driver:TransportManagementDrivers"
  "driver-schedules:DriverSchedule:TransportManagementDriverSchedules"
  "vehicles:Vehicle:TransportManagementVehicles"
  "vehicle-maintenance:VehicleMaintenance:TransportManagementVehicleMaintenance"
  "trips:Trip:TransportManagementTrips"
  "trip-stops:TripStop:TransportManagementTripStops"
  "carriers:Carrier:TransportManagementCarriers"
  "carrier-rates:CarrierRate:TransportManagementCarrierRates"
  "expenses:Expense:TransportManagementExpenses"
  "routes:Route:TransportManagementRoutes"
  "shipment-legs:ShipmentLeg:TransportManagementShipmentLegs"
  "shipment-leg-events:ShipmentLegEvent:TransportManagementShipmentLegEvents"
  "geofence:Geofence:TransportManagementGeofence"
  "geofence-events:GeofenceEvent:TransportManagementGeofenceEvents"
  "gps-pings:GpsPing:TransportManagementGpsPings"
  "partner-invoice:PartnerInvoice:TransportManagementPartnerInvoice"
  "partner-invoice-items:PartnerInvoiceItem:TransportManagementPartnerInvoiceItems"
  "proof-of-deliveries:ProofOfDelivery:TransportManagementProofOfDeliveries"
)

declare -a WAREHOUSE_ENTITIES=(
  "warehouses:Warehouse:WarehouseManagementWarehouses"
  "locations:Location:WarehouseManagementLocations"
  "inventory-stock:InventoryStock:WarehouseManagementInventoryStock"
  "bin-thresholds:BinThreshold:WarehouseManagementBinThreshold"
  "products:Product:WarehouseManagementProducts"
  "inbound-shipments:InboundShipment:WarehouseManagementInboundShipments"
  "inbound-shipment-items:InboundShipmentItem:WarehouseManagementInboundShipmentItems"
  "outbound-shipments:OutboundShipment:WarehouseManagementOutboundShipments"
  "outbound-shipment-items:OutboundShipmentItem:WarehouseManagementOutboundShipmentItems"
  "packages:Package:WarehouseManagementPackages"
  "package-items:PackageItem:WarehouseManagementPackageItems"
  "inventory-adjustment:InventoryAdjustment:WarehouseManagementInventoryAdjustment"
  "inventory-batches:InventoryBatch:WarehouseManagementInventoryBatches"
  "tasks:Task:WarehouseManagementTasks"
  "task-items:TaskItem:WarehouseManagementTaskItems"
  "pick-batches:PickBatch:WarehouseManagementPickBatches"
  "pick-batch-items:PickBatchItem:WarehouseManagementPickBatchItems"
  "putaway-rules:PutawayRule:WarehouseManagementPutawayRules"
  "reorder-points:ReorderPoint:WarehouseManagementReorderPoints"
  "suppliers:Supplier:WarehouseManagementSuppliers"
  "sales-orders:SalesOrder:WarehouseManagementSalesOrders"
  "sales-order-items:SalesOrderItem:WarehouseManagementSalesOrderItems"
  "returns:Return:WarehouseManagementReturns"
  "return-items:ReturnItem:WarehouseManagementReturnItems"
  "stock-transfer:StockTransfer:WarehouseManagementStockTransfer"
)

declare -a DELIVERY_ENTITIES=(
  "routes:Route:DeliveryManagementRoutes"
  "tasks:Task:DeliveryManagementTasks"
  "proof-of-deliveries:ProofOfDelivery:DeliveryManagementProofOfDeliveries"
  "driver-locations:DriverLocation:DeliveryManagementDriverLocation"
  "task-events:TaskEvent:DeliveryManagementTaskEvents"
)

# Select the appropriate array based on schema
case $SCHEMA in
  billing-management)
    ENTITIES=("${BILLING_ENTITIES[@]}")
    ;;
  transport-management)
    ENTITIES=("${TRANSPORT_ENTITIES[@]}")
    ;;
  warehouse-management)
    ENTITIES=("${WAREHOUSE_ENTITIES[@]}")
    ;;
  delivery-management)
    ENTITIES=("${DELIVERY_ENTITIES[@]}")
    ;;
  *)
    echo "Unknown schema: $SCHEMA"
    exit 1
    ;;
esac

echo "Scaffolding forms for $SCHEMA..."
echo ""

# Iterate through each entity
for entity_spec in "${ENTITIES[@]}"; do
  IFS=':' read -r collection entity enum <<< "$entity_spec"
  bash scripts/create-forms.sh "$SCHEMA" "$collection" "$entity" "$enum"
  echo ""
done

echo "Done! All forms scaffolded for $SCHEMA"
