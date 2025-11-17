import React from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../../field";

export interface SingleFieldWrapperProps {
  label?: string;
  description?: string;
  errors?: any[];
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical" | "responsive";
}

/**
 * Wrapper for single (non-array) field rendering
 * Provides consistent field label, description, and error display
 * Uses shadcn field component structure for design consistency
 */
export const SingleFieldWrapper: React.FC<SingleFieldWrapperProps> = ({
  label,
  description,
  errors,
  children,
  orientation = "vertical",
}) => {
  const hasErrors = errors && errors.length > 0;

  return (
    <Field
      orientation={orientation}
      data-invalid={hasErrors ? "true" : "false"}
    >
      {label && <FieldLabel>{label}</FieldLabel>}
      {children}
      {(description || hasErrors) && (
        <FieldContent>
          {description && <FieldDescription>{description}</FieldDescription>}
          {hasErrors && <FieldError errors={errors} />}
        </FieldContent>
      )}
    </Field>
  );
};
