import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { AutoForm } from '@packages/ui/components/ui/autoform'
import z from 'zod'
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldTitle,
} from '@packages/ui/components/ui/field'

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
    <FieldGroup>
      <FieldLegend className="flex flex-col items-center gap-1 text-center">
        <FieldTitle className="text-2xl font-bold">Forgot your password</FieldTitle>
        <FieldDescription className="text-muted-foreground text-sm text-balance">
          Enter your email below to send a verification link
        </FieldDescription>
      </FieldLegend>
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
    </FieldGroup>
  )
}
