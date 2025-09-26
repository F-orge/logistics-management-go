import { mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  changePassword,
  refreshSession,
  revokeSession,
  signInEmail,
  signUpEmail,
} from '@/graphql/mutations/auth';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
  RefreshSessionMutation,
  RefreshSessionMutationVariables,
  RevokeSessionMutation,
  RevokeSessionMutationVariables,
  SignInEmailInput,
  SignInEmailMutation,
  SignUpEmailInput,
  SignUpEmailMutation,
} from '@/lib/graphql/client/graphql';

export const signUpEmailMutation = mutationOptions<
  SignUpEmailMutation,
  GraphQLError[],
  SignUpEmailInput
>({
  mutationFn: async (payload) => execute(signUpEmail, { payload }),
  onError: (err) => toast.error(err[0].message),
  onSuccess: (data) => {
    localStorage.setItem('graphql-token', data.auth.signUpEmail.token);
    localStorage.setItem(
      'graphql-user',
      JSON.stringify(data.auth.signUpEmail.user),
    );
  },
});

export const signInMutation = mutationOptions<
  SignInEmailMutation,
  GraphQLError[],
  SignInEmailInput
>({
  mutationFn: (payload) => execute(signInEmail, { payload }),
  onError: (err) => toast.error(err[0].message),
  onSuccess: (data) => {
    localStorage.setItem('graphql-token', data.auth.signInEmail.token);
    localStorage.setItem(
      'graphql-user',
      JSON.stringify(data.auth.signInEmail.user),
    );
  },
});

export const revokeSessionMutation = mutationOptions<
  RevokeSessionMutation,
  GraphQLError[],
  RevokeSessionMutationVariables
>({
  mutationFn: ({ token }) => execute(revokeSession, { token }),
  onError: (err) => toast.error(err[0].message),
  onSuccess: (data) => {
    if (data.auth.revokeSession.success) {
      localStorage.removeItem('graphql-token');
      localStorage.removeItem('graphql-user');
    } else {
      toast.error(data.auth.revokeSession.message);
    }
  },
});

export const refreshSessionMutation = mutationOptions<
  RefreshSessionMutation,
  GraphQLError[],
  RefreshSessionMutationVariables
>({
  mutationFn: () => execute(refreshSession),
  onError: (err) => toast.error(err[0].message),
  onSuccess: (data) => {
    localStorage.setItem('graphql-token', data.auth.refreshSession.token);
    localStorage.setItem(
      'graphql-user',
      JSON.stringify(data.auth.refreshSession.user),
    );
  },
});

export const changePasswordMutation = mutationOptions<
  ChangePasswordMutation,
  GraphQLError[],
  ChangePasswordMutationVariables
>({
  mutationFn: (payload) => execute(changePassword, payload),
  onError: (err) => toast.error(err[0].message),
  onSuccess: (data) => toast.success(data.auth.changePassword),
});
