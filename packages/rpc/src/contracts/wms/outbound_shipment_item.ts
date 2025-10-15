import { oc } from "@orpc/contract";
import { OutboundShipmentItemRepository } from "@packages/db/repositories/wms";
import { OutboundShipmentItemSchema } from "@packages/db/schemas/wms/outbound_shipment_item";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateOutboundShipmentItemContract = oc.input(OutboundShipmentItemRepository.schemas.paginateOptionSchema).output(OutboundShipmentItemSchema.array());

export const RangeOutboundShipmentItemContract = oc.input(OutboundShipmentItemRepository.schemas.rangeOptionSchema).output(OutboundShipmentItemSchema.array());

export const AnyOutboundShipmentItemContract = oc.input(z.uuid().array()).output(OutboundShipmentItemSchema.array());

export const InsertOutboundShipmentItemContract = oc.input(OutboundShipmentItemRepository.schemas.InsertSchema).output(OutboundShipmentItemSchema);

export const InsertManyOutboundShipmentItemContract = oc.input(OutboundShipmentItemRepository.schemas.InsertSchema.array()).output(OutboundShipmentItemSchema.array());

export const UpdateOutboundShipmentItemContract = oc.input(z.object({id: z.uuid(), value: OutboundShipmentItemRepository.schemas.UpdateSchema})).output(OutboundShipmentItemSchema);

export const RemoveOutboundShipmentItemContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
