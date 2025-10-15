import {implement} from "@orpc/server"
import { CompanyRepository } from "@packages/db/repositories/crm"
import * as contacts from "@/contracts/crm/companies"
import type { ORPCContext } from "@/index"

export const PaginateCompany = implement(contacts.PaginateCompanyContract).$context<ORPCContext>().handler(async ({context,input}) => {

  const companyRepo = CompanyRepository.fns(context.kysely)
  const owner = await context.kysely.selectFrom('user').select(['id','name','email','emailVerified','image']).executeTakeFirst()

  const result = companyRepo.paginate(input)

  return {...result,owner}
})