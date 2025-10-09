import { implement } from '@orpc/server';
import * as crmSchema from '@/orpc/contracts/crm';
import { HonoVariables } from '@/server';
import { AttachmentRepository } from '@/repositories/crm/attachments';

export const uploadAttachment = implement(crmSchema.uploadAttachmentContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new AttachmentRepository(context.db);

    // get the metadata
    const fileName = input.file.name;
    const mimeType = input.file.type;

    const result = await repo
      .create({
        fileName,
        mimeType,
        recordId: input.recordId,
        recordType: input.recordType,
        filePath: '',
      })
      .executeTakeFirstOrThrow();

    if (!result.recordId || !result.recordType)
      throw new Error('Unable to save file record id must be present');

    const size = await context.storage.save(
      result.recordId,
      result.recordType,
      input.file,
    );

    if (input.file.size !== size) throw new Error('File size mismatch');

    return result;
  });

export const downloadAttachment = implement(
  crmSchema.downloadAttachmentContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const attachment = await context.db
      .selectFrom('crm.attachments')
      .selectAll()
      .where('recordId', '=', input.recordId)
      .where('recordType', '=', input.recordType)
      .where('fileName', '=', input.fileName)
      .executeTakeFirstOrThrow();

    if (!attachment.recordId || !attachment.recordType)
      throw new Error('Unable to save file record id must be present');

    const file = await context.storage.get(
      attachment.recordId,
      attachment.recordType,
      attachment.fileName,
    );

    if (!file.name) throw new Error('No file name');

    const newFile = new File([await file.bytes()], file.name, {
      type: file.type,
    });

    return newFile;
  });

export const showAttachmentMetadata = implement(
  crmSchema.showAttachmentMetadataContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const attachment = await context.db
      .selectFrom('crm.attachments')
      .selectAll()
      .where('recordId', '=', input.recordId)
      .where('recordType', '=', input.recordType)
      .where('fileName', '=', input.fileName)
      .executeTakeFirstOrThrow();

    return attachment;
  });

export const deleteAttachment = implement(crmSchema.deleteAttachmentContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const attachment = await context.db
      .selectFrom('crm.attachments')
      .selectAll()
      .where('recordId', '=', input.recordId)
      .where('recordType', '=', input.recordType)
      .where('fileName', '=', input.fileName)
      .executeTakeFirstOrThrow();

    if (!attachment.recordId || !attachment.recordType)
      throw new Error('Unable to save file record id must be present');

    const result = context.db.transaction().execute(async (trx) => {
      const deleteResult = await trx
        .deleteFrom('crm.attachments')
        .where('recordId', '=', input.recordId)
        .where('recordType', '=', input.recordType)
        .where('fileName', '=', input.fileName)
        .executeTakeFirstOrThrow();

      if (!deleteResult.numDeletedRows) {
        throw new Error('Unable to delete file');
      }

      const file = await context.storage.get(
        attachment.recordId!,
        attachment.recordType!,
        attachment.fileName,
      );

      await file.delete();

      return deleteResult;
    });

    return result;
  });
