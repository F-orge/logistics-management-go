import { implement } from "@orpc/server";
import {
  DeliveryRouteRepository,
  DeliveryTaskRepository,
  TaskEventRepository,
} from "@packages/db/repositories/dms";
import {
  PackageRepository,
  PackageItemRepository,
} from "@packages/db/repositories/wms";
import * as contracts from "@/contracts/dms/delivery_tasks";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";

export const PaginateDeliveryTask = implement(
  contracts.PaginateDeliveryTaskContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const packageRepo = PackageRepository.fns(context.kysely);
    const packageItemRepo = PackageItemRepository.fns(context.kysely);
    const taskEventRepo = TaskEventRepository.fns(context.kysely);

    const result = await deliveryTaskRepo.paginate(input);

    const [deliveryRoutes, packages, packageItems, taskEvents] =
      await Promise.all([
        deliveryRouteRepo.any(
          result.map((row) => row.deliveryRouteId).filter(nonEmpty)
        ),
        packageRepo.any(result.map((row) => row.packageId).filter(nonEmpty)),
        packageItemRepo.paginate({
          page: 1,
          perPage: 1000,
          filters: [
            {
              column: "packageId",
              operator: "in",
              value: result.map((row) => row.packageId),
            },
          ],
        }),
        taskEventRepo.paginate({
          page: 1,
          perPage: 1000,
          filters: [
            {
              column: "deliveryTaskId",
              operator: "in",
              value: result.map((row) => row.id),
            },
          ],
        }),
      ]);

    return result.map((row) => ({
      ...row,
      deliveryRoute: deliveryRoutes.find(
        (dr) => dr.id === row.deliveryRouteId
      )!,
      package: {
        ...packages.find((p) => p.id === row.packageId)!,
        items: packageItems.filter((pi) => pi.packageId === row.packageId),
      },
      events: taskEvents.filter((te) => te.deliveryTaskId === row.id),
    }));
  });

export const RangeDeliveryTask = implement(contracts.RangeDeliveryTaskContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const packageRepo = PackageRepository.fns(context.kysely);
    const packageItemRepo = PackageItemRepository.fns(context.kysely);
    const taskEventRepo = TaskEventRepository.fns(context.kysely);

    const result = await deliveryTaskRepo.range(input);

    const [deliveryRoutes, packages, packageItems, taskEvents] =
      await Promise.all([
        deliveryRouteRepo.any(
          result.map((row) => row.deliveryRouteId).filter(nonEmpty)
        ),
        packageRepo.any(result.map((row) => row.packageId).filter(nonEmpty)),
        packageItemRepo.paginate({
          page: 1,
          perPage: 1000,
          filters: [
            {
              column: "packageId",
              operator: "in",
              value: result.map((row) => row.packageId),
            },
          ],
        }),
        taskEventRepo.paginate({
          page: 1,
          perPage: 1000,
          filters: [
            {
              column: "deliveryTaskId",
              operator: "in",
              value: result.map((row) => row.id),
            },
          ],
        }),
      ]);

    return result.map((row) => ({
      ...row,
      deliveryRoute: deliveryRoutes.find(
        (dr) => dr.id === row.deliveryRouteId
      )!,
      package: {
        ...packages.find((p) => p.id === row.packageId)!,
        items: packageItems.filter((pi) => pi.packageId === row.packageId),
      },
      events: taskEvents.filter((te) => te.deliveryTaskId === row.id),
    }));
  });

export const AnyDeliveryTask = implement(contracts.AnyDeliveryTaskContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const packageRepo = PackageRepository.fns(context.kysely);
    const packageItemRepo = PackageItemRepository.fns(context.kysely);
    const taskEventRepo = TaskEventRepository.fns(context.kysely);

    const result = await deliveryTaskRepo.any(input);

    const [deliveryRoutes, packages, packageItems, taskEvents] =
      await Promise.all([
        deliveryRouteRepo.any(
          result.map((row) => row.deliveryRouteId).filter(nonEmpty)
        ),
        packageRepo.any(result.map((row) => row.packageId).filter(nonEmpty)),
        packageItemRepo.paginate({
          page: 1,
          perPage: 1000,
          filters: [
            {
              column: "packageId",
              operator: "in",
              value: result.map((row) => row.packageId),
            },
          ],
        }),
        taskEventRepo.paginate({
          page: 1,
          perPage: 1000,
          filters: [
            {
              column: "deliveryTaskId",
              operator: "in",
              value: result.map((row) => row.id),
            },
          ],
        }),
      ]);

    return result.map((row) => ({
      ...row,
      deliveryRoute: deliveryRoutes.find(
        (dr) => dr.id === row.deliveryRouteId
      )!,
      package: {
        ...packages.find((p) => p.id === row.packageId)!,
        items: packageItems.filter((pi) => pi.packageId === row.packageId),
      },
      events: taskEvents.filter((te) => te.deliveryTaskId === row.id),
    }));
  });

export const InsertDeliveryTask = implement(
  contracts.InsertDeliveryTaskContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const packageRepo = PackageRepository.fns(context.kysely);
    const packageItemRepo = PackageItemRepository.fns(context.kysely);
    const taskEventRepo = TaskEventRepository.fns(context.kysely);

    const result = await deliveryTaskRepo.insert(input);

    const [deliveryRoute, pkg, packageItems, taskEvents] = await Promise.all([
      deliveryRouteRepo.find(result.deliveryRouteId),
      packageRepo.find(result.packageId),
      packageItemRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [
          { column: "packageId", operator: "=", value: result.packageId },
        ],
      }),
      taskEventRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [
          { column: "deliveryTaskId", operator: "=", value: result.id },
        ],
      }),
    ]);

    return {
      ...result,
      deliveryRoute: deliveryRoute!,
      package: {
        ...pkg!,
        items: packageItems,
      },
      events: taskEvents,
    };
  });

export const InsertManyDeliveryTask = implement(
  contracts.InsertManyDeliveryTaskContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const packageRepo = PackageRepository.fns(context.kysely);
    const packageItemRepo = PackageItemRepository.fns(context.kysely);
    const taskEventRepo = TaskEventRepository.fns(context.kysely);

    const result = await deliveryTaskRepo.insertMany(input);

    const [deliveryRoutes, packages, packageItems, taskEvents] =
      await Promise.all([
        deliveryRouteRepo.any(
          result.map((row) => row.deliveryRouteId).filter(nonEmpty)
        ),
        packageRepo.any(result.map((row) => row.packageId).filter(nonEmpty)),
        packageItemRepo.paginate({
          page: 1,
          perPage: 1000,
          filters: [
            {
              column: "packageId",
              operator: "in",
              value: result.map((row) => row.packageId),
            },
          ],
        }),
        taskEventRepo.paginate({
          page: 1,
          perPage: 1000,
          filters: [
            {
              column: "deliveryTaskId",
              operator: "in",
              value: result.map((row) => row.id),
            },
          ],
        }),
      ]);

    return result.map((row) => ({
      ...row,
      deliveryRoute: deliveryRoutes.find(
        (dr) => dr.id === row.deliveryRouteId
      )!,
      package: {
        ...packages.find((p) => p.id === row.packageId)!,
        items: packageItems.filter((pi) => pi.packageId === row.packageId),
      },
      events: taskEvents.filter((te) => te.deliveryTaskId === row.id),
    }));
  });

export const UpdateDeliveryTask = implement(
  contracts.UpdateDeliveryTaskContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const packageRepo = PackageRepository.fns(context.kysely);
    const packageItemRepo = PackageItemRepository.fns(context.kysely);
    const taskEventRepo = TaskEventRepository.fns(context.kysely);

    const result = await deliveryTaskRepo.update(input.id, input.value);

    const [deliveryRoute, pkg, packageItems, taskEvents] = await Promise.all([
      deliveryRouteRepo.find(result.deliveryRouteId),
      packageRepo.find(result.packageId),
      packageItemRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [
          { column: "packageId", operator: "=", value: result.packageId },
        ],
      }),
      taskEventRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [
          { column: "deliveryTaskId", operator: "=", value: result.id },
        ],
      }),
    ]);

    return {
      ...result,
      deliveryRoute: deliveryRoute!,
      package: {
        ...pkg!,
        items: packageItems,
      },
      events: taskEvents,
    };
  });

export const RemoveDeliveryTask = implement(
  contracts.RemoveDeliveryTaskContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);
    const result = await deliveryTaskRepo.remove(input);
    return result;
  });

export const InsertTaskEvent = implement(contracts.InsertTaskEventContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const packageRepo = PackageRepository.fns(context.kysely);
    const packageItemRepo = PackageItemRepository.fns(context.kysely);
    const taskEventRepo = TaskEventRepository.fns(context.kysely);

    const taskEvent = await taskEventRepo.insert(input);
    const result = await deliveryTaskRepo.find(taskEvent.deliveryTaskId);

    const [deliveryRoute, pkg, packageItems, taskEvents] = await Promise.all([
      deliveryRouteRepo.find(result.deliveryRouteId),
      packageRepo.find(result.packageId),
      packageItemRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [
          { column: "packageId", operator: "=", value: result.packageId },
        ],
      }),
      taskEventRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [
          { column: "deliveryTaskId", operator: "=", value: result.id },
        ],
      }),
    ]);

    return {
      ...result,
      deliveryRoute: deliveryRoute!,
      package: {
        ...pkg!,
        items: packageItems,
      },
      events: taskEvents,
    };
  });

export const InsertManyTaskEvent = implement(
  contracts.InsertManyTaskEventContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const packageRepo = PackageRepository.fns(context.kysely);
    const packageItemRepo = PackageItemRepository.fns(context.kysely);
    const taskEventRepo = TaskEventRepository.fns(context.kysely);

    const taskEvents = await taskEventRepo.insertMany(input);
    const deliveryTaskIds = taskEvents
      .map((te) => te.deliveryTaskId)
      .filter(nonEmpty);
    const uniqueDeliveryTaskIds = [...new Set(deliveryTaskIds)];
    const result = await deliveryTaskRepo.any(uniqueDeliveryTaskIds);

    const [deliveryRoutes, packages, packageItems, allTaskEvents] =
      await Promise.all([
        deliveryRouteRepo.any(
          result.map((row) => row.deliveryRouteId).filter(nonEmpty)
        ),
        packageRepo.any(result.map((row) => row.packageId).filter(nonEmpty)),
        packageItemRepo.paginate({
          page: 1,
          perPage: 1000,
          filters: [
            {
              column: "packageId",
              operator: "in",
              value: result.map((row) => row.packageId),
            },
          ],
        }),
        taskEventRepo.paginate({
          page: 1,
          perPage: 1000,
          filters: [
            {
              column: "deliveryTaskId",
              operator: "in",
              value: result.map((row) => row.id),
            },
          ],
        }),
      ]);

    return result.map((row) => ({
      ...row,
      deliveryRoute: deliveryRoutes.find(
        (dr) => dr.id === row.deliveryRouteId
      )!,
      package: {
        ...packages.find((p) => p.id === row.packageId)!,
        items: packageItems.filter((pi) => pi.packageId === row.packageId),
      },
      events: allTaskEvents.filter((te) => te.deliveryTaskId === row.id),
    }));
  });

export const UpdateTaskEvent = implement(contracts.UpdateTaskEventContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);
    const deliveryRouteRepo = DeliveryRouteRepository.fns(context.kysely);
    const packageRepo = PackageRepository.fns(context.kysely);
    const packageItemRepo = PackageItemRepository.fns(context.kysely);
    const taskEventRepo = TaskEventRepository.fns(context.kysely);

    const taskEvent = await taskEventRepo.update(input.id, input.value);
    const result = await deliveryTaskRepo.find(taskEvent.deliveryTaskId);

    const [deliveryRoute, pkg, packageItems, taskEvents] = await Promise.all([
      deliveryRouteRepo.find(result.deliveryRouteId),
      packageRepo.find(result.packageId),
      packageItemRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [
          { column: "packageId", operator: "=", value: result.packageId },
        ],
      }),
      taskEventRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [
          { column: "deliveryTaskId", operator: "=", value: result.id },
        ],
      }),
    ]);

    return {
      ...result,
      deliveryRoute: deliveryRoute!,
      package: {
        ...pkg!,
        items: packageItems,
      },
      events: taskEvents,
    };
  });

export const RemoveTaskEvent = implement(contracts.RemoveTaskEventContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);

    const result = await deliveryTaskRepo.remove(input);

    return result;
  });
