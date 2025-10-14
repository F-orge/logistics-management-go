import { oc } from "@orpc/contract";
import { CustomerTrackingLinkRepository } from "@packages/db/repositories/dms";
import { CustomerTrackingLinkSchema } from "@packages/db/schemas/dms/customer_tracking_link";
import { DeliveryTaskSchema } from "@packages/db/schemas/dms/delivery_task";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = CustomerTrackingLinkSchema.extend({
  deliveryTask:DeliveryTaskSchema
})

export const PaginateCustomerTrackingLinkContract = oc.input(CustomerTrackingLinkRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeCustomerTrackingLinkContract = oc.input(CustomerTrackingLinkRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyCustomerTrackingLinkContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertCustomerTrackingLinkContract = oc.input(CustomerTrackingLinkRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyCustomerTrackingLinkContract = oc.input(CustomerTrackingLinkRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateCustomerTrackingLinkContract = oc.input(z.object({id: z.uuid(), value: CustomerTrackingLinkRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveCustomerTrackingLinkContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));