import { oc } from "@orpc/contract";
import { NotificationRepository } from "@packages/db/repositories/crm";
import { UserSchema } from "@packages/db/schemas/auth/user";
import { NotificationSchema } from "@packages/db/schemas/crm/notifications";
import { DeleteResult } from "kysely";
import z from "zod";

export const OutputSchema = NotificationSchema.extend({
  user:UserSchema
})

export const PaginateNotificationContract = oc.input(NotificationRepository.schemas.paginateOptionSchema).output(OutputSchema.array());

export const RangeNotificationContract = oc.input(NotificationRepository.schemas.rangeOptionSchema).output(OutputSchema.array());

export const AnyNotificationContract = oc.input(z.uuid().array()).output(OutputSchema.array());

export const InsertNotificationContract = oc.input(NotificationRepository.schemas.InsertSchema).output(OutputSchema);

export const InsertManyNotificationContract = oc.input(NotificationRepository.schemas.InsertSchema.array()).output(OutputSchema.array());

export const UpdateNotificationContract = oc.input(z.object({id: z.uuid(), value: NotificationRepository.schemas.UpdateSchema})).output(OutputSchema);

export const RemoveNotificationContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
