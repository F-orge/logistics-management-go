import { oc } from '@orpc/contract'
import { DeliveryTaskRepository, TaskEventRepository } from '@packages/db/repositories/dms'
import { DeliveryRouteSchema } from '@packages/db/schemas/dms/delivery_route'
import { DeliveryTaskSchema } from '@packages/db/schemas/dms/delivery_task'
import { TaskEventSchema } from '@packages/db/schemas/dms/task_event'
import { PackageSchema } from '@packages/db/schemas/wms/package'
import { PackageItemSchema } from '@packages/db/schemas/wms/package_item'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = DeliveryTaskSchema.extend({
  deliveryRoute: DeliveryRouteSchema,
  package: PackageSchema.extend(z.object({ items: PackageItemSchema.array() })),
  events: TaskEventSchema.array(),
})

export const PaginateDeliveryTaskContract = oc
  .input(DeliveryTaskRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeDeliveryTaskContract = oc
  .input(DeliveryTaskRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyDeliveryTaskContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertDeliveryTaskContract = oc
  .input(DeliveryTaskRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyDeliveryTaskContract = oc
  .input(DeliveryTaskRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateDeliveryTaskContract = oc
  .input(z.object({ id: z.uuid(), value: DeliveryTaskRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveDeliveryTaskContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))

export const InsertTaskEventContract = oc
  .input(TaskEventRepository.schemas.InsertSchema)
  .output(TaskEventSchema)

export const InsertManyTaskEventContract = oc
  .input(TaskEventRepository.schemas.InsertSchema.array())
  .output(TaskEventSchema.array())

export const UpdateTaskEventContract = oc
  .input(z.object({ id: z.uuid(), value: TaskEventRepository.schemas.UpdateSchema }))
  .output(TaskEventSchema)

export const RemoveTaskEventContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
