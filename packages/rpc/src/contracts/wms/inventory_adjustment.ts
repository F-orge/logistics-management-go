import { oc } from "@orpc/contract";
import { InventoryAdjustmentRepository } from "@packages/db/repositories/wms";
import { InventoryAdjustmentSchema } from "@packages/db/schemas/wms/inventory_adjustment";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateInventoryAdjustmentContract = oc.input(InventoryAdjustmentRepository.schemas.paginateOptionSchema).output(InventoryAdjustmentSchema.array());

export const RangeInventoryAdjustmentContract = oc.input(InventoryAdjustmentRepository.schemas.rangeOptionSchema).output(InventoryAdjustmentSchema.array());

export const AnyInventoryAdjustmentContract = oc.input(z.uuid().array()).output(InventoryAdjustmentSchema.array());

export const InsertInventoryAdjustmentContract = oc.input(InventoryAdjustmentRepository.schemas.InsertSchema).output(InventoryAdjustmentSchema);

export const InsertManyInventoryAdjustmentContract = oc.input(InventoryAdjustmentRepository.schemas.InsertSchema.array()).output(InventoryAdjustmentSchema.array());

export const UpdateInventoryAdjustmentContract = oc.input(z.object({id: z.uuid(), value: InventoryAdjustmentRepository.schemas.UpdateSchema})).output(InventoryAdjustmentSchema);

export const RemoveInventoryAdjustmentContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
