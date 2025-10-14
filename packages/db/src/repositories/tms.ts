import { CarrierSchema } from '@/schemas/tms/carrier';
import { CarrierRateSchema } from '@/schemas/tms/carrier_rate';
import { DriverSchema } from '@/schemas/tms/driver';
import { DriverScheduleSchema } from '@/schemas/tms/driver_schedule';
import { ExpenseSchema } from '@/schemas/tms/expense';
import { GeofenceSchema } from '@/schemas/tms/geofence';
import { GeofenceEventSchema } from '@/schemas/tms/geofence_event';
import { GpsPingSchema } from '@/schemas/tms/gps_ping';
import { PartnerInvoiceSchema } from '@/schemas/tms/partner_invoice';
import { PartnerInvoiceItemSchema } from '@/schemas/tms/partner_invoice_item';
import { ProofOfDeliverySchema } from '@/schemas/tms/proof_of_delivery';
import { RouteSchema } from '@/schemas/tms/route';
import { ShipmentLegSchema } from '@/schemas/tms/shipment_leg';
import { ShipmentLegEventSchema } from '@/schemas/tms/shipment_leg_event';
import { TripSchema } from '@/schemas/tms/trip';
import { TripStopSchema } from '@/schemas/tms/trip_stop';
import { VehicleSchema } from '@/schemas/tms/vehicle';
import { VehicleMaintenanceSchema } from '@/schemas/tms/vehicle_maintenance';
import { repositoryFactory } from './interface';

export const CarrierRepository = repositoryFactory('tms.carriers', CarrierSchema);
export const CarrierRateRepository = repositoryFactory(
  'tms.carrierRates',
  CarrierRateSchema,
);
export const DriverRepository = repositoryFactory('tms.drivers', DriverSchema);
export const DriverScheduleRepository = repositoryFactory(
  'tms.driverSchedules',
  DriverScheduleSchema,
);
export const ExpenseRepository = repositoryFactory('tms.expenses', ExpenseSchema);
export const GeofenceRepository = repositoryFactory('tms.geofences', GeofenceSchema);
export const GeofenceEventRepository = repositoryFactory(
  'tms.geofenceEvents',
  GeofenceEventSchema,
);
export const GpsPingRepository = repositoryFactory('tms.gpsPings', GpsPingSchema);
export const PartnerInvoiceRepository = repositoryFactory(
  'tms.partnerInvoices',
  PartnerInvoiceSchema,
);
export const PartnerInvoiceItemRepository = repositoryFactory(
  'tms.partnerInvoiceItems',
  PartnerInvoiceItemSchema,
);
export const ProofOfDeliveryRepository = repositoryFactory(
  'tms.proofOfDeliveries',
  ProofOfDeliverySchema,
);
export const RouteRepository = repositoryFactory('tms.routes', RouteSchema);
export const ShipmentLegRepository = repositoryFactory(
  'tms.shipmentLegs',
  ShipmentLegSchema,
);
export const ShipmentLegEventRepository = repositoryFactory(
  'tms.shipmentLegEvents',
  ShipmentLegEventSchema,
);
export const TripRepository = repositoryFactory('tms.trips', TripSchema);
export const TripStopRepository = repositoryFactory('tms.tripStops', TripStopSchema);
export const VehicleRepository = repositoryFactory('tms.vehicles', VehicleSchema);
export const VehicleMaintenanceRepository = repositoryFactory(
  'tms.vehicleMaintenance',
  VehicleMaintenanceSchema,
);
