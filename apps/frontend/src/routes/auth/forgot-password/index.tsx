import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { AutoForm } from '@packages/ui/components/ui/autoform'
import z from 'zod'

const ForgotPasswordFormSchema = z.object({
  email: z.email(),
})

export const Route = createFileRoute('/auth/forgot-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const { authClient } = Route.useRouteContext()

  return (
    <AutoForm
      onSubmit={async (value) => {
        toast.promise(
          authClient.requestPasswordReset({
            email: value.email,
            redirectTo: `${window.location.origin}/auth/reset-password`,
          }),
          {
            success: ({ data }) => {
              navigate({
                to: '/auth/reset-password',
                search: { email: value.email },
              })
              return data?.message
            },
            error: 'Unable to reset your password',
          },
        )
      }}
      schema={ForgotPasswordFormSchema}
      withSubmit
    />
  )
}
