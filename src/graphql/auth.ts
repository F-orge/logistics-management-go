import { graphql } from '@/lib/graphql/client';

export const SignInMutation = graphql(`
  mutation SignIn($email: String!, $password: String!) {
    auth {
      signInEmail(email: $email, password: $password) {
        token
        user {
          id
          name
          email
          emailVerified
        }
      }
    }
  }
`);

export const SignUpMutation = graphql(`
  mutation SignUp($email:String!,$name:String!,$image:Url,$password:String!,$role:String) {
    auth {
      signUpEmail(email: $email,name: $name,image: $image,password: $password,role: $role) {
        name
        email
      }
    }
  }  
`);
