import { cn } from '@marahuyo/react-ui/lib/utils';
import { Button, type buttonVariants } from '@marahuyo/react-ui/ui/button';
import { Calendar } from '@marahuyo/react-ui/ui/calendar';
import { Input } from '@marahuyo/react-ui/ui/input';
import { Label } from '@marahuyo/react-ui/ui/label';
import { MultiSelect } from '@marahuyo/react-ui/ui/multi-select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@marahuyo/react-ui/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@marahuyo/react-ui/ui/select';
import { Textarea } from '@marahuyo/react-ui/ui/textarea';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import type { VariantProps } from 'class-variance-authority';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import type React from 'react';

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
      <Label className="pb-1.5" {...labelProps} />
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
      <Label className="pb-1.5" {...labelProps} />
      <Textarea
        {...textAreaProps}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
    </div>
  );
}

export function MultiSelectField({
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
  const field = useFieldContext<string[]>();

  return (
    <div
      className={cn(
        'grid w-full items-center gap-2.5',
        containerProps?.className,
      )}
      {...containerProps}
    >
      <Label className="pb-1.5" {...labelProps} />
      <MultiSelect
        options={options}
        value={field.state.value}
        defaultValue={field.state.value}
        onValueChange={field.handleChange}
        placeholder={placeHolder}
        variant="default"
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
      <Label className="pb-1.5" {...labelProps} />
      <Select
        onValueChange={field.handleChange}
        defaultValue={field.state.value}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.label} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export function DateInputField({
  labelProps,
  containerProps,
}: {
  labelProps?: React.ComponentProps<'label'>;
  containerProps?: React.ComponentProps<'div'>;
}) {
  const field = useFieldContext<Date>();
  return (
    <div
      className={cn(
        'grid w-full items-center gap-2.5',
        containerProps?.className,
      )}
      {...containerProps}
    >
      <Label className="pb-1.5" {...labelProps} />
      <Popover>
        <PopoverTrigger asChild className="w-full">
          <Button
            variant={'outline'}
            className={cn(
              'w-full pl-3 text-left font-normal',
              !field.state.value && 'text-muted-foreground',
            )}
          >
            {field.state.value ? (
              format(field.state.value, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.state.value}
            onSelect={(e: Date | undefined) => e && field.handleChange(e)}
            disabled={(date) =>
              date < new Date() || date < new Date('1900-01-01')
            }
          />
        </PopoverContent>
      </Popover>
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
  fieldComponents: {
    TextInputField,
    SingleSelectField,
    TextAreaInputField,
    MultiSelectField,
    DateInputField,
  },
  formComponents: { SubscribeButton },
});
