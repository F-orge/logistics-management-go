/**
 * Utility type that conditionally provides variables as optional parameters based on whether
 * the variables type is empty or contains properties.
 * 
 * When TVariables extends Record<string, never> (empty object), returns an empty array []
 * When TVariables has properties, returns [TVariables]
 * 
 * This is useful for function parameters where variables should be optional when there
 * are no required variables but required when there are variables to pass.
 * 
 * @example
 * ```typescript
 * function someFunction<TResult, TVariables>(
 *   query: Query<TResult, TVariables>,
 *   ...variables: OptionalVariables<TVariables>
 * ) {
 *   // Function implementation
 * }
 * ```
 */
export type OptionalVariables<TVariables> = TVariables extends Record<string, never> 
  ? [] 
  : [TVariables];

/**
 * Alternative name for the same utility type - provides semantic clarity
 * when used in contexts where the conditional nature is more important.
 */
export type ConditionalVariables<TVariables> = OptionalVariables<TVariables>;