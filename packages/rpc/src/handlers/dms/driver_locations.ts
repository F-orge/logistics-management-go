import { implement } from "@orpc/server";
import { DriverLocationRepository } from "@packages/db/repositories/dms";
import { DriverRepository } from "@packages/db/repositories/tms";
import * as contracts from "@/contracts/dms/driver_locations";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";

export const PaginateDriverLocation = implement(
  contracts.PaginateDriverLocationContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverLocationRepo = DriverLocationRepository.fns(context.kysely);
    const driverRepo = DriverRepository.fns(context.kysely);

    const result = await driverLocationRepo.paginate(input);

    const drivers = await driverRepo.any(
      result.map((row) => row.driverId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      driver: drivers.find((d) => d.id === row.driverId)!,
    }));
  });

export const RangeDriverLocation = implement(
  contracts.RangeDriverLocationContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverLocationRepo = DriverLocationRepository.fns(context.kysely);
    const driverRepo = DriverRepository.fns(context.kysely);

    const result = await driverLocationRepo.range(input);

    const drivers = await driverRepo.any(
      result.map((row) => row.driverId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      driver: drivers.find((d) => d.id === row.driverId)!,
    }));
  });

export const AnyDriverLocation = implement(contracts.AnyDriverLocationContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverLocationRepo = DriverLocationRepository.fns(context.kysely);
    const driverRepo = DriverRepository.fns(context.kysely);

    const result = await driverLocationRepo.any(input);

    const drivers = await driverRepo.any(
      result.map((row) => row.driverId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      driver: drivers.find((d) => d.id === row.driverId)!,
    }));
  });

export const InsertDriverLocation = implement(
  contracts.InsertDriverLocationContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverLocationRepo = DriverLocationRepository.fns(context.kysely);
    const driverRepo = DriverRepository.fns(context.kysely);

    const result = await driverLocationRepo.insert(input);

    const driver = await driverRepo.find(result.driverId);

    return {
      ...result,
      driver: driver!,
    };
  });

export const InsertManyDriverLocation = implement(
  contracts.InsertManyDriverLocationContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverLocationRepo = DriverLocationRepository.fns(context.kysely);
    const driverRepo = DriverRepository.fns(context.kysely);

    const result = await driverLocationRepo.insertMany(input);

    const drivers = await driverRepo.any(
      result.map((row) => row.driverId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      driver: drivers.find((d) => d.id === row.driverId)!,
    }));
  });

export const UpdateDriverLocation = implement(
  contracts.UpdateDriverLocationContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverLocationRepo = DriverLocationRepository.fns(context.kysely);
    const driverRepo = DriverRepository.fns(context.kysely);

    const result = await driverLocationRepo.update(input.id, input.value);

    const driver = await driverRepo.find(result.driverId);

    return {
      ...result,
      driver: driver!,
    };
  });

export const RemoveDriverLocation = implement(
  contracts.RemoveDriverLocationContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverLocationRepo = DriverLocationRepository.fns(context.kysely);

    const result = await driverLocationRepo.remove(input);

    return result;
  });
