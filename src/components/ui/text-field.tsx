import { Eye, EyeClosed } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { useFieldContext } from './form';
import { Input } from './input';
import { Label } from './label';

export const TextField = ({
  className,
  label,
  ...props
}: React.ComponentProps<'input'> & {
  label?: React.ReactNode;
}) => {
  const field = useFieldContext<string>();
  const [inputType, setInputType] = useState<string | undefined>(props.type);

  return (
    <div className={cn('grid gap-2.5', className)}>
      {label &&
        (typeof label === 'object' ? (
          <Label
            className={cn(
              field.state.meta.errorMap.onSubmit && 'text-destructive',
            )}
            htmlFor={props.id}
          >
            {label}
          </Label>
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
      {field.state.meta.errorMap.onSubmit && (
        <Label className="text-destructive">
          {field.state.meta.errorMap.onSubmit.message}
        </Label>
      )}
    </div>
  );
};
