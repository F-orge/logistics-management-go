import { oc } from "@orpc/contract";
import { InboundShipmentRepository } from "@packages/db/repositories/wms";
import { InboundShipmentSchema } from "@packages/db/schemas/wms/inbound_shipment";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateInboundShipmentContract = oc.input(InboundShipmentRepository.schemas.paginateOptionSchema).output(InboundShipmentSchema.array());

export const RangeInboundShipmentContract = oc.input(InboundShipmentRepository.schemas.rangeOptionSchema).output(InboundShipmentSchema.array());

export const AnyInboundShipmentContract = oc.input(z.uuid().array()).output(InboundShipmentSchema.array());

export const InsertInboundShipmentContract = oc.input(InboundShipmentRepository.schemas.InsertSchema).output(InboundShipmentSchema);

export const InsertManyInboundShipmentContract = oc.input(InboundShipmentRepository.schemas.InsertSchema.array()).output(InboundShipmentSchema.array());

export const UpdateInboundShipmentContract = oc.input(z.object({id: z.uuid(), value: InboundShipmentRepository.schemas.UpdateSchema})).output(InboundShipmentSchema);

export const RemoveInboundShipmentContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
