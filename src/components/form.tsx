import { cn } from '@marahuyo/react-ui/lib/utils';
import { Button, type buttonVariants } from '@marahuyo/react-ui/ui/button';
import { Input } from '@marahuyo/react-ui/ui/input';
import { Label } from '@marahuyo/react-ui/ui/label';
import { createFormHookContexts, createFormHook } from '@tanstack/react-form';
import type React from 'react';
import type { VariantProps } from 'class-variance-authority';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export function TextInputField({
  labelProps,
  containerProps,
  inputProps,
}: {
  labelProps?: React.ComponentProps<'label'>;
  inputProps?: React.ComponentProps<'input'>;
  containerProps?: React.ComponentProps<'div'>;
}) {
  const field = useFieldContext<string>();
  return (
    <div
      className={cn(
        'grid w-full items-center gap-2.5',
        containerProps?.className,
      )}
      {...containerProps}
    >
      <Label {...labelProps} />
      <Input
        {...inputProps}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
    </div>
  );
}

export function SubscribeButton({
  buttonProps,
}: {
  buttonProps?: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      isLoading?: boolean;
      loadingIcon?: React.ReactElement;
      block?: boolean;
      iconPosition?: 'start' | 'end';
    };
}) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          {...buttonProps}
        />
      )}
    </form.Subscribe>
  );
}

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextInputField },
  formComponents: { SubscribeButton },
});
