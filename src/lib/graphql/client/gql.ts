/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation SignUpEmail($payload:SignUpEmailInput!) {\n    auth {\n      signUpEmail(payload:$payload) {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  }  \n": typeof types.SignUpEmailDocument,
    "\n  mutation SignInEmail($payload:SignInEmailInput!) {\n    auth {\n      signInEmail(payload:$payload) {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  }  \n": typeof types.SignInEmailDocument,
    "\n  mutation RevokeSession($token:String!) {\n    auth {\n      revokeSession(token: $token) {\n        message\n        success\n      }\n    }\n  }  \n": typeof types.RevokeSessionDocument,
    "\n  mutation RefreshSession {\n    auth {\n      refreshSession {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  } \n": typeof types.RefreshSessionDocument,
    "\n  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {\n    auth {\n      changePassword(oldPassword: $oldPassword,newPassword: $newPassword) \n    }\n  }\n": typeof types.ChangePasswordDocument,
    "\n  mutation AddInvoiceItem($id:UUID!,$payload:CreateInvoiceItemInput!) {\n    crm {\n      addInvoiceItem(id: $id,payload: $payload) {\n        total\n        items(page: 0,limit: 30) {\n          product {\n            name\n          }\n        }\n      }\n    }\n  }  \n": typeof types.AddInvoiceItemDocument,
    "\n  query CrmAttachments($page:Int!,$limit:Int!) {\n    crm {\n      attachments(page: $page,limit: $limit) {\n        fileName\n        mimeType\n        recordId\n        recordType\n        id\n      }\n    }\n  }\n": typeof types.CrmAttachmentsDocument,
    "\n  query CrmCampaigns($page:Int!,$limit:Int!) {\n    crm {\n      campaigns(page: $page,limit: $limit) {\n        id\n        name\n        budget\n        startDate\n        endDate\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.CrmCampaignsDocument,
    "\n  query CrmCases($page:Int!,$limit:Int!) {\n    crm {\n      cases(page: $page,limit: $limit) {\n        id\n        caseNumber\n        status\n        priority\n        owner {\n          name\n          email\n          image\n        }\n        contact {\n          email\n          jobTitle\n          company {\n            name\n            industry\n            website\n          }\n        }\n      }\n    }\n  }\n": typeof types.CrmCasesDocument,
};
const documents: Documents = {
    "\n  mutation SignUpEmail($payload:SignUpEmailInput!) {\n    auth {\n      signUpEmail(payload:$payload) {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  }  \n": types.SignUpEmailDocument,
    "\n  mutation SignInEmail($payload:SignInEmailInput!) {\n    auth {\n      signInEmail(payload:$payload) {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  }  \n": types.SignInEmailDocument,
    "\n  mutation RevokeSession($token:String!) {\n    auth {\n      revokeSession(token: $token) {\n        message\n        success\n      }\n    }\n  }  \n": types.RevokeSessionDocument,
    "\n  mutation RefreshSession {\n    auth {\n      refreshSession {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  } \n": types.RefreshSessionDocument,
    "\n  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {\n    auth {\n      changePassword(oldPassword: $oldPassword,newPassword: $newPassword) \n    }\n  }\n": types.ChangePasswordDocument,
    "\n  mutation AddInvoiceItem($id:UUID!,$payload:CreateInvoiceItemInput!) {\n    crm {\n      addInvoiceItem(id: $id,payload: $payload) {\n        total\n        items(page: 0,limit: 30) {\n          product {\n            name\n          }\n        }\n      }\n    }\n  }  \n": types.AddInvoiceItemDocument,
    "\n  query CrmAttachments($page:Int!,$limit:Int!) {\n    crm {\n      attachments(page: $page,limit: $limit) {\n        fileName\n        mimeType\n        recordId\n        recordType\n        id\n      }\n    }\n  }\n": types.CrmAttachmentsDocument,
    "\n  query CrmCampaigns($page:Int!,$limit:Int!) {\n    crm {\n      campaigns(page: $page,limit: $limit) {\n        id\n        name\n        budget\n        startDate\n        endDate\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CrmCampaignsDocument,
    "\n  query CrmCases($page:Int!,$limit:Int!) {\n    crm {\n      cases(page: $page,limit: $limit) {\n        id\n        caseNumber\n        status\n        priority\n        owner {\n          name\n          email\n          image\n        }\n        contact {\n          email\n          jobTitle\n          company {\n            name\n            industry\n            website\n          }\n        }\n      }\n    }\n  }\n": types.CrmCasesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUpEmail($payload:SignUpEmailInput!) {\n    auth {\n      signUpEmail(payload:$payload) {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  }  \n"): typeof import('./graphql').SignUpEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignInEmail($payload:SignInEmailInput!) {\n    auth {\n      signInEmail(payload:$payload) {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  }  \n"): typeof import('./graphql').SignInEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RevokeSession($token:String!) {\n    auth {\n      revokeSession(token: $token) {\n        message\n        success\n      }\n    }\n  }  \n"): typeof import('./graphql').RevokeSessionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RefreshSession {\n    auth {\n      refreshSession {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  } \n"): typeof import('./graphql').RefreshSessionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {\n    auth {\n      changePassword(oldPassword: $oldPassword,newPassword: $newPassword) \n    }\n  }\n"): typeof import('./graphql').ChangePasswordDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddInvoiceItem($id:UUID!,$payload:CreateInvoiceItemInput!) {\n    crm {\n      addInvoiceItem(id: $id,payload: $payload) {\n        total\n        items(page: 0,limit: 30) {\n          product {\n            name\n          }\n        }\n      }\n    }\n  }  \n"): typeof import('./graphql').AddInvoiceItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmAttachments($page:Int!,$limit:Int!) {\n    crm {\n      attachments(page: $page,limit: $limit) {\n        fileName\n        mimeType\n        recordId\n        recordType\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmAttachmentsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmCampaigns($page:Int!,$limit:Int!) {\n    crm {\n      campaigns(page: $page,limit: $limit) {\n        id\n        name\n        budget\n        startDate\n        endDate\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').CrmCampaignsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmCases($page:Int!,$limit:Int!) {\n    crm {\n      cases(page: $page,limit: $limit) {\n        id\n        caseNumber\n        status\n        priority\n        owner {\n          name\n          email\n          image\n        }\n        contact {\n          email\n          jobTitle\n          company {\n            name\n            industry\n            website\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').CrmCasesDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
