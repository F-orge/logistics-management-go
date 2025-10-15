import { implement } from '@orpc/server'
import { ContactRepository, CompanyRepository } from '@packages/db/repositories/crm'
import { UserRepository } from '@packages/db/repositories/auth'
import * as contracts from '@/contracts/crm/contacts'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'

export const PaginateContact = implement(contracts.PaginateContactContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const contactRepo = ContactRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await contactRepo.paginate(input)

    const ownerPromises = ownerRepo.any(result.map((row) => row.ownerId).filter(nonEmpty))

    const companyPromises = companyRepo.any(result.map((row) => row.companyId).filter(nonEmpty))

    const [owners, companies] = await Promise.all([ownerPromises, companyPromises])

    return result.map((row) => ({
      ...row,
      owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      company: companies.find((subRow) => subRow.id === row.companyId),
    }))
  })

export const RangeContact = implement(contracts.RangeContactContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const contactRepo = ContactRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await contactRepo.range(input)

    const ownerPromises = ownerRepo.any(result.map((row) => row.ownerId).filter(nonEmpty))

    const companyPromises = companyRepo.any(result.map((row) => row.companyId).filter(nonEmpty))

    const [owners, companies] = await Promise.all([ownerPromises, companyPromises])

    return result.map((row) => ({
      ...row,
      owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      company: companies.find((subRow) => subRow.id === row.companyId),
    }))
  })

export const AnyContact = implement(contracts.AnyContactContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const contactRepo = ContactRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await contactRepo.any(input)

    const ownerPromises = ownerRepo.any(result.map((row) => row.ownerId).filter(nonEmpty))

    const companyPromises = companyRepo.any(result.map((row) => row.companyId).filter(nonEmpty))

    const [owners, companies] = await Promise.all([ownerPromises, companyPromises])

    return result.map((row) => ({
      ...row,
      owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      company: companies.find((subRow) => subRow.id === row.companyId),
    }))
  })

export const InsertContact = implement(contracts.InsertContactContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const contactRepo = ContactRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await contactRepo.insert(input)

    const ownerPromises = ownerRepo.any([result.ownerId])

    const companyPromises = companyRepo.any([result.companyId || ''])

    const [owners, companies] = await Promise.all([ownerPromises, companyPromises])

    return {
      ...result,
      owner: owners.find((row) => row.id === result.ownerId)!,
      company: companies.find((row) => row.id === result.companyId),
    }
  })

export const InsertManyContact = implement(contracts.InsertManyContactContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const contactRepo = ContactRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await contactRepo.insertMany(input)

    const ownerPromises = ownerRepo.any(result.map((row) => row.ownerId).filter(nonEmpty))

    const companyPromises = companyRepo.any(result.map((row) => row.companyId).filter(nonEmpty))

    const [owners, companies] = await Promise.all([ownerPromises, companyPromises])

    return result.map((row) => ({
      ...row,
      owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      company: companies.find((subRow) => subRow.id === row.companyId),
    }))
  })

export const UpdateContact = implement(contracts.UpdateContactContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const contactRepo = ContactRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await contactRepo.update(input.id, input.value)

    const ownerPromises = ownerRepo.any([result.ownerId])

    const companyPromises = companyRepo.any([result.companyId || ''])

    const [owners, companies] = await Promise.all([ownerPromises, companyPromises])

    return {
      ...result,
      owner: owners.find((row) => row.id === result.ownerId)!,
      company: companies.find((row) => row.id === result.companyId),
    }
  })

export const RemoveContact = implement(contracts.RemoveContactContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const contactRepo = ContactRepository.fns(context.kysely)

    return await contactRepo.remove(input)
  })
