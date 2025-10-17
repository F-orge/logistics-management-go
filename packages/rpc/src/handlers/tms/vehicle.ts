import { implement } from "@orpc/server";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";
import * as contracts from "@packages/rpc/contracts/tms/vehicle";
import {
  VehicleMaintenanceRepository,
  VehicleRepository,
} from "@packages/db/repositories/tms";

export const PaginateVehicle = implement(contracts.PaginateVehicleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const vehicleRepo = VehicleRepository.fns(context.kysely);
    const maintenanceRepo = VehicleMaintenanceRepository.fns(context.kysely);

    const result = await vehicleRepo.paginate(input);
    if (result.length === 0) {
      return [];
    }

    const maintenances = await maintenanceRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [
        {
          column: "vehicleId",
          operator: "in",
          value: result.map((row) => row.id),
        },
      ],
    });

    return result.map((row) => ({
      ...row,
      maintenances: maintenances.filter((m) => m.vehicleId === row.id),
    }));
  });

export const RangeVehicle = implement(contracts.RangeVehicleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const vehicleRepo = VehicleRepository.fns(context.kysely);
    const maintenanceRepo = VehicleMaintenanceRepository.fns(context.kysely);

    const result = await vehicleRepo.range(input);
    if (result.length === 0) {
      return [];
    }

    const maintenances = await maintenanceRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [
        {
          column: "vehicleId",
          operator: "in",
          value: result.map((row) => row.id),
        },
      ],
    });

    return result.map((row) => ({
      ...row,
      maintenances: maintenances.filter((m) => m.vehicleId === row.id),
    }));
  });

export const AnyVehicle = implement(contracts.AnyVehicleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const vehicleRepo = VehicleRepository.fns(context.kysely);
    const maintenanceRepo = VehicleMaintenanceRepository.fns(context.kysely);

    const result = await vehicleRepo.any(input);
    if (result.length === 0) {
      return [];
    }

    const maintenances = await maintenanceRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [
        {
          column: "vehicleId",
          operator: "in",
          value: result.map((row) => row.id),
        },
      ],
    });

    return result.map((row) => ({
      ...row,
      maintenances: maintenances.filter((m) => m.vehicleId === row.id),
    }));
  });

export const InsertVehicle = implement(contracts.InsertVehicleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const vehicleRepo = VehicleRepository.fns(context.kysely);
    const result = await vehicleRepo.insert(input);

    return {
      ...result,
      maintenances: [],
    };
  });

export const InsertManyVehicle = implement(contracts.InsertManyVehicleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const vehicleRepo = VehicleRepository.fns(context.kysely);
    const result = await vehicleRepo.insertMany(input);

    return result.map((row) => ({
      ...row,
      maintenances: [],
    }));
  });

export const UpdateVehicle = implement(contracts.UpdateVehicleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const vehicleRepo = VehicleRepository.fns(context.kysely);
    const maintenanceRepo = VehicleMaintenanceRepository.fns(context.kysely);

    const result = await vehicleRepo.update(input.id, input.value);

    const maintenances = await maintenanceRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [{ column: "vehicleId", operator: "in", value: [result.id] }],
    });

    return {
      ...result,
      maintenances,
    };
  });

export const RemoveVehicle = implement(contracts.RemoveVehicleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const vehicleRepo = VehicleRepository.fns(context.kysely);
    return await vehicleRepo.remove(input);
  });

export const InsertVehicleMaintenance = implement(
  contracts.InsertVehicleMaintenanceContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const vehicleRepo = VehicleRepository.fns(context.kysely);
    const maintenanceRepo = VehicleMaintenanceRepository.fns(context.kysely);

    const newMaintenance = await maintenanceRepo.insert(input);
    const result = await vehicleRepo.find(newMaintenance.vehicleId);

    const maintenances = await maintenanceRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: "vehicleId", operator: "in", value: [result.id] }],
    });

    return {
      ...result,
      maintenances,
    };
  });

export const InsertManyVehicleMaintenance = implement(
  contracts.InsertManyVehicleMaintenanceContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const vehicleRepo = VehicleRepository.fns(context.kysely);
    const maintenanceRepo = VehicleMaintenanceRepository.fns(context.kysely);

    const newMaintenances = await maintenanceRepo.insertMany(input);
    const vehicleIds = [...new Set(newMaintenances.map((m) => m.vehicleId))];
    const result = await vehicleRepo.any(vehicleIds);

    const allMaintenances = await maintenanceRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: "vehicleId", operator: "in", value: vehicleIds }],
    });

    return result.map((vehicle) => ({
      ...vehicle,
      maintenances: allMaintenances.filter((m) => m.vehicleId === vehicle.id),
    }));
  });

export const UpdateVehicleMaintenance = implement(
  contracts.UpdateVehicleMaintenanceContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const vehicleRepo = VehicleRepository.fns(context.kysely);
    const maintenanceRepo = VehicleMaintenanceRepository.fns(context.kysely);

    const updatedMaintenance = await maintenanceRepo.update(
      input.id,
      input.value
    );
    const result = await vehicleRepo.find(updatedMaintenance.vehicleId);

    const maintenances = await maintenanceRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: "vehicleId", operator: "in", value: [result.id] }],
    });

    return {
      ...result,
      maintenances,
    };
  });

export const RemoveVehicleMaintenance = implement(
  contracts.RemoveVehicleMaintenanceContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const maintenanceRepo = VehicleMaintenanceRepository.fns(context.kysely);
    return await maintenanceRepo.remove(input);
  });
