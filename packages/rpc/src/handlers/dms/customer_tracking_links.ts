import { implement } from "@orpc/server";
import {
  CustomerTrackingLinkRepository,
  DeliveryTaskRepository,
} from "@packages/db/repositories/dms";
import * as contracts from "@/contracts/dms/customer_tracking_links";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";

export const PaginateCustomerTrackingLink = implement(
  contracts.PaginateCustomerTrackingLinkContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const customerTrackingLinkRepo = CustomerTrackingLinkRepository.fns(
      context.kysely
    );
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);

    const result = await customerTrackingLinkRepo.paginate(input);

    const deliveryTasks = await deliveryTaskRepo.any(
      result.map((row) => row.deliveryTaskId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      deliveryTask: deliveryTasks.find((dt) => dt.id === row.deliveryTaskId)!,
    }));
  });

export const RangeCustomerTrackingLink = implement(
  contracts.RangeCustomerTrackingLinkContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const customerTrackingLinkRepo = CustomerTrackingLinkRepository.fns(
      context.kysely
    );
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);

    const result = await customerTrackingLinkRepo.range(input);

    const deliveryTasks = await deliveryTaskRepo.any(
      result.map((row) => row.deliveryTaskId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      deliveryTask: deliveryTasks.find((dt) => dt.id === row.deliveryTaskId)!,
    }));
  });

export const AnyCustomerTrackingLink = implement(
  contracts.AnyCustomerTrackingLinkContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const customerTrackingLinkRepo = CustomerTrackingLinkRepository.fns(
      context.kysely
    );
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);

    const result = await customerTrackingLinkRepo.any(input);

    const deliveryTasks = await deliveryTaskRepo.any(
      result.map((row) => row.deliveryTaskId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      deliveryTask: deliveryTasks.find((dt) => dt.id === row.deliveryTaskId)!,
    }));
  });

export const InsertCustomerTrackingLink = implement(
  contracts.InsertCustomerTrackingLinkContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const customerTrackingLinkRepo = CustomerTrackingLinkRepository.fns(
      context.kysely
    );
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);

    const result = await customerTrackingLinkRepo.insert(input);

    const deliveryTask = await deliveryTaskRepo.find(result.deliveryTaskId);

    return {
      ...result,
      deliveryTask: deliveryTask!,
    };
  });

export const InsertManyCustomerTrackingLink = implement(
  contracts.InsertManyCustomerTrackingLinkContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const customerTrackingLinkRepo = CustomerTrackingLinkRepository.fns(
      context.kysely
    );
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);

    const result = await customerTrackingLinkRepo.insertMany(input);

    const deliveryTasks = await deliveryTaskRepo.any(
      result.map((row) => row.deliveryTaskId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      deliveryTask: deliveryTasks.find((dt) => dt.id === row.deliveryTaskId)!,
    }));
  });

export const UpdateCustomerTrackingLink = implement(
  contracts.UpdateCustomerTrackingLinkContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const customerTrackingLinkRepo = CustomerTrackingLinkRepository.fns(
      context.kysely
    );
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);

    const result = await customerTrackingLinkRepo.update(input.id, input.value);

    const deliveryTask = await deliveryTaskRepo.find(result.deliveryTaskId);

    return {
      ...result,
      deliveryTask: deliveryTask!,
    };
  });

export const RemoveCustomerTrackingLink = implement(
  contracts.RemoveCustomerTrackingLinkContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const customerTrackingLinkRepo = CustomerTrackingLinkRepository.fns(
      context.kysely
    );

    const result = await customerTrackingLinkRepo.remove(input);

    return result;
  });
