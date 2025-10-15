import { createFileRoute, Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAppForm } from '@packages/ui/components/ui/form'
import { Button } from '@packages/ui/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@packages/ui/components/ui/field'
import { Input } from '@packages/ui/components/ui/input'
import { authClient } from '@/lib/auth'
import { cn } from '@packages/ui/lib/utils'

export const Route = createFileRoute('/auth/forgot-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()

  const form = useAppForm({
    defaultValues: {} as { email: string },
    onSubmit: async ({ value }) =>
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
      ),
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className={cn('flex flex-col gap-6')}
    >
      <form.AppForm>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Reset password</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to reset to your password
            </p>
          </div>
          <form.AppField name="email">
            {(field) => (
              <field.TextField label="Email" type="email" placeholder="m@example.com" required />
            )}
          </form.AppField>
          <Field>
            <form.SubmitButton type="submit">Reset password</form.SubmitButton>
          </Field>
          <Field>
            <FieldDescription className="text-center">
              Remembered your password?{' '}
              <Link to="/auth/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form.AppForm>
    </form>
  )
}
