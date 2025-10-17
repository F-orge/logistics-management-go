import { implement } from "@orpc/server";
import { DeliveryRouteRepository } from "@packages/db/repositories/dms";
import { DriverRepository } from "@packages/db/repositories/tms";
import * as contracts from "@/contracts/dms/delivery_routes";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";

export const PaginateDeliveryRoute = implement(
  contracts.PaginateDeliveryRouteContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const driverRepo = DriverRepository.fns(context.kysely);

    const result = await deliveryRouteRepo.paginate(input);

    const drivers = await driverRepo.any(
      result.map((row) => row.driverId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      driver: drivers.find((d) => d.id === row.driverId)!,
    }));
  });

export const RangeDeliveryRoute = implement(
  contracts.RangeDeliveryRouteContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const driverRepo = DriverRepository.fns(context.kysely);

    const result = await deliveryRouteRepo.range(input);

    const drivers = await driverRepo.any(
      result.map((row) => row.driverId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      driver: drivers.find((d) => d.id === row.driverId)!,
    }));
  });

export const AnyDeliveryRoute = implement(contracts.AnyDeliveryRouteContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const driverRepo = DriverRepository.fns(context.kysely);

    const result = await deliveryRouteRepo.any(input);

    const drivers = await driverRepo.any(
      result.map((row) => row.driverId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      driver: drivers.find((d) => d.id === row.driverId)!,
    }));
  });

export const InsertDeliveryRoute = implement(
  contracts.InsertDeliveryRouteContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const driverRepo = DriverRepository.fns(context.kysely);

    const result = await deliveryRouteRepo.insert(input);

    const driver = await driverRepo.find(result.driverId);

    return {
      ...result,
      driver: driver!,
    };
  });

export const InsertManyDeliveryRoute = implement(
  contracts.InsertManyDeliveryRouteContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const driverRepo = DriverRepository.fns(context.kysely);

    const result = await deliveryRouteRepo.insertMany(input);

    const drivers = await driverRepo.any(
      result.map((row) => row.driverId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      driver: drivers.find((d) => d.id === row.driverId)!,
    }));
  });

export const UpdateDeliveryRoute = implement(
  contracts.UpdateDeliveryRouteContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const driverRepo = DriverRepository.fns(context.kysely);

    const result = await deliveryRouteRepo.update(input.id, input.value);

    const driver = await driverRepo.find(result.driverId);

    return {
      ...result,
      driver: driver!,
    };
  });

export const RemoveDeliveryRoute = implement(
  contracts.RemoveDeliveryRouteContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);

    const result = await deliveryRouteRepo.remove(input);

    return result;
  });
