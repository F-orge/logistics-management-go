import type { CompanyQueriesResolvers } from "./../../../types.generated";
export const CompanyQueries: CompanyQueriesResolvers = {
  paginate: (root, args) => {
    return [{ name: "" }];
  },
};
