import { implement } from "@orpc/server";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";
import * as contracts from "@packages/rpc/contracts/wms/location";
import {
  LocationRepository,
  WarehouseRepository,
} from "@packages/db/repositories/wms";

export const PaginateLocation = implement(contracts.PaginateLocationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = LocationRepository.fns(context.kysely);
    const result = await repo.paginate(input);
    if (result.length === 0) {
      return [];
    }

    const [warehouses, parentLocations] = await Promise.all([
      WarehouseRepository.fns(context.kysely).any(
        result.map((r) => r.warehouseId)
      ),
      LocationRepository.fns(context.kysely).any(
        result.map((r) => r.parentLocationId).filter(nonEmpty)
      ),
    ]);

    return result.map((row) => ({
      ...row,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      parentLocation: parentLocations.find(
        (p) => p.id === row.parentLocationId
      )!,
    }));
  });

export const RangeLocation = implement(contracts.RangeLocationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = LocationRepository.fns(context.kysely);
    const result = await repo.range(input);
    if (result.length === 0) {
      return [];
    }

    const [warehouses, parentLocations] = await Promise.all([
      WarehouseRepository.fns(context.kysely).any(
        result.map((r) => r.warehouseId)
      ),
      LocationRepository.fns(context.kysely).any(
        result.map((r) => r.parentLocationId).filter(nonEmpty)
      ),
    ]);

    return result.map((row) => ({
      ...row,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      parentLocation: parentLocations.find(
        (p) => p.id === row.parentLocationId
      )!,
    }));
  });

export const AnyLocation = implement(contracts.AnyLocationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = LocationRepository.fns(context.kysely);
    const result = await repo.any(input);
    if (result.length === 0) {
      return [];
    }

    const [warehouses, parentLocations] = await Promise.all([
      WarehouseRepository.fns(context.kysely).any(
        result.map((r) => r.warehouseId)
      ),
      LocationRepository.fns(context.kysely).any(
        result.map((r) => r.parentLocationId).filter(nonEmpty)
      ),
    ]);

    return result.map((row) => ({
      ...row,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      parentLocation: parentLocations.find(
        (p) => p.id === row.parentLocationId
      )!,
    }));
  });

export const InsertLocation = implement(contracts.InsertLocationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = LocationRepository.fns(context.kysely);
    const result = await repo.insert(input);

    const [warehouse, parentLocation] = await Promise.all([
      WarehouseRepository.fns(context.kysely).find(result.warehouseId),
      result.parentLocationId
        ? LocationRepository.fns(context.kysely).find(result.parentLocationId)
        : undefined,
    ]);

    return {
      ...result,
      warehouse: warehouse!,
      parentLocation: parentLocation!,
    };
  });

export const InsertManyLocation = implement(
  contracts.InsertManyLocationContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = LocationRepository.fns(context.kysely);
    const result = await repo.insertMany(input);

    const [warehouses, parentLocations] = await Promise.all([
      WarehouseRepository.fns(context.kysely).any(
        result.map((r) => r.warehouseId)
      ),
      LocationRepository.fns(context.kysely).any(
        result.map((r) => r.parentLocationId).filter(nonEmpty)
      ),
    ]);

    return result.map((row) => ({
      ...row,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      parentLocation: parentLocations.find(
        (p) => p.id === row.parentLocationId
      )!,
    }));
  });

export const UpdateLocation = implement(contracts.UpdateLocationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = LocationRepository.fns(context.kysely);
    const result = await repo.update(input.id, input.value);

    const [warehouse, parentLocation] = await Promise.all([
      WarehouseRepository.fns(context.kysely).find(result.warehouseId),
      result.parentLocationId
        ? LocationRepository.fns(context.kysely).find(result.parentLocationId)
        : undefined,
    ]);

    return {
      ...result,
      warehouse: warehouse!,
      parentLocation: parentLocation!,
    };
  });

export const RemoveLocation = implement(contracts.RemoveLocationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = LocationRepository.fns(context.kysely);
    return await repo.remove(input);
  });
