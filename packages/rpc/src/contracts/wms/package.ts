import { oc } from "@orpc/contract";
import { PackageRepository } from "@packages/db/repositories/wms";
import { PackageSchema } from "@packages/db/schemas/wms/package";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginatePackageContract = oc.input(PackageRepository.schemas.paginateOptionSchema).output(PackageSchema.array());

export const RangePackageContract = oc.input(PackageRepository.schemas.rangeOptionSchema).output(PackageSchema.array());

export const AnyPackageContract = oc.input(z.uuid().array()).output(PackageSchema.array());

export const InsertPackageContract = oc.input(PackageRepository.schemas.InsertSchema).output(PackageSchema);

export const InsertManyPackageContract = oc.input(PackageRepository.schemas.InsertSchema.array()).output(PackageSchema.array());

export const UpdatePackageContract = oc.input(z.object({id: z.uuid(), value: PackageRepository.schemas.UpdateSchema})).output(PackageSchema);

export const RemovePackageContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
