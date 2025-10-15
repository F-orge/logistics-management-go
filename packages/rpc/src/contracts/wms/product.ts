import { oc } from "@orpc/contract";
import { ProductRepository } from "@packages/db/repositories/wms";
import { ProductSchema } from "@packages/db/schemas/wms/product";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateProductContract = oc.input(ProductRepository.schemas.paginateOptionSchema).output(ProductSchema.array());

export const RangeProductContract = oc.input(ProductRepository.schemas.rangeOptionSchema).output(ProductSchema.array());

export const AnyProductContract = oc.input(z.uuid().array()).output(ProductSchema.array());

export const InsertProductContract = oc.input(ProductRepository.schemas.InsertSchema).output(ProductSchema);

export const InsertManyProductContract = oc.input(ProductRepository.schemas.InsertSchema.array()).output(ProductSchema.array());

export const UpdateProductContract = oc.input(z.object({id: z.uuid(), value: ProductRepository.schemas.UpdateSchema})).output(ProductSchema);

export const RemoveProductContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
