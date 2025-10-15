import { createMiddleware } from '@tanstack/react-start'

export const requestMiddleware = createMiddleware().server(({ request, next }) => {
  return next({ context: { request } })
})
