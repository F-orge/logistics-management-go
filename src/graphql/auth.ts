import { graphql } from '@/lib/graphql/client';
import { execute } from '@/lib/graphql/client/execute';

const SignInMutation = graphql(`
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

execute(SignInMutation, { email: '', password: '' }).then((data) => {
  data.auth;
});
