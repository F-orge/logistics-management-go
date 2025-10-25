import type { TypedDocumentString } from "./graphql";
import type { OptionalVariables } from "../utils";

export async function execute<TResult, TVariables>(
  url: string,
  query: TypedDocumentString<TResult, TVariables>,
  ...variables: OptionalVariables<TVariables>
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/graphql-response+json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json() as TResult;
}
