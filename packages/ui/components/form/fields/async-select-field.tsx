import React from "react";
import { useFieldContext } from "..";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { AsyncSelect } from "@/components/ui/async-select";

export type AsyncSelectFieldProps = {
  label?: React.ReactNode;
  description?: React.ReactNode;
};

export function AsyncSelectField<T>(
  props: Omit<
    React.ComponentProps<typeof AsyncSelect<T>>,
    "value" | "onChange"
  > &
    AsyncSelectFieldProps
) {
  const field = useFieldContext<string>();

  return (
    <Field>
      <FieldContent>
        <FieldLabel>{props.label}</FieldLabel>
        <AsyncSelect<T>
          {...props}
          value={field.state.value}
          onChange={(v) => field.handleChange(v)}
        />
        <FieldDescription>{props.description}</FieldDescription>
      </FieldContent>
      <FieldError errors={field.state.meta.errors} />
    </Field>
  );
}
