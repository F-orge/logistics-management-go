import { z } from "zod";
import { CarrierRateSchema } from "./carrier_rate";
import { CarrierSchema } from "./carrier";
import { DriverScheduleSchema } from "./driver_schedule";
import { DriverSchema } from "./driver";
import { ExpenseSchema } from "./expense";
import { GeofenceEventSchema } from "./geofence_event";
import { GeofenceSchema } from "./geofence";
import { GpsPingSchema } from "./gps_ping";
import { PartnerInvoiceItemSchema } from "./partner_invoice_item";
import { PartnerInvoiceSchema } from "./partner_invoice";
import { ProofOfDeliverySchema } from "./proof_of_delivery";
import { RouteSchema } from "./route";
import { ShipmentLegEventSchema } from "./shipment_leg_event";
import { ShipmentLegSchema } from "./shipment_leg";
import { TripStopSchema } from "./trip_stop";
import { TripSchema } from "./trip";
import { VehicleMaintenanceSchema } from "./vehicle_maintenance";
import { VehicleSchema } from "./vehicle";

export default z.object({
  carrierRates: CarrierRateSchema,
  carriers: CarrierSchema,
  driverSchedules: DriverScheduleSchema,
  drivers: DriverSchema,
  expenses: ExpenseSchema,
  geofenceEvents: GeofenceEventSchema,
  geofences: GeofenceSchema,
  gpsPings: GpsPingSchema,
  partnerInvoiceItems: PartnerInvoiceItemSchema,
  partnerInvoices: PartnerInvoiceSchema,
  proofOfDeliveries: ProofOfDeliverySchema,
  routes: RouteSchema,
  shipmentLegEvents: ShipmentLegEventSchema,
  shipmentLegs: ShipmentLegSchema,
  tripStops: TripStopSchema,
  trips: TripSchema,
  vehicleMaintenances: VehicleMaintenanceSchema,
  vehicles: VehicleSchema,
});
