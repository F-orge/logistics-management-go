import React from "react";
import { useFieldContext } from "..";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

export type TextAreaFieldProps = {
  label?: React.ReactNode;
  description?: React.ReactNode;
};

const TextAreaField = (
  props: React.ComponentProps<"textarea"> & TextAreaFieldProps
) => {
  const field = useFieldContext<string>();

  return (
    <Field>
      {props.description ? (
        <FieldContent>
          <FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
          <Textarea
            className={props.className}
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={(_) => field.handleBlur()}
          />
          <FieldDescription>{props.description}</FieldDescription>
        </FieldContent>
      ) : (
        <>
          <FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
          <Textarea
            className={props.className}
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={(_) => field.handleBlur()}
          />
        </>
      )}
      <FieldError errors={field.state.meta.errors} />
    </Field>
  );
};

export default TextAreaField;
