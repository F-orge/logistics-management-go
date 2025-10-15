import { oc } from "@orpc/contract";
import { ShipmentLegEventRepository, ShipmentLegRepository } from "@packages/db/repositories/tms";
import { CarrierSchema } from "@packages/db/schemas/tms/carrier";
import { ShipmentLegSchema } from "@packages/db/schemas/tms/shipment_leg";
import { ShipmentLegEventSchema } from "@packages/db/schemas/tms/shipment_leg_event";
import { TripSchema } from "@packages/db/schemas/tms/trip";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = ShipmentLegSchema.extend({
  carrier:CarrierSchema.optional(),
  internalTrip:TripSchema.optional(),
  events:ShipmentLegEventSchema.array()
})

export const PaginateShipmentLegContract = oc.input(ShipmentLegRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeShipmentLegContract = oc.input(ShipmentLegRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyShipmentLegContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertShipmentLegContract = oc.input(ShipmentLegRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyShipmentLegContract = oc.input(ShipmentLegRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateShipmentLegContract = oc.input(z.object({id: z.uuid(), value: ShipmentLegRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveShipmentLegContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));

export const InsertShipmentLegEventContract = oc.input(ShipmentLegEventRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyShipmentLegEventContract = oc.input(ShipmentLegEventRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateShipmentLegEventContract = oc.input(z.object({id: z.uuid(), value: ShipmentLegEventRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveShipmentLegEventContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
