import { oc } from "@orpc/contract";
import { InventoryAdjustmentRepository } from "@packages/db/repositories/wms";
import { UserSchema } from "@packages/db/schemas/auth/user";
import { InventoryAdjustmentSchema } from "@packages/db/schemas/wms/inventory_adjustment";
import { ProductSchema } from "@packages/db/schemas/wms/product";
import { WarehouseSchema } from "@packages/db/schemas/wms/warehouse";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = InventoryAdjustmentSchema.extend({
  product:ProductSchema,
  warehouse:WarehouseSchema,
  user:UserSchema,
})

export const PaginateInventoryAdjustmentContract = oc.input(InventoryAdjustmentRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeInventoryAdjustmentContract = oc.input(InventoryAdjustmentRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyInventoryAdjustmentContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertInventoryAdjustmentContract = oc.input(InventoryAdjustmentRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyInventoryAdjustmentContract = oc.input(InventoryAdjustmentRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateInventoryAdjustmentContract = oc.input(z.object({id: z.uuid(), value: InventoryAdjustmentRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveInventoryAdjustmentContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
