import { graphql } from '@/lib/graphql/client';

export const signUpEmail = graphql(`
  mutation SignUpEmail($payload:SignUpEmailInput!) {
    auth {
      signUpEmail(payload:$payload) {
        token
        user {
          name
          email
          emailVerified
          image
          role
        }
      }
    }
  }  
`);

export const signInEmail = graphql(`
  mutation SignInEmail($payload:SignInEmailInput!) {
    auth {
      signInEmail(payload:$payload) {
        token
        user {
          name
          email
          emailVerified
          image
          role
        }
      }
    }
  }  
`);

export const revokeSession = graphql(`
  mutation RevokeSession($token:String!) {
    auth {
      revokeSession(token: $token) {
        message
        success
      }
    }
  }  
`);

export const refreshSession = graphql(`
  mutation RefreshSession {
    auth {
      refreshSession {
        token
        user {
          name
          email
          emailVerified
          image
          role
        }
      }
    }
  } 
`);

export const changePassword = graphql(`
  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {
    auth {
      changePassword(oldPassword: $oldPassword,newPassword: $newPassword) 
    }
  }
`);
