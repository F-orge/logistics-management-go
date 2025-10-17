import { implement } from "@orpc/server";
import {
  ProofOfDeliveryRepository,
  DeliveryTaskRepository,
} from "@packages/db/repositories/dms";
import * as contracts from "@/contracts/dms/proof_of_deliveries";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";

export const PaginateProofOfDelivery = implement(
  contracts.PaginateProofOfDeliveryContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const proofOfDeliveryRepo = ProofOfDeliveryRepository.fns(context.kysely);
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);

    const result = await proofOfDeliveryRepo.paginate(input);

    const deliveryTasks = await deliveryTaskRepo.any(
      result.map((row) => row.deliveryTaskId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      deliveryTask: deliveryTasks.find((dt) => dt.id === row.deliveryTaskId)!,
    }));
  });

export const RangeProofOfDelivery = implement(
  contracts.RangeProofOfDeliveryContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const proofOfDeliveryRepo = ProofOfDeliveryRepository.fns(context.kysely);
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);

    const result = await proofOfDeliveryRepo.range(input);

    const deliveryTasks = await deliveryTaskRepo.any(
      result.map((row) => row.deliveryTaskId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      deliveryTask: deliveryTasks.find((dt) => dt.id === row.deliveryTaskId)!,
    }));
  });

export const AnyProofOfDelivery = implement(
  contracts.AnyProofOfDeliveryContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const proofOfDeliveryRepo = ProofOfDeliveryRepository.fns(context.kysely);
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);

    const result = await proofOfDeliveryRepo.any(input);

    const deliveryTasks = await deliveryTaskRepo.any(
      result.map((row) => row.deliveryTaskId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      deliveryTask: deliveryTasks.find((dt) => dt.id === row.deliveryTaskId)!,
    }));
  });

export const InsertProofOfDelivery = implement(
  contracts.InsertProofOfDeliveryContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const proofOfDeliveryRepo = ProofOfDeliveryRepository.fns(context.kysely);
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);

    const result = await proofOfDeliveryRepo.insert(input);

    const deliveryTask = await deliveryTaskRepo.find(result.deliveryTaskId);

    return {
      ...result,
      deliveryTask: deliveryTask!,
    };
  });

export const InsertManyProofOfDelivery = implement(
  contracts.InsertManyProofOfDeliveryContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const proofOfDeliveryRepo = ProofOfDeliveryRepository.fns(context.kysely);
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);

    const result = await proofOfDeliveryRepo.insertMany(input);

    const deliveryTasks = await deliveryTaskRepo.any(
      result.map((row) => row.deliveryTaskId).filter(nonEmpty)
    );

    return result.map((row) => ({
      ...row,
      deliveryTask: deliveryTasks.find((dt) => dt.id === row.deliveryTaskId)!,
    }));
  });

export const UpdateProofOfDelivery = implement(
  contracts.UpdateProofOfDeliveryContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const proofOfDeliveryRepo = ProofOfDeliveryRepository.fns(context.kysely);
    const deliveryTaskRepo = DeliveryTaskRepository.fns(context.kysely);

    const result = await proofOfDeliveryRepo.update(input.id, input.value);

    const deliveryTask = await deliveryTaskRepo.find(result.deliveryTaskId);

    return {
      ...result,
      deliveryTask: deliveryTask!,
    };
  });

export const RemoveProofOfDelivery = implement(
  contracts.RemoveProofOfDeliveryContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const proofOfDeliveryRepo = ProofOfDeliveryRepository.fns(context.kysely);

    const result = await proofOfDeliveryRepo.remove(input);

    return result;
  });
