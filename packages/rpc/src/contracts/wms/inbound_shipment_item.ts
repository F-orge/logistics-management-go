import { oc } from "@orpc/contract";
import { InboundShipmentItemRepository } from "@packages/db/repositories/wms";
import { InboundShipmentItemSchema } from "@packages/db/schemas/wms/inbound_shipment_item";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateInboundShipmentItemContract = oc.input(InboundShipmentItemRepository.schemas.paginateOptionSchema).output(InboundShipmentItemSchema.array());

export const RangeInboundShipmentItemContract = oc.input(InboundShipmentItemRepository.schemas.rangeOptionSchema).output(InboundShipmentItemSchema.array());

export const AnyInboundShipmentItemContract = oc.input(z.uuid().array()).output(InboundShipmentItemSchema.array());

export const InsertInboundShipmentItemContract = oc.input(InboundShipmentItemRepository.schemas.InsertSchema).output(InboundShipmentItemSchema);

export const InsertManyInboundShipmentItemContract = oc.input(InboundShipmentItemRepository.schemas.InsertSchema.array()).output(InboundShipmentItemSchema.array());

export const UpdateInboundShipmentItemContract = oc.input(z.object({id: z.uuid(), value: InboundShipmentItemRepository.schemas.UpdateSchema})).output(InboundShipmentItemSchema);

export const RemoveInboundShipmentItemContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
