import { createMiddleware } from '@tanstack/react-start'

export const loggerMiddleware = createMiddleware().server(async ({ next, context, request }) => {
  const result = await next()
  return result
})
