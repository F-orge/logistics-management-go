import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { authClient } from '@/lib/client-auth';
import { cn } from '@/lib/utils';

export const Route = createFileRoute('/auth/verify-email/')({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      email: z.email(),
    }),
  ),
  beforeLoad: (ctx) => {
    if (ctx.search.email === undefined || ctx.search.email === null)
      throw redirect({ to: '/auth/login' });
    return { email: ctx.search.email };
  },
  loader: async ({ context }) => {
    const { data } = await context.authClient.sendVerificationEmail({
      email: context.email,
    });
    if (!data?.status) throw new Error('Unable to send verification email');
  },
});

function RouteComponent() {
  const searchQuery = Route.useSearch();

  return (
    <div className={'flex flex-col gap-6'}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Enter verification code</h1>
            <p className="text-muted-foreground text-sm text-balance">
              We sent a URL Link to your email. {searchQuery.email}
            </p>
          </div>
          <Button asChild>
            <Link to="/auth/login">Already verified? Go to login</Link>
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
