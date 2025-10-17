import { implement } from "@orpc/server";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";
import * as contracts from "@packages/rpc/contracts/tms/shipment_leg";
import {
  CarrierRepository,
  ShipmentLegEventRepository,
  ShipmentLegRepository,
  TripRepository,
} from "@packages/db/repositories/tms";

export const PaginateShipmentLeg = implement(
  contracts.PaginateShipmentLegContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const shipmentLegRepo = ShipmentLegRepository.fns(context.kysely);
    const shipmentLegEventRepo = ShipmentLegEventRepository.fns(context.kysely);
    const carrierRepo = CarrierRepository.fns(context.kysely);
    const tripRepo = TripRepository.fns(context.kysely);

    const result = await shipmentLegRepo.paginate(input);
    if (result.length === 0) {
      return [];
    }

    const [carriers, trips, events] = await Promise.all([
      carrierRepo.any(result.map((row) => row.carrierId).filter(nonEmpty)),
      tripRepo.any(result.map((row) => row.internalTripId).filter(nonEmpty)),
      shipmentLegEventRepo.paginate({
        page: 1,
        perPage: 1000, // TODO: make this configurable
        filters: [
          {
            column: "shipmentLegId",
            operator: "in",
            value: result.map((row) => row.id),
          },
        ],
      }),
    ]);

    return result.map((row) => ({
      ...row,
      carrier: carriers.find((c) => c.id === row.carrierId),
      internalTrip: trips.find((t) => t.id === row.internalTripId),
      events: events.filter((e) => e.shipmentLegId === row.id),
    }));
  });

export const RangeShipmentLeg = implement(contracts.RangeShipmentLegContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const shipmentLegRepo = ShipmentLegRepository.fns(context.kysely);
    const shipmentLegEventRepo = ShipmentLegEventRepository.fns(context.kysely);
    const carrierRepo = CarrierRepository.fns(context.kysely);
    const tripRepo = TripRepository.fns(context.kysely);

    const result = await shipmentLegRepo.range(input);
    if (result.length === 0) {
      return [];
    }

    const [carriers, trips, events] = await Promise.all([
      carrierRepo.any(result.map((row) => row.carrierId).filter(nonEmpty)),
      tripRepo.any(result.map((row) => row.internalTripId).filter(nonEmpty)),
      shipmentLegEventRepo.paginate({
        page: 1,
        perPage: 1000, // TODO: make this configurable
        filters: [
          {
            column: "shipmentLegId",
            operator: "in",
            value: result.map((row) => row.id),
          },
        ],
      }),
    ]);

    return result.map((row) => ({
      ...row,
      carrier: carriers.find((c) => c.id === row.carrierId),
      internalTrip: trips.find((t) => t.id === row.internalTripId),
      events: events.filter((e) => e.shipmentLegId === row.id),
    }));
  });

export const AnyShipmentLeg = implement(contracts.AnyShipmentLegContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const shipmentLegRepo = ShipmentLegRepository.fns(context.kysely);
    const shipmentLegEventRepo = ShipmentLegEventRepository.fns(context.kysely);
    const carrierRepo = CarrierRepository.fns(context.kysely);
    const tripRepo = TripRepository.fns(context.kysely);

    const result = await shipmentLegRepo.any(input);
    if (result.length === 0) {
      return [];
    }

    const [carriers, trips, events] = await Promise.all([
      carrierRepo.any(result.map((row) => row.carrierId).filter(nonEmpty)),
      tripRepo.any(result.map((row) => row.internalTripId).filter(nonEmpty)),
      shipmentLegEventRepo.paginate({
        page: 1,
        perPage: 1000, // TODO: make this configurable
        filters: [
          {
            column: "shipmentLegId",
            operator: "in",
            value: result.map((row) => row.id),
          },
        ],
      }),
    ]);

    return result.map((row) => ({
      ...row,
      carrier: carriers.find((c) => c.id === row.carrierId),
      internalTrip: trips.find((t) => t.id === row.internalTripId),
      events: events.filter((e) => e.shipmentLegId === row.id),
    }));
  });

export const InsertShipmentLeg = implement(contracts.InsertShipmentLegContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const shipmentLegRepo = ShipmentLegRepository.fns(context.kysely);
    const result = await shipmentLegRepo.insert(input);

    const [carrier, trip] = await Promise.all([
      result.carrierId
        ? CarrierRepository.fns(context.kysely).find(result.carrierId)
        : undefined,
      result.internalTripId
        ? TripRepository.fns(context.kysely).find(result.internalTripId)
        : undefined,
    ]);

    return {
      ...result,
      carrier,
      internalTrip: trip,
      events: [],
    };
  });

export const InsertManyShipmentLeg = implement(
  contracts.InsertManyShipmentLegContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const shipmentLegRepo = ShipmentLegRepository.fns(context.kysely);
    const result = await shipmentLegRepo.insertMany(input);

    const [carriers, trips] = await Promise.all([
      CarrierRepository.fns(context.kysely).any(
        result.map((r) => r.carrierId).filter(nonEmpty)
      ),
      TripRepository.fns(context.kysely).any(
        result.map((r) => r.internalTripId).filter(nonEmpty)
      ),
    ]);

    return result.map((row) => ({
      ...row,
      carrier: carriers.find((c) => c.id === row.carrierId),
      internalTrip: trips.find((t) => t.id === row.internalTripId),
      events: [],
    }));
  });

export const UpdateShipmentLeg = implement(contracts.UpdateShipmentLegContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const shipmentLegRepo = ShipmentLegRepository.fns(context.kysely);
    const result = await shipmentLegRepo.update(input.id, input.value);

    const [carrier, trip, events] = await Promise.all([
      result.carrierId
        ? CarrierRepository.fns(context.kysely).find(result.carrierId)
        : undefined,
      result.internalTripId
        ? TripRepository.fns(context.kysely).find(result.internalTripId)
        : undefined,
      ShipmentLegEventRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [
          { column: "shipmentLegId", operator: "in", value: [result.id] },
        ],
      }),
    ]);

    return {
      ...result,
      carrier,
      internalTrip: trip,
      events,
    };
  });

export const RemoveShipmentLeg = implement(contracts.RemoveShipmentLegContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const shipmentLegRepo = ShipmentLegRepository.fns(context.kysely);
    return await shipmentLegRepo.remove(input);
  });

export const InsertShipmentLegEvent = implement(
  contracts.InsertShipmentLegEventContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const shipmentLegRepo = ShipmentLegRepository.fns(context.kysely);
    const shipmentLegEventRepo = ShipmentLegEventRepository.fns(context.kysely);

    const newEvent = await shipmentLegEventRepo.insert(input);
    const result = await shipmentLegRepo.find(newEvent.shipmentLegId);

    const [carrier, trip, events] = await Promise.all([
      result.carrierId
        ? CarrierRepository.fns(context.kysely).find(result.carrierId)
        : undefined,
      result.internalTripId
        ? TripRepository.fns(context.kysely).find(result.internalTripId)
        : undefined,
      ShipmentLegEventRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [
          { column: "shipmentLegId", operator: "in", value: [result.id] },
        ],
      }),
    ]);

    return {
      ...result,
      carrier,
      internalTrip: trip,
      events,
    };
  });

export const InsertManyShipmentLegEvent = implement(
  contracts.InsertManyShipmentLegEventContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const shipmentLegRepo = ShipmentLegRepository.fns(context.kysely);
    const shipmentLegEventRepo = ShipmentLegEventRepository.fns(context.kysely);

    const newEvents = await shipmentLegEventRepo.insertMany(input);
    const legIds = [...new Set(newEvents.map((e) => e.shipmentLegId))];
    const result = await shipmentLegRepo.any(legIds);

    const [carriers, trips, allEvents] = await Promise.all([
      CarrierRepository.fns(context.kysely).any(
        result.map((r) => r.carrierId).filter(nonEmpty)
      ),
      TripRepository.fns(context.kysely).any(
        result.map((r) => r.internalTripId).filter(nonEmpty)
      ),
      shipmentLegEventRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [{ column: "shipmentLegId", operator: "in", value: legIds }],
      }),
    ]);

    return result.map((row) => ({
      ...row,
      carrier: carriers.find((c) => c.id === row.carrierId),
      internalTrip: trips.find((t) => t.id === row.internalTripId),
      events: allEvents.filter((e) => e.shipmentLegId === row.id),
    }));
  });

export const UpdateShipmentLegEvent = implement(
  contracts.UpdateShipmentLegEventContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const shipmentLegRepo = ShipmentLegRepository.fns(context.kysely);
    const shipmentLegEventRepo = ShipmentLegEventRepository.fns(context.kysely);

    const updatedEvent = await shipmentLegEventRepo.update(
      input.id,
      input.value
    );
    const result = await shipmentLegRepo.find(updatedEvent.shipmentLegId);

    const [carrier, trip, events] = await Promise.all([
      result.carrierId
        ? CarrierRepository.fns(context.kysely).find(result.carrierId)
        : undefined,
      result.internalTripId
        ? TripRepository.fns(context.kysely).find(result.internalTripId)
        : undefined,
      ShipmentLegEventRepository.fns(context.kysely).paginate({
        page: 1,
        perPage: 1000,
        filters: [
          { column: "shipmentLegId", operator: "in", value: [result.id] },
        ],
      }),
    ]);

    return {
      ...result,
      carrier,
      internalTrip: trip,
      events,
    };
  });

export const RemoveShipmentLegEvent = implement(
  contracts.RemoveShipmentLegEventContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const shipmentLegEventRepo = ShipmentLegEventRepository.fns(context.kysely);
    return await shipmentLegEventRepo.remove(input);
  });
