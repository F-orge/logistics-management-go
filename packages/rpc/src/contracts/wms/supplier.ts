import { oc } from "@orpc/contract";
import { SupplierRepository } from "@packages/db/repositories/wms";
import { SupplierSchema } from "@packages/db/schemas/wms/supplier";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateSupplierContract = oc.input(SupplierRepository.schemas.paginateOptionSchema).output(SupplierSchema.array());

export const RangeSupplierContract = oc.input(SupplierRepository.schemas.rangeOptionSchema).output(SupplierSchema.array());

export const AnySupplierContract = oc.input(z.uuid().array()).output(SupplierSchema.array());

export const InsertSupplierContract = oc.input(SupplierRepository.schemas.InsertSchema).output(SupplierSchema);

export const InsertManySupplierContract = oc.input(SupplierRepository.schemas.InsertSchema.array()).output(SupplierSchema.array());

export const UpdateSupplierContract = oc.input(z.object({id: z.uuid(), value: SupplierRepository.schemas.UpdateSchema})).output(SupplierSchema);

export const RemoveSupplierContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
