import { implement } from '@orpc/server'
import { ZodError } from 'zod'
import * as dmsContracts from '@/orpc/contracts/dms/delivery_task'
import { DeliveryTaskRepository } from '@/repositories/dms/deliveryTasks'
import type { HonoVariables } from '@/server'

export const paginateDeliveryTask = implement(dmsContracts.paginateDeliveryTaskContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DeliveryTaskRepository(context.db)

    return await repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute()
  })

export const rangeDeliveryTask = implement(dmsContracts.rangeDeliveryTaskContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DeliveryTaskRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inDeliveryTask = implement(dmsContracts.inDeliveryTaskContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DeliveryTaskRepository(context.db)

    return repo.in(input).execute()
  })

export const createDeliveryTask = implement(dmsContracts.createDeliveryTaskContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DeliveryTaskRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateDeliveryTask = implement(dmsContracts.updateDeliveryTaskContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DeliveryTaskRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteDeliveryTask = implement(dmsContracts.deleteDeliveryTaskContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DeliveryTaskRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
