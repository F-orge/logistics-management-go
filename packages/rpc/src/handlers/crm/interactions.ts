import { implement } from '@orpc/server'
import {
  InteractionRepository,
  ContactRepository,
  CaseRepository,
} from '@packages/db/repositories/crm'
import { UserRepository } from '@packages/db/repositories/auth'
import * as contracts from '@/contracts/crm/interactions'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'

export const PaginateInteraction = implement(contracts.PaginateInteractionContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const interactionRepo = InteractionRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const caseRepo = CaseRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)

    const result = await interactionRepo.paginate(input)

    const contactIds = result.map((row) => row.contactId).filter(nonEmpty)
    const caseIds = result.map((row) => row.caseId).filter(nonEmpty)
    const userIds = result.map((row) => row.userId).filter(nonEmpty)

    const contactPromise = contactRepo.any(contactIds)
    const casePromise = caseRepo.any(caseIds)
    const userPromise = userRepo.any(userIds)

    const [contacts, cases, users] = await Promise.all([contactPromise, casePromise, userPromise])

    return result.map((row) => ({
      ...row,
      contact: contacts.find((c) => c.id === row.contactId)!,
      case: cases.find((c) => c.id === row.caseId),
      user: users.find((u) => u.id === row.userId)!,
    }))
  })

export const RangeInteraction = implement(contracts.RangeInteractionContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const interactionRepo = InteractionRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const caseRepo = CaseRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)

    const result = await interactionRepo.range(input)

    const contactIds = result.map((row) => row.contactId).filter(nonEmpty)
    const caseIds = result.map((row) => row.caseId).filter(nonEmpty)
    const userIds = result.map((row) => row.userId).filter(nonEmpty)

    const contactPromise = contactRepo.any(contactIds)
    const casePromise = caseRepo.any(caseIds)
    const userPromise = userRepo.any(userIds)

    const [contacts, cases, users] = await Promise.all([contactPromise, casePromise, userPromise])

    return result.map((row) => ({
      ...row,
      contact: contacts.find((c) => c.id === row.contactId)!,
      case: cases.find((c) => c.id === row.caseId),
      user: users.find((u) => u.id === row.userId)!,
    }))
  })

export const AnyInteraction = implement(contracts.AnyInteractionContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const interactionRepo = InteractionRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const caseRepo = CaseRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)

    const result = await interactionRepo.any(input)

    const contactIds = result.map((row) => row.contactId).filter(nonEmpty)
    const caseIds = result.map((row) => row.caseId).filter(nonEmpty)
    const userIds = result.map((row) => row.userId).filter(nonEmpty)

    const contactPromise = contactRepo.any(contactIds)
    const casePromise = caseRepo.any(caseIds)
    const userPromise = userRepo.any(userIds)

    const [contacts, cases, users] = await Promise.all([contactPromise, casePromise, userPromise])

    return result.map((row) => ({
      ...row,
      contact: contacts.find((c) => c.id === row.contactId)!,
      case: cases.find((c) => c.id === row.caseId),
      user: users.find((u) => u.id === row.userId)!,
    }))
  })

export const InsertInteraction = implement(contracts.InsertInteractionContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const interactionRepo = InteractionRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const caseRepo = CaseRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)

    const result = await interactionRepo.insert(input)

    const contactPromise = contactRepo.any([result.contactId])
    const casePromise = caseRepo.any([result.caseId || ''])
    const userPromise = userRepo.any([result.userId])

    const [contacts, cases, users] = await Promise.all([contactPromise, casePromise, userPromise])

    return {
      ...result,
      contact: contacts.find((c) => c.id === result.contactId)!,
      case: cases.find((c) => c.id === result.caseId),
      user: users.find((u) => u.id === result.userId)!,
    }
  })

export const InsertManyInteraction = implement(contracts.InsertManyInteractionContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const interactionRepo = InteractionRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const caseRepo = CaseRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)

    const result = await interactionRepo.insertMany(input)

    const contactIds = result.map((row) => row.contactId).filter(nonEmpty)
    const caseIds = result.map((row) => row.caseId).filter(nonEmpty)
    const userIds = result.map((row) => row.userId).filter(nonEmpty)

    const contactPromise = contactRepo.any(contactIds)
    const casePromise = caseRepo.any(caseIds)
    const userPromise = userRepo.any(userIds)

    const [contacts, cases, users] = await Promise.all([contactPromise, casePromise, userPromise])

    return result.map((row) => ({
      ...row,
      contact: contacts.find((c) => c.id === row.contactId)!,
      case: cases.find((c) => c.id === row.caseId),
      user: users.find((u) => u.id === row.userId)!,
    }))
  })

export const UpdateInteraction = implement(contracts.UpdateInteractionContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const interactionRepo = InteractionRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const caseRepo = CaseRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)

    const result = await interactionRepo.update(input.id, input.value)

    const contactPromise = contactRepo.any([result.contactId])
    const casePromise = caseRepo.any([result.caseId || ''])
    const userPromise = userRepo.any([result.userId])

    const [contacts, cases, users] = await Promise.all([contactPromise, casePromise, userPromise])

    return {
      ...result,
      contact: contacts.find((c) => c.id === result.contactId)!,
      case: cases.find((c) => c.id === result.caseId),
      user: users.find((u) => u.id === result.userId)!,
    }
  })

export const RemoveInteraction = implement(contracts.RemoveInteractionContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const interactionRepo = InteractionRepository.fns(context.kysely)
    return await interactionRepo.remove(input)
  })
