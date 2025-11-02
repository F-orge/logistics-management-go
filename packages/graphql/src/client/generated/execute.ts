import type { TypedDocumentString } from "./graphql";

export type GraphqlResponse<TResult> = {
	data?: TResult;
	errors?: Array<{
		message: string;
		locations?: { line: number; column: number }[];
		path?: string[];
		extensions?: Record<string, any>;
	}>;
};

export async function execute<TResult, TVariables>(
	url: string,
	query: TypedDocumentString<TResult, TVariables>,
	...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
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
		return {
			errors: [
				{ message: `Network error: ${response.statusText}` },
				...((await response.json()) as any[]),
			],
		} as GraphqlResponse<TResult>;
	}

	return response.json() as GraphqlResponse<TResult>;
}
