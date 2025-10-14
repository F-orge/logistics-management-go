import { AutoFormFieldProps } from '@autoform/react';
import React from 'react';
import { useFieldContext } from '@/components/form';
import { Input } from '@/components/ui/input';

export const NumberField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const { key, ...props } = inputProps;

  return (
    <Input
      className={error ? 'border-destructive' : ''}
      type="number"
      {...props}
    />
  );
};
