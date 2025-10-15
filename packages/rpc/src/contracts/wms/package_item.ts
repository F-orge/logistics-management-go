import { oc } from "@orpc/contract";
import { PackageItemRepository } from "@packages/db/repositories/wms";
import { PackageSchema } from "@packages/db/schemas/wms/package";
import { PackageItemSchema } from "@packages/db/schemas/wms/package_item";
import { ProductSchema } from "@packages/db/schemas/wms/product";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = PackageItemSchema.extend({
  package:PackageSchema,
  product:ProductSchema
})

export const PaginatePackageItemContract = oc.input(PackageItemRepository.schemas.paginateOptionSchema).output(PackageItemSchema.array());

export const RangePackageItemContract = oc.input(PackageItemRepository.schemas.rangeOptionSchema).output(PackageItemSchema.array());

export const AnyPackageItemContract = oc.input(z.uuid().array()).output(PackageItemSchema.array());

export const InsertPackageItemContract = oc.input(PackageItemRepository.schemas.InsertSchema).output(PackageItemSchema);

export const InsertManyPackageItemContract = oc.input(PackageItemRepository.schemas.InsertSchema.array()).output(PackageItemSchema.array());

export const UpdatePackageItemContract = oc.input(z.object({id: z.uuid(), value: PackageItemRepository.schemas.UpdateSchema})).output(PackageItemSchema);

export const RemovePackageItemContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
