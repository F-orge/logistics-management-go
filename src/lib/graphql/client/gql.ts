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
    "\n  mutation SignIn($email: String!, $password: String!) {\n    auth {\n      signInEmail(email: $email, password: $password) {\n        token\n        user {\n          id\n          name\n          email\n          emailVerified\n        }\n      }\n    }\n  }\n": typeof types.SignInDocument,
    "\n  mutation SignUp($email:String!,$name:String!,$image:Url,$password:String!,$role:String) {\n    auth {\n      signUpEmail(email: $email,name: $name,image: $image,password: $password,role: $role) {\n        name\n        email\n      }\n    }\n  }  \n": typeof types.SignUpDocument,
};
const documents: Documents = {
    "\n  mutation SignIn($email: String!, $password: String!) {\n    auth {\n      signInEmail(email: $email, password: $password) {\n        token\n        user {\n          id\n          name\n          email\n          emailVerified\n        }\n      }\n    }\n  }\n": types.SignInDocument,
    "\n  mutation SignUp($email:String!,$name:String!,$image:Url,$password:String!,$role:String) {\n    auth {\n      signUpEmail(email: $email,name: $name,image: $image,password: $password,role: $role) {\n        name\n        email\n      }\n    }\n  }  \n": types.SignUpDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignIn($email: String!, $password: String!) {\n    auth {\n      signInEmail(email: $email, password: $password) {\n        token\n        user {\n          id\n          name\n          email\n          emailVerified\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').SignInDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp($email:String!,$name:String!,$image:Url,$password:String!,$role:String) {\n    auth {\n      signUpEmail(email: $email,name: $name,image: $image,password: $password,role: $role) {\n        name\n        email\n      }\n    }\n  }  \n"): typeof import('./graphql').SignUpDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
