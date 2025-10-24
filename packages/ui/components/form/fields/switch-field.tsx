import React from "react";
import { useFieldContext } from "..";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

export type SwitchFieldProps = {
  label?: React.ReactNode;
  description?: React.ReactNode;
  orientation?: "vertical" | "horizontal" | "responsive";
};

const SwitchField = (
  props: React.ComponentProps<"input"> & SwitchFieldProps
) => {
  const field = useFieldContext<boolean>();

  return (
    <Field orientation={props.orientation || "horizontal"}>
      <FieldContent>
        <FieldLabel htmlFor={field.name}>{props.label}</FieldLabel>
        <FieldDescription>{props.description}</FieldDescription>
      </FieldContent>
      <Switch
        name={field.name}
        checked={field.state.value}
        onCheckedChange={(e) => field.handleChange(e)}
        onBlur={(_) => field.handleBlur()}
      />
      <FieldError errors={field.state.meta.errors} />
    </Field>
  );
};

export default SwitchField;
