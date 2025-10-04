import { Eye, EyeClosed } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useFieldContext } from '@/components/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';

export const TextField = ({
  className,
  label,
  description,
  ...props
}: React.ComponentProps<'input'> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
}) => {
  const field = useFieldContext<string>();
  const [inputType, setInputType] = useState<string | undefined>(props.type);

  return (
    <Field className={cn('grid gap-2.5', className)}>
      {label &&
        (typeof label === 'object' ? (
          <FieldLabel
            className={cn(
              field.state.meta.errorMap.onSubmit && 'text-destructive',
            )}
            htmlFor={props.id}
          >
            {label}
          </FieldLabel>
        ) : (
          label
        ))}
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
      <FieldDescription>{description}</FieldDescription>
      {field.state.meta.errorMap.onSubmit && (
        <FieldError className="text-destructive">
          {field.state.meta.errorMap.onSubmit.message}
        </FieldError>
      )}
    </Field>
  );
};
