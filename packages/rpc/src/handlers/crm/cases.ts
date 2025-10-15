import { implement } from '@orpc/server'
import { CaseRepository, ContactRepository } from '@packages/db/repositories/crm'
import * as cases from '@/contracts/crm/cases'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
import { UserRepository } from '@packages/db/repositories/auth'

export const PaginateCase = implement(cases.PaginateCaseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const caseRepo = CaseRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await caseRepo.paginate(input)

    const ownerPromises = ownerRepo.any(result.map((row) => row.ownerId))

    const contactPromises = contactRepo.any(result.map((row) => row.contactId).filter(nonEmpty))

    const [owners, contacts] = await Promise.all([ownerPromises, contactPromises])

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      contact: contacts.find((subRow) => subRow.id === row.contactId),
    }))
  })

export const RangeCase = implement(cases.RangeCaseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const caseRepo = CaseRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await caseRepo.range(input)

    const ownerPromises = ownerRepo.any(result.map((row) => row.ownerId))

    const contactPromises = contactRepo.any(result.map((row) => row.contactId).filter(nonEmpty))

    const [owners, contacts] = await Promise.all([ownerPromises, contactPromises])

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      contact: contacts.find((subRow) => subRow.id === row.contactId),
    }))
  })

export const AnyCase = implement(cases.AnyCaseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const caseRepo = CaseRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await caseRepo.any(input)

    const ownerPromises = ownerRepo.any(result.map((row) => row.ownerId))

    const contactPromises = contactRepo.any(result.map((row) => row.contactId).filter(nonEmpty))

    const [owners, contacts] = await Promise.all([ownerPromises, contactPromises])

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      contact: contacts.find((subRow) => subRow.id === row.contactId),
    }))
  })

export const InsertCase = implement(cases.InsertCaseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const caseRepo = CaseRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await caseRepo.insert(input)

    const ownerPromises = ownerRepo.any([result.ownerId])

    const contactPromises = contactRepo.any([result.contactId].filter(nonEmpty))

    const [owners, contact] = await Promise.all([ownerPromises, contactPromises])

    return {
      ...result,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((row) => row.id === result.ownerId)!,
      contact: contact.find((row) => row.id === result.contactId),
    }
  })

export const InsertManyCase = implement(cases.InsertManyCaseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const caseRepo = CaseRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await caseRepo.insertMany(input)

    const ownerPromises = ownerRepo.any(result.map((row) => row.ownerId))

    const contactPromises = contactRepo.any(result.map((row) => row.contactId).filter(nonEmpty))

    const [owners, contacts] = await Promise.all([ownerPromises, contactPromises])

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      contact: contacts.find((subRow) => subRow.id === row.contactId),
    }))
  })

export const UpdateCase = implement(cases.UpdateCaseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const caseRepo = CaseRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await caseRepo.update(input.id, input.value)

    const ownerPromises = ownerRepo.any([result.ownerId])

    const contactPromises = contactRepo.any([result.contactId].filter(nonEmpty))

    const [owners, contact] = await Promise.all([ownerPromises, contactPromises])

    return {
      ...result,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((row) => row.id === result.ownerId)!,
      contact: contact.find((subRow) => subRow.id === result.contactId),
    }
  })

export const RemoveCase = implement(cases.RemoveCaseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const caseRepo = CaseRepository.fns(context.kysely)

    return await caseRepo.remove(input)
  })
