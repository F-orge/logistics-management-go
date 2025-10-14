import { oc } from "@orpc/contract";
import { AttachmentRepository } from "@packages/db/repositories/crm";
import { AttachmentSchema } from "@packages/db/schemas/crm/attachments";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateAttachmentContract = oc.input(AttachmentRepository.schemas.paginateOptionSchema).output(AttachmentSchema.array());

export const RangeAttachmentContract = oc.input(AttachmentRepository.schemas.rangeOptionSchema).output(AttachmentSchema.array());

export const AnyAttachmentContract = oc.input(z.uuid().array()).output(AttachmentSchema.array());

export const InsertAttachmentContract = oc.input(AttachmentRepository.schemas.InsertSchema).output(AttachmentSchema);

export const InsertManyAttachmentContract = oc.input(AttachmentRepository.schemas.InsertSchema.array()).output(AttachmentSchema.array());

export const UpdateAttachmentContract = oc.input(z.object({id: z.uuid(), value: AttachmentRepository.schemas.UpdateSchema})).output(AttachmentSchema);

export const RemoveAttachmentContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
