import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import { billingDocumentSchema } from '@/schemas/billing/document';

export const uploadAttachmentContract = oc
  .input(
    billingDocumentSchema
      .pick({ recordId: true, recordType: true })
      .required()
      .extend({ file: z.file() }),
  )
  .output(billingDocumentSchema);

export const downloadAttachmentContract = oc
  .input(
    billingDocumentSchema
      .pick({
        recordId: true,
        recordType: true,
        fileName: true,
      })
      .required(),
  )
  .output(z.instanceof(File));

export const showAttachmentMetadataContract = oc
  .input(
    billingDocumentSchema
      .pick({
        recordId: true,
        recordType: true,
        fileName: true,
      })
      .required(),
  )
  .output(billingDocumentSchema);

export const deleteAttachmentContract = oc
  .input(
    billingDocumentSchema
      .pick({
        recordId: true,
        recordType: true,
        fileName: true,
      })
      .required(),
  )
  .output(z.instanceof(DeleteResult));
