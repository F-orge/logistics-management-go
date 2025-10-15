import { oc } from "@orpc/contract";
import { BinThresholdRepository } from "@packages/db/repositories/wms";
import { BinThresholdSchema } from "@packages/db/schemas/wms/bin_threshold";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateBinThresholdContract = oc.input(BinThresholdRepository.schemas.paginateOptionSchema).output(BinThresholdSchema.array());

export const RangeBinThresholdContract = oc.input(BinThresholdRepository.schemas.rangeOptionSchema).output(BinThresholdSchema.array());

export const AnyBinThresholdContract = oc.input(z.uuid().array()).output(BinThresholdSchema.array());

export const InsertBinThresholdContract = oc.input(BinThresholdRepository.schemas.InsertSchema).output(BinThresholdSchema);

export const InsertManyBinThresholdContract = oc.input(BinThresholdRepository.schemas.InsertSchema.array()).output(BinThresholdSchema.array());

export const UpdateBinThresholdContract = oc.input(z.object({id: z.uuid(), value: BinThresholdRepository.schemas.UpdateSchema})).output(BinThresholdSchema);

export const RemoveBinThresholdContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
