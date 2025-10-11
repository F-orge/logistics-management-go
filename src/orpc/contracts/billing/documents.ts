import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import { billingDocumentSchema } from '@/schemas/billing/document';

export const uploadDocumentContract = oc
  .input(
    billingDocumentSchema
      .pick({ recordId: true, recordType: true, documentType: true })
      .required()
      .extend({ file: z.file() }),
  )
  .output(billingDocumentSchema);

export const downloadDocumentContract = oc
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

export const showDocumentMetadataContract = oc
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

export const deleteDocumentContract = oc
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
