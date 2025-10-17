import { implement } from "@orpc/server";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";
import * as contracts from "@packages/rpc/contracts/tms/driver";
import {
  DriverRepository,
  DriverScheduleRepository,
} from "@packages/db/repositories/tms";

export const PaginateDriver = implement(contracts.PaginateDriverContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverRepo = DriverRepository.fns(context.kysely);
    const driverScheduleRepo = DriverScheduleRepository.fns(context.kysely);

    const result = await driverRepo.paginate(input);
    if (result.length === 0) {
      return [];
    }

    const schedules = await driverScheduleRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [
        {
          column: "driverId",
          operator: "in",
          value: result.map((row) => row.id),
        },
      ],
    });

    return result.map((row) => ({
      ...row,
      schedules: schedules.filter((s) => s.driverId === row.id),
    }));
  });

export const RangeDriver = implement(contracts.RangeDriverContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverRepo = DriverRepository.fns(context.kysely);
    const driverScheduleRepo = DriverScheduleRepository.fns(context.kysely);

    const result = await driverRepo.range(input);
    if (result.length === 0) {
      return [];
    }

    const schedules = await driverScheduleRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [
        {
          column: "driverId",
          operator: "in",
          value: result.map((row) => row.id),
        },
      ],
    });

    return result.map((row) => ({
      ...row,
      schedules: schedules.filter((s) => s.driverId === row.id),
    }));
  });

export const AnyDriver = implement(contracts.AnyDriverContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverRepo = DriverRepository.fns(context.kysely);
    const driverScheduleRepo = DriverScheduleRepository.fns(context.kysely);

    const result = await driverRepo.any(input);
    if (result.length === 0) {
      return [];
    }

    const schedules = await driverScheduleRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [
        {
          column: "driverId",
          operator: "in",
          value: result.map((row) => row.id),
        },
      ],
    });

    return result.map((row) => ({
      ...row,
      schedules: schedules.filter((s) => s.driverId === row.id),
    }));
  });

export const InsertDriver = implement(contracts.InsertDriverContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverRepo = DriverRepository.fns(context.kysely);
    const result = await driverRepo.insert(input);

    return {
      ...result,
      schedules: [],
    };
  });

export const InsertManyDriver = implement(contracts.InsertManyDriverContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverRepo = DriverRepository.fns(context.kysely);
    const result = await driverRepo.insertMany(input);

    return result.map((row) => ({
      ...row,
      schedules: [],
    }));
  });

export const UpdateDriver = implement(contracts.UpdateDriverContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverRepo = DriverRepository.fns(context.kysely);
    const driverScheduleRepo = DriverScheduleRepository.fns(context.kysely);

    const result = await driverRepo.update(input.id, input.value);

    const schedules = await driverScheduleRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [{ column: "driverId", operator: "in", value: [result.id] }],
    });

    return {
      ...result,
      schedules,
    };
  });

export const RemoveDriver = implement(contracts.RemoveDriverContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverRepo = DriverRepository.fns(context.kysely);
    return await driverRepo.remove(input);
  });

export const InsertDriverSchedule = implement(
  contracts.InsertDriverScheduleContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverRepo = DriverRepository.fns(context.kysely);
    const driverScheduleRepo = DriverScheduleRepository.fns(context.kysely);

    const driverSchedule = await driverScheduleRepo.insert(input);
    const result = await driverRepo.find(driverSchedule.driverId);

    const schedules = await driverScheduleRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: "driverId", operator: "in", value: [result.id] }],
    });

    return {
      ...result,
      schedules,
    };
  });

export const InsertManyDriverSchedule = implement(
  contracts.InsertManyDriverScheduleContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverRepo = DriverRepository.fns(context.kysely);
    const driverScheduleRepo = DriverScheduleRepository.fns(context.kysely);

    const driverSchedules = await driverScheduleRepo.insertMany(input);
    const driverIds = [...new Set(driverSchedules.map((ds) => ds.driverId))];
    const result = await driverRepo.any(driverIds);

    const allSchedules = await driverScheduleRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: "driverId", operator: "in", value: driverIds }],
    });

    return result.map((driver) => ({
      ...driver,
      schedules: allSchedules.filter(
        (schedule) => schedule.driverId === driver.id
      ),
    }));
  });

export const UpdateDriverSchedule = implement(
  contracts.UpdateDriverScheduleContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverRepo = DriverRepository.fns(context.kysely);
    const driverScheduleRepo = DriverScheduleRepository.fns(context.kysely);

    const driverSchedule = await driverScheduleRepo.update(
      input.id,
      input.value
    );
    const result = await driverRepo.find(driverSchedule.driverId);

    const schedules = await driverScheduleRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: "driverId", operator: "in", value: [result.id] }],
    });

    return {
      ...result,
      schedules,
    };
  });

export const RemoveDriverSchedule = implement(
  contracts.RemoveDriverScheduleContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const driverScheduleRepo = DriverScheduleRepository.fns(context.kysely);
    return await driverScheduleRepo.remove(input);
  });
