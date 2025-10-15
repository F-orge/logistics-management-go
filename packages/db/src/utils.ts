export const nonEmpty = (value: unknown): value is string =>
  typeof value === 'string' && value.length > 0
