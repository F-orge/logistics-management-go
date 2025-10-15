import { oc } from "@orpc/contract";
import { DeliveryRouteRepository } from "@packages/db/repositories/dms";
import { DeliveryRouteSchema } from "@packages/db/schemas/dms/delivery_route";
import {DriverSchema} from "@packages/db/schemas/tms/driver"
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = DeliveryRouteSchema.extend({
  driver:DriverSchema 
})

export const PaginateDeliveryRouteContract = oc.input(DeliveryRouteRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeDeliveryRouteContract = oc.input(DeliveryRouteRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyDeliveryRouteContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertDeliveryRouteContract = oc.input(DeliveryRouteRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyDeliveryRouteContract = oc.input(DeliveryRouteRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateDeliveryRouteContract = oc.input(z.object({id: z.uuid(), value: DeliveryRouteRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveDeliveryRouteContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));