import React from 'react';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useFieldContext } from '..';

const NumberField = ({
  className,
  label,
  description,
  ...props
}: React.ComponentProps<'input'> & {
  label?: React.ReactNode;
  description?: React.ReactNode;
}) => {
  const field = useFieldContext<number>();

  return (
    <Field className={className}>
      {label && <FieldLabel htmlFor={props.id}>{label}</FieldLabel>}
      <Input
        type="number"
        value={field.state.value}
        onChange={(e) => field.handleChange(Number(e.target.value))}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
};

export default NumberField;
