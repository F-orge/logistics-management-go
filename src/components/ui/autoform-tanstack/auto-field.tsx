import React from "react";
import { Button } from "../button";
import { Field, FieldLabel } from "../field";
import { withForm } from "../forms";
import { ArrayFieldsetRenderer } from "./renderers/array-fieldset-renderer";
import { ArraySimpleRenderer } from "./renderers/array-simple-renderer";
import { renderFieldComponent } from "./renderers/field-type-renderer";
import { FieldGroup, Group } from "./types";
import { SingleFieldWrapper } from "./wrappers/single-field-wrapper";

export type AutoFieldProps = {
  fieldConfig: Group;
};

const AutoField = withForm({
  props: {} as AutoFieldProps,
  render: ({ form, fieldConfig }) => {
    // Handle array fields (both fieldset and simple repeating fields)
    if (fieldConfig.isArray) {
      return (
        <form.AppField name={fieldConfig.name!} mode="array">
          {(field) => {
            let arrayContent: React.ReactNode;

            // Nested fieldset array items
            if (fieldConfig.type === "fieldset") {
              arrayContent = (
                <ArrayFieldsetRenderer
                  field={field}
                  fieldConfig={fieldConfig}
                  form={form}
                />
              );
            }
            // Simple repeating array items
            else if (fieldConfig.type === "field") {
              arrayContent = (
                <ArraySimpleRenderer
                  field={field}
                  fieldConfig={fieldConfig}
                  form={form}
                />
              );
            }

            return (
              <Field>
                <FieldLabel>{fieldConfig.label}</FieldLabel>
                {arrayContent}
                <Button
                  type="button"
                  className="mb-4"
                  onClick={() => {
                    field.pushValue(
                      fieldConfig.arrayConfig?.defaultItem?.() as never
                    );
                  }}
                >
                  {fieldConfig.arrayConfig?.addLabel || "Add Item"}
                </Button>
              </Field>
            );
          }}
        </form.AppField>
      );
    }

    // Handle single (non-array) fields
    const fieldConfig_ = fieldConfig as FieldGroup;
    return (
      <form.AppField name={fieldConfig.name!}>
        {(field) => (
          <SingleFieldWrapper
            label={fieldConfig.label}
            description={fieldConfig.description}
            errors={field.state.meta.errors}
          >
            {renderFieldComponent({
              field,
              inputType: fieldConfig_.inputType || "text",
              props: fieldConfig_.props || {},
            })}
          </SingleFieldWrapper>
        )}
      </form.AppField>
    );
  },
});

export default AutoField;
