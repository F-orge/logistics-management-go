import { createFileRoute, Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import z from 'zod'
import { useAppForm } from '@/components/form'
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field'
import { authClient } from '@/lib/client-auth'

export const Route = createFileRoute('/auth/signup/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()

  const form = useAppForm({
    defaultValues: {} as {
      email: string
      name: string
      password: string
      confirmPassword: string
    },
    onSubmit: async ({ value }) =>
      toast.promise(
        authClient.signUp.email({
          ...value,
          callbackURL: `${window.location.origin}/auth/login`,
        }),
        {
          success: ({ data }) => {
            navigate({
              to: `/auth/verify-email`,
              search: { email: data!.user.email },
            })
            return 'Success registration'
          },
          error: 'Unable to register',
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
      className="flex flex-col gap-6"
    >
      <form.AppForm>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Fill in the form below to create your account
            </p>
          </div>
          <form.AppField name="name">
            {(field) => <field.TextField label="Full name" placeholder="John Doe" required />}
          </form.AppField>
          <form.AppField name="email">
            {(field) => (
              <field.TextField
                label="Email"
                placeholder="m@example.com"
                description="We&apos;ll use this to contact you. We will not share your email
              with anyone else."
                required
              />
            )}
          </form.AppField>
          <form.AppField name="password">
            {(field) => (
              <field.TextField
                label="Password"
                type="password"
                description="Must be at least 8 characters long."
                required
              />
            )}
          </form.AppField>
          <form.AppField name="confirmPassword">
            {(field) => (
              <field.TextField
                label="Confirm Password"
                type="password"
                description="Please confirm your password."
                required
              />
            )}
          </form.AppField>
          <Field>
            <form.SubmitButton type="submit">Create Account</form.SubmitButton>
          </Field>
          <Field>
            <FieldDescription className="px-6 text-center">
              Already have an account? <Link to="/auth/login">Sign in</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form.AppForm>
    </form>
  )
}
