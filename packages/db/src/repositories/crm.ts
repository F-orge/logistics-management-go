import { CompanySchema } from "@/schemas/crm/companies";
import { repositoryFactory } from "./interface";

export const CompanyRepository = repositoryFactory('crm.companies',CompanySchema)