import React from "react";
import { Item, ItemGroup, ItemSeparator } from "../../item";
import type { FieldGroup, Group } from "../types";
import { ArrayItemWrapper } from "../wrappers/array-item-wrapper";
import { renderFieldComponent } from "./field-type-renderer";

export interface ArraySimpleRendererProps {
  field: any;
  fieldConfig: Group;
  form: any;
}

/**
 * Renders simple array fields with repeating items
 * Each array item is a single field component with index-based label
 */
export const ArraySimpleRenderer: React.FC<ArraySimpleRendererProps> = ({
  field,
  fieldConfig,
  form,
}) => {
  const values = (field.state.value as any[]) || [];
  const config = fieldConfig as FieldGroup;

  return (
    <ItemGroup>
      {values.map((_, index) => {
        const fieldName = `${fieldConfig.name}[${index}]`;

        return (
          <React.Fragment key={fieldName}>
            <Item variant={"muted"}>
              <form.AppField name={fieldName}>
                {(f: any) => (
                  <ArrayItemWrapper
                    label={config.label || ""}
                    index={index}
                    description={config.description}
                    errors={f.state.meta.errors}
                    onRemove={() => field.removeValue(index)}
                  >
                    {renderFieldComponent({
                      field: f,
                      inputType: config.inputType || "text",
                      props: config.props || {},
                    })}
                  </ArrayItemWrapper>
                )}
              </form.AppField>
            </Item>
            <ItemSeparator />
          </React.Fragment>
        );
      })}
    </ItemGroup>
  );
};
