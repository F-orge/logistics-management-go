import { Eye, EyeClosed } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useFieldContext } from '@/components/form';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';

export const TextField = ({
  className,
  label,
  description,
  ...props
}: React.ComponentProps<'input'> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
}) => {
  const field = useFieldContext<boolean>();

  return (
    <Field orientation="horizontal">
      <FieldContent>
        {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
      <Switch
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(checked)}
      />
    </Field>
  );
};
