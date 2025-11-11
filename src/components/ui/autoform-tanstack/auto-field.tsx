import { FieldApi } from "@tanstack/react-form";
import React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../field";
import { useFieldContext, withForm } from "../forms";
import { FieldGroup } from "./types";

export type AutoFieldProps = {
  fieldConfig: FieldGroup;
};

const AutoField = withForm({
  props: {} as AutoFieldProps,
  render: ({ form, fieldConfig }) => {
    if (fieldConfig.isArray) {
      // todo: implement array field rendering
      return <div>Array fields not yet implemented</div>;
    }

    return (
      <form.AppField name={fieldConfig.name!}>
        {(field) => {
          let Component: React.ReactNode;

          switch (fieldConfig.inputType) {
            case "text":
              Component = <field.TextField {...fieldConfig.props} />;
            default:
              Component = <field.TextField />;
          }

          return (
            <Field>
              <FieldLabel>{fieldConfig.label}</FieldLabel>
              {Component}
              <FieldDescription>{fieldConfig.description}</FieldDescription>
            </Field>
          );
        }}
      </form.AppField>
    );
  },
});

export default AutoField;
