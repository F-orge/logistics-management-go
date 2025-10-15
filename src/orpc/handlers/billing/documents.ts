import { implement } from '@orpc/server'
import * as billingSchema from '@/orpc/contracts/billing'
import { DocumentRepository } from '@/repositories/billing/documents'
import type { HonoVariables } from '@/server'

export const uploadDocument = implement(billingSchema.uploadDocumentContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DocumentRepository(context.db)

    // get the metadata
    const fileName = input.file.name
    const mimeType = input.file.type

    const result = await repo
      .create({
        fileName,
        mimeType,
        recordId: input.recordId,
        documentType: input.documentType,
        recordType: input.recordType,
        filePath: `${context.storage.getStoragePath()}/${input.recordId}/${input.documentType}/${fileName}`,
      })
      .executeTakeFirstOrThrow()

    if (!result.recordId || !result.recordType)
      throw new Error('Unable to save file record id must be present')

    const size = await context.storage.save(result.recordId, result.documentType, input.file)

    if (input.file.size !== size) throw new Error('File size mismatch')

    return result
  })

export const downloadDocument = implement(billingSchema.downloadDocumentContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const attachment = await context.db
      .selectFrom('billing.documents')
      .selectAll()
      .where('recordId', '=', input.recordId)
      .where('recordType', '=', input.recordType)
      .where('fileName', '=', input.fileName)
      .executeTakeFirstOrThrow()

    if (!attachment.recordId || !attachment.recordType)
      throw new Error('Unable to save file record id must be present')

    const file = await context.storage.get(
      attachment.recordId,
      attachment.documentType,
      attachment.fileName,
    )

    if (!file.name) throw new Error('No file name')

    const newFile = new File([await file.bytes()], file.name, {
      type: file.type,
    })

    return newFile
  })

export const showDocumentMetadata = implement(billingSchema.showDocumentMetadataContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const attachment = await context.db
      .selectFrom('billing.documents')
      .selectAll()
      .where('recordId', '=', input.recordId)
      .where('recordType', '=', input.recordType)
      .where('fileName', '=', input.fileName)
      .executeTakeFirstOrThrow()

    return attachment
  })

export const deleteDocument = implement(billingSchema.deleteDocumentContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const attachment = await context.db
      .selectFrom('billing.documents')
      .selectAll()
      .where('recordId', '=', input.recordId)
      .where('recordType', '=', input.recordType)
      .where('fileName', '=', input.fileName)
      .executeTakeFirstOrThrow()

    if (!attachment.recordId || !attachment.recordType)
      throw new Error('Unable to save file record id must be present')

    const result = context.db.transaction().execute(async (trx) => {
      const deleteResult = await trx
        .deleteFrom('billing.documents')
        .where('recordId', '=', input.recordId)
        .where('recordType', '=', input.recordType)
        .where('fileName', '=', input.fileName)
        .executeTakeFirstOrThrow()

      if (!deleteResult.numDeletedRows) {
        throw new Error('Unable to delete file')
      }

      const file = await context.storage.get(
        attachment.recordId!,
        attachment.documentType!,
        attachment.fileName,
      )

      await file.delete()

      return deleteResult
    })

    return result
  })
