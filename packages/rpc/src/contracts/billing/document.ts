import { oc } from "@orpc/contract";
import { DocumentRepository } from "@packages/db/repositories/billing";
import { DocumentSchema } from "@packages/db/schemas/billing/document";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateDocumentContract = oc.input(DocumentRepository.schemas.paginateOptionSchema).output(DocumentSchema.array());

export const RangeDocumentContract = oc.input(DocumentRepository.schemas.rangeOptionSchema).output(DocumentSchema.array());

export const AnyDocumentContract = oc.input(z.uuid().array()).output(DocumentSchema.array());

export const InsertDocumentContract = oc.input(DocumentRepository.schemas.InsertSchema).output(DocumentSchema);

export const InsertManyDocumentContract = oc.input(DocumentRepository.schemas.InsertSchema.array()).output(DocumentSchema.array());

export const UpdateDocumentContract = oc.input(z.object({id: z.uuid(), value: DocumentRepository.schemas.UpdateSchema})).output(DocumentSchema);

export const RemoveDocumentContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
