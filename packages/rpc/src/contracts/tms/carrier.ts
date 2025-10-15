import { oc } from "@orpc/contract";
import { CarrierRateRepository, CarrierRepository } from "@packages/db/repositories/tms";
import { CarrierSchema } from "@packages/db/schemas/tms/carrier";
import { CarrierRateSchema } from "@packages/db/schemas/tms/carrier_rate";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = CarrierSchema.extend({
  rates:CarrierRateSchema.array()
})

export const PaginateCarrierContract = oc.input(CarrierRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeCarrierContract = oc.input(CarrierRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyCarrierContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertCarrierContract = oc.input(CarrierRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyCarrierContract = oc.input(CarrierRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateCarrierContract = oc.input(z.object({id: z.uuid(), value: CarrierRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveCarrierContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));

export const InsertCarrierRateContract = oc.input(CarrierRateRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyCarrierRateContract = oc.input(CarrierRateRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateCarrierRateContract = oc.input(z.object({id: z.uuid(), value: CarrierRateRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveCarrierRateContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
