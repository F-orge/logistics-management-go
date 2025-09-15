import type { TypedDocumentString } from './graphql';

type GraphqlError = {
  message: string;
  path: string[];
};

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<[TResult | null, GraphqlError[] | null]> {
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
    errors: GraphqlError[];
  };

  if (!result.data) return [null, result.errors];

  return [result.data, null];
}
