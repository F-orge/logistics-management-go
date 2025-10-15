import { implement } from '@orpc/server'
import { CompanyRepository } from '@packages/db/repositories/crm'
import { UserRepository } from '@packages/db/repositories/auth'
import * as contacts from '@/contracts/crm/companies'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'

export const PaginateCompany = implement(contacts.PaginateCompanyContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const companyRepo = CompanyRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await companyRepo.paginate(input)

    const owners = await ownerRepo.any(result.map((row) => row.ownerId).filter(nonEmpty))

    return result.map((row) => ({
      ...row,
      owner: owners.find((subRow) => subRow.id === row.ownerId),
    }))
  })

export const RangeCompany = implement(contacts.RangeCompanyContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const companyRepo = CompanyRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await companyRepo.range(input)

    const owners = await ownerRepo.any(result.map((row) => row.ownerId).filter(nonEmpty))

    return result.map((row) => ({
      ...row,
      owner: owners.find((subRow) => subRow.id === row.ownerId),
    }))
  })

export const AnyCompany = implement(contacts.AnyCompanyContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const companyRepo = CompanyRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await companyRepo.any(input)

    const owners = await ownerRepo.any(result.map((row) => row.ownerId).filter(nonEmpty))

    return result.map((row) => ({
      ...row,
      owner: owners.find((subRow) => subRow.id === row.ownerId),
    }))
  })

export const InsertCompany = implement(contacts.InsertCompanyContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const companyRepo = CompanyRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await companyRepo.insert(input)

    const owner = await ownerRepo.any([result.ownerId || ''])

    return {
      ...result,
      owner: owner.find((row) => row.id === result.ownerId),
    }
  })

export const InsertManyCompany = implement(contacts.InsertManyCompanyContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const companyRepo = CompanyRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await companyRepo.insertMany(input)

    const owners = await ownerRepo.any(result.map((row) => row.ownerId).filter(nonEmpty))

    return result.map((row) => ({
      ...row,
      owner: owners.find((subRow) => subRow.id === row.ownerId),
    }))
  })

export const UpdateCompany = implement(contacts.UpdateCompanyContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const companyRepo = CompanyRepository.fns(context.kysely)
    const ownerRepo = UserRepository.fns(context.kysely)

    const result = await companyRepo.update(input.id, input.value)

    const owners = await ownerRepo.any([result.ownerId || ''])

    return {
      ...result,
      owner: owners.find((row) => row.id === result.ownerId),
    }
  })

export const RemoveCompany = implement(contacts.RemoveCompanyContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const companyRepo = CompanyRepository.fns(context.kysely)

    return await companyRepo.remove(input)
  })
