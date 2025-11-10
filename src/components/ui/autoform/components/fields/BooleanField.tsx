import { AutoFormFieldProps } from "@autoform/react";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  field,
  id,
  inputProps,
}) => {
  return (
    <Checkbox
      id={id}
      onCheckedChange={(checked) => {
        const event = {
          target: {
            name: field.key,
            value: checked,
          },
        };
        inputProps.onChange(event);
      }}
      checked={inputProps.value}
      {...inputProps}
    />
  );
};
