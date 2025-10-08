import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import { crmAttachmentSchema } from '@/schemas/crm/attachments';

export const uploadAttachmentContract = oc
  .input(
    crmAttachmentSchema
      .pick({ recordId: true, recordType: true })
      .extend({ file: z.file() }),
  )
  .output(crmAttachmentSchema);

export const downloadAttachmentContract = oc
  .input(crmAttachmentSchema.pick({ recordId: true, recordType: true }))
  .output(z.instanceof(File));

export const showAttachmentMetadataContract = oc
  .input(crmAttachmentSchema.pick({ recordId: true, recordType: true }))
  .output(crmAttachmentSchema);

export const deleteAttachmentContract = oc
  .input(crmAttachmentSchema.pick({ recordId: true, recordType: true }))
  .output(z.instanceof(DeleteResult));
