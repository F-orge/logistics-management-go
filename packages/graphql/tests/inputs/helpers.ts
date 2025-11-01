export type TestCase<T> = {
  name: String;
  input: T;
  success: boolean;
  error?: {
    path: string;
    message: string;
  };
};

/**
 * Reusable test case interface for GraphQL queries and mutations.
 *
 * This interface is designed to match the graphQLQueryExecutor function signature:
 * executor(query, variables) => Promise<GraphqlResponse<TResult>>
 *
 * @template TVariables - The GraphQL operation variables type
 * @template TData - The GraphQL operation result data type
 *
 * @example
 * interface MyTestCase extends GraphQLTestCase<MyVariables, MyResult> {}
 * const cases: MyTestCase[] = [
 *   {
 *     name: "should do something",
 *     variables: { input: { foo: "bar" } },
 *     success: true,
 *     expectedData: { result: { id: "123" } }
 *   }
 * ];
 */
export interface GraphQLTestCase<TVariables, TData> {
  name: string;
  variables: TVariables;
  success: boolean;
  expectedData?: TData;
  expectedError?: {
    messagePattern: string | RegExp;
  };
}
