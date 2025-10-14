import { FieldWrapperProps } from '@autoform/react';
import React from 'react';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '../../field';

const DISABLED_LABELS = ['boolean', 'object', 'array'];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  children,
  id,
  field,
  error,
}) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);

  return (
    <Field>
      <FieldContent>
        {!isDisabled && (
          <FieldLabel htmlFor={id}>
            {label}
            {field.required && <span className="text-destructive"> *</span>}
          </FieldLabel>
        )}
        {children}
        {field.fieldConfig?.description && (
          <FieldDescription className="text-sm text-muted-foreground">
            {field.fieldConfig.description}
          </FieldDescription>
        )}
        {error && (
          <FieldError className="text-sm text-destructive">{error}</FieldError>
        )}
      </FieldContent>
    </Field>
  );
};
