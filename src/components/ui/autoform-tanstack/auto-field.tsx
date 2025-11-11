import { FieldApi } from "@tanstack/react-form";
import React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../field";
import { useFieldContext, withForm } from "../forms";
import { SelectFieldProps } from "../forms/fields";
import { FieldGroup } from "./types";

export type AutoFieldProps = {
  fieldConfig: FieldGroup;
};

const AutoField = withForm({
  props: {} as AutoFieldProps,
  render: ({ form, fieldConfig }) => {
    if (fieldConfig.isArray) {
      return <div>Array fields not yet implemented</div>;
    }

    return (
      <form.AppField name={fieldConfig.name!}>
        {(field) => {
          let Component: React.ReactNode;

          switch (fieldConfig.inputType) {
            case "text":
              Component = <field.TextField {...fieldConfig.props} />;
              break;
            case "number":
              Component = <field.NumberField {...fieldConfig.props} />;
              break;
            case "date":
              Component = <field.DateTimeField {...fieldConfig.props} />;
              break;
            case "select":
              Component = (
                <field.SelectField
                  {...(fieldConfig.props as SelectFieldProps)}
                />
              );
              break;
            default:
              Component = <field.TextField />;
          }

          return (
            <Field data-invalid={field.state.meta.errors}>
              <FieldLabel>{fieldConfig.label}</FieldLabel>
              {Component}
              <FieldDescription>{fieldConfig.description}</FieldDescription>
              <FieldError errors={field.state.meta.errors} />
            </Field>
          );
        }}
      </form.AppField>
    );
  },
});

export default AutoField;
