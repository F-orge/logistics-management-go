import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useFieldContext } from '@/components/form';
import { Label } from '@/components/ui/label';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/field';

const CheckBoxField = ({
  className,
  label,
  description,
  ...props
}: React.ComponentProps<'input'> & {
  label?: string;
  description?: string;
}) => {
  const field = useFieldContext<boolean>();

  return (
    <Field orientation="horizontal" className={className}>
      <Checkbox
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(!!checked)}
      />
      <FieldContent>
        {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
    </Field>
  );
};

export default CheckBoxField;
