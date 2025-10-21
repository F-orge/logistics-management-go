/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { crm as Query_crm } from './crm/resolvers/Query/crm';
import    { crm as Mutation_crm } from './crm/resolvers/Mutation/crm';
import    { Companies } from './crm/companies/resolvers/Companies';
import    { CompanyQueries } from './crm/companies/resolvers/CompanyQueries';
import    { CrmQuery } from './crm/companies/resolvers/CrmQuery';
    export const resolvers: Resolvers = {
      Query: { crm: Query_crm },
      Mutation: { crm: Mutation_crm },
      
      Companies: Companies,
CompanyQueries: CompanyQueries,
CrmQuery: CrmQuery
    }