import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { toast } from 'sonner'
import z from 'zod'
import { useAppForm } from '@/components/form'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/client-auth'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/auth/reset-password/')({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({ token: z.string().optional(), email: z.email().optional() }),
  ),
  beforeLoad: (ctx) => {
    if (!ctx.search.token && !ctx.search.email) throw redirect({ to: '/auth/login' })
  },
})

function RouteComponent() {
  const searchQuery = Route.useSearch()
  const navigate = Route.useNavigate()

  const form = useAppForm({
    defaultValues: {} as { newPassword: string; confirmPassword: string },
    onSubmit: async ({ value }) =>
      toast.promise(
        authClient.resetPassword({
          token: searchQuery.token,
          newPassword: value.newPassword,
        }),
        {
          success: ({ data }) => {
            if (data?.status) {
              navigate({ to: '/auth/login' })
              return 'Successfully changed password'
            } else {
              return 'Unable to update your password'
            }
          },
          error: 'Unable to update your password',
        },
      ),
  })

  if (!searchQuery.token && searchQuery.email) {
    return (
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Password reset</h1>
          <p className="text-muted-foreground text-sm text-balance">
            The reset link has been send to your email: {searchQuery.email}
          </p>
        </div>
      </FieldGroup>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className={cn('flex flex-col gap-2.5')}
    >
      <form.AppForm>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Password reset</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your new password below to secure your account
            </p>
          </div>
          <form.AppField name="newPassword">
            {(field) => (
              <field.TextField
                label="New Password"
                type="password"
                placeholder="**********"
                required
              />
            )}
          </form.AppField>
          <form.AppField name="confirmPassword">
            {(field) => (
              <field.TextField
                label="Confirm Password"
                type="password"
                placeholder="**********"
                required
              />
            )}
          </form.AppField>
          <Field>
            <form.SubmitButton type="submit">Save</form.SubmitButton>
          </Field>
        </FieldGroup>
      </form.AppForm>
    </form>
  )
}
