import { cn } from '@/lib/utils';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { MultiSelect } from './multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const TextField = ({
  className,
  label,
  ...props
}: React.ComponentProps<'input'> & {
  label?: string;
}) => {
  const field = useFieldContext<string>();
  const [inputType, setInputType] = useState<string | undefined>(props.type);

  return (
    <div className={cn('grid gap-2.5', className)}>
      {label && (
        <Label
          className={cn(
            field.state.meta.errorMap.onSubmit && 'text-destructive',
          )}
          htmlFor={props.id}
        >
          {label}
        </Label>
      )}
      <div className="flex gap-2.5">
        <Input
          aria-invalid={!!field.state.meta.errorMap.onSubmit}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          id={props.id}
          {...props}
          type={inputType}
        />
        {props.type === 'password' && (
          <Button
            onClick={() => {
              if (inputType === 'password') {
                setInputType('text');
              } else {
                setInputType('password');
              }
            }}
            type="button"
            variant={'outline'}
            size={'icon'}
          >
            {inputType === 'password' ? <Eye /> : <EyeClosed />}
          </Button>
        )}
      </div>
      {field.state.meta.errorMap.onSubmit && (
        <Label className="text-destructive">
          {field.state.meta.errorMap.onSubmit.message}
        </Label>
      )}
    </div>
  );
};

export const SelectField = ({
  className,
  label,
  multiple,
  options,
  placeholder,
  ...props
}: React.ComponentProps<'input'> & {
  label?: string;
  multiple?: boolean;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}) => {
  const field = useFieldContext<string | string[]>();

  return (
    <div className={cn('grid gap-2.5', className)}>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      {multiple ? (
        <MultiSelect
          aria-invalid={!!field.state.meta.errorMap.onSubmit}
          placeholder={placeholder}
          onValueChange={field.handleChange}
          defaultValue={field.state.value as string[]}
          options={options}
        />
      ) : (
        <Select
          onValueChange={field.handleChange}
          value={field.state.value as string}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.icon && <option.icon />} {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {field.state.meta.errorMap.onSubmit && (
        <Label className="text-destructive">
          {field.state.meta.errorMap.onSubmit.message}
        </Label>
      )}
    </div>
  );
};

export const SubmitButton = ({ ...props }: React.ComponentProps<'button'>) => {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting} type="submit" {...props} />
      )}
    </form.Subscribe>
  );
};

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField, SelectField },
  formComponents: { SubmitButton },
});
