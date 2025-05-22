import { cn } from '@marahuyo/react-ui/lib/utils';
import { Button, type buttonVariants } from '@marahuyo/react-ui/ui/button';
import { Input } from '@marahuyo/react-ui/ui/input';
import { Label } from '@marahuyo/react-ui/ui/label';
import { createFormHookContexts, createFormHook } from '@tanstack/react-form';
import type React from 'react';
import type { VariantProps } from 'class-variance-authority';
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@marahuyo/react-ui/ui/select';
import { Textarea } from '@marahuyo/react-ui/ui/textarea';

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

export function TextAreaInputField({
  labelProps,
  containerProps,
  textAreaProps,
}: {
  labelProps?: React.ComponentProps<'label'>;
  textAreaProps?: React.ComponentProps<'textarea'>;
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
      <Textarea
        {...textAreaProps}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
    </div>
  );
}

export function SingleSelectField({
  labelProps,
  containerProps,
  placeHolder,
  options,
}: {
  labelProps?: React.ComponentProps<'label'>;
  containerProps?: React.ComponentProps<'div'>;
  options: { label: string; value: string }[];
  placeHolder?: string;
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
      <Select>
        <SelectTrigger
          name={field.name}
          value={field.state.value}
          defaultValue={field.state.value}
        >
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.label} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </Select>
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

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextInputField, SingleSelectField, TextAreaInputField },
  formComponents: { SubscribeButton },
});
