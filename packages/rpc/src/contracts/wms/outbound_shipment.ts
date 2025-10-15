import { oc } from "@orpc/contract";
import { OutboundShipmentRepository } from "@packages/db/repositories/wms";
import { OutboundShipmentSchema } from "@packages/db/schemas/wms/outbound_shipment";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateOutboundShipmentContract = oc.input(OutboundShipmentRepository.schemas.paginateOptionSchema).output(OutboundShipmentSchema.array());

export const RangeOutboundShipmentContract = oc.input(OutboundShipmentRepository.schemas.rangeOptionSchema).output(OutboundShipmentSchema.array());

export const AnyOutboundShipmentContract = oc.input(z.uuid().array()).output(OutboundShipmentSchema.array());

export const InsertOutboundShipmentContract = oc.input(OutboundShipmentRepository.schemas.InsertSchema).output(OutboundShipmentSchema);

export const InsertManyOutboundShipmentContract = oc.input(OutboundShipmentRepository.schemas.InsertSchema.array()).output(OutboundShipmentSchema.array());

export const UpdateOutboundShipmentContract = oc.input(z.object({id: z.uuid(), value: OutboundShipmentRepository.schemas.UpdateSchema})).output(OutboundShipmentSchema);

export const RemoveOutboundShipmentContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
