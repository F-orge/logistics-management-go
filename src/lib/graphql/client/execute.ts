import type { TypedDocumentString } from './graphql';

export type GraphQLError = {
  message: string;
  path: string[];
};

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<TResult> {
  const response = await fetch(`${window.location.origin}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json',
      Authorization: `Bearer ${localStorage.getItem('graphql-token')}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = (await response.json()) as {
    data: TResult;
    errors: GraphQLError[];
  };

  if (!result.data) throw result.errors;

  return result.data;
}
