import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import React from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import CampaignRecord from "./customer-relations/campaigns";
import CaseRecord from "./customer-relations/cases";
import CompanyRecord from "./customer-relations/companies";
import ContactRecord from "./customer-relations/contacts";
import InteractionRecord from "./customer-relations/interactions";
import InvoiceItemRecord from "./customer-relations/invoice-items";
import InvoiceRecord from "./customer-relations/invoices";
import LeadRecord from "./customer-relations/leads";
import OpportunityRecord from "./customer-relations/opportunities";
import OpportunityProductRecord from "./customer-relations/opportunity-products";
import ProductRecord from "./customer-relations/products";
import DriverLocationRecord from "./delivery-management/driver-location";
import ProofOfDeliveryRecord from "./delivery-management/proof-of-deliveries";
import TaskEventRecord from "./delivery-management/task-events";
import TaskRecord from "./delivery-management/tasks";
import CarrierRecord from "./transport-management/carriers";
import DriverRecord from "./transport-management/drivers";
import VehicleRecord from "./transport-management/vehicles";
import InboundShipmentItemRecord from "./warehouse-management/inbound-shipment-items";
import InboundShipmentRecord from "./warehouse-management/inbound-shipments";
import InventoryAdjustmentRecord from "./warehouse-management/inventory-adjustment";
import InventoryBatchRecord from "./warehouse-management/inventory-batches";
import InventoryStockRecord from "./warehouse-management/inventory-stock";
import LocationRecord from "./warehouse-management/locations";
import OutboundShipmentItemRecord from "./warehouse-management/outbound-shipment-items";
import OutboundShipmentRecord from "./warehouse-management/outbound-shipments";
import PackageItemRecord from "./warehouse-management/package-items";
import PackageRecord from "./warehouse-management/packages";
import ProductWarehouseRecord from "./warehouse-management/products";
import ReturnItemRecord from "./warehouse-management/return-items";
import ReturnRecord from "./warehouse-management/returns";
import SalesOrderItemRecord from "./warehouse-management/sales-order-items";
import SalesOrderRecord from "./warehouse-management/sales-orders";
import SupplierRecord from "./warehouse-management/suppliers";
import WarehouseRecord from "./warehouse-management/warehouses";

const RecordDialog = () => {
  const params = useParams({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  let Component: React.ReactNode = null;

  // customer relations

  if (params.schema === "customer-relations") {
    switch (params.collection) {
      case "contacts":
        Component = <ContactRecord />;
        break;
      case "companies":
        Component = <CompanyRecord />;
        break;
      case "campaigns":
        Component = <CampaignRecord />;
        break;
      case "cases":
        Component = <CaseRecord />;
        break;
      case "interactions":
        Component = <InteractionRecord />;
        break;
      case "invoices":
        Component = <InvoiceRecord />;
        break;
      case "invoice-items":
        Component = <InvoiceItemRecord />;
        break;
      case "leads":
        Component = <LeadRecord />;
        break;
      case "opportunities":
        Component = <OpportunityRecord />;
        break;
      case "opportunity-products":
        Component = <OpportunityProductRecord />;
        break;
      case "products":
        Component = <ProductRecord />;
        break;
      default:
        Component = <div>No valid collection selected</div>;
    }
  }

  // delivery management

  if (params.schema === "delivery-management") {
    switch (params.collection) {
      case "driver-location":
        Component = <DriverLocationRecord />;
        break;
      case "proof-of-deliveries":
        Component = <ProofOfDeliveryRecord />;
        break;
      case "tasks":
        Component = <TaskRecord />;
        break;
      case "task-events":
        Component = <TaskEventRecord />;
        break;
      default:
        Component = <div>No valid collection selected</div>;
    }
  }

  // warehouse management

  if (params.schema === "warehouse-management") {
    switch (params.collection) {
      case "inventory-batches":
        Component = <InventoryBatchRecord />;
        break;
      case "inventory-adjustment":
        Component = <InventoryAdjustmentRecord />;
        break;
      case "inventory-stock":
        Component = <InventoryStockRecord />;
        break;
      case "locations":
        Component = <LocationRecord />;
        break;
      case "products":
        Component = <ProductWarehouseRecord />;
        break;
      case "suppliers":
        Component = <SupplierRecord />;
        break;
      case "inbound-shipments":
        Component = <InboundShipmentRecord />;
        break;
      case "inbound-shipment-items":
        Component = <InboundShipmentItemRecord />;
        break;
      case "outbound-shipments":
        Component = <OutboundShipmentRecord />;
        break;
      case "outbound-shipment-items":
        Component = <OutboundShipmentItemRecord />;
        break;
      case "sales-orders":
        Component = <SalesOrderRecord />;
        break;
      case "sales-order-items":
        Component = <SalesOrderItemRecord />;
        break;
      case "packages":
        Component = <PackageRecord />;
        break;
      case "package-items":
        Component = <PackageItemRecord />;
        break;
      case "returns":
        Component = <ReturnRecord />;
        break;
      case "return-items":
        Component = <ReturnItemRecord />;
        break;
      case "warehouses":
        Component = <WarehouseRecord />;
        break;
      default:
        Component = <div>No valid collection selected</div>;
    }
  }

  // transport management

  if (params.schema === "transport-management") {
    switch (params.collection) {
      case "carriers":
        Component = <CarrierRecord />;
        break;
      case "drivers":
        Component = <DriverRecord />;
        break;
      case "vehicles":
        Component = <VehicleRecord />;
        break;
      default:
        Component = <div>No valid collection selected</div>;
    }
  }

  return (
    <Dialog
      open={!!searchQuery.id && searchQuery.action === "view"}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({ ...prev, id: undefined, action: undefined }),
        })
      }
    >
      <DialogContent className="max-h-3/4 overflow-y-auto">
        <DialogHeader></DialogHeader>
        {Component}
      </DialogContent>
    </Dialog>
  );
};

export default RecordDialog;
